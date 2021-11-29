/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */

const Joi = require('joi').extend(require('@joi/date'));
const { fv, pmt } = require('financial');
const lib = require('../helper/lib');

// Get Future Purchase Calculator Controller
exports.getfuturepurchasecalculator = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      startDateOfInvestmentHorizon: Joi.string().required(),
      endDateOfInvestmentHorizon: Joi.string().required(),
      depositRate: Joi.number().required(),
      frequencyOfDepositRate: Joi.string().required(),
      purchaseCost: Joi.number().required(),
      currentBalance: Joi.number().required(),
      expectedNominalReturnDuringInvestmentHorizon: Joi.number().required(),
      inflationAssumptionDuringInvestmentHorizon: Joi.number().required(),

    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const date = new Date();
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();

    const startDateOfInvestmentHorizon = new Date(req.params.startDateOfInvestmentHorizon);
    const endDateOfInvestmentHorizon = new Date(req.params.endDateOfInvestmentHorizon);
    let today = `${year}/${month}/${day}`;
    today = new Date(today);
    const depositRate = parseFloat(req.params.depositRate, 10);
    const { frequencyOfDepositRate } = req.params;
    const purchaseCost = parseFloat(req.params.purchaseCost, 10);
    const currentBalance = parseFloat(req.params.currentBalance, 10);
    const expectedNominalReturnDuringInvestmentHorizon = parseFloat(req.params.expectedNominalReturnDuringInvestmentHorizon, 10);
    const inflationAssumptionDuringInvestmentHorizon = parseFloat(req.params.inflationAssumptionDuringInvestmentHorizon, 10);

    let totalYearsUntilStartofInvestmentHorizon = 0;
    let totalofall = 0;
    let totalYearsofInvestmentHorizon = 0;
    let totalExpectedRealReturnDuringInvestmentHorizon = 0;
    let totalRequiredMonthlyContributiontoPortfolioDuringInvestmentHorizon = 0;

    const dateDiff1 = lib.findDayDifferenceInYears(today, startDateOfInvestmentHorizon);
    const dateDiff2 = lib.findDayDifferenceInYears(startDateOfInvestmentHorizon, endDateOfInvestmentHorizon);

    //   Years Until Start of Investment Horizon cal
    totalYearsUntilStartofInvestmentHorizon = Math.round(dateDiff1 / 365, 0);
    //   monthly , Quarterly , SemiAnnual , Annual cal
    if (frequencyOfDepositRate.toUpperCase() === 'MONTHLY') {
      totalofall = fv(depositRate / 100 / 12, totalYearsUntilStartofInvestmentHorizon * 12, 0, -1 * currentBalance, 0);
    } else if (frequencyOfDepositRate.toUpperCase() === 'UARTERLY') {
      totalofall = fv(depositRate / 100 / 4, totalYearsUntilStartofInvestmentHorizon * 4, 0, -1 * currentBalance, 0);
    } else if (frequencyOfDepositRate.toUpperCase() === 'SEMIANNUAL') {
      totalofall = fv(depositRate / 100 / 2, totalYearsUntilStartofInvestmentHorizon * 2, 0, -1 * currentBalance, 0);
    } else if (frequencyOfDepositRate.toUpperCase() === 'ANNUAL') {
      totalofall = fv(depositRate / 100, totalYearsUntilStartofInvestmentHorizon, 0, -1 * currentBalance, 0);
    }

    // Years of Investment Horizon cal
    totalYearsofInvestmentHorizon = Math.round(dateDiff2 / 365);

    // Expected Real Return During Investment Horizon cal
    totalExpectedRealReturnDuringInvestmentHorizon = (1 + expectedNominalReturnDuringInvestmentHorizon) / (1 + inflationAssumptionDuringInvestmentHorizon) - 1;

    // Required Monthly Contribution to Portfolio During Investment Horizon cal
    totalRequiredMonthlyContributiontoPortfolioDuringInvestmentHorizon = pmt(totalExpectedRealReturnDuringInvestmentHorizon / 12, totalYearsofInvestmentHorizon * 12, -1 * totalofall, purchaseCost, 0);

    return res.status(200).send({ RequiredMonthlyContributiontoPortfolioDuringInvestmentHorizon: totalRequiredMonthlyContributiontoPortfolioDuringInvestmentHorizon });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

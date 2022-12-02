/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { pv, pmt } = require('financial');

// Get Future Expenses Calculator Calculators Controller
exports.getFutureExpensesCalculator = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      yearsUntilFutureExpensesCalculatorPaymentsStart: Joi.number().required(),
      lengthOfFutureExpensesCalculatorPayments: Joi.number().required(),
      frequencyOfPayments: Joi.string().required(),
      freuencyOfContributionToPortfolio: Joi.string().required(),
      valueOfSinglePayment: Joi.number().required(),
      currentBalance: Joi.number().required(),
      // expectedReturn: Joi.number().required(),
      inflationAssumption: Joi.number().required(),

    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const yearsUntilFutureExpensesCalculatorPaymentsStart = parseFloat(req.params.yearsUntilFutureExpensesCalculatorPaymentsStart, 10);
    const lengthOfFutureExpensesCalculatorPayments = parseFloat(req.params.lengthOfFutureExpensesCalculatorPayments, 10);
    const { frequencyOfPayments } = req.params;
    const { freuencyOfContributionToPortfolio } = req.params;
    const valueOfSinglePayment = parseFloat(req.params.valueOfSinglePayment, 10);
    const currentBalance = parseFloat(req.params.currentBalance, 10);
    // const expectedReturn = parseFloat(req.params.expectedReturn, 10);
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10)/100;

    //let expectedRealReturn = 0;
    let PVOfFutureExpensesCalculatorRequirements = 0;
    let requiredContribution = 0;

    // expectedRealReturn = (1 + expectedReturn) / (1 + inflationAssumption) - 1;

    //   monthly , Quarterly , SemiAnnual , Annual cal
    if (frequencyOfPayments.toUpperCase() === 'MONTHLY') {
      PVOfFutureExpensesCalculatorRequirements = pv(inflationAssumption / 12, lengthOfFutureExpensesCalculatorPayments, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'QUARTERLY') {
      PVOfFutureExpensesCalculatorRequirements = pv(inflationAssumption / 4, lengthOfFutureExpensesCalculatorPayments, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'SEMIANNUAL') {
      PVOfFutureExpensesCalculatorRequirements = pv(inflationAssumption / 2, lengthOfFutureExpensesCalculatorPayments, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'ANNUAL') {
      PVOfFutureExpensesCalculatorRequirements = pv(inflationAssumption, lengthOfFutureExpensesCalculatorPayments, valueOfSinglePayment, 0, 0);
    }

    if (freuencyOfContributionToPortfolio.toUpperCase() === 'MONTHLY') {
      requiredContribution = pmt(inflationAssumption / 12, yearsUntilFutureExpensesCalculatorPaymentsStart * 12, currentBalance, PVOfFutureExpensesCalculatorRequirements, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'QUARTERLY') {
      requiredContribution = pmt(inflationAssumption / 4, yearsUntilFutureExpensesCalculatorPaymentsStart * 4, currentBalance, PVOfFutureExpensesCalculatorRequirements, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'SEMIANNUAL') {
      requiredContribution = pmt(inflationAssumption / 2, yearsUntilFutureExpensesCalculatorPaymentsStart * 2, currentBalance, PVOfFutureExpensesCalculatorRequirements, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'ANNUAL') {
      requiredContribution = pmt(inflationAssumption, yearsUntilFutureExpensesCalculatorPaymentsStart, currentBalance, PVOfFutureExpensesCalculatorRequirements, 0);
    }
    // eslint-disable-next-line no-undef
    //requiredMonthlyContribution = pmt(expectedRealReturn / 12, yearsUntilCharityPaymentsStart * 12, currentBalance, PVOfCharityRequirements, 0);

    return res.status(200).send({ requiredContribution });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { fv, pv, pmt } = require('financial');

// Get Client Retirement Calculators Controller
exports.getClientRetirementCalculators = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      currentAge: Joi.number().required(),
      currentSavingsBalance: Joi.number().required(),
      monthlyEarnings: Joi.number().required(),
      retirementAge: Joi.number().required(),
      monthlyExpensesDuringRetirement: Joi.number().required(),
      assumedAnnualInflation: Joi.number().required(),
      assumedYearsDuringRetirement: Joi.number().required(),
      expectedNominalReturnOnAssets: Joi.number().required(),

    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const currentAge = parseFloat(req.params.currentAge, 10);
    const currentSavingsBalance = parseFloat(req.params.currentSavingsBalance, 10);
    const retirementAge = parseFloat(req.params.retirementAge, 10);
    const monthlyExpensesDuringRetirement = parseFloat(req.params.monthlyExpensesDuringRetirement, 10);
    const assumedAnnualInflation = parseFloat(req.params.assumedAnnualInflation, 10);
    const assumedYearsDuringRetirement = parseFloat(req.params.assumedYearsDuringRetirement, 10);
    const expectedNominalReturnOnAssets = parseFloat(req.params.expectedNominalReturnOnAssets, 10);

    let totalRequiredMonthlycontribution = 0;
    let totalExpectedRealReturn = 0;
    let totalPVofRetirementSpending = 0;
    let totalFVofCurrentSavings = 0;
    let totalNet = 0;

    totalExpectedRealReturn = (1 + expectedNominalReturnOnAssets) / (1 + assumedAnnualInflation) - 1;
    totalPVofRetirementSpending = pv(totalExpectedRealReturn / 12, assumedYearsDuringRetirement * 12, monthlyExpensesDuringRetirement, 0);
    totalFVofCurrentSavings = fv(totalExpectedRealReturn, (retirementAge - currentAge), 0, -1 * currentSavingsBalance, 0);
    totalNet = totalFVofCurrentSavings + totalPVofRetirementSpending;

    // eslint-disable-next-line no-undef
    totalRequiredMonthlycontribution = pmt(totalExpectedRealReturn / 12, (retirementAge - currentAge) * 12, 0, totalNet, 0);

    return res.status(200).send({ requiredMonthlycontribution: totalRequiredMonthlycontribution });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

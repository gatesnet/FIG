/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { fv, pmt } = require('financial');

// Get Future Events Controller
exports.getFutureExpenses2 = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      portfolioBalance: Joi.number().required(),
      yearsUntilRetirement: Joi.number().required(),
      monthlyContributionToPortfolio: Joi.number().required(),
      yearsDuringRetirement: Joi.number().required(),
      expectedReturnOnPortfolio: Joi.number().required(),
      inflationAssumption: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }
    const portfolioBalance = parseFloat(req.params.portfolioBalance, 10);
    const yearsUntilRetirement = parseFloat(req.params.yearsUntilRetirement, 10);
    const monthlyContributionToPortfolio = parseFloat(req.params.monthlyContributionToPortfolio, 10);
    const yearsDuringRetirement = parseFloat(req.params.yearsDuringRetirement, 10);
    const expectedReturnOnPortfolio = parseFloat(req.params.expectedReturnOnPortfolio, 10);
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10);

    let futureValueOfPortfolio = 0;
    let realReturn = 0;
    let allowableWithdrawalFromPortfolio = 0;

    realReturn = (1 + expectedReturnOnPortfolio) / (1 + inflationAssumption) - 1;

    futureValueOfPortfolio = fv(realReturn / 12, yearsUntilRetirement * 12, -1 * monthlyContributionToPortfolio, -1 * portfolioBalance, 0);

    allowableWithdrawalFromPortfolio = pmt(realReturn / 12, yearsDuringRetirement * 12, futureValueOfPortfolio, 0, 0);

    return res.status(200).send({ allowableWithdrawalFromPortfolio });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

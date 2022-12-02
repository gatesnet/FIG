/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { pmt } = require('financial');

// Get Client Retirement Calculators Controller
exports.getSingleCharityPayment = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      yearsUntilDonation: Joi.number().required(),
      desiredDonationAmount: Joi.number().required(),
      currentBalance: Joi.number().required(),
      expectedNominalReturn: Joi.number().required(),
      inflationAssumption: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const yearsUntilDonation = parseFloat(req.params.yearsUntilDonation, 10);
    const desiredDonationAmount = parseFloat(req.params.desiredDonationAmount, 10);
    const currentBalance = parseFloat(req.params.currentBalance, 10);
    const expectedNominalReturn = parseFloat(req.params.expectedNominalReturn, 10);
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10);

    let expectedRealReturn = 0;
    let requiredMonthlyContributionToPortfolio = 0;

    expectedRealReturn = (1 + expectedNominalReturn) / (1 + inflationAssumption) - 1;

    // eslint-disable-next-line no-undef
    requiredMonthlyContributionToPortfolio = pmt(expectedRealReturn / 12, yearsUntilDonation * 12, -1 * currentBalance, desiredDonationAmount, 0);

    return res.status(200).send({ requiredMonthlyContributionToPortfolio });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

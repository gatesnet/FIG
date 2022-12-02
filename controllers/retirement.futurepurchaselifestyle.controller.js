/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { pmt } = require('financial');

// Get Client Future Purchase Lifestyle Controller
exports.getFuturePurchaseLifeStyle = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      yearsUntilDonation: Joi.number().required(),
      desiredDonationAmount: Joi.number().required(),
      currentBalance: Joi.number().required(),
      // expectedNominalReturn: Joi.number().required(),
      freuencyOfContributionToPortfolio: Joi.string().required(),
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
    //const expectedNominalReturn = parseFloat(req.params.expectedNominalReturn, 10);
    const { freuencyOfContributionToPortfolio } = req.params;
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10)/100;

    // let expectedRealReturn = 0;
    let requiredContribution = 0;

    // expectedRealReturn = (1 + expectedNominalReturn) / (1 + inflationAssumption) - 1;

    if (freuencyOfContributionToPortfolio.toUpperCase() === 'MONTHLY') {
      requiredContribution = pmt(inflationAssumption / 12, yearsUntilDonation * 12, -1 * currentBalance, desiredDonationAmount, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'QUARTERLY') {
      requiredContribution = pmt(inflationAssumption / 4, yearsUntilDonation * 4, -1 * currentBalance, desiredDonationAmount, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'SEMIANNUAL') {
      requiredContribution = pmt(inflationAssumption / 2, yearsUntilDonation * 2, -1 * currentBalance, desiredDonationAmount, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'ANNUAL') {
      requiredContribution = pmt(inflationAssumption, yearsUntilDonation, -1 * currentBalance, desiredDonationAmount, 0);
    }
    // eslint-disable-next-line no-undef
    //requiredContribution = pmt(expectedRealReturn / 12, yearsUntilDonation * 12, -1 * currentBalance, desiredDonationAmount, 0);

    return res.status(200).send({ requiredContribution });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { pmt } = require('financial');

// Get Future Events Controller
exports.getFutureEvents = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      yearsUntilEvent: Joi.number().required(),
      eventCost: Joi.number().required(),
      currentBalance: Joi.number().required(),
      expectedNominalReturn: Joi.number().required(),
      inflationAssumption: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const yearsUntilEvent = parseFloat(req.params.yearsUntilEvent, 10);
    const eventCost = parseFloat(req.params.eventCost, 10);
    const currentBalance = parseFloat(req.params.currentBalance, 10);
    const expectedNominalReturn = parseFloat(req.params.expectedNominalReturn, 10);
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10);

    let expectedRealReturn = 0;
    let requiredContributionToPortfolio = 0;

    expectedRealReturn = (1 + expectedNominalReturn) / (1 + inflationAssumption) - 1;

    // eslint-disable-next-line no-undef
    requiredContributionToPortfolio = pmt(expectedRealReturn / 12, yearsUntilEvent * 12, -1 * currentBalance, eventCost, 0);

    return res.status(200).send({ requiredContributionToPortfolio });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

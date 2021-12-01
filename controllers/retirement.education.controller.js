/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { pv, pmt } = require('financial');

// Get Client Retirement Calculators Controller
exports.getEducation = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      childAge: Joi.number().required(),
      yearsUntilCharityPaymentsStart: Joi.number().required(),
      lengthOfCharityPayments: Joi.number().required(),
      frequencyOfPayments: Joi.string().required(),
      valueOfSinglePayment: Joi.number().required(),
      currentBalance: Joi.number().required(),
      expectedReturn: Joi.number().required(),
      inflationAssumption: Joi.number().required(),

    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const yearsUntilCharityPaymentsStart = parseFloat(req.params.yearsUntilCharityPaymentsStart, 10);
    const lengthOfCharityPayments = parseFloat(req.params.lengthOfCharityPayments, 10);
    const { frequencyOfPayments } = req.params;
    const valueOfSinglePayment = parseFloat(req.params.valueOfSinglePayment, 10);
    const currentBalance = parseFloat(req.params.currentBalance, 10);
    const expectedReturn = parseFloat(req.params.expectedReturn, 10);
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10);

    let expectedRealReturn = 0;
    let PVOfCharityRequirements = 0;
    let requiredMonthlyContribution = 0;

    expectedRealReturn = (1 + expectedReturn) / (1 + inflationAssumption) - 1;

    //   monthly , Quarterly , SemiAnnual , Annual cal
    if (frequencyOfPayments.toUpperCase() === 'MONTHLY') {
      PVOfCharityRequirements = pv(expectedRealReturn / 12, lengthOfCharityPayments * 12, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'UARTERLY') {
      PVOfCharityRequirements = pv(expectedRealReturn / 4, lengthOfCharityPayments * 4, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'SEMIANNUAL') {
      PVOfCharityRequirements = pv(expectedRealReturn / 2, lengthOfCharityPayments * 2, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'ANNUAL') {
      PVOfCharityRequirements = pv(expectedRealReturn, lengthOfCharityPayments, valueOfSinglePayment, 0, 0);
    }

    // eslint-disable-next-line no-undef
    requiredMonthlyContribution = pmt(expectedRealReturn / 12, yearsUntilCharityPaymentsStart * 12, currentBalance, PVOfCharityRequirements, 0);

    return res.status(200).send({ requiredMonthlyContribution });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

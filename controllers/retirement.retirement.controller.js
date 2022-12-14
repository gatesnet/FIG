/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const { pv, pmt } = require('financial');

// Get Retirement
exports.getRetirement = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      yearsUntilRetirementPaymentsStart: Joi.number().required(),
      lengthOfRetirementPayments: Joi.number().required(),
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

    const yearsUntilRetirementPaymentsStart = parseFloat(req.params.yearsUntilRetirementPaymentsStart, 10);
    const lengthOfRetirementPayments = parseFloat(req.params.lengthOfRetirementPayments, 10);
    const { frequencyOfPayments } = req.params;
    const { freuencyOfContributionToPortfolio } = req.params;
    const valueOfSinglePayment = parseFloat(req.params.valueOfSinglePayment, 10);
    const currentBalance = parseFloat(req.params.currentBalance, 10);
    // const expectedReturn = parseFloat(req.params.expectedReturn, 10);
    const inflationAssumption = parseFloat(req.params.inflationAssumption, 10)/100;
    

    //let expectedRealReturn = 0;
    let PVOfRetirementRequirements = 0;
    let requiredContribution = 0;
    let numberOfRetirementPayments = 0;


    if (frequencyOfPayments.toUpperCase() === 'MONTHLY') {
      numberOfRetirementPayments = lengthOfRetirementPayments * 12;
    } else if (frequencyOfPayments.toUpperCase() === 'QUARTERLY') {
      numberOfRetirementPayments = lengthOfRetirementPayments * 4;
    } else if (frequencyOfPayments.toUpperCase() === 'SEMIANNUAL') {
      numberOfRetirementPayments = lengthOfRetirementPayments * 2;
    } else if (frequencyOfPayments.toUpperCase() === 'ANNUAL') {
      numberOfRetirementPayments = lengthOfRetirementPayments;
    }
    
    // expectedRealReturn = (1 + expectedReturn) / (1 + inflationAssumption) - 1;

    //   monthly , Quarterly , SemiAnnual , Annual cal
    if (frequencyOfPayments.toUpperCase() === 'MONTHLY') {
      PVOfRetirementRequirements = pv(inflationAssumption / 12, numberOfRetirementPayments, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'QUARTERLY') {
      PVOfRetirementRequirements = pv(inflationAssumption / 4, numberOfRetirementPayments, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'SEMIANNUAL') {
      PVOfRetirementRequirements = pv(inflationAssumption / 2, numberOfRetirementPayments, valueOfSinglePayment, 0, 0);
    } else if (frequencyOfPayments.toUpperCase() === 'ANNUAL') {
      PVOfRetirementRequirements = pv(inflationAssumption, numberOfRetirementPayments, valueOfSinglePayment, 0, 0);
    }


    if (freuencyOfContributionToPortfolio.toUpperCase() === 'MONTHLY') {
      requiredContribution = pmt(inflationAssumption / 12, yearsUntilRetirementPaymentsStart * 12, currentBalance, PVOfRetirementRequirements, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'QUARTERLY') {
      requiredContribution = pmt(inflationAssumption / 4, yearsUntilRetirementPaymentsStart * 4, currentBalance, PVOfRetirementRequirements, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'SEMIANNUAL') {
      requiredContribution = pmt(inflationAssumption / 2, yearsUntilRetirementPaymentsStart * 2, currentBalance, PVOfRetirementRequirements, 0);
    } else if (freuencyOfContributionToPortfolio.toUpperCase() === 'ANNUAL') {
      requiredContribution = pmt(inflationAssumption, yearsUntilRetirementPaymentsStart, currentBalance, PVOfRetirementRequirements, 0);
    }

    // eslint-disable-next-line no-undef
    //requiredMonthlyContribution = pmt(expectedRealReturn / 12, yearsUntilCharityPaymentsStart * 12, currentBalance, PVOfCharityRequirements, 0);

    return res.status(200).send({ requiredContribution });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

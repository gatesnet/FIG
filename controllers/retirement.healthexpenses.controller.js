/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getHealthExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      healthInsurance: Joi.number().required(),
      gymMembership: Joi.number().required(),
      doctorDentistVisits: Joi.number().required(),
      medicinePrescriptions: Joi.number().required(),
      veterinarian: Joi.number().required(),
      lifeInsurance: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const healthInsurance = parseFloat(req.params.healthInsurance, 10);
    const gymMembership = parseFloat(req.params.gymMembership, 10);
    const doctorDentistVisits = parseFloat(req.params.doctorDentistVisits, 10);
    const medicinePrescriptions = parseFloat(req.params.medicinePrescriptions, 10);
    const veterinarian = parseFloat(req.params.veterinarian, 10);
    const lifeInsurance = parseFloat(req.params.lifeInsurance, 10);
    const healthExpensesWeekly = [];
    const healthExpensesYearly = [];
    let totalHealthWeeklyExpenses = 0;
    let totalHealthYearlyExpenses = 0;

    const healthInsuranceWeekly = lib.weeklyexpenses(healthInsurance);
    const gymMembershipWeekly = lib.weeklyexpenses(gymMembership);
    const doctorDentistVisitsWeekly = lib.weeklyexpenses(doctorDentistVisits);
    const medicinePrescriptionsWeekly = lib.weeklyexpenses(medicinePrescriptions);
    const veterinarianWeekly = lib.weeklyexpenses(veterinarian);
    const lifeInsuranceWeekly = lib.weeklyexpenses(lifeInsurance);

    totalHealthWeeklyExpenses = healthInsuranceWeekly + gymMembershipWeekly + doctorDentistVisitsWeekly + medicinePrescriptionsWeekly + veterinarianWeekly + lifeInsuranceWeekly;

    healthExpensesWeekly.push({
      healthInsuranceWeekly,
      gymMembershipWeekly,
      doctorDentistVisitsWeekly,
      medicinePrescriptionsWeekly,
      veterinarianWeekly,
      lifeInsuranceWeekly,
      totalHealthWeeklyExpenses,
    });

    const healthInsuranceYearly = lib.yearlyexpenses(healthInsurance);
    const gymMembershipYearly = lib.yearlyexpenses(gymMembership);
    const doctorDentistVisitsYearly = lib.yearlyexpenses(doctorDentistVisits);
    const medicinePrescriptionsYearly = lib.yearlyexpenses(medicinePrescriptions);
    const veterinarianYearly = lib.yearlyexpenses(veterinarian);
    const lifeInsuranceYearly = lib.yearlyexpenses(lifeInsurance);

    totalHealthYearlyExpenses = healthInsuranceYearly + gymMembershipYearly + doctorDentistVisitsYearly + medicinePrescriptionsYearly + veterinarianYearly + lifeInsuranceYearly;

    healthExpensesYearly.push({
      healthInsuranceYearly,
      gymMembershipYearly,
      doctorDentistVisitsYearly,
      medicinePrescriptionsYearly,
      veterinarianYearly,
      lifeInsuranceYearly,
      totalHealthYearlyExpenses,
    });

    return res.status(200).send({ healthExpensesWeekly, healthExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

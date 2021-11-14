/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getTransportationExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      carPayments: Joi.number().required(),
      autoInsurance: Joi.number().required(),
      fuel: Joi.number().required(),
      publicTransportation: Joi.number().required(),
      repairsMaintenance: Joi.number().required(),
      registrationLicense: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const carPayments = parseFloat(req.params.carPayments, 10);
    const autoInsurance = parseFloat(req.params.autoInsurance, 10);
    const fuel = parseFloat(req.params.fuel, 10);
    const publicTransportation = parseFloat(req.params.publicTransportation, 10);
    const repairsMaintenance = parseFloat(req.params.repairsMaintenance, 10);
    const registrationLicense = parseFloat(req.params.registrationLicense, 10);
    const transportationExpensesWeekly = [];
    const transportationExpensesYearly = [];
    let totalTransportationWeeklyExpenses = 0;
    let totalTransportationYearlyExpenses = 0;

    const carPaymentsWeekly = lib.weeklyexpenses(carPayments);
    const autoInsuranceWeekly = lib.weeklyexpenses(autoInsurance);
    const fuelWeekly = lib.weeklyexpenses(fuel);
    const publicTransportationWeekly = lib.weeklyexpenses(publicTransportation);
    const repairsMaintenanceWeekly = lib.weeklyexpenses(repairsMaintenance);
    const registrationLicenseWeekly = lib.weeklyexpenses(registrationLicense);

    totalTransportationWeeklyExpenses = carPaymentsWeekly + autoInsuranceWeekly + fuelWeekly + publicTransportationWeekly + repairsMaintenanceWeekly + registrationLicenseWeekly;

    transportationExpensesWeekly.push({
      carPaymentsWeekly,
      autoInsuranceWeekly,
      fuelWeekly,
      publicTransportationWeekly,
      repairsMaintenanceWeekly,
      registrationLicenseWeekly,
      totalTransportationWeeklyExpenses,
    });

    const carPaymentsYearly = lib.yearlyexpenses(carPayments);
    const autoInsuranceYearly = lib.yearlyexpenses(autoInsurance);
    const fuelYearly = lib.yearlyexpenses(fuel);
    const publicTransportationYearly = lib.yearlyexpenses(publicTransportation);
    const repairsMaintenanceYearly = lib.yearlyexpenses(repairsMaintenance);
    const registrationLicenseYearly = lib.yearlyexpenses(registrationLicense);

    totalTransportationYearlyExpenses = carPaymentsYearly + autoInsuranceYearly + fuelYearly + publicTransportationYearly + repairsMaintenanceYearly + registrationLicenseYearly;

    transportationExpensesYearly.push({
      carPaymentsYearly,
      autoInsuranceYearly,
      fuelYearly,
      publicTransportationYearly,
      repairsMaintenanceYearly,
      registrationLicenseYearly,
      totalTransportationYearlyExpenses,
    });

    return res.status(200).send({ transportationExpensesWeekly, transportationExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

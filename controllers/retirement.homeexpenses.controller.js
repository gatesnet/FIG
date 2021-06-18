/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getHomeExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      mortgageRent: Joi.number().required(),
      rentalInsurance: Joi.number().required(),
      electricity: Joi.number().required(),
      gasOil: Joi.number().required(),
      waterSewarTrash: Joi.number().required(),
      internetPhone: Joi.number().required(),
      vacationCabelSatellite: Joi.number().required(),
      realEstateTaxes: Joi.number().required(),
      furnishingAppliances: Joi.number().required(),
      lawnGarden: Joi.number().required(),
      maintenanceImprovments: Joi.number().required(),
      other: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const mortgageRent = parseInt(req.params.mortgageRent, 10);
    const rentalInsurance = parseInt(req.params.rentalInsurance, 10);
    const electricity = parseInt(req.params.electricity, 10);
    const gasOil = parseInt(req.params.gasOil, 10);
    const waterSewarTrash = parseInt(req.params.waterSewarTrash, 10);
    const internetPhone = parseInt(req.params.internetPhone, 10);
    const vacationCabelSatellite = parseInt(req.params.vacationCabelSatellite, 10);
    const realEstateTaxes = parseInt(req.params.realEstateTaxes, 10);
    const furnishingAppliances = parseInt(req.params.furnishingAppliances, 10);
    const lawnGarden = parseInt(req.params.lawnGarden, 10);
    const maintenanceImprovments = parseInt(req.params.maintenanceImprovments, 10);
    const otherHome = parseInt(req.params.other, 10);
    const homeExpensesWeekly = [];
    const homeExpensesYearly = [];
    let totalHomeWeeklyExpenses = 0;
    let totalHomeYearlyExpenses = 0;

    const mortgageRentWeekly = lib.weeklyexpenses(mortgageRent);
    const rentalInsuranceWeekly = lib.weeklyexpenses(rentalInsurance);
    const electricityWeekly = lib.weeklyexpenses(electricity);
    const gasOilWeekly = lib.weeklyexpenses(gasOil);
    const waterSewarTrashWeekly = lib.weeklyexpenses(waterSewarTrash);
    const internetPhoneWeekly = lib.weeklyexpenses(internetPhone);
    const vacationCabelSatelliteWeekly = lib.weeklyexpenses(vacationCabelSatellite);
    const realEstateTaxesWeekly = lib.weeklyexpenses(realEstateTaxes);
    const furnishingAppliancesWeekly = lib.weeklyexpenses(furnishingAppliances);
    const lawnGardenWeekly = lib.weeklyexpenses(lawnGarden);
    const maintenanceImprovmentsWeekly = lib.weeklyexpenses(maintenanceImprovments);
    const otherHomeWeekly = lib.weeklyexpenses(otherHome);

    totalHomeWeeklyExpenses = mortgageRentWeekly + rentalInsuranceWeekly + electricityWeekly + gasOilWeekly + waterSewarTrashWeekly + internetPhoneWeekly + vacationCabelSatelliteWeekly + realEstateTaxesWeekly + furnishingAppliancesWeekly + lawnGardenWeekly + maintenanceImprovmentsWeekly + otherHomeWeekly;

    homeExpensesWeekly.push({
      mortgageRentWeekly,
      rentalInsuranceWeekly,
      electricityWeekly,
      gasOilWeekly,
      waterSewarTrashWeekly,
      internetPhoneWeekly,
      vacationCabelSatelliteWeekly,
      realEstateTaxesWeekly,
      furnishingAppliancesWeekly,
      lawnGardenWeekly,
      maintenanceImprovmentsWeekly,
      otherHomeWeekly,
      totalHomeWeeklyExpenses,
    });

    const mortgageRentYearly = lib.yearlyexpenses(mortgageRent);
    const rentalInsuranceYearly = lib.yearlyexpenses(rentalInsurance);
    const electricityYearly = lib.yearlyexpenses(electricity);
    const gasOilYearly = lib.yearlyexpenses(gasOil);
    const waterSewarTrashYearly = lib.yearlyexpenses(waterSewarTrash);
    const internetPhoneYearly = lib.yearlyexpenses(internetPhone);
    const vacationCabelSatelliteYearly = lib.yearlyexpenses(vacationCabelSatellite);
    const realEstateTaxesYearly = lib.yearlyexpenses(realEstateTaxes);
    const furnishingAppliancesYearly = lib.yearlyexpenses(furnishingAppliances);
    const lawnGardenYearly = lib.yearlyexpenses(lawnGarden);
    const maintenanceImprovmentsYearly = lib.yearlyexpenses(maintenanceImprovments);
    const otherHomeYearly = lib.yearlyexpenses(otherHome);

    totalHomeYearlyExpenses = mortgageRentYearly + rentalInsuranceYearly + electricityYearly + gasOilYearly + waterSewarTrashYearly + internetPhoneYearly + vacationCabelSatelliteYearly + realEstateTaxesYearly + furnishingAppliancesYearly + lawnGardenYearly + maintenanceImprovmentsYearly + otherHomeYearly;

    homeExpensesYearly.push({
      mortgageRentYearly,
      rentalInsuranceYearly,
      electricityYearly,
      gasOilYearly,
      waterSewarTrashYearly,
      internetPhoneYearly,
      vacationCabelSatelliteYearly,
      realEstateTaxesYearly,
      furnishingAppliancesYearly,
      lawnGardenYearly,
      maintenanceImprovmentsYearly,
      otherHomeYearly,
      totalHomeYearlyExpenses,
    });

    return res.status(200).send({ homeExpensesWeekly, homeExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

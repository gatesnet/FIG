/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getVacationHolidayExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      airfare: Joi.number().required(),
      accommodations: Joi.number().required(),
      food: Joi.number().required(),
      souvenirs: Joi.number().required(),
      rentalCar: Joi.number().required(),
      other: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const airfare = parseFloat(req.params.airfare, 10);
    const accommodations = parseFloat(req.params.accommodations, 10);
    const food = parseFloat(req.params.food, 10);
    const souvenirs = parseFloat(req.params.souvenirs, 10);
    const rentalCar = parseFloat(req.params.rentalCar, 10);
    const otherVacationHoliday = parseFloat(req.params.other, 10);
    const vacationHolidayExpensesWeekly = [];
    const vacationHolidayExpensesYearly = [];
    let totalVacationHolidayWeeklyExpenses = 0;
    let totalVacationHolidayYearlyExpenses = 0;

    const airfareWeekly = lib.weeklyexpenses(airfare);
    const accommodationsWeekly = lib.weeklyexpenses(accommodations);
    const foodWeekly = lib.weeklyexpenses(food);
    const souvenirsWeekly = lib.weeklyexpenses(souvenirs);
    const rentalCarWeekly = lib.weeklyexpenses(rentalCar);
    const otherVacationHolidayWeekly = lib.weeklyexpenses(otherVacationHoliday);

    totalVacationHolidayWeeklyExpenses = airfareWeekly + accommodationsWeekly + foodWeekly + souvenirsWeekly + rentalCarWeekly + otherVacationHolidayWeekly;

    vacationHolidayExpensesWeekly.push({
      airfareWeekly,
      accommodationsWeekly,
      foodWeekly,
      souvenirsWeekly,
      rentalCarWeekly,
      otherVacationHolidayWeekly,
      totalVacationHolidayWeeklyExpenses,
    });

    const airfareYearly = lib.yearlyexpenses(airfare);
    const accommodationsYearly = lib.yearlyexpenses(accommodations);
    const foodYearly = lib.yearlyexpenses(food);
    const souvenirsYearly = lib.yearlyexpenses(souvenirs);
    const rentalCarYearly = lib.yearlyexpenses(rentalCar);
    const otherVacationHolidayYearly = lib.yearlyexpenses(otherVacationHoliday);

    totalVacationHolidayYearlyExpenses = airfareYearly + accommodationsYearly + foodYearly + souvenirsYearly + rentalCarYearly + otherVacationHolidayYearly;

    vacationHolidayExpensesYearly.push({
      airfareYearly,
      accommodationsYearly,
      foodYearly,
      souvenirsYearly,
      rentalCarYearly,
      otherVacationHolidayYearly,
      totalVacationHolidayYearlyExpenses,
    });

    return res.status(200).send({ vacationHolidayExpensesWeekly, vacationHolidayExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

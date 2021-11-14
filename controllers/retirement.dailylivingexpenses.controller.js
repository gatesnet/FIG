/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getDailyLivingExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      groceries: Joi.number().required(),
      childCare: Joi.number().required(),
      diningOut: Joi.number().required(),
      clothing: Joi.number().required(),
      cleaning: Joi.number().required(),
      salonBarber: Joi.number().required(),
      other: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const groceries = parseFloat(req.params.groceries, 10);
    const childCare = parseFloat(req.params.childCare, 10);
    const diningOut = parseFloat(req.params.diningOut, 10);
    const clothing = parseFloat(req.params.clothing, 10);
    const cleaning = parseFloat(req.params.cleaning, 10);
    const salonBarber = parseFloat(req.params.salonBarber, 10);
    const otherDailyLiving = parseFloat(req.params.other, 10);
    const dailyLivingExpensesWeekly = [];
    const dailyLivingExpensesYearly = [];
    let totalDailyLivingWeeklyExpenses = 0;
    let totalDailyLivingYearlyExpenses = 0;

    const groceriesWeekly = lib.weeklyexpenses(groceries);
    const childCareWeekly = lib.weeklyexpenses(childCare);
    const diningOutWeekly = lib.weeklyexpenses(diningOut);
    const clothingWeekly = lib.weeklyexpenses(clothing);
    const cleaningWeekly = lib.weeklyexpenses(cleaning);
    const salonBarberWeekly = lib.weeklyexpenses(salonBarber);
    const otherDailyLivingWeekly = lib.weeklyexpenses(otherDailyLiving);

    totalDailyLivingWeeklyExpenses = groceriesWeekly + childCareWeekly + diningOutWeekly + clothingWeekly + cleaningWeekly + salonBarberWeekly + otherDailyLivingWeekly;

    dailyLivingExpensesWeekly.push({
      groceriesWeekly,
      childCareWeekly,
      diningOutWeekly,
      clothingWeekly,
      cleaningWeekly,
      salonBarberWeekly,
      otherDailyLivingWeekly,
      totalDailyLivingWeeklyExpenses,
    });

    const groceriesYearly = lib.yearlyexpenses(groceries);
    const childCareYearly = lib.yearlyexpenses(childCare);
    const diningOutYearly = lib.yearlyexpenses(diningOut);
    const clothingYearly = lib.yearlyexpenses(clothing);
    const cleaningYearly = lib.yearlyexpenses(cleaning);
    const salonBarberYearly = lib.yearlyexpenses(salonBarber);
    const otherDailyLivingYearly = lib.yearlyexpenses(otherDailyLiving);

    totalDailyLivingYearlyExpenses = groceriesYearly + childCareYearly + diningOutYearly + clothingYearly + cleaningYearly + salonBarberYearly + otherDailyLivingYearly;

    dailyLivingExpensesYearly.push({
      groceriesYearly,
      childCareYearly,
      diningOutYearly,
      clothingYearly,
      cleaningYearly,
      salonBarberYearly,
      otherDailyLivingYearly,
      totalDailyLivingYearlyExpenses,
    });

    return res.status(200).send({ dailyLivingExpensesWeekly, dailyLivingExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

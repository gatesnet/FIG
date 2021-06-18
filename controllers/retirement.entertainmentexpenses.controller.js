/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getEntertainmentExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      children: Joi.number().required(),
      concertsPlays: Joi.number().required(),
      sports: Joi.number().required(),
      outdoorRecreation: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const children = parseInt(req.params.children, 10);
    const concertsPlays = parseInt(req.params.concertsPlays, 10);
    const sports = parseInt(req.params.sports, 10);
    const outdoorRecreation = parseInt(req.params.outdoorRecreation, 10);
    const entertainmentExpensesWeekly = [];
    const entertainmentExpensesYearly = [];
    let totalEntertainmentWeeklyExpenses = 0;
    let totalEntertainmentYearlyExpenses = 0;

    const childrenWeekly = lib.weeklyexpenses(children);
    const concertsPlaysWeekly = lib.weeklyexpenses(concertsPlays);
    const sportsWeekly = lib.weeklyexpenses(sports);
    const outdoorRecreationWeekly = lib.weeklyexpenses(outdoorRecreation);

    totalEntertainmentWeeklyExpenses = childrenWeekly + concertsPlaysWeekly + sportsWeekly + outdoorRecreationWeekly;

    entertainmentExpensesWeekly.push({
      childrenWeekly,
      concertsPlaysWeekly,
      sportsWeekly,
      outdoorRecreationWeekly,
      totalEntertainmentWeeklyExpenses,
    });

    const childrenYearly = lib.yearlyexpenses(children);
    const concertsPlaysYearly = lib.yearlyexpenses(concertsPlays);
    const sportsYearly = lib.yearlyexpenses(sports);
    const outdoorRecreationYearly = lib.yearlyexpenses(outdoorRecreation);

    totalEntertainmentYearlyExpenses = childrenYearly + concertsPlaysYearly + sportsYearly + outdoorRecreationYearly;

    entertainmentExpensesYearly.push({
      childrenYearly,
      concertsPlaysYearly,
      sportsYearly,
      outdoorRecreationYearly,
      totalEntertainmentYearlyExpenses,
    });

    return res.status(200).send({ entertainmentExpensesWeekly, entertainmentExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

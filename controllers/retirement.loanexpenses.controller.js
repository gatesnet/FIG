/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');
const lib = require('../helper/lib');

// Get Home Expenses Controller
exports.getLoanExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      mortgageLoan: Joi.number().required(),
      creditCards: Joi.number().required(),
      PersonalLoan: Joi.number().required(),
      other: Joi.number().required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const mortgageLoan = parseFloat(req.params.mortgageLoan, 10);
    const creditCards = parseFloat(req.params.creditCards, 10);
    const PersonalLoan = parseFloat(req.params.PersonalLoan, 10);
    const otherLoan = parseFloat(req.params.other, 10);
    const loanExpensesWeekly = [];
    const loanExpensesYearly = [];
    let totalLoanWeeklyExpenses = 0;
    let totalLoanYearlyExpenses = 0;

    const mortgageLoanWeekly = lib.weeklyexpenses(mortgageLoan);
    const creditCardsWeekly = lib.weeklyexpenses(creditCards);
    const PersonalLoanWeekly = lib.weeklyexpenses(PersonalLoan);
    const otherLoanWeekly = lib.weeklyexpenses(otherLoan);

    totalLoanWeeklyExpenses = mortgageLoanWeekly + creditCardsWeekly + PersonalLoanWeekly + otherLoanWeekly;

    loanExpensesWeekly.push({
      mortgageLoanWeekly,
      creditCardsWeekly,
      PersonalLoanWeekly,
      otherLoanWeekly,
      totalLoanWeeklyExpenses,
    });

    const mortgageLoanYearly = lib.yearlyexpenses(mortgageLoan);
    const creditCardsYearly = lib.yearlyexpenses(creditCards);
    const PersonalLoanYearly = lib.yearlyexpenses(PersonalLoan);
    const otherLoanYearly = lib.yearlyexpenses(otherLoan);

    totalLoanYearlyExpenses = mortgageLoanYearly + creditCardsYearly + PersonalLoanYearly + otherLoanYearly;

    loanExpensesYearly.push({
      mortgageLoanYearly,
      creditCardsYearly,
      PersonalLoanYearly,
      otherLoanYearly,
      totalLoanYearlyExpenses,
    });

    return res.status(200).send({ loanExpensesWeekly, loanExpensesYearly });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

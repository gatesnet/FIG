/* eslint-disable max-len */
const express = require('express');

const retirementLoanController = require('../controllers/retirement.loanexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getloanexpenses/{mortgageLoan}/{creditCards}/{PersonalLoan}/{other}:
 *    get:
 *      description: Used to get Loan Expenses
 *      summary: Get Loan Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: mortgageLoan
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: creditCards
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: PersonalLoan
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: other
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *      responses:
 *          '200':
 *              description: Get loan expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "loanExpensesWeekly": [
    {
      "mortgageLoanWeekly": 233.33333333333334,
      "creditCardsWeekly": 233.33333333333334,
      "PersonalLoanWeekly": 233.33333333333334,
      "otherLoanWeekly": 233.33333333333334,
      "totalLoanWeeklyExpenses": 933.3333333333334
    }
  ],
  "loanExpensesYearly": [
    {
      "mortgageLoanYearly": 12000,
      "creditCardsYearly": 12000,
      "PersonalLoanYearly": 12000,
      "otherLoanYearly": 12000,
      "totalLoanYearlyExpenses": 48000
    }
  ]
}]
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Authorization information is missing or invalid
 *          '404':
 *              description: Not found
 *          '5xx':
 *              description: Unexpected error
 */

router.get(
  '/getloanexpenses/:mortgageLoan/:creditCards/:PersonalLoan/:other/',
  checkAuthMiddleware.checkAuth,
  retirementLoanController.getLoanExpenses,
);

module.exports = router;

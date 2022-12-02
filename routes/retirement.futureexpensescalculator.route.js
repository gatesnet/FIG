/* eslint-disable max-len */
const express = require('express');

const retirementFutureExpensesCalculatorController = require('../controllers/retirement.futureexpensescalculator.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getfutureexpensescalculator/{yearsUntilFutureExpensesCalculatorPaymentsStart}/{lengthOfFutureExpensesCalculatorPayments}/{frequencyOfPayments}/{valueOfSinglePayment}/{currentBalance}/{inflationAssumption}/{freuencyOfContributionToPortfolio}:
 *    get:
 *      description: Used to get Future Expenses Calculator
 *      summary: Get Required Future Expenses Calculator
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: yearsUntilFutureExpensesCalculatorPaymentsStart
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: lengthOfFutureExpensesCalculatorPayments
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: frequencyOfPayments
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *        - in: path
 *          name: valueOfSinglePayment
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: currentBalance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: inflationAssumption
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: freuencyOfContributionToPortfolio
 *          required: false
 *          explode: false
 *          schema:
 *            type: string 
 *      responses:
 *          '200':
 *              description: Get Future Expenses Calculator successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        requiredMonthlyContribution:
 *                          type: float
 *                          example: 331.98
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
  '/getfutureexpensescalculator/:yearsUntilFutureExpensesCalculatorPaymentsStart/:lengthOfFutureExpensesCalculatorPayments/:frequencyOfPayments/:valueOfSinglePayment/:currentBalance/:inflationAssumption/:freuencyOfContributionToPortfolio',
  checkAuthMiddleware.checkAuth,
  retirementFutureExpensesCalculatorController.getFutureExpensesCalculator,
);

module.exports = router;

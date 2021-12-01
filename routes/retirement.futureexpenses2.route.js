/* eslint-disable max-len */
const express = require('express');

const retirementFutureExpenses2Controller = require('../controllers/retirement.futureexpenses2.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getfutureexpenses2/{portfolioBalance}/{yearsUntilRetirement}/{monthlyContributionToPortfolio}/{yearsDuringRetirement}/{expectedReturnOnPortfolio}/{inflationAssumption}:
 *    get:
 *      description: Used to get Recurring Charity Payments
 *      summary: Get Required Recurring Charity Payments
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: portfolioBalance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: yearsUntilRetirement
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: monthlyContributionToPortfolio
 *          required: false
 *          explode: false
 *          schema:
 *            type: flaot
 *        - in: path
 *          name: yearsDuringRetirement
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: expectedReturnOnPortfolio
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
 *      responses:
 *          '200':
 *              description: Get Recurring Charity Payments successful
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
  '/getfutureexpenses2/:portfolioBalance/:yearsUntilRetirement/:monthlyContributionToPortfolio/:yearsDuringRetirement/:expectedReturnOnPortfolio/:inflationAssumption',
  checkAuthMiddleware.checkAuth,
  retirementFutureExpenses2Controller.getFutureExpenses2,
);

module.exports = router;

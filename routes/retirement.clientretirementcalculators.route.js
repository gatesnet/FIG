/* eslint-disable max-len */
const express = require('express');

const retirementClientRetirementCalculatorsController = require('../controllers/retirement.clientretirementcalculators.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getclientretirementcalculators/{currentAge}/{currentSavingsBalance}/{monthlyEarnings}/{retirementAge}/{monthlyExpensesDuringRetirement}/{assumedAnnualInflation}/{assumedYearsDuringRetirement}/{expectedNominalReturnOnAssets}:
 *    get:
 *      description: Used to get Required Monthly contribution
 *      summary: Get Required Monthly contribution
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: currentAge
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: currentSavingsBalance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: monthlyEarnings
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: retirementAge
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: monthlyExpensesDuringRetirement
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: assumedAnnualInflation
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: assumedYearsDuringRetirement
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: expectedNominalReturnOnAssets
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *      responses:
 *          '200':
 *              description: Get Required Monthly contribution successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        requiredMonthlycontribution:
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
  '/getclientretirementcalculators/:currentAge/:currentSavingsBalance/:monthlyEarnings/:retirementAge/:monthlyExpensesDuringRetirement/:assumedAnnualInflation/:assumedYearsDuringRetirement/:expectedNominalReturnOnAssets',
  checkAuthMiddleware.checkAuth,
  retirementClientRetirementCalculatorsController.getClientRetirementCalculators,
);

module.exports = router;

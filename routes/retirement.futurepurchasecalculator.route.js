/* eslint-disable max-len */
const express = require('express');

const retirementFuturePurchaseCalculatorController = require('../controllers/retirement.futurepurchasecalculator.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getfuturepurchasecalculator/{startDateOfInvestmentHorizon}/{endDateOfInvestmentHorizon}/{depositRate}/{frequencyOfDepositRate}/{purchaseCost}/{currentBalance}/{expectedNominalReturnDuringInvestmentHorizon}/{inflationAssumptionDuringInvestmentHorizon}:
 *    get:
 *      description: Used to get Future Purchase Calculator
 *      summary: Get Required Future Purchase Calculator
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: startDateOfInvestmentHorizon
 *          required: false
 *          explode: false
 *          schema:
 *            type: date
 *        - in: path
 *          name: endDateOfInvestmentHorizon
 *          required: false
 *          explode: false
 *          schema:
 *            type: date
 *        - in: path
 *          name: depositRate
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: frequencyOfDepositRate
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: purchaseCost
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
 *          name: expectedNominalReturnDuringInvestmentHorizon
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: inflationAssumptionDuringInvestmentHorizon
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *      responses:
 *          '200':
 *              description: Get Future Purches Calculator successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        RequiredMonthlyContributiontoPortfolioDuringInvestmentHorizon:
 *                          type: float
 *                          example: 1008.724087
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
  '/getfuturepurchasecalculator/:startDateOfInvestmentHorizon/:endDateOfInvestmentHorizon/:depositRate/:frequencyOfDepositRate/:purchaseCost/:currentBalance/:expectedNominalReturnDuringInvestmentHorizon/:inflationAssumptionDuringInvestmentHorizon',
  checkAuthMiddleware.checkAuth,
  retirementFuturePurchaseCalculatorController.getfuturepurchasecalculator,
);

module.exports = router;

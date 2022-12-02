/* eslint-disable max-len */
const express = require('express');

const retirementFuturePurchaseLifeStyleController = require('../controllers/retirement.futurepurchaselifestyle.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getfuturepurchaselifestyle/{yearsUntilDonation}/{desiredDonationAmount}/{currentBalance}/{inflationAssumption}/{freuencyOfContributionToPortfolio}:
 *    get:
 *      description: Used to get Future Purchase Lifestyle
 *      summary: Get Required Future Purchase Lifestyle
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: yearsUntilDonation
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: desiredDonationAmount
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: currentBalance
 *          required: false
 *          explode: false
 *          schema:
 *            type: flaot
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
  '/getfuturepurchaselifestyle/:yearsUntilDonation/:desiredDonationAmount/:currentBalance/:inflationAssumption/:freuencyOfContributionToPortfolio',
  checkAuthMiddleware.checkAuth,
  retirementFuturePurchaseLifeStyleController.getFuturePurchaseLifeStyle,
);

module.exports = router;

/* eslint-disable max-len */
const express = require('express');

const retirementRetirementController = require('../controllers/retirement.retirement.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getretirement/{yearsUntilRetirementPaymentsStart}/{lengthOfRetirementPayments}/{frequencyOfPayments}/{valueOfSinglePayment}/{currentBalance}/{inflationAssumption}/{freuencyOfContributionToPortfolio}:
 *    get:
 *      description: Used to get Retirement
 *      summary: Get Required Retirement
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: yearsUntilRetirementPaymentsStart
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: lengthOfRetirementPayments
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
 *              description: Get Retirement successful
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
  '/getretirement/:yearsUntilRetirementPaymentsStart/:lengthOfRetirementPayments/:frequencyOfPayments/:valueOfSinglePayment/:currentBalance/:inflationAssumption/:freuencyOfContributionToPortfolio',
  checkAuthMiddleware.checkAuth,
  retirementRetirementController.getRetirement,
);

module.exports = router;

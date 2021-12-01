/* eslint-disable max-len */
const express = require('express');

const retirementSingleCharityPaymentController = require('../controllers/retirement.singlecharitypayment.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getsinglecharitypayment/{yearsUntilDonation}/{desiredDonationAmount}/{currentBalance}/{expectedNominalReturn}/{inflationAssumption}:
 *    get:
 *      description: Used to get Recurring Charity Payments
 *      summary: Get Required Recurring Charity Payments
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
 *          name: expectedNominalReturn
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
  '/getsinglecharitypayment/:yearsUntilDonation/:desiredDonationAmount/:currentBalance/:expectedNominalReturn/:inflationAssumption',
  checkAuthMiddleware.checkAuth,
  retirementSingleCharityPaymentController.getSingleCharityPayment,
);

module.exports = router;

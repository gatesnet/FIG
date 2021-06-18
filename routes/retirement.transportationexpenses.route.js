/* eslint-disable max-len */
const express = require('express');

const retirementTransportationController = require('../controllers/retirement.transportationexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /api/retirement/gettransportationexpenses/{carPayments}/{autoInsurance}/{fuel}/{publicTransportation}/{repairsMaintenance}/{registrationLicense}:
 *    get:
 *      description: Used to get Transportation Expenses
 *      summary: Get Transportation Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: carPayments
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: autoInsurance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: fuel
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: publicTransportation
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: repairsMaintenance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: registrationLicense
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *      responses:
 *          '200':
 *              description: Get transportation expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "transportationExpensesWeekly": [
    {
      "carPaymentsWeekly": 233.33333333333334,
      "autoInsuranceWeekly": 233.33333333333334,
      "fuelWeekly": 233.33333333333334,
      "publicTransportationWeekly": 233.33333333333334,
      "repairsMaintenanceWeekly": 233.33333333333334,
      "registrationLicenseWeekly": 233.33333333333334,
      "totalTransportationWeeklyExpenses": 1400
    }
  ],
  "transportationExpensesYearly": [
    {
      "carPaymentsYearly": 12000,
      "autoInsuranceYearly": 12000,
      "fuelYearly": 12000,
      "publicTransportationYearly": 12000,
      "repairsMaintenanceYearly": 12000,
      "registrationLicenseYearly": 12000,
      "totalTransportationYearlyExpenses": 72000
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
  '/gettransportationexpenses/:carPayments/:autoInsurance/:fuel/:publicTransportation/:repairsMaintenance/:registrationLicense',
  checkAuthMiddleware.checkAuth,
  retirementTransportationController.getTransportationExpenses,
);

module.exports = router;

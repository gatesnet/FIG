/* eslint-disable max-len */
const express = require('express');

const retirementHealthController = require('../controllers/retirement.healthexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/gethealthexpenses/{healthInsurance}/{gymMembership}/{doctorDentistVisits}/{medicinePrescriptions}/{veterinarian}/{lifeInsurance}:
 *    get:
 *      description: Used to get Health Expenses
 *      summary: Get Health Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: healthInsurance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: gymMembership
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: doctorDentistVisits
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: medicinePrescriptions
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: veterinarian
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: lifeInsurance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *      responses:
 *          '200':
 *              description: Get Health expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "healthExpensesWeekly": [
    {
      "healthInsuranceWeekly": 233.33333333333334,
      "gymMembershipWeekly": 233.33333333333334,
      "doctorDentistVisitsWeekly": 233.33333333333334,
      "medicinePrescriptionsWeekly": 233.33333333333334,
      "veterinarianWeekly": 233.33333333333334,
      "lifeInsuranceWeekly": 233.33333333333334,
      "totalHealthWeeklyExpenses": 1400
    }
  ],
  "healthExpensesYearly": [
    {
      "healthInsuranceYearly": 12000,
      "gymMembershipYearly": 12000,
      "doctorDentistVisitsYearly": 12000,
      "medicinePrescriptionsYearly": 12000,
      "veterinarianYearly": 12000,
      "lifeInsuranceYearly": 12000,
      "totalHealthYearlyExpenses": 72000
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
  '/gethealthexpenses/:healthInsurance/:gymMembership/:doctorDentistVisits/:medicinePrescriptions/:veterinarian/:lifeInsurance',
  checkAuthMiddleware.checkAuth,
  retirementHealthController.getHealthExpenses,
);

module.exports = router;

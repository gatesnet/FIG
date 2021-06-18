/* eslint-disable max-len */
const express = require('express');

const retirementHomeController = require('../controllers/retirement.homeexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /api/retirement/gethomeexpenses/{mortgageRent}/{rentalInsurance}/{electricity}/{gasOil}/{waterSewarTrash}/{internetPhone}/{vacationCabelSatellite}/{realEstateTaxes}/{furnishingAppliances}/{lawnGarden}/{maintenanceImprovments}/{other}:
 *    get:
 *      description: Used to get Home Expenses
 *      summary: Get Home Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: mortgageRent
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: rentalInsurance
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: electricity
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: gasOil
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: waterSewarTrash
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: internetPhone
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: vacationCabelSatellite
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: realEstateTaxes
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: furnishingAppliances
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: lawnGarden
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: maintenanceImprovments
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
 *              description: Get home expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "homeExpensesWeekly": [
    {
      "mortgageRentWeekly": 233.33,
      "rentalInsuranceWeekly": 233.33,
      "electricityWeekly": 233.33,
      "gasOilWeekly": 233.33,
      "waterSewarTrashWeekly": 233.33,
      "internetPhoneWeekly": 233.33,
      "vacationCabelSatelliteWeekly": 233.33,
      "realEstateTaxesWeekly": 233.33,
      "furnishingAppliancesWeekly": 233.33,
      "lawnGardenWeekly": 233.33,
      "maintenanceImprovmentsWeekly": 233.33,
      "otherHomeWeekly": 233.33,
      "totalHomeWeeklyExpenses": 2799.96
    }
  ],
  "homeExpensesYearly": [
    {
      "mortgageRentYearly": 12000,
      "rentalInsuranceYearly": 12000,
      "electricityYearly": 12000,
      "gasOilYearly": 12000,
      "waterSewarTrashYearly": 12000,
      "internetPhoneYearly": 12000,
      "vacationCabelSatelliteYearly": 12000,
      "realEstateTaxesYearly": 12000,
      "furnishingAppliancesYearly": 12000,
      "lawnGardenYearly": 12000,
      "maintenanceImprovmentsYearly": 12000,
      "otherHomeYearly": 12000,
      "totalHomeYearlyExpenses": 144000
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
  '/gethomeexpenses/:mortgageRent/:rentalInsurance/:electricity/:gasOil/:waterSewarTrash/:internetPhone/:vacationCabelSatellite/:realEstateTaxes/:furnishingAppliances/:lawnGarden/:maintenanceImprovments/:other',
  checkAuthMiddleware.checkAuth,
  retirementHomeController.getHomeExpenses,
);

module.exports = router;

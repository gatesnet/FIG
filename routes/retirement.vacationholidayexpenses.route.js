/* eslint-disable max-len */
const express = require('express');

const retirementVacationHolidayController = require('../controllers/retirement.vacationholidayexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /api/retirement/getvacationholidayexpenses/{airfare}/{accommodations}/{food}/{souvenirs}/{rentalCar}/{other}:
 *    get:
 *      description: Used to get Vacation Holiday Expenses
 *      summary: Get Vacation Holiday Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: airfare
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: accommodations
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: food
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: souvenirs
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: rentalCar
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
 *              description: Get Vacation Holiday expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "vacationHolidayExpensesWeekly": [
    {
      "airfareWeekly": 233.33333333333334,
      "accommodationsWeekly": 233.33333333333334,
      "foodWeekly": 233.33333333333334,
      "souvenirsWeekly": 233.33333333333334,
      "rentalCarWeekly": 233.33333333333334,
      "otherVacationHolidayWeekly": 233.33333333333334,
      "totalVacationHolidayWeeklyExpenses": 1400
    }
  ],
  "vacationHolidayExpensesYearly": [
    {
      "airfareYearly": 12000,
      "accommodationsYearly": 12000,
      "foodYearly": 12000,
      "souvenirsYearly": 12000,
      "rentalCarYearly": 12000,
      "otherVacationHolidayYearly": 12000,
      "totalVacationHolidayYearlyExpenses": 72000
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
  '/getvacationholidayexpenses/:airfare/:accommodations/:food/:souvenirs/:rentalCar/:other',
  checkAuthMiddleware.checkAuth,
  retirementVacationHolidayController.getVacationHolidayExpenses,
);

module.exports = router;

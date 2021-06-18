/* eslint-disable max-len */
const express = require('express');

const retirementDailyLivingController = require('../controllers/retirement.dailylivingexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getdailylivingexpenses/{groceries}/{childCare}/{diningOut}/{clothing}/{cleaning}/{salonBarber}/{other}:
 *    get:
 *      description: Used to get Daily Living Expenses
 *      summary: Get Daily Living Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: groceries
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: childCare
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: diningOut
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: clothing
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: cleaning
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: salonBarber
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
 *              description: Get daily living expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "dailyLivingExpensesWeekly": [
    {
      "groceriesWeekly": 233.33333333333334,
      "childCareWeekly": 233.33333333333334,
      "diningOutWeekly": 233.33333333333334,
      "clothingWeekly": 233.33333333333334,
      "cleaningWeekly": 233.33333333333334,
      "salonBarberWeekly": 233.33333333333334,
      "otherDailyLivingWeekly": 233.33333333333334,
      "totalDailyLivingWeeklyExpenses": 1633.3333333333333
    }
  ],
  "dailyLivingExpensesYearly": [
    {
      "groceriesYearly": 12000,
      "childCareYearly": 12000,
      "diningOutYearly": 12000,
      "clothingYearly": 12000,
      "cleaningYearly": 12000,
      "salonBarberYearly": 12000,
      "otherDailyLivingYearly": 12000,
      "totalDailyLivingYearlyExpenses": 84000
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
  '/getdailylivingexpenses/:groceries/:childCare/:diningOut/:clothing/:cleaning/:salonBarber/:other',
  checkAuthMiddleware.checkAuth,
  retirementDailyLivingController.getDailyLivingExpenses,
);

module.exports = router;

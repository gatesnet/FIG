/* eslint-disable max-len */
const express = require('express');

const retirementEntertainmentController = require('../controllers/retirement.entertainmentexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /api/retirement/getentertainmentexpenses/{children}/{concertsPlays}/{sports}/{outdoorRecreation}:
 *    get:
 *      description: Used to get Entertainment Expenses
 *      summary: Get Entertainment Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: children
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: concertsPlays
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: sports
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: outdoorRecreation
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *      responses:
 *          '200':
 *              description: Get entertainment expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "entertainmentExpensesWeekly": [
    {
      "childrenWeekly": 233.33333333333334,
      "concertsPlaysWeekly": 233.33333333333334,
      "sportsWeekly": 233.33333333333334,
      "outdoorRecreationWeekly": 233.33333333333334,
      "totalEntertainmentWeeklyExpenses": 933.3333333333334
    }
  ],
  "entertainmentExpensesYearly": [
    {
      "childrenYearly": 12000,
      "concertsPlaysYearly": 12000,
      "sportsYearly": 12000,
      "outdoorRecreationYearly": 12000,
      "totalEntertainmentYearlyExpenses": 48000
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
  '/getentertainmentexpenses/:children/:concertsPlays/:sports/:outdoorRecreation/',
  checkAuthMiddleware.checkAuth,
  retirementEntertainmentController.getEntertainmentExpenses,
);

module.exports = router;

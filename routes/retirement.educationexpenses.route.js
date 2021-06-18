/* eslint-disable max-len */
const express = require('express');

const retirementEducationController = require('../controllers/retirement.educationexpenses.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /api/retirement/geteducationexpenses/{schools}/{college}/{courses}/{other}:
 *    get:
 *      description: Used to get Education Expenses
 *      summary: Get Education Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: schools
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: college
 *          required: false
 *          explode: false
 *          schema:
 *            type: float
 *        - in: path
 *          name: courses
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
 *              description: Get education expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: string
 *                    example: [{
  "educationExpensesWeekly": [
    {
      "schoolsWeekly": 233.33,
      "collegeWeekly": 233.33,
      "coursesWeekly": 233.33,
      "otherEducationWeekly": 233.33,
      "totalEducationWeeklyExpenses": 933.32
    }
  ],
  "educationExpensesYearly": [
    {
      "schoolsYearly": 12000,
      "collegeYearly": 12000,
      "coursesYearly": 12000,
      "otherEducationYearly": 12000,
      "totalEducationYearlyExpenses": 48000
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
  '/geteducationexpenses/:schools/:college/:courses/:other/',
  checkAuthMiddleware.checkAuth,
  retirementEducationController.getEducationExpenses,
);

module.exports = router;

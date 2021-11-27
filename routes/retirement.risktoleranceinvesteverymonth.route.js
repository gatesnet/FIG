const express = require('express');

const retirementRiskToleranceInvestEveryMonthController = require('../controllers/retirement.risktoleranceinvesteverymonth.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*
 * @swagger
 * /retirement/getrisktoleranceinvesteverymonth:
 *   get:
 *      description: Used to get all risk tolerance invest every month
 *      summary: Get all risk tolerance invest every month
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get risk tolerance invest every month successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        InvestEveryMonth_id:
 *                          type: integer
 *                          example: 1
 *                        FivePercentage:
 *                          type: string
 *                        FiveToFiftenPercentage:
 *                          type: string
 *                        AboveFivePercentage:
 *                          type: string
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
  '/getrisktoleranceinvesteverymonth',
  checkAuthMiddleware.checkAuth,
  retirementRiskToleranceInvestEveryMonthController.getrisktoleranceinvesteverymonth,
);

module.exports = router;

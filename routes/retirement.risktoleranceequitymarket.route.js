const express = require('express');

const retirementRiskToleranceEquityMarketController = require('../controllers/retirement.risktoleranceequitymarket.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*
 * @swagger
 * /retirement/getrisktoleranceequitymarket:
 *   get:
 *      description: Used to get all risk tolerance equity market
 *      summary: Get all risk tolerance equity market
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get risk tolerance equity market successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        EquityMarket_id:
 *                          type: integer
 *                          example: 1
 *                        Impulsive:
 *                          type: string
 *                        Cautious:
 *                          type: string
 *                        Assertive:
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
  '/getrisktoleranceequitymarket',
  checkAuthMiddleware.checkAuth,
  retirementRiskToleranceEquityMarketController.getrisktoleranceequitymarket,
);

module.exports = router;

const express = require('express');

const retirementRiskToleranceInvestmentHorizonController = require('../controllers/retirement.risktoleranceinvestmenthorizon.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getrisktoleranceinvestmenthorizon:
 *   get:
 *      description: Used to get all risk tolerance investment horizon
 *      summary: Get all risk tolerance investment horizon
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get risk tolerance investment horizon successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        InvestmentHorizon_id:
 *                          type: integer
 *                          example: 1
 *                        MoreOneYears:
 *                          type: string
 *                        OneToThreeYears:
 *                         type: string
 *                        ThreeYears:
 *                         type: string
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
  '/getrisktoleranceinvestmenthorizon',
  checkAuthMiddleware.checkAuth,
  retirementRiskToleranceInvestmentHorizonController.getrisktoleranceinvestmenthorizon,
);

module.exports = router;

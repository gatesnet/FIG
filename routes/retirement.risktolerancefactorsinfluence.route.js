const express = require('express');

const retirementRiskToleranceFactorsInfluenceController = require('../controllers/retirement.risktolerancefactorsinfluence.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getrisktolerancefactorsinfluence:
 *   get:
 *      description: Used to get all risk tolerance factors influence
 *      summary: Get all risk tolerance factors influence
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get risk tolerance factors influence successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        FactorsInfluence_id:
 *                          type: integer
 *                          example: 1
 *                        Safety:
 *                          type: string
 *                        ModerateReturns:
 *                          type: string
 *                        HightReturns:
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
  '/getrisktolerancefactorsinfluence',
  checkAuthMiddleware.checkAuth,
  retirementRiskToleranceFactorsInfluenceController.getrisktolerancefactorsinfluence,
);

module.exports = router;

const express = require('express');

const retirementRiskToleranceExperiencedController = require('../controllers/retirement.risktoleranceexperienced.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*
 * @swagger
 * /retirement/getrisktoleranceexperienced:
 *   get:
 *      description: Used to get all risk tolerance experienced
 *      summary: Get all risk tolerance experienced
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get risk tolerance experienced successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        Experienced_id:
 *                          type: integer
 *                          example: 1
 *                        Experienced:
 *                          type: string
 *                        NotExperienced:
 *                          type: string
 *                        VeryExperienced:
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
  '/getrisktoleranceexperienced',
  checkAuthMiddleware.checkAuth,
  retirementRiskToleranceExperiencedController.getrisktoleranceexperienced,
);

module.exports = router;

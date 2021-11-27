const express = require('express');

const retirementrisktolerancedependentController = require('../controllers/retirement.risktolerancedependent.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*
 * @swagger
 * /retirement/getrisktolerancedependent:
 *   get:
 *      description: Used to get all risk tolerance dependent
 *      summary: Get all risk tolerance dependent
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get risk tolerance dependent successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        Dependent_id:
 *                          type: integer
 *                          example: 1
 *                        Dependent:
 *                          type: string
 *                        NotDependent:
 *                          type: string
 *                        VeryDependent:
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
  '/getrisktolerancedependent',
  checkAuthMiddleware.checkAuth,
  retirementrisktolerancedependentController.getrisktolerancedependent,
);

module.exports = router;

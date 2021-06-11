const express = require('express');

const retirementController = require('../controllers/retirement.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /api/retirement/getcountries:
 *   get:
 *      description: Used to get all countries
 *      summary: Get all countries
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get countries successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        Country_id:
 *                          type: integer
 *                          example: 1
 *                        Country_Name:
 *                          type: integer
 *                          example: Jordan
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
  '/getcountries',
  checkAuthMiddleware.checkAuth,
  retirementController.getCountries,
);

/**
 * @swagger
 * /api/retirement/getfutureexpenses/{age}/{expenses}/{livein}:
 *    get:
 *      description: Used to get Future Expenses
 *      summary: Get Future Expenses
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: age
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *        - in: path
 *          name: expenses
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *        - in: path
 *          name: livein
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *      responses:
 *          '200':
 *              description: Get future expenses successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        age:
 *                          type: integer
 *                          example: 29
 *                        cumulative:
 *                          type: integer
 *                          example: 12000
 *                        annualexpenses:
 *                          type: integer
 *                          example: 12000
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
  '/getfutureexpenses/:age/:expenses/:livein',
  checkAuthMiddleware.checkAuth,
  retirementController.getFutureExpenses,
);

module.exports = router;

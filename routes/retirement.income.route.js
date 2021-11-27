const express = require('express');

const retirementIncomeController = require('../controllers/retirement.income.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*
 * @swagger
 * /retirement/getincome/{assetsId}/{value}/{startage}/{endage}:
 *    get:
 *      description: Used to get Income
 *      summary: Get Income
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      parameters:
 *        - in: path
 *          name: assetsId
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *        - in: path
 *          name: value
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *        - in: path
 *          name: startage
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *        - in: path
 *          name: endage
 *          required: true
 *          explode: false
 *          schema:
 *            type: integer
 *      responses:
 *          '200':
 *              description: Get Income successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        age:
 *                          type: integer
 *                          example: 29
 *                        monthlyIncome:
 *                          type: integer
 *                          example: 1000
 *                        yearlyIncome:
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
  '/getincome/:assetsId/:value/:startage/:endage',
  checkAuthMiddleware.checkAuth,
  retirementIncomeController.getIncome,
);

module.exports = router;

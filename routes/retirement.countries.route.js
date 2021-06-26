const express = require('express');

const retirementCountriesController = require('../controllers/retirement.countries.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getcountries:
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
  retirementCountriesController.getCountries,
);

module.exports = router;

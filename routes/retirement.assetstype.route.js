const express = require('express');

const retirementAssetsTypeController = require('../controllers/retirement.assetstype.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
 * @swagger
 * /retirement/getassetstype:
 *   get:
 *      description: Used to get all assets type
 *      summary: Get all assets type
 *      security:
 *        - bearerAuth: []
 *      tags: [Retirement]
 *      responses:
 *          '200':
 *              description: Get assets type successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        Assets_id:
 *                          type: integer
 *                          example: 1
 *                        Assets_description:
 *                          type: string
 *                          example: Deposit (fixed Income)
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
  '/getassetstype',
  checkAuthMiddleware.checkAuth,
  retirementAssetsTypeController.getAssetsType,
);

module.exports = router;

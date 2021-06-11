const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

/**
 * @swagger
 * /api/user/register:
 *    post:
 *      description: Register new user to get authorization token when use login endpoint.
 *      summary: Used to register new user for authorization
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: John
 *               lastname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: John
 *               username:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 45
 *                 example: abcde@abcd.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 20
 *                 example: abcdabcd
 *      responses:
 *          '200':
 *              description: User registered sucessfully
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Authorization information is missing or invalid
 *          '404':
 *              description: Not found
 *          '5xx':
 *              description: Unexpected error
 */

router.post('/register', userController.register);

/**
 * @swagger
 * /api/user/login:
 *    post:
 *      description: Used to get authorization token
 *      summary: Get authorization token.
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 45
 *                 example: abcde@abcd.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 45
 *                 example: abcd
 *      responses:
 *          '200':
 *              description: Get token ID
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        token:
 *                          type: string
 *                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Authorization information is missing or invalid
 *          '404':
 *              description: Not found
 *          '5xx':
 *              description: Unexpected error
 */
router.post('/login', userController.login);

module.exports = router;

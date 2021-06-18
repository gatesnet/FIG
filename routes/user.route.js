const express = require('express');

const userController = require('../controllers/user.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();
//
/**
// * @swagger
// * /user/register:
// *    post:
// *      description: Register new user to get authorization token when use login endpoint.
// *      summary: Used to register new user for authorization
// *      tags: [User]
// *      requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               firstname:
// *                 type: string
// *                 minLength: 3
// *                 maxLength: 20
// *                 example: John
// *               lastname:
// *                 type: string
// *                 minLength: 3
// *                 maxLength: 20
// *                 example: John
// *               email:
// *                 type: string
// *                 minLength: 8
// *                 maxLength: 45
// *                 example: abcde@abcd.com
// *               password:
// *                 type: string
// *                 minLength: 8
// *                 maxLength: 20
// *                 example: abcdabcd
// *      responses:
// *          '201':
// *              description: User registered sucessfully
// *          '400':
// *              description: Bad request
// *          '401':
// *              description: Authorization information is missing or invalid
// *          '404':
// *              description: Not found
// *          '5xx':
// *              description: Unexpected error
// */

router.post('/register', userController.register);

/**
 * @swagger
 * /user/login:
 *    post:
 *      description: Used To Get Authorization Token
 *      summary: Get Authorization Token.
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 45
 *                 example: abcde@abcd.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 45
 *                 example: abcdabcd
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

/**
 * @swagger
 * /user/users:
 *   get:
 *      description: Used To Get All Users
 *      summary: Get all users
 *      security:
 *        - bearerAuth: []
 *      tags: [User]
 *      responses:
 *          '200':
 *              description: Get Users Successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        user_id:
 *                          type: integer
 *                          example: 1
 *                        user_first_Name:
 *                          type: string
 *                          example: John
 *                        user_first_last:
 *                          type: string
 *                          example: John
 *                        user_email:
 *                          type: string
 *                          example: abcd@abcd.com
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
  '/users',
  checkAuthMiddleware.checkAuth,
  userController.getUsers,
);
//
/**
// * @swagger
// * /user/delete/{id}:
// *    delete:
// *      description: Used To Delete User
// *      summary: Delete User
// *      security:
// *        - bearerAuth: []
// *      tags: [User]
// *      parameters:
// *        - in: path
// *          name: id
// *          required: true
// *          explode: false
// *          schema:
// *            type: integer
// *      responses:
// *          '200':
// *              description: Delete user successful
// *          '400':
// *              description: Bad request
// *          '401':
// *              description: Authorization information is missing or invalid
// *          '404':
// *              description: Not found
// *          '5xx':
// *              description: Unexpected error
// */

router.delete(
  '/delete/:id',
  userController.deleteuser,
);

/**
 * @swagger
 * /user/getuserid/{email}:
 *    get:
 *      description: Used To get user ID by Email
 *      summary: Get user ID by Email
 *      security:
 *        - bearerAuth: []
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: email
 *          required: true
 *          explode: false
 *          schema:
 *            type: string
 *      responses:
 *          '200':
 *              description: Get user ID successful
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      properties:
 *                        user_id:
 *                          type: integer
 *                          example: 1
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
  '/getuserid/:email',
  checkAuthMiddleware.checkAuth,
  userController.getUserIDByEmail,
);

module.exports = router;

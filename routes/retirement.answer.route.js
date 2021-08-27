const express = require('express');

const retirementAnswerController = require('../controllers/retirement.answer.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
* @swagger
* /retirement/getanswer:
*   get:
*      description: Used to get all Answers
*      summary: Get all answers
*      security:
*        - bearerAuth: []
*      tags: [Retirement]
*      responses:
*          '200':
*              description: Get answers successful
*              content:
*                application/json:
*                  schema:
*                    type: array
*                    items:
*                      properties:
*                        QuesAnswerId:
*                          type: integer
*                          example: 1
*                        QuestionID:
*                          type: integer
*                          example: 1
*                        AnswerId:
*                          type: integer
*                          example: 1
*                        AnswerText:
*                          type: string
*                          example: Yes
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
  '/getanswer',
  checkAuthMiddleware.checkAuth,
  retirementAnswerController.getanswer,
);

module.exports = router;

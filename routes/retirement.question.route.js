const express = require('express');

const retirementQuestionController = require('../controllers/retirement.question.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*
* @swagger
* /retirement/getquestion:
*   get:
*      description: Used to get all Questions
*      summary: Get all questions
*      security:
*        - bearerAuth: []
*      tags: [Retirement]
*      responses:
*          '200':
*              description: Get questions successful
*              content:
*                application/json:
*                  schema:
*                    type: array
*                    items:
*                      properties:
*                        QuestionsID:
*                          type: integer
*                          example: 1
*                        QuestionsText:
*                          type: string
*                          example: I plan to begin taking money from my investments in
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
  '/getquestion',
  checkAuthMiddleware.checkAuth,
  retirementQuestionController.getquestion,
);

module.exports = router;

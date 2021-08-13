const express = require('express');

const retirementSubmitQuestionnaireController = require('../controllers/retirement.submitquestionnaire.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/**
* @swagger
* /retirement/submitquestionnaire:
*    post:
*      description: Submit Questionnaire.
*      summary: Submit Questionnaire
*      tags: [Retirement]
*      security:
*        - bearerAuth: []
*      requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               answernumber:
*                 type: integer
*                 minLength: 1
*                 maxLength: 2
*                 example: 1
*               questionid:
*                 type: integer
*                 minLength: 1
*                 maxLength: 2
*                 example: 1
*      responses:
*          '201':
*              description: Questioner Submitted sucessfully
*          '400':
*              description: Bad request
*          '401':
*              description: Authorization information is missing or invalid
*          '404':
*              description: Not found
*          '5xx':
*              description: Unexpected error
*/

router.post('/submitquestionnaire',
  checkAuthMiddleware.checkAuth,
  retirementSubmitQuestionnaireController.addanswer);

module.exports = router;

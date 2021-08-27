/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const Joi = require('joi');

const { poolPromise } = require('../config/db.config');

// Insert Answers Controller
exports.addanswer = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      answernumber: Joi.number().integer().min(1).required(),
      questionid: Joi.number().integer().min(1).required(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const { answerid } = req.body;
    const { questionid } = req.body;

    const pool = await poolPromise;
    await pool.request().query(
      `INSERT INTO TblQustionnaireAnswers (AnswerID, QuestionID) VALUES ('${answerid}', '${questionid}')`,

      function (err) {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: 'Bad Reuquest' });
        }
        return res.status(201).send({ message: 'Qustionnaire registered sucessfully' });
      },
    );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

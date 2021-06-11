/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');

const { poolPromise } = require('../config/db.config');

// Get Countires Controller
exports.getCountries = async function (req, res) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        'SELECT Country_id,Country_Name from TblCountry',
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ message: 'Bad Reuquest' });
          }
          return res.status(200).send({ message: result.recordset });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Get Future Expenses Controller
exports.getFutureExpenses = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      age: Joi.number().integer().min(1).required(),
      expenses: Joi.number().integer().min(1).required(),
      livein: Joi.number().integer().min(1).required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    let age = parseInt(req.params.age, 10);
    const expenses = parseInt(req.params.expenses, 10);
    let annualExpenses = expenses * 12;
    let CumulativeExpenses = annualExpenses;
    const futureExpenses = [];
    let i = 0;

    const { livein } = req.params;

    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `SELECT inflation_rate from TblCountry where Country_id = ${livein}`,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ message: 'Bad Reuquest' });
          }
          const inflationRate = result.recordset[0].inflation_rate;

          futureExpenses.push({
            age,
            Cumulative: CumulativeExpenses,
            AnnualExpenses: annualExpenses,
          });

          for (i = age; i < 85; i += 1) {
            age += 1;

            annualExpenses = Math.round(annualExpenses * (1 + inflationRate));
            CumulativeExpenses += annualExpenses;
            futureExpenses.push({
              age,
              Cumulative: CumulativeExpenses,
              AnnualExpenses: annualExpenses,
            });
          }
          return res.status(200).send({ message: futureExpenses });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

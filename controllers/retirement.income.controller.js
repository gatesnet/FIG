/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Joi = require('joi');

const { poolPromise } = require('../config/db.config');

// Get Income Controller
exports.getIncome = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      assetsId: Joi.number().integer().min(1).required(),
      value: Joi.number().integer().min(1).required(),
      startage: Joi.number().integer().min(1).required(),
      endage: Joi.number().integer().min(1).required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const assetsId = parseInt(req.params.assetsId, 10);
    const value = parseInt(req.params.value, 10);
    let startage = parseInt(req.params.startage, 10);
    const endage = parseInt(req.params.endage, 10);

    console.log(assetsId);

    let incomeROR = 0;
    let incomeGrowth = 0;
    let incomeRetention = 0;
    let monthlyIncome = 0;
    let yearlyIncome = 0;
    let totalValue = 0;

    const returnIncome = [];
    let i = 0;

    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `SELECT Assets_description,Assets_ROR,Assets_Growth,Assets_Retention_Rate,Assets_Dividends_Growth,Assets_Contribuation,Assets_Type_Of_Cash_Flow from Assets_Types where Assets_id = ${assetsId}`,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: 'Bad Reuquest' });
          }

          incomeROR = value * result.recordset[0].Assets_ROR;
          incomeGrowth = value * result.recordset[0].Assets_Growth;
          incomeRetention = (incomeROR + incomeGrowth) * ((result.recordset[0].Assets_Retention_Rate) / 100);
          monthlyIncome = incomeRetention / 12;
          yearlyIncome = incomeRetention;
          totalValue = value + incomeRetention;

          returnIncome.push({
            age: startage,
            monthlyIncome: Math.round((monthlyIncome + Number.EPSILON) * 100) / 100,
            yearlyIncome: Math.round((yearlyIncome + Number.EPSILON) * 100) / 100,
          });

          for (i = startage; i < endage; i += 1) {
            startage += 1;

            incomeROR = totalValue * result.recordset[0].Assets_ROR;
            incomeGrowth = totalValue * result.recordset[0].Assets_Growth;
            incomeRetention = (incomeROR + incomeGrowth) * ((result.recordset[0].Assets_Retention_Rate) / 100);
            monthlyIncome = incomeRetention / 12;
            yearlyIncome = incomeRetention;

            returnIncome.push({
              age: startage,
              monthlyIncome: Math.round((monthlyIncome + Number.EPSILON) * 100) / 100,
              yearlyIncome: Math.round((yearlyIncome + Number.EPSILON) * 100) / 100,
            });

            totalValue = totalValue + incomeROR + incomeGrowth;
          }
          return res.status(200).send({ message: returnIncome });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

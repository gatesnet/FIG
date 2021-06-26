/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */

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
            return res.status(400).send({ error: 'Bad Reuquest' });
          }
          return res.status(200).send({ message: result.recordset });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

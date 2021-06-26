/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */

const { poolPromise } = require('../config/db.config');

// Get Countires Controller
exports.getAssetsType = async function (req, res) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        'SELECT Assets_id,Assets_description from Assets_Types',
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

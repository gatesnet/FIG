/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const Joi = require('joi');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { poolPromise } = require('../config/db.config');

// User Register Controller
exports.register = (req, res) => {
  try {
    // Validation
    const schema = Joi.object({
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().min(3).required(),
      username: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    // Encrypt User's Passeord
    const saltRounds = 10;

    const { firstname } = req.body;
    const { lastname } = req.body;
    const { username } = req.body;
    const { password } = req.body;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const pool = await poolPromise;
      await pool.request().query(
        `INSERT INTO TblUsers (User_id,User_first_name, User_last_name, User_name, User_password, User_Type) VALUES (101,'${firstname}', '${lastname}', '${username}', '${hash}', 'API_Role')`,

        function (err) {
          if (err) {
            console.log(err);
            return res.status(400).send({ message: 'Bad Reuquest' });
            // eslint-disable-next-line no-else-return
          } else {
            return res
              .status(400)
              .send({ message: 'User registered sucessfully' });
          }
        },
      );
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// User Login Controller
exports.login = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      username: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const { username } = req.body;
    const { password } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `SELECT User_password from TblUsers where User_name='${username}'`,
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(400).send({ message: 'Bad Reuquest' });
          }
          if (Object.keys(result.recordset).length === 0) {
            return res.status(400).send({ message: 'Invalid username' });
          }
          const dbPassword = result.recordset[0].User_password;
          bcrypt.compare(password, dbPassword, function (error, result) {
            if (error) {
              console.log(error);
              return res.status(400).send({ message: 'Bad Reuquest' });
            }
            if (!error) {
              if (!result) {
                return res.status(400).send({ message: 'Invalid password' });
              }
            }
            if (result) {
              try {
                const token = jwt.sign(
                  {
                    username,
                    expire: Date.now() + 1000 * 60 * 60, // 1 hour
                  },
                  process.env.JWT_SECRET,
                );
                return res.status(200).send({ token });
              } catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'token sign error' });
              }
            }
          });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

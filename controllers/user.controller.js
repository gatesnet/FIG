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
      email: Joi.string().email().required(),
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
    const { email } = req.body;
    const { password } = req.body;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const pool = await poolPromise;
      await pool.request().query(
        `INSERT INTO TblUserAPI (user_first_name, user_last_name, user_email, user_password, user_type) VALUES ('${firstname}', '${lastname}', '${email}', '${hash}', 'API_Role')`,

        function (err) {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: 'Bad Reuquest' });
          }
          return res
            .status(201)
            .send({ message: 'User registered sucessfully' });
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
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const { email } = req.body;
    const { password } = req.body;

    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `SELECT user_password from TblUserAPI where user_email='${email}'`,
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: 'Bad Reuquest' });
          }
          if (result.recordset.length === 0) {
            return res.status(400).send({ error: 'Invalid email' });
          }
          const dbPassword = result.recordset[0].user_password;

          bcrypt.compare(password, dbPassword, function (error, result) {
            if (error) {
              console.log(error);
              return res.status(400).send({ error: 'Bad Reuquest' });
            }
            if (!error) {
              if (!result) {
                return res.status(400).send({ error: 'Invalid password' });
              }
            }
            if (result) {
              try {
                const token = jwt.sign(
                  {
                    email,
                    expire: Date.now() + 1000 * 60 * 60, // 1 hour
                  },
                  process.env.JWT_SECRET,
                );
                return res.status(200).send({ token });
              } catch (error) {
                console.log(error);
                return res.status(500).send({ error: 'token sign error' });
              }
            }
          });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Get users
exports.getUsers = async function (req, res) {
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        'SELECT user_id,user_first_name,user_last_name,user_email from TblUserAPI',
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

// Get users ID by Email
exports.getUserIDByEmail = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }
    const { email } = req.params;
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `SELECT user_id from TblUserAPI where user_email='${email}'`,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: 'Bad Reuquest' });
          } if (result.recordset.length === 0) {
            return res.status(400).send({ error: 'Invalid email' });
          }
          return res.status(200).send({ message: result.recordset });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Delete User
exports.deleteuser = async function (req, res) {
  try {
    // Validation
    const schema = Joi.object({
      id: Joi.number().integer().min(1).required(),
    });

    const results = schema.validate(req.params);
    if (results.error) {
      res.status(400).send(results.error.details[0].message);
      return;
    }

    const { id } = req.params;

    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `DELETE from TblUserAPI where user_id = '${id}'`,
        (err) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ error: 'Bad Reuquest' });
          }
          return res.status(200).send({ message: `User with ID ${id} has been successfully deleted` });
        },
      );
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

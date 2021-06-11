require('dotenv').config();

const jwt = require('jsonwebtoken');

// Check Token Value
exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decodedToken;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid or expired token' });
  }
  return true;
};

require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Необходима авторизация.')
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;

    next();
  } catch (err) {
    res.status(401);
    next()
  }
};

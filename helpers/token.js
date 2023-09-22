const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" }) || null;
};

const isValidToken = (token) => {
  const { _id } = jwt.verify(token, SECRET_KEY);

  return _id || null;
};

module.exports = {
  createToken,
  isValidToken,
};

const bcrypt = require("bcrypt");

const getHashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compareHashPassword = async (password, hashPassword) => {
  const compareResult = await bcrypt.compare(password, hashPassword);
  return compareResult;
};

module.exports = {
  getHashPassword,
  compareHashPassword,
};

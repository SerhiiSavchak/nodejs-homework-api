const validateError = function (validate, res) {
  const errorMessage = { message: validate.error.details[0].message };
  return res.status(400).json(errorMessage);
};

module.exports = validateError;

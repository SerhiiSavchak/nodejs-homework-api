const Joi = require("joi");

function validateUser(data) {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      "string.base": `"email" should be a string`,
      "any.required": `missing required email field`,
    }),
    password: Joi.string().required().min(5).messages({
      "string.base": `"password" should be a string`,
      "any.required": `missing required password field`,
      "string.min": `"password" should have a minimum length of 5`,
    }),
  });
  return schema.validate(data);
}

function validateSub(data) {
  const sub = ["starter", "business", "pro"];
  const schema = Joi.object({
    subscription: Joi.string()
      .valid(...sub)
      .required()
      .messages({
        "string.base": `subscription should be a string`,
        "any.required": `missing subscription field`,
      }),
  });
  return schema.validate(data);
}

module.exports = { validateUser, validateSub };

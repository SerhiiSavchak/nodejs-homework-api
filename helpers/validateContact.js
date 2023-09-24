const Joi = require("joi");

function validateContact(data) {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": `"name" should be a string`,
      "any.required": `missing required name field`,
    }),
    phone: Joi.string().required().messages({
      "string.base": `"phone" should be a string`,
      "any.required": `missing required phone field`,
    }),
    email: Joi.string().required().messages({
      "string.base": `"email" should be a string`,
      "any.required": `missing required email field`,
    }),
    favorite: Joi.boolean(),
  });
  return schema.validate(data);
}

function validateFavorite(data) {
  const schema = Joi.object({
    favorite: Joi.boolean().required().messages({
      "boolean.base": `"favorite" should be a boolean`,
      "any.required": `missing required favorite field`,
    }),
  });
  return schema.validate(data);
}

module.exports = {
  validateContact,
  validateFavorite,
};

const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  });
  const changeSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  }).or('name', 'email', 'phone');
  

module.exports = {
    addSchema,
    changeSchema,
}
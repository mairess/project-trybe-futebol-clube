import Joi = require('joi');

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.min': 'Invalid email or password',
  'string.empty': 'All fields must be filled',
  'string.email': 'Invalid email or password',
});

export default schemaLogin;

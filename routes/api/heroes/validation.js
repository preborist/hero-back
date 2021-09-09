const Joi = require('joi');

const schemaCreateHero = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(7).max(12).required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateHero = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().min(7).max(12).optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.schemaCreateHero = (req, _res, next) => {
  return validate(schemaCreateHero, req.body, next);
};

module.exports.schemaUpdateHero = (req, _res, next) => {
  return validate(schemaUpdateHero, req.body, next);
};

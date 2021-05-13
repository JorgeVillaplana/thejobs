const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
  min: 4,
  max: 24,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
};

const schema = joi.object({
  name: joi.string().required(),
  surname: joi.string().required(),
  role: joi.string().valid(...["user", "company"]).required(),
  phone: joi.string().min(9).max(12).required(),
  email: joi.string().email().required(),
  password: passwordComplexity(complexityOptions),
});

function validate(body) {
  return schema.validate(
    {
      name: body.name,
      surname: body.surname,
      role: body.role,
      phone: body.phone,
      email: body.email,
      password: body.password,
    },
    { abortEarly: false }
  );
}

module.exports = {
  validate,
};

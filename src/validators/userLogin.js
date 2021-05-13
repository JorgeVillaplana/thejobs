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
  email: joi.string().email(),
  password: passwordComplexity(complexityOptions),
});

function validate(body) {
  return schema.validate(
    {
      email: body.email,
      password: body.password,
    },
    { abortEarly: false }
  );
}

module.exports = {
  validate,
};

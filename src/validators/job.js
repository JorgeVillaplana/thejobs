const joi = require("joi");

const schema = joi.object({
  companyName: joi.string().required(),
  name: joi.string().required(),
  description: joi.string().max(700).required(),
  location: joi.string().required(),
  type: joi.string().valid(
    ...["fulltime", "freelancer", "partial", "project", "internship"]
  ).required(),
  photo: joi.string(),
  companyWeb: joi.string().uri(),
});

function validate(body) {
  return schema.validate(
    {
      companyName: body.companyName,
      name: body.name,
      description: body.description,
      location: body.location,
      type: body.type,
      photo: body.photo,
      companyWeb: body.companyWeb,
    },
    { abortEarly: false }
  );
}

module.exports = {
  validate,
};

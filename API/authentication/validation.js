// joi validations
//import joi 

const joi = require("joi");
//validation for signUp API

function signUpValidation(body) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(15).required(),
    lastName: joi.string().min(3).max(15).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(15)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
      )
      .required(),
    profilePhoto: joi.string().optional(),
  });
  return schema.validate(body);
}

//validation for SignIn API

function signInValidation(body) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(15)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
      )
      .required(),
  });
  return schema.validate(body);
}

module.exports = {
  signUpValidation,
  signInValidation,
};

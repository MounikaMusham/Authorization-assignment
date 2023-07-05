const joi = require("joi");
function signUpValidation(body) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(15).required(),
    lastName: joi.string().min(3).max(15).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15)
              .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
              )
            .required(),
  // profilePhoto:Joi.string().base64().optional(),       
  });
  return schema.validate(body)
}

function signInValidation(body) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15)
              .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
              )
            .required(),
  // profilePhoto:Joi.string().base64().optional(),       
  });
  return schema.validate(body)
}


module.exports = {
    signUpValidation,signInValidation
}
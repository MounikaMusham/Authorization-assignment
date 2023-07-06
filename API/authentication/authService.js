//import all the required Dependencies

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
const multer = require("multer");

async function userSignUp(body) {
  try {
    //checking whether the user already exists or nor before signUP with email
    const existingUser = await authModel.findOne({ email: body.email });

    if (existingUser) {
      // if user already exists throwing error
      return Promise.reject({
        statusCode: 400,
        status: false,
        data: {},
        message: "Email is already registered",
        error: "Bad Request",
      });
    }
    //converting password to hashed password in order to avoid storing actual password in database
    const salt = await bcrypt.genSalt(10);
    const modifiedPassword = await bcrypt.hash(body.password, salt);
    // creating user object with user details
    const userDetails = new authModel({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: modifiedPassword,
      profilePhoto: body.profilePhoto ? body.profilePhoto : null,
    });
    // returning user details to API response
    return userDetails;
  } catch (error) {
    // throwing error if catches any error in the process
    return Promise.reject({
      statusCode: 500,
      status: false,
      data: {},
      message: "bad request",
      error: "Bad Request",
    });
  }
}
async function userSignIn(body) {
  try {
    //finding user details in the database whether the user exists or not to sign In
    const user = await authModel.findOne({ email: body.email });
    if (!user) {
      //if not found sending message as not registered
      return Promise.reject({
        statusCode: 401,
        status: false,
        data: {},
        msgs: "User not registered, please signup",
        err: "Bad Request",
      });
    }
    //if user exists checking the password match
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      //if password not matched sending message as invalid password
      return Promise.reject({
        statusCode: 401,
        status: false,
        data: {},
        message: "Invalid  password",
        error: "Bad Request",
      });
    }

    //if password matches generating jwt token
    const token = jwt.sign(
      { userId: user._id, email: body.email },
      "#MMM@vvvv@AAA@AAA#",
      {
        expiresIn: "1d",
      }
    );
    //sending token in response
    return token;
  } catch (error) {
    //throwing error when catches any error during the process
    return Promise.reject({
      statusCode: 500,
      status: false,
      data: {},
      message: "Bad Request",
      error: error,
    });
  }
}

module.exports = {
  userSignUp,
  userSignIn,
};

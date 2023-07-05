const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
const signInModel = require("../models/authModel").SignInSchema;
const multer = require("multer");

async function userSignUp(body) {
  try {
    const salt = await bcrypt.genSalt(10);
    const modifiedPassword = await bcrypt.hash(body.password, salt);

    const userDetails = new authModel({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: modifiedPassword,
      //  profilePhoto:body.profilePhoto?body.profilePhoto:null
    });

    return userDetails;
  } catch (error) {
    throw {
      statusCode: 500,
      status: false,
      data: {},
      msgs: "bad request",
      err: "Bad Request",
    };
  }
}

async function userSignIn(body) {
  try {
    const user = authModel.findOne({
      $and: [
        { firstName: body.firstName },
        { lastName: body.lastName },
        { password: body.password },
      ],
    });

    if (!user) {
      throw {
        statusCode: 401,
        status: false,
        data: {},
        msgs: "User not registered, please signup",
        err: "Bad Request",
      };
    }
    // const isPasswordValid = await bcrypt.compare(body.password, user.password);

    // if (!isPasswordValid) {
    //   throw {
    //     statusCode: 401,
    //     status: false,
    //     data: {},
    //     msgs: "Invalid password",
    //     err: "Bad Request",
    //   };
    // }
    const token = jwt.sign(
      { userId: user._id, email: body.email },
      "#MMM@vvvv@AAA@AAA#",
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    throw {
      statusCode: 500,
      status: false,
      data: {},
      msgs: "bad request",
      err: "Bad Request",
    };
  }
}

module.exports = {
  userSignUp,
  userSignIn,
};

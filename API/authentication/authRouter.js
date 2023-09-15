const express = require("express");
const router = express.Router();
const authValidation = require("./validation");
const authService = require("./authService");
const responseMessages = require("../responseMessages");
const authModel = require("../models/authModel");
const validateToken = require("./validateToken").authorizeToken;
const multer = require("multer");

//API for user SignUp Process

router.post("/userSignUp", async (req, res) => {
  try {
    //checking validation whether required fields are coming in the body
    const { error } = authValidation.signUpValidation(req.body);

    // if Validation fails throwing error
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
        data: {},
        response: "false",
      });
    }
    try {
      //passing user details to signUp functionality  and storing result in userDetails
      const userDetails = await authService.userSignUp(req.body);
      //saving user data to database
      const savedUser = userDetails.save();
      //sending success message
      res.status(200).json({
        status: 200,
        message: responseMessages.signUpSuccess,
        data: userDetails,
        response: "success",
      });
    } catch (error) {
      //sending error occurred  based on the type of error message
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: {},
        response: "false",
      });
    }
  } catch (error) {
    //sending error based on the type of error message
    res.status(500).json({
      status: 500,
      message: responseMessages.someThingWrong,
      data: {},
      response: "failed",
    });
  }
});

//API for user SignIn Process

router.post("/userSignIn", async (req, res) => {
  try {
    //checking validation whether required fields are coming in the body
    const { error } = authValidation.signInValidation(req.body);

    // if Validation fails throwing error
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
        data: {},
        response: "false",
      });
    }
    try {
      //passing user details to signIn functionality  and storing the token response
      const token = await authService.userSignIn(req.body);
      //sending success message
      res.status(200).json({
        status: 200,
        message: responseMessages.signInSuccess,
        data: token,
        response: "success",
      });
    } catch (error) {
      //sending error occurred  based on the type of error message
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: {},
        response: "false",
      });
    }
  } catch (error) {
    //sending error based on the type of error message
    console.log("error", error.message);
    res.status(500).json({
      status: 500,
      message: responseMessages.someThingWrong,
      data: {},
      response: "failed",
    });
  }
});

//API for getting user details 

//validating token before getting the details

router.get("/users", async (req, res) => {
  try {
    //finding all the users from database in the collection authModel
    const users = await authModel.find();
    res.json({ status: "success", data: users });
  } catch (error) {
    //throwing error if catches any error
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;

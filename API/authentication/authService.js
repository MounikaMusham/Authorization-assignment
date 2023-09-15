//import all the required Dependencies

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
const multer = require("multer");

const fs = require('fs');
const AWS = require('aws-sdk');
const awsKeyId = 'AKIAVZEHLQAKPBBOJBTS';
const awsSecretKey = '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';
const awsBucketName = 'm-practice';
const awsRegion = 'US East (N. Virginia) us-east-1';


const s3 = new AWS.S3({
  accessKeyId: awsKeyId,
  secretAccessKey: awsSecretKey,
});

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

  // upload file to s3
  if(body.profilePhoto){
    profilePhotoUrl = await uploadFileToS3(body.profilePhoto,body.firstName);
  }
    

    // creating user object with user details
    const userDetails = new authModel({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: modifiedPassword,
     // profilePhoto: profilePhotoUrl.Location ? profilePhotoUrl.Location : null,
    });
    // returning user details to API response
    return userDetails;
  } catch (error) {
    // throwing error if catches any error in the process
    return Promise.reject({
      statusCode: 500,
      status: false,
      data: {},
      message: error.message,
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

async function uploadFileToS3(base64Data,fileName){
  const base64DataArray = base64Data.split(",");
  const contentType = base64DataArray[0].match(/:(.*?);/)[1];
  const fileContent = Buffer.from(base64DataArray[1], "base64");
 const params = {
  Bucket:awsBucketName,
  Key:fileName+'profilePic',
  Body:fileContent
 }

 try {
  // await s3.putObject(params,(err,data)=>{
  //   if(err){
  //     console.log('error')
  //   }else{
  //     const url = `https://${awsBucketName}.s3.${awsRegion}.amazonaws.com/${params.Key}`;
  //     return url;
  //   }
  // });
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
 
} catch (error) {
  console.log(error);
  throw error;
}

}

module.exports = {
  userSignUp,
  userSignIn,
};

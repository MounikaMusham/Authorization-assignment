const express = require("express");
const router = express.Router();
const authValidation = require('./validation');
const authService = require('./authService');
const responseMessages = require('../responseMessages');
const authModel = require('../models/authModel')
const multer = require('multer');



router.post('/userSignUp',async (req,res)=>{
    try {
        const {error} = authValidation.signUpValidation(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                message:error.details[0].message,
                data:{},
                response:'false'
            })
        }
        const userDetails = await authService.userSignUp(req.body);
        const savedUser = userDetails.save();
        res.status(200).json({
                status:200,
                message:responseMessages.signUpSuccess,
                data:userDetails,
                response:'success'
        })
        
    } catch (error) {
        res.status(500).json({
            status:500,
            message:responseMessages.someThingWrong,
            data:{},
            response:'failed'
    })
    }
})

router.post('/userSignIn',async (req,res)=>{
    try {
        const {error} = authValidation.signInValidation(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                message:error.details[0].message,
                data:{},
                response:'false'
            })
        }
        const token = await authService.userSignIn(req.body);
      //  const savedUser = userDetails.save();
        res.status(200).json({
                status:200,
                message:responseMessages.signInSuccess,
                data:token,
                response:'success'
        })
        
    } catch (error) {
        res.status(500).json({
            status:500,
            message:responseMessages.someThingWrong,
            data:{},
            response:'failed'
    })
    }
})

router.get('/users', async (req, res) => {
    try {
      const users = await authModel.find();
      res.json({ status: 'success', data: users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  });

module.exports = router;
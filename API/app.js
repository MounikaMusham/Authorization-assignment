const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbUrl = require('./config').db_url;
const cors = require('cors');
const routerFile = require('./router');
app.use(express.json());


mongoose.connect(dbUrl);
mongoose.connection.on("connected",()=>{
    console.log('connected to database')
})

const corsOptions = {
    methods:'GET,PUT,POST,DELETE',
    origin:'*'
}

app.use(cors(corsOptions));

app.use('/',routerFile);
app.get('*',(req,res)=>{
    res.send({
        status:'404',
        message:'Url Not Found'
    })
})

module.exports = app
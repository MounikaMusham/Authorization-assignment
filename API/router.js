const express = require('express');
const app = express();
const router = express.Router();
const authRouter = require('./authentication/authRouter');
app.use(express.json());

router.use('/app',authRouter);

module.exports = router
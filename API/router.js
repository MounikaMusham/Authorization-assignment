const express = require('express');
const app = express();
const router = express.Router();
const authRouter = require('./authentication/authRouter');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./authentication/authApis.yaml');
router.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerJsDocs))
app.use(express.json());

router.use('/app',authRouter);

module.exports = router
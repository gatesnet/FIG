/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());
app.use(compression());

// use swagger-Ui-express for your app documentation endpoint
/** Swagger Initialization - START */

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'API Webservices',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'This is the Dev server (Localhost)',
      },
      {
        url: 'http://apistg.figinvestment.com',
        description: 'STG Webservice',
      },
      {
        url: 'http://api.figinvestment.com',
        description: 'PROD Webservice',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'bearer',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpecs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/** Swagger Initialization - END */

app.get('/', (req, res) => {
  res.send('Welcome to FIG API Webservices!');
});

// Routes to Users model
const userRoute = require('./routes/user.route');

app.use('/api/user', userRoute);

// Routes to Retirement model
const retirementRoute = require('./routes/retirement.route');

app.use('/api/retirement', retirementRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  const datetime = new Date();
  const message = `Server running on port: ${PORT} Started at: ${datetime}`;
  console.log(message);
});

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

// Routes to Users
const userRoute = require('./routes/user.route');

app.use('/api/user', userRoute);

// Routes to Retirement Future Expenses
const retirementFutureExpensesRoute = require('./routes/retirement.futureexpenses.route');

app.use('/api/retirement', retirementFutureExpensesRoute);

// Routes to Retirement Home Expenses
const retirementHomeExpensesRoute = require('./routes/retirement.homeexpenses.route');

app.use('/api/retirement', retirementHomeExpensesRoute);

// Routes to Retirement Education Expenses
const retirementEducationExpensesRoute = require('./routes/retirement.educationexpenses.route');

app.use('/api/retirement', retirementEducationExpensesRoute);

// Routes to Retirement Transportation Expenses
const retirementTransportationExpensesRoute = require('./routes/retirement.transportationexpenses.route');

app.use('/api/retirement', retirementTransportationExpensesRoute);

// Routes to Retirement Dailly Living Expenses
const retirementDailyLivingExpensesRoute = require('./routes/retirement.dailylivingexpenses.route');

app.use('/api/retirement', retirementDailyLivingExpensesRoute);

// Routes to Retirement Entertainment Expenses
const retirementEntertainmentExpensesRoute = require('./routes/retirement.entertainmentexpenses.route');

app.use('/api/retirement', retirementEntertainmentExpensesRoute);

// Routes to Retirement Health Expenses
const retirementHealthExpensesRoute = require('./routes/retirement.healthexpenses.route');

app.use('/api/retirement', retirementHealthExpensesRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  const datetime = new Date();
  const message = `Server running on port: ${PORT} Started at: ${datetime}`;
  console.log(message);
});

// Export module to let Mocha app.address to be readable from test files
module.exports = app;

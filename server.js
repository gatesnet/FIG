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
const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'localhost';
let url;

if (env === 'localhost') {
  url = 'http://localhost:3000/api';
}
if (env === 'production') {
  url = 'http://api.figinvestment.com/api';
}
if (env === 'development') {
  url = 'http://apistg.figinvestment.com/api';
}

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'API Webservices',
      description: '<div><p>This page describes the methods allowed by this web service.</p><p>You must read the paragraph below before use it !<br><br>You must first retrieve an acces token using the "login" call (fill with your username and password)</b> and after you will be able to use other service calls.</p></div>',
      version: '1.0.0',
    },
    servers: [
      {
        url,
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

// Routes to Retirement Countries
const retirementCountriesRoute = require('./routes/retirement.countries.route');

app.use('/api/retirement', retirementCountriesRoute);

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

// Routes to Retirement Vacation Holiday Expenses
const retirementVacationHolidayExpensesRoute = require('./routes/retirement.vacationholidayexpenses.route');

app.use('/api/retirement', retirementVacationHolidayExpensesRoute);

// Routes to Retirement Loan Expenses
const retirementLoanExpensesRoute = require('./routes/retirement.loanexpenses.route');

app.use('/api/retirement', retirementLoanExpensesRoute);

// Routes to Retirement Assets Types
const retirementAssetsTypeRoute = require('./routes/retirement.assetstype.route');

app.use('/api/retirement', retirementAssetsTypeRoute);

// Routes to Retirement Income
const retirementIncomeRoute = require('./routes/retirement.income.route');

app.use('/api/retirement', retirementIncomeRoute);

// Routes to Risk Tolerance Dependent
const retirementRiskToleranceDependentRoute = require('./routes/retirement.risktolerancedependent.route');

app.use('/api/retirement', retirementRiskToleranceDependentRoute);

// Routes to Risk Tolerance Equity Market
const retirementRiskToleranceEquityMarketRoute = require('./routes/retirement.risktoleranceequitymarket.route');

app.use('/api/retirement', retirementRiskToleranceEquityMarketRoute);

// Routes to Risk Tolerance Experienced
const retirementRiskToleranceExperiencedRoute = require('./routes/retirement.risktoleranceexperienced.route');

app.use('/api/retirement', retirementRiskToleranceExperiencedRoute);

// Routes to Risk Tolerance Factors Influence
const retirementRiskToleranceFactorsInfluenceRoute = require('./routes/retirement.risktolerancefactorsinfluence.route');

app.use('/api/retirement', retirementRiskToleranceFactorsInfluenceRoute);

// Routes to Risk Tolerance Invest Every Month
const retirementRiskToleranceInvestEveryMonthRoute = require('./routes/retirement.risktoleranceinvesteverymonth.route');

app.use('/api/retirement', retirementRiskToleranceInvestEveryMonthRoute);

// Routes to Risk Tolerance Investment Horizon
const retirementRiskToleranceInvestmentHorizonRoute = require('./routes/retirement.risktoleranceinvestmenthorizon.route');

app.use('/api/retirement', retirementRiskToleranceInvestmentHorizonRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  const datetime = new Date();
  const message = `Server running on port: ${PORT} Started at: ${datetime}`;
  console.log(message);
});

// Export module to let Mocha app.address to be readable from test files under test folder mocha
module.exports = app;

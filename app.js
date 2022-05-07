// npm depencies
const http = require('http');
const mongoose = require('mongoose');
require('module-alias/register');
require('dotenv').config();

mongoose.Promise = Promise;

// internal dependencies
const Configurator = require('@modules/configurator');
const ExpressBootstrapper = require('@modules/express-bootstrapper');
const NotFoundRoute = require('@errors/not-found-error');

// import models
const Topic = require('@models/topic');

// route import
const Routes = require('@routes');
const Script = require('@routes/script');

// load configuration
const configurator = new Configurator();
const { port, mongoUrl } = configurator.getAll('app');

// modules instances
const expressBootstrapper = new ExpressBootstrapper({
  whiteList: ['http://localhost:3003'],
  corsErrorMessage: 'Not allowed by CORS',
});

// middleware instances

// routes instances and route init
const notFoundRoute = new NotFoundRoute();
const script = new Script({
  Topic,
});

// NOTICE: order is important, notFoundRoute should always be in the last position
const routeList = [script, notFoundRoute];
// boostrap the application and routes
expressBootstrapper.bootstrap();
const routes = new Routes(routeList);
routes.initRoutes(expressBootstrapper.app);
console.log('connection STRING', { mongoUrl });
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => {
    console.log({ error });
  });

const server = http.createServer(expressBootstrapper.app);
server.listen(port, () => {
  console.info(`Server started on port ${port}`);
});

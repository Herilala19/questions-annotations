module.exports = class Routes {
  constructor(routes) {
    this._routes = routes;
  }

  initRoutes(app) {
    this._routes.forEach((route) => {
      route.initRoutes(app);
    });
  }
};

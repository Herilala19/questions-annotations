module.exports = class Routes {
  constructor(routes) {
    this._routes = routes;
  }

  initRoutes(app) {
    app.get('/', function (req, res, next) {
      return res.send('Hello Pencil platform');
    });
    this._routes.forEach(route => route.initRoutes(app));
  }
};

const config = {};

config.all = {
  port: process.env.PORT || 3003,
  mongoUrl: process.env.MONGO_URL
};

module.exports = config;

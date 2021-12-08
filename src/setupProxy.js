const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(process.env.API_VERSION, {
      target:
        !process.env.NODE_ENV || process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_API_SERVER_DEVELOPMENT
          : process.env.REACT_APP_API_SERVER_PRODUCTION,
      changeOrigin: true,
    })
  );
};

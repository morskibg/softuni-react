const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('http://localhost:3000/api/v1', {
      target: 'https://softuni-react-backend.herokuapp.com',
      changeOrigin: true,
    })
  );
};

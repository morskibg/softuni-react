const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(process.env.REACT_APP_BACKEND_URL, {
      target: process.env.REACT_APP_FRONTEND_URL,
      changeOrigin: true,
    })
    // createProxyMiddleware(
    //   "https://softuni-react-power-app.herokuapp.com/api/v1",
    //   {
    //     target: "https://backend-react-powerapp.herokuapp.com",
    //     changeOrigin: true,
    //   }
    // )
    // createProxyMiddleware("http://localhost:3000/api/v1", {
    //   target: "https://softuni-react-backend.herokuapp.com",
    //   changeOrigin: true,
    // })
  );
};

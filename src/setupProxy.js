const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.PROXY || 'https://localhost:7154',
      changeOrigin: true,
      secure: false,
      onProxyReq: function(proxyReq, req, res) {
        // Добавляем заголовки для CORS и cookies
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
        proxyReq.setHeader('Access-Control-Allow-Credentials', 'true');
      }
    })
  );
};
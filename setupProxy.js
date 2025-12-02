const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://inha-dewbob.p-e.kr',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        })
    );
};
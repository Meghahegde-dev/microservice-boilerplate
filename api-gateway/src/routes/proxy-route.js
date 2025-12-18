const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/",
    createProxyMiddleware({
       target: 'http://auth_app:5001', 
      changeOrigin: true,
      pathRewrite: { "^/": "/" },
      onProxyReq(proxyReq, req, res) {
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
      onError(err, req, res) {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
      },
    })
  );
};

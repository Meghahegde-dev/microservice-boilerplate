const { createProxyMiddleware } = require("http-proxy-middleware");
const logger = require("../utils/logger");

module.exports = (app) => {
  const authServiceUrl =
    process.env.AUTH_SERVICE_URL || "http://auth-service:5001";

  app.use(
    "/auth/google/callback",
    createProxyMiddleware({
      target: authServiceUrl,
      changeOrigin: true,
      pathRewrite: { "^/auth/google/callback": "/google-callback" },
    }),
  );

  app.use(
    "/auth/google",
    createProxyMiddleware({
      target: authServiceUrl,
      changeOrigin: true,
      pathRewrite: { "^/auth/google": "/google-login" },
    }),
  );

  // 2️⃣ Catch-all proxy for other routes
  app.use(
    "/",
    createProxyMiddleware({
      target: authServiceUrl,
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
        console.log(err);
        logger.error("Proxy error:", err);``
        res.status(500).send("Proxy error");
      },
    }),
  );
};

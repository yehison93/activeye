import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = (req, res) => {
  let target = "https://stitcher-ipv4.pluto.tv";

  // Creamos el proxy
  let proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^/api`]: "" },
  });

  // Usamos el proxy
  proxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }
    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
};

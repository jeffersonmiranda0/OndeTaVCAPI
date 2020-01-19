const { Router } = require("express");

const routes = Router();

routes.get("/teste", (req, res) => {
  res.json({ oi: "teste" });
});

module.exports = routes;

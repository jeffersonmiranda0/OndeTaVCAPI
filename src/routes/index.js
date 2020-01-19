const { Router } = require("express");

const teste = require("./teste");
const Person = require("./register/Person");

const routes = Router();

routes.use(teste);
routes.use(Person);

routes.get("/", (req, res) => {
  console.log("tome");
  res.json({ oi: "tome" });
});

module.exports = routes;

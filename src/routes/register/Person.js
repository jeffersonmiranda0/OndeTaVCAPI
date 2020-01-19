const { Router } = require("express");

const PersonController = require("./../../controller/register/PersonController");
const PersonLoginController = require("./../../controller/register/PersonLoginController");
const GeoController = require("./../../controller/register/GeoController");

const routes = Router();

routes.post("/person/login", PersonLoginController.store);
routes.post("/person/geo", GeoController.store);
routes.post("/person", PersonController.store);
routes.get("/person", PersonController.index);

module.exports = routes;

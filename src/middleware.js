const jwt = require("jsonwebtoken");
const secret = require("./config/secret.json");

async function validateToken(req, res) {
  const { token } = req.body;
  try {
    jwt.verify(token, secret.jwt);
  } catch (e) {
    res.send({
      success: false,
      message: "token is not valid"
    });
  }
}

const middleware = async function(req, res, next) {
  await validateToken(req, res);
  next();
};

module.exports = middleware;

const jwt = require("jsonwebtoken");
const Token = require("./../models/auth/Token");
const secret = require("./../config/secret.json");

module.exports = async function(token) {
  try {
    await jwt.verify(token, secret.jwt);
    const { idUser } = await Token.findOne({ value: token });
    return {
      status: true,
      message: "",
      idUser
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "Token is not valid"
    };
  }
};

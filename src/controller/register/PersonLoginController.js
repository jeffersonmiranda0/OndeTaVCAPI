const jwt = require("jsonwebtoken");
const Person = require("./../../models/Register/Person");
const Token = require("./../../models/auth/Token");
const secret = require("./../../config/secret.json");

module.exports = {
  async store(request, response) {
    const { email, password } = request.body || request.query;

    const person = await Person.findOne({
      email,
      password
    });

    if (!person) {
      return response.json({
        status: false,
        message: "Username or password invalid"
      });
    }

    const { value } = await Token.create({
      value: await jwt.sign({ payload: person }, secret.jwt),
      idUser: person._id
    });

    return response.json({
      token: value,
      person: {
        name: person.name,
        email: person.email,
        dateAge: person.dateAge
      }
    });
  }
};

const Person = require("./../../models/Register/Person");
const Geo = require("./../../models/Register/Geolocalization");
const ValidTokenAcess = require("./../../service/ValidTokenAcess");

module.exports = {
  async store(request, response) {
    const { latitude, longitude, token } = request.body;

    try {
      const { status, idUser, message } = await ValidTokenAcess(token);

      if (!status) {
        throw message;
      }

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      if (!idUser) {
        throw "Token invalido";
      }

      let geo = await Geo.findOne({ idUser });

      const person = await Person.findOne({ _id: idUser });

      let geoReturn = {
        coordinates: [Number(longitude), Number(latitude)],
        person: {
          _id: person._id,
          name: person.name,
          email: person.email
        }
      };

      if (!geo) {
        geo = await Geo.create({
          idUser,
          location
        });

        geoReturn.coordinates = geo.location.coordinates;
      } else {
        console.log(geo._id);
        const respon = await Geo.updateOne(
          {
            idUser,
            location
          },
          {
            $set: {
              _id: geo._id
            }
          }
        );
      }

      return response.send(geoReturn);
    } catch (e) {
      console.log(e);
      return response.status(403).send({
        status: false,
        message: e
      });
    }
  }
};

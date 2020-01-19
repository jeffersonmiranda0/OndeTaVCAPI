const Person = require("./../../models/Register/Person");
const Geo = require("./../../models/Register/Geolocalization");
const ValidTokenAcess = require("./../../service/ValidTokenAcess");
module.exports = {
  async index(request, response) {
    const { token } = request.body;

    const { status, idUser, message } = await ValidTokenAcess(token);

    let person = status == true ? await Person.find() : [];

    let newPerson = [];

    if (person.length > 0) {
      for (let i = 0; i <= person.length - 1; i++) {
        const geo = await Geo.findOne({ idUser: person[i]._id });

        newPerson.push({
          person: person[i],
          geo: !geo ? [] : geo.location.coordinates
        });
      }
    }

    console.log(person);

    return response.status(200).json({
      persons: newPerson,
      message
    });
  },
  async store(request, response) {
    const {
      name,
      dateAge,
      email,
      password,
      latitude,
      longitude
    } = request.body;

    let person = await Person.findOne({ email });

    if (person) {
      return response.json({
        status: false,
        message: "Register exists already"
      });
    }

    person = await Person.create({
      name,
      dateAge,
      email,
      password
    });

    const locationcreate = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const { location } = await Geo.create({
      idUser: person._id,
      location: locationcreate
    });

    return response.status(201).json({
      status: true,
      person,
      geo: location.coordinates
    });
  }
};

// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = require("../utils/consts");

const Pet = require("../models/Pet.model");

const pets = [
	{ petname: "Hoshi", pet: "dog", dob: "06/09/2021", size: "Large", personality: "Active", sociability: "sociable", city: "Merida", name: "Marijo", phone: "973973", status:"Adopted" },
];
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

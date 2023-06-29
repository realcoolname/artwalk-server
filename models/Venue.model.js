const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    image: String,
    name: String,
    location: String,   // geo coordinates?
    address: { 
        street: String,
        number: Number,
        zip: Number,
        city: String,
        country: String
    },
    description: String,  // or text field?
    website: String
  },
  {
    timestamps: true,
  }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;
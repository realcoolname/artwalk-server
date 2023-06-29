const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      number: { type: Number, required: true },
      zip: { type: Number, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    },
    description: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Venue = model("Venue", venueSchema);

module.exports = Venue;

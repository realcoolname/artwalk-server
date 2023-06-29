const { Schema, model } = require("mongoose");


const eventSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    curator: {
      type: String,
      required: true,
    },
    venue: { type: Schema.Types.ObjectId, ref: "Venue" },
    date: {
      type: Date,
      required: true,
    },
    discipline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;

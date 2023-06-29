const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    image: { type: String, required: true },
    name: String,
    curator: String,
    venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
    date: { type: Date, default: Date.now, required: true },
    discipline: String,
    description: String  
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;

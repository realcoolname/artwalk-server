const { isAuthenticated } = require("../middleware/jwt.middleware")

const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2;


const { default: mongoose } = require("mongoose");



// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require the Venue model in order to interact with the database
const Venue = require("../models/Venue.model");

// Require the Venue model in order to interact with the database
const Event = require("../models/Event.model");

//  POST /api/events  -  Creates a new event
router.post("/events", isAuthenticated, (req, res, next) => {
  const { imageUrl, name, curator, venue, date, discipline, description } =
    req.body;

  const newEvent = {
    //image(comes from model): image(comes from the object above- name of the variable)
    imageUrl: imageUrl,
    name: name,
    curator: curator,
    venue: venue,
    date: date,
    discipline: discipline,
    description: description,
    owner: req.payload._id
  };

  Event.create(newEvent)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new event", err);
      res.status(500).json({
        message: "error creating a new event",
        error: err,
      });
    });
});



// GET // Display all the events
router.get("/events", (req, res, next) => {
  Event.find()
    .populate("venue")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("Error getting list of events", err);
      res.status(500).json({
        message: "error getting list of events",
        error: err,
      });
    });
});

module.exports = router;

//  GET /api/events/:eventId  -  Get details of a specific event by id
router.get("/events/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findById(eventId)
  .populate("venue")
    .then((event) => res.json(event))
    .catch((err) => {
      console.log("error getting details of a event", err);
      res.status(500).json({
        message: "error getting details of a event",
        error: err,
      });
    });
});

// PUT /api/events/:eventId  -  Updates a specific event by id
router.put("/events/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = {
    image: req.body.image,
    name: req.body.name,
    curator: req.body.curator,
    venue: req.body.venueId,
    date: req.body.date,
    discipline: req.body.discipline,
    description: req.body.description,
  };

  Event.findByIdAndUpdate(eventId, newDetails, { new: true })
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((err) => {
      console.log("error updating event", err);
      res.status(500).json({
        message: "error updating event",
        error: err,
      });
    });
});

// DELETE /api/events/:eventId  -  Delete a specific Event by id
router.delete("/events/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndRemove(eventId)
    .then((deletedEvent) => {
      if (!deletedEvent) {
        res
          .status(404)
          .json({ message: `Event with id ${eventId} not found.` });
        return;
      }
      res.json({
        message: `Event with id ${eventId} was removed successfully.`,
      });
    })
    .catch((err) => {
      console.log("error deleting Event", err);
      res.status(500).json({
        message: "error deleting event",
        error: err,
      });
    });
});

const express = require("express");
const router = express.Router();

const { default: mongoose } = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require the Venue model in order to interact with the database
const Venue = require("../models/Venue.model");

// Require the Venue model in order to interact with the database
const Event = require("../models/Event.model");

// GET /api/venues -  Retrieves all of the venues
router.get('/venues', (req, res, next) => {
    Venue.find()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of venues", err);
            res.status(500).json({
                message: "error getting list of venues",
                error: err
            });
        })
});

//  POST /api/venues  -  Creates a new venue
router.post("/venues", (req, res, next) => {
  const { image, name, address, description, website } = req.body;

  const newVenue = {
    image: image,
    name: name,
    address: address,
    description: description,
    website: website,
  };

  Venue.create(newVenue)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new project", err);
      res.status(500).json({
        message: "error creating a new project",
        error: err,
      });
    });
});


module.exports = router;
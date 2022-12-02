var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

require("../models/connection");

const Place = require("../models/places");

router.post("/places", (req, res) => {
  Place.findOne().then((data) => {
    const newPlace = new Place({
      nickname: req.body.nickname,
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    newPlace.save().then((newDoc) => {
      res.json({ result: true });
    });
  });
});

router.get("/places/:nickname", (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((data) => {
    if (data) {
      res.json({ result: true, places: data });
    } else {
      res.json({ result: false, error: "user not found" });
    }
  });
});

router.delete("/places", (req, res) => {
  Place.deleteOne({ nickname: req.body.nickname, name: req.body.name }).then(
    (data) => {
      if (data) {
        res.json({ result: true });
      } else {
        res.json({ result: false });
      }
    }
  );
});

module.exports = router;

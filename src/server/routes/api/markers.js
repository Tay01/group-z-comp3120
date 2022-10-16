const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const generatePassword = require("password-generator");

const admin = require("firebase-admin");
const db = admin.firestore();


router.post(
  "/",
  [
    check("pos", "Pos is required. Make sure you are submitting a marker object with pos{lat:...,lng:...}").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /*  we can define the data structure for marker here, it currently only has a position,
        but could be useful to post other attributes here.  */
    var newMarker = req.body;
    console.log(newMarker);

    try {
        db.collection("markers").add(newMarker);
    } catch (error) {
      res.status(500).send(`Server Error ${error}`);
    }
  }
);

module.exports = router;

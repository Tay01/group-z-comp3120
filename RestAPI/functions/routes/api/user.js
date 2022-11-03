const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");


const admin = require("firebase-admin");
const { updateDoc, FieldValue } = require("@google-cloud/firestore");
const db = admin.firestore();

router.post("/init", async (req, res) => {
  try {
    let user = await db.collection("users").doc(req.body.username).set({
      username: req.body.username,
      pos: req.body.pos,
    });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(req.body);
  }
});

router.post("/update", async (req, res) => {
  try {
    let userData = await db.collection("users").doc(req.body.username).update({
      pos: req.body.pos,
    });
    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Server Error ${error}`);
  }
});

router.put("/", async (req, res) => {
  try {
    let userData = db.collection("users").doc(req.body.username).update({
        friends: FieldValue.arrayUnion(req.body.friend)
    });

    console.log(userData);
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

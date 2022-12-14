const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const admin = require("firebase-admin");
const { updateDoc, FieldValue } = require("@google-cloud/firestore");
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
      let docRefData = await db.collection("markers").add(newMarker)
      let docRefID = docRefData._path.segments[1];
      console.log(docRefID)
      res.status(200).send({ id: docRefID });
    } catch (error) {
      console.log(error)
      res.status(500).send(`Server Error ${error}`);
    }
  }
);

router.get("/", async (req, res) => {
  console.log(req)
  console.log("1")
  try {
    const markers = await db.collection("markers").get();
    var markerList = [];
    markers.forEach((marker) => {
      markerList.push([marker.data(),marker.id]);
    });
    console.log(res)
    console.log("2")
    console.log(markerList)
    console.log("3")
    res.json(markerList);
  } catch (error) {
    res.status(500).send(`Server Error ${error}`);
  }
});

router.get("/:id", async(req,res) => {
  try {
    const marker = await db.collection("markers").doc(req.params.id).get();
    res.json(marker.data());
  } catch (error) {
    res.status(500).send(`Server Error ${error}`);
  }
  
})

router.post("/withRange", async (req, res) => {
  try{
  if(!req.body.range){
    var range = 1000;
  }else{
    var range = req.body.range;
  }
  //fetch the user's location
  const user = await db.collection("users").doc(req.body.username).get();
  if(!user.exists){
    return res.status(400).json({ errors: "User does not exist" });
  }else{
    var userPos = user.data();
  }

  console.log(userPos.pos.lat)
  console.log(req.body)
  console.log(user)

  //calculate range into degrees
  var degRange = range/111139

  //get markers with pos value within range
  var markerList = []

  const markers = await db.collection("markers").get();

  markers.forEach((marker) => {
    let mlat = marker.data().pos.lat
    let mlng = marker.data().pos.lng
    if((mlat <= userPos.pos.lat + degRange) && (mlat >= userPos.pos.lat - degRange)){
      if((mlng <= userPos.pos.lng + degRange) && (mlng >= userPos.pos.lng - degRange)){
        markerList.push([marker.data(), marker.id]);
      }
    }
    
  });

  res.json(markerList);
}catch (error) {
  res.status(500).send(`Server Error ${error}`);
}


});

router.patch("/", async (req, res) => {
  console.log(req.body);
  try {
    const marker = await db.collection("markers").doc(req.body.id).get();
    if (!marker.exists) {
      res.status(404).send("Marker not found");
    } else {
      await db.collection("markers").doc(req.body.id).update(req.body.payload);
      res.status(200).send("Marker updated");
    }
  } catch (error) {
    res.status(500).send(`Server Error ${error}`);
  }
});

router.get("/:id/like", async (req, res) => {
  try {
    const marker = await db.collection("markers").doc(req.params.id).get();
    if (!marker.exists) {
      res.status(404).send("Marker not found");
    } else {
      await db.collection("markers").doc(req.params.id).update({
        likes: FieldValue.increment(1),
      });
      res.status(200).send("Marker liked");
    }
  } catch (error) {
    res.status(500).send(`Server Error ${error}`);
  }
});

router.get("/:id/dislike", async (req, res) => {
  try {
    const marker = await db.collection("markers").doc(req.params.id).get();
    if (!marker.exists) {
      res.status(404).send("Marker not found");
    } else {
      await db.collection("markers").doc(req.params.id).update({
        dislikes: FieldValue.increment(-1),
      });
      res.status(200).send("Marker disliked");
    }
  } catch (error) {
    res.status(500).send(`Server Error ${error}`);
  }
});

module.exports = router;

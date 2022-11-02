const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/init", async (req, res) => {
    try{
        const user = await db.collection("users").doc(req.body.username).get();
        if(!user.exists()){
            let userData = await db.collection("users").doc(req.body.username).set({
                username: req.body.username,
                pos: req.body.pos})
        }else{
            let userData = user.data();
        }
        console.log(userData);
        res.status(200).send(userData);
    }
    catch(error){
        console.log(error)
        res.status(500).send(`Server Error ${error}`);
    }
});

router.post("/update", async (req, res) => {
    try{
        let userData = await db.collection("users").doc(req.body.username).update({
            pos: req.body.pos})
        console.log(userData);
        res.status(200).send(userData);
    }
    catch(error){
        console.log(error)
        res.status(500).send(`Server Error ${error}`);
    }
})
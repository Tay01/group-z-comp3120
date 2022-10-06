const express = require("express");
const {} = require("../controller/userController");

const router = express.Router();

//Gets list of all Users
router.get("/users", getUser);
//Posts a user
router.post("/user", addUser);
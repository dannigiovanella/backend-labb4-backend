// ROUTES


//importerar Express
const express = require("express");
const router = express.Router();

// Importerar databasanslutningen till MongoDB
require("./db");

//Importerar schema
const User = require("../models/schema-user");


// Routes för att registerar och logga in användare

// Registera ny användare
router.post("/register", async (req, rest) => {
    try {

        const { username, password } = req.body;


    } catch (error) {
        rest.status(500).json({ error: "Serverfel" })
    }

    //Test log
    console.log("Registerring funkar");
});


// Logga in användare
router.post("/login", async (req, rest) => {

    try {

        const { username, password } = req.body;


    } catch (error) {
        rest.status(500).json({ error: "Serverfel" })
    }

    //Testlog
    console.log("login funkar");
});



module.exports = router;



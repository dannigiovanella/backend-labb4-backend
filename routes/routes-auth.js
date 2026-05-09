// ROUTES


//importerar Express
const express = require("express");
const router = express.Router();


// Routes för att registerar och logga in användare

// Registera ny användare
router.post("/register", async (req, rest) => {
console.log("Registerring funkar");
});


// Logga in användare
router.post("/login", async (req, rest) => {
console.log("login funkar");
});



module.exports = router;



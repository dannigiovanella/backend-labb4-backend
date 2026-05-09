// ROUTES


//importerar Express
const express = require("express");
const router = express.Router();


//Importerar schema
const User = require("../models/schema-user");


// Routes för att registerar och logga in användare

// Registera ny användare
router.post("/register", async (req, res) => {

    //Test log - TA BORT SEN
    console.log("Registerring funkar");


    try {

        // Hämtar username och password från request body
        const { username, password } = req.body;

        // Kontrollerar att  fälten är ifyllda
        if (!username || !password) {

            // felmeddelande om nåt saknas. Statuskod 400
            return res.status(400).json({
                error: "Alla fält måste fyllas i"
            });

        }

        // Skapar ny användare genom metoden i schema
        // Validering och hashing av lösen körs i schema
        const user = await User.register(username, password);

        // Svar om användaren skapades korrekt. Statuskod 201
        res.status(201).json({

            message: "Användare skapad",

            //Skickar bara användarnamn till front
            user: user.username

        });


    } catch (error) {
        //Vid fel av tex validering, databasfel eller dubbla användarnamn.Statuskod 400
        res.status(400).json({

            // Skickar felmeddelande (från schemat)
            error: error.message

        });

    }

});


// Logga in användare
router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;


    } catch (error) {
        rest.status(500).json({ error: "Serverfel" })
    }

    //Testlog
    console.log("login funkar");
});



module.exports = router;



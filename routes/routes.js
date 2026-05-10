// ROUTES


//importerar Express
const express = require("express");
const router = express.Router();

//Importerar bcrypt
const bcrypt = require("bcrypt");

//Importerar JWT
const jwt = require("jsonwebtoken");

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

    //Testlog TA BORT SEN
    console.log("login funkar");

    try {

        // Hämtar username och password från request body
        const { username, password } = req.body;

        // Kollar att båda fält är ifyllda
        //Om inte skicka felmeddelande. Statuskod 400
        if (!username || !password) {

            return res.status(400).json({
                error: "Alla fält måste fyllas i"
            });
        }

        // Hitta användaren i databasen på användarnamn
        const user = await User.findOne({ username });

        // Om ingen användare finns skicka felmeddelande. Statuskod 400
        if (!user) {
            return res.status(400).json({
                error: "Fel användarnamn eller lösenord"
            });
        }

        // Jämför lösenord med hashat lösenord i databas
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Om lösenordet är fel, returnerar felmeddelande. Statuskod 400
        if (!passwordMatch) {

            return res.status(400).json({
                error: "Fel användarnamn eller lösenord"
            });

        }

        // Payload, information som lagras i token. Sparar användarnamn
        const payload = {
            username: username
        };

        //Skapar token, med nyckel från .env och giltighetstid
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2h" });


        //Vid hittad användere. Lyckad inloggning med token. Skickar meddelande och användarnamn. Statuskod 200
        res.status(200).json({

            message: "Användare inloggad",
            token: token
        });

        //Vid fel, felmeddelande och statuskod 500
    } catch (error) {

        res.status(500).json({
            error: "Serverfel",
        });

    }

});





module.exports = router;



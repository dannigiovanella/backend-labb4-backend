
// SERVER


//Uppdaterad server för databashantering med MongoDB

//importerar Express
const express = require("express");
//Importerar CORS
const cors = require("cors");
//Importerar routes
const authorisationRoutes = require("./routes/routes");
//Importerar JWT
const jwt = require("jsonwebtoken");

// Importerar databasanslutningen till MongoDB
require("./db");

//Hämtar data/variabler från .env-fil (ex: PORT och DATABAS_URL)
require("dotenv").config();


//Skapar express applikation
const app = express();

//CORS - Tillåter requests från andra domäner
app.use(cors());
//Gör att server kan läsa JSON data
app.use(express.json());
//Importerar in routes för registrering och login
app.use("/api", authorisationRoutes);



//ROUTE

//Skyddad route. Giltig token måste finnas
app.get("/api/protected", validateToken, (req, res) => {
    res.json({
        message: "skyddad route",
        user: req.username
    })
});


//Funktion för kontroll/validering av JWT-token
function validateToken(req, res, next) {

    //Header
    //Hämtar authorization header
    const authHeader = req.headers["authorization"];

    //Hämtar token från Bearer Token. [1] hämtar token
    const token = authHeader && authHeader.split(" ")[1];

    //Om token saknas - felmeddelande. Statuskod 401
    if (token == null) {
        return res.status(401).json({
            message: "Token missing. Authorization fail"
        });

    }


    //Verifierar token från .env och dess giltighetstid
    //Decoded - avkodade innehållet från token. Innehåller data som finns i token efter verifiering 
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {

        //Om token inte är giltig. Felmeddelande och statuskod 403
        if (err) {
            return res.status(403).json({
                message: "Ogiltig JWT"
            });
        }

        //Sparar användardata/användarnamn från token
        req.username = decoded.username;

        //Om altt är okej, går vidare till skyddad route
        next();

    });
}



// STARTA SERVER

const PORT = process.env.PORT || 3000;

// Startar servern på en port från .env

app.listen(PORT, () => {
    console.log(`Server startad på port: ${PORT}`);
});
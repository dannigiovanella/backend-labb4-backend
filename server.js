
// SERVER


//Uppdaterad server för databashantering med MongoDB

//importerar Express
const express = require("express");
//Importerar CORS
const cors = require("cors");
//Importerar routes
const authorisationRoutes = require("./routes/routes");

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



// ROUTES

app.use("/api", authorisationRoutes);





// STARTA SERVER

const PORT = process.env.PORT || 3000;

// Startar servern på en port från .env

app.listen(PORT, () => {
    console.log(`Server startad på port: ${PORT}`);
});

//Databasanslutning mot MongoDB Atlas

//Läser in data från .env
require("dotenv").config();

// Importerar mongoose
const mongoose = require("mongoose");


// Ansluting till MongoDB (Atlas)
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Error connecting;" + error);
})

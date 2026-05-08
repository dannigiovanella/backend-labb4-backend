
// SCHEMA


//Schema för användarinformation (log in)
//Unikt ID skapas automatiskt
//Required på samtliga fält för att inte lagra tom data
//unique gör att två inte kan ha samma användarnamn
//minlenght sätter minimunmängd på användarnamn och lösenord
//trim tar bort whitespace


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Användarnamn krävs"],
        unique: true,
        trim: true,
        minlength: [3, "Användarnamn måste innehålla minst 3 tecken"]
    },

    password: {
        type: String,
        required: [true, "Lösenord krävs"],
        trim: true,
        minlength: [6, "Lösenord måste innehålla minst 6 tecken"]
    },

    createdAt: {
        type: Date,
        default: Date.now,
        trim: true
    }
});

//Exporterar
module.exports = mongoose.model("User", userSchema);
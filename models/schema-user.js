
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// SCHEMA


//Schema för användarinformation (log in)
//Unikt ID skapas automatiskt
//Required på samtliga fält för att inte lagra tom data
//unique gör att två inte kan ha samma användarnamn
//minlenght sätter minimunmängd på användarnamn och lösenord
//trim tar bort whitespace


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
        minlength: [10, "Lösenord måste innehålla minst 10 tecken"]
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});


// Hashar lösenord
//Körs innan ny användare lagras
userSchema.pre("save", async function () {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        

    } catch (error) {
        next(error);
    }
});


//Registerar användare
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};


//Kontrollerar/jämför hashat lösenord med inmatat lösen
userSchema.methods.controlPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);

    } catch (error) {
        throw error;
    }

}

//Logga in användare
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });
        if (!user) {
            throw new Error("Fel användarnamn eller lösenord")
        }

        const passwordMatch = await user.controlPassword(password);

        if (!passwordMatch) {
            throw new Error("Fel användarnamn eller lösenord")
        }
        //Vid korrekt lösen
        return user;

    } catch (error) {
        throw error;
    }
};

//Exporterar
module.exports = mongoose.model("User", userSchema);
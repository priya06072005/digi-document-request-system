const mongoose = require("mongoose");

const RegisteruserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Registeruser = mongoose.model("Registeruser", RegisteruserSchema);
module.exports = Registeruser;

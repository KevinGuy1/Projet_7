const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Model utilisateur
const userSchema = mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String }
});
// On empêche l'utilsation multiple de l'adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

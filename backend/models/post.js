const mongoose = require("mongoose");

// Model pour requête des sauces
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number, required: true },
  //   dislikes: { type: Number, required: true},
  usersLiked: { type: [String], required: true },
  //   usersDisliked: { type: [String], required: true},
});

module.exports = mongoose.model("Post", postSchema);

// importation des fonctions installées
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require(`dotenv`).config();
const cors = require("cors");

// importation des routes
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

const app = express();

// Connection au MongoDB
mongoose
  .connect("mongodb+srv://" + process.env.DB_USER_PASS + "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Requêtes autorisées
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.use(express.json());

// Redirection de la requête
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

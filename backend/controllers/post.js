const postModel = require("../models/post");
const PostModel = require("../models/post");
const UserModel = require("../models/User");
const userModel = require("../models/User");
const { uploadErrors } = require("../utils/errors.js");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
  // on récupère l'ensemble des données avec find qui renvoie un changement de status et la réponse
  PostModel.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

module.exports.createPost = async (req, res) => {
  // On récupère les données au bon format
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  // Création du produit
  const newpost = new PostModel({
    ...postObject,
    // et on génère l'url de l'image, les valeurs de likes et dislikes et on créer les tableaux likes et dislikes
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
    likes: 0,
    usersLiked: [" "],
  });
  // Sauvegarde du produit dans la base de donnée qui renvoie un changement de status et la réponse que le produit est bien enregistré
  newpost
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = async (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId) {
        if (req.file) {
          Post.findOne({ _id: req.params.id })
            .then((post) => {
              console.log("image delete");
              // On supprime l'image et l'url associe au produit
              const filename = post.imageUrl.split("/images/")[1];
              fs.unlinkSync(`images/${filename}`);
            })
            .catch((error) => res.status(404).json({ error }));
        } else {
          console.log("Pas de fichier dans la requete");
        }
        const postObject = req.file
          ? {
              // Si il y a un fichier image dans la requête ----------------------------------
              // On récupère les données de la requête et on génère un nouvel url
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
              // Sinon on mets à jour les données du produit --------------------------------------
            }
          : { ...req.body };
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(404).json({ error }));
      }
    })
    .catch((error) => res.status(403).json({ error }));
};

exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      // Si userId de la BDD = userId du token
      if (post.userId === req.auth.userId) {
        // On supprime l'image et l'url associe au produit
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          // On supprime le produit
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

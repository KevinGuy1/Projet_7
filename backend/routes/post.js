// importation des fonctions installées
const express = require("express");
const router = express.Router();

// importation des routes
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");

// Mise en place des router pour chaque type de requête
router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
// Route like
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;

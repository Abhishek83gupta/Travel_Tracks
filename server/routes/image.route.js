const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const verifyToken = require("../middlewares/auth.middleware");

const { handleImageUpload, deleteImage } = require("../controllers/image.controller")

router.post("/image-upload", upload.single("image"), verifyToken, handleImageUpload );
router.delete("/delete-image", verifyToken, deleteImage );


module.exports = router;
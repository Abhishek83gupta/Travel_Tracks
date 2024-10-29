const path = require("path");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary")

// Handle image upload to Cloudinary
const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "No image uploaded" 
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'travel-tracks', // Optional: organize images in a folder
      resource_type: 'auto'
    });

    // Delete the temporary file from server
    fs.unlinkSync(req.file.path);

    // Return the Cloudinary URL and public_id
    res.status(200).json({ 
      success: true,
      imageUrl: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    // If there's an error and a file was uploaded, clean it up
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete image from Cloudinary
const deleteImage = async (req, res) => {
  const { public_id } = req.query;

  try {
    if (!public_id) {
      return res.status(400).json({ 
        success: false, 
        message: "public_id parameter is required" 
      });
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      return res.status(200).json({ 
        success: true, 
        message: "Image deleted successfully" 
      });
    } else {
      return res.status(404).json({ 
        success: false, 
        message: "Image not found or already deleted" 
      });
    }

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  handleImageUpload,
  deleteImage
};
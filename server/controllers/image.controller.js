const path = require("path");
const fs = require("fs");

// Route to handle image upload
const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    res.status(201).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteImage = async (req, res) => {
  const { imageUrl } = req.query;

  try {
    // Check if the imageUrl is provided
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "imageUrl parameter is required" });
    }

    // Extract the filename from the imageUrl
    const filename = path.basename(imageUrl);
    
    // Define the file path
    const filePath = path.join(__dirname, 'uploads', filename);
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file from the uploads folder
      fs.unlinkSync(filePath);
      return res.status(200).json({ success: true, message: "Image deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  handleImageUpload,
  deleteImage
};

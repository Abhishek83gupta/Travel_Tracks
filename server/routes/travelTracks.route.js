const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  addTravelTracks,
  getAllTravelTracks,
  editTravelTracks,
  deleteTravelTracks,
  updateIsFavourite,
  searchTravelTracks,
  filterDateRange
} = require("../controllers/travelTracks.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/add-travel-tracks", verifyToken, addTravelTracks);
router.get("/get-all-travel-tracks", verifyToken, getAllTravelTracks);
router.put("/edit-travel-tracks/:id", verifyToken, editTravelTracks);
router.delete("/delete-travel-tracks/:id", verifyToken, deleteTravelTracks);
router.put("/update-is-favourite/:id", verifyToken, updateIsFavourite);
router.get("/search", verifyToken, searchTravelTracks);
router.get("/travel-stories/filter", verifyToken, filterDateRange);

module.exports = router;

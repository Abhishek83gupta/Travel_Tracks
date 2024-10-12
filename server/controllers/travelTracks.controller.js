const TravelTracks = require("../models/travelTrack.model");
const path = require("path");
const fs = require("fs");

//Add Travel Tracks
const addTravelTracks = async (req, res) => {
  // from Frontend
  const { title, story, visistedLocation, imageUrl, visitedDate } = req.body;
  // through middleware
  const { userId } = req.user;

  try {
    // Validate required fields
    if (!title || !story || !visistedLocation || !imageUrl || !visitedDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    // Convert visited from milliseconds to Date object
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    // creating field in DB
    const travelTracks = new TravelTracks({
      title,
      story,
      visistedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
    });
    await travelTracks.save();

    res
      .status(201)
      .json({ message: "Added Successfully", story: travelTracks });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Travel Tracks
const getAllTravelTracks = async (req, res) => {
  // through middleware
  const { userId } = req.user;

  try {
    // finding all TravelTracks data by specific userId
    const travelTracks = await TravelTracks.find({ userId: userId }).sort({
      isFavourite: -1,
    });
    res.status(200).json({ success: true, tracks: travelTracks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit Travel Tracks
const editTravelTracks = async (req, res) => {
  // The id parameter from the URL path, which represents the ID of the travel track the user wants to edit.
  const { id } = req.params;
  // through middleware
  const { userId } = req.user;
  // from Frontend
  const { title, story, visistedLocation, imageUrl, visitedDate } = req.body;

  try {
    // Validate required fields
    if (!title || !story || !visistedLocation || !imageUrl || !visitedDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    // Convert visited from milliseconds to Date object
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    // Find the travel Tracks by ID and ensure it belongs to the authenticated user
    // the _id matches the id from the URL,
    // the userId matches the currently authenticated user. This ensures that users can only update travel tracks they created themselves.
    const travelTrack = await TravelTracks.findOne({ _id: id, userId: userId });

    if (!travelTrack) {
      return res
        .status(404)
        .json({ success: false, message: "Travel tracks not found " });
    }

    const placeholderImgurl = `http://localhost:8000/asssts/placeholder.png`;

    travelTrack.title = title;
    travelTrack.story = story;
    travelTrack.visistedLocation = visistedLocation;
    travelTrack.imageUrl = imageUrl || placeholderImgurl;
    travelTrack.visitedDate = parsedVisitedDate;
    await travelTrack.save();

    res.status(200).json({ success: true, message: "Update Successful " });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Travel Tracks
const deleteTravelTracks = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    // Find the travel Tracks by ID and ensure it belongs to the authenticated user
    // the _id matches the id from the URL,
    // the userId matches the currently authenticated user. This ensures that users can only update travel tracks they created themselves.
    const travelTrack = await TravelTracks.findOne({ _id: id, userId: userId });

    if (!travelTrack) {
      return res
        .status(404)
        .json({ success: false, message: "Travel tracks not found " });
    }

    // Delete the travel story from the database
    await travelTrack.deleteOne({ _id: id, userId: userId });

    // Extract the filename from the imageUrl
    const imageUrl = travelTrack.imageUrl;
    const filename = path.basename(imageUrl);

    // Define the file path
    const filePath = path.join(__dirname, 'uploads', filename);

    // Delete the image file from the uploads folder
    fs.unlink(filePath, (err) => {
      if(err){
        console.error("failed to delete image file", err);
        // Optionally, you could still respond with a success status here
        // if you don't want to treat this as a critical error.
      }
    })

    res.status(200).json({ success: true, message: "Travel tracks deleted Successfully"});
  } catch (error) {
    res.status(500).json({ success:false, message: error.message })
  }
};

// Update isFavourite
const updateIsFavourite = async (req, res) => {
  const { id } = req.params;
  const { isFavourite } = req.body;
  const { userId } = req.user;

  try {
    const travelTrack = await TravelTracks.findOne({ _id: id, userId: userId })
    
    if(!travelTrack){
      return res.status(404).json({ success:false, message: "Story not found" })
    }

    travelTrack.isFavourite = isFavourite;
    await travelTrack.save()

    res.status(200).json({ message: "Story Updated Successfully", story: travelTrack });
  } catch (error) {
    res.status(500).json({ success: false, message:error.message });
  }
}

// Search Travel Tracks
const searchTravelTracks = async (req, res) =>{
  const { query } = req.query;
  const { userId } = req.user;

  try {
    if(!query){
      return res.status(400).json({ succes: false, message: "query is required "});
    }

    const searchResults = await TravelTracks.find({ 
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" }},
        { story: { $regex: query, $options: "i" }},
        { visistedLocation: { $regex: query, $options: "i" }},
      ],
    }).sort({ isFavourite: -1 });

    res.status(200).json({ succes: true, tracks: searchResults })
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
}

// Filter Travel Tracks by date range
const filterDateRange = async (req,res) =>{
  const { startDate, endDate } = req.query;
  const { userId } = req.user;

  try {
  // Convert startDate and endDate from millliseconds to date objects
  const start = new Date(parseInt(startDate));
  const end = new Date(parseInt(endDate));

  // Find travel tracks that belong to the authenticated user and fall within tha data range
  const filteredStories = await TravelTracks.find({
    userId: userId,
    visitedDate: { $gte: start, $lte: end },
  }).sort({ isFavourite: -1 });
  res.status(200).json({ success: true, stories: filteredStories });
  } catch (error) {
  res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  addTravelTracks,
  getAllTravelTracks,
  editTravelTracks,
  deleteTravelTracks,
  updateIsFavourite,
  searchTravelTracks,
  filterDateRange
};

const { Schema, default: mongoose } = require("mongoose");


const travelTracksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
    },
    visitedLocation: {
        type: [String],
        default: [],
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    visitedDate: {
        type: Date,
        reuired: true
    }
},{ timestamps:true })

module.exports = mongoose.model("TravelTracks", travelTracksSchema)
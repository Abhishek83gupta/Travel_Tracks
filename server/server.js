const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const connectDB = require("./db/dbConnection.js")

connectDB();
const app = express();
app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_URL
}))

// Server static files from the uploads and assets directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));


app.get("/hello",async(req,res)=>{
    return res.status(200).json({ success: true, message:"Server running" });
})

readdirSync("./routes").map((route)=>
    app.use("/api",require(`./routes/${route}`))
)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`⚙️ Server is running at port : ${PORT}`);
})

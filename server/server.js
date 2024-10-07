const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db/dbConnection.js")

connectDB();
const app = express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/hello",async(req,res)=>{
    return res.status(200).json({ success: true, message:"Server running" });
})

// const authRoutes = require("./routes/authRoutes")
// app.use("/api", authRoutes)
// readdirSync --> reads the directory  
// console.log(readdirSync("./routes")) // In array form    
// importing and using routes dynamically      
readdirSync("./routes").map((route)=>
    app.use("/api",require(`./routes/${route}`))
)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`⚙️ Server is running at port : ${PORT}`);
})

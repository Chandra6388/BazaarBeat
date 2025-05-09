"use strict";

const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const db_connect = process.env.MONGO_URI;
 
    console.log("db_connect" , db_connect)
    await mongoose.connect(db_connect, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 50000,  
      socketTimeoutMS: 45000,  
      connectTimeoutMS: 30000,  
      useNewUrlParser: false,  
      useUnifiedTopology: false,  
    });

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB Connection Error at Time:", new Date(), error);
    });

    mongoose.connection.on("disconnected", () => { 
      connectToMongoDB();
    });

  } catch (error) {
    console.log("Failed to connect to MongoDB at Time:", new Date(), error);
  }
};

module.exports = { connectToMongoDB };
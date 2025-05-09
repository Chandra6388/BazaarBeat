"use strict";
require("dotenv").config();
const { connectToMongoDB } = require("./app/connections/mongo_connections");
const express = require("express");
const app = express();

const http = require("http");
const https = require("https"); 
const cors = require("cors");
const bodyparser = require("body-parser"); 

 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));


const server = http.createServer(app);
require("./app/routes")(app);  
const PORT = process.env.PORT || 8080;

         
server.listen(PORT, () => {
  console.log(`Server is running on  http://0.0.0.0:${PORT}`);
  connectToMongoDB();
  
});
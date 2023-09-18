// const express = require("express"); // (ES5 method)
import express from "express"; // (ES6 method) we have give the type as module in package.json
// const colors = require("colors");
import colors from "colors";
import dotenv, { config } from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
// import cors from "cors";
// "client": "npm start --prefix ./client",
// "dev": "concurrently \"npm run server\" \"npm run client\""

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
// app.use(cors); // used so that conflict na ho servers ke origin ke beech m
app.use(express.json()); // client jo json m request bhejega then ye req body m json ko express m convert kr lega
app.use(morgan("dev")); //The "dev" format is a predefined format that displays concise and colorful log output, which includes details such as the HTTP method, response status, response time, and requested URL.
app.use(express.static(path.join(__dirname, "./Frontend/build")));
//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.get("/api/v1/auth/register", (req, res) => {
  res.json(res.body);
});

//PORT
const PORT = process.env.PORT || 8081;
console.log(process.env.PORT);

//run listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});

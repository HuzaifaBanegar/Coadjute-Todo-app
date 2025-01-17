const express = require("express");
const cors = require("cors");
const db = require("./db");
const connectDb = require("./db");

const todoRoute = require("./routes/TodoRoutes");

const app = express();

app.use(express.json());
app.use(cors());


connectDb();

app.use("/api", todoRoute);
app.listen(8000, ()=>{
    console.log("Server is running on port: 8000")
})

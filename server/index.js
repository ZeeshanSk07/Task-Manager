const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const taskRoutes = require("./routes/task");

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors()); 

app.use('/user', userRoute);
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB connected...");
})
.catch((err) => {
  console.error("Error connecting to database", err);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
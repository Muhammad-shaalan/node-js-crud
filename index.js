require('dotenv').config();
const express = require("express");
const app = express();

const cors = require("cors")
const httpStatusText = require("./utils/httpStatusText");

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Example app listening on port ${process.env.PORT}`)
})

app.use(cors());
// Parsing Body Object
app.use(express.json());

const coursesRouter = require("./routes/courses.routes");

app.use('/api/courses', coursesRouter)

// Middleware for not found routes 
app.all("*", (req, res) => {
  res.status(404).json({status: httpStatusText.ERROR, data: null, message: "This resource is not available"});
})

// Middleware for catch errors
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, data: error.data || null, message: error.message})
})

// DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'));

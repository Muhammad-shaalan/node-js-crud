require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Example app listening on port ${process.env.PORT}`)
})

// Parsing Body Object
app.use(express.json());

const coursesRouter = require("./routes/courses.routes");

app.use('/api/courses', coursesRouter)

// DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'));

const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})

// Parsing Body Object
app.use(express.json());

const coursesRouter = require("./routes/courses.routes");

app.use('/api/courses', coursesRouter)
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const mongoUri = "mongodb://0.0.0.0:27017/meow";
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.text());

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;
const usersRoutes = require("./routes/users");
const documentsRoutes = require("./routes/documents");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(`Hello ${req.body.name}`);
});


app.use("/api/users", usersRoutes);
app.use("/api/document", documentsRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server Connected");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

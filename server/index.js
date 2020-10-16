const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/database");
const router = require("./routes/router");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
    res.send("Songs database");
});

app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
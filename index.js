const express = require("express");
const app = express();
const path = require("node:path");

const PORT = 8000;
const HOSTNAME = "localhost";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.listen(PORT, (error) => {
  console.log(`Serving on http://${HOSTNAME}:${PORT}`);
  if (error) throw error;
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const express = require("express");
const app = express();
const path = require("node:path");
const router = require("./routes/router");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use("/", router);

app.listen(PORT, (error) => {
  console.log(`Listening on http://${HOST}:${PORT}`);
  if (error) throw error;
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

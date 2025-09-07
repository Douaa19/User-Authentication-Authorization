require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

// mongoose
require("./src/db/config");

// require routes
const authRoutes = require("./src/routes/auth");

// middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running at : http://localhost:${PORT}`);
});

module.exports = app;

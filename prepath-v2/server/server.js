require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const { connectDB } = require("./config/database");
const cors = require("cors");

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL variable in .env missing.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;

app.enable('json spaces');
app.enable('strict routing');

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().catch(err => {
  console.error('Database connection error:', err);
  process.exit(-1);
});

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

app.use(basicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);

app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
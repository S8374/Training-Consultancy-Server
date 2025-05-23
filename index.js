const express = require("express");
const cors = require("cors");
const { routes } = require("./Routes/Routes");
const { connect } = require("./database/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://consultprocom.netlify.app'
  ],
}));
app.use(express.json());

// Connect to database
connect();

// API Routes
app.use("/", routes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Local development server
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Serverless export (optional for Vercel)
module.exports = app;

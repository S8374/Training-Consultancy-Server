const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'https://your-project.vercel.app'] }));
app.use(express.json());

// MongoDB URI and Client Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.16q5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let cachedClient = null; // Cached MongoDB client for serverless

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  cachedClient = await client.connect();
  return cachedClient;
}

// Routes
app.get('/services', async (req, res) => {
  try {
    const client = await connectToDatabase();
    const TrainingConsultancy = client.db("Training-Consultancy").collection("Services");
    const services = await TrainingConsultancy.find().toArray();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Serverless export (for Vercel)
module.exports = app;

// Local Development Listener
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

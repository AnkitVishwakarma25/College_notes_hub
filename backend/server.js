require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Message = require("./models/Message");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Old MongoDB Atlas connection (commented out)
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log("mongoDB error :", err));

// New local MongoDB connection
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected locally"))
.catch((err) => console.log("mongoDB local connection error:", err));

// API Route to receive contact form data
app.post("/api/contact", async (req, res) => {
  const { email, description } = req.body;

  try {
    const message = new Message({ email, description });
    await message.save();
    res.status(200).json({ message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

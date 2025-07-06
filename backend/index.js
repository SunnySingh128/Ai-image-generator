const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.post('/generate', async (req, res) => {
  const { imageUrl } = req.body;
  console.log("Prompt received:", imageUrl);

  if (!imageUrl) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large";

  const headers = {
    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
    "Accept": "image/png",
    "Content-Type": "application/json"
  };

  const data = {
    inputs: imageUrl,
    options: { wait_for_model: true }
  };

  try {
    const response = await axios.post(API_URL, data, {
      headers,
      responseType: 'arraybuffer' // receive binary data
    });

    // Convert image buffer to base64
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64Image = imageBuffer.toString("base64");

    // Send base64 string to frontend
    res.json({ image: base64Image });

  } catch (error) {
    console.error("Error generating image:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

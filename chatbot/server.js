// Import required modules and initialize environment variables
require("dotenv").config(); // load environment variables from .env file
const express = require('express');
const cors = require('cors');

const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import Google Generative AI SDK

// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json()); // Allow parsing of JSON requests

// Check if the GEMINI_API_KEY is available in the environment variables
// This is a good practice to avoid running the app without the required API key.
if (!process.env.GEMINI_API_KEY) {
    console.error("Error: env file is missing the API KEY");
    process.exit(1); // Exit the process if the API key is not set
}

// Initialize Google Generative AI client
const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//Define Routes: /chat endpoint where the frontend sends POST requests
app.post('/chat', async (req, res) => {

    const message = req.body.message; //extract user message from request body

    if(!message){
        return res.json({message: "Sorry, the message is empty."});
    }

    try {
        const model = geminiAI.getGenerativeModel({model: "gemini-2.0-flash"});

        // Modify user message to enforce brevity
        const modifiedMessage = `The context is literature and book recommendations, max response length(250 words): ${message}`;

        const result = await model.generateContent(modifiedMessage);
        res.json({ message: result.response.text() });

    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





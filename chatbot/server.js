// Load environment variables from a .env file
require("dotenv").config();

// Import required modules
const express = require("express"); // Web framework for handling HTTP requests
const path = require("path"); // Helps manage file paths
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Google's AI SDK for Gemini API

// Initialize Express app
const app = express();

// Check if API key exists in the environment variables
if (!process.env.GEMINI_API_KEY) {
    console.error("Error: .env file is missing the API Key");
    process.exit(1); // Exits the process with an error (indicates failure).
}

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware to handle URL-encoded and JSON data in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (like HTML, CSS, and JavaScript) from the "root" folder
app.use(express.static(path.join(__dirname, "root")));

/**
 * Route: POST /get
 * Description: Receives a text query from the client, sends it to Gemini AI, and returns the response.
 */
app.post("/get", async (req, res) => {
    const userInput = req.body.msg; // Extract the user input text from the request body

    // If no input is provided, return an error response
    if (!userInput) {
        return res.status(400).json({ error: "No text input provided." });
    }

    try {
        // Initialize the Gemini AI model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Send the user's text input to Gemini AI and generate a response
        const response = await model.generateContent([userInput]);

        // Send the AI-generated response back to the client as JSON
        res.json({ response: response.response.text() });
    } catch (error) {
        // Handle errors and return an appropriate response
        console.error("Error generating response:", error);
        res.status(error.status || 500).json({ error: "An error occurred while generating the response." });
    }
});

// Define the port for the server (use the environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

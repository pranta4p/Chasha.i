const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/api/chat-ai', async (req, res) => {
    try {
        const userMessage = req.body.contents?.[0]?.parts?.[0]?.text;

        if (!userMessage) {
            return res.status(400).json({ error: { message: "No message provided" } });
        }

        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            console.error("GEMINI_API_KEY is not set in environment variables.");
            return res.status(500).json({ error: { message: "Server configuration error: API Key missing" } });
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error("Chat Route Error:", error);
        res.status(500).json({ error: { message: "Internal Server Error" } });
    }
});

module.exports = router;

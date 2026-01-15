
const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const User = require('../models/User');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// router.post('/api/chat-ai', async (req, res) => {
   
//     try {
//         const userMessage =req.body.message|| req.body.contents?.[0]?.parts?.[0]?.text ;

//         if (!userMessage) {
//             return res.status(400).json({ error: { message: "No message provided" } });
//         }

//         const API_KEY = process.env.OPENROUTER_API_KEY;

//         if (!API_KEY) {
           
//             console.error("OPENROUTER_API_KEY is not set in environment variables.");
//             return res.status(500).json({ error: { message: "Server configuration error: API Key missing" } });
//         }
       
//         const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {

//             model: "deepseek/deepseek-r1",
//             messages: [{ role: "user", content: userMessage }]
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${API_KEY}`,
//             }
//         });
         
//         const data = response.data;
//         // const data="hi";
//         res.json(data);

//     } catch (error) {
//         console.error("Chat Route Error:", error.message);
//         if (error.response) {
//             console.error("OpenRouter Error Response:", error.response.data);
//             return res.status(error.response.status).json(error.response.data);
//         }
//         res.status(500).json({ error: { message: "Internal Server Error" } });
//     }
// });

router.post('/api/chat-ai', async (req, res) => {

  try {
    const  title  = req.body.message;  //--right

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
  
    const prompt = ` ${title}"`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    

 
    res.json({ generatedDescription: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Failed to generate description" });
  }

})

module.exports = router;

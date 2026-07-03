//importing packages
const express= require('express')
const cors = require ('cors')
require('dotenv').config();   // loads .env → process.env  (must be BEFORE using the key!)
const { GoogleGenerativeAI } = require('@google/generative-ai');
//creating the app
const app= express()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-flash-lite-latest',
  systemInstruction: 'You are a friendly chatbot. Answer in no more than 2 short sentences. Plain text only, no markdown or asterisks.'
});

//middleware , runs on every request
app.use(cors())// permission notes for the browser bodyguard
app.use(express.json());// teaches Express to read JSON bodies
//our one route
app.post('/chat', async (req, res) => {
  const messages = req.body.messages;   // now an ARRAY, not one message

  try {
    // 1. Translate our format → Gemini's format
    const history = messages.map((msg) => {
      return {
        role: msg.sender === 'robot' ? 'model' : 'user',
        parts: [{ text: msg.message }]
      };
    });

    // 2. Send the whole history to Gemini
    const result = await model.generateContent({ contents: history });
    const reply = result.response.text();

    res.json({ reply: reply });
  } catch (error) {
    console.log('GEMINI ERROR:', error);
    res.status(500).json({ reply: 'Sorry, something went wrong.' });
  }
});

//start the server
app.listen(3000,()=>{
    console.log("server running on port 3000")
})

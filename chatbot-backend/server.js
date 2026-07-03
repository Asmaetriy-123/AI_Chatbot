//importing packages
const express= require('express')
const cors = require ('cors')
require('dotenv').config();   // loads .env → process.env  (must be BEFORE using the key!)
const { GoogleGenerativeAI } = require('@google/generative-ai');
//creating the app
const app= express()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
//middleware , runs on every request
app.use(cors())// permission notes for the browser bodyguard
app.use(express.json());// teaches Express to read JSON bodies
//our one route

app.post('/chat', async (req, res) => {
  const message = req.body.message;
  const result = await model.generateContent(message);
  const reply = result.response.text();
  res.json({ reply: reply });
});
//start the server
app.listen(3000,()=>{
    console.log("server running on port 3000")
})

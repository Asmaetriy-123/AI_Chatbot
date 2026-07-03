//importing the two packages
const express= require('express')
const cors = require ('cors')
//creating the app
const app= express()

//middleware , runs on every request
app.use(cors())// permission notes for the browser bodyguard
app.use(express.json());// teaches Express to read JSON bodies
//our one route
app.post('/chat',(req,res)=>{
    const message=req.body.message
    res.json({reply: "You said : " + message})
})
//start the server
app.listen(3000,()=>{
    console.log("server running on port 3000")
})

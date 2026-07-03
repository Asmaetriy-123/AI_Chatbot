import { useState,useEffect} from 'react'
import {ChatInput} from './components/ChatInput.jsx'
import {Chatbot} from "supersimpledev"
import ChatMessages from "./components/ChatMessages"
import dayjs from 'dayjs'
import './App.css'
function App() {
 
   const [chatMessages, setChatMessages] = useState(
  JSON.parse(localStorage.getItem('messages')) || [
    {
      message: 'hello chatbot',
      sender: 'user',
      id: 'id1',
      time: dayjs().valueOf()
    }, {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: 'id2',
      time: dayjs().valueOf()
    }, {
      message: 'can you get me todays date?',
      sender: 'user',
      id: 'id3',
      time: dayjs().valueOf()
    }, {
      message: 'Today is September 27',
      sender: 'robot',
      id: 'id4',
      time: dayjs().valueOf()
    }
  ]
);
  useEffect(()=>{
 localStorage.setItem('messages',JSON.stringify(chatMessages))}
           ,
        [chatMessages])
       
          /*
          message: 'hello chatbot',
          sender: 'user',
          id: 'id1',
          time:dayjs().valueOf()
        }, {
          message: 'Hello! How can I help you?',
          sender: 'robot',
          id: 'id2',
          time:dayjs().valueOf()
        }, {
          message: 'can you get me todays date?',
          sender: 'user',
          id: 'id3',
          time:dayjs().valueOf()
        }, {
          message: 'Today is September 27',
          sender: 'robot',
          id: 'id4',
          time:dayjs().valueOf()*/
        
        // const [chatMessages, setChatMessages] = array;
        // const chatMessages = array[0];
        // const setChatMessages = array[1];
        useEffect(()=>{
          Chatbot.addResponses(
          {"what is your name ?":"I am a chatbot asmaeChatbot",
            "are you okay?":"yes i am thank you",
            "do you know who i am ?":"You are the diva ASMAE"
          }
        )},[])
       
        
       
        return (
          <div className="app-container">
            <ChatMessages
              chatMessages={chatMessages}
              
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
           
          </div>
        );
      }
  

export default App

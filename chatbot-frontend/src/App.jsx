import { useState,useEffect} from 'react'
import {ChatInput} from './components/ChatInput.jsx'
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
        const [isLoading,setIsLoading]=useState(false)
       
        return (
          <div className="app-container">
            <ChatMessages
              chatMessages={chatMessages}
              isLoading={isLoading}
              
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              setIsLoading={setIsLoading}
            />
           
          </div>
        );
      }
  

export default App

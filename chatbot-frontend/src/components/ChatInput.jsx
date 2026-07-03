import { useState } from 'react'
import dayjs from 'dayjs'
import './ChatInput.css'
export function ChatInput({ chatMessages, setChatMessages,setIsLoading }) {
  const [inputText, setInputText] = useState('');
 
  function saveInputText(event) {
    setInputText(event.target.value);
  }
  async function sendMessage() {
    const messageToSend = inputText;
  setIsLoading(true);              // ⬅️ ON: the waiting starts NOW
    const newChatMessages = [
      ...chatMessages,
      {
        message: messageToSend,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];
    setChatMessages(newChatMessages);
    setInputText('');   // clear the box right away — no frozen feeling

    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newChatMessages})
    });
    const data = await res.json();
    
    const response = data.reply;
    setIsLoading(false)

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
      <button onClick={clearMessages} className="clear-btn">clear</button>
    </div>
  );
}
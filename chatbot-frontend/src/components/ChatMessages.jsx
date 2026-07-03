import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage.jsx'
import './ChatMessages.css'
import LoadingSpinner from '../assets/loading-spinner.gif'

function ChatMessages({ chatMessages, isLoading }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
          />
        );
      })}

      {isLoading && (
        <img
          src={LoadingSpinner}
          className="loading-spinner"
          alt="Robot is typing..."
        />
      )}
    </div>
  );
}

export default ChatMessages
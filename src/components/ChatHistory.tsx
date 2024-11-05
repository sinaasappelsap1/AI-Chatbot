// This component is responsible for the chat history.
import React, { useEffect, useRef } from 'react';
import MessageLine from './MessageLine';
import { Message as MessageType } from '../hooks/useMessageHandler';
import '../styles/ChatHistory.css';

interface MessageHistoryProps {
  messages: MessageType[];  
  loading: boolean;
}

const ChatHistory: React.FC<MessageHistoryProps> = ({ messages, loading }) => {
  const latestMessageRef = useRef<HTMLDivElement | null>(null);

  // Automatically scroll to the latest message when a new message is added
  useEffect(() => {
    latestMessageRef.current?.scrollIntoView();
  }, [messages, loading]);

  return (
    <div className="message-history">
      {messages.map((msg, index) => (
        <MessageLine key={index} sender={msg.sender} text={msg.text} />
      ))}
      {loading && <div className="loading">ChatGPT is typing... 💬</div>}
      <div ref={latestMessageRef} />
    </div>
  );
};

export default ChatHistory;


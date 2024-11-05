// This component is responsible for the chat interface overall.
import React from 'react';
import Heading from '@jetbrains/ring-ui-built/components/heading/heading';
import ChatHistory from './ChatHistory';
import InputForm from './InputForm';
import useMessageHandler from '../hooks/useMessageHandler';
import '../styles/Chat.css';

const Chat: React.FC = () => {
  const { messages, sendMessage, loading } = useMessageHandler(); // Using custom hook for message handling

  return (
    <div className="chat-container">
      <Heading level={Heading.Levels.H1}>Chat with AI 🤖</Heading>
      <ChatHistory messages={messages} loading={loading} />
      <InputForm onSendMessage={sendMessage} loading={loading} />
    </div>
  );
};

export default Chat;


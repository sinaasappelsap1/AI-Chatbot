// This component is responsible for the input and send button for the message.
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import Button from '@jetbrains/ring-ui-built/components/button/button';
import Input from '@jetbrains/ring-ui-built/components/input/input';
import '../styles/MessageForm.css';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  loading: boolean;
}

const InputForm: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState('');

  const handleSendClick = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat-input-container">
      <Input
        multiline
        placeholder="Let's chat!"
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="chat-input"
        disabled={loading}
      />
      <Button
        onClick={handleSendClick}
        disabled={!input.trim()}
      >
        Send
      </Button>
    </div>
  );
};

export default InputForm;

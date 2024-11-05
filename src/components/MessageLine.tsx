// This component is responsible for rendering a single message in the chat & copying to clipboard.
import React, {useState} from 'react';
import '../styles/MessageLine.css';

interface MessageProps {
  sender: 'User' | 'ChatGPT';
  text: string;
}

const MessageLine: React.FC<MessageProps> = ({ sender, text }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Сopy the message to clipboard
  const handleCopy = () => { 
    navigator.clipboard.writeText(text) 
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000)
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  return (
    <div className="message-container">
      <div className="message-content">
        <strong>{sender}:</strong> {text}
      </div>
        <button
          onClick={handleCopy}
          className="copy-button"
          aria-label="Copy message"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
    </div>
  );
};

export default MessageLine;

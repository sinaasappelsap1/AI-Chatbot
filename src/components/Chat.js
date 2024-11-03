import React, { useState } from 'react';
import axios from 'axios';
import Button from '@jetbrains/ring-ui-built/components/button/button';
import Input from '@jetbrains/ring-ui-built/components/input/input';
import Heading from '@jetbrains/ring-ui-built/components/heading/heading';
import '../styles/Chat.css';

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const Message = async () => {
    if (!input.trim()) return; 

    const userMessage = { sender: 'User', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            ...messages.map((msg) => ({
              role: msg.sender === 'User' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          },
        }
      );

      const chatgptMessage = {
        sender: 'ChatGPT',
        text: response.data.choices[0].message.content,
      };

      setMessages((prevMessages) => [...prevMessages, chatgptMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = {
        sender: 'ChatGPT',
        text: 'Request failure.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      <Heading level={Heading.Levels.H1}>Chat with AI 🤖 </Heading>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-send-container">
      <Input
          multiline
          placeholder="Let's chat!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <Button onClick={Message}>Send</Button>
      </div>

    </div>
  );
};

export default Chat;
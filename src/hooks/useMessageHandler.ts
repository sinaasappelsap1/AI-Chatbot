// A custom hook that covers message handling. It sends user messages to the AI API and handles responses.
import { useState, useCallback } from 'react';
import axios from 'axios';

export interface Message {
  sender: 'User' | 'ChatGPT';
  text: string;
}

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY as string;

const useMessageHandler = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: Message = { sender: 'User', text };
      setMessages([...messages, userMessage]); 
      setLoading(true); // Response is being processed

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
              { role: 'user', content: text },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            },
          }
        );

        const chatgptMessage: Message = {
          sender: 'ChatGPT',
          text: response.data.choices[0].message.content,
        };

        setMessages((prevMessages) => [...prevMessages, chatgptMessage]);
      } catch (error) {
        console.error('Error fetching response:', error);
        const errorMessage: Message = {
          sender: 'ChatGPT',
          text: 'Request failure..',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  return { messages, sendMessage, loading };
};

export default useMessageHandler;

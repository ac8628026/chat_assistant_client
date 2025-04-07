
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import { Message } from '@/components/ChatMessage';
import { sendMessage } from '@/services/chatService';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator by adding an empty assistant message
    const assistantMessageId = nanoid();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      
      // Update the assistant message with the response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: response.response } 
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to get a response:", error);
      
      // Remove the pending assistant message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 flex flex-col overflow-hidden">
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
        />
        <ChatInput 
          onSubmit={handleSendMessage} 
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Chat;

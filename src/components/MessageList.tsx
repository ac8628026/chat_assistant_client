
import React, { useEffect, useRef } from 'react';
import ChatMessage, { Message } from './ChatMessage';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-8">
        <div className="max-w-md">
          <h2 className="text-xl font-semibold mb-2">Welcome to AI Chat</h2>
          <p className="text-muted-foreground">
            Start a conversation by typing a message below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          isLoading={isLoading && index === messages.length - 1 && message.role === 'assistant'}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

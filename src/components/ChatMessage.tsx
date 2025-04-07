
import React from 'react';
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import LoadingDots from './LoadingDots';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp?: Date;
}

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "py-6 px-4 md:px-8 w-full flex flex-col space-y-2 animate-in fade-in duration-200",
        isUser ? "bg-chat-user" : "bg-chat-assistant"
      )}
    >
      <div className="flex items-start max-w-4xl mx-auto w-full">
        <div className="flex-shrink-0 mr-4">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium mb-1 text-gray-400">
            {isUser ? "You" : "Assistant"}
          </div>
          
          {isLoading && message.role === 'assistant' ? (
            <LoadingDots className="py-2" />
          ) : (
            <div className="prose prose-invert max-w-none">
              {message.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < message.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

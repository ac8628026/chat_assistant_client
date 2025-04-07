
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-border bg-card/70 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
        <div className="relative flex items-end">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message the AI..."
            disabled={isLoading}
            rows={1}
            className="w-full resize-none bg-secondary/50 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-foreground placeholder:text-muted-foreground min-h-[56px] max-h-[200px] transition-all duration-200"
          />
          <Button 
            size="icon" 
            type="submit" 
            disabled={!message.trim() || isLoading} 
            className="absolute right-2 bottom-2 h-8 w-8 opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;

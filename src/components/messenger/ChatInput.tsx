
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="p-4 border-t border-elec-yellow/20 bg-elec-gray-light/5 sticky bottom-0">
      <form onSubmit={handleSend} className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          className="min-h-10 resize-none bg-elec-gray-light/10 border-elec-yellow/30 focus:border-elec-yellow focus:ring-elec-yellow/20"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
          disabled={disabled}
        />
        <Button 
          type="submit" 
          className="shrink-0 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 transition-colors"
          disabled={!message.trim() || disabled}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;

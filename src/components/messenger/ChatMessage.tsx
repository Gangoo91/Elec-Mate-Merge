
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCheck, Check } from "lucide-react";
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fade-in mb-2`}
    >
      <div 
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-3 
          ${isCurrentUser 
            ? 'bg-elec-yellow text-elec-dark ml-auto shadow-md rounded-tr-none' 
            : 'bg-elec-gray-light/30 text-white shadow-md rounded-tl-none'
          }`
        }
      >
        {!isCurrentUser && (
          <p className="text-xs font-medium mb-1 text-elec-yellow">{message.senderName}</p>
        )}
        <p className="break-words text-sm md:text-base text-white">{message.content}</p>
        <div className={`flex items-center gap-1 mt-1 text-xs ${isCurrentUser ? 'justify-end' : ''}`}>
          <span className={isCurrentUser ? 'text-elec-dark/70' : 'text-muted-foreground'}>
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
          {isCurrentUser && (
            <span className="text-elec-dark/70 flex items-center">
              {message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

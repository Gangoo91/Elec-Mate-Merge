
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Conversation, Message } from './types';

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  currentUserId: string;
  getInitials: (name: string) => string;
  onSendMessage: (content: string) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({ 
  conversation, 
  messages, 
  currentUserId,
  getInitials,
  onSendMessage
}) => {
  return (
    <>
      {/* Conversation header */}
      <div className="p-4 border-b border-elec-yellow/20 bg-elec-gray-light/10 flex items-center gap-3 sticky top-0 z-10">
        <Avatar>
          <AvatarImage src={conversation.participantAvatar} />
          <AvatarFallback className="bg-elec-yellow text-elec-dark">
            {getInitials(conversation.participantName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{conversation.participantName}</h3>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-gradient-to-b from-elec-gray to-elec-gray-light/5">
        {messages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isCurrentUser={message.senderId === currentUserId} 
          />
        ))}
      </div>
      
      {/* Message input */}
      <ChatInput 
        onSendMessage={onSendMessage} 
      />
    </>
  );
};

export default ConversationView;

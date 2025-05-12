
import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Helper function to safely format dates
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleTimeString(undefined, { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      <div className="p-3 border-b border-elec-yellow/20 bg-elec-gray flex items-center gap-3 sticky top-0 z-10">
        <Avatar className="bg-elec-yellow text-elec-dark h-10 w-10">
          <AvatarImage src={conversation.participantAvatar} />
          <AvatarFallback className="bg-elec-yellow text-elec-dark">
            {getInitials(conversation.participantName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-white">{conversation.participantName}</h3>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
      
      {/* Messages area with improved positioning */}
      <ScrollArea className="flex-1 p-0">
        <div className="flex flex-col p-3 pb-6 min-h-[calc(100vh-170px)]">
          {/* Add some top space to improve message positioning */}
          {messages.length > 5 && <div className="py-6"></div>}
          
          {/* Messages */}
          <div className="flex-1 flex flex-col justify-end gap-3">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isCurrentUser={message.senderId === currentUserId} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <ChatInput 
        onSendMessage={onSendMessage} 
      />
    </div>
  );
};

export default ConversationView;

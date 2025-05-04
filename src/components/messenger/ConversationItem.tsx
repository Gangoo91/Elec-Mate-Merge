
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation } from './types';

interface ConversationItemProps {
  conversation: Conversation;
  activeConversationId?: string;
  onSelect: (conversation: Conversation) => void;
  getInitials: (name: string) => string;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ 
  conversation, 
  activeConversationId, 
  onSelect,
  getInitials
}) => {
  return (
    <div
      className={`p-4 border-b border-elec-yellow/10 cursor-pointer transition-colors ${
        activeConversationId === conversation.id ? 'bg-elec-gray-light/10' : 'hover:bg-elec-gray-light/5'
      }`}
      onClick={() => onSelect(conversation)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="bg-elec-yellow text-elec-dark h-12 w-12">
            <AvatarImage src={conversation.participantAvatar} />
            <AvatarFallback className="bg-elec-yellow text-elec-dark text-base">
              {getInitials(conversation.participantName)}
            </AvatarFallback>
          </Avatar>
          {conversation.unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-elec-yellow text-elec-dark text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              {conversation.unreadCount}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium truncate text-base ${conversation.unreadCount > 0 ? 'text-elec-yellow' : 'text-white'}`}>
              {conversation.participantName}
            </h3>
            {conversation.lastMessageTime && (
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true })}
              </span>
            )}
          </div>
          {conversation.lastMessage && (
            <p className={`text-sm truncate ${
              conversation.unreadCount > 0 
                ? 'text-elec-light font-medium' 
                : 'text-muted-foreground'
            }`}>
              {conversation.lastMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;

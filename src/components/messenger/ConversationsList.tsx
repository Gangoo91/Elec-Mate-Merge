
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import ConversationItem from './ConversationItem';
import { Conversation } from './types';

interface ConversationsListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectConversation: (conversation: Conversation) => void;
  getInitials: (name: string) => string;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ 
  conversations, 
  activeConversationId,
  searchQuery,
  onSearchChange,
  onSelectConversation,
  getInitials
}) => {
  return (
    <>
      <div className="p-4 border-b border-elec-yellow/20 bg-elec-gray-light/5">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search messages..." 
            className="pl-9 bg-elec-gray-light/10 border-elec-yellow/30 focus:border-elec-yellow focus:ring-elec-yellow/20"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <p>No conversations found</p>
            <Button
              variant="outline"
              className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              Start New Conversation
            </Button>
          </div>
        ) : (
          conversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              activeConversationId={activeConversationId}
              onSelect={onSelectConversation}
              getInitials={getInitials}
            />
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-elec-yellow/20 bg-elec-gray-light/5">
        <Button
          variant="outline"
          className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10 group"
        >
          <Plus className="mr-2 h-4 w-4 group-hover:text-elec-yellow transition-colors" />
          New Message
        </Button>
      </div>
    </>
  );
};

export default ConversationsList;

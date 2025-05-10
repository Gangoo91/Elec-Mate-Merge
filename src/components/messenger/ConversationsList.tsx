
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Users, Heart, GraduationCap, MessageSquarePlus } from "lucide-react";
import ConversationItem from './ConversationItem';
import { Conversation } from './types';

interface ConversationsListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectConversation: (conversation: Conversation) => void;
  getInitials: (name: string) => string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ 
  conversations, 
  activeConversationId,
  searchQuery,
  onSearchChange,
  onSelectConversation,
  getInitials,
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'private', label: 'Private', icon: <User className="h-5 w-5" /> },
    { id: 'team', label: 'Team', icon: <Users className="h-5 w-5" /> },
    { id: 'mental-health', label: 'Support', icon: <Heart className="h-5 w-5" /> },
    { id: 'mentor', label: 'Mentor', icon: <GraduationCap className="h-5 w-5" /> }
  ];
  
  return (
    <div className="flex flex-col h-full">
      {/* New Message button - Prominent at the top */}
      <div className="p-3 bg-elec-yellow">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 text-black font-medium hover:bg-black/10 transition-colors"
        >
          <MessageSquarePlus className="h-5 w-5" />
          New Message
        </Button>
      </div>

      {/* Tab buttons */}
      <div className="flex border-b border-elec-yellow/10 bg-elec-gray-dark">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-4 flex justify-center items-center ${
              activeTab === tab.id 
                ? 'bg-elec-yellow text-elec-dark' 
                : 'text-elec-gray-light hover:bg-elec-gray-light/10'
            }`}
          >
            {tab.icon}
          </button>
        ))}
      </div>
      
      {/* Search box */}
      <div className="p-3 border-b border-elec-yellow/10 bg-elec-gray">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search messages..." 
            className="pl-9 bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow focus:ring-elec-yellow/20 rounded-full"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto bg-elec-gray">
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
      
      {/* Remove the New Message button from the bottom since we added it to the top */}
    </div>
  );
};

export default ConversationsList;

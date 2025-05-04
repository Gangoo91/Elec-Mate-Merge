
import React from 'react';
import { MessageSquare } from "lucide-react";

interface EmptyStateProps {
  activeTab: string;
  getTabIcon: (tab: string) => React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ activeTab, getTabIcon }) => {
  const getMessageByTab = () => {
    switch (activeTab) {
      case 'private':
        return "Select a conversation or start a new one";
      case 'team':
        return "Connect with your team members";
      case 'mental-health':
        return "Reach out to our support advisors";
      case 'mentor':
        return "Chat with your mentors and instructors";
      default:
        return "Select a conversation to start messaging";
    }
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-elec-gray-light/10 rounded-full p-6 mb-4">
        {getTabIcon(activeTab) || <MessageSquare className="h-12 w-12 text-elec-yellow opacity-50" />}
      </div>
      <h3 className="text-lg font-medium mb-2 text-elec-yellow">No conversation selected</h3>
      <p className="text-muted-foreground max-w-md">
        {getMessageByTab()}
      </p>
    </div>
  );
};

export default EmptyState;

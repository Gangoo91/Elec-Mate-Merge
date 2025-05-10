
import React from 'react';
import { MessengerTabType } from './constants';

interface EmptyStateProps {
  activeTab: MessengerTabType;
  getTabIcon: (tab: MessengerTabType) => React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ activeTab, getTabIcon }) => {
  const getTabMessage = (tab: MessengerTabType) => {
    switch (tab) {
      case 'private': 
        return 'Select a conversation or start a new one to begin messaging';
      case 'team': 
        return 'Stay connected with your team through group conversations';
      case 'mental-health': 
        return 'Reach out to mental health support professionals';
      case 'mentor': 
        return 'Connect with mentors for guidance and support';
      default: 
        return 'Select a conversation to start messaging';
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-6 bg-elec-gray-light/10 rounded-full mb-6">
        {getTabIcon(activeTab)}
      </div>
      <h2 className="text-xl font-medium text-white mb-2">No conversation selected</h2>
      <p className="text-muted-foreground text-center max-w-md">
        {getTabMessage(activeTab)}
      </p>
    </div>
  );
};

export default EmptyState;

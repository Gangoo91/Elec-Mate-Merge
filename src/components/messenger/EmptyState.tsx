
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, User, Users, Heart, GraduationCap } from "lucide-react";

interface EmptyStateProps {
  activeTab: 'private' | 'team' | 'mental-health' | 'mentor';
  getTabIcon: (tab: string) => React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ activeTab, getTabIcon }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-elec-gray to-elec-gray-light/5">
      <div className="bg-elec-yellow/10 p-6 rounded-full mb-4 shadow-inner">
        {getTabIcon(activeTab)}
      </div>
      <h3 className="text-lg font-medium mb-2 text-elec-yellow">
        {activeTab === 'private' && 'Private Messages'}
        {activeTab === 'team' && 'Team Communication'}
        {activeTab === 'mental-health' && 'Mental Health Support'}
        {activeTab === 'mentor' && 'Mentorship Chat'}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {activeTab === 'private' && 'Select a conversation or start a new one to send private messages to other users.'}
        {activeTab === 'team' && 'Communicate with your team members about projects, schedules and tasks.'}
        {activeTab === 'mental-health' && 'Connect with mental health professionals for support and guidance.'}
        {activeTab === 'mentor' && 'Chat with your mentors about your electrical apprenticeship progress.'}
      </p>
      <Button
        variant="outline"
        className="border-elec-yellow hover:bg-elec-yellow hover:text-elec-dark transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" />
        {activeTab === 'private' && 'Start New Conversation'}
        {activeTab === 'team' && 'Create Team Channel'}
        {activeTab === 'mental-health' && 'Connect with Support'}
        {activeTab === 'mentor' && 'Request Mentor'}
      </Button>
    </div>
  );
};

export default EmptyState;


import React from 'react';
import { User, Users, Heart, GraduationCap } from "lucide-react";
import { MessengerTabType } from './constants';

export const useConversationUtils = () => {
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'private': return <User className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      case 'mental-health': return <Heart className="h-4 w-4" />;
      case 'mentor': return <GraduationCap className="h-4 w-4" />;
      default: return null;
    }
  };
  
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return {
    getTabIcon,
    getInitials
  };
};

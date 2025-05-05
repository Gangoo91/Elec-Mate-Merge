
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Users, Heart, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import ConversationsList from '@/components/messenger/ConversationsList';
import ConversationView from '@/components/messenger/ConversationView';
import EmptyState from '@/components/messenger/EmptyState';
import { useMessenger } from '@/components/messenger/useMessenger';
import { useIsMobile } from '@/hooks/use-mobile';

const MessengerPage = () => {
  const location = useLocation();
  const initialConversationId = location.state?.conversationId;
  
  const {
    activeTab,
    activeConversation,
    messages,
    searchQuery,
    filteredConversations,
    currentUserId,
    handleTabChange,
    setSearchQuery,
    handleSelectConversation,
    handleSendMessage,
    getInitials,
  } = useMessenger();
  
  const isMobile = useIsMobile();
  const [showConversationOnMobile, setShowConversationOnMobile] = useState(false);
  
  // Effect to handle initial conversation from navigation
  useEffect(() => {
    if (initialConversationId) {
      const conversation = filteredConversations.find(c => c.id === initialConversationId);
      if (conversation) {
        handleSelectConversation(conversation);
        if (isMobile) {
          setShowConversationOnMobile(true);
        }
      }
    }
  }, [initialConversationId, filteredConversations]);
  
  const handleConversationSelect = (conversation) => {
    handleSelectConversation(conversation);
    if (isMobile) {
      setShowConversationOnMobile(true);
    }
  };
  
  const handleBackToList = () => {
    setShowConversationOnMobile(false);
  };
  
  return (
    <div className="animate-fade-in h-[calc(100vh-64px)]">
      <div className="grid h-full">
        {/* Mobile view with conditional rendering */}
        {isMobile ? (
          <Card className="border-none bg-elec-gray overflow-hidden flex flex-col shadow-md h-full rounded-none">
            {showConversationOnMobile && activeConversation ? (
              <div className="flex flex-col h-full">
                <div className="p-3 border-b border-elec-yellow/10 bg-elec-gray flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleBackToList}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <span className="font-medium">{activeConversation.participantName}</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ConversationView
                    conversation={activeConversation}
                    messages={messages}
                    currentUserId={currentUserId}
                    getInitials={getInitials}
                    onSendMessage={handleSendMessage}
                  />
                </div>
              </div>
            ) : (
              <ConversationsList 
                conversations={filteredConversations}
                activeConversationId={activeConversation?.id}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectConversation={handleConversationSelect}
                getInitials={getInitials}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            )}
          </Card>
        ) : (
          // Desktop view with side-by-side layout
          <div className="grid md:grid-cols-[350px_1fr] gap-3 h-full">
            {/* Left panel - Conversations List */}
            <Card className="border-none bg-elec-gray overflow-hidden flex flex-col shadow-md h-full">
              <ConversationsList 
                conversations={filteredConversations}
                activeConversationId={activeConversation?.id}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectConversation={handleConversationSelect}
                getInitials={getInitials}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </Card>
            
            {/* Right panel - Messages */}
            <Card className="border-none bg-elec-gray overflow-hidden flex flex-col shadow-md h-full">
              {activeConversation ? (
                <ConversationView
                  conversation={activeConversation}
                  messages={messages}
                  currentUserId={currentUserId}
                  getInitials={getInitials}
                  onSendMessage={handleSendMessage}
                />
              ) : (
                <EmptyState
                  activeTab={activeTab}
                  getTabIcon={(tab) => {
                    switch (tab) {
                      case 'private': return <User className="h-6 w-6" />;
                      case 'team': return <Users className="h-6 w-6" />;
                      case 'mental-health': return <Heart className="h-6 w-6" />;
                      case 'mentor': return <GraduationCap className="h-6 w-6" />;
                      default: return null;
                    }
                  }}
                />
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerPage;

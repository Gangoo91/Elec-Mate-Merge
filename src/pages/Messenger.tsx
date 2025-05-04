
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Heart, GraduationCap, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ConversationsList from '@/components/messenger/ConversationsList';
import ConversationView from '@/components/messenger/ConversationView';
import EmptyState from '@/components/messenger/EmptyState';
import { useMessenger } from '@/components/messenger/useMessenger';
import { useIsMobile } from '@/hooks/use-mobile';

const MessengerPage = () => {
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
    getTabIcon,
    getInitials,
  } = useMessenger();
  
  const isMobile = useIsMobile();
  const [showConversationOnMobile, setShowConversationOnMobile] = useState(false);
  
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
    <div className="container max-w-7xl mx-auto py-4 md:py-6 space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Chat with team members, mentors and support advisors.
        </p>
      </div>
      
      <div className="grid h-[calc(100vh-200px)] md:h-[75vh]">
        {/* Mobile view with conditional rendering */}
        {isMobile ? (
          <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden flex flex-col shadow-md">
            {showConversationOnMobile && activeConversation ? (
              <div className="flex flex-col h-full">
                <div className="p-3 border-b border-elec-yellow/20 bg-elec-gray-light/10 flex items-center">
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
              <>
                <div className="p-3 border-b border-elec-yellow/20 bg-elec-gray-light/10">
                  <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-4 w-full bg-elec-gray-light/20">
                      <TabsTrigger value="private" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Private</span>
                      </TabsTrigger>
                      <TabsTrigger value="team" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">Team</span>
                      </TabsTrigger>
                      <TabsTrigger value="mental-health" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Support</span>
                      </TabsTrigger>
                      <TabsTrigger value="mentor" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                        <GraduationCap className="h-4 w-4" />
                        <span className="hidden sm:inline">Mentor</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <ScrollArea className="flex-1">
                  <ConversationsList 
                    conversations={filteredConversations}
                    activeConversationId={activeConversation?.id}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelectConversation={handleConversationSelect}
                    getInitials={getInitials}
                  />
                </ScrollArea>
              </>
            )}
          </Card>
        ) : (
          // Desktop view with side-by-side layout
          <div className="grid md:grid-cols-[350px_1fr] gap-6">
            {/* Left panel - Conversations List */}
            <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden flex flex-col shadow-md">
              <div className="p-4 border-b border-elec-yellow/20 bg-elec-gray-light/10">
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full bg-elec-gray-light/20">
                    <TabsTrigger value="private" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Private</span>
                    </TabsTrigger>
                    <TabsTrigger value="team" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Team</span>
                    </TabsTrigger>
                    <TabsTrigger value="mental-health" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                      <Heart className="h-4 w-4" />
                      <span className="hidden sm:inline">Support</span>
                    </TabsTrigger>
                    <TabsTrigger value="mentor" className="flex gap-1 items-center data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden sm:inline">Mentor</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <ScrollArea className="flex-1">
                <ConversationsList 
                  conversations={filteredConversations}
                  activeConversationId={activeConversation?.id}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectConversation={handleConversationSelect}
                  getInitials={getInitials}
                />
              </ScrollArea>
            </Card>
            
            {/* Right panel - Messages */}
            <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden flex flex-col shadow-md relative">
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
                  getTabIcon={getTabIcon}
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

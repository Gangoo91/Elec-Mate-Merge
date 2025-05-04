
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Heart, GraduationCap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationsList from '@/components/messenger/ConversationsList';
import ConversationView from '@/components/messenger/ConversationView';
import EmptyState from '@/components/messenger/EmptyState';
import { useMessenger } from '@/components/messenger/useMessenger';

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
  
  return (
    <div className="container max-w-7xl mx-auto py-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Chat with team members, mentors and support advisors.
        </p>
      </div>
      
      <div className="grid md:grid-cols-[350px_1fr] gap-6 h-[75vh]">
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
              onSelectConversation={handleSelectConversation}
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
    </div>
  );
};

export default MessengerPage;

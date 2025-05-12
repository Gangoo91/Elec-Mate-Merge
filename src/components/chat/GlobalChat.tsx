
import React, { useState } from "react";
import { useGlobalChat } from "@/hooks/chat/useGlobalChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";
import ChatFilters from "@/components/chat/ChatFilters";
import TopContributors from "@/components/chat/TopContributors";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const GlobalChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    profile,
    activeCategory,
    setActiveCategory
  } = useGlobalChat();

  const handleOpenComposer = () => setIsComposerOpen(true);
  const handleCloseComposer = () => setIsComposerOpen(false);

  const handleSubmitPost = (content: string) => {
    handlePostMessage(content, activeCategory === 'All' ? 'General' : activeCategory);
    setIsComposerOpen(false);
  };
  
  const chatCategories = ['All', 'General', 'Questions', 'Tips', 'News'];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-elec-yellow/20">
        <ChatHeader 
          title="Global Chat" 
          onNewPost={handleOpenComposer}
        />
      </div>
      
      <div className="px-4 py-3">
        <Tabs 
          defaultValue={activeCategory} 
          onValueChange={(value) => setActiveCategory(value as any)}
          className="w-full"
        >
          <TabsList className="bg-elec-gray-light/10 border border-elec-yellow/10 p-1 w-full flex overflow-x-auto no-scrollbar">
            {chatCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark data-[state=active]:shadow-sm px-3 py-1.5 text-sm font-medium transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="px-0 py-2">
            <ChatSearchBar />
          </div>
        </Tabs>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-24">
          <ChatMessageFeed
            messages={messages}
            isLoading={isLoading}
            currentUserId={profile?.id}
            onUpvote={handleUpvote}
            onPostComment={handlePostComment}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
            onNewPost={handleOpenComposer}
          />
        </div>
        
        {!isMobile && (
          <div className="hidden lg:block w-80 p-4 border-l border-elec-yellow/10">
            <Card className="bg-elec-gray-light/5 border-elec-yellow/20 p-4 rounded-lg">
              <TopContributors />
            </Card>
          </div>
        )}
      </div>
      
      <ChatComposer 
        onSubmit={handleSubmitPost} 
        onCancel={handleCloseComposer}
        isVisible={isComposerOpen} 
      />
    </div>
  );
};

export default GlobalChat;

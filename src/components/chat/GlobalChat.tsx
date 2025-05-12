
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

const GlobalChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const isMobile = useIsMobile();
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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-elec-yellow/20">
        <ChatHeader 
          title="Global Chat" 
          onNewPost={handleOpenComposer}
        />
        
        <div className="px-4 pb-2">
          <ChatFilters 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
        
        <div className="px-4 pb-4">
          <ChatSearchBar />
        </div>
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


import React, { useState } from "react";
import { useGlobalChat } from "@/hooks/chat/useGlobalChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";
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
    <div className="flex flex-col h-full bg-black">
      <div className="sticky top-0 z-10 bg-black border-b border-yellow-500/20">
        <ChatHeader 
          title="Global Chat" 
          onNewPost={handleOpenComposer}
        />
      </div>
      
      <div className="p-4 pb-0">
        <Tabs 
          defaultValue={activeCategory} 
          onValueChange={(value) => setActiveCategory(value as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 gap-2 bg-black">
            {chatCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={`py-2 ${category === 'All' ? 'bg-yellow-500 text-black' : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-yellow-500/20'} data-[state=active]:bg-yellow-500 data-[state=active]:text-black rounded-md`}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mt-4 mb-2">
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
          <div className="hidden lg:block w-80 p-4 border-l border-yellow-500/20">
            <Card className="bg-zinc-900 border-yellow-500/20 p-4 rounded-lg">
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

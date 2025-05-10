
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalChat, ChatCategory } from "@/hooks/chat/useGlobalChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";
import ChatFilters from "@/components/chat/ChatFilters";
import TopContributors from "@/components/chat/TopContributors";

const GlobalChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const { profile } = useAuth();
  const {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    activeCategory,
    setActiveCategory
  } = useGlobalChat();

  const handleOpenComposer = () => setIsComposerOpen(true);
  const handleCloseComposer = () => setIsComposerOpen(false);

  const handleSubmitPost = (content: string) => {
    handlePostMessage(content);
    setIsComposerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-y-auto">
      <div className="bg-black">
        <ChatHeader 
          title="Global Chat" 
          onNewPost={handleOpenComposer}
        />
        
        <div className="flex flex-col md:flex-row gap-4 px-4 py-2">
          <div className="flex-1">
            <ChatSearchBar />
          </div>
          <div>
            <ChatFilters 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-[1fr_300px] gap-4 p-4">
        <div className="flex-1">
          <ChatMessageFeed
            messages={sortBy === "latest" ? messages : [...messages].sort((a, b) => b.upvotes - a.upvotes)}
            isLoading={isLoading}
            currentUserId={profile?.id}
            onUpvote={handleUpvote}
            onPostComment={handlePostComment}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
        <div className="hidden md:block">
          <TopContributors />
        </div>
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

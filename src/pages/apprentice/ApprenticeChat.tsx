
import { useState } from "react";
import { useApprenticeChat } from "@/hooks/chat/useApprenticeChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, Award, Clock, Bookmark } from "lucide-react";

const ApprenticeChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    profile
  } = useApprenticeChat();

  const handleOpenComposer = () => setIsComposerOpen(true);
  const handleCloseComposer = () => setIsComposerOpen(false);

  const handleSubmitPost = (content: string) => {
    handlePostMessage(content);
    setIsComposerOpen(false);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter the messages
    console.log("Searching for:", query);
  };
  
  const filteredMessages = searchQuery 
    ? messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
        msg.authorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-elec-gray to-black overflow-y-auto animate-fade-in">
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-elec-yellow/20">
        <ChatHeader 
          title="Apprentice Community" 
          onNewPost={handleOpenComposer}
        />
        
        <div className="max-w-3xl mx-auto w-full px-4 py-2">
          <Tabs defaultValue="trending" className="w-full mb-2">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="trending" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="latest" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="hidden sm:inline">Latest</span>
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span className="hidden sm:inline">Popular</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1">
                <Bookmark className="h-3 w-3" />
                <span className="hidden sm:inline">Saved</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ChatSearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <ChatMessageFeed
            messages={filteredMessages}
            isLoading={isLoading}
            currentUserId={profile?.id}
            onUpvote={handleUpvote}
            onPostComment={handlePostComment}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
          />
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={handleOpenComposer}
          className="bg-elec-yellow text-elec-dark rounded-full p-4 shadow-lg hover:bg-elec-yellow/90 transition-colors"
        >
          <Zap className="h-6 w-6" />
        </button>
      </div>
      
      <ChatComposer 
        onSubmit={handleSubmitPost} 
        onCancel={handleCloseComposer}
        isVisible={isComposerOpen} 
      />
    </div>
  );
};

export default ApprenticeChat;


import { useState } from "react";
import { useApprenticeChat } from "@/hooks/chat/useApprenticeChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightning, TrendingUp, Zap, Award, Clock } from "lucide-react";

const ApprenticeChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-elec-gray to-black overflow-y-auto animate-fade-in">
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-elec-yellow/20">
        <ChatHeader 
          title="Apprentice Community" 
          onNewPost={handleOpenComposer}
        />
        
        <div className="max-w-3xl mx-auto w-full px-4 py-2">
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid grid-cols-4 mb-2">
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
              <TabsTrigger value="yours" className="flex items-center gap-1">
                <Lightning className="h-3 w-3" />
                <span className="hidden sm:inline">Your Posts</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ChatSearchBar />
        </div>
      </div>
      
      <div className="flex-1">
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
      
      <ChatComposer 
        onSubmit={handleSubmitPost} 
        onCancel={handleCloseComposer}
        isVisible={isComposerOpen} 
      />
    </div>
  );
};

export default ApprenticeChat;

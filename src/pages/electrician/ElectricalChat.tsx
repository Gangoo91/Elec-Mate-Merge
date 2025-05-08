
import { useState } from "react";
import { useElectricalChat } from "@/hooks/chat/useElectricalChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";
import ChatFilters from "@/components/chat/ChatFilters";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Zap, TrendingUp, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ElectricalChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("popular");
  
  const {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    profile
  } = useElectricalChat();

  const handleOpenComposer = () => setIsComposerOpen(true);
  const handleCloseComposer = () => setIsComposerOpen(false);

  const handleSubmitPost = (content: string) => {
    handlePostMessage(content);
    setIsComposerOpen(false);
  };

  const categories = ["All", "Wiring", "Safety", "Regulations", "Tools", "Tips"];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-elec-gray to-black overflow-y-auto animate-fade-in">
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-elec-yellow/20">
        <ChatHeader 
          title="Toolbox Talks" 
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
                <Zap className="h-3 w-3" />
                <span className="hidden sm:inline">Your Posts</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="overflow-x-auto py-2">
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${activeCategory === category ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" : "bg-transparent text-white hover:bg-elec-gray-light/30"}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </Tabs>
          <ChatSearchBar />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <ChatFilters 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <div className="mt-4">
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

export default ElectricalChat;

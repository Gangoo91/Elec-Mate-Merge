
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft, Star, ThumbsUp, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatComposer from "@/components/chat/ChatComposer";
import TopContributors from "@/components/chat/TopContributors";
import ChatFilters from "@/components/chat/ChatFilters";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Types for our chat data
interface ChatMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  comments: ChatComment[];
  hasUserUpvoted?: boolean;
  category: string;
}

interface ChatComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  parentId: string;
}

// Mock data for now - in a real implementation, this would come from Supabase
const mockCategories = [
  "All Topics",
  "Technical Questions",
  "Industry News",
  "Tools & Equipment",
  "Apprentice Support",
  "Business Development"
];

const ElectricalChat = () => {
  const { profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // For demonstration purposes, we'll use mock data
  // In production, this would fetch from Supabase
  useEffect(() => {
    // Simulating API load
    setIsLoading(true);
    
    setTimeout(() => {
      const mockMessages: ChatMessage[] = [
        {
          id: "1",
          authorId: "user1",
          authorName: "John Smith",
          authorAvatar: "https://i.pravatar.cc/150?img=1",
          content: "Has anyone used the new Milwaukee cordless multimeter? Wondering if it's worth the investment.",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          upvotes: 12,
          category: "Tools & Equipment",
          comments: [
            {
              id: "c1",
              authorId: "user2",
              authorName: "Sarah Williams",
              authorAvatar: "https://i.pravatar.cc/150?img=2",
              content: "I've been using it for a month. Great battery life and very accurate readings!",
              createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
              parentId: "1"
            }
          ]
        },
        {
          id: "2",
          authorId: "user3",
          authorName: "Mike Johnson",
          authorAvatar: "https://i.pravatar.cc/150?img=3",
          content: "New regulations coming into effect next month regarding residential EV charging installations. Anyone attended the webinar about it?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          upvotes: 8,
          category: "Industry News",
          comments: []
        },
        {
          id: "3",
          authorId: "user4",
          authorName: "Emma Davis",
          authorAvatar: "https://i.pravatar.cc/150?img=4",
          content: "First year apprentice here. Any tips for preparing for the upcoming practical assessment?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
          upvotes: 15,
          category: "Apprentice Support",
          comments: [
            {
              id: "c2",
              authorId: "user5",
              authorName: "Robert Brown",
              authorAvatar: "https://i.pravatar.cc/150?img=5",
              content: "Focus on cable sizing calculations and make sure you understand the testing procedures thoroughly.",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
              parentId: "3"
            },
            {
              id: "c3",
              authorId: "user6",
              authorName: "Lisa Jones",
              authorAvatar: "https://i.pravatar.cc/150?img=6",
              content: "Practice your conduit bending skills! That was a key part when I did my assessment.",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
              parentId: "3"
            }
          ]
        }
      ];
      
      setMessages(mockMessages);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle upvoting a message
  const handleUpvote = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              upvotes: msg.hasUserUpvoted ? msg.upvotes - 1 : msg.upvotes + 1,
              hasUserUpvoted: !msg.hasUserUpvoted
            } 
          : msg
      )
    );
    
    // In a real implementation, you'd update this in Supabase
    toast({
      title: "Vote recorded",
      description: "Your vote has been recorded successfully.",
    });
  };
  
  // Handle posting a new message
  const handlePostMessage = (content: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to participate in the chat.",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `new-${Date.now()}`,
      authorId: profile.id,
      authorName: profile.full_name || "Anonymous",
      authorAvatar: profile.avatar_url,
      content,
      createdAt: new Date(),
      upvotes: 0,
      comments: [],
      category: activeCategory === "All Topics" ? "General Discussion" : activeCategory
    };
    
    setMessages(prev => [newMessage, ...prev]);
    
    // In a real implementation, you'd save this to Supabase
    toast({
      title: "Message posted",
      description: "Your message has been posted to the chat.",
    });
  };
  
  // Handle posting a comment
  const handlePostComment = (messageId: string, content: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment.",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) return;
    
    const newComment: ChatComment = {
      id: `comment-${Date.now()}`,
      authorId: profile.id,
      authorName: profile.full_name || "Anonymous",
      authorAvatar: profile.avatar_url,
      content,
      createdAt: new Date(),
      parentId: messageId
    };
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, comments: [...msg.comments, newComment] } 
          : msg
      )
    );
    
    // In a real implementation, you'd save this to Supabase
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully.",
    });
  };
  
  // Filter messages based on active category and sort option
  const filteredMessages = messages
    .filter(msg => activeCategory === "All Topics" || msg.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "latest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return b.upvotes - a.upvotes;
      }
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-elec-yellow" />
            Electrical Chat
          </h1>
          <p className="text-muted-foreground">
            Connect with other electricians and share knowledge
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        {/* Main chat area */}
        <div className="border p-6 rounded-lg bg-elec-gray border-elec-yellow/20 space-y-6">
          {/* Post composer */}
          <ChatComposer onSubmit={handlePostMessage} />
          
          {/* Category filters */}
          <ChatFilters 
            categories={mockCategories}
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          {/* Chat messages */}
          <ScrollArea className="h-[calc(100vh-400px)]">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-elec-gray-light/10 animate-pulse p-6 rounded-lg">
                    <div className="h-4 bg-elec-gray-light/20 rounded w-1/4 mb-4"></div>
                    <div className="h-3 bg-elec-gray-light/20 rounded w-full mb-2"></div>
                    <div className="h-3 bg-elec-gray-light/20 rounded w-full mb-2"></div>
                    <div className="h-3 bg-elec-gray-light/20 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredMessages.length > 0 ? (
              <div className="space-y-6">
                {filteredMessages.map(message => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    currentUserId={profile?.id}
                    onUpvote={handleUpvote}
                    onPostComment={handlePostComment}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                <p className="text-muted-foreground">
                  Be the first to start a discussion in this category!
                </p>
              </div>
            )}
          </ScrollArea>
          
          <div className="text-center text-xs text-muted-foreground mt-4">
            <p>Most liked comment and most active participant each win a £50 voucher!</p>
          </div>
        </div>
        
        {/* Sidebar with top contributors */}
        <TopContributors />
      </div>
    </div>
  );
};

export default ElectricalChat;

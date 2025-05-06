
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp, User, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatComposer from "@/components/chat/ChatComposer";
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";

const ElectricalChat = () => {
  const { profile } = useAuth();
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    "All Topics",
    "Technical Questions",
    "Industry News",
    "Tools & Equipment",
    "Apprentice Support",
    "Business Development"
  ];
  
  // Scroll to bottom when new message is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Simulating API load
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockMessages: ChatMessageType[] = [
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
    
    const newMessage: ChatMessageType = {
      id: `new-${Date.now()}`,
      authorId: profile.id,
      authorName: profile.full_name || "Anonymous",
      authorAvatar: profile.avatar_url,
      content,
      createdAt: new Date(),
      upvotes: 0,
      comments: [],
      category: selectedCategory === "All Topics" ? "General Discussion" : selectedCategory
    };
    
    setMessages(prev => [newMessage, ...prev]);
    
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
    
    const newComment = {
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
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully.",
    });
  };
  
  // Filter messages based on active category and sort option
  const filteredMessages = messages
    .filter(msg => selectedCategory === "All Topics" || msg.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "latest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return b.upvotes - a.upvotes;
      }
    });

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] animate-fade-in bg-elec-dark">
      {/* Fixed header */}
      <div className="sticky top-0 z-30 bg-elec-dark border-b border-elec-yellow/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-6 w-6 text-elec-yellow mr-2" />
            <h1 className="text-xl font-bold text-white">Electrical Chat</h1>
          </div>
          <Link to="/electrician/toolbox-talk">
            <Button variant="ghost" size="sm" className="text-elec-yellow">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Category selector - scrollable horizontally */}
      <div className="overflow-x-auto sticky top-[65px] z-20 bg-elec-gray-dark p-2 border-b border-elec-yellow/10">
        <div className="flex gap-2 py-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category 
                ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                : "border-elec-yellow/30 hover:bg-elec-yellow/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-4">
        {/* Composer */}
        <div className="mb-6">
          <ChatComposer onSubmit={handlePostMessage} />
        </div>
        
        {/* Sort toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-elec-yellow font-medium">
            {filteredMessages.length} posts
          </div>
          <div className="flex gap-2">
            <Button 
              variant={sortBy === "latest" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortBy("latest")}
              className={sortBy === "latest" ? "bg-elec-yellow text-elec-dark" : ""}
            >
              Latest
            </Button>
            <Button 
              variant={sortBy === "popular" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortBy("popular")}
              className={sortBy === "popular" ? "bg-elec-yellow text-elec-dark" : ""}
            >
              Most Liked
            </Button>
          </div>
        </div>
        
        {/* Message feed */}
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
          <div className="space-y-6 pb-20">
            {filteredMessages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUserId={profile?.id}
                onUpvote={handleUpvote}
                onPostComment={handlePostComment}
              />
            ))}
            <div ref={scrollRef} />
          </div>
        ) : (
          <div className="text-center py-10 bg-elec-gray-light/5 rounded-lg border border-elec-yellow/10">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">No posts yet</h3>
            <p className="text-muted-foreground">
              Be the first to start a discussion in this category!
            </p>
          </div>
        )}
      </div>
      
      {/* Contest reminder */}
      <div className="p-4 bg-elec-yellow/10 border-t border-elec-yellow/20 text-center text-sm sticky bottom-0">
        <p className="text-elec-yellow">Most liked comment and most active participant each win a £50 voucher!</p>
      </div>
    </div>
  );
};

export default ElectricalChat;

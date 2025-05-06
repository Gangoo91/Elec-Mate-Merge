
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";
import { Search } from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatComposer from "@/components/chat/ChatComposer";

const ElectricalChat = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating API load for message data
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockMessages: ChatMessageType[] = [
        {
          id: "1",
          authorId: "user1",
          authorName: "Andrew Moore",
          authorAvatar: "https://i.pravatar.cc/150?img=1",
          content: "Welcome to Elec-Mate.",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          upvotes: 0,
          category: "General",
          comments: []
        },
        {
          id: "2",
          authorId: "user3",
          authorName: "Mike Johnson",
          authorAvatar: "https://i.pravatar.cc/150?img=3",
          content: "New regulations coming into effect next month regarding residential EV charging installations. Anyone attended the webinar about it?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          upvotes: 8,
          category: "General",
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
          category: "General",
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
      category: "General"
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

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-elec-yellow mb-2">Electricians Chat Room</h1>
        <p className="text-xl text-elec-yellow/80 max-w-2xl mx-auto">
          Connect with fellow electricians, share experiences, and discuss industry topics.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto w-full px-4 mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-[#2c2c2c] border border-elec-yellow/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-elec-yellow"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Search className="h-6 w-6 text-elec-yellow" />
          </button>
        </div>
      </div>
      
      {/* Chat composer - Simplified, we won't show this at the top */}
      
      {/* Message feed */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-20">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#2c2c2c] animate-pulse p-6 rounded-lg border border-elec-yellow/20">
                <div className="h-4 bg-elec-gray-light/20 rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-elec-gray-light/20 rounded w-full mb-2"></div>
                <div className="h-3 bg-elec-gray-light/20 rounded w-full mb-2"></div>
                <div className="h-3 bg-elec-gray-light/20 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map(message => (
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
          <div className="text-center py-10 bg-[#2c2c2c] rounded-lg border border-elec-yellow/20">
            <h3 className="text-lg font-medium mb-2 text-white">No messages yet</h3>
            <p className="text-gray-400">
              Be the first to start a discussion!
            </p>
          </div>
        )}
      </div>
      
      {/* Compose message - Fixed at bottom */}
      <div className="sticky bottom-0 w-full bg-black py-4">
        <div className="max-w-3xl mx-auto px-4">
          <ChatComposer onSubmit={handlePostMessage} />
        </div>
      </div>
    </div>
  );
};

export default ElectricalChat;

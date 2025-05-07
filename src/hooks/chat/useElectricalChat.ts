
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";

export const useElectricalChat = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load messages - simulating API call
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

  // Handle editing a message
  const handleEditMessage = (messageId: string, content: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to edit messages.",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) return;
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content, updatedAt: new Date() } 
          : msg
      )
    );
    
    toast({
      title: "Message updated",
      description: "Your message has been updated successfully.",
    });
  };
  
  // Handle deleting a message
  const handleDeleteMessage = (messageId: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to delete messages.",
        variant: "destructive"
      });
      return;
    }
    
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    
    toast({
      title: "Message deleted",
      description: "Your message has been deleted successfully.",
    });
  };

  return {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    profile
  };
};

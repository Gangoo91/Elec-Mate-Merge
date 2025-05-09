
import { useState } from "react";
import { ChatMessage } from "@/components/messenger/types";
import { toast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/user";

export const useChatOperations = (
  messages: ChatMessage[],
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  profile: UserProfile | null
) => {
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
    
    const newMessage: ChatMessage = {
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
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage
  };
};

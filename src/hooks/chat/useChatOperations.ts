import { useState } from "react";
import { ChatMessage } from "@/components/messenger/types";
import { toast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/user";
import { addMockMessage, updateMockMessage, deleteMockMessage, addMockComment } from "@/services/chat/mockChatService";
import { v4 as uuidv4 } from "uuid";

// Extended ChatMessage type to include updatedAt
export type ExtendedChatMessage = ChatMessage & {
  updatedAt?: Date;
};

export const useChatOperations = (
  messages: ChatMessage[],
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  profile: UserProfile | null
) => {
  // Handle upvoting a message
  const handleUpvote = (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;

    const newUpvoteStatus = !message.hasUserUpvoted;
    const newUpvotes = newUpvoteStatus ? message.upvotes + 1 : message.upvotes - 1;
    
    updateMockMessage(messageId, {
      upvotes: newUpvotes,
      hasUserUpvoted: newUpvoteStatus
    });
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              upvotes: newUpvotes,
              hasUserUpvoted: newUpvoteStatus
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
      id: uuidv4(),
      authorId: profile.id,
      authorName: profile.full_name || "Anonymous",
      authorAvatar: profile.avatar_url,
      content,
      createdAt: new Date(),
      upvotes: 0,
      hasUserUpvoted: false,
      comments: [],
      category: "General"
    };
    
    // Add to the mock service
    addMockMessage(newMessage);
    
    // Update local state
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
      id: uuidv4(),
      authorId: profile.id,
      authorName: profile.full_name || "Anonymous",
      authorAvatar: profile.avatar_url,
      content,
      createdAt: new Date(),
      parentId: messageId
    };
    
    // Add to the mock service
    addMockComment(messageId, newComment);
    
    // Update local state
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
    
    // Update in the mock service
    updateMockMessage(messageId, { 
      content,
      updatedAt: new Date() 
    } as Partial<ExtendedChatMessage>);
    
    // Update local state
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content, updatedAt: new Date() } as ExtendedChatMessage
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
    
    // Delete from the mock service
    deleteMockMessage(messageId);
    
    // Update local state
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

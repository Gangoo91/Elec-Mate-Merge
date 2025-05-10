
import { useState } from "react";
import { ChatMessage } from "@/components/messenger/types";
import { toast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";

export const useChatOperations = (
  messages: ChatMessage[],
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  profile: UserProfile | null
) => {
  // Handle upvoting a message
  const handleUpvote = async (messageId: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to upvote messages.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the user has already upvoted this message
    const message = messages.find(msg => msg.id === messageId);
    const hasUpvoted = message?.hasUserUpvoted;
    
    if (hasUpvoted) {
      // If already upvoted, remove the upvote
      const { error } = await supabase
        .from('global_chat_upvotes')
        .delete()
        .match({ message_id: messageId, user_id: profile.id });
        
      if (error) {
        console.error('Error removing upvote:', error);
        toast({
          title: "Error",
          description: "Could not remove your upvote. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      // Update local state immediately for better UX
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                upvotes: msg.upvotes - 1,
                hasUserUpvoted: false
              } 
            : msg
        )
      );
    } else {
      // If not upvoted yet, add an upvote
      const { error } = await supabase
        .from('global_chat_upvotes')
        .insert({ message_id: messageId, user_id: profile.id });
        
      if (error) {
        console.error('Error adding upvote:', error);
        toast({
          title: "Error",
          description: "Could not upvote this message. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      // Update the message upvote count
      await supabase
        .from('global_chat_messages')
        .update({ upvotes: (message?.upvotes || 0) + 1 })
        .eq('id', messageId);
      
      // Update local state immediately for better UX
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                upvotes: msg.upvotes + 1,
                hasUserUpvoted: true
              } 
            : msg
        )
      );
    }
  };
  
  // Handle posting a new message
  const handlePostMessage = async (content: string, category: string = "General") => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to participate in the chat.",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) return;
    
    const newMessage = {
      author_id: profile.id,
      author_name: profile.full_name || "Anonymous",
      author_avatar: profile.avatar_url,
      content,
      category
    };
    
    const { data, error } = await supabase
      .from('global_chat_messages')
      .insert(newMessage)
      .select()
      .single();
      
    if (error) {
      console.error('Error posting message:', error);
      toast({
        title: "Error",
        description: "Could not post your message. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message posted",
      description: "Your message has been posted to the chat.",
    });
    
    // The message will be added via the real-time subscription
  };
  
  // Handle posting a comment
  const handlePostComment = async (messageId: string, content: string) => {
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
      parent_id: messageId,
      author_id: profile.id,
      author_name: profile.full_name || "Anonymous",
      author_avatar: profile.avatar_url,
      content
    };
    
    const { error } = await supabase
      .from('global_chat_comments')
      .insert(newComment);
      
    if (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Could not post your comment. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully.",
    });
    
    // The comment will be added via the real-time subscription
  };

  // Handle editing a message
  const handleEditMessage = async (messageId: string, content: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to edit messages.",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) return;
    
    // Check if this is the user's own message
    const message = messages.find(msg => msg.id === messageId);
    if (message?.authorId !== profile.id) {
      toast({
        title: "Not authorized",
        description: "You can only edit your own messages.",
        variant: "destructive"
      });
      return;
    }
    
    const { error } = await supabase
      .from('global_chat_messages')
      .update({ 
        content, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', messageId);
      
    if (error) {
      console.error('Error editing message:', error);
      toast({
        title: "Error",
        description: "Could not edit your message. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // Update local state immediately for better UX
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
  const handleDeleteMessage = async (messageId: string) => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to delete messages.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is the user's own message
    const message = messages.find(msg => msg.id === messageId);
    if (message?.authorId !== profile.id) {
      toast({
        title: "Not authorized",
        description: "You can only delete your own messages.",
        variant: "destructive"
      });
      return;
    }
    
    const { error } = await supabase
      .from('global_chat_messages')
      .delete()
      .eq('id', messageId);
      
    if (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Could not delete your message. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    // Update local state immediately for better UX
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

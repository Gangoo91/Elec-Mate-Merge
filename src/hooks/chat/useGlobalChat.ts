
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChatMessages } from "./useChatMessages";
import { useChatOperations } from "./useChatOperations";

export type ChatCategory = 'All' | 'General' | 'Questions' | 'Tips' | 'News';

export const useGlobalChat = () => {
  const { profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState<ChatCategory>('All');
  const { messages: allMessages, setMessages, isLoading } = useChatMessages('general');
  
  // Filter messages based on active category
  const messages = activeCategory === 'All' 
    ? allMessages 
    : allMessages.filter(msg => msg.category === activeCategory);
  
  const {
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage
  } = useChatOperations(allMessages, setMessages, profile);

  return {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    profile,
    activeCategory,
    setActiveCategory
  };
};

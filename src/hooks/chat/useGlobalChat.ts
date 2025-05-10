
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
    handlePostMessage: baseHandlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage
  } = useChatOperations(allMessages, setMessages, profile);
  
  // Wrap the handlePostMessage function to include the category
  const handlePostMessage = (content: string, category: ChatCategory = 'General') => {
    // If category is 'All', default to 'General'
    const actualCategory = category === 'All' ? 'General' : category;
    baseHandlePostMessage(content, actualCategory);
  };

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

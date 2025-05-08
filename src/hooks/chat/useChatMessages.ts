
import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/messenger/types";
import { getMockMessages, getApprenticeMockMessages } from "@/services/chat/mockChatService";

type ChatContext = 'general' | 'apprentice';

export const useChatMessages = (context: ChatContext = 'general') => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial messages
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const loadMessages = async () => {
      let mockMessages;
      
      if (context === 'apprentice') {
        mockMessages = await getApprenticeMockMessages();
      } else {
        mockMessages = await getMockMessages();
      }
      
      setMessages(mockMessages);
      setIsLoading(false);
    };
    
    loadMessages();
  }, [context]);

  return {
    messages,
    setMessages,
    isLoading
  };
};

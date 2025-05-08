
import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/messenger/types";
import { getMockMessages } from "@/services/chat/mockChatService";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial messages
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const loadMessages = async () => {
      const mockMessages = await getMockMessages();
      setMessages(mockMessages);
      setIsLoading(false);
    };
    
    loadMessages();
  }, []);

  return {
    messages,
    setMessages,
    isLoading
  };
};


import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/messenger/types";
import { getMockMessages } from "@/services/chat/mockChatService";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial messages
  useEffect(() => {
    setIsLoading(true);
    
    const loadMessages = async () => {
      const mockMessages = await getMockMessages();
      setMessages(mockMessages);
      setIsLoading(false);
    };
    
    loadMessages();
    
    // Set up a polling mechanism to check for new messages every 10 seconds
    // This simulates real-time updates without websockets
    const interval = setInterval(async () => {
      const updatedMessages = await getMockMessages();
      if (JSON.stringify(updatedMessages) !== JSON.stringify(messages)) {
        setMessages(updatedMessages);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    messages,
    setMessages,
    isLoading
  };
};

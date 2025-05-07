
import { useAuth } from "@/contexts/AuthContext";
import { useChatMessages } from "./useChatMessages";
import { useChatOperations } from "./useChatOperations";

export const useElectricalChat = () => {
  const { profile } = useAuth();
  const { messages, setMessages, isLoading } = useChatMessages();
  
  const {
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage
  } = useChatOperations(messages, setMessages, profile);

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

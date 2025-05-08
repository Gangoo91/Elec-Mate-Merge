
import { useAuth } from "@/contexts/AuthContext";
import { useChatMessages } from "./useChatMessages";
import { useChatOperations } from "./useChatOperations";

export const useApprenticeChat = () => {
  const { profile } = useAuth();
  const { messages, setMessages, isLoading } = useChatMessages('apprentice');
  
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


import { ChatMessage as ChatMessageType } from "@/components/messenger/types";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatSkeleton from "@/components/chat/ChatSkeleton";
import ChatEmptyState from "@/components/chat/ChatEmptyState";
import TopContributors from "@/components/chat/TopContributors";
import { motion } from "framer-motion";

interface ChatMessageFeedProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  currentUserId?: string;
  onUpvote: (messageId: string) => void;
  onPostComment: (messageId: string, content: string) => void;
  onEditMessage?: (messageId: string, content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ChatMessageFeed = ({
  messages,
  isLoading,
  currentUserId,
  onUpvote,
  onPostComment,
  onEditMessage,
  onDeleteMessage
}: ChatMessageFeedProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      {/* Main feed */}
      <motion.div 
        className="md:col-span-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isLoading ? (
          <ChatSkeleton />
        ) : messages.length > 0 ? (
          <div>
            {messages.map(message => (
              <motion.div key={message.id} variants={item}>
                <ChatMessage
                  message={message}
                  currentUserId={currentUserId}
                  onUpvote={onUpvote}
                  onPostComment={onPostComment}
                  onEditMessage={onEditMessage}
                  onDeleteMessage={onDeleteMessage}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <ChatEmptyState />
        )}
      </motion.div>
      
      {/* Sidebar */}
      <div className="hidden md:block md:col-span-2">
        <div className="sticky top-28">
          <TopContributors />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageFeed;

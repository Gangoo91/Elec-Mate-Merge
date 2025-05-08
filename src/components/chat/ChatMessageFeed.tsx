
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatSkeleton from "@/components/chat/ChatSkeleton";
import ChatEmptyState from "@/components/chat/ChatEmptyState";
import TopContributors from "@/components/chat/TopContributors";

interface ChatMessageFeedProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  currentUserId?: string;
  onUpvote: (messageId: string) => void;
  onPostComment: (messageId: string, content: string) => void;
  onEditMessage?: (messageId: string, content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

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
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 px-4 pb-20 max-w-6xl mx-auto">
      {/* Main feed */}
      <div className="md:col-span-5">
        {isLoading ? (
          <ChatSkeleton />
        ) : messages.length > 0 ? (
          <div>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUserId={currentUserId}
                onUpvote={onUpvote}
                onPostComment={onPostComment}
                onEditMessage={onEditMessage}
                onDeleteMessage={onDeleteMessage}
              />
            ))}
          </div>
        ) : (
          <ChatEmptyState />
        )}
      </div>
      
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

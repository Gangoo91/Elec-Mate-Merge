
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatSkeleton from "@/components/chat/ChatSkeleton";
import ChatEmptyState from "@/components/chat/ChatEmptyState";

interface ChatMessageFeedProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  currentUserId?: string;
  onUpvote: (messageId: string) => void;
  onPostComment: (messageId: string, content: string) => void;
  onEditMessage?: (messageId: string, content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onNewPost?: () => void;
}

const ChatMessageFeed = ({
  messages,
  isLoading,
  currentUserId,
  onUpvote,
  onPostComment,
  onEditMessage,
  onDeleteMessage,
  onNewPost
}: ChatMessageFeedProps) => {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-20">
      {isLoading ? (
        <ChatSkeleton />
      ) : messages.length > 0 ? (
        <div className="space-y-4">
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
        <ChatEmptyState onNewPost={onNewPost} />
      )}
    </div>
  );
};

export default ChatMessageFeed;

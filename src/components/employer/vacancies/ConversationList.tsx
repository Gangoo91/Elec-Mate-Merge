import { ConversationListItem, ConversationListItemSkeleton } from './ConversationListItem';
import { Inbox } from 'lucide-react';
import type { Conversation } from '@/services/conversationService';
import { EmptyState } from '@/components/employer/editorial';

interface ConversationListProps {
  conversations: Conversation[];
  isLoading: boolean;
  onSelect: (conversation: Conversation) => void;
  onDelete?: (conversation: Conversation) => void;
  emptyMessage?: string;
}

export function ConversationList({
  conversations,
  isLoading,
  onSelect,
  onDelete,
  emptyMessage = 'No conversations yet',
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <ConversationListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return <EmptyState title="No Messages" description={emptyMessage} />;
  }

  return (
    <div className="space-y-3">
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
          onClick={() => onSelect(conversation)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

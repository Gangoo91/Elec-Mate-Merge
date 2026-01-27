import { Card, CardContent } from "@/components/ui/card";
import { ConversationListItem, ConversationListItemSkeleton } from "./ConversationListItem";
import { MessageSquare, Inbox } from "lucide-react";
import type { Conversation } from "@/services/conversationService";

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
  emptyMessage = "No conversations yet"
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
    return (
      <Card className="bg-elec-gray border-border">
        <CardContent className="p-8 text-center">
          <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No Messages</h3>
          <p className="text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
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

import { ElectricianConversationListItem } from "./ElectricianConversationListItem";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Inbox, Briefcase } from "lucide-react";
import type { ElectricianConversation } from "@/services/conversationService";
import { Button } from "@/components/ui/button";

interface ElectricianConversationListProps {
  conversations: ElectricianConversation[];
  isLoading: boolean;
  onSelect: (conversation: ElectricianConversation) => void;
  onBrowseJobs?: () => void;
  emptyMessage?: string;
}

export function ElectricianConversationList({
  conversations,
  isLoading,
  onSelect,
  onBrowseJobs,
  emptyMessage = "No messages yet",
}: ElectricianConversationListProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="p-4 rounded-full bg-muted/50 mb-4">
          <Inbox className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No Messages Yet</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          {emptyMessage}
        </p>
        {onBrowseJobs && (
          <Button onClick={onBrowseJobs} className="gap-2">
            <Briefcase className="h-4 w-4" />
            Browse Jobs
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      {conversations.map((conversation) => (
        <ElectricianConversationListItem
          key={conversation.id}
          conversation={conversation}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

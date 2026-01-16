import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ChatMessage {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string | null;
  content: string;
  category: string | null;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

interface AdminMessageCardProps {
  message: ChatMessage;
  onClick: (message: ChatMessage) => void;
  getCategoryColor: (category: string | null) => string;
}

const AdminMessageCardComponent: React.FC<AdminMessageCardProps> = ({
  message,
  onClick,
  getCategoryColor,
}) => {
  return (
    <Card
      className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
      onClick={() => onClick(message)}
    >
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm truncate">
                {message.author_name}
              </p>
              {message.category && (
                <Badge
                  className={`${getCategoryColor(message.category)} text-[10px] py-0`}
                >
                  {message.category}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {message.content}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(message.created_at), {
                  addSuffix: true,
                })}
              </span>
              {message.upvotes > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {message.upvotes}
                </span>
              )}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export const AdminMessageCard = memo(AdminMessageCardComponent);

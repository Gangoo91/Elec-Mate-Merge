import { useState, useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Send, AtSign, Reply, MoreHorizontal, Smile, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface PhotoComment {
  id: string;
  photoId: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  content: string;
  mentions: string[];
  timestamp: string;
  parentId?: string;
  reactions?: { emoji: string; count: number; userReacted: boolean }[];
}

export interface Employee {
  id: string;
  name: string;
  initials: string;
}

interface PhotoCommentsProps {
  photoId: string;
  comments: PhotoComment[];
  employees: Employee[];
  currentUserId: string;
  onAddComment: (content: string, mentions: string[], parentId?: string) => void;
  onDeleteComment: (commentId: string) => void;
  onReaction: (commentId: string, emoji: string) => void;
}

const EMOJI_OPTIONS = ["👍", "❤️", "🔥", "👀", "✅", "❌"];

export const PhotoComments = ({
  photoId,
  comments,
  employees,
  currentUserId,
  onAddComment,
  onDeleteComment,
  onReaction,
}: PhotoCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter comments for this photo
  const photoComments = comments.filter((c) => c.photoId === photoId);
  
  // Separate root comments and replies
  const rootComments = photoComments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) =>
    photoComments.filter((c) => c.parentId === parentId);

  // Filter employees for mention dropdown
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewComment(value);

    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf("@");
    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
      setShowMentions(true);
      setMentionSearch("");
    } else if (lastAtIndex !== -1) {
      const searchText = value.slice(lastAtIndex + 1);
      if (!searchText.includes(" ")) {
        setShowMentions(true);
        setMentionSearch(searchText);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleSelectMention = (employee: Employee) => {
    const lastAtIndex = newComment.lastIndexOf("@");
    const beforeMention = newComment.slice(0, lastAtIndex);
    setNewComment(`${beforeMention}@${employee.name} `);
    setSelectedMentions([...selectedMentions, employee.id]);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment.trim(), selectedMentions, replyingTo || undefined);
    setNewComment("");
    setSelectedMentions([]);
    setReplyingTo(null);
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    inputRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = parseISO(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffHours * 60);
      return `${diffMins}m ago`;
    }
    if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    }
    return format(date, "d MMM");
  };

  const renderComment = (comment: PhotoComment, isReply = false) => {
    const replies = getReplies(comment.id);
    const isOwn = comment.authorId === currentUserId;

    // Highlight mentions in content
    const highlightMentions = (content: string) => {
      const parts = content.split(/(@\w+\s?)/g);
      return parts.map((part, i) => {
        if (part.startsWith("@")) {
          return (
            <span key={i} className="text-elec-yellow font-medium">
              {part}
            </span>
          );
        }
        return part;
      });
    };

    return (
      <div key={comment.id} className={cn("group", isReply && "ml-8 mt-2")}>
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="text-xs bg-elec-yellow/20 text-elec-yellow">
              {comment.authorInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{comment.authorName}</span>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(comment.timestamp)}
              </span>
            </div>

            <p className="text-sm mt-0.5 text-foreground/90">
              {highlightMentions(comment.content)}
            </p>

            {/* Reactions */}
            {comment.reactions && comment.reactions.length > 0 && (
              <div className="flex gap-1 mt-1">
                {comment.reactions.map((reaction, i) => (
                  <button
                    key={i}
                    onClick={() => onReaction(comment.id, reaction.emoji)}
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-xs flex items-center gap-1 transition-colors",
                      reaction.userReacted
                        ? "bg-elec-yellow/20 text-elec-yellow"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {reaction.emoji} {reaction.count}
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleReply(comment.id)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <Reply className="h-3 w-3" />
                Reply
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    <Smile className="h-3 w-3" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" side="top">
                  <div className="flex gap-1">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => onReaction(comment.id, emoji)}
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {isOwn && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="border-l-2 border-border/50 ml-4 mt-2">
            {replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Comments list */}
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {rootComments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No comments yet</p>
              <p className="text-xs mt-1">Be the first to comment</p>
            </div>
          ) : (
            rootComments.map((comment) => renderComment(comment))
          )}
        </div>
      </ScrollArea>

      {/* Reply indicator */}
      {replyingTo && (
        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Replying to{" "}
            {comments.find((c) => c.id === replyingTo)?.authorName}
          </span>
          <button
            onClick={cancelReply}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative border-t border-border/50 pt-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={newComment}
              onChange={handleInputChange}
              placeholder="Add a comment... Use @ to mention"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowMentions(!showMentions)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <AtSign className="h-4 w-4" />
            </button>

            {/* Mention dropdown */}
            {showMentions && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredEmployees.length === 0 ? (
                  <div className="p-3 text-sm text-muted-foreground">
                    No team members found
                  </div>
                ) : (
                  filteredEmployees.map((emp) => (
                    <button
                      key={emp.id}
                      type="button"
                      onClick={() => handleSelectMention(emp)}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-elec-yellow/20 text-elec-yellow">
                          {emp.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{emp.name}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <Button type="submit" size="icon" disabled={!newComment.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

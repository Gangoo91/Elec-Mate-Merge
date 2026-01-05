import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Send, 
  GitBranch, 
  UserPlus, 
  TrendingUp,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useJobComments, useAddComment, useDeleteComment, JobComment } from "@/hooks/useJobComments";

interface JobActivityFeedProps {
  jobId: string;
}

const getCommentIcon = (type: JobComment['comment_type']) => {
  switch (type) {
    case 'status_change':
      return <GitBranch className="h-3.5 w-3.5" />;
    case 'assignment':
      return <UserPlus className="h-3.5 w-3.5" />;
    case 'progress':
      return <TrendingUp className="h-3.5 w-3.5" />;
    default:
      return <MessageSquare className="h-3.5 w-3.5" />;
  }
};

const getCommentStyles = (type: JobComment['comment_type']) => {
  switch (type) {
    case 'status_change':
      return "bg-info/10 text-info";
    case 'assignment':
      return "bg-success/10 text-success";
    case 'progress':
      return "bg-warning/10 text-warning";
    default:
      return "bg-elec-yellow/10 text-elec-yellow";
  }
};

export function JobActivityFeed({ jobId }: JobActivityFeedProps) {
  const [newComment, setNewComment] = useState("");

  const { data: comments = [], isLoading } = useJobComments(jobId);
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    await addComment.mutateAsync({
      jobId,
      content: newComment.trim(),
      authorName: "You", // In real app, get from auth
      commentType: 'comment',
    });
    setNewComment("");
  };

  if (isLoading) {
    return (
      <Card className="bg-elec-gray/50">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray/50">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Activity</span>
          {comments.length > 0 && (
            <span className="text-xs text-muted-foreground">({comments.length})</span>
          )}
        </div>

        {/* Comment Input */}
        <div className="flex gap-2">
          <Avatar className="h-8 w-8 bg-elec-yellow/10 flex-shrink-0">
            <AvatarFallback className="text-elec-yellow text-xs">You</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-sm resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleAddComment();
                }
              }}
            />
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">
                Cmd+Enter to send
              </span>
              <Button
                size="sm"
                className="h-7 gap-1.5"
                onClick={handleAddComment}
                disabled={!newComment.trim() || addComment.isPending}
              >
                <Send className="h-3 w-3" />
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Activity List */}
        {comments.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-border">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                  getCommentStyles(comment.comment_type)
                )}>
                  {getCommentIcon(comment.comment_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-sm font-medium text-foreground">
                        {comment.author_name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    {comment.comment_type === 'comment' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteComment.mutate({ id: comment.id, jobId })}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {comments.length === 0 && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No activity yet. Be the first to comment!
          </div>
        )}
      </CardContent>
    </Card>
  );
}

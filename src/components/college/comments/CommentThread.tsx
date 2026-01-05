import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useCollege, type CollegeComment } from "@/contexts/CollegeContext";
import {
  MessageSquare,
  Reply,
  Check,
  AlertCircle,
  MoreVertical,
  Send,
  AtSign,
} from "lucide-react";
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

interface CommentThreadProps {
  contextType: "evidence" | "assessment" | "ilp" | "portfolio";
  contextId: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserRole?: string;
  currentUserInitials?: string;
  readOnly?: boolean;
}

export function CommentThread({
  contextType,
  contextId,
  currentUserId = "staff-1",
  currentUserName = "Dr. Sarah Johnson",
  currentUserRole = "tutor",
  currentUserInitials = "SJ",
  readOnly = false,
}: CommentThreadProps) {
  const { getCommentsForItem, addComment, resolveComment, staff, students } = useCollege();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);

  const comments = getCommentsForItem(contextType, contextId);

  // Build threaded structure
  const topLevelComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  // Get all mentionable users
  const mentionableUsers = [
    ...staff.filter(s => s.status === "Active").map(s => ({
      id: s.id,
      name: s.name,
      role: s.role,
      initials: s.avatarInitials,
    })),
    ...students.filter(s => s.status === "Active").map(s => ({
      id: s.id,
      name: s.name,
      role: "student",
      initials: s.avatarInitials,
    })),
  ].filter(u =>
    mentionSearch === "" ||
    u.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const handleMention = (user: { id: string; name: string }) => {
    const mentionText = `@${user.name}`;
    if (replyingTo) {
      setReplyContent(prev => prev + mentionText + " ");
    } else {
      setNewComment(prev => prev + mentionText + " ");
    }
    setSelectedMentions(prev => [...prev, user.id]);
    setShowMentionPopover(false);
    setMentionSearch("");
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    // Extract mentions from text
    const mentionMatches = newComment.match(/@[\w\s]+/g) || [];
    const mentionIds = mentionMatches.map(m => {
      const name = m.substring(1);
      const user = [...staff, ...students].find(u => u.name === name);
      return user?.id;
    }).filter(Boolean) as string[];

    const hasRequiresAction = newComment.includes("?") ||
      newComment.toLowerCase().includes("please") ||
      newComment.toLowerCase().includes("can you") ||
      mentionIds.length > 0;

    addComment({
      contextType,
      contextId,
      authorId: currentUserId,
      authorName: currentUserName,
      authorRole: currentUserRole,
      authorInitials: currentUserInitials,
      content: newComment,
      mentions: mentionIds,
      requiresAction: hasRequiresAction,
      actionOwner: mentionIds[0],
      isResolved: false,
      createdAt: new Date().toISOString(),
    });

    setNewComment("");
    setSelectedMentions([]);
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    // Extract mentions from text
    const mentionMatches = replyContent.match(/@[\w\s]+/g) || [];
    const mentionIds = mentionMatches.map(m => {
      const name = m.substring(1);
      const user = [...staff, ...students].find(u => u.name === name);
      return user?.id;
    }).filter(Boolean) as string[];

    addComment({
      contextType,
      contextId,
      parentId,
      authorId: currentUserId,
      authorName: currentUserName,
      authorRole: currentUserRole,
      authorInitials: currentUserInitials,
      content: replyContent,
      mentions: mentionIds,
      requiresAction: mentionIds.length > 0,
      actionOwner: mentionIds[0],
      isResolved: false,
      createdAt: new Date().toISOString(),
    });

    setReplyContent("");
    setReplyingTo(null);
    setSelectedMentions([]);
  };

  const handleResolve = (commentId: string) => {
    resolveComment(commentId, currentUserId, currentUserName);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "tutor": return "bg-info/10 text-info";
      case "assessor": return "bg-success/10 text-success";
      case "iqa": return "bg-warning/10 text-warning";
      case "head_of_department": return "bg-purple-500/10 text-purple-500";
      case "student": return "bg-elec-yellow/10 text-elec-yellow";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case "tutor": return "Tutor";
      case "assessor": return "Assessor";
      case "iqa": return "IQA";
      case "head_of_department": return "HoD";
      case "student": return "Student";
      case "admin": return "Admin";
      case "support": return "Support";
      default: return role;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  const highlightMentions = (text: string) => {
    // Highlight @mentions in text
    const parts = text.split(/(@[\w\s]+)/g);
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

  const renderComment = (comment: CollegeComment, isReply = false) => {
    const replies = getReplies(comment.id);

    return (
      <div key={comment.id} className={`${isReply ? "ml-8 mt-3" : ""}`}>
        <div className={`flex gap-3 ${comment.isResolved ? "opacity-60" : ""}`}>
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className={`text-xs font-semibold ${getRoleColor(comment.authorRole)}`}>
              {comment.authorInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm text-foreground">
                  {comment.authorName}
                </span>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getRoleColor(comment.authorRole)}`}>
                  {formatRole(comment.authorRole)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {comment.requiresAction && !comment.isResolved && (
                  <Badge variant="outline" className="bg-warning/10 text-warning text-[10px] px-1.5 py-0">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Action
                  </Badge>
                )}
                {comment.isResolved && (
                  <Badge variant="outline" className="bg-success/10 text-success text-[10px] px-1.5 py-0">
                    <Check className="h-3 w-3 mr-1" />
                    Resolved
                  </Badge>
                )}
                {!readOnly && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setReplyingTo(comment.id)}>
                        <Reply className="h-3 w-3 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      {comment.requiresAction && !comment.isResolved && (
                        <DropdownMenuItem onClick={() => handleResolve(comment.id)}>
                          <Check className="h-3 w-3 mr-2" />
                          Mark Resolved
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <p className="text-sm text-foreground/90 mt-1 whitespace-pre-wrap">
              {highlightMentions(comment.content)}
            </p>

            {comment.isResolved && comment.resolvedByName && (
              <p className="text-xs text-muted-foreground mt-1">
                Resolved by {comment.resolvedByName} on{" "}
                {new Date(comment.resolvedAt!).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            )}

            {/* Reply input */}
            {replyingTo === comment.id && !readOnly && (
              <div className="mt-3 flex gap-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] text-sm"
                  rows={2}
                />
                <div className="flex flex-col gap-1">
                  <Popover open={showMentionPopover} onOpenChange={setShowMentionPopover}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <AtSign className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2" align="end">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={mentionSearch}
                        onChange={(e) => setMentionSearch(e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded mb-2 bg-background"
                      />
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {mentionableUsers.slice(0, 8).map((user) => (
                          <button
                            key={user.id}
                            onClick={() => handleMention(user)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded text-left"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className={`text-[10px] ${getRoleColor(user.role)}`}>
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{formatRole(user.role)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    size="icon"
                    className="h-8 w-8 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Render replies */}
        {replies.length > 0 && (
          <div className="border-l-2 border-muted pl-2 ml-4">
            {replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            Comments ({comments.length})
          </span>
        </div>
        {comments.filter(c => c.requiresAction && !c.isResolved).length > 0 && (
          <Badge variant="outline" className="bg-warning/10 text-warning">
            {comments.filter(c => c.requiresAction && !c.isResolved).length} require action
          </Badge>
        )}
      </div>

      {/* New comment input */}
      {!readOnly && (
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className={`text-xs font-semibold ${getRoleColor(currentUserRole)}`}>
              {currentUserInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Add a comment... Use @ to mention someone"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-sm"
              rows={2}
            />
            <div className="flex flex-col gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <AtSign className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" align="end">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={mentionSearch}
                    onChange={(e) => setMentionSearch(e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded mb-2 bg-background"
                  />
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {mentionableUsers.slice(0, 8).map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleMention(user)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded text-left"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className={`text-[10px] ${getRoleColor(user.role)}`}>
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{formatRole(user.role)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                size="icon"
                className="h-8 w-8 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {topLevelComments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to add one!
          </p>
        ) : (
          topLevelComments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  );
}

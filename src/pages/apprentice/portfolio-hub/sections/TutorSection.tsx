import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  MessageCircle,
  Send,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Bell,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { CommentThread } from '@/components/portfolio-hub/comments/CommentThread';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { useAuth } from '@/contexts/AuthContext';

/**
 * TutorSection - Communication hub with tutors
 *
 * Phase 3 Enhanced with:
 * - Real-time comments on portfolio evidence
 * - Threaded conversations with tutors
 * - Action required indicators
 * - Quick reply functionality
 */
export function TutorSection() {
  const { user } = useAuth();
  const {
    threads,
    unreadCount,
    actionRequiredCount,
    isLoading,
    addReply,
    resolveComment,
  } = usePortfolioComments();

  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);

  // Sort threads by most recent activity
  const sortedThreads = [...threads].sort((a, b) => {
    const aLatest = a.replies.length > 0
      ? new Date(a.replies[a.replies.length - 1].createdAt)
      : new Date(a.rootComment.createdAt);
    const bLatest = b.replies.length > 0
      ? new Date(b.replies[b.replies.length - 1].createdAt)
      : new Date(b.rootComment.createdAt);
    return bLatest.getTime() - aLatest.getTime();
  });

  // Get threads requiring action
  const actionThreads = sortedThreads.filter(
    t => t.rootComment.requiresAction &&
        !t.rootComment.isResolved &&
        t.rootComment.actionOwner === user?.id
  );

  // Recent feedback (resolved threads)
  const resolvedThreads = sortedThreads
    .filter(t => t.rootComment.isResolved)
    .slice(0, 3);

  // Pending reviews (items submitted but not yet commented on)
  // In real implementation, this would come from portfolio evidence status
  const pendingReviews = [
    {
      id: '1',
      title: 'Consumer Unit Installation',
      type: 'Portfolio Entry',
      submittedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      estimatedReview: '2-3 days',
    },
    {
      id: '2',
      title: 'Cable Sizing Evidence',
      type: 'Evidence Upload',
      submittedDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
      estimatedReview: '1-2 days',
    },
  ];

  const handleReply = async (parentId: string, content: string) => {
    await addReply(parentId, content);
  };

  const handleResolve = async (commentId: string) => {
    await resolveComment(commentId);
  };

  const selectedThreadData = selectedThread
    ? threads.find(t => t.rootComment.id === selectedThread)
    : null;

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tutor Hub</h1>
            <p className="text-sm text-muted-foreground">
              Live comments and feedback from your tutors
            </p>
          </div>
          <Button variant="outline" size="icon" className="border-border relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-amber-500">{actionRequiredCount}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Actions</p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-blue-500">{unreadCount}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-green-500">{resolvedThreads.length}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Required Section */}
        {actionThreads.length > 0 && (
          <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Action Required
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]"
                >
                  {actionThreads.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {actionThreads.slice(0, 3).map((thread) => (
                <button
                  key={thread.rootComment.id}
                  onClick={() => setSelectedThread(thread.rootComment.id)}
                  className="w-full text-left p-3 rounded-lg border border-amber-500/20 bg-background hover:bg-amber-500/5 transition-colors touch-manipulation active:scale-[0.98]"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow text-xs">
                        {thread.rootComment.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-sm text-foreground">
                          {thread.rootComment.authorName}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] capitalize"
                        >
                          {thread.rootComment.authorRole}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {thread.rootComment.content}
                      </p>
                      <span className="text-[10px] text-muted-foreground mt-1 inline-block">
                        {formatTimeAgo(new Date(thread.rootComment.createdAt))}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </button>
              ))}
              {actionThreads.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllComments(true)}
                  className="w-full text-xs"
                >
                  View all {actionThreads.length} actions
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Recent Comments */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-elec-yellow" />
                Recent Comments
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllComments(true)}
                className="text-xs h-7"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : sortedThreads.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No comments yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your tutor will leave feedback here
                </p>
              </div>
            ) : (
              sortedThreads.slice(0, 5).map((thread) => {
                const needsAction =
                  thread.rootComment.requiresAction &&
                  !thread.rootComment.isResolved &&
                  thread.rootComment.actionOwner === user?.id;

                return (
                  <button
                    key={thread.rootComment.id}
                    onClick={() => setSelectedThread(thread.rootComment.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-colors",
                      needsAction
                        ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10"
                        : thread.rootComment.isResolved
                        ? "border-green-500/20 bg-green-500/5 hover:bg-green-500/10"
                        : "border-border bg-card hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback
                          className={cn(
                            "text-xs",
                            thread.rootComment.authorRole !== 'student'
                              ? "bg-elec-yellow/20 text-elec-yellow"
                              : "bg-green-500/20 text-green-500"
                          )}
                        >
                          {thread.rootComment.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-sm text-foreground">
                            {thread.rootComment.authorName}
                          </span>
                          {thread.replies.length > 0 && (
                            <Badge variant="secondary" className="text-[10px]">
                              {thread.replies.length} repl{thread.replies.length === 1 ? 'y' : 'ies'}
                            </Badge>
                          )}
                          {needsAction && (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20"
                            >
                              Needs reply
                            </Badge>
                          )}
                          {thread.rootComment.isResolved && (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20"
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {thread.rootComment.content}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-muted-foreground">
                          {formatTimeAgo(new Date(thread.rootComment.createdAt))}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingReviews.length === 0 ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-green-500/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No items pending review</p>
              </div>
            ) : (
              pendingReviews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5"
                >
                  <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type} • Est. {item.estimatedReview}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Feedback (Resolved) */}
        {resolvedThreads.length > 0 && (
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Completed Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resolvedThreads.map((thread) => (
                <button
                  key={thread.rootComment.id}
                  onClick={() => setSelectedThread(thread.rootComment.id)}
                  className="w-full text-left p-3 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {thread.rootComment.authorName}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatTimeAgo(new Date(thread.rootComment.resolvedAt || thread.rootComment.createdAt))}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {thread.rootComment.content}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comment Detail Sheet */}
      <Sheet open={!!selectedThread} onOpenChange={(open) => !open && setSelectedThread(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader className="sr-only">
            <SheetTitle>Comment Thread</SheetTitle>
          </SheetHeader>
          {selectedThreadData && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-elec-yellow" />
                  Feedback Thread
                </h3>
              </div>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <CommentThread
                  thread={selectedThreadData}
                  currentUserId={user?.id || ''}
                  onReply={handleReply}
                  onResolve={handleResolve}
                />
              </ScrollArea>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* All Comments Sheet */}
      <Sheet open={showAllComments} onOpenChange={setShowAllComments}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader className="sr-only">
            <SheetTitle>All Comments</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
                All Feedback
                <Badge variant="secondary" className="text-xs">
                  {threads.length}
                </Badge>
              </h3>
            </div>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {sortedThreads.map((thread) => (
                  <CommentThread
                    key={thread.rootComment.id}
                    thread={thread}
                    currentUserId={user?.id || ''}
                    onReply={handleReply}
                    onResolve={handleResolve}
                    compact
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quick Message FAB (mobile) */}
      <div className="fixed bottom-24 right-4 lg:hidden">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-elec-yellow text-black shadow-lg touch-manipulation active:scale-95"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default TutorSection;

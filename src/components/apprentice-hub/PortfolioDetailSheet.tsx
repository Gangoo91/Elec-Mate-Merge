/**
 * PortfolioDetailSheet
 *
 * Bottom sheet for viewing and editing portfolio evidence details.
 * Shows full entry info, comments, and actions (share, edit, delete).
 */

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Share2,
  Edit,
  Trash2,
  MessageSquare,
  Send,
  Clock,
  Calendar,
  FileCheck,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Video,
  Link2,
  ChevronRight,
  User,
  Copy,
  Check,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useToast } from '@/hooks/use-toast';

interface PortfolioDetailSheetProps {
  entry: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (entry: any) => void;
}

export function PortfolioDetailSheet({
  entry,
  open,
  onOpenChange,
  onEdit,
}: PortfolioDetailSheetProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'details' | 'comments'>('details');
  const [newComment, setNewComment] = useState('');
  const { getCommentsForEvidence, addComment } = usePortfolioComments();
  const { createShareLink, getShareUrl } = usePortfolioSharing();
  const { deleteEntry } = usePortfolioData();

  // Dialog states
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isCreatingShare, setIsCreatingShare] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!entry) return null;

  const comments = getCommentsForEvidence(entry.id) || [];

  const statusColors: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground',
    'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    completed: 'bg-green-500/10 text-green-500 border-green-500/30',
    reviewed: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30',
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    await addComment({
      contextType: 'evidence',
      contextId: entry.id,
      content: newComment,
    });

    setNewComment('');
  };

  const handleShare = async () => {
    setShowShareDialog(true);
    setIsCreatingShare(true);
    setCopied(false);

    try {
      const share = await createShareLink({
        entryIds: [entry.id],
        title: entry.title,
        description: entry.description,
        expiresIn: '7d',
      });

      if (share) {
        setShareUrl(getShareUrl(share.token));
      }
    } catch (error) {
      console.error('Error creating share link:', error);
      toast({
        title: 'Error',
        description: 'Failed to create share link',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingShare(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'Link copied',
        description: 'Share link copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(entry);
      onOpenChange(false);
    } else {
      toast({
        title: 'Edit mode',
        description: 'Opening edit view...',
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEntry(entry.id);
      toast({
        title: 'Evidence deleted',
        description: 'The evidence has been removed from your portfolio',
      });
      setShowDeleteDialog(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete evidence',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        {/* Drag handle */}
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <div className="flex flex-col h-full">
          {/* Header with image/preview */}
          <div className="relative h-48 bg-muted shrink-0">
            {entry.evidenceFiles?.[0]?.url ? (
              <img
                src={entry.evidenceFiles[0].url}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-xl font-bold text-foreground mb-2">{entry.title}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn(statusColors[entry.status] || statusColors.draft)}
                >
                  {entry.status || 'draft'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {entry.category}
                </Badge>
                {entry.skills?.slice(0, 3).map((skill: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex border-b border-border shrink-0">
            <button
              onClick={() => setActiveTab('details')}
              className={cn(
                'flex-1 h-11 text-sm font-medium border-b-2 transition-colors touch-manipulation',
                activeTab === 'details'
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-transparent text-muted-foreground'
              )}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={cn(
                'flex-1 h-11 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 touch-manipulation',
                activeTab === 'comments'
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-transparent text-muted-foreground'
              )}
            >
              Comments
              {comments.length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] bg-elec-yellow/20 text-elec-yellow rounded-full">
                  {comments.length}
                </span>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'details' ? (
              <div className="p-4 space-y-6">
                {/* Description */}
                {entry.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                    <p className="text-sm text-foreground">{entry.description}</p>
                  </div>
                )}

                {/* Reflection */}
                {entry.reflection && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Reflection</h3>
                    <p className="text-sm text-foreground">{entry.reflection}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Created
                    </span>
                    <p className="text-sm text-foreground">
                      {new Date(entry.dateCreated).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {entry.timeSpent && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time Spent
                      </span>
                      <p className="text-sm text-foreground">{entry.timeSpent} mins</p>
                    </div>
                  )}
                </div>

                {/* Skills / KSBs */}
                {entry.skills?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Skills & KSBs</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.skills.map((skill: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evidence Files */}
                {entry.evidenceFiles?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Evidence Files ({entry.evidenceFiles.length})
                    </h3>
                    <div className="space-y-2">
                      {entry.evidenceFiles.map((file: any, i: number) => (
                        <a
                          key={i}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors touch-manipulation min-h-[48px]"
                        >
                          <FileIcon type={file.type} />
                          <span className="flex-1 text-sm text-foreground truncate">
                            {file.name || `File ${i + 1}`}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supervisor Feedback */}
                {entry.supervisorFeedback && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Supervisor Feedback</h3>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm text-foreground">{entry.supervisorFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {/* Comments list */}
                {comments.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">No comments yet</p>
                    <p className="text-xs text-muted-foreground">
                      Start a discussion about this evidence
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-muted">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {comment.authorName}
                              </span>
                              <Badge variant="outline" className="text-[10px]">
                                {comment.authorRole}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-foreground mt-1">{comment.content}</p>
                            {comment.requiresAction && !comment.isResolved && (
                              <Badge variant="destructive" className="mt-2 text-[10px]">
                                Action Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add comment */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px] resize-none touch-manipulation"
                  />
                  <Button
                    size="icon"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="shrink-0 h-11 w-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-border shrink-0 bg-background pb-20 sm:pb-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex-1 h-11 touch-manipulation active:scale-95"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex-1 h-11 touch-manipulation active:scale-95"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowDeleteDialog(true)}
                className="h-11 w-11 text-destructive hover:text-destructive touch-manipulation active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Evidence</DialogTitle>
            <DialogDescription>
              Share this evidence with your tutor, assessor, or employer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isCreatingShare ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : shareUrl ? (
              <>
                <div className="flex items-center gap-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="flex-1 h-11"
                  />
                  <Button
                    size="icon"
                    onClick={handleCopyLink}
                    className="h-11 w-11 shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This link expires in 7 days. Anyone with the link can view this evidence.
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Failed to create share link. Please try again.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Evidence</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{entry.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
}

// File icon helper
function FileIcon({ type }: { type?: string }) {
  if (type?.startsWith('image/')) {
    return <ImageIcon className="h-5 w-5 text-blue-500" />;
  }
  if (type?.startsWith('video/')) {
    return <Video className="h-5 w-5 text-purple-500" />;
  }
  if (type?.includes('pdf')) {
    return <FileText className="h-5 w-5 text-red-500" />;
  }
  return <FileText className="h-5 w-5 text-muted-foreground" />;
}

// Date formatter
function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default PortfolioDetailSheet;

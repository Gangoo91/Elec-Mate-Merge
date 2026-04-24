import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useCollege } from '@/contexts/CollegeContext';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
  fieldLabelClass,
} from '@/components/college/primitives';

interface AddCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contextType: 'evidence' | 'assessment' | 'ilp' | 'portfolio';
  contextId: string;
  contextTitle?: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserRole?: string;
  currentUserInitials?: string;
}

export function AddCommentDialog({
  open,
  onOpenChange,
  contextType,
  contextId,
  contextTitle,
  currentUserId = 'staff-1',
  currentUserName = 'Dr. Sarah Johnson',
  currentUserRole = 'tutor',
  currentUserInitials = 'SJ',
}: AddCommentDialogProps) {
  const { addComment, staff, students } = useCollege();
  const [content, setContent] = useState('');
  const [requiresAction, setRequiresAction] = useState(false);
  const [selectedMentions, setSelectedMentions] = useState<{ id: string; name: string }[]>([]);
  const [mentionPopoverOpen, setMentionPopoverOpen] = useState(false);

  const mentionableUsers = [
    ...staff
      .filter((s) => s.status === 'Active')
      .map((s) => ({
        id: s.id,
        name: s.name,
        role: s.role,
        initials: s.avatarInitials,
      })),
    ...students
      .filter((s) => s.status === 'Active')
      .map((s) => ({
        id: s.id,
        name: s.name,
        role: 'student',
        initials: s.avatarInitials,
      })),
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'bg-blue-500/10 text-blue-400';
      case 'assessor':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'iqa':
        return 'bg-amber-500/10 text-amber-400';
      case 'head_of_department':
        return 'bg-purple-500/10 text-purple-400';
      case 'student':
        return 'bg-elec-yellow/10 text-elec-yellow';
      default:
        return 'bg-[hsl(0_0%_12%)] text-white';
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'Tutor';
      case 'assessor':
        return 'Assessor';
      case 'iqa':
        return 'IQA';
      case 'head_of_department':
        return 'HoD';
      case 'student':
        return 'Student';
      case 'admin':
        return 'Admin';
      case 'support':
        return 'Support';
      default:
        return role;
    }
  };

  const handleAddMention = (user: { id: string; name: string }) => {
    if (!selectedMentions.find((m) => m.id === user.id)) {
      setSelectedMentions((prev) => [...prev, user]);
      setContent((prev) => prev + `@${user.name} `);
    }
    setMentionPopoverOpen(false);
  };

  const handleRemoveMention = (userId: string) => {
    const mention = selectedMentions.find((m) => m.id === userId);
    if (mention) {
      setSelectedMentions((prev) => prev.filter((m) => m.id !== userId));
      setContent((prev) => prev.replace(`@${mention.name} `, '').replace(`@${mention.name}`, ''));
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    const mentionIds = selectedMentions.map((m) => m.id);

    addComment({
      contextType,
      contextId,
      authorId: currentUserId,
      authorName: currentUserName,
      authorRole: currentUserRole,
      authorInitials: currentUserInitials,
      content: content.trim(),
      mentions: mentionIds,
      requiresAction: requiresAction || mentionIds.length > 0,
      actionOwner: mentionIds[0],
      isResolved: false,
      createdAt: new Date().toISOString(),
    });

    // Reset and close
    setContent('');
    setRequiresAction(false);
    setSelectedMentions([]);
    onOpenChange(false);
  };

  const getContextLabel = () => {
    switch (contextType) {
      case 'evidence':
        return 'Evidence';
      case 'assessment':
        return 'Assessment';
      case 'ilp':
        return 'ILP';
      case 'portfolio':
        return 'Portfolio';
      default:
        return contextType;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">Add Comment</DialogTitle>
          {contextTitle && (
            <p className="text-sm text-white">
              On {getContextLabel()}:{' '}
              <span className="font-medium text-white">{contextTitle}</span>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {/* Comment author */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className={`text-xs font-semibold ${getRoleColor(currentUserRole)}`}>
                {currentUserInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">{currentUserName}</p>
              <p className="text-xs text-white">{formatRole(currentUserRole)}</p>
            </div>
          </div>

          {/* Comment content */}
          <Field label="Comment">
            <Textarea
              placeholder="Write your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`min-h-[120px] ${textareaClass}`}
              rows={4}
            />
          </Field>

          {/* Mentions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className={fieldLabelClass}>Mentions</Label>
              <Popover open={mentionPopoverOpen} onOpenChange={setMentionPopoverOpen}>
                <PopoverTrigger asChild>
                  <SecondaryButton size="sm">@ Add Mention</SecondaryButton>
                </PopoverTrigger>
                <PopoverContent
                  className="w-64 p-0 bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white"
                  align="end"
                >
                  <Command className="bg-[hsl(0_0%_12%)] text-white">
                    <CommandInput placeholder="Search users..." />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      <CommandGroup>
                        {mentionableUsers
                          .filter((u) => !selectedMentions.find((m) => m.id === u.id))
                          .slice(0, 10)
                          .map((user) => (
                            <CommandItem
                              key={user.id}
                              onSelect={() => handleAddMention(user)}
                              className="flex items-center gap-2"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarFallback
                                  className={`text-[10px] ${getRoleColor(user.role)}`}
                                >
                                  {user.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-white">{formatRole(user.role)}</p>
                              </div>
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {selectedMentions.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedMentions.map((mention) => (
                  <span
                    key={mention.id}
                    className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full border border-elec-yellow/20 bg-elec-yellow/10 text-elec-yellow text-[11px]"
                  >
                    @{mention.name}
                    <button
                      onClick={() => handleRemoveMention(mention.id)}
                      className="ml-0.5 hover:bg-white/10 rounded-full h-4 w-4 flex items-center justify-center text-[12px] touch-manipulation"
                      aria-label="Remove mention"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white">
                No mentions added. Use @ to notify specific people.
              </p>
            )}
          </div>

          {/* Requires action toggle */}
          <div className="flex items-center justify-between p-3 bg-white/[0.04] border border-white/[0.08] rounded-lg">
            <div className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              <div>
                <Label htmlFor="requires-action" className="text-sm font-medium text-white cursor-pointer">
                  Requires Action
                </Label>
                <p className="text-xs text-white">Mark if response is needed</p>
              </div>
            </div>
            <Switch
              id="requires-action"
              checked={requiresAction}
              onCheckedChange={setRequiresAction}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={!content.trim()}>
            Post Comment
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

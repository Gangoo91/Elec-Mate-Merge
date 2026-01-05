import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCollege } from "@/contexts/CollegeContext";
import {
  AtSign,
  Send,
  AlertCircle,
  X,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AddCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contextType: "evidence" | "assessment" | "ilp" | "portfolio";
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
  currentUserId = "staff-1",
  currentUserName = "Dr. Sarah Johnson",
  currentUserRole = "tutor",
  currentUserInitials = "SJ",
}: AddCommentDialogProps) {
  const { addComment, staff, students } = useCollege();
  const [content, setContent] = useState("");
  const [requiresAction, setRequiresAction] = useState(false);
  const [selectedMentions, setSelectedMentions] = useState<{ id: string; name: string }[]>([]);
  const [mentionPopoverOpen, setMentionPopoverOpen] = useState(false);

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
  ];

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

  const handleAddMention = (user: { id: string; name: string }) => {
    if (!selectedMentions.find(m => m.id === user.id)) {
      setSelectedMentions(prev => [...prev, user]);
      setContent(prev => prev + `@${user.name} `);
    }
    setMentionPopoverOpen(false);
  };

  const handleRemoveMention = (userId: string) => {
    const mention = selectedMentions.find(m => m.id === userId);
    if (mention) {
      setSelectedMentions(prev => prev.filter(m => m.id !== userId));
      setContent(prev => prev.replace(`@${mention.name} `, "").replace(`@${mention.name}`, ""));
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    const mentionIds = selectedMentions.map(m => m.id);

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
    setContent("");
    setRequiresAction(false);
    setSelectedMentions([]);
    onOpenChange(false);
  };

  const getContextLabel = () => {
    switch (contextType) {
      case "evidence": return "Evidence";
      case "assessment": return "Assessment";
      case "ilp": return "ILP";
      case "portfolio": return "Portfolio";
      default: return contextType;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Add Comment
          </DialogTitle>
          {contextTitle && (
            <p className="text-sm text-muted-foreground">
              On {getContextLabel()}: <span className="font-medium text-foreground">{contextTitle}</span>
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
              <p className="text-sm font-medium">{currentUserName}</p>
              <p className="text-xs text-muted-foreground">{formatRole(currentUserRole)}</p>
            </div>
          </div>

          {/* Comment content */}
          <Textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
            rows={4}
          />

          {/* Mentions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-1">
                <AtSign className="h-3.5 w-3.5" />
                Mentions
              </Label>
              <Popover open={mentionPopoverOpen} onOpenChange={setMentionPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <AtSign className="h-3 w-3 mr-1" />
                    Add Mention
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Search users..." />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      <CommandGroup>
                        {mentionableUsers
                          .filter(u => !selectedMentions.find(m => m.id === u.id))
                          .slice(0, 10)
                          .map((user) => (
                            <CommandItem
                              key={user.id}
                              onSelect={() => handleAddMention(user)}
                              className="flex items-center gap-2"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className={`text-[10px] ${getRoleColor(user.role)}`}>
                                  {user.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{formatRole(user.role)}</p>
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
                  <Badge
                    key={mention.id}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1"
                  >
                    @{mention.name}
                    <button
                      onClick={() => handleRemoveMention(mention.id)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No mentions added. Use @ to notify specific people.
              </p>
            )}
          </div>

          {/* Requires action toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <div>
                <Label htmlFor="requires-action" className="text-sm font-medium cursor-pointer">
                  Requires Action
                </Label>
                <p className="text-xs text-muted-foreground">
                  Mark if response is needed
                </p>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
          >
            <Send className="h-4 w-4 mr-2" />
            Post Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

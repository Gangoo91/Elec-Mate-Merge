import { useState, useMemo, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import { QuickStatsGrid, QuickStat } from "@/components/employer/QuickStats";
import {
  MessageSquare,
  Search,
  Plus,
  AlertTriangle,
  Megaphone,
  FileCheck,
  Briefcase,
  Clock,
  CheckCircle2,
  Users,
  Send,
  Pin,
  PinOff,
  Calendar as CalendarIcon,
  ChevronRight,
  Inbox,
  Bell,
  Check,
  CheckCheck,
  Zap,
  Trash2,
  MailOpen,
  Mail,
  X,
  FileText,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Loader2
} from "lucide-react";
import {
  useCommunications,
  useCommunicationStats,
  useCommunicationRecipients,
  useCreateCommunication,
  usePinCommunication,
  useMarkAsRead,
  useAcknowledgeMessage,
  useDeleteCommunication
} from "@/hooks/useCommunications";
import { useActiveEmployees } from "@/hooks/useEmployees";
import { Communication, CommunicationType, CommunicationPriority, TargetAudience } from "@/services/communicationService";

// Type mapping from new backend types to UI
const typeMapping: Record<CommunicationType, string> = {
  'announcement': 'Team Broadcast',
  'message': 'Job Message',
  'alert': 'Safety Warning',
};

const reverseTypeMapping: Record<string, CommunicationType> = {
  'Team Broadcast': 'announcement',
  'Job Message': 'message',
  'Safety Warning': 'alert',
  'Mandatory Reading': 'announcement', // Special type handled by priority
};

const typeConfig = {
  "Job Message": { icon: Briefcase, color: "bg-info/20 text-info", borderColor: "border-l-info", label: "Job" },
  "Safety Warning": { icon: AlertTriangle, color: "bg-destructive/20 text-destructive", borderColor: "border-l-destructive", label: "Safety" },
  "Team Broadcast": { icon: Megaphone, color: "bg-elec-yellow/20 text-elec-yellow", borderColor: "border-l-primary", label: "Brief" },
  "Mandatory Reading": { icon: FileCheck, color: "bg-warning/20 text-warning", borderColor: "border-l-warning", label: "Required" },
};

const priorityColors = {
  "high": "bg-destructive text-destructive-foreground",
  "urgent": "bg-destructive text-destructive-foreground",
  "normal": "bg-muted text-muted-foreground",
  "low": "bg-muted text-muted-foreground",
};

// Message templates
const templates = [
  { id: "safety", name: "Safety Alert", icon: AlertTriangle, type: "Safety Warning", preview: "Important safety notice regarding..." },
  { id: "brief", name: "Team Brief", icon: Megaphone, type: "Team Broadcast", preview: "Weekly update from management..." },
  { id: "job", name: "Job Update", icon: Briefcase, type: "Job Message", preview: "Update on job progress..." },
  { id: "mandatory", name: "Policy Update", icon: FileText, type: "Mandatory Reading", preview: "Please review and acknowledge..." },
];

// Per-tab empty states
const emptyStates = {
  inbox: { icon: Inbox, title: "All caught up!", message: "Your inbox is empty. Check back later for new messages." },
  briefs: { icon: Megaphone, title: "No team briefs", message: "Send one to keep your team informed." },
  safety: { icon: CheckCircle2, title: "No safety alerts", message: "That's good news! Operating safely." },
  mandatory: { icon: FileCheck, title: "Nothing to sign", message: "No mandatory readings pending." },
};

// Helper to get display type from backend communication
const getDisplayType = (comm: Communication): string => {
  if (comm.priority === 'urgent' || comm.priority === 'high') {
    if (comm.type === 'alert') return 'Safety Warning';
    return 'Mandatory Reading';
  }
  return typeMapping[comm.type] || 'Team Broadcast';
};

export const CommunicationsSection = () => {
  const isMobile = useIsMobile();

  // Backend hooks
  const { data: communications = [], isLoading, refetch, isRefetching } = useCommunications();
  const { data: stats } = useCommunicationStats();
  const { data: employees = [] } = useActiveEmployees();
  const createCommunication = useCreateCommunication();
  const pinCommunication = usePinCommunication();
  const markAsReadMutation = useMarkAsRead();
  const acknowledgeMutation = useAcknowledgeMessage();
  const deleteCommunication = useDeleteCommunication();

  // Recipients for selected message (for detail sheet)
  const [recipientsMessageId, setRecipientsMessageId] = useState<string | null>(null);
  const { data: recipients = [] } = useCommunicationRecipients(recipientsMessageId || '');

  // Local read/acknowledged state (would be per-user in real app with auth)
  const [localReadIds, setLocalReadIds] = useState<Set<string>>(new Set());
  const [localAcknowledgedIds, setLocalAcknowledgedIds] = useState<Set<string>>(new Set());

  // Core state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("inbox");
  const [filterUnread, setFilterUnread] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [pinnedCollapsed, setPinnedCollapsed] = useState(false);

  // Detail sheet state
  const [selectedMessage, setSelectedMessage] = useState<Communication | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReplySheet, setShowReplySheet] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  // Compose state
  const [showCompose, setShowCompose] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Team Broadcast");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>();
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [priority, setPriority] = useState<"normal" | "high">("normal");
  const [recipientMode, setRecipientMode] = useState<"all" | "specific">("all");

  // Swipe state
  const [swipingId, setSwipingId] = useState<string | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Pull to refresh
  const handleRefresh = async () => {
    await refetch();
    toast({ title: "Refreshed", description: "Messages updated" });
  };

  // Filter and group messages
  const filteredComms = useMemo(() => {
    let filtered = communications.filter(comm => {
      const matchesSearch = comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            comm.content.toLowerCase().includes(searchQuery.toLowerCase());

      const displayType = getDisplayType(comm);

      if (activeTab === "inbox") return matchesSearch;
      if (activeTab === "briefs") return matchesSearch && displayType === "Team Broadcast";
      if (activeTab === "safety") return matchesSearch && displayType === "Safety Warning";
      if (activeTab === "mandatory") return matchesSearch && (displayType === "Mandatory Reading" || comm.priority === 'urgent');
      return matchesSearch;
    });

    if (filterUnread) {
      filtered = filtered.filter(c => !localReadIds.has(c.id));
    }

    return filtered;
  }, [communications, searchQuery, activeTab, filterUnread, localReadIds]);

  // Time grouping
  const groupedMessages = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

    const groups: { label: string; messages: Communication[] }[] = [
      { label: "Today", messages: [] },
      { label: "Yesterday", messages: [] },
      { label: "This Week", messages: [] },
      { label: "Earlier", messages: [] },
    ];

    // Separate pinned for inbox
    const pinnedMessages = activeTab === "inbox"
      ? filteredComms.filter(c => c.is_pinned)
      : [];
    const unpinnedMessages = filteredComms.filter(c => !c.is_pinned || activeTab !== "inbox");

    unpinnedMessages.forEach(comm => {
      const commDate = comm.created_at.split('T')[0];
      if (commDate >= today) groups[0].messages.push(comm);
      else if (commDate >= yesterday) groups[1].messages.push(comm);
      else if (commDate >= weekAgo) groups[2].messages.push(comm);
      else groups[3].messages.push(comm);
    });

    return { pinned: pinnedMessages, groups: groups.filter(g => g.messages.length > 0) };
  }, [filteredComms, activeTab]);

  // Use stats from backend hook, with fallbacks
  const displayStats = useMemo(() => ({
    total: stats?.totalAnnouncements ?? communications.length,
    unread: stats?.unreadCount ?? communications.filter(c => !localReadIds.has(c.id)).length,
    mandatoryPending: communications.filter(c =>
      (c.priority === 'urgent' || c.priority === 'high') && !localAcknowledgedIds.has(c.id)
    ).length,
    safetyWarnings: communications.filter(c => c.type === 'alert').length,
  }), [stats, communications, localReadIds, localAcknowledgedIds]);

  // Actions
  const togglePin = useCallback(async (id: string, currentPinned: boolean) => {
    try {
      await pinCommunication.mutateAsync({ id, isPinned: !currentPinned });
      toast({ title: currentPinned ? "Unpinned" : "Pinned" });
    } catch {
      toast({ title: "Error", description: "Failed to update pin status", variant: "destructive" });
    }
  }, [pinCommunication]);

  const toggleRead = useCallback((id: string) => {
    setLocalReadIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast({ title: "Marked Unread" });
      } else {
        next.add(id);
        toast({ title: "Marked Read" });
      }
      return next;
    });
  }, []);

  const deleteMessage = useCallback(async (id: string) => {
    try {
      await deleteCommunication.mutateAsync(id);
      setShowDetail(false);
      toast({ title: "Deleted" });
    } catch {
      toast({ title: "Error", description: "Failed to delete message", variant: "destructive" });
    }
  }, [deleteCommunication]);

  const signOff = useCallback((id: string) => {
    setLocalAcknowledgedIds(prev => new Set([...prev, id]));
    setLocalReadIds(prev => new Set([...prev, id]));
    toast({ title: "Signed Off", description: "Acknowledged" });
  }, []);

  const handleReply = useCallback(async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      // Determine target - if original was to specific employees, reply goes back to sender
      // For broadcasts, reply creates a follow-up broadcast
      const isReplyToSpecific = selectedMessage.sender_id != null;

      await createCommunication.mutateAsync({
        type: 'message',
        title: `Re: ${selectedMessage.title}`,
        content: replyContent,
        priority: 'normal',
        target_audience: isReplyToSpecific ? 'specific' : selectedMessage.target_audience,
        target_employee_ids: isReplyToSpecific && selectedMessage.sender_id
          ? [selectedMessage.sender_id]
          : selectedMessage.target_employee_ids,
        is_pinned: false,
        expires_at: null,
        sender_id: null,
        attachments: null,
      });

      toast({
        title: "Reply sent",
        description: "Your reply has been sent.",
      });
      setReplyContent("");
      setShowReplySheet(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      });
    }
  }, [selectedMessage, replyContent, createCommunication]);

  const openMessage = useCallback((comm: Communication) => {
    setSelectedMessage(comm);
    setRecipientsMessageId(comm.id);
    setShowDetail(true);
    setLocalReadIds(prev => new Set([...prev, comm.id]));
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipingId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipingId) return;

    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
      setSwipingId(null);
      setSwipeOffset(0);
      return;
    }

    const resistance = Math.abs(diffX) > 80 ? 0.3 : 1;
    const newOffset = diffX * resistance;
    setSwipeOffset(Math.max(-120, Math.min(120, newOffset)));
  };

  const handleTouchEnd = () => {
    if (!swipingId) return;

    if (swipeOffset > 70) {
      toggleRead(swipingId);
    } else if (swipeOffset < -70) {
      deleteMessage(swipingId);
    }

    setSwipingId(null);
    setSwipeOffset(0);
  };

  // Compose handlers
  const handleSendMessage = async () => {
    if (!messageTitle.trim() || !messageContent.trim()) {
      toast({ title: "Missing info", description: "Add a title and message", variant: "destructive" });
      return;
    }

    const recipientCount = recipientMode === "all" ? employees.length : selectedRecipients.length;
    if (recipientCount === 0) {
      toast({ title: "No recipients", description: "Select at least one", variant: "destructive" });
      return;
    }

    try {
      const targetAudience: TargetAudience = recipientMode === "all" ? 'all' : 'specific';
      const commType: CommunicationType = reverseTypeMapping[selectedType] || 'announcement';
      const commPriority: CommunicationPriority = selectedType === "Mandatory Reading" ? 'urgent' :
                                                   selectedType === "Safety Warning" ? 'high' :
                                                   priority;

      await createCommunication.mutateAsync({
        type: commType,
        title: messageTitle,
        content: messageContent,
        priority: commPriority,
        target_audience: targetAudience,
        target_employee_ids: recipientMode === "specific" ? selectedRecipients : null,
        is_pinned: isPinned,
        expires_at: isScheduled && scheduleDate ? scheduleDate.toISOString() : null,
        sender_id: null,
        attachments: null,
      });

      const scheduleInfo = isScheduled && scheduleDate
        ? ` for ${format(scheduleDate, "dd MMM")} at ${scheduleTime}`
        : "";

      toast({
        title: isScheduled ? "Scheduled" : "Sent",
        description: `${recipientCount} recipients${scheduleInfo}`,
      });
      setShowCompose(false);
      resetCompose();
    } catch {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    }
  };

  const resetCompose = () => {
    setSelectedRecipients([]);
    setMessageTitle("");
    setMessageContent("");
    setSelectedType("Team Broadcast");
    setIsPinned(false);
    setIsScheduled(false);
    setScheduleDate(undefined);
    setScheduleTime("09:00");
    setPriority("normal");
    setRecipientMode("all");
  };

  const handleUseTemplate = (template: typeof templates[0]) => {
    setSelectedType(template.type);
    setMessageContent(template.preview);
    setMessageTitle(template.name);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const commDate = dateStr.split('T')[0];

    if (commDate === today) return format(date, 'HH:mm');
    if (commDate === yesterday) return "Yesterday";
    return format(date, 'dd MMM');
  };

  // Tab config
  const tabs = [
    { id: "inbox", icon: Inbox, label: "Inbox", count: null },
    { id: "briefs", icon: Megaphone, label: "Briefs", count: null },
    { id: "safety", icon: AlertTriangle, label: "Safety", count: displayStats.safetyWarnings > 0 ? displayStats.safetyWarnings : null },
    { id: "mandatory", icon: FileCheck, label: "Sign", count: displayStats.mandatoryPending > 0 ? displayStats.mandatoryPending : null },
  ];

  // Message Card Component
  const MessageCard = ({ comm }: { comm: Communication }) => {
    const displayType = getDisplayType(comm);
    const TypeIcon = typeConfig[displayType as keyof typeof typeConfig]?.icon || MessageSquare;
    const typeColor = typeConfig[displayType as keyof typeof typeConfig]?.color || "bg-muted";
    const borderColor = typeConfig[displayType as keyof typeof typeConfig]?.borderColor || "border-l-muted";
    const isRead = localReadIds.has(comm.id);
    const isPinnedMsg = comm.is_pinned;
    const isSignedOff = localAcknowledgedIds.has(comm.id);
    const isSwiping = swipingId === comm.id;
    const isHighPriority = comm.priority === 'high' || comm.priority === 'urgent';

    return (
      <div
        className="relative overflow-hidden rounded-xl"
        onTouchStart={(e) => handleTouchStart(e, comm.id)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe action backgrounds */}
        <div className="absolute inset-0 flex">
          <div className={`flex-1 flex items-center justify-start pl-5 transition-colors duration-200 ${swipeOffset > 30 ? 'bg-success' : 'bg-success/50'}`}>
            {isRead ? <Mail className="h-6 w-6 text-success-foreground" /> : <MailOpen className="h-6 w-6 text-success-foreground" />}
            <span className="ml-2 text-sm font-medium text-success-foreground">{isRead ? "Unread" : "Read"}</span>
          </div>
          <div className={`flex-1 flex items-center justify-end pr-5 transition-colors duration-200 ${swipeOffset < -30 ? 'bg-destructive' : 'bg-destructive/50'}`}>
            <span className="mr-2 text-sm font-medium text-destructive-foreground">Delete</span>
            <Trash2 className="h-6 w-6 text-destructive-foreground" />
          </div>
        </div>

        {/* Card */}
        <div
          className={`relative bg-elec-gray border border-border rounded-xl transition-transform duration-200 ease-out ${!isRead ? `border-l-4 ${borderColor}` : ''}`}
          style={{ transform: `translateX(${swipeOffset}px)` }}
          onClick={() => openMessage(comm)}
        >
          <div className="p-4 flex gap-3">
            {/* Left: Type Icon with unread dot */}
            <div className="relative flex-shrink-0">
              <div className={`p-2.5 rounded-xl ${typeColor}`}>
                <TypeIcon className="h-5 w-5" />
              </div>
              {!isRead && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-elec-yellow rounded-full border-2 border-card" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title row with pin icon */}
              <div className="flex items-center gap-1.5">
                {isPinnedMsg && <Pin className="h-3 w-3 text-elec-yellow flex-shrink-0" />}
                <h4 className={`text-sm truncate ${!isRead ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                  {comm.title}
                </h4>
              </div>

              {/* Preview - two lines */}
              <p className={`text-sm mt-1 line-clamp-2 leading-relaxed ${!isRead ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                {comm.content}
              </p>

              {/* Footer row: badges + time */}
              <div className="flex items-center justify-between mt-2.5 gap-2">
                <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                  {isHighPriority && (
                    <Badge className={`text-[10px] py-0 h-5 px-1.5 gap-0.5 ${priorityColors[comm.priority]}`}>
                      <Zap className="h-2.5 w-2.5" />
                      Urgent
                    </Badge>
                  )}
                  {displayType === "Mandatory Reading" && isSignedOff && (
                    <Badge variant="outline" className="text-[10px] py-0 h-5 px-1.5 bg-success/10 text-success border-success/30 gap-0.5">
                      <Check className="h-2.5 w-2.5" />
                      Done
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                  <span>{formatTime(comm.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Right: Sign button or chevron */}
            <div className="flex items-center flex-shrink-0">
              {displayType === "Mandatory Reading" && !isSignedOff ? (
                <Button
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); signOff(comm.id); }}
                  className="h-9 px-3 text-xs gap-1.5 rounded-lg"
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  Sign
                </Button>
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Message Detail Sheet
  const MessageDetailSheet = () => {
    if (!selectedMessage) return null;

    const displayType = getDisplayType(selectedMessage);
    const TypeIcon = typeConfig[displayType as keyof typeof typeConfig]?.icon || MessageSquare;
    const typeColor = typeConfig[displayType as keyof typeof typeConfig]?.color || "bg-muted";
    const isPinnedMsg = selectedMessage.is_pinned;
    const isRead = localReadIds.has(selectedMessage.id);
    const isSignedOff = localAcknowledgedIds.has(selectedMessage.id);
    const isHighPriority = selectedMessage.priority === 'high' || selectedMessage.priority === 'urgent';

    return (
      <Sheet open={showDetail} onOpenChange={setShowDetail}>
        <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-3xl">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Hero header */}
          <div className="px-5 pb-4 border-b border-border">
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-2xl ${typeColor}`}>
                <TypeIcon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {isHighPriority && (
                    <Badge className={`text-xs ${priorityColors[selectedMessage.priority]}`}>Urgent</Badge>
                  )}
                  {isPinnedMsg && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <Pin className="h-3 w-3" />Pinned
                    </Badge>
                  )}
                </div>
                <h2 className="text-lg font-bold text-foreground mt-1 leading-tight">{selectedMessage.title}</h2>
                <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
                  <span>{format(new Date(selectedMessage.created_at), "dd MMM yyyy 'at' HH:mm")}</span>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(95vh-200px)]">
            <div className="p-5 space-y-5">
              {/* Message content */}
              <div className="p-4 rounded-2xl bg-muted/20 border border-border">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.content}
                </p>
              </div>

              {/* Mandatory sign-off */}
              {displayType === "Mandatory Reading" && !isSignedOff && (
                <Card className="border-warning bg-warning/5 border-2">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-warning/20">
                        <FileCheck className="h-5 w-5 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">Acknowledgement Required</p>
                        <p className="text-xs text-muted-foreground mt-1">Confirm you've read and understood this.</p>
                        <Button className="mt-3 w-full gap-2" onClick={() => signOff(selectedMessage.id)}>
                          <FileCheck className="h-4 w-4" />
                          I Acknowledge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isSignedOff && displayType === "Mandatory Reading" && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-success/10 border border-success/30">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-success">You've signed off</span>
                </div>
              )}

              {/* Target info */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Sent to: <span className="font-medium">
                    {selectedMessage.target_audience === 'all' ? 'All team members' :
                     selectedMessage.target_audience === 'managers' ? 'Managers only' :
                     `${selectedMessage.target_employee_ids?.length || 0} selected members`}
                  </span>
                </span>
              </div>

              {/* Recipients list with read/acknowledged status */}
              {recipients.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      Recipients ({recipients.length})
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        {recipients.filter(r => r.read_at).length} read
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        {recipients.filter(r => r.acknowledged_at).length} signed
                      </span>
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto rounded-xl border border-border bg-muted/20">
                    {recipients.map((recipient) => (
                      <div
                        key={recipient.id}
                        className="flex items-center justify-between p-3 border-b border-border last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-elec-gray flex items-center justify-center">
                            {recipient.employee?.photo_url ? (
                              <img
                                src={recipient.employee.photo_url}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <span className="text-sm font-medium">
                            {recipient.employee?.name || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {recipient.acknowledged_at ? (
                            <Badge variant="outline" className="text-[10px] py-0 h-5 px-1.5 bg-blue-500/10 text-blue-400 border-blue-500/30 gap-0.5">
                              <CheckCheck className="h-2.5 w-2.5" />
                              Signed
                            </Badge>
                          ) : recipient.read_at ? (
                            <Badge variant="outline" className="text-[10px] py-0 h-5 px-1.5 bg-success/10 text-success border-success/30 gap-0.5">
                              <Check className="h-2.5 w-2.5" />
                              Read
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] py-0 h-5 px-1.5 bg-muted text-muted-foreground gap-0.5">
                              <Clock className="h-2.5 w-2.5" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sticky action bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border pb-safe">
            <div className="grid grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-col h-auto py-3 gap-1.5 rounded-xl"
                onClick={() => togglePin(selectedMessage.id, isPinnedMsg)}
                disabled={pinCommunication.isPending}
              >
                {isPinnedMsg ? <PinOff className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
                <span className="text-[11px]">{isPinnedMsg ? "Unpin" : "Pin"}</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-col h-auto py-3 gap-1.5 rounded-xl"
                onClick={() => toggleRead(selectedMessage.id)}
              >
                {isRead ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="text-[11px]">{isRead ? "Unread" : "Read"}</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-col h-auto py-3 gap-1.5 rounded-xl"
                onClick={() => setShowReplySheet(true)}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-[11px]">Reply</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-col h-auto py-3 gap-1.5 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => deleteMessage(selectedMessage.id)}
                disabled={deleteCommunication.isPending}
              >
                {deleteCommunication.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
                <span className="text-[11px]">Delete</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  // Compose Sheet
  const ComposeSheet = () => (
    <Sheet open={showCompose} onOpenChange={setShowCompose}>
      <SheetContent side="bottom" className="h-[100vh] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setShowCompose(false)}>
            Cancel
          </Button>
          <h3 className="font-semibold text-foreground">New Message</h3>
          <Button
            size="sm"
            onClick={handleSendMessage}
            className="gap-1.5"
            disabled={createCommunication.isPending}
          >
            {createCommunication.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-60px)]">
          <div className="p-4 space-y-5">
            {/* Template carousel */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Quick Start</Label>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">
                {templates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedType === template.type && messageTitle === template.name;
                  return (
                    <button
                      key={template.id}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${isSelected ? 'border-elec-yellow bg-elec-yellow/10' : 'border-border bg-elec-gray hover:border-elec-yellow/50'}`}
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium whitespace-nowrap">{template.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Type */}
            <div className="space-y-2">
              <Label>Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(typeConfig).map(([type, config]) => {
                  const Icon = config.icon;
                  return (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      className="justify-start gap-2 h-12 rounded-xl"
                      onClick={() => setSelectedType(type)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{config.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Message title..."
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Message</Label>
                <span className="text-xs text-muted-foreground">{messageContent.length}/500</span>
              </div>
              <Textarea
                placeholder="Write your message..."
                className="min-h-[120px] rounded-xl resize-none"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value.slice(0, 500))}
              />
            </div>

            {/* Recipients */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Recipients</Label>
                {(recipientMode === "all" || selectedRecipients.length > 0) && (
                  <Badge variant="secondary" className="text-xs">
                    {recipientMode === "all" ? employees.length : selectedRecipients.length} selected
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={recipientMode === "all" ? "default" : "outline"}
                  className="h-11 gap-1.5 rounded-xl"
                  onClick={() => {
                    setRecipientMode("all");
                    setSelectedRecipients([]);
                  }}
                >
                  <Users className="h-4 w-4" />
                  All Team
                </Button>
                <Button
                  variant={recipientMode === "specific" ? "default" : "outline"}
                  className="h-11 gap-1.5 rounded-xl"
                  onClick={() => setRecipientMode("specific")}
                >
                  <User className="h-4 w-4" />
                  Select
                </Button>
              </div>

              {recipientMode === "specific" && (
                <div className="max-h-[140px] overflow-y-auto border border-border rounded-xl p-2 space-y-1">
                  {employees.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No employees found</p>
                  ) : (
                    employees.map((emp) => (
                      <div key={emp.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50">
                        <Checkbox
                          id={`recipient-${emp.id}`}
                          checked={selectedRecipients.includes(emp.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRecipients([...selectedRecipients, emp.id]);
                            } else {
                              setSelectedRecipients(selectedRecipients.filter(id => id !== emp.id));
                            }
                          }}
                        />
                        <label htmlFor={`recipient-${emp.id}`} className="text-sm flex-1 cursor-pointer">{emp.name}</label>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground">Options</Label>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/20">
                    <Zap className="h-4 w-4 text-warning" />
                  </div>
                  <span className="text-sm font-medium">High Priority</span>
                </div>
                <Checkbox
                  checked={priority === "high"}
                  onCheckedChange={(checked) => setPriority(checked ? "high" : "normal")}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/20">
                    <Pin className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-sm font-medium">Pin Message</span>
                </div>
                <Checkbox
                  checked={isPinned}
                  onCheckedChange={(checked) => setIsPinned(!!checked)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-info/20">
                      <CalendarIcon className="h-4 w-4 text-info" />
                    </div>
                    <span className="text-sm font-medium">Schedule</span>
                  </div>
                  <Checkbox
                    checked={isScheduled}
                    onCheckedChange={(checked) => setIsScheduled(!!checked)}
                  />
                </div>

                {isScheduled && (
                  <div className="grid grid-cols-2 gap-2 p-4 rounded-xl bg-muted/20 border border-border">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="h-11 justify-start gap-2 rounded-xl">
                          <CalendarIcon className="h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "dd MMM") : "Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Select value={scheduleTime} onValueChange={setScheduleTime}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom padding for safe area */}
            <div className="h-8" />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );

  // Reply Sheet
  const ReplySheet = () => (
    <Sheet open={showReplySheet} onOpenChange={setShowReplySheet}>
      <SheetContent side="bottom" className="h-[50vh] p-0 rounded-t-2xl">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setShowReplySheet(false)}>
            Cancel
          </Button>
          <h3 className="font-semibold text-foreground">
            Reply to: {selectedMessage?.title}
          </h3>
          <Button
            size="sm"
            onClick={handleReply}
            disabled={!replyContent.trim() || createCommunication.isPending}
            className="gap-1.5"
          >
            {createCommunication.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Original message preview */}
          <div className="p-3 rounded-xl bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Replying to:</p>
            <p className="text-sm text-foreground line-clamp-2">{selectedMessage?.content}</p>
          </div>

          {/* Reply input */}
          <div className="space-y-2">
            <Label>Your Reply</Label>
            <Textarea
              placeholder="Type your reply..."
              className="min-h-[100px] rounded-xl resize-none touch-manipulation text-base"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Empty State Component
  const EmptyState = () => {
    const state = emptyStates[activeTab as keyof typeof emptyStates] || emptyStates.inbox;
    const Icon = state.icon;

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center">
            <Icon className="h-10 w-10 text-muted-foreground" />
          </div>
          {activeTab === "safety" && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center">
              <Check className="h-4 w-4 text-success-foreground" />
            </div>
          )}
        </div>
        <h3 className="font-bold text-foreground text-lg mt-5">{state.title}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-[200px]">{state.message}</p>
        <Button className="mt-5 gap-2 rounded-xl" onClick={() => setShowCompose(true)}>
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in pb-24 md:pb-4">
      {/* Header - Compact Mobile */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Messages</h1>
            <p className="text-xs text-muted-foreground">{displayStats.unread} unread</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={handleRefresh}
            disabled={isRefetching}
          >
            <RotateCw className={`h-5 w-5 ${isRefetching ? 'animate-spin' : ''}`} />
          </Button>

          {/* Search toggle */}
          <Button
            variant={showSearch ? "default" : "ghost"}
            size="icon"
            className="h-10 w-10"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notification bell with badge */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Bell className="h-5 w-5" />
            </Button>
            {displayStats.unread > 0 && (
              <div className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-elec-yellow text-elec-yellow-foreground text-[10px] font-bold flex items-center justify-center px-1">
                {displayStats.unread}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Search */}
      {showSearch && (
        <div className="flex gap-2 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-10 h-11 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            variant={filterUnread ? "default" : "outline"}
            size="icon"
            className="h-11 w-11 rounded-xl flex-shrink-0"
            onClick={() => setFilterUnread(!filterUnread)}
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Stats Bar */}
      <QuickStatsGrid
        stats={[
          {
            icon: Inbox,
            value: displayStats.total,
            label: "All",
            color: "blue",
          },
          {
            icon: Bell,
            value: displayStats.unread,
            label: "Unread",
            color: "yellow",
            pulse: displayStats.unread > 0,
          },
          {
            icon: FileCheck,
            value: displayStats.mandatoryPending,
            label: "Sign",
            color: "orange",
            pulse: displayStats.mandatoryPending > 0,
          },
          {
            icon: AlertTriangle,
            value: displayStats.safetyWarnings,
            label: "Safety",
            color: "red",
            pulse: displayStats.safetyWarnings > 0,
          },
        ]}
      />

      {/* Segmented Tab Control */}
      <div className="bg-muted/50 p-1 rounded-xl">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-elec-gray shadow-sm'
                    : 'hover:bg-muted/50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-elec-yellow' : 'text-muted-foreground'}`} />
                <span className={`text-[11px] mt-1 ${isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
                {tab.count && (
                  <div className="absolute -top-0.5 right-1 min-w-[16px] h-[16px] rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center px-1">
                    {tab.count}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-3">
        {filteredComms.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Pinned Messages - Collapsible */}
            {groupedMessages.pinned.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => setPinnedCollapsed(!pinnedCollapsed)}
                  className="flex items-center gap-2 text-xs text-muted-foreground px-1 w-full"
                >
                  <Pin className="h-3 w-3 text-elec-yellow" />
                  <span className="font-medium">Pinned ({groupedMessages.pinned.length})</span>
                  {pinnedCollapsed ? <ChevronDown className="h-3 w-3 ml-auto" /> : <ChevronUp className="h-3 w-3 ml-auto" />}
                </button>
                {!pinnedCollapsed && (
                  <div className="space-y-2">
                    {groupedMessages.pinned.map((comm) => (
                      <MessageCard key={comm.id} comm={comm} />
                    ))}
                  </div>
                )}
                <div className="border-b border-border my-3" />
              </div>
            )}

            {/* Grouped Messages */}
            {groupedMessages.groups.map((group) => (
              <div key={group.label} className="space-y-2">
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-1.5 px-1 -mx-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{group.label}</span>
                    <span className="text-muted-foreground/50">({group.messages.length})</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {group.messages.map((comm) => (
                    <MessageCard key={comm.id} comm={comm} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* FAB */}
      {isMobile && (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg fixed bottom-20 right-4 z-50"
          onClick={() => setShowCompose(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {!isMobile && (
        <Button
          className="fixed bottom-6 right-6 gap-2 shadow-lg"
          onClick={() => setShowCompose(true)}
        >
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      )}

      {/* Sheets */}
      <ComposeSheet />
      <MessageDetailSheet />
      <ReplySheet />
    </div>
  );
};

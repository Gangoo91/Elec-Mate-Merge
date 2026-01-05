import { useState, useMemo, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { communications as initialComms, employees, jobs } from "@/data/employerMockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
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
  Reply,
  MailOpen,
  Mail,
  X,
  FileText,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  RotateCw
} from "lucide-react";

// Types
interface Communication {
  id: string;
  type: string;
  title: string;
  message: string;
  sender: string;
  recipients: string[];
  job: string | null;
  date: string;
  time: string;
  read: string[];
  priority: string;
  signedOff?: string[];
}

const typeConfig = {
  "Job Message": { icon: Briefcase, color: "bg-info/20 text-info", borderColor: "border-l-info", label: "Job" },
  "Safety Warning": { icon: AlertTriangle, color: "bg-destructive/20 text-destructive", borderColor: "border-l-destructive", label: "Safety" },
  "Team Broadcast": { icon: Megaphone, color: "bg-elec-yellow/20 text-elec-yellow", borderColor: "border-l-primary", label: "Brief" },
  "Mandatory Reading": { icon: FileCheck, color: "bg-warning/20 text-warning", borderColor: "border-l-warning", label: "Required" },
};

const priorityColors = {
  "High": "bg-destructive text-destructive-foreground",
  "Normal": "bg-muted text-muted-foreground",
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

export const CommunicationsSection = () => {
  const isMobile = useIsMobile();
  const currentUserId = "1"; // Mock current user
  
  // Core state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("inbox");
  const [filterUnread, setFilterUnread] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [pinnedCollapsed, setPinnedCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Message state management
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set(["COMM-001"]));
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [signedOffIds, setSignedOffIds] = useState<Set<string>>(new Set(["COMM-001"]));
  const [readIds, setReadIds] = useState<Set<string>>(new Set(["COMM-001", "COMM-003"]));
  
  // Detail sheet state
  const [selectedMessage, setSelectedMessage] = useState<Communication | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  
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
  const [priority, setPriority] = useState<"Normal" | "High">("Normal");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [recipientMode, setRecipientMode] = useState<"all" | "job" | "individual">("all");
  
  // Swipe state
  const [swipingId, setSwipingId] = useState<string | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Pull to refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({ title: "Refreshed", description: "Messages updated" });
    }, 1000);
  };

  // Get active messages (not deleted)
  const activeMessages = useMemo(() => 
    initialComms.filter(c => !deletedIds.has(c.id)) as Communication[],
    [deletedIds]
  );

  // Filter and group messages
  const getFilteredComms = useCallback(() => {
    let filtered = activeMessages.filter(comm => {
      const matchesSearch = comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            comm.message.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "inbox") return matchesSearch;
      if (activeTab === "briefs") return matchesSearch && comm.type === "Team Broadcast";
      if (activeTab === "safety") return matchesSearch && comm.type === "Safety Warning";
      if (activeTab === "mandatory") return matchesSearch && comm.type === "Mandatory Reading";
      return matchesSearch;
    });

    if (filterUnread) {
      filtered = filtered.filter(c => !readIds.has(c.id));
    }

    return filtered;
  }, [activeMessages, searchQuery, activeTab, filterUnread, readIds]);

  const filteredComms = getFilteredComms();

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
      ? filteredComms.filter(c => pinnedIds.has(c.id))
      : [];
    const unpinnedMessages = filteredComms.filter(c => !pinnedIds.has(c.id) || activeTab !== "inbox");

    unpinnedMessages.forEach(comm => {
      if (comm.date >= today) groups[0].messages.push(comm);
      else if (comm.date >= yesterday) groups[1].messages.push(comm);
      else if (comm.date >= weekAgo) groups[2].messages.push(comm);
      else groups[3].messages.push(comm);
    });

    return { pinned: pinnedMessages, groups: groups.filter(g => g.messages.length > 0) };
  }, [filteredComms, pinnedIds, activeTab]);

  // Stats
  const stats = useMemo(() => ({
    total: activeMessages.length,
    unread: activeMessages.filter(c => !readIds.has(c.id)).length,
    mandatoryPending: activeMessages.filter(c => c.type === "Mandatory Reading" && !signedOffIds.has(c.id)).length,
    safetyWarnings: activeMessages.filter(c => c.type === "Safety Warning").length,
  }), [activeMessages, readIds, signedOffIds]);

  // Actions
  const togglePin = useCallback((id: string) => {
    setPinnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast({ title: "Unpinned" });
      } else {
        next.add(id);
        toast({ title: "Pinned" });
      }
      return next;
    });
  }, []);

  const toggleRead = useCallback((id: string) => {
    setReadIds(prev => {
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

  const deleteMessage = useCallback((id: string) => {
    setDeletedIds(prev => new Set([...prev, id]));
    setShowDetail(false);
    toast({ title: "Deleted" });
  }, []);

  const signOff = useCallback((id: string) => {
    setSignedOffIds(prev => new Set([...prev, id]));
    setReadIds(prev => new Set([...prev, id]));
    toast({ title: "Signed Off", description: "Acknowledged" });
  }, []);

  const openMessage = useCallback((comm: Communication) => {
    setSelectedMessage(comm);
    setShowDetail(true);
    setReadIds(prev => new Set([...prev, comm.id]));
  }, []);

  // Swipe handlers with improved UX
  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipingId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipingId) return;
    
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;
    
    // If scrolling vertically, cancel swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
      setSwipingId(null);
      setSwipeOffset(0);
      return;
    }
    
    // Elastic resistance at edges
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
  const handleSendMessage = () => {
    if (!messageTitle.trim() || !messageContent.trim()) {
      toast({ title: "Missing info", description: "Add a title and message", variant: "destructive" });
      return;
    }
    
    const recipientCount = recipientMode === "all" ? employees.length : selectedRecipients.length;
    if (recipientCount === 0) {
      toast({ title: "No recipients", description: "Select at least one", variant: "destructive" });
      return;
    }

    const scheduleInfo = isScheduled && scheduleDate 
      ? ` for ${format(scheduleDate, "dd MMM")} at ${scheduleTime}`
      : "";
    
    toast({
      title: isScheduled ? "Scheduled" : "Sent",
      description: `${recipientCount} recipients${scheduleInfo}`,
    });
    setShowCompose(false);
    resetCompose();
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
    setPriority("Normal");
    setSelectedJob("");
    setRecipientMode("all");
  };

  const handleUseTemplate = (template: typeof templates[0]) => {
    setSelectedType(template.type);
    setMessageContent(template.preview);
    setMessageTitle(template.name);
  };

  const formatTime = (date: string, time: string) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (date === today) return time;
    if (date === yesterday) return "Yesterday";
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const getJobRecipients = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return [];
    return employees.slice(0, job.assignedWorkers).map(e => e.id);
  };

  // Tab config for segmented control
  const tabs = [
    { id: "inbox", icon: Inbox, label: "Inbox", count: null },
    { id: "briefs", icon: Megaphone, label: "Briefs", count: null },
    { id: "safety", icon: AlertTriangle, label: "Safety", count: stats.safetyWarnings > 0 ? stats.safetyWarnings : null },
    { id: "mandatory", icon: FileCheck, label: "Sign", count: stats.mandatoryPending > 0 ? stats.mandatoryPending : null },
  ];

  // Message Card Component - Enhanced Mobile Design
  const MessageCard = ({ comm }: { comm: Communication }) => {
    const TypeIcon = typeConfig[comm.type as keyof typeof typeConfig]?.icon || MessageSquare;
    const typeColor = typeConfig[comm.type as keyof typeof typeConfig]?.color || "bg-muted";
    const borderColor = typeConfig[comm.type as keyof typeof typeConfig]?.borderColor || "border-l-muted";
    const isRead = readIds.has(comm.id);
    const isPinnedMsg = pinnedIds.has(comm.id);
    const isSignedOff = signedOffIds.has(comm.id);
    const isSwiping = swipingId === comm.id;
    
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
                {comm.message}
              </p>
              
              {/* Footer row: badges + time */}
              <div className="flex items-center justify-between mt-2.5 gap-2">
                <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                  {comm.priority === "High" && (
                    <Badge className={`text-[10px] py-0 h-5 px-1.5 gap-0.5 ${priorityColors.High}`}>
                      <Zap className="h-2.5 w-2.5" />
                      Urgent
                    </Badge>
                  )}
                  {comm.job && (
                    <Badge variant="outline" className="text-[10px] py-0 h-5 px-1.5 truncate max-w-[100px]">
                      {comm.job.split(" ")[0]}
                    </Badge>
                  )}
                  {comm.type === "Mandatory Reading" && isSignedOff && (
                    <Badge variant="outline" className="text-[10px] py-0 h-5 px-1.5 bg-success/10 text-success border-success/30 gap-0.5">
                      <Check className="h-2.5 w-2.5" />
                      Done
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                  <span>{comm.sender.split(" ")[0]}</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span>{formatTime(comm.date, comm.time)}</span>
                </div>
              </div>
            </div>
            
            {/* Right: Sign button or chevron */}
            <div className="flex items-center flex-shrink-0">
              {comm.type === "Mandatory Reading" && !isSignedOff ? (
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

  // Message Detail Sheet - Enhanced
  const MessageDetailSheet = () => {
    if (!selectedMessage) return null;
    
    const TypeIcon = typeConfig[selectedMessage.type as keyof typeof typeConfig]?.icon || MessageSquare;
    const typeColor = typeConfig[selectedMessage.type as keyof typeof typeConfig]?.color || "bg-muted";
    const isPinnedMsg = pinnedIds.has(selectedMessage.id);
    const isRead = readIds.has(selectedMessage.id);
    const isSignedOff = signedOffIds.has(selectedMessage.id);
    
    const recipientNames = selectedMessage.recipients.map(id => {
      const emp = employees.find(e => e.id === id);
      return emp?.name || "Unknown";
    });
    
    const readStatus = selectedMessage.recipients.map(id => ({
      id,
      name: employees.find(e => e.id === id)?.name || "Unknown",
      hasRead: selectedMessage.read.includes(id),
    }));
    
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
                  {selectedMessage.priority === "High" && (
                    <Badge className={`text-xs ${priorityColors.High}`}>Urgent</Badge>
                  )}
                  {isPinnedMsg && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <Pin className="h-3 w-3" />Pinned
                    </Badge>
                  )}
                </div>
                <h2 className="text-lg font-bold text-foreground mt-1 leading-tight">{selectedMessage.title}</h2>
                <div className="flex items-center gap-2 mt-1.5 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedMessage.sender}</span>
                  <span>·</span>
                  <span>{format(new Date(selectedMessage.date), "dd MMM")} at {selectedMessage.time}</span>
                </div>
              </div>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(95vh-200px)]">
            <div className="p-5 space-y-5">
              {/* Job link */}
              {selectedMessage.job && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/30 border border-border">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Job: <span className="font-medium">{selectedMessage.job}</span></span>
                </div>
              )}
              
              {/* Message content */}
              <div className="p-4 rounded-2xl bg-muted/20 border border-border">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              
              {/* Mandatory sign-off */}
              {selectedMessage.type === "Mandatory Reading" && !isSignedOff && (
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
              
              {isSignedOff && selectedMessage.type === "Mandatory Reading" && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-success/10 border border-success/30">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-success">You've signed off</span>
                </div>
              )}
              
              {/* Recipients with read status */}
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  Recipients ({recipientNames.length})
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {readStatus.map((recipient) => (
                    <div key={recipient.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                      <span className="text-sm font-medium">{recipient.name}</span>
                      {recipient.hasRead ? (
                        <span className="flex items-center gap-1.5 text-xs text-success">
                          <CheckCheck className="h-4 w-4" />
                          Read
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          {/* Sticky action bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border pb-safe">
            <div className="grid grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                size="lg"
                className="flex-col h-auto py-3 gap-1.5 rounded-xl" 
                onClick={() => togglePin(selectedMessage.id)}
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
              >
                <Reply className="h-5 w-5" />
                <span className="text-[11px]">Reply</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="flex-col h-auto py-3 gap-1.5 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10" 
                onClick={() => deleteMessage(selectedMessage.id)}
              >
                <Trash2 className="h-5 w-5" />
                <span className="text-[11px]">Delete</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  // Compose Sheet - Full screen mobile
  const ComposeSheet = () => (
    <Sheet open={showCompose} onOpenChange={setShowCompose}>
      <SheetContent side="bottom" className="h-[100vh] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setShowCompose(false)}>
            Cancel
          </Button>
          <h3 className="font-semibold text-foreground">New Message</h3>
          <Button size="sm" onClick={handleSendMessage} className="gap-1.5">
            <Send className="h-4 w-4" />
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
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={recipientMode === "all" ? "default" : "outline"}
                  className="h-11 gap-1.5 rounded-xl"
                  onClick={() => {
                    setRecipientMode("all");
                    setSelectedRecipients(employees.map(e => e.id));
                  }}
                >
                  <Users className="h-4 w-4" />
                  All
                </Button>
                <Button 
                  variant={recipientMode === "job" ? "default" : "outline"}
                  className="h-11 gap-1.5 rounded-xl"
                  onClick={() => setRecipientMode("job")}
                >
                  <Briefcase className="h-4 w-4" />
                  Job
                </Button>
                <Button 
                  variant={recipientMode === "individual" ? "default" : "outline"}
                  className="h-11 gap-1.5 rounded-xl"
                  onClick={() => setRecipientMode("individual")}
                >
                  <User className="h-4 w-4" />
                  Select
                </Button>
              </div>
              
              {recipientMode === "job" && (
                <Select 
                  value={selectedJob} 
                  onValueChange={(value) => {
                    setSelectedJob(value);
                    setSelectedRecipients(getJobRecipients(value));
                  }}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select a job..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.filter(j => j.status === "Active").map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} ({job.assignedWorkers} workers)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {recipientMode === "individual" && (
                <div className="max-h-[140px] overflow-y-auto border border-border rounded-xl p-2 space-y-1">
                  {employees.map((emp) => (
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
                  ))}
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
                  checked={priority === "High"}
                  onCheckedChange={(checked) => setPriority(checked ? "High" : "Normal")}
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

  // Empty State Component - Enhanced
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
            <p className="text-xs text-muted-foreground">{stats.unread} unread</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RotateCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
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
            {stats.unread > 0 && (
              <div className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-elec-yellow text-elec-yellow-foreground text-[10px] font-bold flex items-center justify-center px-1">
                {stats.unread}
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

      {/* Stats Bar - Glanceable */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: Inbox, value: stats.total, label: "All", active: false },
          { icon: Bell, value: stats.unread, label: "Unread", active: stats.unread > 0, color: "primary" },
          { icon: FileCheck, value: stats.mandatoryPending, label: "Sign", active: stats.mandatoryPending > 0, color: "warning" },
          { icon: AlertTriangle, value: stats.safetyWarnings, label: "Safety", active: stats.safetyWarnings > 0, color: "destructive" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className={`p-3 rounded-xl border text-center transition-all ${
                stat.active 
                  ? stat.color === "primary" ? "bg-elec-yellow/10 border-elec-yellow/30" 
                  : stat.color === "warning" ? "bg-warning/10 border-warning/30"
                  : stat.color === "destructive" ? "bg-destructive/10 border-destructive/30"
                  : "bg-elec-gray border-border"
                  : "bg-elec-gray border-border"
              }`}
            >
              <p className={`text-xl font-bold ${
                stat.active 
                  ? stat.color === "primary" ? "text-elec-yellow" 
                  : stat.color === "warning" ? "text-warning"
                  : stat.color === "destructive" ? "text-destructive"
                  : "text-foreground"
                  : "text-foreground"
              }`}>{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

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

            {/* Grouped Messages with sticky headers */}
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
    </div>
  );
};

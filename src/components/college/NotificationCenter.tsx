import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Bell,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  ClipboardCheck,
  X,
  Check,
  ChevronRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NotificationCenterProps {
  onNavigate?: (section: string) => void;
}

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const { comments, workAssignments, assessments, portfolioEvidence, resolveComment } = useCollege();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Get notifications from various sources
  const notifications = useMemo(() => {
    const items: Array<{
      id: string;
      type: "mention" | "action" | "deadline" | "update";
      title: string;
      description: string;
      contextType: string;
      contextId: string;
      authorName?: string;
      authorInitials?: string;
      authorRole?: string;
      timestamp: string;
      isRead: boolean;
      requiresAction: boolean;
      isResolved: boolean;
    }> = [];

    // Comments with @mentions or requiring action (for current user - staff-1 in mock)
    comments
      .filter(c =>
        (c.mentions.includes("staff-1") || c.actionOwner === "staff-1") &&
        !c.isResolved
      )
      .forEach(comment => {
        items.push({
          id: `comment-${comment.id}`,
          type: comment.mentions.includes("staff-1") ? "mention" : "action",
          title: comment.mentions.includes("staff-1")
            ? `${comment.authorName} mentioned you`
            : "Action required",
          description: comment.content.substring(0, 100) + (comment.content.length > 100 ? "..." : ""),
          contextType: comment.contextType,
          contextId: comment.contextId,
          authorName: comment.authorName,
          authorInitials: comment.authorInitials,
          authorRole: comment.authorRole,
          timestamp: comment.createdAt,
          isRead: false,
          requiresAction: comment.requiresAction,
          isResolved: comment.isResolved,
        });
      });

    // Work assignments pending
    workAssignments
      .filter(w => w.assignedTo === "staff-1" && w.status !== "Completed")
      .forEach(work => {
        items.push({
          id: `work-${work.id}`,
          type: "action",
          title: `${work.itemTitle}`,
          description: `Assigned by ${work.assignedByName} - ${work.priority} priority`,
          contextType: work.itemType,
          contextId: work.itemId,
          timestamp: work.createdAt,
          isRead: false,
          requiresAction: true,
          isResolved: false,
        });
      });

    // Upcoming deadlines (assessments due soon)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    assessments
      .filter(a => {
        if (!a.dueDate || a.status === "Graded") return false;
        const due = new Date(a.dueDate);
        return due >= today && due <= nextWeek;
      })
      .forEach(assessment => {
        items.push({
          id: `deadline-${assessment.id}`,
          type: "deadline",
          title: `Assessment due soon`,
          description: `${assessment.unitTitle} - Due ${new Date(assessment.dueDate!).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
          contextType: "assessment",
          contextId: assessment.id,
          timestamp: assessment.dueDate!,
          isRead: false,
          requiresAction: false,
          isResolved: false,
        });
      });

    // Sort by timestamp (newest first)
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [comments, workAssignments, assessments]);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "mentions") return notifications.filter(n => n.type === "mention");
    if (activeTab === "actions") return notifications.filter(n => n.requiresAction);
    return notifications;
  }, [notifications, activeTab]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const mentionCount = notifications.filter(n => n.type === "mention").length;
  const actionCount = notifications.filter(n => n.requiresAction && !n.isResolved).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mention": return <MessageSquare className="h-4 w-4 text-info" />;
      case "action": return <AlertCircle className="h-4 w-4 text-warning" />;
      case "deadline": return <Clock className="h-4 w-4 text-destructive" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getContextIcon = (contextType: string) => {
    switch (contextType) {
      case "evidence": return <FileText className="h-3 w-3" />;
      case "portfolio": return <FolderOpen className="h-3 w-3" />;
      case "assessment": return <ClipboardCheck className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "tutor": return "bg-info/10 text-info";
      case "assessor": return "bg-success/10 text-success";
      case "iqa": return "bg-warning/10 text-warning";
      case "student": return "bg-elec-yellow/10 text-elec-yellow";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    // Navigate to relevant section
    if (onNavigate) {
      switch (notification.contextType) {
        case "evidence":
        case "portfolio":
          onNavigate("portfolio");
          break;
        case "assessment":
          onNavigate("grading");
          break;
        case "ilp":
          onNavigate("ilpmanagement");
          break;
      }
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="text-xs h-7">
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b bg-transparent h-10">
            <TabsTrigger value="all" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none">
              All
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="mentions" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none">
              @Mentions
              {mentionCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                  {mentionCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="actions" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none">
              Actions
              {actionCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px] bg-warning/20 text-warning">
                  {actionCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px]">
            <TabsContent value={activeTab} className="m-0">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 hover:bg-muted/50 cursor-pointer transition-colors",
                        !notification.isRead && "bg-elec-yellow/5"
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex gap-3">
                        {notification.authorInitials ? (
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className={cn("text-xs font-semibold", getRoleColor(notification.authorRole))}>
                              {notification.authorInitials}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                            {getTypeIcon(notification.type)}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium line-clamp-1">
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                            {notification.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 gap-1">
                              {getContextIcon(notification.contextType)}
                              {notification.contextType}
                            </Badge>
                            {notification.requiresAction && !notification.isResolved && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-warning/10 text-warning border-warning/20">
                                Action needed
                              </Badge>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full text-xs h-8" onClick={() => setOpen(false)}>
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

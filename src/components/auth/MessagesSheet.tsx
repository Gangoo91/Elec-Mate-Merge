import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, ArrowLeft, Building2, Briefcase, Heart, Hash, GraduationCap, Send, Loader2, CheckCheck, Trash2, Bell, Clock, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hooks
import { useConversations, useElectricianConversations } from "@/hooks/useConversations";
import { useMessages, useSendMessage, useMarkAllAsRead, useTypingIndicator } from "@/hooks/useMessages";
import { useAuth } from "@/contexts/AuthContext";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

// Team chat hooks
import { useMyTeamChannels, useTeamDMConversations, useTeamChatUnread } from "@/hooks/useTeamChat";

// College chat hooks
import { useCollegeConversations } from "@/hooks/useCollegeChat";

// Admin messages
import { useAdminMessages } from "@/hooks/useAdminMessages";

// Employer components
import { ConversationList } from "@/components/employer/vacancies/ConversationList";
import { MessageList } from "@/components/employer/messaging/MessageList";
import { MessageInput } from "@/components/employer/messaging/MessageInput";

// Electrician components
import { ElectricianConversationList } from "@/components/electrician/messaging/ElectricianConversationList";

// Team chat components
import { TeamChatList, TeamChatView } from "@/components/employer/team-chat";

// College chat components
import { CollegeChatList, CollegeChatView } from "@/components/college/chat";

// Peer support
import { peerConversationService, peerMessageService, PeerConversation, PeerMessage } from "@/services/peerSupportService";
import { usePeerMessages, useSendPeerMessage, useMarkPeerMessagesAsRead } from "@/hooks/usePeerChat";

// Notifications
import { useNotifications } from "@/components/notifications/NotificationProvider";
import { PeerChatActions } from "@/components/mental-health/peer-support/PeerChatActions";

// Types
import type { Conversation, ElectricianConversation } from "@/services/conversationService";
import { deleteConversation } from "@/services/conversationService";
import type { TeamChannel, TeamDirectMessage } from "@/services/teamChatService";
import type { CollegeConversation } from "@/services/collegeChatService";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

type ActiveConversation = Conversation | ElectricianConversation;
type ChatMode = 'job' | 'team' | 'college' | 'peer' | 'admin';

interface MessagesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Peer Support Conversation List Item (simplified from MessagesDropdown)
function PeerConversationListItem({
  conversation,
  currentUserId,
  onClick,
  onDelete,
}: {
  conversation: PeerConversation;
  currentUserId: string;
  onClick: (conv: PeerConversation) => void;
  onDelete: (conv: PeerConversation) => void;
}) {
  const isSupporter = conversation.supporter?.user_id === currentUserId;
  const otherName = isSupporter
    ? (conversation.seeker?.full_name?.split(' ')[0] || 'Mate')
    : (conversation.supporter?.display_name || 'Peer Supporter');
  const initials = otherName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const timeAgo = conversation.last_message_at
    ? formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: false })
    : null;

  return (
    <Card
      className="cursor-pointer transition-all duration-200 border-border hover:border-pink-500/50 hover:shadow-md"
      onClick={() => onClick(conversation)}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-pink-200 dark:border-pink-900">
            <AvatarImage src={conversation.supporter?.avatar_url || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-500 font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate text-foreground">{otherName}</h3>
              {timeAgo && (
                <span className="text-xs text-muted-foreground shrink-0">{timeAgo}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs px-2 py-0 bg-pink-500/10 text-pink-500 border-pink-500/30">
                <Heart className="h-3 w-3 mr-1" />
                {isSupporter ? 'Supporting' : 'Peer Support'}
              </Badge>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(conversation);
            }}
            className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 flex items-center justify-center text-red-400 touch-manipulation shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// Peer Conversation List
function PeerConversationList({ onSelect }: { onSelect: (conv: PeerConversation) => void }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: conversations, isLoading } = useQuery({
    queryKey: ['peer-conversations'],
    queryFn: () => peerConversationService.getMyConversations(),
  });

  const handleDelete = async (conv: PeerConversation) => {
    if (!confirm('Delete this conversation? This cannot be undone.')) return;
    try {
      await peerMessageService.deleteConversation(conv.id);
      queryClient.invalidateQueries({ queryKey: ['peer-conversations'] });
      toast({ title: "Conversation deleted" });
    } catch (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="p-4 rounded-full bg-pink-500/10 mb-4">
          <Heart className="h-10 w-10 text-pink-500" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No Support Chats</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          Connect with a trained peer supporter for confidential support
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {conversations.map((conv) => (
        <PeerConversationListItem
          key={conv.id}
          conversation={conv}
          currentUserId={user?.id || ''}
          onClick={onSelect}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

// Peer Chat View Component - Uses centralized hooks for real-time updates
function PeerChatView({
  conversation,
  currentUserId,
  onBack,
}: {
  conversation: PeerConversation;
  currentUserId: string;
  onBack: () => void;
}) {
  const [newMessage, setNewMessage] = useState("");

  // Use centralized hooks (shared cache with MessagesDropdown and PeerSupportHub)
  const { data: messages = [], isLoading } = usePeerMessages(conversation.id);
  const sendPeerMessage = useSendPeerMessage();
  const markAsRead = useMarkPeerMessagesAsRead();

  // Mark as read on mount
  useEffect(() => {
    markAsRead.mutate(conversation.id);
  }, [conversation.id]);

  const handleSend = () => {
    if (!newMessage.trim() || sendPeerMessage.isPending) return;

    sendPeerMessage.mutate(
      { conversationId: conversation.id, content: newMessage.trim() },
      {
        onSuccess: () => setNewMessage(""),
        onError: () => {
          toast({
            title: "Failed to send",
            description: "Please try again",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-pink-500/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Start the conversation with a message
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender_id === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={cn("flex", isMine ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      isMine
                        ? "bg-pink-500 text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p
                      className={cn(
                        "text-[10px] mt-1",
                        isMine ? "text-pink-200" : "text-muted-foreground"
                      )}
                    >
                      {formatDistanceToNow(new Date(msg.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border shrink-0">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={sendPeerMessage.isPending}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sendPeerMessage.isPending}
            size="icon"
            className="bg-pink-500 hover:bg-pink-600 text-white shrink-0"
          >
            {sendPeerMessage.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Admin Chat View Component - Two-way chat with admin
function AdminChatView({
  currentUserId,
  conversationMessages,
  sendReply,
  isSending,
  markAsRead,
  deleteMessage,
  isDeleting,
}: {
  currentUserId: string;
  conversationMessages: any[];
  sendReply: (args: { message: string; subject?: string }) => Promise<any>;
  isSending: boolean;
  markAsRead: (id: string) => void;
  deleteMessage?: (id: string) => void;
  isDeleting?: boolean;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  // Safely filter out any malformed messages
  const safeMessages = (conversationMessages || []).filter(
    (msg) => msg && msg.id && msg.created_at && msg.message
  );

  // Mark unread messages as read on mount
  useEffect(() => {
    safeMessages.forEach((msg) => {
      if (msg.recipient_id === currentUserId && !msg.read_at) {
        markAsRead(msg.id);
      }
    });
  }, [safeMessages.length, currentUserId, markAsRead]);

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    try {
      await sendReply({ message: newMessage.trim(), subject: "Support Request" });
      setNewMessage("");
      toast({
        title: "Message sent",
        description: "The admin team will respond soon",
      });
    } catch (error) {
      console.error("Failed to send:", error);
      toast({
        title: "Failed to send",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDelete = (msgId: string) => {
    if (deleteMessage) {
      deleteMessage(msgId);
      setMessageToDelete(null);
      toast({
        title: "Message deleted",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {safeMessages.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-red-400/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-2">
                Need help or have feedback?
              </p>
              <p className="text-xs text-muted-foreground/70">
                Send a message to the admin team
              </p>
            </div>
          ) : (
            safeMessages.map((msg) => {
              const isFromUser = msg.sender_id === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={cn("flex group", isFromUser ? "justify-end" : "justify-start")}
                >
                  <div className="relative">
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        isFromUser
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {!isFromUser && msg.subject && msg.subject !== "Reply" && msg.subject !== "Support" && msg.subject !== "Support Request" && (
                        <p className="text-xs font-semibold mb-1 opacity-70">{msg.subject}</p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-1.5",
                        isFromUser ? "justify-end" : "justify-start"
                      )}>
                        <p
                          className={cn(
                            "text-[10px]",
                            isFromUser ? "text-blue-100" : "text-muted-foreground"
                          )}
                        >
                          {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    {/* Delete button - show on hover/tap */}
                    {deleteMessage && (
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={isDeleting}
                        className={cn(
                          "absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity",
                          "w-6 h-6 rounded-full bg-red-500/90 hover:bg-red-500 flex items-center justify-center",
                          "text-white shadow-md touch-manipulation",
                          isFromUser ? "-left-2" : "-right-2"
                        )}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border shrink-0">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message admin..."
            disabled={isSending}
            className="flex-1 h-11 touch-manipulation"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            size="icon"
            className="h-11 w-11 bg-red-500 hover:bg-red-600 text-white shrink-0 rounded-xl"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MessagesSheet({ open, onOpenChange }: MessagesSheetProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<ChatMode>('job');
  const [selectedConversation, setSelectedConversation] = useState<ActiveConversation | null>(null);
  const [selectedPeerConversation, setSelectedPeerConversation] = useState<PeerConversation | null>(null);
  const [selectedTeamChannel, setSelectedTeamChannel] = useState<TeamChannel | null>(null);
  const [selectedTeamDM, setSelectedTeamDM] = useState<TeamDirectMessage | null>(null);
  const [selectedCollegeConversation, setSelectedCollegeConversation] = useState<CollegeConversation | null>(null);
  const [selectedAdminMessage, setSelectedAdminMessage] = useState<any>(null);
  const [peerMessages, setPeerMessages] = useState<PeerMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Get notifications context for clearing localStorage notifications
  let clearAllNotifications: (() => void) | null = null;
  try {
    const notificationsContext = useNotifications();
    clearAllNotifications = notificationsContext.clearAllNotifications;
  } catch {
    // NotificationProvider not available
  }

  // Determine context based on path
  const isEmployerContext = location.pathname.startsWith('/employer');
  const isCollegeContext = location.pathname.startsWith('/college');

  // Get electrician profile
  const { profile: elecIdProfile } = useElecIdProfile();

  // Get employer ID for team chat
  const employerId = isEmployerContext ? user?.id : undefined;

  // Conversations data
  const { data: employerConversations = [], isLoading: employerLoading, totalUnread: employerUnread } = useConversations();
  const { data: electricianConversations = [], isLoading: electricianLoading, totalUnread: electricianUnread } = useElectricianConversations(elecIdProfile?.id);
  const { data: peerConversations = [] } = useQuery({
    queryKey: ['peer-conversations'],
    queryFn: () => peerConversationService.getMyConversations(),
  });
  const teamChatUnread = useTeamChatUnread(employerId);

  // College chat - only fetch when in college context to avoid 400 errors
  const { data: collegeConversations = [], totalUnread: collegeUnread } = useCollegeConversations(isCollegeContext);

  // Admin messages
  const {
    messages: adminMessages,
    conversationMessages,
    unreadCount: adminUnread,
    markAsRead: markAdminAsRead,
    markAllAsRead: markAllAdminAsRead,
    sendReply,
    isSending: isSendingReply,
    deleteMessage: deleteAdminMessage,
    deleteAllMessages: deleteAllAdminMessages,
    isDeleting: isDeletingAdmin,
  } = useAdminMessages();

  // Calculate unreads
  const jobConversations = isEmployerContext ? employerConversations : electricianConversations;
  const jobLoading = isEmployerContext ? employerLoading : electricianLoading;
  const jobUnread = isEmployerContext ? employerUnread : electricianUnread;
  const userType = isEmployerContext ? 'employer' : 'electrician';
  const peerUnread = peerConversations?.reduce((sum, c) => sum + (c.unread_count || 0), 0) || 0;
  const totalUnread = jobUnread + teamChatUnread + collegeUnread + peerUnread + adminUnread;

  // Messages for selected job conversation
  const { data: messages = [], isLoading: messagesLoading } = useMessages(selectedConversation?.id || '');
  const sendMessage = useSendMessage();
  const markAllAsRead = useMarkAllAsRead();

  // Handle deleting job conversations
  const handleDeleteJobConversation = async (conv: Conversation | ElectricianConversation) => {
    if (!confirm('Delete this conversation? This cannot be undone.')) return;
    try {
      const success = await deleteConversation(conv.id);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
        queryClient.invalidateQueries({ queryKey: ['electrician-conversations'] });
        toast({ title: "Conversation deleted" });
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversation && user) {
      markAllAsRead.mutate({
        conversationId: selectedConversation.id,
        userType: userType as 'employer' | 'electrician',
      });
    }
  }, [selectedConversation?.id, user?.id]);

  // Reset state when sheet closes
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedConversation(null);
      setSelectedPeerConversation(null);
      setSelectedTeamChannel(null);
      setSelectedTeamDM(null);
      setSelectedCollegeConversation(null);
      setSelectedAdminMessage(null);
      setPeerMessages([]);
    }
    onOpenChange(isOpen);
  };

  // Handle back to list
  const handleBack = () => {
    setSelectedConversation(null);
    setSelectedPeerConversation(null);
    setSelectedTeamChannel(null);
    setSelectedTeamDM(null);
    setSelectedCollegeConversation(null);
    setSelectedAdminMessage(null);
    setPeerMessages([]);
  };

  // Handle sending job messages
  const handleSendJobMessage = async (content: string) => {
    if (!selectedConversation || !user) return;

    // For electrician: check if they can reply
    if (!isEmployerContext && 'electrician_can_reply' in selectedConversation && !selectedConversation.electrician_can_reply) {
      toast({
        title: "Cannot Reply Yet",
        description: "Apply to a vacancy from this employer to unlock messaging.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      await sendMessage.mutateAsync({
        conversation_id: selectedConversation.id,
        sender_type: userType,
        sender_id: user.id,
        content,
        message_type: 'text',
      });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const isInChat = selectedConversation || selectedPeerConversation || selectedTeamChannel || selectedTeamDM || selectedCollegeConversation || selectedAdminMessage;
  const isInTeamChat = selectedTeamChannel || selectedTeamDM;
  const isInCollegeChat = !!selectedCollegeConversation;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "p-0 flex flex-col bg-background",
          isMobile ? "h-[95vh] rounded-t-2xl" : "w-[420px] max-w-[420px]"
        )}
      >
        {/* List View */}
        {!isInChat ? (
          <>
            <SheetHeader className="p-4 border-b border-border shrink-0">
              <SheetTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
                Messages
                {totalUnread > 0 && (
                  <Badge className="bg-elec-yellow text-black">
                    {totalUnread}
                  </Badge>
                )}
                {totalUnread > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      // Mark all job conversations as read
                      jobConversations.forEach((conv) => {
                        const unreadCount = 'unread_employer' in conv
                          ? (isEmployerContext ? conv.unread_employer : conv.unread_electrician)
                          : 0;
                        if (unreadCount > 0) {
                          markAllAsRead.mutate({
                            conversationId: conv.id,
                            userType: userType as 'employer' | 'electrician',
                          });
                        }
                      });

                      // Mark all peer messages as read
                      if (peerUnread > 0) {
                        try {
                          await peerMessageService.markAllAsRead();
                          queryClient.invalidateQueries({ queryKey: ['peer-conversations'] });
                        } catch (e) {
                          console.error('Failed to clear peer messages:', e);
                        }
                      }

                      // Clear localStorage notifications
                      if (clearAllNotifications) {
                        clearAllNotifications();
                      }

                      toast({
                        title: "All cleared",
                        description: "All messages marked as read",
                      });
                    }}
                    className="ml-auto h-8 text-xs text-white/70 hover:text-white"
                  >
                    <CheckCheck className="h-4 w-4 mr-1" />
                    Clear all
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>

            {/* Tabs for different message types */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ChatMode)} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-4 mt-2 grid grid-cols-3 shrink-0 h-12 p-1 bg-muted/50 rounded-xl">
                {/* Jobs Tab */}
                <TabsTrigger value="job" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-xs font-medium">Jobs</span>
                  {jobUnread > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-elec-yellow text-black text-[10px] font-bold flex items-center justify-center">
                      {jobUnread}
                    </span>
                  )}
                </TabsTrigger>

                {/* Mates Tab (for non-college) / Team Tab (for employer) / College Tab */}
                {isEmployerContext ? (
                  <TabsTrigger value="team" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Hash className="h-4 w-4" />
                    <span className="text-xs font-medium">Team</span>
                    {teamChatUnread > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {teamChatUnread}
                      </span>
                    )}
                  </TabsTrigger>
                ) : isCollegeContext ? (
                  <TabsTrigger value="college" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-xs font-medium">College</span>
                    {collegeUnread > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {collegeUnread}
                      </span>
                    )}
                  </TabsTrigger>
                ) : (
                  <TabsTrigger value="peer" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs font-medium">Mates</span>
                    {peerUnread > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {peerUnread}
                      </span>
                    )}
                  </TabsTrigger>
                )}

                {/* Admin Tab - Always show */}
                <TabsTrigger value="admin" className="gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-medium">Admin</span>
                  {adminUnread > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {adminUnread}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <TabsContent value="job" className="m-0 p-4">
                    {isEmployerContext ? (
                      <ConversationList
                        conversations={employerConversations}
                        isLoading={employerLoading}
                        onSelect={(conv) => setSelectedConversation(conv)}
                        onDelete={handleDeleteJobConversation}
                      />
                    ) : (
                      <ElectricianConversationList
                        conversations={electricianConversations}
                        isLoading={electricianLoading}
                        onSelect={(conv) => setSelectedConversation(conv)}
                        onDelete={handleDeleteJobConversation}
                      />
                    )}
                  </TabsContent>

                  {isEmployerContext && (
                    <TabsContent value="team" className="m-0">
                      <TeamChatList
                        employerId={employerId || ''}
                        onSelectChannel={setSelectedTeamChannel}
                        onSelectDM={setSelectedTeamDM}
                      />
                    </TabsContent>
                  )}

                  {isCollegeContext && (
                    <TabsContent value="college" className="m-0">
                      <CollegeChatList
                        conversations={collegeConversations}
                        onSelect={setSelectedCollegeConversation}
                        userType="staff"
                      />
                    </TabsContent>
                  )}

                  {!isCollegeContext && (
                    <TabsContent value="peer" className="m-0">
                      <PeerConversationList onSelect={setSelectedPeerConversation} />
                    </TabsContent>
                  )}

                  {/* Admin Messages Tab */}
                  <TabsContent value="admin" className="m-0 p-4">
                    {adminMessages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                          <Shield className="h-8 w-8 text-red-400/50" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">No messages yet</h3>
                        <p className="text-sm text-muted-foreground max-w-[200px]">
                          Contact the admin team for help or support
                        </p>
                        {/* Start conversation button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 h-10 touch-manipulation border-red-500/30 text-red-400 hover:bg-red-500/10"
                          onClick={() => setSelectedAdminMessage({ id: 'new', subject: 'New Message' })}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Message Admin
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Actions header */}
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 touch-manipulation text-xs"
                            onClick={() => setSelectedAdminMessage({ id: 'new', subject: 'New Message' })}
                          >
                            <Send className="h-3.5 w-3.5 mr-1.5" />
                            New Message
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => {
                              if (confirm('Delete all messages? This cannot be undone.')) {
                                deleteAllAdminMessages();
                                toast({ title: "All messages deleted" });
                              }
                            }}
                            disabled={isDeletingAdmin}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Clear All
                          </Button>
                        </div>
                        {adminMessages.map((msg) => {
                          const isUnread = msg.recipient_id === user?.id && !msg.read_at;
                          const isFromUser = msg.sender_id === user?.id;
                          return (
                            <div
                              key={msg.id}
                              className={cn(
                                "relative group flex items-start gap-3 p-4 rounded-xl text-left transition-all",
                                isUnread
                                  ? "bg-elec-yellow/10 border border-elec-yellow/20"
                                  : isFromUser
                                  ? "bg-blue-500/5 border border-blue-500/10"
                                  : "bg-muted/30 border border-transparent"
                              )}
                            >
                              {/* Click area for opening chat */}
                              <button
                                onClick={() => {
                                  setSelectedAdminMessage(msg);
                                  if (!msg.read_at && msg.recipient_id === user?.id) {
                                    markAdminAsRead(msg.id);
                                  }
                                }}
                                className="absolute inset-0 touch-manipulation"
                              />

                              {/* Icon */}
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10",
                                isFromUser
                                  ? "bg-blue-500/20"
                                  : isUnread ? "bg-red-500/20" : "bg-muted"
                              )}>
                                {isFromUser ? (
                                  <Send className="h-5 w-5 text-blue-400" />
                                ) : (
                                  <Shield className={cn(
                                    "h-5 w-5",
                                    isUnread ? "text-red-400" : "text-muted-foreground"
                                  )} />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0 relative z-10 pointer-events-none">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <p className={cn(
                                      "text-sm leading-tight",
                                      isUnread ? "font-semibold text-foreground" : "text-foreground/80"
                                    )}>
                                      {isFromUser ? "You" : "Admin"}
                                    </p>
                                    {isFromUser && (
                                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                                        Sent
                                      </Badge>
                                    )}
                                  </div>
                                  {isUnread && (
                                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {msg.message}
                                </p>
                                <p className="text-[10px] text-muted-foreground/60 mt-2">
                                  {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                </p>
                              </div>

                              {/* Delete button - always visible on mobile */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteAdminMessage(msg.id);
                                }}
                                disabled={isDeletingAdmin}
                                className="relative z-10 w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 flex items-center justify-center text-red-400 touch-manipulation shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>
                </ScrollArea>
              </div>
            </Tabs>
          </>
        ) : (
          // Chat View
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b border-border shrink-0">
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {selectedConversation && ('company_name' in selectedConversation ? selectedConversation.company_name : selectedConversation.vacancy_title)}
                  {selectedTeamChannel && `#${selectedTeamChannel.name}`}
                  {selectedTeamDM && 'Direct Message'}
                  {selectedCollegeConversation && selectedCollegeConversation.title}
                  {selectedPeerConversation && (
                    selectedPeerConversation.supporter?.user_id === user?.id
                      ? (selectedPeerConversation.seeker?.full_name?.split(' ')[0] || 'Mate')
                      : (selectedPeerConversation.supporter?.display_name || 'Peer Supporter')
                  )}
                  {selectedAdminMessage && 'Admin Support'}
                </h3>
              </div>
              {/* Peer Chat Actions */}
              {selectedPeerConversation && (
                <PeerChatActions
                  otherUserId={
                    selectedPeerConversation.supporter?.user_id === user?.id
                      ? selectedPeerConversation.seeker_id
                      : (selectedPeerConversation.supporter?.user_id || '')
                  }
                  otherUserName={
                    selectedPeerConversation.supporter?.user_id === user?.id
                      ? (selectedPeerConversation.seeker?.full_name?.split(' ')[0] || 'Mate')
                      : (selectedPeerConversation.supporter?.display_name || 'Peer Supporter')
                  }
                  conversationId={selectedPeerConversation.id}
                  onBlocked={() => {
                    handleBack();
                    queryClient.invalidateQueries({ queryKey: ['peer-conversations'] });
                  }}
                />
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              {isInTeamChat && (
                <TeamChatView
                  channel={selectedTeamChannel}
                  directMessage={selectedTeamDM}
                  employerId={employerId || ''}
                  onBack={handleBack}
                />
              )}
              {isInCollegeChat && selectedCollegeConversation && (
                <CollegeChatView
                  conversation={selectedCollegeConversation}
                  userType="staff"
                  onBack={handleBack}
                />
              )}
              {selectedConversation && (
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1 p-4">
                    <MessageList
                      messages={messages}
                      isLoading={messagesLoading}
                      currentUserId={user?.id || ''}
                    />
                  </ScrollArea>
                  <div className="p-4 border-t border-border shrink-0">
                    <MessageInput
                      onSend={handleSendJobMessage}
                      isSending={isSending}
                      disabled={!isEmployerContext && 'electrician_can_reply' in selectedConversation && !selectedConversation.electrician_can_reply}
                    />
                  </div>
                </div>
              )}
              {/* Peer Chat View */}
              {selectedPeerConversation && (
                <PeerChatView
                  conversation={selectedPeerConversation}
                  currentUserId={user?.id || ''}
                  onBack={handleBack}
                />
              )}

              {/* Admin Chat View - Two-way conversation */}
              {selectedAdminMessage && (
                <AdminChatView
                  currentUserId={user?.id || ''}
                  conversationMessages={conversationMessages}
                  sendReply={sendReply}
                  isSending={isSendingReply}
                  markAsRead={markAdminAsRead}
                  deleteMessage={deleteAdminMessage}
                  isDeleting={isDeletingAdmin}
                />
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

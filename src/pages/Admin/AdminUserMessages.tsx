import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  MessageSquare,
  Send,
  RefreshCw,
  Loader2,
  Inbox,
  User,
  Clock,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AdminMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  message: string;
  message_type: "email" | "in_app" | "both";
  read_at: string | null;
  created_at: string;
}

interface ConversationPartner {
  partnerId: string;
  partner: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
  } | null;
  lastMessage: AdminMessage;
  unreadCount: number;
  messages: AdminMessage[];
}

export default function AdminUserMessages() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<ConversationPartner | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Fetch all admin messages and group by conversation partner
  const { data: conversations, isLoading, refetch } = useQuery({
    queryKey: ["admin-user-messages"],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("admin_messages")
        .select(`
          id,
          sender_id,
          recipient_id,
          subject,
          message,
          message_type,
          read_at,
          created_at,
          sender:profiles!admin_messages_sender_id_fkey(id, full_name, avatar_url, role, admin_role),
          recipient:profiles!admin_messages_recipient_id_fkey(id, full_name, avatar_url, role, admin_role)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
        return [];
      }

      // Group by conversation partner (non-admin user)
      const conversationMap = new Map<string, ConversationPartner>();

      data?.forEach((msg: any) => {
        // Determine who the non-admin partner is (check admin_role field)
        const senderIsAdmin = !!msg.sender?.admin_role || msg.sender_id === user.id;
        const partnerId = senderIsAdmin ? msg.recipient_id : msg.sender_id;
        const partner = senderIsAdmin ? msg.recipient : msg.sender;

        // Skip if partner is also an admin (admin-to-admin messages)
        if (partner?.admin_role) {
          return;
        }

        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId,
            partner,
            lastMessage: msg,
            unreadCount: 0,
            messages: [],
          });
        }

        const conv = conversationMap.get(partnerId)!;
        conv.messages.push(msg);

        // Count unread messages TO admin (from user)
        if (msg.recipient_id === user.id && !msg.read_at) {
          conv.unreadCount++;
        }
      });

      // Sort messages within each conversation chronologically
      conversationMap.forEach((conv) => {
        conv.messages.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      return Array.from(conversationMap.values());
    },
    enabled: !!user?.id,
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
  });

  // Filter conversations by search
  const filteredConversations = conversations?.filter((conv) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      conv.partner?.full_name?.toLowerCase().includes(searchLower) ||
      conv.lastMessage.message?.toLowerCase().includes(searchLower)
    );
  });

  // Mark messages as read
  const markAsReadMutation = useMutation({
    mutationFn: async (messageIds: string[]) => {
      const { error } = await supabase
        .from("admin_messages")
        .update({ read_at: new Date().toISOString() })
        .in("id", messageIds)
        .eq("recipient_id", user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-messages"] });
    },
  });

  // Send reply
  const sendReplyMutation = useMutation({
    mutationFn: async ({ recipientId, message }: { recipientId: string; message: string }) => {
      const { error } = await supabase.from("admin_messages").insert({
        sender_id: user?.id,
        recipient_id: recipientId,
        subject: "Reply",
        message,
        message_type: "in_app",
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-messages"] });
      setReplyMessage("");
      toast({ title: "Reply sent" });
    },
    onError: (error) => {
      toast({
        title: "Failed to send",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle opening a conversation
  const handleOpenConversation = (conv: ConversationPartner) => {
    setSelectedConversation(conv);

    // Mark unread messages as read
    const unreadIds = conv.messages
      .filter((m) => m.recipient_id === user?.id && !m.read_at)
      .map((m) => m.id);

    if (unreadIds.length > 0) {
      markAsReadMutation.mutate(unreadIds);
    }
  };

  // Handle sending reply
  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedConversation) return;

    sendReplyMutation.mutate({
      recipientId: selectedConversation.partnerId,
      message: replyMessage.trim(),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  // Stats
  const totalUnread = conversations?.reduce((sum, c) => sum + c.unreadCount, 0) || 0;
  const totalConversations = conversations?.length || 0;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-3 sm:pt-4 sm:pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg sm:text-xl font-bold">{totalConversations}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Conversations</p>
              </div>
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-3 sm:pt-4 sm:pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg sm:text-xl font-bold">{totalUnread}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Unread</p>
              </div>
              <Inbox className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex gap-3">
            <AdminSearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search messages..."
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 touch-manipulation"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversations List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4">
                <div className="h-16 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredConversations?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={Inbox}
              title="No user messages"
              description="Messages from users will appear here when they contact you via the Updates tab."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredConversations?.map((conv) => (
            <Card
              key={conv.partnerId}
              className={cn(
                "touch-manipulation active:scale-[0.99] transition-all cursor-pointer",
                conv.unreadCount > 0 && "border-amber-500/30 bg-amber-500/5"
              )}
              onClick={() => handleOpenConversation(conv)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage src={conv.partner?.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 font-semibold">
                      {conv.partner?.full_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate">
                        {conv.partner?.full_name || "Unknown User"}
                      </p>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-amber-500 text-black text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {conv.lastMessage.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(conv.lastMessage.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Conversation Detail Sheet */}
      <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={selectedConversation?.partner?.avatar_url || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 font-semibold text-sm">
                    {selectedConversation?.partner?.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <SheetTitle className="text-left text-base">
                    {selectedConversation?.partner?.full_name || "Unknown User"}
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation?.messages.length} messages
                  </p>
                </div>
              </div>
            </SheetHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {selectedConversation?.messages.map((msg) => {
                  const isFromUser = msg.sender_id === selectedConversation.partnerId;
                  return (
                    <div
                      key={msg.id}
                      className={cn("flex", isFromUser ? "justify-start" : "justify-end")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3",
                          isFromUser
                            ? "bg-muted text-foreground rounded-bl-md"
                            : "bg-blue-500 text-white rounded-br-md"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        <div
                          className={cn(
                            "flex items-center gap-2 mt-1.5",
                            isFromUser ? "justify-start" : "justify-end"
                          )}
                        >
                          <p
                            className={cn(
                              "text-[10px]",
                              isFromUser ? "text-muted-foreground" : "text-blue-100"
                            )}
                          >
                            {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                          </p>
                          {!isFromUser && msg.read_at && (
                            <CheckCheck className="h-3 w-3 text-blue-100" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Reply Input */}
            <div className="p-4 border-t border-border shrink-0">
              <div className="flex gap-2">
                <Input
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your reply..."
                  disabled={sendReplyMutation.isPending}
                  className="flex-1 h-11 touch-manipulation"
                />
                <Button
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim() || sendReplyMutation.isPending}
                  size="icon"
                  className="h-11 w-11 bg-blue-500 hover:bg-blue-600 text-white shrink-0 rounded-xl"
                >
                  {sendReplyMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

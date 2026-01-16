import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { AdminMessageCard } from "@/components/admin/cards/AdminMessageCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MessageSquare,
  Clock,
  Trash2,
  ThumbsUp,
  ChevronRight,
  AlertTriangle,
  MessageCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

// Static color map - extracted to module scope for performance
const CATEGORY_COLORS: Record<string, string> = {
  general: "bg-blue-500/20 text-blue-400",
  technical: "bg-purple-500/20 text-purple-400",
  jobs: "bg-green-500/20 text-green-400",
  study: "bg-amber-500/20 text-amber-400",
  default: "bg-gray-500/20 text-gray-400",
};

const getCategoryColor = (category: string | null): string =>
  CATEGORY_COLORS[category || ""] || CATEGORY_COLORS.default;

interface ChatMessage {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string | null;
  content: string;
  category: string | null;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

export default function AdminConversations() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch chat stats via edge function
  const { data: stats } = useQuery({
    queryKey: ["admin-chat-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-manage-conversations", {
        body: { action: "stats" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as { total: number; today: number; categories: number };
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 30000,
  });

  // Fetch messages via edge function
  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ["admin-chat-messages", search, categoryFilter],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-manage-conversations", {
        body: { action: "list", category: categoryFilter, limit: 100 },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      let filtered = (data?.messages || []) as ChatMessage[];
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.content?.toLowerCase().includes(searchLower) ||
            m.author_name?.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    staleTime: 2 * 60 * 1000,
  });

  // Get unique categories from messages - memoized to avoid recreation
  const categories = useMemo(
    () => [...new Set(messages?.map(m => m.category).filter(Boolean))] as string[],
    [messages]
  );

  // Delete message mutation via edge function
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-conversations", {
        body: { action: "delete", messageId: id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-chat-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-chat-stats"] });
      setDeleteConfirmId(null);
      setSelectedMessage(null);
      toast({
        title: "Message deleted",
        description: "The message has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Memoized callback for message click
  const handleMessageClick = useCallback((message: ChatMessage) => {
    setSelectedMessage(message);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.total || 0}</p>
                <p className="text-xs text-muted-foreground">Total Messages</p>
              </div>
              <MessageSquare className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.today || 0}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <Clock className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{stats?.categories || 0}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <MessageCircle className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <AdminSearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search messages..."
              className="flex-1"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-12 touch-manipulation">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0 touch-manipulation"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
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
      ) : messages?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={MessageSquare}
              title="No messages found"
              description="Chat messages will appear here."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {messages?.map((message) => (
            <AdminMessageCard
              key={message.id}
              message={message}
              onClick={handleMessageClick}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      )}

      {/* Message Detail Sheet */}
      <Sheet open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <p>{selectedMessage?.author_name}</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {selectedMessage?.created_at && formatDistanceToNow(new Date(selectedMessage.created_at), { addSuffix: true })}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Message Content */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    Message Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage?.content}</p>
                </CardContent>
              </Card>

              {/* Message Meta */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge className={getCategoryColor(selectedMessage?.category || null)}>
                      {selectedMessage?.category || "none"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Upvotes</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {selectedMessage?.upvotes || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Author ID</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {selectedMessage?.author_id?.slice(0, 8)}...
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Footer */}
            {isSuperAdmin && (
              <SheetFooter className="p-4 border-t border-border">
                <Button
                  variant="destructive"
                  className="w-full h-12 touch-manipulation gap-2"
                  onClick={() => setDeleteConfirmId(selectedMessage?.id || null)}
                  disabled={deleteMessageMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Message
                </Button>
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Message?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The message will be permanently removed from the chat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation" disabled={deleteMessageMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => deleteConfirmId && deleteMessageMutation.mutate(deleteConfirmId)}
              disabled={deleteMessageMutation.isPending}
            >
              {deleteMessageMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

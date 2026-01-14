import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Search,
  MessageSquare,
  Users,
  Clock,
  Trash2,
  Flag,
  ThumbsUp,
  ChevronRight,
  AlertTriangle,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

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

  // Fetch chat stats
  const { data: stats } = useQuery({
    queryKey: ["admin-chat-stats"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [totalRes, todayRes, categoriesRes] = await Promise.all([
        supabase.from("global_chat_messages").select("*", { count: "exact", head: true }),
        supabase.from("global_chat_messages").select("*", { count: "exact", head: true })
          .gte("created_at", today.toISOString()),
        supabase.from("global_chat_messages").select("category"),
      ]);

      // Count unique categories
      const categories = new Set(categoriesRes.data?.map(m => m.category).filter(Boolean));

      return {
        total: totalRes.count || 0,
        today: todayRes.count || 0,
        categories: categories.size,
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 30000,
  });

  // Fetch messages
  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ["admin-chat-messages", search, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from("global_chat_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as ChatMessage[];
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
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  // Get unique categories for filter
  const { data: categories } = useQuery({
    queryKey: ["admin-chat-categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("global_chat_messages")
        .select("category")
        .not("category", "is", null);

      const uniqueCategories = [...new Set(data?.map(m => m.category).filter(Boolean))];
      return uniqueCategories as string[];
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("global_chat_messages")
        .delete()
        .eq("id", id);
      if (error) throw error;
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

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case "general":
        return "bg-blue-500/20 text-blue-400";
      case "technical":
        return "bg-purple-500/20 text-purple-400";
      case "jobs":
        return "bg-green-500/20 text-green-400";
      case "study":
        return "bg-amber-500/20 text-amber-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 touch-manipulation"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-11 touch-manipulation">
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
              className="h-11 w-11 shrink-0 touch-manipulation"
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
          <CardContent className="pt-6 text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No messages found</h3>
            <p className="text-sm text-muted-foreground">
              Chat messages will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {messages?.map((message) => (
            <Card
              key={message.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedMessage(message)}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm truncate">{message.author_name}</p>
                      {message.category && (
                        <Badge className={`${getCategoryColor(message.category)} text-[10px] py-0`}>
                          {message.category}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                      </span>
                      {message.upvotes > 0 && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {message.upvotes}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
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
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => deleteConfirmId && deleteMessageMutation.mutate(deleteConfirmId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

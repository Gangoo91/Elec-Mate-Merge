import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Search,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  Clock,
  AlertCircle,
  Send,
  Inbox,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface EmailLog {
  id: string;
  to_email: string;
  from_email: string | null;
  subject: string;
  template_name: string | null;
  status: "pending" | "sent" | "delivered" | "failed" | "bounced";
  provider: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  metadata: any;
  created_at: string;
  sent_at: string | null;
  profiles?: { full_name: string; username: string };
}

export default function AdminEmailLogs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);

  // Fetch email logs
  const { data: emails, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-email-logs", search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("email_logs")
        .select(`*`)
        .order("created_at", { ascending: false })
        .limit(200);

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as EmailLog[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (e) =>
            e.to_email.toLowerCase().includes(s) ||
            e.subject.toLowerCase().includes(s) ||
            e.template_name?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  // Get email stats
  const { data: stats } = useQuery({
    queryKey: ["admin-email-stats"],
    queryFn: async () => {
      const [sentRes, failedRes, totalRes] = await Promise.all([
        supabase.from("email_logs").select("*", { count: "exact", head: true }).eq("status", "sent"),
        supabase.from("email_logs").select("*", { count: "exact", head: true }).eq("status", "failed"),
        supabase.from("email_logs").select("*", { count: "exact", head: true }),
      ]);
      return {
        sent: sentRes.count || 0,
        failed: failedRes.count || 0,
        total: totalRes.count || 0,
        deliveryRate: totalRes.count ? ((sentRes.count || 0) / totalRes.count * 100) : 0,
      };
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
      case "delivered":
        return <Check className="h-4 w-4 text-green-400" />;
      case "failed":
      case "bounced":
        return <X className="h-4 w-4 text-red-400" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-400" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      sent: "bg-green-500/20 text-green-400",
      delivered: "bg-green-500/20 text-green-400",
      failed: "bg-red-500/20 text-red-400",
      bounced: "bg-red-500/20 text-red-400",
      pending: "bg-amber-500/20 text-amber-400",
    };
    return <Badge className={styles[status] || ""}>{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Email Logs</h2>
          <p className="text-xs text-muted-foreground">{emails?.length || 0} emails tracked</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 touch-manipulation"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-lg font-bold">{stats?.total || 0}</p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-lg font-bold">{stats?.sent || 0}</p>
                <p className="text-[10px] text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-lg font-bold">{stats?.failed || 0}</p>
                <p className="text-[10px] text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-lg font-bold">{(stats?.deliveryRate || 0).toFixed(0)}%</p>
                <p className="text-[10px] text-muted-foreground">Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 touch-manipulation"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px] h-11 touch-manipulation">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-14 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : emails?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No emails logged</h3>
            <p className="text-sm text-muted-foreground">Email activity will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-1">
          {emails?.map((email) => (
            <Card
              key={email.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedEmail(email)}
            >
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      email.status === "sent" || email.status === "delivered"
                        ? "bg-green-500/10"
                        : email.status === "failed" || email.status === "bounced"
                        ? "bg-red-500/10"
                        : "bg-amber-500/10"
                    }`}>
                      {getStatusIcon(email.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{email.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span className="truncate">{email.to_email}</span>
                        <span>·</span>
                        <span>{formatDistanceToNow(new Date(email.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {getStatusBadge(email.status)}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Email Detail Sheet */}
      <Sheet open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2 text-left">
                {selectedEmail && getStatusIcon(selectedEmail.status)}
                <span className="truncate">{selectedEmail?.subject}</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Email Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">To</span>
                    <span className="text-sm">{selectedEmail?.to_email}</span>
                  </div>
                  {selectedEmail?.from_email && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">From</span>
                      <span className="text-sm">{selectedEmail.from_email}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {selectedEmail && getStatusBadge(selectedEmail.status)}
                  </div>
                  {selectedEmail?.template_name && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Template</span>
                      <Badge variant="outline">{selectedEmail.template_name}</Badge>
                    </div>
                  )}
                  {selectedEmail?.provider && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Provider</span>
                      <span className="text-sm">{selectedEmail.provider}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm">
                      {selectedEmail?.created_at && format(new Date(selectedEmail.created_at), "dd MMM yyyy HH:mm")}
                    </span>
                  </div>
                  {selectedEmail?.sent_at && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sent</span>
                      <span className="text-sm">
                        {format(new Date(selectedEmail.sent_at), "dd MMM yyyy HH:mm")}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedEmail?.error_message && (
                <Card className="border-red-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Error
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-300">{selectedEmail.error_message}</p>
                  </CardContent>
                </Card>
              )}

              {selectedEmail?.provider_message_id && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Provider Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-mono text-muted-foreground break-all">
                      Message ID: {selectedEmail.provider_message_id}
                    </p>
                  </CardContent>
                </Card>
              )}

              {selectedEmail?.metadata && Object.keys(selectedEmail.metadata).length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Metadata</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedEmail.metadata, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

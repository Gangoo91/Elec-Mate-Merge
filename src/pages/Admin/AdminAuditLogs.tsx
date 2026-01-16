import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  History,
  ChevronRight,
  RefreshCw,
  Shield,
  Settings,
  Trash2,
  Edit,
  Plus,
  Eye,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

// Static action badge styles - extracted to module scope for performance
const ACTION_BADGE_STYLES: Record<string, string> = {
  create: "bg-green-500/20 text-green-400",
  update: "bg-blue-500/20 text-blue-400",
  delete: "bg-red-500/20 text-red-400",
};

const getActionType = (action: string): string => {
  if (action.includes("create")) return "create";
  if (action.includes("update")) return "update";
  if (action.includes("delete")) return "delete";
  return action.split("_")[0];
};

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: any;
  new_values: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  profiles?: { full_name: string; username: string };
}

export default function AdminAuditLogs() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Fetch audit logs
  const { data: logs, isLoading, refetch } = useQuery({
    queryKey: ["admin-audit-logs", search, actionFilter],
    queryFn: async () => {
      let query = supabase
        .from("admin_audit_logs")
        .select(`*, profiles:user_id (full_name, username)`)
        .order("created_at", { ascending: false })
        .limit(200);

      if (actionFilter !== "all") {
        query = query.ilike("action", `%${actionFilter}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as AuditLog[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.action.toLowerCase().includes(s) ||
            l.entity_type.toLowerCase().includes(s) ||
            l.profiles?.full_name?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  const getActionIcon = (action: string) => {
    if (action.includes("create") || action.includes("insert")) return <Plus className="h-4 w-4 text-green-400" />;
    if (action.includes("update") || action.includes("edit")) return <Edit className="h-4 w-4 text-blue-400" />;
    if (action.includes("delete") || action.includes("remove")) return <Trash2 className="h-4 w-4 text-red-400" />;
    if (action.includes("view") || action.includes("read")) return <Eye className="h-4 w-4 text-gray-400" />;
    if (action.includes("login") || action.includes("auth")) return <Shield className="h-4 w-4 text-purple-400" />;
    return <Settings className="h-4 w-4 text-amber-400" />;
  };

  const getActionBadge = (action: string) => {
    const actionType = getActionType(action);
    const style = ACTION_BADGE_STYLES[actionType];
    if (style) return <Badge className={style}>{actionType}</Badge>;
    return <Badge variant="outline">{actionType}</Badge>;
  };

  // Get unique entity types for filter - memoized to avoid recreation
  const entityTypes = useMemo(
    () => [...new Set(logs?.map((l) => l.entity_type) || [])],
    [logs]
  );

  // Pagination
  const totalPages = Math.ceil((logs?.length || 0) / itemsPerPage);
  const paginatedLogs = useMemo(() => {
    if (!logs) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return logs.slice(start, start + itemsPerPage);
  }, [logs, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, actionFilter]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Audit Logs</h2>
          <p className="text-xs text-muted-foreground">{logs?.length || 0} recent actions</p>
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex gap-3">
            <AdminSearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search logs..."
              className="flex-1"
            />
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[120px] h-12 touch-manipulation">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="login">Login</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-14 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : logs?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={History}
              title="No audit logs"
              description="Activity will be logged here when actions are performed."
            />
          </CardContent>
        </Card>
      ) : (
        <>
        <div className="space-y-1">
          {paginatedLogs.map((log) => (
            <Card
              key={log.id}
              className="touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
              onClick={() => setSelectedLog(log)}
            >
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {getActionIcon(log.action)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{log.action}</p>
                        {getActionBadge(log.action)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{log.profiles?.full_name || "System"}</span>
                        <span>·</span>
                        <span>{log.entity_type}</span>
                        <span>·</span>
                        <span>{formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={logs?.length || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
            className="mt-4"
          />
        )}
        </>
      )}

      {/* Log Detail Sheet */}
      <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                {selectedLog && getActionIcon(selectedLog.action)}
                {selectedLog?.action}
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User</span>
                    <span className="text-sm">{selectedLog?.profiles?.full_name || "System"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Entity Type</span>
                    <span className="text-sm font-mono">{selectedLog?.entity_type}</span>
                  </div>
                  {selectedLog?.entity_id && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Entity ID</span>
                      <span className="text-xs font-mono text-muted-foreground">{selectedLog.entity_id.slice(0, 8)}...</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm">
                      {selectedLog?.created_at && format(new Date(selectedLog.created_at), "dd MMM yyyy HH:mm:ss")}
                    </span>
                  </div>
                  {selectedLog?.ip_address && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">IP Address</span>
                      <span className="text-sm font-mono">{selectedLog.ip_address}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedLog?.old_values && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-400">Old Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedLog.old_values, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {selectedLog?.new_values && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-400">New Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedLog.new_values, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {selectedLog?.user_agent && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">User Agent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground break-all">{selectedLog.user_agent}</p>
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

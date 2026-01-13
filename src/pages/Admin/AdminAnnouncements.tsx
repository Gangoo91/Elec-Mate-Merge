import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Megaphone,
  Plus,
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  target_roles: string[];
  is_active: boolean;
  is_dismissible: boolean;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
  created_by: string;
  dismissal_count?: number;
}

const defaultAnnouncement = {
  title: "",
  message: "",
  type: "info" as const,
  target_roles: ["visitor", "apprentice", "electrician", "employer"],
  is_dismissible: true,
  ends_at: "",
};

export default function AdminAnnouncements() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultAnnouncement);

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch announcements
  const { data: announcements, isLoading } = useQuery({
    queryKey: ["admin-announcements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get dismissal counts
      const { data: dismissals } = await supabase
        .from("admin_announcement_dismissals")
        .select("announcement_id");

      const dismissalCounts: Record<string, number> = {};
      dismissals?.forEach((d) => {
        dismissalCounts[d.announcement_id] = (dismissalCounts[d.announcement_id] || 0) + 1;
      });

      return (data as Announcement[]).map((a) => ({
        ...a,
        dismissal_count: dismissalCounts[a.id] || 0,
      }));
    },
  });

  // Create announcement
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("admin_announcements").insert({
        title: data.title,
        message: data.message,
        type: data.type,
        target_roles: data.target_roles,
        is_dismissible: data.is_dismissible,
        ends_at: data.ends_at || null,
        created_by: profile?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      setCreateOpen(false);
      setFormData(defaultAnnouncement);
      toast({ title: "Announcement created", description: "Your announcement is now live." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Update announcement
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Announcement> }) => {
      const { error } = await supabase
        .from("admin_announcements")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      setEditAnnouncement(null);
      toast({ title: "Announcement updated" });
    },
  });

  // Delete announcement
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("admin_announcements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      setDeleteId(null);
      toast({ title: "Announcement deleted" });
    },
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info": return <Info className="h-4 w-4 text-blue-400" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "error": return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      success: "bg-green-500/20 text-green-400 border-green-500/30",
      error: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return <Badge className={colors[type] || ""}>{type}</Badge>;
  };

  const activeCount = announcements?.filter((a) => a.is_active).length || 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Announcements</h2>
          <p className="text-xs text-muted-foreground">{activeCount} active announcements</p>
        </div>
        <Button
          className="h-11 gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 touch-manipulation"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      {/* Announcements List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-16 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : announcements?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No announcements</h3>
            <p className="text-sm text-muted-foreground mb-4">Create your first announcement to notify users.</p>
            <Button onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Create Announcement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {announcements?.map((announcement) => (
            <Card
              key={announcement.id}
              className={`touch-manipulation active:scale-[0.99] transition-transform ${!announcement.is_active ? "opacity-60" : ""}`}
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      announcement.type === "info" ? "bg-blue-500/10" :
                      announcement.type === "warning" ? "bg-amber-500/10" :
                      announcement.type === "success" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}>
                      {getTypeIcon(announcement.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{announcement.title}</p>
                        {getTypeBadge(announcement.type)}
                        {!announcement.is_active && (
                          <Badge variant="outline" className="text-[10px]">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{announcement.message}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {announcement.target_roles.length} roles
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {announcement.dismissal_count} dismissed
                        </span>
                        <span>{formatDistanceToNow(new Date(announcement.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 touch-manipulation"
                      onClick={() => updateMutation.mutate({ id: announcement.id, data: { is_active: !announcement.is_active } })}
                    >
                      {announcement.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 touch-manipulation"
                      onClick={() => setEditAnnouncement(announcement)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {isSuperAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 touch-manipulation text-red-400"
                        onClick={() => setDeleteId(announcement.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Sheet */}
      <Sheet open={createOpen || !!editAnnouncement} onOpenChange={(open) => {
        if (!open) { setCreateOpen(false); setEditAnnouncement(null); setFormData(defaultAnnouncement); }
      }}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle>{editAnnouncement ? "Edit Announcement" : "New Announcement"}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editAnnouncement?.title || formData.title}
                  onChange={(e) => editAnnouncement
                    ? setEditAnnouncement({ ...editAnnouncement, title: e.target.value })
                    : setFormData({ ...formData, title: e.target.value })}
                  placeholder="Announcement title"
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={editAnnouncement?.message || formData.message}
                  onChange={(e) => editAnnouncement
                    ? setEditAnnouncement({ ...editAnnouncement, message: e.target.value })
                    : setFormData({ ...formData, message: e.target.value })}
                  placeholder="Announcement message..."
                  className="min-h-[100px] touch-manipulation"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={editAnnouncement?.type || formData.type}
                    onValueChange={(v: any) => editAnnouncement
                      ? setEditAnnouncement({ ...editAnnouncement, type: v })
                      : setFormData({ ...formData, type: v })}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Expires (optional)</Label>
                  <Input
                    type="date"
                    value={editAnnouncement?.ends_at?.split("T")[0] || formData.ends_at}
                    onChange={(e) => editAnnouncement
                      ? setEditAnnouncement({ ...editAnnouncement, ends_at: e.target.value })
                      : setFormData({ ...formData, ends_at: e.target.value })}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Dismissible</p>
                  <p className="text-xs text-muted-foreground">Users can dismiss this</p>
                </div>
                <Switch
                  checked={editAnnouncement?.is_dismissible ?? formData.is_dismissible}
                  onCheckedChange={(checked) => editAnnouncement
                    ? setEditAnnouncement({ ...editAnnouncement, is_dismissible: checked })
                    : setFormData({ ...formData, is_dismissible: checked })}
                />
              </div>
            </div>
            <SheetFooter className="p-4 border-t border-border">
              <Button
                className="w-full h-12 touch-manipulation"
                onClick={() => {
                  if (editAnnouncement) {
                    updateMutation.mutate({ id: editAnnouncement.id, data: editAnnouncement });
                  } else {
                    createMutation.mutate(formData);
                  }
                }}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editAnnouncement ? "Save Changes" : "Create Announcement"}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

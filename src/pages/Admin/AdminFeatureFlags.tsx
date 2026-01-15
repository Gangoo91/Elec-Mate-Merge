import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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
  Flag,
  Plus,
  Trash2,
  Edit,
  ToggleLeft,
  ToggleRight,
  Users,
  Percent,
  Search,
  RefreshCw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  is_enabled: boolean;
  enabled_for_roles: string[];
  enabled_for_users: string[];
  percentage_rollout: number;
  created_at: string;
  updated_at: string;
}

const defaultFlag = {
  name: "",
  description: "",
  is_enabled: false,
  enabled_for_roles: [] as string[],
  percentage_rollout: 100,
};

export default function AdminFeatureFlags() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editFlag, setEditFlag] = useState<FeatureFlag | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultFlag);

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch feature flags via edge function
  const { data: flags, isLoading, refetch } = useQuery({
    queryKey: ["admin-feature-flags"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-manage-feature-flags", {
        body: { action: "list" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.flags || []) as FeatureFlag[];
    },
    staleTime: 2 * 60 * 1000,
  });

  // Create flag via edge function
  const createMutation = useMutation({
    mutationFn: async (formData: typeof defaultFlag) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-feature-flags", {
        body: { action: "create", flag: formData },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-feature-flags"] });
      setCreateOpen(false);
      setFormData(defaultFlag);
      toast({ title: "Feature flag created" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Toggle flag via edge function
  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_enabled }: { id: string; is_enabled: boolean }) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-feature-flags", {
        body: { action: "toggle", flag: { id, is_enabled } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-feature-flags"] });
      toast({ title: "Flag updated" });
    },
  });

  // Update flag via edge function
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FeatureFlag> }) => {
      const { data: result, error } = await supabase.functions.invoke("admin-manage-feature-flags", {
        body: { action: "update", flag: { id, ...data } },
      });
      if (error) throw error;
      if (result?.error) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-feature-flags"] });
      setEditFlag(null);
      toast({ title: "Flag updated" });
    },
  });

  // Delete flag via edge function
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-feature-flags", {
        body: { action: "delete", flag: { id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-feature-flags"] });
      setDeleteId(null);
      toast({ title: "Flag deleted" });
    },
  });

  const filteredFlags = flags?.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.description?.toLowerCase().includes(search.toLowerCase())
  );

  const enabledCount = flags?.filter((f) => f.is_enabled).length || 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Feature Flags</h2>
          <p className="text-xs text-muted-foreground">{enabledCount} of {flags?.length || 0} enabled</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          {isSuperAdmin && (
            <Button className="h-11 gap-2 touch-manipulation" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Flag
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-11 touch-manipulation"
        />
      </div>

      {/* Flags List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4"><div className="h-16 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : filteredFlags?.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No feature flags</h3>
            <p className="text-sm text-muted-foreground">Create flags to control feature rollouts.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredFlags?.map((flag) => (
            <Card key={flag.id} className={!flag.is_enabled ? "opacity-60" : ""}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      flag.is_enabled ? "bg-green-500/10" : "bg-muted"
                    }`}>
                      {flag.is_enabled ? (
                        <ToggleRight className="h-5 w-5 text-green-400" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm">{flag.name}</p>
                        {flag.percentage_rollout < 100 && (
                          <Badge variant="outline" className="text-[10px]">
                            <Percent className="h-2.5 w-2.5 mr-1" />
                            {flag.percentage_rollout}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{flag.description || "No description"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Switch
                      checked={flag.is_enabled}
                      onCheckedChange={(checked) => toggleMutation.mutate({ id: flag.id, is_enabled: checked })}
                      className="touch-manipulation"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 touch-manipulation"
                      onClick={() => setEditFlag(flag)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {isSuperAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 touch-manipulation text-red-400"
                        onClick={() => setDeleteId(flag.id)}
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
      <Sheet open={createOpen || !!editFlag} onOpenChange={(open) => {
        if (!open) { setCreateOpen(false); setEditFlag(null); setFormData(defaultFlag); }
      }}>
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle>{editFlag ? "Edit Flag" : "New Feature Flag"}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <Label>Name (snake_case)</Label>
                <Input
                  value={editFlag?.name || formData.name}
                  onChange={(e) => editFlag
                    ? setEditFlag({ ...editFlag, name: e.target.value })
                    : setFormData({ ...formData, name: e.target.value })}
                  placeholder="feature_name"
                  className="h-11 touch-manipulation font-mono"
                  disabled={!!editFlag}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={editFlag?.description || formData.description}
                  onChange={(e) => editFlag
                    ? setEditFlag({ ...editFlag, description: e.target.value })
                    : setFormData({ ...formData, description: e.target.value })}
                  placeholder="What does this flag control?"
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="space-y-3">
                <Label>Rollout Percentage: {editFlag?.percentage_rollout || formData.percentage_rollout}%</Label>
                <Slider
                  value={[editFlag?.percentage_rollout || formData.percentage_rollout]}
                  onValueChange={([v]) => editFlag
                    ? setEditFlag({ ...editFlag, percentage_rollout: v })
                    : setFormData({ ...formData, percentage_rollout: v })}
                  max={100}
                  step={5}
                  className="touch-manipulation"
                />
                <p className="text-xs text-muted-foreground">
                  Gradually roll out features to a percentage of users
                </p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Enabled</p>
                  <p className="text-xs text-muted-foreground">Turn this feature on/off</p>
                </div>
                <Switch
                  checked={editFlag?.is_enabled ?? formData.is_enabled}
                  onCheckedChange={(checked) => editFlag
                    ? setEditFlag({ ...editFlag, is_enabled: checked })
                    : setFormData({ ...formData, is_enabled: checked })}
                />
              </div>
            </div>
            <SheetFooter className="p-4 border-t border-border">
              <Button
                className="w-full h-12 touch-manipulation"
                onClick={() => {
                  if (editFlag) {
                    updateMutation.mutate({ id: editFlag.id, data: editFlag });
                  } else {
                    createMutation.mutate(formData);
                  }
                }}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editFlag ? "Save Changes" : "Create Flag"}
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feature Flag?</AlertDialogTitle>
            <AlertDialogDescription>This may break features that depend on this flag.</AlertDialogDescription>
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

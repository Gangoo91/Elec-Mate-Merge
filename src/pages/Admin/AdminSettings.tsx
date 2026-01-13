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
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Settings,
  Save,
  RefreshCw,
  DollarSign,
  Mail,
  Clock,
  Shield,
  Server,
  Edit,
  Check,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
  is_public: boolean;
  updated_at: string;
}

const categoryIcons: Record<string, any> = {
  billing: DollarSign,
  contact: Mail,
  limits: Clock,
  system: Server,
  general: Settings,
};

const categoryColors: Record<string, string> = {
  billing: "bg-green-500/10 text-green-400 border-green-500/30",
  contact: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  limits: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  system: "bg-red-500/10 text-red-400 border-red-500/30",
  general: "bg-gray-500/10 text-gray-400 border-gray-500/30",
};

export default function AdminSettings() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [editSetting, setEditSetting] = useState<AppSetting | null>(null);
  const [editValue, setEditValue] = useState("");

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch settings
  const { data: settings, isLoading, refetch } = useQuery({
    queryKey: ["admin-app-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("*")
        .order("category")
        .order("key");
      if (error) throw error;
      return data as AppSetting[];
    },
  });

  // Update setting
  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("app_settings")
        .update({
          value,
          updated_at: new Date().toISOString(),
          updated_by: profile?.id
        })
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-app-settings"] });
      setEditSetting(null);
      toast({ title: "Setting updated" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Group settings by category
  const groupedSettings = settings?.reduce((acc, setting) => {
    const category = setting.category || "general";
    if (!acc[category]) acc[category] = [];
    acc[category].push(setting);
    return acc;
  }, {} as Record<string, AppSetting[]>);

  const formatValue = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === "object") {
        return JSON.stringify(parsed, null, 2);
      }
      return String(parsed);
    } catch {
      return value;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">App Settings</h2>
          <p className="text-xs text-muted-foreground">Global configuration</p>
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 touch-manipulation" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Settings by Category */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6"><div className="h-32 bg-muted rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : (
        Object.entries(groupedSettings || {}).map(([category, categorySettings]) => {
          const Icon = categoryIcons[category] || Settings;
          return (
            <Card key={category}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 capitalize">
                  <Icon className="h-4 w-4" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categorySettings.map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/50 gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-mono text-sm">{setting.key}</p>
                        {setting.is_public && (
                          <Badge variant="outline" className="text-[10px]">public</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {setting.description || "No description"}
                      </p>
                      <code className="text-xs bg-background px-2 py-1 rounded block truncate">
                        {formatValue(setting.value)}
                      </code>
                    </div>
                    {isSuperAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 touch-manipulation shrink-0"
                        onClick={() => {
                          setEditSetting(setting);
                          setEditValue(formatValue(setting.value));
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })
      )}

      {/* Quick Settings Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Take app offline</p>
              </div>
              <Switch
                checked={settings?.find((s) => s.key === "maintenance_mode")?.value === "true"}
                onCheckedChange={(checked) => {
                  if (isSuperAdmin) {
                    updateMutation.mutate({ key: "maintenance_mode", value: String(checked) });
                  }
                }}
                disabled={!isSuperAdmin}
                className="touch-manipulation"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Trial Days</p>
                <p className="text-xs text-muted-foreground">Free trial length</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">
                {settings?.find((s) => s.key === "trial_days")?.value || "7"} days
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Sheet */}
      <Sheet open={!!editSetting} onOpenChange={() => setEditSetting(null)}>
        <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="font-mono">{editSetting?.key}</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground">
                  {editSetting?.description || "No description"}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="min-h-[120px] font-mono text-sm touch-manipulation"
                />
                <p className="text-xs text-muted-foreground">
                  For JSON values, ensure valid formatting
                </p>
              </div>
            </div>
            <SheetFooter className="p-4 border-t border-border">
              <Button
                className="w-full h-12 touch-manipulation gap-2"
                onClick={() => editSetting && updateMutation.mutate({ key: editSetting.key, value: editValue })}
                disabled={updateMutation.isPending}
              >
                <Save className="h-4 w-4" />
                Save Setting
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

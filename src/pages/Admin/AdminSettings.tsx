import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Skeleton } from '@/components/ui/skeleton';
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
  type LucideIcon,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
  is_public: boolean;
  updated_at: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  billing: DollarSign,
  contact: Mail,
  limits: Clock,
  system: Server,
  general: Settings,
};

const categoryAccentColors: Record<string, string> = {
  billing: 'from-green-500 to-emerald-400',
  contact: 'from-blue-500 to-cyan-400',
  limits: 'from-amber-500 to-orange-400',
  system: 'from-red-500 to-rose-400',
  general: 'from-gray-500 to-gray-400',
};

export default function AdminSettings() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [editSetting, setEditSetting] = useState<AppSetting | null>(null);
  const [editValue, setEditValue] = useState('');

  const haptic = useHaptic();
  const isSuperAdmin = profile?.admin_role === 'super_admin';

  // Fetch settings via edge function to bypass RLS
  const {
    data: settings,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-app-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-manage-settings', {
        body: { action: 'list' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.settings || []) as AppSetting[];
    },
  });

  // Update setting via edge function
  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-settings', {
        body: { action: 'update', key, value },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-app-settings'] });
      setEditSetting(null);
      toast({ title: 'Setting updated' });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  // Group settings by category
  const groupedSettings = settings?.reduce(
    (acc, setting) => {
      const category = setting.category || 'general';
      if (!acc[category]) acc[category] = [];
      acc[category].push(setting);
      return acc;
    },
    {} as Record<string, AppSetting[]>
  );

  const formatValue = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') {
        return JSON.stringify(parsed, null, 2);
      }
      return String(parsed);
    } catch {
      return value;
    }
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        <AdminPageHeader
          title="App Settings"
          subtitle="Global configuration"
          icon={Settings}
          iconColor="text-white"
          iconBg="bg-white/10 border-white/20"
          accentColor="from-white/10 via-white/20 to-white/10"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {/* Settings by Category */}
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-lg" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(groupedSettings || {}).map(([category, categorySettings], catIdx) => {
            const Icon = categoryIcons[category] || Settings;
            const accentColor = categoryAccentColors[category] || categoryAccentColors.general;
            return (
              <motion.section
                key={category}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={catIdx + 1}
              >
                <p className="text-[10px] uppercase tracking-wider !text-white font-semibold mb-2 pl-1">
                  {category}
                </p>
                <div className="glass-premium rounded-2xl overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${accentColor}`} />
                  {categorySettings.map((setting, i) => (
                    <div
                      key={setting.key}
                      className={`flex items-start justify-between p-4 gap-3 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-3.5 w-3.5 !text-white shrink-0" />
                          <p className="font-mono text-sm !text-white">{setting.key}</p>
                          {setting.is_public && (
                            <Badge variant="outline" className="text-xs">
                              public
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs !text-white mb-2">
                          {setting.description || 'No description'}
                        </p>
                        <code className="text-xs bg-white/[0.05] px-2 py-1 rounded block truncate">
                          {formatValue(setting.value)}
                        </code>
                      </div>
                      {isSuperAdmin && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-11 w-11 touch-manipulation shrink-0"
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
                </div>
              </motion.section>
            );
          })
        )}

        {/* Quick Settings */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={Object.keys(groupedSettings || {}).length + 1}
        >
          <div className="glass-premium rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-red-500 to-amber-500" />
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium !text-white">Maintenance Mode</p>
                <p className="text-xs !text-white">Take app offline</p>
              </div>
              <Switch
                checked={settings?.find((s) => s.key === 'maintenance_mode')?.value === 'true'}
                onCheckedChange={(checked) => {
                  if (isSuperAdmin) {
                    updateMutation.mutate({ key: 'maintenance_mode', value: String(checked) });
                  }
                }}
                disabled={!isSuperAdmin}
                className="touch-manipulation"
              />
            </div>
            <div className="border-t border-white/[0.04] p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium !text-white">Trial Days</p>
                <p className="text-xs !text-white">Free trial length</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">
                {settings?.find((s) => s.key === 'trial_days')?.value || '7'} days
              </Badge>
            </div>
          </div>
        </motion.section>

        {/* Edit Sheet */}
        <Sheet open={!!editSetting} onOpenChange={() => setEditSetting(null)}>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="font-mono">{editSetting?.key}</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="!text-white">Description</Label>
                  <p className="text-sm !text-white">
                    {editSetting?.description || 'No description'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="!text-white">Value</Label>
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="min-h-[120px] font-mono text-sm touch-manipulation"
                  />
                  <p className="text-xs !text-white">For JSON values, ensure valid formatting</p>
                </div>
              </div>
              <SheetFooter className="p-4 border-t border-white/[0.06]">
                <Button
                  className="w-full h-11 touch-manipulation gap-2"
                  onClick={() =>
                    editSetting && updateMutation.mutate({ key: editSetting.key, value: editValue })
                  }
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
    </PullToRefresh>
  );
}

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { RefreshCw, Save, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import {
  PageFrame,
  PageHero,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  IconButton,
  LoadingBlocks,
  Pill,
  type Tone,
} from '@/components/admin/editorial';

interface AppSetting {
  id: string;
  key: string;
  value: string;
  description: string | null;
  category: string;
  is_public: boolean;
  updated_at: string;
}

const categoryTone: Record<string, Tone> = {
  general: 'yellow',
  billing: 'emerald',
  contact: 'blue',
  limits: 'amber',
  system: 'purple',
  notifications: 'yellow',
  security: 'yellow',
  integrations: 'yellow',
};

const categoryOrder = [
  'general',
  'notifications',
  'security',
  'integrations',
  'billing',
  'contact',
  'limits',
  'system',
];

const prettyCategory = (c: string) =>
  c.charAt(0).toUpperCase() + c.slice(1).replace(/_/g, ' ');

export default function AdminSettings() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [editSetting, setEditSetting] = useState<AppSetting | null>(null);
  const [editValue, setEditValue] = useState('');

  const haptic = useHaptic();
  const isSuperAdmin = profile?.admin_role === 'super_admin';

  const {
    data: settings,
    isLoading,
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

  const isBoolean = (value: string) => value === 'true' || value === 'false';

  const orderedCategories = Object.keys(groupedSettings || {}).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const maintenance = settings?.find((s) => s.key === 'maintenance_mode');
  const trialDays = settings?.find((s) => s.key === 'trial_days');

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Settings"
          description="Admin panel configuration."
          tone="yellow"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            {orderedCategories.map((category) => {
              const categorySettings = groupedSettings?.[category] || [];
              const tone: Tone = categoryTone[category] || 'yellow';

              return (
                <ListCard key={category}>
                  <ListCardHeader
                    tone={tone}
                    title={prettyCategory(category)}
                    meta={<Pill tone={tone}>{categorySettings.length}</Pill>}
                  />
                  <ListBody>
                    {categorySettings.map((setting) => {
                      const valueStr = formatValue(setting.value);
                      const boolSetting = isBoolean(setting.value);

                      let trailing;
                      if (boolSetting) {
                        trailing = (
                          <Switch
                            checked={setting.value === 'true'}
                            onCheckedChange={(checked) => {
                              if (isSuperAdmin) {
                                updateMutation.mutate({
                                  key: setting.key,
                                  value: String(checked),
                                });
                              }
                            }}
                            disabled={!isSuperAdmin}
                            className="touch-manipulation data-[state=checked]:bg-white data-[state=unchecked]:bg-white/20 [&>span]:bg-black"
                          />
                        );
                      } else if (isSuperAdmin) {
                        trailing = (
                          <button
                            onClick={() => {
                              setEditSetting(setting);
                              setEditValue(valueStr);
                            }}
                            className="h-10 px-3 inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[12px] font-medium hover:bg-white/[0.1] transition-colors touch-manipulation max-w-[220px]"
                          >
                            <span className="truncate font-mono">{valueStr}</span>
                            <Edit className="h-3.5 w-3.5 shrink-0" />
                          </button>
                        );
                      } else {
                        trailing = (
                          <span className="h-10 px-3 inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[12px] font-mono max-w-[220px] truncate">
                            {valueStr}
                          </span>
                        );
                      }

                      return (
                        <ListRow
                          key={setting.key}
                          title={setting.key}
                          subtitle={setting.description || 'No description'}
                          trailing={
                            <div className="flex items-center gap-2">
                              {setting.is_public && <Pill tone="emerald">public</Pill>}
                              {trailing}
                            </div>
                          }
                        />
                      );
                    })}
                  </ListBody>
                </ListCard>
              );
            })}

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Quick Controls"
                meta={<Pill tone="yellow">2</Pill>}
              />
              <ListBody>
                <ListRow
                  title="Trial Days"
                  subtitle="Free trial length for new subscribers"
                  trailing={
                    <span className="h-10 px-3 inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[12px] font-mono tabular-nums">
                      {trialDays?.value || '7'} days
                    </span>
                  }
                />
                <ListRow
                  title="Maintenance Mode"
                  subtitle="Take the app offline for maintenance"
                  trailing={
                    <Switch
                      checked={maintenance?.value === 'true'}
                      onCheckedChange={(checked) => {
                        if (isSuperAdmin) {
                          updateMutation.mutate({
                            key: 'maintenance_mode',
                            value: String(checked),
                          });
                        }
                      }}
                      disabled={!isSuperAdmin}
                      className="touch-manipulation data-[state=checked]:bg-white data-[state=unchecked]:bg-white/20 [&>span]:bg-black"
                    />
                  }
                />
              </ListBody>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="red"
                title="Danger Zone"
                meta={<Pill tone="red">destructive</Pill>}
              />
              <ListBody>
                <ListRow
                  title="Clear Application Cache"
                  subtitle="Invalidate all query caches and force a data refetch"
                  trailing={
                    <button
                      onClick={() => {
                        if (!isSuperAdmin) return;
                        queryClient.invalidateQueries();
                        haptic.success();
                        toast({ title: 'Cache cleared' });
                      }}
                      disabled={!isSuperAdmin}
                      className="h-10 px-4 inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[12px] font-medium hover:bg-white/[0.1] transition-colors touch-manipulation disabled:opacity-50"
                    >
                      Clear
                    </button>
                  }
                />
                <ListRow
                  title="Reload Settings from Source"
                  subtitle="Re-fetch all settings from the server, overwriting local state"
                  trailing={
                    <button
                      onClick={() => {
                        refetch();
                        haptic.success();
                        toast({ title: 'Settings reloaded' });
                      }}
                      className="h-10 px-4 inline-flex items-center rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[12px] font-medium hover:bg-white/[0.1] transition-colors touch-manipulation"
                    >
                      Reload
                    </button>
                  }
                />
              </ListBody>
            </ListCard>
          </>
        )}

        <div className="fixed left-0 right-0 bottom-0 z-40 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <span className="text-[12px] text-white">
              {settings?.length || 0} settings loaded
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetch()}
                className="h-10 px-4 inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[12px] font-medium hover:bg-white/[0.1] transition-colors touch-manipulation"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button
                onClick={() => {
                  haptic.success();
                  toast({ title: 'All changes saved' });
                }}
                className="h-10 px-5 inline-flex items-center gap-2 rounded-full bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                <Save className="h-3.5 w-3.5" />
                Save
              </button>
            </div>
          </div>
        </div>

        <Sheet open={!!editSetting} onOpenChange={() => setEditSetting(null)}>
          <SheetContent
            side="bottom"
            className="h-[60vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-t border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="font-mono text-left text-white">
                  {editSetting?.key}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    Description
                  </Label>
                  <p className="text-sm text-white">
                    {editSetting?.description || 'No description'}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    Value
                  </Label>
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="min-h-[160px] font-mono text-sm touch-manipulation bg-white/[0.06] border-white/[0.1] text-white focus:border-elec-yellow/60 focus:ring-0"
                  />
                  <p className="text-[11px] text-white">
                    For JSON values, ensure valid formatting.
                  </p>
                </div>
              </div>
              <SheetFooter className="p-5 border-t border-white/[0.06]">
                <Button
                  className="w-full h-11 touch-manipulation gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 rounded-full font-semibold"
                  onClick={() =>
                    editSetting &&
                    updateMutation.mutate({ key: editSetting.key, value: editValue })
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
      </PageFrame>
    </PullToRefresh>
  );
}

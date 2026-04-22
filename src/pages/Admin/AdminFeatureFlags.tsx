import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
import { RefreshCw, Loader2, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  type Tone,
} from '@/components/admin/editorial';

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

type FlagStatus = 'enabled' | 'disabled' | 'partial';

const defaultFlag = {
  name: '',
  description: '',
  is_enabled: false,
  enabled_for_roles: [] as string[],
  percentage_rollout: 100,
};

function getFlagStatus(flag: FeatureFlag): FlagStatus {
  if (!flag.is_enabled) return 'disabled';
  if (flag.percentage_rollout < 100) return 'partial';
  return 'enabled';
}

function statusTone(status: FlagStatus): Tone {
  if (status === 'enabled') return 'emerald';
  if (status === 'partial') return 'orange';
  return 'red';
}

function getAudience(flag: FeatureFlag): string {
  const parts: string[] = [];
  if (flag.enabled_for_roles?.length) {
    parts.push(`${flag.enabled_for_roles.length} role${flag.enabled_for_roles.length === 1 ? '' : 's'}`);
  }
  if (flag.enabled_for_users?.length) {
    parts.push(`${flag.enabled_for_users.length} user${flag.enabled_for_users.length === 1 ? '' : 's'}`);
  }
  if (!parts.length) return 'All users';
  return parts.join(' · ');
}

export default function AdminFeatureFlags() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'enabled' | 'disabled' | 'partial'>('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [editFlag, setEditFlag] = useState<FeatureFlag | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultFlag);

  const haptic = useHaptic();
  const isSuperAdmin = profile?.admin_role === 'super_admin';

  const {
    data: flags,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-feature-flags'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-manage-feature-flags', {
        body: { action: 'list' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.flags || []) as FeatureFlag[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: async (payload: typeof defaultFlag) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-feature-flags', {
        body: { action: 'create', flag: payload },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-feature-flags'] });
      setCreateOpen(false);
      setFormData(defaultFlag);
      toast({ title: 'Feature flag created' });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_enabled }: { id: string; is_enabled: boolean }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-feature-flags', {
        body: { action: 'toggle', flag: { id, is_enabled } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-feature-flags'] });
      toast({ title: 'Flag updated' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FeatureFlag> }) => {
      const { data: result, error } = await supabase.functions.invoke(
        'admin-manage-feature-flags',
        {
          body: { action: 'update', flag: { id, ...data } },
        }
      );
      if (error) throw error;
      if (result?.error) throw new Error(result.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-feature-flags'] });
      setEditFlag(null);
      toast({ title: 'Flag updated' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-feature-flags', {
        body: { action: 'delete', flag: { id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-feature-flags'] });
      setDeleteId(null);
      toast({ title: 'Flag deleted' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const counts = useMemo(() => {
    const total = flags?.length || 0;
    const enabled = flags?.filter((f) => getFlagStatus(f) === 'enabled').length || 0;
    const partial = flags?.filter((f) => getFlagStatus(f) === 'partial').length || 0;
    const disabled = flags?.filter((f) => getFlagStatus(f) === 'disabled').length || 0;
    return { total, enabled, partial, disabled };
  }, [flags]);

  const filteredFlags = useMemo(() => {
    const base = flags || [];
    const byTab = base.filter((f) => {
      if (activeTab === 'all') return true;
      return getFlagStatus(f) === activeTab;
    });
    const q = search.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        (f.description || '').toLowerCase().includes(q)
    );
  }, [flags, activeTab, search]);

  const openEdit = (flag: FeatureFlag) => {
    setEditFlag(flag);
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Tools"
          title="Feature Flags"
          description="Roll out features safely with percentage and audience targeting."
          tone="purple"
          actions={
            <>
              {isSuperAdmin && (
                <button
                  onClick={() => setCreateOpen(true)}
                  className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                >
                  New Flag
                </button>
              )}
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className="h-4 w-4" />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Total', value: counts.total },
            { label: 'Enabled', value: counts.enabled, tone: 'emerald' },
            { label: 'Partial', value: counts.partial, tone: 'orange' },
            { label: 'Disabled', value: counts.disabled, tone: 'red' },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: counts.total },
            { value: 'enabled', label: 'Enabled', count: counts.enabled },
            { value: 'partial', label: 'Partial', count: counts.partial },
            { value: 'disabled', label: 'Disabled', count: counts.disabled },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as typeof activeTab)}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search flags…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : filteredFlags.length === 0 ? (
          <EmptyState
            title="No feature flags"
            description={
              search || activeTab !== 'all'
                ? 'No flags match the current filters.'
                : 'Create flags to control feature rollouts.'
            }
            action={isSuperAdmin ? 'New Flag' : undefined}
            onAction={isSuperAdmin ? () => setCreateOpen(true) : undefined}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="purple"
              title="Flags"
              meta={<Pill tone="purple">{filteredFlags.length}</Pill>}
            />
            <ListBody>
              {filteredFlags.map((flag) => {
                const status = getFlagStatus(flag);
                const audience = getAudience(flag);
                return (
                  <ListRow
                    key={flag.id}
                    title={flag.name}
                    subtitle={`${flag.description || 'No description'} · ${audience}`}
                    trailing={
                      <>
                        <Switch
                          checked={flag.is_enabled}
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={(checked) =>
                            toggleMutation.mutate({ id: flag.id, is_enabled: checked })
                          }
                          className="touch-manipulation"
                        />
                        <Pill tone={statusTone(status)}>{status}</Pill>
                        {flag.percentage_rollout !== null && flag.percentage_rollout < 100 && (
                          <span className="text-[11px] text-white tabular-nums">
                            {flag.percentage_rollout}%
                          </span>
                        )}
                        {isSuperAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(flag.id);
                            }}
                            aria-label="Delete flag"
                            className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:bg-white/[0.06] touch-manipulation"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </>
                    }
                    onClick={() => openEdit(flag)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet
          open={createOpen || !!editFlag}
          onOpenChange={(open) => {
            if (!open) {
              setCreateOpen(false);
              setEditFlag(null);
              setFormData(defaultFlag);
            }
          }}
        >
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-white">
                  {editFlag ? 'Edit Flag' : 'New Feature Flag'}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="space-y-2">
                  <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                    Name (snake_case)
                  </Label>
                  <Input
                    value={editFlag?.name || formData.name}
                    onChange={(e) =>
                      editFlag
                        ? setEditFlag({ ...editFlag, name: e.target.value })
                        : setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="feature_name"
                    className="h-11 text-base touch-manipulation font-mono border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    disabled={!!editFlag}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                    Description
                  </Label>
                  <Input
                    value={editFlag?.description || formData.description || ''}
                    onChange={(e) =>
                      editFlag
                        ? setEditFlag({ ...editFlag, description: e.target.value })
                        : setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="What does this flag control?"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                      Rollout Percentage
                    </Label>
                    <span className="text-2xl font-semibold tabular-nums text-white">
                      {editFlag?.percentage_rollout ?? formData.percentage_rollout}%
                    </span>
                  </div>
                  <Slider
                    value={[editFlag?.percentage_rollout ?? formData.percentage_rollout]}
                    onValueChange={([v]) =>
                      editFlag
                        ? setEditFlag({ ...editFlag, percentage_rollout: v })
                        : setFormData({ ...formData, percentage_rollout: v })
                    }
                    max={100}
                    step={5}
                    className="touch-manipulation"
                  />
                  <p className="text-[12px] text-white">
                    Gradually roll out features to a percentage of users.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                    Audience targeting
                  </Label>
                  <Input
                    value={(editFlag?.enabled_for_roles ?? formData.enabled_for_roles).join(', ')}
                    onChange={(e) => {
                      const roles = e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean);
                      if (editFlag) {
                        setEditFlag({ ...editFlag, enabled_for_roles: roles });
                      } else {
                        setFormData({ ...formData, enabled_for_roles: roles });
                      }
                    }}
                    placeholder="super_admin, beta_tester"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <p className="text-[12px] text-white">
                    Comma-separated roles. Leave blank to target all users.
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <div>
                    <p className="text-sm font-medium text-white">Enabled</p>
                    <p className="text-[12px] text-white">Turn this feature on or off.</p>
                  </div>
                  <Switch
                    checked={editFlag?.is_enabled ?? formData.is_enabled}
                    onCheckedChange={(checked) =>
                      editFlag
                        ? setEditFlag({ ...editFlag, is_enabled: checked })
                        : setFormData({ ...formData, is_enabled: checked })
                    }
                  />
                </div>
              </div>
              <SheetFooter className="p-5 border-t border-white/[0.06]">
                <Button
                  className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 rounded-full font-semibold"
                  onClick={() => {
                    if (editFlag) {
                      updateMutation.mutate({ id: editFlag.id, data: editFlag });
                    } else {
                      createMutation.mutate(formData);
                    }
                  }}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editFlag ? 'Saving…' : 'Creating…'}
                    </>
                  ) : editFlag ? (
                    'Save Changes'
                  ) : (
                    'Create Flag'
                  )}
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Feature Flag?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This may break features that depend on this flag.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation"
                disabled={deleteMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-red-500 hover:bg-red-600"
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}

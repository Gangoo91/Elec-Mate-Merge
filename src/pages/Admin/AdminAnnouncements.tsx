import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import {
  RefreshCw,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
  Pencil,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
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
  LoadingBlocks,
  EmptyState,
  type Tone,
} from '@/components/admin/editorial';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  target_roles: string[];
  is_active: boolean;
  is_dismissible: boolean;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
  created_by: string;
  dismissal_count?: number;
}

type StatusKey = 'all' | 'live' | 'scheduled' | 'draft' | 'expired';

const defaultAnnouncement = {
  title: '',
  message: '',
  type: 'info' as const,
  target_roles: ['visitor', 'apprentice', 'electrician', 'employer'],
  is_dismissible: true,
  starts_at: '',
  ends_at: '',
};

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const typeToneMap: Record<Announcement['type'], Tone> = {
  info: 'blue',
  warning: 'amber',
  success: 'emerald',
  error: 'red',
};

function audienceLabel(roles: string[]): string {
  if (!roles?.length) return 'No audience';
  if (roles.length === 4) return 'All roles';
  return `${roles.length} role${roles.length === 1 ? '' : 's'}`;
}

export default function AdminAnnouncements() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [createOpen, setCreateOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultAnnouncement);
  const [activeTab, setActiveTab] = useState<StatusKey>('all');
  const [search, setSearch] = useState('');

  const isSuperAdmin = profile?.admin_role === 'super_admin';

  const {
    data: announcements,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-manage-announcements', {
        body: { action: 'list' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.announcements || []) as Announcement[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: async (formData: typeof defaultAnnouncement) => {
      const payload = {
        ...formData,
        starts_at: formData.starts_at ? new Date(formData.starts_at).toISOString() : null,
        ends_at: formData.ends_at ? new Date(formData.ends_at).toISOString() : null,
      };
      const { data, error } = await supabase.functions.invoke('admin-manage-announcements', {
        body: { action: 'create', announcement: payload },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      const isScheduled = formData.starts_at && new Date(formData.starts_at) > new Date();
      setCreateOpen(false);
      setFormData(defaultAnnouncement);
      toast({
        title: isScheduled ? 'Announcement scheduled' : 'Announcement created',
        description: isScheduled
          ? 'Your announcement will go live at the scheduled time.'
          : 'Your announcement is now live.',
      });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Announcement> }) => {
      const payload = {
        ...data,
        ...(data.starts_at !== undefined && {
          starts_at: data.starts_at ? new Date(data.starts_at).toISOString() : null,
        }),
        ...(data.ends_at !== undefined && {
          ends_at: data.ends_at ? new Date(data.ends_at).toISOString() : null,
        }),
      };
      const { data: result, error } = await supabase.functions.invoke(
        'admin-manage-announcements',
        {
          body: { action: 'update', announcement: { id, ...payload } },
        }
      );
      if (error) throw error;
      if (result?.error) throw new Error(result.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      setEditAnnouncement(null);
      toast({ title: 'Announcement updated' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-announcements', {
        body: { action: 'delete', announcement: { id } },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      setDeleteId(null);
      toast({ title: 'Announcement deleted' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const classify = (a: Announcement): StatusKey => {
    if (a.starts_at && new Date(a.starts_at) > new Date()) return 'scheduled';
    if (a.ends_at && new Date(a.ends_at) < new Date()) return 'expired';
    if (a.is_active) return 'live';
    return 'draft';
  };

  const statusToneMap: Record<Exclude<StatusKey, 'all'>, Tone> = {
    live: 'emerald',
    scheduled: 'blue',
    draft: 'amber',
    expired: 'red',
  };

  const statusLabel: Record<Exclude<StatusKey, 'all'>, string> = {
    live: 'Live',
    scheduled: 'Scheduled',
    draft: 'Draft',
    expired: 'Expired',
  };

  const counts = useMemo(() => {
    const c = { live: 0, scheduled: 0, draft: 0, expired: 0, total: 0 };
    (announcements || []).forEach((a) => {
      const s = classify(a);
      c[s]++;
      c.total++;
    });
    return c;
  }, [announcements]);

  const totalReach = useMemo(() => {
    return (announcements || []).reduce((sum, a) => sum + (a.dismissal_count || 0), 0);
  }, [announcements]);

  const clickRate = useMemo(() => {
    if (!announcements || announcements.length === 0) return 0;
    const active = announcements.filter((a) => a.is_active);
    if (active.length === 0) return 0;
    const avg = active.reduce((sum, a) => sum + (a.dismissal_count || 0), 0) / active.length;
    return Math.min(100, Math.round(avg));
  }, [announcements]);

  const filtered = useMemo(() => {
    const list = announcements || [];
    return list.filter((a) => {
      if (activeTab !== 'all' && classify(a) !== activeTab) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !a.title.toLowerCase().includes(q) &&
          !a.message.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [announcements, activeTab, search]);

  const tabs = [
    { value: 'all', label: 'All', count: counts.total },
    { value: 'live', label: 'Live', count: counts.live },
    { value: 'scheduled', label: 'Scheduled', count: counts.scheduled },
    { value: 'draft', label: 'Draft', count: counts.draft },
    { value: 'expired', label: 'Expired', count: counts.expired },
  ];

  const openCreate = () => {
    setFormData(defaultAnnouncement);
    setCreateOpen(true);
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
          title="Announcements"
          description="In-app broadcasts and scheduled messages."
          tone="yellow"
          actions={
            <>
              <button
                onClick={openCreate}
                className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation inline-flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                New Announcement
              </button>
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className="h-4 w-4" />
              </IconButton>
            </>
          }
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            <StatStrip
              columns={4}
              stats={[
                { label: 'Live', value: counts.live, tone: 'emerald' },
                { label: 'Scheduled', value: counts.scheduled, tone: 'blue' },
                { label: 'Total Reach', value: totalReach },
                { label: 'Click Rate', value: `${clickRate}%`, accent: true },
              ]}
            />

            <FilterBar
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(v) => setActiveTab(v as StatusKey)}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search announcements…"
            />

            {filtered.length === 0 ? (
              <EmptyState
                title={
                  announcements && announcements.length === 0
                    ? 'No announcements yet'
                    : 'No matches'
                }
                description={
                  announcements && announcements.length === 0
                    ? 'Create your first announcement to notify users.'
                    : 'Try a different filter or search term.'
                }
                action={
                  announcements && announcements.length === 0
                    ? 'Create announcement'
                    : undefined
                }
                onAction={
                  announcements && announcements.length === 0 ? openCreate : undefined
                }
              />
            ) : (
              <ListCard>
                <ListCardHeader
                  tone="yellow"
                  title="Announcements"
                  meta={<Pill tone="yellow">{filtered.length}</Pill>}
                />
                <ListBody>
                  {filtered.map((a) => {
                    const statusKey = classify(a);
                    const statusTone = statusToneMap[statusKey];
                    const typeTone = typeToneMap[a.type];
                    const audience = audienceLabel(a.target_roles);
                    const preview =
                      a.message.length > 60 ? `${a.message.slice(0, 60)}…` : a.message;
                    const reach = a.dismissal_count || 0;

                    return (
                      <ListRow
                        key={a.id}
                        accent={typeTone}
                        title={
                          <span className="flex items-center gap-2">
                            <span className="truncate text-white">{a.title}</span>
                            <span className="text-[11px] text-white tabular-nums shrink-0">
                              {relativeTime(new Date(a.created_at))}
                            </span>
                          </span>
                        }
                        subtitle={`${preview} · ${audience}`}
                        trailing={
                          <>
                            <Pill tone={statusTone}>{statusLabel[statusKey]}</Pill>
                            <span className="text-[11px] text-white tabular-nums">
                              {reach}
                            </span>
                            <div className="flex items-center gap-1 ml-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateMutation.mutate({
                                    id: a.id,
                                    data: { is_active: !a.is_active },
                                  });
                                }}
                                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/[0.06] touch-manipulation text-white"
                                aria-label={a.is_active ? 'Deactivate' : 'Activate'}
                              >
                                {a.is_active ? (
                                  <EyeOff className="h-3.5 w-3.5" />
                                ) : (
                                  <Eye className="h-3.5 w-3.5" />
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditAnnouncement(a);
                                }}
                                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/[0.06] touch-manipulation text-white"
                                aria-label="Edit"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                              {isSuperAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteId(a.id);
                                  }}
                                  className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/[0.06] touch-manipulation text-white"
                                  aria-label="Delete"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </>
                        }
                        onClick={() => setEditAnnouncement(a)}
                        className={!a.is_active ? 'opacity-60' : undefined}
                      />
                    );
                  })}
                </ListBody>
              </ListCard>
            )}
          </>
        )}

        <Sheet
          open={createOpen || !!editAnnouncement}
          onOpenChange={(open) => {
            if (!open) {
              setCreateOpen(false);
              setEditAnnouncement(null);
              setFormData(defaultAnnouncement);
            }
          }}
        >
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-white text-lg">
                  {editAnnouncement ? 'Edit Announcement' : 'New Announcement'}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="space-y-2">
                  <Label className="text-white text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Title
                  </Label>
                  <Input
                    value={editAnnouncement?.title || formData.title}
                    onChange={(e) =>
                      editAnnouncement
                        ? setEditAnnouncement({ ...editAnnouncement, title: e.target.value })
                        : setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. New feature available"
                    className="h-12 touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] rounded-xl text-base text-white placeholder:text-white focus:border-elec-yellow"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Message
                  </Label>
                  <Textarea
                    value={editAnnouncement?.message || formData.message}
                    onChange={(e) =>
                      editAnnouncement
                        ? setEditAnnouncement({ ...editAnnouncement, message: e.target.value })
                        : setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="What do you want to tell users?"
                    className="min-h-[100px] touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.08] rounded-xl text-base text-white placeholder:text-white focus:border-elec-yellow"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Type
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['info', 'warning', 'success', 'error'] as const).map((t) => {
                      const selected = (editAnnouncement?.type || formData.type) === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            if (editAnnouncement) {
                              setEditAnnouncement({ ...editAnnouncement, type: t });
                            } else {
                              setFormData({ ...formData, type: t });
                            }
                          }}
                          className={cn(
                            'h-11 rounded-full text-[12.5px] font-medium capitalize touch-manipulation transition-colors',
                            selected
                              ? 'bg-elec-yellow text-black'
                              : 'bg-[hsl(0_0%_12%)] text-white border border-white/[0.08] hover:bg-white/[0.04]'
                          )}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Audience
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['visitor', 'apprentice', 'electrician', 'employer'] as const).map(
                      (role) => {
                        const current =
                          editAnnouncement?.target_roles || formData.target_roles;
                        const selected = current.includes(role);
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => {
                              const next = selected
                                ? current.filter((r) => r !== role)
                                : [...current, role];
                              if (editAnnouncement) {
                                setEditAnnouncement({
                                  ...editAnnouncement,
                                  target_roles: next,
                                });
                              } else {
                                setFormData({ ...formData, target_roles: next });
                              }
                            }}
                            className={cn(
                              'h-11 rounded-full text-[12.5px] font-medium capitalize touch-manipulation transition-colors',
                              selected
                                ? 'bg-elec-yellow text-black'
                                : 'bg-[hsl(0_0%_12%)] text-white border border-white/[0.08] hover:bg-white/[0.04]'
                            )}
                          >
                            {role}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Options
                  </Label>

                  <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08]">
                    <p className="text-sm font-medium text-white">Dismissible</p>
                    <Switch
                      checked={editAnnouncement?.is_dismissible ?? formData.is_dismissible}
                      onCheckedChange={(checked) =>
                        editAnnouncement
                          ? setEditAnnouncement({
                              ...editAnnouncement,
                              is_dismissible: checked,
                            })
                          : setFormData({ ...formData, is_dismissible: checked })
                      }
                    />
                  </div>

                  <div className="rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3.5">
                      <p className="text-sm font-medium text-white">Schedule for later</p>
                      <Switch
                        checked={!!(editAnnouncement?.starts_at || formData.starts_at)}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            if (editAnnouncement) {
                              setEditAnnouncement({ ...editAnnouncement, starts_at: '' });
                            } else {
                              setFormData({ ...formData, starts_at: '' });
                            }
                          }
                        }}
                      />
                    </div>
                    {(editAnnouncement?.starts_at ||
                      formData.starts_at ||
                      (editAnnouncement && editAnnouncement.starts_at !== '')) && (
                      <div className="px-4 pb-4">
                        <Input
                          type="datetime-local"
                          value={
                            editAnnouncement?.starts_at?.slice(0, 16) || formData.starts_at
                          }
                          onChange={(e) =>
                            editAnnouncement
                              ? setEditAnnouncement({
                                  ...editAnnouncement,
                                  starts_at: e.target.value,
                                })
                              : setFormData({ ...formData, starts_at: e.target.value })
                          }
                          className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] rounded-lg text-white focus:border-elec-yellow"
                        />
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3.5">
                      <p className="text-sm font-medium text-white">Auto-expire</p>
                      <Switch
                        checked={!!(editAnnouncement?.ends_at || formData.ends_at)}
                        onCheckedChange={(checked) => {
                          if (!checked) {
                            if (editAnnouncement) {
                              setEditAnnouncement({ ...editAnnouncement, ends_at: '' });
                            } else {
                              setFormData({ ...formData, ends_at: '' });
                            }
                          }
                        }}
                      />
                    </div>
                    {(editAnnouncement?.ends_at ||
                      formData.ends_at ||
                      (editAnnouncement &&
                        editAnnouncement.ends_at !== '' &&
                        editAnnouncement.ends_at !== null)) && (
                      <div className="px-4 pb-4">
                        <Input
                          type="datetime-local"
                          value={
                            editAnnouncement?.ends_at?.slice(0, 16) || formData.ends_at
                          }
                          onChange={(e) =>
                            editAnnouncement
                              ? setEditAnnouncement({
                                  ...editAnnouncement,
                                  ends_at: e.target.value,
                                })
                              : setFormData({ ...formData, ends_at: e.target.value })
                          }
                          className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] rounded-lg text-white focus:border-elec-yellow"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <SheetFooter className="p-5 border-t border-white/[0.06]">
                <Button
                  className="w-full h-12 touch-manipulation rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-base"
                  onClick={() => {
                    if (editAnnouncement) {
                      updateMutation.mutate({
                        id: editAnnouncement.id,
                        data: editAnnouncement,
                      });
                    } else {
                      createMutation.mutate(formData);
                    }
                  }}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editAnnouncement ? 'Saving…' : 'Creating…'}
                    </>
                  ) : editAnnouncement ? (
                    'Save Changes'
                  ) : (
                    'Create Announcement'
                  )}
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation rounded-full"
                disabled={deleteMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-red-500 hover:bg-red-600 rounded-full"
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

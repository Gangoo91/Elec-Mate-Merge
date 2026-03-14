import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Loader2,
  Calendar,
  Clock,
  Pencil,
  X,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

const defaultAnnouncement = {
  title: '',
  message: '',
  type: 'info' as const,
  target_roles: ['visitor', 'apprentice', 'electrician', 'employer'],
  is_dismissible: true,
  starts_at: '',
  ends_at: '',
};

/* ── Compact relative time ── */
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

/* ── Type colours ── */
const typeConfig: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  info: { bg: 'bg-blue-500/10', border: 'border-l-blue-400', text: 'text-blue-400', dot: 'bg-blue-400' },
  warning: { bg: 'bg-amber-500/10', border: 'border-l-amber-400', text: 'text-amber-400', dot: 'bg-amber-400' },
  success: { bg: 'bg-green-500/10', border: 'border-l-green-400', text: 'text-green-400', dot: 'bg-green-400' },
  error: { bg: 'bg-red-500/10', border: 'border-l-red-400', text: 'text-red-400', dot: 'bg-red-400' },
};

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
};

export default function AdminAnnouncements() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [createOpen, setCreateOpen] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultAnnouncement);

  const isSuperAdmin = profile?.admin_role === 'super_admin';

  // Fetch announcements via edge function
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

  // Create announcement via edge function
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

  // Update announcement via edge function
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
    onError: () => {
      haptic.error();
    },
  });

  // Delete announcement via edge function
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
    onError: () => {
      haptic.error();
    },
  });

  const getStatusInfo = (a: Announcement) => {
    if (a.starts_at && new Date(a.starts_at) > new Date()) {
      return { label: 'Scheduled', cls: 'bg-amber-500/15 text-amber-400' };
    }
    if (a.ends_at && new Date(a.ends_at) < new Date()) {
      return { label: 'Expired', cls: 'bg-red-500/15 text-red-400' };
    }
    if (a.is_active) {
      return { label: 'Live', cls: 'bg-green-500/15 text-green-400' };
    }
    return { label: 'Inactive', cls: 'bg-white/[0.06] !text-white' };
  };

  const activeCount = announcements?.filter((a) => a.is_active).length || 0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="pb-20">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-2xl font-bold !text-white">Announcements</h1>
            <p className="text-sm !text-white mt-0.5">{activeCount} active</p>
          </div>
          <Button
            className="h-11 gap-2 rounded-xl touch-manipulation bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold shadow-lg shadow-amber-500/20 px-4"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
        </motion.div>

        {/* ── List ── */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-premium rounded-2xl overflow-hidden animate-pulse border-l-2 border-white/10">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/[0.06]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-white/[0.06] rounded" />
                      <div className="h-3 w-full bg-white/[0.06] rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2 pl-[52px]">
                    <div className="h-6 w-16 bg-white/[0.06] rounded-full" />
                    <div className="h-6 w-12 bg-white/[0.06] rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : announcements?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <div className="w-20 h-20 rounded-full bg-white/[0.04] flex items-center justify-center mb-5">
              <Megaphone className="h-10 w-10 !text-white" />
            </div>
            <h3 className="text-base font-semibold !text-white mb-1">No announcements</h3>
            <p className="text-sm !text-white text-center max-w-[240px] mb-5">
              Create your first announcement to notify users
            </p>
            <Button
              onClick={() => setCreateOpen(true)}
              className="h-11 rounded-xl touch-manipulation gap-2 bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold shadow-lg shadow-amber-500/20 px-5"
            >
              <Plus className="h-4 w-4" />
              Create Announcement
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            {announcements?.map((announcement, index) => {
              const tc = typeConfig[announcement.type] || typeConfig.info;
              const status = getStatusInfo(announcement);

              return (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  className={cn(
                    'transition-all duration-150',
                    index > 0 && 'border-t border-white/[0.04]',
                    !announcement.is_active ? 'opacity-40 bg-white/[0.01]' : 'bg-white/[0.02]'
                  )}
                >
                  <div className="p-4">
                    {/* Top: Status + Time + Actions */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <Badge className={cn('text-[10px] px-2 py-0.5 h-5 font-semibold rounded-md border-0 capitalize', status.cls)}>
                          {status.label}
                        </Badge>
                        <Badge className={cn('text-[10px] px-2 py-0.5 h-5 font-semibold rounded-md border-0 capitalize', tc.bg, tc.text)}>
                          {announcement.type}
                        </Badge>
                        <span className="text-[11px] !text-white font-medium">
                          {relativeTime(new Date(announcement.created_at))}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateMutation.mutate({
                              id: announcement.id,
                              data: { is_active: !announcement.is_active },
                            })
                          }
                          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
                        >
                          {announcement.is_active ? (
                            <EyeOff className="h-3.5 w-3.5 !text-white" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 !text-white" />
                          )}
                        </button>
                        <button
                          onClick={() => setEditAnnouncement(announcement)}
                          className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation active:scale-95 transition-all"
                        >
                          <Pencil className="h-3.5 w-3.5 !text-white" />
                        </button>
                        {isSuperAdmin && (
                          <button
                            onClick={() => setDeleteId(announcement.id)}
                            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-red-500/10 touch-manipulation active:scale-95 transition-all"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <p className="font-semibold text-[15px] !text-white mb-1">
                      {announcement.title}
                    </p>

                    {/* Message */}
                    <p className="text-[13px] !text-white line-clamp-2 leading-relaxed mb-2.5">
                      {announcement.message}
                    </p>

                    {/* Footer stats */}
                    <div className="flex items-center gap-4 text-[11px] !text-white font-medium">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3 w-3" />
                        {announcement.target_roles.length === 4 ? 'All roles' : `${announcement.target_roles.length} roles`}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-3 w-3" />
                        {announcement.dismissal_count || 0} dismissed
                      </span>
                      {announcement.is_dismissible && (
                        <span className="flex items-center gap-1.5">
                          <X className="h-3 w-3" />
                          Dismissible
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ── Create/Edit Sheet ── */}
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
                <SheetTitle className="!text-white text-lg">
                  {editAnnouncement ? 'Edit Announcement' : 'New Announcement'}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label className="!text-white text-xs font-semibold uppercase tracking-wider">Title</Label>
                  <Input
                    value={editAnnouncement?.title || formData.title}
                    onChange={(e) =>
                      editAnnouncement
                        ? setEditAnnouncement({ ...editAnnouncement, title: e.target.value })
                        : setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. New feature available"
                    className="h-12 touch-manipulation bg-white/[0.04] border-white/[0.08] rounded-xl text-base focus:!border-yellow-500 placeholder:!text-white"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label className="!text-white text-xs font-semibold uppercase tracking-wider">Message</Label>
                  <Textarea
                    value={editAnnouncement?.message || formData.message}
                    onChange={(e) =>
                      editAnnouncement
                        ? setEditAnnouncement({ ...editAnnouncement, message: e.target.value })
                        : setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="What do you want to tell users?"
                    className="min-h-[100px] touch-manipulation bg-white/[0.04] border-white/[0.08] rounded-xl text-base focus:!border-yellow-500 placeholder:!text-white"
                  />
                </div>

                {/* Type — Chip selector */}
                <div className="space-y-2">
                  <Label className="!text-white text-xs font-semibold uppercase tracking-wider">Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['info', 'warning', 'success', 'error'] as const).map((t) => {
                      const selected = (editAnnouncement?.type || formData.type) === t;
                      const cfg = typeConfig[t];
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
                            'h-11 rounded-xl text-sm font-semibold capitalize touch-manipulation transition-all active:scale-95 flex items-center justify-center gap-1.5',
                            selected
                              ? cn(cfg.bg, cfg.text, 'ring-2', t === 'info' ? 'ring-blue-400' : t === 'warning' ? 'ring-amber-400' : t === 'success' ? 'ring-green-400' : 'ring-red-400')
                              : 'bg-white/[0.04] !text-white border border-white/[0.08]'
                          )}
                        >
                          <span className={selected ? cfg.text : '!text-white'}>{typeIcons[t]}</span>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Options section */}
                <div className="space-y-3">
                  <Label className="!text-white text-xs font-semibold uppercase tracking-wider">Options</Label>

                  {/* Dismissible toggle */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <X className="h-4 w-4 !text-white" />
                      <p className="text-sm font-medium !text-white">Dismissible</p>
                    </div>
                    <Switch
                      checked={editAnnouncement?.is_dismissible ?? formData.is_dismissible}
                      onCheckedChange={(checked) =>
                        editAnnouncement
                          ? setEditAnnouncement({ ...editAnnouncement, is_dismissible: checked })
                          : setFormData({ ...formData, is_dismissible: checked })
                      }
                    />
                  </div>

                  {/* Schedule toggle + input */}
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] overflow-hidden">
                    <div className="flex items-center justify-between p-3.5">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        <p className="text-sm font-medium !text-white">Schedule for later</p>
                      </div>
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
                    {(editAnnouncement?.starts_at || formData.starts_at || (editAnnouncement && editAnnouncement.starts_at !== '')) && (
                      <div className="px-3.5 pb-3.5 pt-0">
                        <Input
                          type="datetime-local"
                          value={editAnnouncement?.starts_at?.slice(0, 16) || formData.starts_at}
                          onChange={(e) =>
                            editAnnouncement
                              ? setEditAnnouncement({ ...editAnnouncement, starts_at: e.target.value })
                              : setFormData({ ...formData, starts_at: e.target.value })
                          }
                          className="h-11 touch-manipulation bg-white/[0.04] border-white/[0.08] rounded-lg focus:!border-yellow-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Auto-expire toggle + input */}
                  <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] overflow-hidden">
                    <div className="flex items-center justify-between p-3.5">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-red-400" />
                        <p className="text-sm font-medium !text-white">Auto-expire</p>
                      </div>
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
                    {(editAnnouncement?.ends_at || formData.ends_at || (editAnnouncement && editAnnouncement.ends_at !== '' && editAnnouncement.ends_at !== null)) && (
                      <div className="px-3.5 pb-3.5 pt-0">
                        <Input
                          type="datetime-local"
                          value={editAnnouncement?.ends_at?.slice(0, 16) || formData.ends_at}
                          onChange={(e) =>
                            editAnnouncement
                              ? setEditAnnouncement({ ...editAnnouncement, ends_at: e.target.value })
                              : setFormData({ ...formData, ends_at: e.target.value })
                          }
                          className="h-11 touch-manipulation bg-white/[0.04] border-white/[0.08] rounded-lg focus:!border-yellow-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <SheetFooter className="p-5 border-t border-white/[0.06]">
                <Button
                  className="w-full h-12 touch-manipulation rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold shadow-lg shadow-amber-500/20 text-base"
                  onClick={() => {
                    if (editAnnouncement) {
                      updateMutation.mutate({ id: editAnnouncement.id, data: editAnnouncement });
                    } else {
                      createMutation.mutate(formData);
                    }
                  }}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editAnnouncement ? 'Saving...' : 'Creating...'}
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

        {/* ── Delete Confirmation ── */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation rounded-xl"
                disabled={deleteMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-red-500 hover:bg-red-600 rounded-xl"
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}

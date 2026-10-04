import { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const DISMISSED_STORAGE_KEY = 'elec-dismissed-announcements';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  target_roles: string[];
  is_dismissible: boolean;
  starts_at: string;
  ends_at: string | null;
}

/*
 * Volt (4 Oct 2026). Was a translucent green/blue/amber/red box with an icon —
 * Andrew: "the little green success thing that pops up, can we design this
 * better". Now the hub card material: neutral lit surface, gold hairline,
 * type carried by the label word and edge colour, no icons. Volt is only a
 * line or text here — a translucent fill goes muddy on this ground.
 */
const typeStyles: Record<
  Announcement['type'],
  { label: string; edge: string; tone: string; line: string }
> = {
  info: {
    label: 'From Elec-Mate',
    edge: 'border-elec-yellow/35',
    tone: 'text-elec-yellow',
    line: 'via-elec-yellow/55',
  },
  success: {
    label: 'From Elec-Mate',
    edge: 'border-elec-yellow/35',
    tone: 'text-elec-yellow',
    line: 'via-elec-yellow/55',
  },
  warning: {
    label: 'Heads up',
    edge: 'border-amber-400/50',
    tone: 'text-amber-300',
    line: 'via-amber-300/70',
  },
  error: {
    label: 'Important',
    edge: 'border-red-400/50',
    tone: 'text-red-300',
    line: 'via-red-300/70',
  },
};

/**
 * One announcement. Long messages fold to three lines so the banner never
 * pushes the page away — "Read more" appears only when the text is actually
 * cut off at this width (a character count showed it on desktop for a
 * message that already fitted).
 */
function AnnouncementCard({
  announcement,
  onDismiss,
}: {
  announcement: Announcement;
  onDismiss: () => void;
}) {
  const style = typeStyles[announcement.type] || typeStyles.info;
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || open) return;
    const measure = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, announcement.message]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -12 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className={cn('relative overflow-hidden rounded-2xl border', CARD_SURFACE, style.edge)}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent',
          style.line
        )}
      />
      <div className="px-4 pb-3 pt-3.5 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              'pt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]',
              style.tone
            )}
          >
            {style.label}
          </p>
          {announcement.is_dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className="-mr-2 -mt-2.5 h-11 shrink-0 px-2 text-[12.5px] font-semibold text-white touch-manipulation active:scale-[0.97]"
              aria-label={`Dismiss: ${announcement.title}`}
            >
              Dismiss
            </button>
          )}
        </div>
        <h4 className="text-[15px] font-semibold leading-snug tracking-tight !text-white">
          {announcement.title}
        </h4>
        <p
          ref={textRef}
          className={cn('mt-1 text-[14px] leading-relaxed !text-white', !open && 'line-clamp-3')}
        >
          {announcement.message}
        </p>
        {(clamped || open) && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              '-ml-1 h-9 px-1 text-[13px] font-semibold touch-manipulation',
              style.tone
            )}
          >
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Helper to get dismissed IDs from storage
function getLocalDismissed(): string[] {
  return storageGetJSONSync<string[]>(DISMISSED_STORAGE_KEY, []);
}

// Helper to save dismissed ID to storage
function saveLocalDismissed(ids: string[]) {
  storageSetJSONSync(DISMISSED_STORAGE_KEY, ids);
}

export default function AnnouncementBanner() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(() => {
    // Initialize with localStorage data immediately
    return new Set(getLocalDismissed());
  });

  // Fetch active announcements
  const { data: announcements } = useQuery({
    queryKey: ['active-announcements', profile?.role],
    queryFn: async () => {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from('admin_announcements')
        .select('*')
        .eq('is_active', true)
        .lte('starts_at', now)
        .or(`ends_at.is.null,ends_at.gt.${now}`)
        .order('created_at', { ascending: false });

      if (error) return [];

      // Filter by user's role
      const userRole = profile?.role || 'visitor';
      return (data || []).filter(
        (a: Announcement) => a.target_roles.includes(userRole) || a.target_roles.includes('all')
      );
    },
    enabled: !!user,
    refetchInterval: 5 * 60_000, // Every 5 minutes — announcements aren't urgent
    staleTime: 2 * 60_000,
    retry: 2,
  });

  // Fetch user's dismissed announcements
  const { data: dismissedAnnouncements } = useQuery({
    queryKey: ['dismissed-announcements', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('admin_announcement_dismissals')
        .select('announcement_id')
        .eq('user_id', user.id);

      if (error) return [];

      return data?.map((d) => d.announcement_id) || [];
    },
    enabled: !!user?.id,
  });

  // Merge database dismissals with localStorage on load
  useEffect(() => {
    if (dismissedAnnouncements) {
      const localDismissed = getLocalDismissed();
      const merged = new Set([...localDismissed, ...dismissedAnnouncements]);
      setDismissedIds(merged);
      // Sync merged list back to localStorage
      saveLocalDismissed([...merged]);
    }
  }, [dismissedAnnouncements]);

  // Dismiss mutation - saves to both localStorage and database
  const dismissMutation = useMutation({
    mutationFn: async (announcementId: string) => {
      // Always save to localStorage first (works even without auth)
      const currentDismissed = getLocalDismissed();
      if (!currentDismissed.includes(announcementId)) {
        saveLocalDismissed([...currentDismissed, announcementId]);
      }

      // If logged in, also save to database
      if (!user?.id) return;

      const { error } = await supabase.from('admin_announcement_dismissals').insert({
        announcement_id: announcementId,
        user_id: user.id,
      });

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }
    },
    onMutate: (announcementId) => {
      // Optimistically update UI
      setDismissedIds((prev) => new Set([...prev, announcementId]));
    },
    onError: (_, announcementId) => {
      // Only revert UI if localStorage also failed (very rare)
      const localDismissed = getLocalDismissed();
      if (!localDismissed.includes(announcementId)) {
        setDismissedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(announcementId);
          return newSet;
        });
      }
    },
  });

  // Filter out dismissed announcements
  const visibleAnnouncements =
    announcements?.filter((a: Announcement) => !dismissedIds.has(a.id)) || [];

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence mode="popLayout">
        {visibleAnnouncements.map((announcement: Announcement) => {
          return (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onDismiss={() => dismissMutation.mutate(announcement.id)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

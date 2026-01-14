import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { X, Info, AlertTriangle, CheckCircle, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const DISMISSED_STORAGE_KEY = "elec-dismissed-announcements";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  target_roles: string[];
  is_dismissible: boolean;
  starts_at: string;
  ends_at: string | null;
}

const typeStyles = {
  info: {
    bg: "bg-blue-500/10 border-blue-500/30",
    icon: Info,
    iconColor: "text-blue-400",
  },
  warning: {
    bg: "bg-amber-500/10 border-amber-500/30",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
  },
  success: {
    bg: "bg-green-500/10 border-green-500/30",
    icon: CheckCircle,
    iconColor: "text-green-400",
  },
  error: {
    bg: "bg-red-500/10 border-red-500/30",
    icon: Megaphone,
    iconColor: "text-red-400",
  },
};

// Helper to get dismissed IDs from localStorage
function getLocalDismissed(): string[] {
  try {
    const stored = localStorage.getItem(DISMISSED_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Helper to save dismissed ID to localStorage
function saveLocalDismissed(ids: string[]) {
  try {
    localStorage.setItem(DISMISSED_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage errors
  }
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
    queryKey: ["active-announcements", profile?.role],
    queryFn: async () => {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("admin_announcements")
        .select("*")
        .eq("is_active", true)
        .lte("starts_at", now)
        .or(`ends_at.is.null,ends_at.gt.${now}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching announcements:", error);
        return [];
      }

      // Filter by user's role
      const userRole = profile?.role || "visitor";
      return (data || []).filter((a: Announcement) =>
        a.target_roles.includes(userRole) || a.target_roles.includes("all")
      );
    },
    enabled: !!user,
    refetchInterval: 60000, // Refresh every minute
  });

  // Fetch user's dismissed announcements
  const { data: dismissedAnnouncements } = useQuery({
    queryKey: ["dismissed-announcements", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("admin_announcement_dismissals")
        .select("announcement_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching dismissals:", error);
        return [];
      }

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

      const { error } = await supabase
        .from("admin_announcement_dismissals")
        .insert({
          announcement_id: announcementId,
          user_id: user.id,
        });

      if (error && !error.message.includes("duplicate")) {
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
  const visibleAnnouncements = announcements?.filter(
    (a: Announcement) => !dismissedIds.has(a.id)
  ) || [];

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence mode="popLayout">
        {visibleAnnouncements.map((announcement: Announcement) => {
          const style = typeStyles[announcement.type] || typeStyles.info;
          const Icon = style.icon;

          return (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "rounded-xl border p-4 touch-manipulation",
                style.bg
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("mt-0.5 shrink-0", style.iconColor)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {announcement.message}
                  </p>
                </div>
                {announcement.is_dismissible && (
                  <button
                    onClick={() => dismissMutation.mutate(announcement.id)}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 touch-manipulation active:scale-95 transition-transform"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

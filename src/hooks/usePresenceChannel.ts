import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   usePresenceChannel — Supabase Realtime presence for a single resource.

   Call with a stable channel key (e.g. `portfolio:submission:${id}`) and
   the hook will:
     • subscribe to that channel
     • track current viewer with displayName + colour
     • return the array of OTHER viewers (excluding self)

   Used to render "Sarah is also viewing this" badges. Lightweight — only
   active while the consumer mounts.
   ========================================================================== */

export interface PresenceEntry {
  user_id: string;
  display_name: string;
  joined_at: number;
}

const COLOURS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-orange-500',
];

export function colourFor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = (hash * 31 + userId.charCodeAt(i)) | 0;
  return COLOURS[Math.abs(hash) % COLOURS.length];
}

export function usePresenceChannel(channelKey: string | null) {
  const { user, profile } = useAuth();
  const [others, setOthers] = useState<PresenceEntry[]>([]);

  useEffect(() => {
    if (!channelKey || !user?.id) {
      setOthers([]);
      return;
    }
    const myId = user.id;
    const displayName =
      (profile as { full_name?: string | null } | null)?.full_name ?? user.email ?? 'Someone';

    const channel = supabase.channel(channelKey, {
      config: { presence: { key: myId } },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PresenceEntry>();
        const flat = Object.entries(state).flatMap(([uid, metas]) =>
          metas.map((m) => ({ ...m, user_id: uid }))
        );
        // De-dupe by user_id and exclude self
        const seen = new Map<string, PresenceEntry>();
        for (const e of flat) {
          if (e.user_id === myId) continue;
          // keep the earliest joined_at if duplicate
          const existing = seen.get(e.user_id);
          if (!existing || (e.joined_at && e.joined_at < existing.joined_at)) {
            seen.set(e.user_id, e);
          }
        }
        setOthers(Array.from(seen.values()));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: myId,
            display_name: displayName,
            joined_at: Date.now(),
          });
        }
      });

    return () => {
      void channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [channelKey, user?.id, profile]);

  return { others };
}

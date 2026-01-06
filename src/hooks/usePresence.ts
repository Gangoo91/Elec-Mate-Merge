import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  getUserPresence,
  getMultipleUsersPresence,
  updatePresence,
  PresenceManager,
  UserPresence,
  calculateStatus,
} from '@/services/presenceService';

/**
 * Hook to manage current user's presence
 */
export const useMyPresence = (userId: string | undefined) => {
  const managerRef = useRef<PresenceManager | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Create and start presence manager
    managerRef.current = new PresenceManager(userId);
    managerRef.current.start();

    // Cleanup on unmount
    return () => {
      if (managerRef.current) {
        managerRef.current.stop();
        managerRef.current = null;
      }
    };
  }, [userId]);

  // Also handle beforeunload to set offline
  useEffect(() => {
    if (!userId) return;

    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable offline status on page close
      const data = JSON.stringify({
        user_id: userId,
        status: 'offline',
        is_online: false,
        last_seen: new Date().toISOString(),
      });

      // Note: This would need a server endpoint to work properly
      // navigator.sendBeacon('/api/presence/offline', data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [userId]);
};

/**
 * Hook to get another user's presence with real-time updates
 */
export const useUserPresence = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const [realtimePresence, setRealtimePresence] = useState<UserPresence | null>(null);

  // Initial fetch
  const query = useQuery({
    queryKey: ['presence', userId],
    queryFn: () => getUserPresence(userId!),
    enabled: !!userId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });

  // Real-time subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`presence-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_presence',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newPresence = payload.new as UserPresence;
          setRealtimePresence(newPresence);
          queryClient.setQueryData(['presence', userId], newPresence);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  // Combine query data with realtime updates
  const presence = realtimePresence || query.data;

  // Calculate actual status based on last_seen
  const actualStatus = presence
    ? calculateStatus(presence.last_seen)
    : 'offline';

  return {
    ...query,
    data: presence,
    status: actualStatus,
    isOnline: actualStatus === 'online',
    isAway: actualStatus === 'away',
    isOffline: actualStatus === 'offline',
  };
};

/**
 * Hook to get presence for multiple users
 */
export const useMultipleUserPresence = (userIds: string[]) => {
  const queryClient = useQueryClient();
  const [presenceMap, setPresenceMap] = useState<Record<string, UserPresence>>({});

  // Initial fetch
  const query = useQuery({
    queryKey: ['presence', 'multiple', userIds.sort().join(',')],
    queryFn: () => getMultipleUsersPresence(userIds),
    enabled: userIds.length > 0,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  // Build presence map from query data
  useEffect(() => {
    if (query.data) {
      const map: Record<string, UserPresence> = {};
      query.data.forEach(p => {
        map[p.user_id] = p;
      });
      setPresenceMap(map);
    }
  }, [query.data]);

  // Real-time subscription for all users
  useEffect(() => {
    if (userIds.length === 0) return;

    const channel = supabase
      .channel('presence-multiple')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_presence',
        },
        (payload) => {
          const newPresence = payload.new as UserPresence;
          if (userIds.includes(newPresence.user_id)) {
            setPresenceMap(prev => ({
              ...prev,
              [newPresence.user_id]: newPresence,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userIds]);

  const getPresence = (userId: string): UserPresence | undefined => presenceMap[userId];

  const getStatus = (userId: string): 'online' | 'away' | 'offline' => {
    const presence = presenceMap[userId];
    return presence ? calculateStatus(presence.last_seen) : 'offline';
  };

  return {
    ...query,
    presenceMap,
    getPresence,
    getStatus,
  };
};

/**
 * Hook for Supabase Realtime Presence (channel-based presence)
 * This is more suitable for "who's currently viewing this conversation"
 */
export const useRealtimePresence = (channelName: string, userId: string, metadata?: Record<string, unknown>) => {
  const [presentUsers, setPresentUsers] = useState<Record<string, unknown>[]>([]);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!channelName || !userId) return;

    channelRef.current = supabase.channel(channelName, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channelRef.current
      .on('presence', { event: 'sync' }, () => {
        const state = channelRef.current?.presenceState() || {};
        const users = Object.values(state).flat();
        setPresentUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channelRef.current?.track({
            user_id: userId,
            online_at: new Date().toISOString(),
            ...metadata,
          });
        }
      });

    return () => {
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [channelName, userId, metadata]);

  return {
    presentUsers,
    userCount: presentUsers.length,
  };
};

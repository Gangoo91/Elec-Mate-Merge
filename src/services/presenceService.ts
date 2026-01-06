import { supabase } from '@/integrations/supabase/client';

export interface UserPresence {
  user_id: string;
  last_seen: string;
  is_online: boolean;
  status: 'online' | 'away' | 'offline';
  updated_at: string;
}

const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const AWAY_THRESHOLD = 5 * 60 * 1000; // 5 minutes
const OFFLINE_THRESHOLD = 10 * 60 * 1000; // 10 minutes

/**
 * Update user's presence status
 */
export const updatePresence = async (
  userId: string,
  status: 'online' | 'away' | 'offline' = 'online'
): Promise<void> => {
  const { error } = await supabase
    .from('user_presence')
    .upsert({
      user_id: userId,
      last_seen: new Date().toISOString(),
      is_online: status !== 'offline',
      status,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id',
    });

  if (error) {
    console.error('Error updating presence:', error);
  }
};

/**
 * Get user's presence
 */
export const getUserPresence = async (userId: string): Promise<UserPresence | null> => {
  const { data, error } = await supabase
    .from('user_presence')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { // Not found is ok
      console.error('Error fetching presence:', error);
    }
    return null;
  }

  return data;
};

/**
 * Get presence for multiple users
 */
export const getMultipleUsersPresence = async (userIds: string[]): Promise<UserPresence[]> => {
  if (userIds.length === 0) return [];

  const { data, error } = await supabase
    .from('user_presence')
    .select('*')
    .in('user_id', userIds);

  if (error) {
    console.error('Error fetching presence:', error);
    return [];
  }

  return data || [];
};

/**
 * Calculate user status based on last_seen
 */
export const calculateStatus = (lastSeen: string): 'online' | 'away' | 'offline' => {
  const lastSeenTime = new Date(lastSeen).getTime();
  const now = Date.now();
  const diff = now - lastSeenTime;

  if (diff < AWAY_THRESHOLD) return 'online';
  if (diff < OFFLINE_THRESHOLD) return 'away';
  return 'offline';
};

/**
 * Format last seen time for display
 */
export const formatLastSeen = (lastSeen: string): string => {
  const lastSeenDate = new Date(lastSeen);
  const now = new Date();
  const diffMs = now.getTime() - lastSeenDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return lastSeenDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Set user as offline
 */
export const setOffline = async (userId: string): Promise<void> => {
  await updatePresence(userId, 'offline');
};

/**
 * Get online status color
 */
export const getStatusColor = (status: 'online' | 'away' | 'offline'): string => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'away': return 'bg-yellow-500';
    case 'offline': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

/**
 * Create a presence heartbeat manager
 */
export class PresenceManager {
  private userId: string;
  private intervalId: NodeJS.Timeout | null = null;
  private visibilityHandler: (() => void) | null = null;
  private activityTimeout: NodeJS.Timeout | null = null;

  constructor(userId: string) {
    this.userId = userId;
  }

  start(): void {
    // Initial presence update
    updatePresence(this.userId, 'online');

    // Set up heartbeat interval
    this.intervalId = setInterval(() => {
      updatePresence(this.userId, 'online');
    }, HEARTBEAT_INTERVAL);

    // Track page visibility
    this.visibilityHandler = () => {
      if (document.hidden) {
        updatePresence(this.userId, 'away');
      } else {
        updatePresence(this.userId, 'online');
      }
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);

    // Track activity (mouse, keyboard)
    const activityHandler = () => {
      if (this.activityTimeout) {
        clearTimeout(this.activityTimeout);
      }
      updatePresence(this.userId, 'online');
      this.activityTimeout = setTimeout(() => {
        updatePresence(this.userId, 'away');
      }, AWAY_THRESHOLD);
    };

    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);
    window.addEventListener('click', activityHandler);
    window.addEventListener('scroll', activityHandler);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }

    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout);
      this.activityTimeout = null;
    }

    // Set offline when stopping
    setOffline(this.userId);
  }
}

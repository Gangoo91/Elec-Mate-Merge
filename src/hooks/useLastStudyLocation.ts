/**
 * useLastStudyLocation
 *
 * Tracks and retrieves the user's last study location for "Continue where you left off" functionality.
 * Updates profile with last visited course/section path.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LastStudyLocation {
  path: string;
  title: string;
  lastStudiedAt: string;
}

export function useLastStudyLocation() {
  const { user } = useAuth();
  const [lastLocation, setLastLocation] = useState<LastStudyLocation | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch last study location from profile
  const fetchLastLocation = useCallback(async () => {
    if (!user) {
      setLastLocation(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('last_study_path, last_study_title, last_study_at')
        .eq('id', user.id)
        .single();

      if (error) {
        // Columns may not exist yet - fail silently
        console.warn('Last study location not available:', error.message);
        setLastLocation(null);
        return;
      }

      if (data?.last_study_path) {
        setLastLocation({
          path: data.last_study_path,
          title: data.last_study_title || 'Continue Learning',
          lastStudiedAt: data.last_study_at || new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error fetching last study location:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLastLocation();
  }, [fetchLastLocation]);

  // Update last study location
  const updateLastLocation = useCallback(async (path: string, title: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          last_study_path: path,
          last_study_title: title,
          last_study_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        // Columns may not exist yet - fail silently
        console.warn('Could not update last study location:', error.message);
        return;
      }

      // Update local state
      setLastLocation({
        path,
        title,
        lastStudiedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating last study location:', error);
    }
  }, [user]);

  // Format the last studied time
  const getLastStudiedDisplay = useCallback(() => {
    if (!lastLocation?.lastStudiedAt) return 'Never';

    const date = new Date(lastLocation.lastStudiedAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }, [lastLocation]);

  return {
    lastLocation,
    loading,
    updateLastLocation,
    getLastStudiedDisplay,
    refetch: fetchLastLocation,
  };
}

export default useLastStudyLocation;

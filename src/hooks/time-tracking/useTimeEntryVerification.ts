/**
 * useTimeEntryVerification
 *
 * Hook for managing supervisor verification of OJT time entries.
 * Mirrors useSupervisorVerification.ts but targets time_entries instead of portfolio_items.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { SupervisorVerification } from '@/hooks/portfolio/useSupervisorVerification';
import type { TimeEntry } from '@/types/time-tracking';

interface CreateTimeEntryVerificationOptions {
  timeEntry: TimeEntry;
  apprenticeName: string;
}

// Generate a random 12-char token
function generateToken(length = 12): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// SHA-256 hash via Web Crypto API
async function hashSnapshot(
  snapshot: Record<string, unknown>
): Promise<string> {
  const data = JSON.stringify(snapshot);
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function useTimeEntryVerification() {
  const { user } = useAuth();
  const [verifications, setVerifications] = useState<
    SupervisorVerification[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch time_entry verifications for the current user
  const fetchVerifications = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('supervisor_verifications')
        .select('*')
        .eq('requested_by', user.id)
        .eq('verification_type', 'time_entry')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVerifications((data as SupervisorVerification[]) || []);
    } catch (err) {
      console.error('Error fetching time entry verifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Create a new verification request for a time entry
  const createVerification = useCallback(
    async (
      options: CreateTimeEntryVerificationOptions
    ): Promise<SupervisorVerification | null> => {
      if (!user) {
        toast.error('You must be logged in');
        return null;
      }

      try {
        const token = generateToken();
        const snapshot: Record<string, unknown> = {
          activity: options.timeEntry.activity,
          duration_minutes: options.timeEntry.duration,
          date: options.timeEntry.date,
          notes: options.timeEntry.notes || '',
        };
        const evidenceHash = await hashSnapshot(snapshot);

        const { data, error } = await supabase
          .from('supervisor_verifications')
          .insert({
            time_entry_id: options.timeEntry.id,
            verification_type: 'time_entry',
            verification_token: token,
            requested_by: user.id,
            apprentice_name: options.apprenticeName,
            evidence_snapshot: snapshot,
            evidence_hash: evidenceHash,
          })
          .select()
          .single();

        if (error) throw error;

        setVerifications((prev) => [
          data as SupervisorVerification,
          ...prev,
        ]);
        toast.success('Verification link created!');
        return data as SupervisorVerification;
      } catch (err) {
        console.error('Error creating time entry verification:', err);
        toast.error('Failed to create verification link');
        return null;
      }
    },
    [user]
  );

  // Get the verification URL for a token
  const getVerificationUrl = useCallback((token: string): string => {
    return `${window.location.origin}/verify-evidence/${token}`;
  }, []);

  // Get verification for a specific time entry
  const getVerificationForTimeEntry = useCallback(
    (timeEntryId: string): SupervisorVerification | undefined => {
      return verifications.find((v) => v.time_entry_id === timeEntryId);
    },
    [verifications]
  );

  // Revoke a verification
  const revokeVerification = useCallback(
    async (id: string): Promise<boolean> => {
      if (!user) return false;
      try {
        const { error } = await supabase
          .from('supervisor_verifications')
          .update({ is_active: false })
          .eq('id', id)
          .eq('requested_by', user.id);

        if (error) throw error;
        setVerifications((prev) => prev.filter((v) => v.id !== id));
        toast.success('Verification link revoked');
        return true;
      } catch (err) {
        console.error('Error revoking verification:', err);
        toast.error('Failed to revoke verification');
        return false;
      }
    },
    [user]
  );

  // Load on mount
  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  // Realtime subscription — updates when supervisor signs
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('time_entry_verifications_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'supervisor_verifications',
          filter: `requested_by=eq.${user.id}`,
        },
        (payload) => {
          const updated = payload.new as SupervisorVerification;
          if (updated.verification_type === 'time_entry') {
            setVerifications((prev) =>
              prev.map((v) => (v.id === updated.id ? updated : v))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    verifications,
    isLoading,
    createVerification,
    getVerificationUrl,
    getVerificationForTimeEntry,
    revokeVerification,
    refetch: fetchVerifications,
  };
}

export default useTimeEntryVerification;

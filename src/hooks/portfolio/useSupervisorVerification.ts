/**
 * useSupervisorVerification
 *
 * Hook for managing supervisor witness statements on portfolio evidence.
 * Pattern follows usePortfolioSharing.ts.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SupervisorVerification {
  id: string;
  portfolio_item_id: string | null;
  diary_entry_id: string | null;
  time_entry_id: string | null;
  verification_type: 'portfolio' | 'diary' | 'time_entry';
  verification_token: string;
  requested_by: string;
  apprentice_name: string;
  evidence_snapshot: Record<string, unknown>;
  evidence_hash: string;
  supervisor_name: string | null;
  supervisor_company: string | null;
  supervisor_email: string | null;
  confirmation_checked: boolean;
  feedback_text: string | null;
  voice_note_url: string | null;
  signature_data: string | null;
  verified_at: string | null;
  geo_latitude: number | null;
  geo_longitude: number | null;
  geo_accuracy: number | null;
  verification_hash: string | null;
  expires_at: string;
  is_active: boolean;
  view_count: number;
  created_at: string;
}

interface CreateVerificationOptions {
  portfolioItemId: string;
  diaryEntryId?: string;
  evidenceSnapshot: Record<string, unknown>;
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

export function useSupervisorVerification() {
  const { user } = useAuth();
  const [verifications, setVerifications] = useState<
    SupervisorVerification[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all verifications for the current user
  const fetchVerifications = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('supervisor_verifications')
        .select('*')
        .eq('requested_by', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVerifications((data as SupervisorVerification[]) || []);
    } catch (err) {
      console.error('Error fetching verifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Create a new verification request
  const createVerification = useCallback(
    async (
      options: CreateVerificationOptions
    ): Promise<SupervisorVerification | null> => {
      if (!user) {
        toast.error('You must be logged in');
        return null;
      }

      try {
        const token = generateToken();
        const evidenceHash = await hashSnapshot(options.evidenceSnapshot);

        const { data, error } = await supabase
          .from('supervisor_verifications')
          .insert({
            portfolio_item_id: options.portfolioItemId,
            diary_entry_id: options.diaryEntryId || null,
            verification_token: token,
            requested_by: user.id,
            apprentice_name: options.apprenticeName,
            evidence_snapshot: options.evidenceSnapshot,
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
        console.error('Error creating verification:', err);
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

  // Get verification for a specific portfolio item
  const getVerificationForPortfolioItem = useCallback(
    (portfolioItemId: string): SupervisorVerification | undefined => {
      return verifications.find(
        (v) => v.portfolio_item_id === portfolioItemId
      );
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

  // Copy verification link to clipboard
  const copyVerificationLink = useCallback(
    async (token: string): Promise<boolean> => {
      const url = getVerificationUrl(token);
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Verification link copied!');
        return true;
      } catch {
        toast.error('Failed to copy link');
        return false;
      }
    },
    [getVerificationUrl]
  );

  // Load on mount
  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  // Realtime subscription — updates when witness signs
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('supervisor_verifications_changes')
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
          setVerifications((prev) =>
            prev.map((v) => (v.id === updated.id ? updated : v))
          );
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
    getVerificationForPortfolioItem,
    revokeVerification,
    copyVerificationLink,
    refetch: fetchVerifications,
  };
}

export default useSupervisorVerification;

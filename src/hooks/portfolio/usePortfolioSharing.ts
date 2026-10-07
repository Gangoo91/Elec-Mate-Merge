/**
 * usePortfolioSharing
 *
 * Hook for managing portfolio share links.
 * Provides functionality to create, list and revoke share links, and reads
 * each link's open log (portfolio_share_views, ELE-1885).
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { copyToClipboard } from '@/utils/clipboard';

export interface PortfolioShare {
  id: string;
  user_id: string;
  entry_ids: string[] | null;
  token: string;
  title: string | null;
  description: string | null;
  expires_at: string | null;
  view_count: number;
  last_viewed_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** How often a link has been opened (one row per IP per 10 minutes, server side). */
export interface ShareViewSummary {
  count: number;
  last_viewed_at: string | null;
}

export type ShareExpiry = '24h' | '7d' | '30d' | '90d';

interface CreateShareOptions {
  entryIds?: string[];
  title?: string;
  description?: string;
  /** Every link expires; 90 days is the longest the server accepts. */
  expiresIn?: ShareExpiry;
}

// Generate a random token
function generateToken(length = 20): string {
  // Crypto-strong — this token is the only thing guarding shared portfolio PII,
  // so it must not be predictable (Math.random is not).
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(bytes[i] % chars.length);
  }
  return token;
}

// Calculate expiration date (defaults to 7 days; links never last forever)
function calculateExpiry(expiresIn: ShareExpiry = '7d'): string {
  const now = new Date();
  switch (expiresIn) {
    case '24h':
      now.setHours(now.getHours() + 24);
      break;
    case '7d':
      now.setDate(now.getDate() + 7);
      break;
    case '30d':
      now.setDate(now.getDate() + 30);
      break;
    case '90d':
      now.setDate(now.getDate() + 90);
      break;
  }
  return now.toISOString();
}

export function usePortfolioSharing() {
  const { user } = useAuth();
  const [shares, setShares] = useState<PortfolioShare[]>([]);
  const [views, setViews] = useState<Record<string, ShareViewSummary>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's share links
  const fetchShares = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('portfolio_shares')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setShares(data || []);

      // Open log for these links. RLS returns only the owner's rows.
      const ids = (data || []).map((s) => s.id);
      if (ids.length > 0) {
        const { data: rows, error: viewsError } = await supabase
          .from('portfolio_share_views' as any)
          .select('share_id, viewed_at')
          .in('share_id', ids)
          .order('viewed_at', { ascending: false })
          .limit(1000);
        if (viewsError) {
          console.error('Error fetching share views:', viewsError);
        } else {
          const summary: Record<string, ShareViewSummary> = {};
          for (const r of (rows ?? []) as unknown as { share_id: string; viewed_at: string }[]) {
            const v = (summary[r.share_id] ??= { count: 0, last_viewed_at: r.viewed_at });
            v.count += 1;
          }
          setViews(summary);
        }
      } else {
        setViews({});
      }
    } catch (err) {
      console.error('Error fetching shares:', err);
      setError('Failed to load share links');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Create a new share link
  const createShareLink = useCallback(
    async (options: CreateShareOptions = {}): Promise<PortfolioShare | null> => {
      if (!user) {
        toast.error('You must be logged in to create share links');
        return null;
      }

      try {
        const token = generateToken();
        const expiresAt = calculateExpiry(options.expiresIn);

        const { data, error: insertError } = await supabase
          .from('portfolio_shares')
          .insert({
            user_id: user.id,
            token,
            entry_ids: options.entryIds || null,
            title: options.title || null,
            description: options.description || null,
            expires_at: expiresAt,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Add to local state
        setShares((prev) => [data, ...prev]);
        toast.success('Share link created!');

        return data;
      } catch (err) {
        console.error('Error creating share:', err);
        toast.error('Failed to create share link');
        return null;
      }
    },
    [user]
  );

  // Revoke a share link
  const revokeShareLink = useCallback(
    async (shareId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        const { error: updateError } = await supabase
          .from('portfolio_shares')
          .update({ is_active: false })
          .eq('id', shareId)
          .eq('user_id', user.id);

        if (updateError) throw updateError;

        // Remove from local state
        setShares((prev) => prev.filter((s) => s.id !== shareId));
        toast.success('Share link revoked');

        return true;
      } catch (err) {
        console.error('Error revoking share:', err);
        toast.error('Failed to revoke share link');
        return false;
      }
    },
    [user]
  );

  // Generate share URL
  const getShareUrl = useCallback((token: string): string => {
    return `${window.location.origin}/view/${token}`;
  }, []);

  // Copy share link to clipboard
  const copyShareLink = useCallback(
    async (token: string): Promise<boolean> => {
      const url = getShareUrl(token);
      try {
        await copyToClipboard(url);
        toast.success('Link copied to clipboard!');
        return true;
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        toast.error('Failed to copy link');
        return false;
      }
    },
    [getShareUrl]
  );

  // Load shares on mount
  useEffect(() => {
    fetchShares();
  }, [fetchShares]);

  return {
    shares,
    views,
    isLoading,
    error,
    createShareLink,
    revokeShareLink,
    getShareUrl,
    copyShareLink,
    refetch: fetchShares,
  };
}

export default usePortfolioSharing;

/**
 * usePortfolioSharing
 *
 * Hook for managing portfolio share links.
 * Provides functionality to create, list and revoke share links, and reads
 * each link's open log (portfolio_share_views, ELE-1885).
 *
 * ELE-1885: a link can carry a PIN (set_share_pin). A PIN link is shared as
 * /view/<public_token>; `linkToken(share)` gives whichever token the link uses.
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
  /** Set only when the link has a PIN: the token the link carries. */
  public_token?: string | null;
  pin_set_at?: string | null;
}

/** One open of a link (one row per IP per 10 minutes, server side). */
export interface ShareViewRow {
  viewed_at: string;
  user_agent: string | null;
}

/** How often a link has been opened (one row per IP per 10 minutes, server side). */
export interface ShareViewSummary {
  count: number;
  last_viewed_at: string | null;
  /** Newest first, up to 20. */
  recent: ShareViewRow[];
  /** Wrong PINs in the last 24 hours. */
  wrong_pins: number;
}

/** The token a share's link carries: the PIN link's public token, else the token. */
export const linkToken = (s: Pick<PortfolioShare, 'token' | 'public_token'>) =>
  s.public_token || s.token;

const SHARE_COLUMNS =
  'id, user_id, entry_ids, token, title, description, expires_at, view_count, last_viewed_at, is_active, created_at, updated_at, public_token, pin_set_at';

export type ShareExpiry = '24h' | '7d' | '30d' | '90d';

interface CreateShareOptions {
  entryIds?: string[];
  title?: string;
  description?: string;
  /** Every link expires; 90 days is the longest the server accepts. */
  expiresIn?: ShareExpiry;
  /** Optional 4 to 8 digit PIN, given to the viewer separately. */
  pin?: string;
}

type Rpc = (
  fn: string,
  args: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

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
        .select(SHARE_COLUMNS)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      const list = (data || []) as unknown as PortfolioShare[];
      setShares(list);

      // Open log for these links. RLS returns only the owner's rows.
      const ids = list.map((s) => s.id);
      if (ids.length > 0) {
        const { data: rows, error: viewsError } = await supabase
          .from('portfolio_share_views' as never)
          .select('share_id, viewed_at, user_agent')
          .in('share_id', ids)
          .order('viewed_at', { ascending: false })
          .limit(1000);
        const { data: pinRows } = await supabase
          .from('portfolio_share_pin_attempts' as never)
          .select('share_id')
          .in('share_id', ids)
          .eq('ok', false)
          .gte('attempted_at', new Date(Date.now() - 86_400_000).toISOString());
        if (viewsError) {
          console.error('Error fetching share views:', viewsError);
        } else {
          const summary: Record<string, ShareViewSummary> = {};
          const blank = (): ShareViewSummary => ({
            count: 0,
            last_viewed_at: null,
            recent: [],
            wrong_pins: 0,
          });
          for (const r of (rows ?? []) as unknown as {
            share_id: string;
            viewed_at: string;
            user_agent: string | null;
          }[]) {
            const v = (summary[r.share_id] ??= blank());
            v.count += 1;
            v.last_viewed_at ??= r.viewed_at;
            if (v.recent.length < 20)
              v.recent.push({ viewed_at: r.viewed_at, user_agent: r.user_agent });
          }
          for (const r of (pinRows ?? []) as unknown as { share_id: string }[]) {
            (summary[r.share_id] ??= blank()).wrong_pins += 1;
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
          .select(SHARE_COLUMNS)
          .single();

        if (insertError) throw insertError;
        let share = data as unknown as PortfolioShare;

        if (options.pin) {
          const { data: res, error: pinError } = await rpc('set_share_pin', {
            p_share_id: share.id,
            p_pin: options.pin,
          });
          const r = res as { link_token?: string; error?: string } | null;
          if (pinError || !r?.link_token) {
            // A PIN was asked for: never leave an unprotected link behind.
            await supabase.from('portfolio_shares').update({ is_active: false }).eq('id', share.id);
            toast.error('Could not set the PIN', {
              description: 'Use 4 to 8 numbers and try again.',
            });
            return null;
          }
          const { data: fresh } = await supabase
            .from('portfolio_shares')
            .select(SHARE_COLUMNS)
            .eq('id', share.id)
            .single();
          if (fresh) share = fresh as unknown as PortfolioShare;
        }

        // Add to local state
        setShares((prev) => [share, ...prev]);
        toast.success(options.pin ? 'Link created with a PIN' : 'Share link created');

        return share;
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
        toast.success('Link turned off');

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

  // Add, change or remove a link's PIN. Changing it gives the link a new
  // address, so a copy sent earlier stops working.
  const setSharePin = useCallback(
    async (shareId: string, pin: string | null): Promise<boolean> => {
      const { data: res, error: pinError } = await rpc('set_share_pin', {
        p_share_id: shareId,
        p_pin: pin,
      });
      const r = res as { link_token?: string; error?: string; message?: string } | null;
      if (pinError || !r?.link_token) {
        toast.error('Could not update the PIN', {
          description: r?.message ?? 'Check your connection and try again.',
        });
        return false;
      }
      toast.success(pin ? 'PIN set. Send the new link.' : 'PIN removed. Send the new link.');
      await fetchShares();
      return true;
    },
    [fetchShares]
  );

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
    setSharePin,
    getShareUrl,
    copyShareLink,
    refetch: fetchShares,
  };
}

export default usePortfolioSharing;

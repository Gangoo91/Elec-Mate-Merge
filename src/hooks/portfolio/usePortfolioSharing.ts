/**
 * usePortfolioSharing
 *
 * Hook for managing portfolio share links.
 * Provides functionality to create, list, revoke, and view shared portfolios.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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

export interface SharedPortfolioData {
  share_id: string;
  owner_name: string;
  share_title: string | null;
  share_description: string | null;
  entry_ids: string[] | null;
  is_valid: boolean;
}

interface CreateShareOptions {
  entryIds?: string[];
  title?: string;
  description?: string;
  expiresIn?: '24h' | '7d' | '30d' | 'never';
}

// Generate a random token
function generateToken(length = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Calculate expiration date
function calculateExpiry(expiresIn: string | undefined): string | null {
  if (!expiresIn || expiresIn === 'never') return null;

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
    default:
      return null;
  }
  return now.toISOString();
}

export function usePortfolioSharing() {
  const { user } = useAuth();
  const [shares, setShares] = useState<PortfolioShare[]>([]);
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

  // Get shared portfolio data by token (for public viewing)
  const getSharedPortfolio = useCallback(
    async (token: string): Promise<SharedPortfolioData | null> => {
      try {
        const { data, error: fetchError } = await supabase.rpc('get_shared_portfolio', {
          share_token: token,
        });

        if (fetchError) throw fetchError;
        if (!data || data.length === 0) return null;

        // Increment view count
        await supabase.rpc('increment_share_view', { share_token: token });

        return data[0];
      } catch (err) {
        console.error('Error fetching shared portfolio:', err);
        return null;
      }
    },
    []
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
        await navigator.clipboard.writeText(url);
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
    isLoading,
    error,
    createShareLink,
    revokeShareLink,
    getSharedPortfolio,
    getShareUrl,
    copyShareLink,
    refetch: fetchShares,
  };
}

export default usePortfolioSharing;

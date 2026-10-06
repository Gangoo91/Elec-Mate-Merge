import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { SafetyPhoto } from './useSafetyPhotos';

export interface PhotoShareLink {
  id: string;
  user_id: string;
  share_token: string;
  project_reference: string;
  title: string | null;
  message: string | null;
  company_name: string | null;
  photos_data: SharePhotoData[];
  requires_signature: boolean;
  client_name: string | null;
  client_email: string | null;
  signature_data: string | null;
  signed_at: string | null;
  signer_ip: string | null;
  view_count: number;
  last_viewed_at: string | null;
  expires_at: string | null;
  status: 'active' | 'signed' | 'expired' | 'revoked';
  created_at: string;
  updated_at: string;
}

export interface SharePhotoData {
  id: string;
  file_url: string;
  description: string;
  category: string;
  location: string | null;
  tags: string[] | null;
  created_at: string;
  photo_type?: string | null;
  notes?: string | null;
}

export interface CreateShareOptions {
  projectReference: string;
  projectId?: string;
  photos: SafetyPhoto[];
  photoTypes?: string[];
  title?: string;
  message?: string;
  companyName?: string;
  requiresSignature?: boolean;
  expiresInDays?: number;
}

/**
 * The share link IS the access control for a customer's photos, so the token
 * comes from the crypto RNG (it was Math.random, which is predictable).
 * 32 chars from 36 symbols ≈ 165 bits.
 */
function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  // 252 = 7 × 36: rejecting bytes above it keeps every symbol equally likely.
  let token = '';
  for (const b of bytes) if (b < 252) token += chars[b % 36];
  while (token.length < 32) {
    const [b] = crypto.getRandomValues(new Uint8Array(1));
    if (b < 252) token += chars[b % 36];
  }
  return token;
}

export function usePhotoShare() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all share links for the current user
  const shareLinksQuery = useQuery({
    queryKey: ['photo-share-links', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];

      try {
        const { data, error } = await supabase
          .from('photo_share_links')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (error) {
          // Table might not exist yet - graceful fallback
          if (error.code === '42P01' || error.message?.includes('does not exist')) {
            return [];
          }
          throw error;
        }

        return (data || []) as PhotoShareLink[];
      } catch {
        return [];
      }
    },
    enabled: !!session?.user?.id,
  });

  // Create a share link
  const createShareMutation = useMutation({
    mutationFn: async (options: CreateShareOptions) => {
      if (!session?.user?.id) throw new Error('Not authenticated');

      const token = generateToken();
      const photosData: SharePhotoData[] = options.photos.map((p) => ({
        id: p.id,
        file_url: p.file_url,
        description: p.description,
        category: p.category,
        location: p.location,
        tags: p.tags,
        created_at: p.created_at,
        photo_type: p.photo_type || null,
        notes: p.notes || null,
      }));

      const expiresAt = options.expiresInDays
        ? new Date(Date.now() + options.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
        : null;

      const { data, error } = await supabase
        .from('photo_share_links')
        .insert({
          user_id: session.user.id,
          share_token: token,
          project_reference: options.projectReference,
          project_id: options.projectId || null,
          title: options.title || options.projectReference,
          message: options.message || null,
          company_name: options.companyName || null,
          photos_data: photosData,
          requires_signature: options.requiresSignature || false,
          expires_at: expiresAt,
          status: 'active',
        })
        .select()
        .single();

      if (error) throw error;
      return data as PhotoShareLink;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo-share-links'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create share link',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    },
  });

  // Revoke a share link
  const revokeShareMutation = useMutation({
    mutationFn: async (linkId: string) => {
      const { error } = await supabase
        .from('photo_share_links')
        .update({ status: 'revoked', updated_at: new Date().toISOString() })
        .eq('id', linkId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Share link revoked' });
      queryClient.invalidateQueries({ queryKey: ['photo-share-links'] });
    },
  });

  // Get share link by token (public - no auth required)
  // The public page reads and signs through the photo-share edge function;
  // the anon table policies those calls relied on are dropped.

  const getShareUrl = (token: string) => {
    return `${window.location.origin}/photos/${token}`;
  };

  return {
    shareLinks: shareLinksQuery.data || [],
    isLoading: shareLinksQuery.isLoading,
    createShare: createShareMutation.mutateAsync,
    isCreating: createShareMutation.isPending,
    revokeShare: revokeShareMutation.mutate,
    getShareUrl,
  };
}

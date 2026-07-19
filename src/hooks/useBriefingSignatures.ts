import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';

export type SignedVia = 'manual' | 'qr_code' | 'app' | 'link';

export interface BriefingAttendee {
  id: string;
  briefing_id: string;
  employee_id?: string;
  acknowledged: boolean;
  acknowledged_at?: string;
  signature_url?: string;
  signed_via: SignedVia;
  device_info?: string;
  location_lat?: number;
  location_lng?: number;
  photo_url?: string;
  guest_name?: string;
  guest_company?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
  };
}

export interface CreateAttendeeInput {
  briefing_id: string;
  employee_id?: string;
  guest_name?: string;
  guest_company?: string;
}

export interface SignOffInput {
  id: string;
  signature_url: string;
  signed_via?: SignedVia;
  device_info?: string;
  location_lat?: number;
  location_lng?: number;
  photo_url?: string;
  notes?: string;
}

// Fetch all attendees for a briefing with real-time sync
export function useBriefingAttendees(briefingId: string | undefined) {
  const queryClient = useQueryClient();

  // Real-time subscription for signature updates
  useEffect(() => {
    if (!briefingId) return;

    const channel = supabase
      .channel(realtimeChannelName(`briefing-attendees-${briefingId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'briefing_attendees',
          filter: `briefing_id=eq.${briefingId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['briefing-attendees', briefingId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [briefingId, queryClient]);

  return useQuery({
    queryKey: ['briefing-attendees', briefingId],
    queryFn: async (): Promise<BriefingAttendee[]> => {
      if (!briefingId) return [];

      const { data, error } = await supabase
        .from('briefing_attendees')
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .eq('briefing_id', briefingId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as BriefingAttendee[];
    },
    enabled: !!briefingId,
  });
}

// Add an attendee to a briefing
export function useAddBriefingAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateAttendeeInput): Promise<BriefingAttendee> => {
      const { data, error } = await supabase
        .from('briefing_attendees')
        .insert({
          briefing_id: input.briefing_id,
          employee_id: input.employee_id,
          guest_name: input.guest_name,
          guest_company: input.guest_company,
          acknowledged: false,
          signed_via: 'manual',
        })
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as BriefingAttendee;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['briefing-attendees', data.briefing_id] });
      const name = data.employee?.name || data.guest_name || 'Attendee';
      toast({
        title: 'Attendee added',
        description: `${name} has been added to the briefing.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Sign off an attendee (capture signature)
export function useSignOffAttendee() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: SignOffInput): Promise<BriefingAttendee> => {
      const { data, error } = await supabase
        .from('briefing_attendees')
        .update({
          acknowledged: true,
          acknowledged_at: new Date().toISOString(),
          signature_url: input.signature_url,
          signed_via: input.signed_via || 'manual',
          device_info: input.device_info,
          location_lat: input.location_lat,
          location_lng: input.location_lng,
          photo_url: input.photo_url,
          notes: input.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', input.id)
        .select(
          `
          *,
          employee:employer_employees(id, name)
        `
        )
        .single();

      if (error) throw error;
      return data as BriefingAttendee;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['briefing-attendees', data.briefing_id] });
      const name = data.employee?.name || data.guest_name || 'Attendee';
      toast({
        title: 'Signed off',
        description: `${name} has signed off on the briefing.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Sign off failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Upload signature image to storage and get URL
export function useUploadSignature() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      briefingId,
      attendeeId,
      signatureBlob,
    }: {
      briefingId: string;
      attendeeId: string;
      signatureBlob: Blob;
    }): Promise<string> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileName = `signatures/${user.id}/${briefingId}/${attendeeId}-${Date.now()}.png`;

      const { data, error } = await supabase.storage
        .from('briefings')
        .upload(fileName, signatureBlob, {
          contentType: 'image/png',
          upsert: true,
        });

      if (error) throw error;

      // Store the bare storage path (privacy-ready). Readers resolve it via
      // useStorageUrl(s)('briefings', …) and still accept legacy full-URL rows.
      return data.path;
    },
    onError: (error) => {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Get (or mint) a working public sign-off link for a briefing.
// Uses the token flow (/briefing-sign/:token → get_briefing_by_signing_token /
// sign_briefing_by_token, both anon SECURITY DEFINER) so workers and QR scanners
// can actually load and sign. The old /briefing-signoff/:id route is RLS-dead for
// anyone but the briefing owner and its signature upload violates storage RLS.
export async function getOrCreateBriefingSignLink(briefingId: string): Promise<string> {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const { data: existing } = await supabase
    .from('briefing_signing_tokens')
    .select('public_token')
    .eq('briefing_id', briefingId)
    .eq('is_active', true)
    .maybeSingle();

  if (existing?.public_token) {
    return `${baseUrl}/briefing-sign/${existing.public_token}`;
  }

  const token = crypto.randomUUID();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const { error } = await supabase.from('briefing_signing_tokens').insert({
    briefing_id: briefingId,
    public_token: token,
    created_by_user_id: user.id,
    expires_at: expiresAt,
  });
  if (error) throw error;

  return `${baseUrl}/briefing-sign/${token}`;
}

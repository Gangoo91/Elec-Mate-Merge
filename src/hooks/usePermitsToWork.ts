import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import type { Json } from '@/integrations/supabase/types';

export type PermitType =
  | 'hot-work'
  | 'confined-space'
  | 'electrical-isolation'
  | 'working-at-height'
  | 'excavation';
export type PermitStatus = 'active' | 'expired' | 'cancelled' | 'closed';

export interface PermitToWork {
  id: string;
  user_id: string;
  type: PermitType;
  title: string;
  location: string;
  description: string | null;
  issuer_name: string;
  issuer_signature: string | null;
  receiver_name: string;
  receiver_signature: string | null;
  hazards: Json;
  precautions: string[];
  ppe_required: string[];
  start_time: string;
  end_time: string;
  duration_hours: number;
  status: PermitStatus;
  emergency_procedures: string | null;
  additional_notes: string | null;
  closed_at: string | null;
  closed_by: string | null;
  pdf_url: string | null;
  photos: Json | null;
  requires_approval: boolean;
  approval_status: 'not_required' | 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  approval_comments: string | null;
  approval_signature: string | null;
  /** Hot-work permits flag a follow-on fire watch (schema-backed). */
  auto_fire_watch: boolean | null;
  fire_watch_id: string | null;
  /** Version control — bumped on each amendment. */
  version: number;
  /** Controlling Risk Assessment / RAMS this permit sits on top of. */
  linked_rams_id: string | null;
  linked_rams_title: string | null;
  /** Job-pack link (employer_jobs). */
  job_id: string | null;
  /** 'accepted' (signed in person) | 'awaiting_receiver' (remote sign pending). */
  acceptance_status: string;
  receiver_signed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PermitRevision {
  id: string;
  permit_id: string;
  user_id: string;
  version: number;
  snapshot: Json;
  change_reason: string | null;
  changed_by: string | null;
  created_at: string;
}

export type CreatePermitInput = Omit<
  PermitToWork,
  | 'id'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'pdf_url'
  | 'closed_at'
  | 'closed_by'
  | 'photos'
  | 'requires_approval'
  | 'approval_status'
  | 'approved_by'
  | 'approved_at'
  | 'approval_comments'
  | 'approval_signature'
  | 'auto_fire_watch'
  | 'fire_watch_id'
  | 'version'
  | 'linked_rams_id'
  | 'linked_rams_title'
  | 'acceptance_status'
  | 'receiver_signed_at'
  | 'job_id'
> & {
  photos?: Json;
  auto_fire_watch?: boolean;
  fire_watch_id?: string | null;
  linked_rams_id?: string | null;
  linked_rams_title?: string | null;
  acceptance_status?: string;
  job_id?: string | null;
};

/** Fields a user may change when amending a live permit. */
export type AmendPermitFields = Partial<
  Pick<
    PermitToWork,
    | 'title'
    | 'location'
    | 'description'
    | 'duration_hours'
    | 'emergency_procedures'
    | 'additional_notes'
    | 'issuer_name'
    | 'issuer_signature'
    | 'receiver_name'
    | 'receiver_signature'
    | 'precautions'
    | 'ppe_required'
    | 'auto_fire_watch'
    | 'linked_rams_id'
    | 'linked_rams_title'
    | 'job_id'
  >
> & { hazards?: Json };

export function usePermits() {
  return useQuery({
    queryKey: ['permits-to-work'],
    queryFn: async (): Promise<PermitToWork[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('permits_to_work')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PermitToWork[];
    },
  });
}

export function useActivePermits() {
  return useQuery({
    queryKey: ['permits-to-work', 'active'],
    queryFn: async (): Promise<PermitToWork[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('permits_to_work')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('end_time', { ascending: true });

      if (error) throw error;
      return data as PermitToWork[];
    },
  });
}

export function useCreatePermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreatePermitInput): Promise<PermitToWork> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('permits_to_work')
        .insert({ ...input, user_id: user.id })
        .select('*')
        .single();

      if (error) throw error;
      return data as PermitToWork;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permits-to-work'] });
      toast({
        title: 'Permit issued',
        description: 'Permit to work has been issued successfully.',
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

export function useClosePermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      closedBy,
    }: {
      id: string;
      closedBy?: string;
    }): Promise<PermitToWork> => {
      const { data, error } = await supabase
        .from('permits_to_work')
        .update({
          status: 'closed' as const,
          closed_at: new Date().toISOString(),
          closed_by: closedBy,
        })
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;
      return data as PermitToWork;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permits-to-work'] });
      toast({ title: 'Permit closed', description: 'Permit has been closed.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCancelPermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<PermitToWork> => {
      const { data, error } = await supabase
        .from('permits_to_work')
        .update({ status: 'cancelled' as const })
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;
      return data as PermitToWork;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permits-to-work'] });
      toast({ title: 'Permit cancelled', description: 'Permit has been cancelled.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

export function useExtendPermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      additionalHours,
    }: {
      id: string;
      additionalHours: number;
    }): Promise<PermitToWork> => {
      // Get current permit to calculate new end_time
      const { data: permit, error: fetchError } = await supabase
        .from('permits_to_work')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !permit) throw new Error('Could not find permit');

      const currentEnd = new Date(permit.end_time);
      const now = new Date();
      // Extend from whichever is later: current end_time or now
      const extendFrom = currentEnd > now ? currentEnd : now;
      const newEnd = new Date(extendFrom.getTime() + additionalHours * 3600000);

      const { data, error } = await supabase
        .from('permits_to_work')
        .update({
          end_time: newEnd.toISOString(),
          duration_hours: (permit.duration_hours || 0) + additionalHours,
          status: 'active' as const,
          additional_notes: [
            permit.additional_notes || '',
            `Extended by ${additionalHours}h at ${now.toLocaleString('en-GB')}`,
          ]
            .filter(Boolean)
            .join('\n'),
        })
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;

      // Log audit trail entry for extension
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('safety_audit_trail').insert({
          record_type: 'permit',
          record_id: id,
          action: 'extended',
          user_id: user.id,
          old_values: { end_time: permit.end_time, duration_hours: permit.duration_hours },
          new_values: {
            end_time: newEnd.toISOString(),
            duration_hours: (permit.duration_hours || 0) + additionalHours,
          },
        });
      }

      return data as PermitToWork;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['permits-to-work'] });
      queryClient.invalidateQueries({ queryKey: ['safety-audit-trail'] });
      toast({
        title: 'Permit extended',
        description: `Permit extended by ${variables.additionalHours} hour(s).`,
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

// Fetch the version history (revisions) for a permit
export function usePermitRevisions(permitId: string | null) {
  return useQuery({
    queryKey: ['permit-revisions', permitId],
    enabled: !!permitId,
    queryFn: async (): Promise<PermitRevision[]> => {
      if (!permitId) return [];
      const { data, error } = await supabase
        .from('permit_revisions')
        .select('*')
        .eq('permit_id', permitId)
        .order('version', { ascending: false });
      if (error) throw error;
      return data as PermitRevision[];
    },
  });
}

// Amend a live permit → snapshots the current version, bumps the version,
// voids both signatures and (if approval was required) resets approval to
// pending. The amended permit must be re-signed and re-approved before use.
export function useAmendPermit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      fields,
      changeReason,
    }: {
      id: string;
      fields: AmendPermitFields;
      changeReason: string;
    }): Promise<PermitToWork> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Fetch current permit to snapshot before changing it.
      const { data: current, error: fetchError } = await supabase
        .from('permits_to_work')
        .select('*')
        .eq('id', id)
        .single();
      if (fetchError || !current) throw new Error('Could not find permit');

      // 1. Snapshot the outgoing version into immutable history.
      const { error: snapError } = await supabase.from('permit_revisions').insert({
        permit_id: id,
        user_id: user.id,
        version: current.version ?? 1,
        snapshot: current as unknown as Json,
        change_reason: changeReason,
        changed_by: current.issuer_name,
      });
      if (snapError) throw snapError;

      // 2. Apply changes → bump version, void signatures, reset approval.
      const { data, error } = await supabase
        .from('permits_to_work')
        .update({
          ...fields,
          version: (current.version ?? 1) + 1,
          status: 'active' as const,
          issuer_signature: fields.issuer_signature ?? null,
          receiver_signature: fields.receiver_signature ?? null,
          approval_status: current.requires_approval ? ('pending' as const) : ('not_required' as const),
          approved_by: null,
          approved_at: null,
          approval_comments: null,
          approval_signature: null,
        })
        .eq('id', id)
        .select('*')
        .single();
      if (error) throw error;

      // 3. Audit trail entry.
      await supabase.from('safety_audit_trail').insert({
        record_type: 'permit',
        record_id: id,
        action: 'amended',
        user_id: user.id,
        old_values: { version: current.version ?? 1 },
        new_values: { version: (current.version ?? 1) + 1, reason: changeReason },
      });

      return data as PermitToWork;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['permits-to-work'] });
      queryClient.invalidateQueries({ queryKey: ['permit-revisions', data.id] });
      queryClient.invalidateQueries({ queryKey: ['safety-audit-trail'] });
      toast({
        title: `Permit amended — version ${data.version}`,
        description: 'Re-signed and awaiting any required approval.',
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });
}

// Auto-expire permits and warn before expiry
export function usePermitExpiryCheck() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const warnedPermits = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkPermits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const now = new Date();
      const nowISO = now.toISOString();

      // Auto-expire past-due permits
      const { error } = await supabase
        .from('permits_to_work')
        .update({ status: 'expired' as const })
        .eq('user_id', user.id)
        .eq('status', 'active')
        .lt('end_time', nowISO);

      if (!error) {
        queryClient.invalidateQueries({ queryKey: ['permits-to-work'] });
      }

      // Check for permits expiring within 30 minutes and warn
      const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60000).toISOString();
      const { data: soonExpiring } = await supabase
        .from('permits_to_work')
        .select('id, title, end_time')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .lt('end_time', thirtyMinsFromNow)
        .gt('end_time', nowISO);

      if (soonExpiring) {
        for (const permit of soonExpiring) {
          if (!warnedPermits.current.has(permit.id)) {
            warnedPermits.current.add(permit.id);
            const minutesLeft = Math.round(
              (new Date(permit.end_time).getTime() - now.getTime()) / 60000
            );
            toast({
              title: 'Permit expiring soon',
              description: `"${permit.title}" expires in ${minutesLeft} minute(s). Extend or close the permit.`,
              variant: 'destructive',
            });
          }
        }
      }
    };

    checkPermits();
    const interval = setInterval(checkPermits, 60000);
    return () => clearInterval(interval);
  }, [queryClient, toast]);
}

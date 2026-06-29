import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useToast } from '@/hooks/use-toast';

// Types based on database schema
export type IncidentType =
  | 'near_miss'
  | 'unsafe_practice'
  | 'faulty_equipment'
  | 'injury'
  | 'property_damage'
  | 'environmental'
  | 'security'
  | 'other';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type IncidentStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'investigating'
  | 'resolved'
  | 'closed';

export interface Incident {
  id: string;
  employer_id: string;
  job_id?: string | null;
  incident_type: IncidentType;
  title: string;
  description: string;
  location: string;
  date_occurred: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  immediate_action_taken?: string;
  potential_consequences?: string;
  witnesses?: string;
  supervisor_notified?: boolean;
  supervisor_name?: string;
  equipment_involved?: string;
  injuries_sustained?: string;
  first_aid_given?: boolean;
  photos_attached?: boolean;
  follow_up_required?: boolean;
  follow_up_notes?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export type CreateIncidentInput = Omit<
  Incident,
  'id' | 'employer_id' | 'created_at' | 'updated_at'
>;
export type UpdateIncidentInput = Partial<CreateIncidentInput>;

// The employer_incidents table is narrower than the report form. The mapper
// folds the extra detail into description/actions_taken on write, and
// reverse-maps on read so the UI keeps its shape.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowToIncident = (row: any): Incident => ({
  id: row.id,
  employer_id: row.employer_id,
  incident_type: row.incident_type,
  title: row.title,
  description: row.description || '',
  location: row.location || '',
  date_occurred: row.reported_at || row.created_at,
  severity: row.severity,
  status: row.status,
  immediate_action_taken: row.actions_taken || undefined,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const incidentToRow = (input: Partial<CreateIncidentInput>) => {
  const extras: string[] = [];
  if (input.witnesses) extras.push(`Witnesses: ${input.witnesses}`);
  if (input.equipment_involved) extras.push(`Equipment involved: ${input.equipment_involved}`);
  if (input.injuries_sustained) extras.push(`Injuries: ${input.injuries_sustained}`);
  if (input.first_aid_given) extras.push('First aid given');
  if (input.supervisor_notified)
    extras.push(`Supervisor notified${input.supervisor_name ? `: ${input.supervisor_name}` : ''}`);
  if (input.potential_consequences)
    extras.push(`Potential consequences: ${input.potential_consequences}`);
  if (input.follow_up_required)
    extras.push(`Follow-up required${input.follow_up_notes ? `: ${input.follow_up_notes}` : ''}`);

  const description = [input.description, extras.length ? extras.join('\n') : null]
    .filter(Boolean)
    .join('\n\n');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row: any = {};
  if (input.title !== undefined) row.title = input.title;
  if (description) row.description = description;
  if (input.incident_type !== undefined) row.incident_type = input.incident_type;
  if (input.severity !== undefined) row.severity = input.severity;
  if (input.status !== undefined) row.status = input.status;
  if (input.location !== undefined) row.location = input.location;
  if (input.date_occurred !== undefined) row.reported_at = input.date_occurred;
  if (input.immediate_action_taken !== undefined) row.actions_taken = input.immediate_action_taken;
  return row;
};

// Fetch all incidents for the current user
export function useIncidents() {
  // Live: a worker reporting an incident (any change to the team's rows) refreshes
  // the employer Safety list instantly — no manual reload. RLS scopes both the
  // refetch and the realtime events to the user's company, so no filter is needed.
  useRealtimeInvalidate('incidents', [{ table: 'employer_incidents' }], [['incidents']]);

  return useQuery({
    queryKey: ['incidents'],
    queryFn: async (): Promise<Incident[]> => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
          .from('employer_incidents')
          .select('*')
          .eq('employer_id', user.id)
          .order('reported_at', { ascending: false });

        if (error) return [];
        return (data || []).map(rowToIncident);
      } catch {
        // Graceful degradation for non-employer users
        return [];
      }
    },
  });
}

// Fetch a single incident by ID
export function useIncident(id: string | undefined) {
  return useQuery({
    queryKey: ['incidents', id],
    queryFn: async (): Promise<Incident | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('employer_incidents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    enabled: !!id,
  });
}

// Fetch incidents filtered by status
export function useIncidentsByStatus(status: IncidentStatus) {
  return useQuery({
    queryKey: ['incidents', 'status', status],
    queryFn: async (): Promise<Incident[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('employer_incidents')
        .select('*')
        .eq('employer_id', user.id)
        .eq('status', status)
        .order('reported_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(rowToIncident);
    },
  });
}

// Get incident statistics
export function useIncidentStats() {
  return useQuery({
    queryKey: ['incidents', 'stats'],
    queryFn: async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user)
          return {
            total: 0,
            open: 0,
            resolved: 0,
            closed: 0,
            nearMisses: 0,
            critical: 0,
            high: 0,
          };

        const { data, error } = await supabase
          .from('employer_incidents')
          .select('status, severity, incident_type')
          .eq('employer_id', user.id);

        // Table may not exist or user may not have access - return empty stats
        if (error || !data)
          return {
            total: 0,
            open: 0,
            resolved: 0,
            closed: 0,
            nearMisses: 0,
            critical: 0,
            high: 0,
          };

        const stats = {
          total: data.length,
          open: data.filter((i) => !['resolved', 'closed'].includes(i.status)).length,
          resolved: data.filter((i) => i.status === 'resolved').length,
          closed: data.filter((i) => i.status === 'closed').length,
          nearMisses: data.filter(
            (i) => (i.incident_type || '').toLowerCase().replace(' ', '_') === 'near_miss'
          ).length,
          critical: data.filter((i) => i.severity === 'critical').length,
          high: data.filter((i) => i.severity === 'high').length,
        };

        return stats;
      } catch {
        // Graceful degradation for non-employer users
        return {
          total: 0,
          open: 0,
          resolved: 0,
          closed: 0,
          nearMisses: 0,
          critical: 0,
          high: 0,
        };
      }
    },
  });
}

// Create a new incident
export function useCreateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateIncidentInput): Promise<Incident> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const row = incidentToRow(input);
      if (!row.reported_at) row.reported_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('employer_incidents')
        .insert(row) // employer_id stamps via DEFAULT auth.uid()
        .select()
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast({
        title: 'Incident reported',
        description: 'The incident has been logged successfully.',
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

// Update an existing incident
export function useUpdateIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: UpdateIncidentInput & { id: string }): Promise<Incident> => {
      const { data, error } = await supabase
        .from('employer_incidents')
        .update({ ...incidentToRow(input), updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return rowToIncident(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incidents', data.id] });
      toast({
        title: 'Incident updated',
        description: 'The incident has been updated successfully.',
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

// Update incident status
export function useUpdateIncidentStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: IncidentStatus;
    }): Promise<Incident> => {
      const updates: Partial<Incident> = {
        status,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('employer_incidents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Incident;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incidents', data.id] });
      toast({
        title: 'Status updated',
        description: `Incident marked as ${data.status.replace('_', ' ')}.`,
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

// Delete an incident
export function useDeleteIncident() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.from('employer_incidents').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast({
        title: 'Incident deleted',
        description: 'The incident has been removed.',
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

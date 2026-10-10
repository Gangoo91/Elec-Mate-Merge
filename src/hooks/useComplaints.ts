import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';

/* ==========================================================================
   Complaints log (ELE-2075): customer complaints and data protection
   complaints in one log, read by the scheme assessment pack (ELE-2069).
   Table employer_complaints, firm managers only (my_employer_scope).

   Data protection: from 19 June 2026 a controller must let people complain,
   acknowledge within 30 days, investigate without undue delay and tell
   them the outcome (DPA 2018 s.164A, inserted by the Data (Use and Access)
   Act 2025 s.103).
   ========================================================================== */

export type ComplaintKind = 'customer' | 'data_protection';
export type ComplaintChannel =
  'phone' | 'email' | 'letter' | 'in_person' | 'text' | 'web' | 'other';
export type ComplaintOutcomeKind =
  'upheld' | 'partly_upheld' | 'not_upheld' | 'resolved' | 'withdrawn';

export interface Complaint {
  id: string;
  employer_id: string;
  kind: ComplaintKind;
  received_on: string;
  channel: ComplaintChannel;
  complainant_name: string | null;
  complainant_contact: string | null;
  summary: string;
  job_id: string | null;
  owner_employee_id: string | null;
  owner_name: string | null;
  acknowledged_on: string | null;
  response_due: string | null;
  outcome: string | null;
  outcome_kind: ComplaintOutcomeKind | null;
  ico_route_given: boolean;
  closed_on: string | null;
  created_at: string;
  updated_at: string;
}

export type ComplaintInput = Omit<Complaint, 'id' | 'employer_id' | 'created_at' | 'updated_at'>;

export const CHANNEL_LABEL: Record<ComplaintChannel, string> = {
  phone: 'Phone',
  email: 'Email',
  letter: 'Letter',
  in_person: 'In person',
  text: 'Text or WhatsApp',
  web: 'Website or review',
  other: 'Other',
};

export const OUTCOME_LABEL: Record<ComplaintOutcomeKind, string> = {
  upheld: 'Upheld',
  partly_upheld: 'Partly upheld',
  not_upheld: 'Not upheld',
  resolved: 'Resolved',
  withdrawn: 'Withdrawn',
};

export const KIND_LABEL: Record<ComplaintKind, string> = {
  customer: 'Customer complaint',
  data_protection: 'Data protection complaint',
};

const table = () => supabase.from('employer_complaints' as never);

export function useComplaints(enabled = true) {
  return useQuery({
    queryKey: ['employer-complaints'],
    enabled,
    queryFn: async (): Promise<Complaint[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data, error } = await table()
        .select('*')
        .eq('employer_id' as never, firm as never)
        .order('received_on' as never, { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Complaint[];
    },
  });
}

export function useSaveComplaint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: Partial<ComplaintInput> & { id?: string }) => {
      if (id) {
        const { error } = await table()
          .update(input as never)
          .eq('id' as never, id as never);
        if (error) throw error;
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { error } = await table().insert({ ...input, employer_id: firm } as never);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employer-complaints'] }),
  });
}

export function useDeleteComplaint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await table()
        .delete()
        .eq('id' as never, id as never);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employer-complaints'] }),
  });
}

/** Days from a date (YYYY-MM-DD), as YYYY-MM-DD. */
export const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso.slice(0, 10)}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export type ComplaintState = 'closed' | 'overdue' | 'due' | 'open';

export function complaintState(c: Complaint, today: string): ComplaintState {
  if (c.closed_on) return 'closed';
  const due =
    c.kind === 'data_protection' && !c.acknowledged_on
      ? addDays(c.received_on, 30)
      : c.response_due;
  if (due && due < today) return 'overdue';
  if (due && due <= addDays(today, 7)) return 'due';
  return 'open';
}

const csvCell = (v: unknown) => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** The log as CSV, for an assessor or the ICO. */
export function complaintsCsv(rows: Complaint[], jobTitle?: (id: string) => string | undefined) {
  const head = [
    'Received',
    'Type',
    'Channel',
    'Complainant',
    'Summary',
    'Job',
    'Owner',
    'Acknowledged',
    'Response due',
    'Outcome',
    'Outcome detail',
    'Told how to complain to the ICO',
    'Closed',
  ];
  const body = rows.map((c) => [
    c.received_on,
    KIND_LABEL[c.kind],
    CHANNEL_LABEL[c.channel] ?? c.channel,
    c.complainant_name ?? '',
    c.summary,
    c.job_id ? (jobTitle?.(c.job_id) ?? '') : '',
    c.owner_name ?? '',
    c.acknowledged_on ?? '',
    c.response_due ?? '',
    c.outcome_kind ? OUTCOME_LABEL[c.outcome_kind] : '',
    c.outcome ?? '',
    c.kind === 'data_protection' ? (c.ico_route_given ? 'Yes' : 'No') : '',
    c.closed_on ?? '',
  ]);
  return [head, ...body].map((r) => r.map(csvCell).join(',')).join('\n');
}

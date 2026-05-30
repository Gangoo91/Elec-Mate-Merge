/**
 * useProjectSafetyDocs — aggregates every Site Safety document linked to a Spark
 * project (job_id) across the safety tables into one unified list. Powers the
 * "Safety pack" on the project detail.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectSafetyDoc {
  type: string;
  pdfType: string;
  id: string;
  title: string;
  status: string | null;
  date: string | null;
}

// Loosely-typed client so we can iterate table names at runtime.
const sb = supabase as unknown as { from: (t: string) => { select: (c: string) => { eq: (col: string, v: string) => Promise<{ data: unknown[] | null; error: unknown }> } } };

type Row = Record<string, unknown>;
const str = (v: unknown) => (typeof v === 'string' ? v : v == null ? null : String(v));

const SOURCES: {
  table: string;
  type: string;
  pdfType: string;
  title: (r: Row) => string;
  status: (r: Row) => string | null;
  date: (r: Row) => string | null;
}[] = [
  { table: 'permits_to_work', type: 'Permit to Work', pdfType: 'permit', title: (r) => str(r.title) || 'Permit', status: (r) => str(r.status), date: (r) => str(r.created_at) },
  { table: 'safe_isolation_records', type: 'Safe Isolation', pdfType: 'safe-isolation', title: (r) => str(r.circuit_description) || 'Isolation', status: (r) => str(r.status), date: (r) => str(r.created_at) },
  { table: 'near_miss_reports', type: 'Near Miss', pdfType: 'near-miss', title: (r) => (str(r.description) || 'Near miss').slice(0, 60), status: (r) => str(r.severity), date: (r) => str(r.created_at) },
  { table: 'coshh_assessments', type: 'COSHH', pdfType: 'coshh', title: (r) => str(r.substance_name) || 'COSHH', status: (r) => str(r.risk_rating), date: (r) => str(r.created_at) },
  { table: 'accident_records', type: 'Accident', pdfType: 'accident', title: (r) => str(r.injured_name) || 'Accident record', status: (r) => str(r.severity), date: (r) => str(r.created_at) },
  { table: 'fire_watch_records', type: 'Fire Watch', pdfType: 'fire-watch', title: (r) => str(r.location) || 'Fire watch', status: (r) => str(r.status), date: (r) => str(r.created_at) },
  { table: 'site_diary_entries', type: 'Site Diary', pdfType: 'site-diary', title: (r) => str(r.site_name) || 'Site diary', status: () => null, date: (r) => str(r.entry_date) || str(r.created_at) },
  { table: 'inspection_records', type: 'Inspection', pdfType: 'inspection', title: (r) => str(r.template_title) || 'Inspection', status: (r) => str(r.overall_result), date: (r) => str(r.created_at) },
  { table: 'pre_use_checks', type: 'Pre-Use Check', pdfType: 'pre-use-check', title: (r) => str(r.equipment_name) || str(r.equipment_type) || 'Pre-use check', status: (r) => str(r.overall_result), date: (r) => str(r.created_at) },
  { table: 'safety_observations', type: 'Observation', pdfType: 'observation', title: (r) => (str(r.description) || str(r.observation_type) || 'Observation').slice(0, 60), status: (r) => str(r.status), date: (r) => str(r.created_at) },
];

export function useProjectSafetyDocs(projectId: string | null) {
  return useQuery({
    queryKey: ['project-safety-docs', projectId],
    enabled: !!projectId,
    queryFn: async (): Promise<ProjectSafetyDoc[]> => {
      if (!projectId) return [];
      const batches = await Promise.all(
        SOURCES.map(async (s) => {
          const { data, error } = await sb.from(s.table).select('*').eq('job_id', projectId);
          if (error || !data) return [] as ProjectSafetyDoc[];
          return (data as Row[]).map((r) => ({
            type: s.type,
            pdfType: s.pdfType,
            id: String(r.id),
            title: s.title(r),
            status: s.status(r),
            date: s.date(r),
          }));
        })
      );
      return batches.flat().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    },
    staleTime: 30_000,
  });
}

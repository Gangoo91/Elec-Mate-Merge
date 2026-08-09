import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type DocumentType =
  | 'Permit'
  | 'COSHH'
  | 'Inspection'
  | 'Accident'
  | 'Near Miss'
  | 'Observation'
  | 'Site Diary'
  | 'Isolation'
  | 'Fire Watch'
  | 'Equipment'
  | 'RAMS'
  | 'Briefing';

export interface SafetyDocument {
  id: string;
  type: DocumentType;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  siteAddress?: string;
  hasPDF: boolean;
  hasSignature: boolean;
  pdfType?: string;
  sourceId: string;
}

const PDF_TYPE_MAP: Partial<Record<DocumentType, string>> = {
  'Near Miss': 'near-miss',
};

export function useAllSafetyDocuments() {
  return useQuery({
    queryKey: ['all-safety-documents'],
    queryFn: async (): Promise<SafetyDocument[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const [
        nearMissRes,
        ramsRes,
        briefingRes,
        permitRes,
        coshhRes,
        inspectionRes,
        accidentRes,
        observationRes,
        diaryRes,
        isolationRes,
        fireWatchRes,
        preUseRes,
      ] = await Promise.all([
        supabase
          .from('near_miss_reports')
          .select('id, description, location, status, created_at, updated_at, reporter_signature')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('rams_documents')
          .select('id, project_name, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('team_briefings')
          .select('id, briefing_name, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('permits_to_work')
          .select('id, title, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('coshh_assessments')
          .select('id, substance_name, location_of_use, created_at, updated_at, assessor_signature')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('inspection_records')
          .select(
            'id, template_title, location, overall_result, created_at, updated_at, inspector_signature'
          )
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('accident_records')
          .select(
            'id, injured_name, incident_description, location, created_at, updated_at, reporter_signature, is_riddor_reportable'
          )
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('safety_observations')
          .select('id, description, observation_type, location, created_at, observer_signature')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('site_diary_entries')
          .select('id, site_name, date, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('safe_isolation_records')
          .select(
            'id, circuit_description, site_address, status, created_at, updated_at, verifier_signature'
          )
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('fire_watch_records')
          .select('id, location, status, created_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('pre_use_checks')
          .select('id, equipment_description, site_address, overall_result, created_at, signature')
          .order('created_at', { ascending: false })
          .limit(50),
      ]);

      const docs: SafetyDocument[] = [];

      // Near misses
      for (const r of nearMissRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Near Miss',
          title: r.description?.slice(0, 60) || 'Near Miss Report',
          status: r.status || 'open',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: !!r.reporter_signature,
          pdfType: 'near-miss',
          sourceId: r.id,
        });
      }

      // RAMS
      for (const r of ramsRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'RAMS',
          title: r.project_name || 'RAMS Document',
          status: r.status || 'draft',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true, // RAMS documents are always PDF-generatable
          hasSignature: false,
          pdfType: 'rams' as const,
          sourceId: r.id,
        });
      }

      // Briefings
      for (const r of briefingRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Briefing',
          title: r.briefing_name || 'Team Briefing',
          status: r.status || 'scheduled',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: false,
          hasSignature: false,
          sourceId: r.id,
        });
      }

      /*
       * The nine types below were declared in `DocumentType` and rendered by
       * the Document Hub, but never fetched — the hub queried three tables and
       * claimed to be the place every safety document lives. Six of them held
       * real records that no one could see from here, and the "documents on
       * file" figure on the Site Safety hub reads from this same hook, so that
       * count was wrong too.
       *
       * Notes on the mappings:
       *  - Several tables have no `updated_at`; those fall back to created_at.
       *  - COSHH, observations and diary entries have no status column. They
       *    are records of a thing that happened rather than items with a
       *    lifecycle, so they report as 'recorded' instead of inventing one.
       *  - Inspections and pre-use checks carry `overall_result` ('pass'),
       *    which is a real verdict and is passed through as the status.
       */

      // Permits to work
      for (const r of permitRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Permit',
          title: r.title || 'Permit to work',
          status: r.status || 'draft',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location ?? undefined,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'permit',
          sourceId: r.id,
        });
      }

      // COSHH assessments
      for (const r of coshhRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'COSHH',
          title: r.substance_name || 'COSHH assessment',
          status: 'recorded',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location_of_use ?? undefined,
          hasPDF: true,
          hasSignature: !!r.assessor_signature,
          pdfType: 'coshh',
          sourceId: r.id,
        });
      }

      // Inspection checklists
      for (const r of inspectionRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Inspection',
          title: r.template_title || 'Inspection',
          status: r.overall_result || 'recorded',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location ?? undefined,
          hasPDF: true,
          hasSignature: !!r.inspector_signature,
          pdfType: 'inspection',
          sourceId: r.id,
        });
      }

      // Accident book / RIDDOR
      for (const r of accidentRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Accident',
          title: r.injured_name
            ? `Accident — ${r.injured_name}`
            : r.incident_description?.slice(0, 60) || 'Accident record',
          status: 'recorded',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location ?? undefined,
          hasPDF: true,
          hasSignature: !!r.reporter_signature,
          // A RIDDOR-reportable incident produces the RIDDOR form, not the
          // ordinary accident record.
          pdfType: r.is_riddor_reportable ? 'riddor-report' : 'accident',
          sourceId: r.id,
        });
      }

      // Safety observations
      for (const r of observationRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Observation',
          title: r.description?.slice(0, 60) || r.observation_type || 'Observation',
          status: 'recorded',
          createdAt: r.created_at,
          updatedAt: r.created_at,
          siteAddress: r.location ?? undefined,
          hasPDF: true,
          hasSignature: !!r.observer_signature,
          pdfType: 'observation',
          sourceId: r.id,
        });
      }

      // Site diary
      for (const r of diaryRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Site Diary',
          title: r.site_name ? `Site diary — ${r.site_name}` : 'Site diary entry',
          status: 'recorded',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.site_name ?? undefined,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'site-diary',
          sourceId: r.id,
        });
      }

      // Safe isolation
      for (const r of isolationRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Isolation',
          title: r.circuit_description || 'Safe isolation record',
          status: r.status || 'recorded',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.site_address ?? undefined,
          hasPDF: true,
          hasSignature: !!r.verifier_signature,
          pdfType: 'safe-isolation',
          sourceId: r.id,
        });
      }

      // Fire watch
      for (const r of fireWatchRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Fire Watch',
          title: r.location ? `Fire watch — ${r.location}` : 'Fire watch',
          status: r.status || 'recorded',
          createdAt: r.created_at,
          updatedAt: r.created_at,
          siteAddress: r.location ?? undefined,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'fire-watch',
          sourceId: r.id,
        });
      }

      // Pre-use equipment checks
      for (const r of preUseRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Equipment',
          title: r.equipment_description || 'Pre-use check',
          status: r.overall_result || 'recorded',
          createdAt: r.created_at,
          updatedAt: r.created_at,
          siteAddress: r.site_address ?? undefined,
          hasPDF: true,
          hasSignature: !!r.signature,
          pdfType: 'pre-use-check',
          sourceId: r.id,
        });
      }

      // Sort by updatedAt descending
      docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      return docs;
    },
    staleTime: 60_000,
  });
}

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
  Permit: 'permit',
  COSHH: 'coshh',
  Inspection: 'inspection',
  Accident: 'accident',
  'Near Miss': 'near-miss',
  Observation: 'observation',
  'Site Diary': 'site-diary',
  Isolation: 'safe-isolation',
  'Fire Watch': 'fire-watch',
  Equipment: 'equipment',
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
        permitsRes,
        coshhRes,
        inspectionRes,
        accidentRes,
        nearMissRes,
        observationRes,
        diaryRes,
        isolationRes,
        fireWatchRes,
        equipmentRes,
        ramsRes,
        briefingRes,
      ] = await Promise.all([
        supabase
          .from('permits_to_work')
          .select('id, permit_number, location, status, created_at, updated_at, issuer_signature')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('coshh_assessments')
          .select(
            'id, substance_name, location, status, created_at, updated_at, assessor_signature'
          )
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('inspection_checklists')
          .select('id, title, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('accident_records')
          .select('id, injured_person_name, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('near_miss_reports')
          .select('id, description, location, status, created_at, updated_at, reporter_signature')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('safety_observations')
          .select(
            'id, description, location, observation_type, created_at, updated_at, observer_signature'
          )
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('electrician_site_diary')
          .select('id, site_address, weather, created_at, updated_at, recorder_signature')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('safe_isolation_records')
          .select('id, circuit_description, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('fire_watch_records')
          .select('id, location, status, created_at, updated_at')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('equipment_records')
          .select('id, equipment_name, equipment_type, status, created_at, updated_at')
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
      ]);

      const docs: SafetyDocument[] = [];

      // Permits
      for (const r of permitsRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Permit',
          title: r.permit_number || 'Permit to Work',
          status: r.status || 'draft',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: !!r.issuer_signature,
          pdfType: 'permit',
          sourceId: r.id,
        });
      }

      // COSHH
      for (const r of coshhRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'COSHH',
          title: r.substance_name || 'COSHH Assessment',
          status: r.status || 'draft',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: !!r.assessor_signature,
          pdfType: 'coshh',
          sourceId: r.id,
        });
      }

      // Inspections
      for (const r of inspectionRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Inspection',
          title: r.title || 'Inspection Checklist',
          status: r.status || 'draft',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'inspection',
          sourceId: r.id,
        });
      }

      // Accidents
      for (const r of accidentRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Accident',
          title: r.injured_person_name ? `Accident — ${r.injured_person_name}` : 'Accident Record',
          status: r.status || 'recorded',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'accident',
          sourceId: r.id,
        });
      }

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

      // Observations
      for (const r of observationRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Observation',
          title: r.description?.slice(0, 60) || 'Safety Observation',
          status: r.observation_type || 'observation',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
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
          title: r.site_address || 'Site Diary Entry',
          status: 'completed',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.site_address,
          hasPDF: true,
          hasSignature: !!r.recorder_signature,
          pdfType: 'site-diary',
          sourceId: r.id,
        });
      }

      // Safe isolation
      for (const r of isolationRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Isolation',
          title: r.circuit_description || 'Safe Isolation Record',
          status: r.status || 'active',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'safe-isolation',
          sourceId: r.id,
        });
      }

      // Fire watch
      for (const r of fireWatchRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Fire Watch',
          title: r.location || 'Fire Watch Record',
          status: r.status || 'active',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          siteAddress: r.location,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'fire-watch',
          sourceId: r.id,
        });
      }

      // Equipment
      for (const r of equipmentRes.data ?? []) {
        docs.push({
          id: r.id,
          type: 'Equipment',
          title: r.equipment_name || r.equipment_type || 'Equipment Record',
          status: r.status || 'active',
          createdAt: r.created_at,
          updatedAt: r.updated_at || r.created_at,
          hasPDF: true,
          hasSignature: false,
          pdfType: 'equipment',
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
          hasPDF: false,
          hasSignature: false,
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

      // Sort by updatedAt descending
      docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      return docs;
    },
    staleTime: 60_000,
  });
}

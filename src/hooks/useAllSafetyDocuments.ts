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

      const [nearMissRes, ramsRes, briefingRes] = await Promise.all([
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
          pdfType: 'safety-document' as const,
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

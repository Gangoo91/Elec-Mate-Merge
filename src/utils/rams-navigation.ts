import { NavigateFunction } from 'react-router-dom';

export interface RAMSDocumentData {
  id: string;
  project_name: string;
  location: string;
  date: string;
  assessor: string;
  contractor?: string;
  supervisor?: string;
  site_manager_name?: string;
  site_manager_phone?: string;
  first_aider_name?: string;
  first_aider_phone?: string;
  safety_officer_name?: string;
  safety_officer_phone?: string;
  assembly_point?: string;
  risks?: any[];
  activities?: string[];
}

export function navigateToAmendRAMS(
  navigate: NavigateFunction,
  documentData: RAMSDocumentData
) {
  navigate('/electrician-tools/ai-rams', {
    state: {
      amendMode: true,
      documentId: documentData.id,
      initialData: {
        jobDescription: `Amend existing RAMS for: ${documentData.project_name}`,
        projectInfo: {
          projectName: documentData.project_name,
          location: documentData.location,
          assessor: documentData.assessor,
          contractor: documentData.contractor || '',
          supervisor: documentData.supervisor || '',
          siteManagerName: documentData.site_manager_name || '',
          siteManagerPhone: documentData.site_manager_phone || '',
          firstAiderName: documentData.first_aider_name || '',
          firstAiderPhone: documentData.first_aider_phone || '',
          safetyOfficerName: documentData.safety_officer_name || '',
          safetyOfficerPhone: documentData.safety_officer_phone || '',
          assemblyPoint: documentData.assembly_point || ''
        }
      }
    }
  });
}

export function openQuickEdit(
  documentId: string,
  setAmendDialog: (id: string) => void
) {
  setAmendDialog(documentId);
}

import { supabase } from '@/integrations/supabase/client';

export interface JobPackDocument {
  id: string;
  job_pack_id: string;
  document_type: 'RAMS' | 'Method Statement' | 'Design Doc' | 'Briefing' | 'Certificate' | 'Other';
  title: string;
  description: string | null;
  file_url: string | null;
  is_required: boolean;
  generated_by: 'AI' | 'Manual' | 'Upload';
  created_at: string;
  updated_at: string;
}

export interface JobPackAcknowledgement {
  id: string;
  job_pack_id: string;
  employee_id: string;
  acknowledged_at: string;
  signature_data: string | null;
  device_info: string | null;
  location: string | null;
  created_at: string;
}

// Document CRUD operations
export const getJobPackDocuments = async (jobPackId: string): Promise<JobPackDocument[]> => {
  const { data, error } = await supabase
    .from('employer_job_pack_documents')
    .select('*')
    .eq('job_pack_id', jobPackId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching job pack documents:', error);
    throw error;
  }
  
  return (data || []) as JobPackDocument[];
};

export const createJobPackDocument = async (
  document: Omit<JobPackDocument, 'id' | 'created_at' | 'updated_at'>
): Promise<JobPackDocument> => {
  const { data, error } = await supabase
    .from('employer_job_pack_documents')
    .insert(document)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating job pack document:', error);
    throw error;
  }
  
  return data as JobPackDocument;
};

export const deleteJobPackDocument = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_job_pack_documents')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting job pack document:', error);
    return false;
  }
  
  return true;
};

// Acknowledgement operations
export const getJobPackAcknowledgements = async (jobPackId: string): Promise<JobPackAcknowledgement[]> => {
  const { data, error } = await supabase
    .from('employer_job_pack_acknowledgements')
    .select('*')
    .eq('job_pack_id', jobPackId)
    .order('acknowledged_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching job pack acknowledgements:', error);
    throw error;
  }
  
  return (data || []) as JobPackAcknowledgement[];
};

export const createJobPackAcknowledgement = async (
  acknowledgement: Omit<JobPackAcknowledgement, 'id' | 'created_at' | 'acknowledged_at'>
): Promise<JobPackAcknowledgement> => {
  const { data, error } = await supabase
    .from('employer_job_pack_acknowledgements')
    .insert(acknowledgement)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating job pack acknowledgement:', error);
    throw error;
  }
  
  return data as JobPackAcknowledgement;
};

// File upload helper
export const uploadJobPackFile = async (
  jobPackId: string,
  file: File,
  documentType: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${jobPackId}/${documentType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('job-pack-documents')
    .upload(fileName, file);
  
  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
  
  const { data: urlData } = supabase.storage
    .from('job-pack-documents')
    .getPublicUrl(data.path);
  
  return urlData.publicUrl;
};

// Common certifications for electrical work
export const COMMON_CERTIFICATIONS = [
  { name: '18th Edition', hazards: ['Live testing'] },
  { name: 'ECS Card', hazards: [] },
  { name: 'IPAF', hazards: ['Working at height'] },
  { name: 'PASMA', hazards: ['Working at height'] },
  { name: 'First Aid at Work', hazards: [] },
  { name: 'Asbestos Awareness', hazards: ['Asbestos risk'] },
  { name: 'Confined Spaces', hazards: ['Confined spaces'] },
  { name: 'Manual Handling', hazards: ['Heavy lifting'] },
  { name: 'Traffic Management', hazards: ['Traffic management'] },
  { name: 'NRSWA', hazards: ['Underground services'] },
  { name: 'CSCS Card', hazards: [] },
  { name: 'JIB Gold Card', hazards: [] },
];

// Get suggested certifications based on hazards
export const getSuggestedCertifications = (hazards: string[]): string[] => {
  const suggested = new Set<string>();
  
  // Always suggest basic certs
  suggested.add('ECS Card');
  
  COMMON_CERTIFICATIONS.forEach(cert => {
    if (cert.hazards.some(h => hazards.includes(h))) {
      suggested.add(cert.name);
    }
  });
  
  return Array.from(suggested);
};

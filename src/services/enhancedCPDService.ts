import { supabase } from '@/integrations/supabase/client';

export interface EnhancedCPDEntry {
  id: string;
  user_id: string;
  professional_body_id?: string;
  title: string;
  description?: string;
  activity_type: string;
  category: string;
  hours: number;
  date_completed: string;
  learning_outcomes?: string[];
  evidence_files: any;
  verification_status: string;
  is_verified: boolean;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CPDEvidenceFile {
  id: string;
  cpd_entry_id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  uploaded_at: string;
  ocr_text?: string;
  verification_status: string;
}

export interface CPDPortfolio {
  id: string;
  user_id: string;
  professional_body_id: string;
  title: string;
  period_start: string;
  period_end: string;
  total_hours: number;
  compliance_percentage: number;
  generated_at: string;
  pdf_url?: string;
  status: string;
}

export interface CPDComplianceStats {
  total_hours: number;
  required_hours: number;
  compliance_percentage: number;
  categories: Array<{
    id: string;
    name: string;
    completed_hours: number;
    required_hours: number;
    percentage: number;
  }>;
  entries_count: number;
  verified_entries: number;
  pending_verification: number;
  next_renewal_date?: string;
}

export const enhancedCPDService = {
  async getAllEntries(userId: string, professionalBodyId?: string): Promise<EnhancedCPDEntry[]> {
    let query = supabase
      .from('cpd_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date_completed', { ascending: false });

    if (professionalBodyId) {
      query = query.eq('professional_body_id', professionalBodyId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching CPD entries:', error);
      throw error;
    }

    return data || [];
  },

  async addEntry(entry: Omit<EnhancedCPDEntry, 'id' | 'created_at' | 'updated_at' | 'evidence_files' | 'is_verified' | 'verification_status'>): Promise<EnhancedCPDEntry> {
    const { data, error } = await supabase
      .from('cpd_entries')
      .insert({
        ...entry,
        evidence_files: [],
        verification_status: 'pending',
        is_verified: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding CPD entry:', error);
      throw error;
    }

    return data;
  },

  async updateEntry(id: string, updates: Partial<EnhancedCPDEntry>): Promise<EnhancedCPDEntry> {
    const { data, error } = await supabase
      .from('cpd_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating CPD entry:', error);
      throw error;
    }

    return data;
  },

  async deleteEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('cpd_entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting CPD entry:', error);
      throw error;
    }
  },

  async uploadEvidence(file: File, entryId: string, userId: string): Promise<CPDEvidenceFile> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${entryId}/${Date.now()}.${fileExt}`;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cpd-evidence')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('cpd-evidence')
      .getPublicUrl(fileName);

    // Save file metadata to database
    const { data, error } = await supabase
      .from('cpd_evidence_files')
      .insert({
        cpd_entry_id: entryId,
        user_id: userId,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        verification_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving evidence file metadata:', error);
      throw error;
    }

    // Update CPD entry with new evidence file
    const { data: entryData } = await supabase
      .from('cpd_entries')
      .select('evidence_files')
      .eq('id', entryId)
      .single();

    const existingFiles = Array.isArray(entryData?.evidence_files) ? entryData.evidence_files : [];
    const updatedEvidenceFiles = [
      ...existingFiles,
      {
        id: data.id,
        file_name: data.file_name,
        file_url: data.file_url,
        file_type: data.file_type
      }
    ];

    await supabase
      .from('cpd_entries')
      .update({ evidence_files: updatedEvidenceFiles })
      .eq('id', entryId);

    return data;
  },

  async getComplianceStats(userId: string, professionalBodyId: string): Promise<CPDComplianceStats> {
    // Get professional body requirements
    const { data: professionalBody } = await supabase
      .from('professional_bodies')
      .select('*')
      .eq('id', professionalBodyId)
      .single();

    if (!professionalBody) {
      throw new Error('Professional body not found');
    }

    // Get user's CPD entries for this professional body
    const { data: entries } = await supabase
      .from('cpd_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('professional_body_id', professionalBodyId)
      .gte('date_completed', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const totalHours = entries?.reduce((sum, entry) => sum + parseFloat(entry.hours.toString()), 0) || 0;
    const requiredHours = professionalBody.annual_cpd_hours;
    const compliancePercentage = Math.round((totalHours / requiredHours) * 100);

    // Calculate category breakdown
    const categories = Array.isArray(professionalBody.categories) ? professionalBody.categories : [];
    const categoryStats = categories.map((category: any) => {
      const categoryHours = entries?.filter(entry => entry.category === category.id)
        .reduce((sum, entry) => sum + parseFloat(entry.hours.toString()), 0) || 0;
      
      return {
        id: category.id,
        name: category.name,
        completed_hours: categoryHours,
        required_hours: category.min_hours,
        percentage: Math.round((categoryHours / category.min_hours) * 100)
      };
    });

    const verifiedEntries = entries?.filter(entry => entry.is_verified).length || 0;
    const pendingVerification = entries?.filter(entry => !entry.is_verified).length || 0;

    return {
      total_hours: totalHours,
      required_hours: requiredHours,
      compliance_percentage: compliancePercentage,
      categories: categoryStats,
      entries_count: entries?.length || 0,
      verified_entries: verifiedEntries,
      pending_verification: pendingVerification
    };
  },

  async generatePortfolio(userId: string, professionalBodyId: string, title: string): Promise<CPDPortfolio> {
    const stats = await this.getComplianceStats(userId, professionalBodyId);
    
    const { data, error } = await supabase
      .from('cpd_portfolios')
      .insert({
        user_id: userId,
        professional_body_id: professionalBodyId,
        title,
        period_start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        period_end: new Date().toISOString().split('T')[0],
        total_hours: stats.total_hours,
        compliance_percentage: stats.compliance_percentage,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      console.error('Error generating portfolio:', error);
      throw error;
    }

    return data;
  },

  async getPortfolios(userId: string): Promise<CPDPortfolio[]> {
    const { data, error } = await supabase
      .from('cpd_portfolios')
      .select('*')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    }

    return data || [];
  }
};
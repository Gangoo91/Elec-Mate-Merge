import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAutoPortfolioIntegration } from "@/hooks/portfolio/useAutoPortfolioIntegration";

export interface TrainingEvidenceData {
  id?: string;
  title: string;
  description?: string;
  evidence_type: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  tags?: string[];
  category?: string;
  learning_outcomes?: string[];
  assessment_criteria?: string[];
  date_achieved: string;
  time_spent?: number;
  verification_status?: string;
  witness_name?: string;
  portfolio_linked?: boolean;
}

export const useTrainingEvidenceDB = () => {
  const { toast } = useToast();
  const [evidenceItems, setEvidenceItems] = useState<TrainingEvidenceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { syncEvidenceUpload } = useAutoPortfolioIntegration();

  // Fetch evidence from database
  const fetchEvidence = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('training_evidence')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvidenceItems(data || []);
    } catch (error) {
      console.error('Error fetching evidence:', error);
      toast({
        title: "Error loading evidence",
        description: "Failed to load your training evidence. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Upload file to storage
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('evidence-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('evidence-files')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  // Smart categorization based on evidence type and content
  const categorizeEvidence = (evidenceType: string, title: string, description?: string): string => {
    const content = `${title} ${description || ''}`.toLowerCase();
    
    if (evidenceType.includes('workshop') || content.includes('workshop') || content.includes('training')) {
      return 'Workshop Training';
    }
    if (evidenceType.includes('site') || content.includes('site') || content.includes('installation')) {
      return 'Site Experience';
    }
    if (evidenceType.includes('college') || content.includes('college') || content.includes('classroom')) {
      return 'College Work';
    }
    if (evidenceType.includes('online') || content.includes('online') || content.includes('course')) {
      return 'Online Learning';
    }
    if (evidenceType.includes('assessment') || content.includes('test') || content.includes('exam')) {
      return 'Assessment Evidence';
    }
    
    return 'General Evidence';
  };

  // Generate smart tags based on content
  const generateSmartTags = (evidenceType: string, title: string, description?: string): string[] => {
    const content = `${evidenceType} ${title} ${description || ''}`.toLowerCase();
    const tags: string[] = [];

    // Technical skills
    if (content.includes('wiring') || content.includes('electrical')) tags.push('Electrical Installation');
    if (content.includes('motor') || content.includes('control')) tags.push('Motor Controls');
    if (content.includes('safety') || content.includes('ppe')) tags.push('Health & Safety');
    if (content.includes('test') || content.includes('inspection')) tags.push('Testing & Inspection');
    if (content.includes('distribution') || content.includes('board')) tags.push('Distribution Systems');
    if (content.includes('lighting') || content.includes('switch')) tags.push('Lighting Systems');

    // Activity types
    if (content.includes('practical') || content.includes('hands-on')) tags.push('Practical Work');
    if (content.includes('theory') || content.includes('classroom')) tags.push('Theory');
    if (content.includes('project') || content.includes('assignment')) tags.push('Project Work');

    // BS7671 compliance
    if (content.includes('regulation') || content.includes('bs7671') || content.includes('18th')) {
      tags.push('BS7671 18th Edition');
    }

    return [...new Set(tags)]; // Remove duplicates
  };

  // Add evidence with smart categorization and portfolio integration
  const addEvidence = async (evidenceData: Omit<TrainingEvidenceData, 'id'>, file?: File) => {
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      let fileUrl = evidenceData.file_url;
      let fileName = evidenceData.file_name;
      let fileSize = evidenceData.file_size;

      // Upload file if provided
      if (file) {
        fileUrl = await uploadFile(file);
        if (!fileUrl) throw new Error('Failed to upload file');
        fileName = file.name;
        fileSize = file.size;
      }

      // Smart categorization and tagging
      const category = categorizeEvidence(evidenceData.evidence_type, evidenceData.title, evidenceData.description);
      const smartTags = generateSmartTags(evidenceData.evidence_type, evidenceData.title, evidenceData.description);
      const allTags = [...new Set([...(evidenceData.tags || []), ...smartTags])];

      const newEvidence = {
        ...evidenceData,
        user_id: user.id,
        file_url: fileUrl,
        file_name: fileName,
        file_size: fileSize,
        category,
        tags: allTags,
        time_spent: evidenceData.time_spent || 60, // Default 1 hour if not specified
      };

      const { data, error } = await supabase
        .from('training_evidence')
        .insert([newEvidence])
        .select()
        .single();

      if (error) throw error;

      // Auto-sync to portfolio
      await syncEvidenceUpload({
        title: data.title,
        type: data.evidence_type,
        description: data.description || '',
        uploadedAt: data.date_achieved,
      });

      // Update portfolio_linked status
      await supabase
        .from('training_evidence')
        .update({ portfolio_linked: true })
        .eq('id', data.id);

      setEvidenceItems(prev => [{ ...data, portfolio_linked: true }, ...prev]);
      
      toast({
        title: "Evidence uploaded successfully",
        description: "Your training evidence has been added and synced to your portfolio.",
        variant: "success",
      });

      return data;
    } catch (error) {
      console.error('Error adding evidence:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload evidence. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Delete evidence
  const deleteEvidence = async (id: string) => {
    try {
      const { error } = await supabase
        .from('training_evidence')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvidenceItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Evidence deleted",
        description: "The evidence has been removed from your records.",
      });
    } catch (error) {
      console.error('Error deleting evidence:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete evidence. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update evidence
  const updateEvidence = async (id: string, updates: Partial<TrainingEvidenceData>) => {
    try {
      const { data, error } = await supabase
        .from('training_evidence')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setEvidenceItems(prev => prev.map(item => item.id === id ? data : item));
      
      toast({
        title: "Evidence updated",
        description: "Your training evidence has been updated successfully.",
      });

      return data;
    } catch (error) {
      console.error('Error updating evidence:', error);
      toast({
        title: "Update failed",
        description: "Failed to update evidence. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  return {
    evidenceItems,
    isLoading,
    isUploading,
    setIsUploading,
    addEvidence,
    deleteEvidence,
    updateEvidence,
    refreshEvidence: fetchEvidence,
  };
};
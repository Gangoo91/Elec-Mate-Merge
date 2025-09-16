
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TrainingEvidenceItem } from "@/types/time-tracking";
import { supabase } from "@/integrations/supabase/client";

export const useTrainingEvidence = () => {
  const { toast } = useToast();
  const [evidenceItems, setEvidenceItems] = useState<TrainingEvidenceItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvidence();
  }, []);

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

      const formattedEvidence: TrainingEvidenceItem[] = data?.map(item => ({
        id: item.id,
        title: item.title,
        type: item.evidence_type,
        date: item.date_achieved,
        description: item.description || '',
        files: item.file_name ? [item.file_name] : []
      })) || [];

      setEvidenceItems(formattedEvidence);
    } catch (error) {
      console.error('Error fetching evidence:', error);
      toast({
        title: "Error loading evidence",
        description: "Could not load your training evidence. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('evidence-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('evidence-files')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Could not upload file. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const addEvidence = async (evidence: Omit<TrainingEvidenceItem, 'id'>, files: File[] = []) => {
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let fileUrl = null;
      let fileName = null;

      if (files.length > 0) {
        fileUrl = await uploadFile(files[0]);
        fileName = files[0].name;
      }

      const { data, error } = await supabase
        .from('training_evidence')
        .insert({
          user_id: user.id,
          title: evidence.title,
          evidence_type: evidence.type,
          date_achieved: evidence.date,
          description: evidence.description,
          file_url: fileUrl,
          file_name: fileName,
          tags: [],
          verification_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      const newEvidence: TrainingEvidenceItem = {
        id: data.id,
        title: data.title,
        type: data.evidence_type,
        date: data.date_achieved,
        description: data.description || '',
        files: data.file_name ? [data.file_name] : []
      };

      setEvidenceItems(prev => [newEvidence, ...prev]);
      
      toast({
        title: "Evidence uploaded",
        description: "Your training evidence has been successfully added to your records.",
      });
    } catch (error) {
      console.error('Error adding evidence:', error);
      toast({
        title: "Upload failed",
        description: "Could not add evidence. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

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
        description: "Could not delete evidence. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getFileUrl = async (filePath: string): Promise<string | null> => {
    try {
      const { data } = supabase.storage
        .from('evidence-files')
        .getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return null;
    }
  };

  return {
    evidenceItems,
    addEvidence,
    deleteEvidence,
    isUploading,
    setIsUploading,
    loading,
    getFileUrl
  };
};

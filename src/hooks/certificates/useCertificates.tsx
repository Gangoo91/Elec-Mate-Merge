
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Certificate } from "@/types/certificates";
import { supabase } from "@/integrations/supabase/client";

export const useCertificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, we'll use the training_evidence table to store certificates
      // In a real implementation, you might want a separate certificates table
      const { data, error } = await supabase
        .from('training_evidence')
        .select('*')
        .eq('user_id', user.id)
        .eq('evidence_type', 'certificate')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedCertificates: Certificate[] = data?.map(item => ({
        id: item.id,
        name: item.title,
        issueDate: item.date_achieved,
        expiryDate: item.date_achieved, // You might want to add an expiry_date field
        fileUrl: item.file_url || "#",
        issuedBy: item.witness_name || "Unknown"
      })) || [];

      setCertificates(formattedCertificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast({
        title: "Error loading certificates",
        description: "Could not load your certificates. Please try again.",
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
      const filePath = `${user.id}/certificates/${fileName}`;

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
      return null;
    }
  };

  const addCertificate = async (certificate: Omit<Certificate, "id" | "fileUrl">, file?: File) => {
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let fileUrl = "#";
      if (file) {
        const uploadedUrl = await uploadFile(file);
        if (uploadedUrl) fileUrl = uploadedUrl;
      }

      const { data, error } = await supabase
        .from('training_evidence')
        .insert({
          user_id: user.id,
          title: certificate.name,
          evidence_type: 'certificate',
          date_achieved: certificate.issueDate,
          description: `Certificate issued by ${certificate.issuedBy}`,
          file_url: fileUrl,
          file_name: file?.name,
          witness_name: certificate.issuedBy,
          verification_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      const newCertificate: Certificate = {
        id: data.id,
        name: data.title,
        issueDate: data.date_achieved,
        expiryDate: certificate.expiryDate,
        fileUrl: data.file_url || "#",
        issuedBy: data.witness_name || certificate.issuedBy
      };

      setCertificates(prev => [newCertificate, ...prev]);
      
      toast({
        title: "Certificate uploaded",
        description: "Your certificate has been successfully uploaded and saved.",
      });
    } catch (error) {
      console.error('Error adding certificate:', error);
      toast({
        title: "Upload failed",
        description: "Could not upload certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('training_evidence')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCertificates(prev => prev.filter(cert => cert.id !== id));
      
      toast({
        title: "Certificate deleted",
        description: "The certificate has been removed from your records.",
      });
    } catch (error) {
      console.error('Error deleting certificate:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    certificates,
    addCertificate,
    deleteCertificate,
    isUploading,
    setIsUploading,
    loading
  };
};

export default useCertificates;

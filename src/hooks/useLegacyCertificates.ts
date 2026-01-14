import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export type CertificateType = 'eicr' | 'eic' | 'minor-works' | 'pir' | 'other';

export interface LegacyCertificate {
  id: string;
  user_id: string;
  customer_id: string | null;
  original_filename: string;
  storage_path: string;
  file_size_bytes: number | null;
  certificate_type: CertificateType | null;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  issuing_company: string | null;
  imported_from_system: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined customer data
  customer?: {
    id: string;
    name: string;
  } | null;
}

export interface CreateLegacyCertificateInput {
  file: File;
  certificate_type?: CertificateType;
  certificate_number?: string;
  client_name?: string;
  installation_address?: string;
  issue_date?: string;
  expiry_date?: string;
  issuing_company?: string;
  imported_from_system?: string;
  customer_id?: string;
  notes?: string;
}

export interface UpdateLegacyCertificateInput {
  certificate_type?: CertificateType | null;
  certificate_number?: string | null;
  client_name?: string | null;
  installation_address?: string | null;
  issue_date?: string | null;
  expiry_date?: string | null;
  issuing_company?: string | null;
  imported_from_system?: string | null;
  customer_id?: string | null;
  notes?: string | null;
}

export const useLegacyCertificates = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all legacy certificates for the user
  const { data: certificates, isLoading, error } = useQuery({
    queryKey: ['legacy-certificates'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('legacy_certificates')
        .select(`
          *,
          customer:customers!legacy_certificates_customer_id_fkey (
            id,
            name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LegacyCertificate[];
    },
  });

  // Upload a new legacy certificate
  const uploadCertificate = useMutation({
    mutationFn: async (input: CreateLegacyCertificateInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Validate file type
      if (input.file.type !== 'application/pdf') {
        throw new Error('Only PDF files are allowed');
      }

      // Validate file size (50MB max)
      if (input.file.size > 50 * 1024 * 1024) {
        throw new Error('File size must be less than 50MB');
      }

      // Generate unique storage path
      const fileId = uuidv4();
      const storagePath = `${user.id}/${fileId}.pdf`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('legacy-certificates')
        .upload(storagePath, input.file);

      if (uploadError) throw uploadError;

      // Insert database record
      const { data, error: insertError } = await supabase
        .from('legacy_certificates')
        .insert({
          user_id: user.id,
          original_filename: input.file.name,
          storage_path: storagePath,
          file_size_bytes: input.file.size,
          certificate_type: input.certificate_type || null,
          certificate_number: input.certificate_number || null,
          client_name: input.client_name || null,
          installation_address: input.installation_address || null,
          issue_date: input.issue_date || null,
          expiry_date: input.expiry_date || null,
          issuing_company: input.issuing_company || null,
          imported_from_system: input.imported_from_system || null,
          customer_id: input.customer_id || null,
          notes: input.notes || null,
        })
        .select()
        .single();

      if (insertError) {
        // Clean up uploaded file on database error
        await supabase.storage
          .from('legacy-certificates')
          .remove([storagePath]);
        throw insertError;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legacy-certificates'] });
      toast({
        title: 'Certificate uploaded',
        description: 'Your certificate has been saved successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update certificate metadata
  const updateCertificate = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdateLegacyCertificateInput }) => {
      const { data, error } = await supabase
        .from('legacy_certificates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legacy-certificates'] });
      toast({
        title: 'Certificate updated',
        description: 'Certificate details have been updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete a certificate
  const deleteCertificate = useMutation({
    mutationFn: async (certificate: LegacyCertificate) => {
      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('legacy-certificates')
        .remove([certificate.storage_path]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
        // Continue anyway - file might already be deleted
      }

      // Delete database record
      const { error: dbError } = await supabase
        .from('legacy_certificates')
        .delete()
        .eq('id', certificate.id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legacy-certificates'] });
      toast({
        title: 'Certificate deleted',
        description: 'The certificate has been removed.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Get download URL for a certificate
  const getDownloadUrl = async (storagePath: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from('legacy-certificates')
      .createSignedUrl(storagePath, 3600); // 1 hour expiry

    if (error) {
      console.error('Error getting download URL:', error);
      return null;
    }

    return data.signedUrl;
  };

  // Bulk upload certificates
  const bulkUpload = useMutation({
    mutationFn: async (files: File[]) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const results = {
        successful: 0,
        failed: 0,
        errors: [] as string[],
      };

      for (const file of files) {
        try {
          // Validate file
          if (file.type !== 'application/pdf') {
            results.failed++;
            results.errors.push(`${file.name}: Not a PDF file`);
            continue;
          }

          if (file.size > 50 * 1024 * 1024) {
            results.failed++;
            results.errors.push(`${file.name}: File too large (max 50MB)`);
            continue;
          }

          // Generate storage path
          const fileId = uuidv4();
          const storagePath = `${user.id}/${fileId}.pdf`;

          // Upload to storage
          const { error: uploadError } = await supabase.storage
            .from('legacy-certificates')
            .upload(storagePath, file);

          if (uploadError) throw uploadError;

          // Insert database record
          const { error: insertError } = await supabase
            .from('legacy_certificates')
            .insert({
              user_id: user.id,
              original_filename: file.name,
              storage_path: storagePath,
              file_size_bytes: file.size,
            });

          if (insertError) {
            // Clean up uploaded file
            await supabase.storage
              .from('legacy-certificates')
              .remove([storagePath]);
            throw insertError;
          }

          results.successful++;
        } catch (error) {
          results.failed++;
          results.errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      return results;
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ['legacy-certificates'] });
      if (results.successful > 0) {
        toast({
          title: 'Upload complete',
          description: `${results.successful} certificate${results.successful === 1 ? '' : 's'} uploaded successfully.${results.failed > 0 ? ` ${results.failed} failed.` : ''}`,
        });
      } else {
        toast({
          title: 'Upload failed',
          description: 'No certificates were uploaded successfully.',
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Bulk upload failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    certificates: certificates || [],
    isLoading,
    error,
    uploadCertificate: uploadCertificate.mutateAsync,
    updateCertificate: updateCertificate.mutateAsync,
    deleteCertificate: deleteCertificate.mutateAsync,
    bulkUpload: bulkUpload.mutateAsync,
    getDownloadUrl,
    isUploading: uploadCertificate.isPending || bulkUpload.isPending,
  };
};

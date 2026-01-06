/**
 * useCertificateEmail
 *
 * Hook for sending certificates via email using connected email accounts.
 * Integrates with the send-certificate-email edge function.
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CertificateEmailData {
  certificateType: 'EICR' | 'EIC';
  reportId: string;
  certificateNumber?: string;
  clientName?: string;
  clientEmail?: string;
  installationAddress?: string;
  inspectionDate?: string;
  overallAssessment?: string;
  companyName?: string;
}

export interface SendEmailParams {
  recipientEmail: string;
  cc?: string[];
  customMessage?: string;
}

export interface UseCertificateEmailReturn {
  sendCertificateEmail: (params: SendEmailParams) => Promise<void>;
  isLoading: boolean;
  isSent: boolean;
  error: string | null;
  hasEmailConfig: boolean;
  checkEmailConfig: () => Promise<boolean>;
  reset: () => void;
}

export const useCertificateEmail = (data: CertificateEmailData): UseCertificateEmailReturn => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasEmailConfig, setHasEmailConfig] = useState(false);

  /**
   * Check if user has an active email configuration
   */
  const checkEmailConfig = useCallback(async (): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data: configs, error: configError } = await supabase
        .from('user_email_configs')
        .select('id, provider, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .limit(1);

      const hasConfig = !configError && configs && configs.length > 0;
      setHasEmailConfig(hasConfig);
      return hasConfig;
    } catch (err) {
      console.error('Error checking email config:', err);
      setHasEmailConfig(false);
      return false;
    }
  }, []);

  /**
   * Send certificate via email
   */
  const sendCertificateEmail = useCallback(async (params: SendEmailParams): Promise<void> => {
    const { recipientEmail, cc, customMessage } = params;

    // Validate email
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      throw new Error('Please enter a valid email address');
    }

    setIsLoading(true);
    setError(null);
    setIsSent(false);

    try {
      // First check if email config exists
      const hasConfig = await checkEmailConfig();
      if (!hasConfig) {
        throw new Error('No email account connected. Please connect Gmail or Outlook in Settings.');
      }

      // Call the edge function
      const { data: result, error: fnError } = await supabase.functions.invoke('send-certificate-email', {
        body: {
          certificateType: data.certificateType,
          reportId: data.reportId,
          recipientEmail,
          cc: cc?.filter(e => e.trim()),
          customMessage,
          certificateData: {
            certificateNumber: data.certificateNumber,
            clientName: data.clientName,
            installationAddress: data.installationAddress,
            inspectionDate: data.inspectionDate,
            overallAssessment: data.overallAssessment,
            companyName: data.companyName,
          }
        }
      });

      if (fnError) {
        // Parse error message if it's JSON
        let errorMessage = fnError.message;
        try {
          const parsed = JSON.parse(fnError.message);
          errorMessage = parsed.error || parsed.message || fnError.message;
        } catch {
          // Keep original message
        }
        throw new Error(errorMessage);
      }

      if (!result?.success) {
        throw new Error(result?.error || 'Failed to send certificate email');
      }

      setIsSent(true);
      toast({
        title: 'Certificate Sent',
        description: `Certificate sent successfully to ${recipientEmail}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email';
      setError(errorMessage);
      toast({
        title: 'Email Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [data, checkEmailConfig, toast]);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSent(false);
    setError(null);
  }, []);

  return {
    sendCertificateEmail,
    isLoading,
    isSent,
    error,
    hasEmailConfig,
    checkEmailConfig,
    reset,
  };
};

export default useCertificateEmail;

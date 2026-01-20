/**
 * useCertificateEmail
 *
 * Hook for sending certificates via email using Resend.
 * Integrates with the send-certificate-resend edge function.
 * No Gmail/Outlook connection required - works immediately.
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CertificateEmailData {
  certificateType: 'EICR' | 'EIC' | 'minor-works';
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
  // Always true for Resend - no user email config needed
  const [hasEmailConfig] = useState(true);

  /**
   * Check if email can be sent - always true with Resend
   */
  const checkEmailConfig = useCallback(async (): Promise<boolean> => {
    // With Resend, we don't need user email configuration
    // Email is sent from the platform's Resend account
    return true;
  }, []);

  /**
   * Send certificate via email using Resend
   */
  const sendCertificateEmail = useCallback(async (params: SendEmailParams): Promise<void> => {
    const { recipientEmail, customMessage } = params;

    // Validate email
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      throw new Error('Please enter a valid email address');
    }

    setIsLoading(true);
    setError(null);
    setIsSent(false);

    try {
      // Call the Resend-based edge function
      const { data: result, error: fnError } = await supabase.functions.invoke('send-certificate-resend', {
        body: {
          reportId: data.reportId,
          recipientEmail,
          customMessage,
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
  }, [data, toast]);

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

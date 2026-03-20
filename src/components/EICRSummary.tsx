import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  FileDown,
  FileCheck,
  Save,
  Copy,
  ChevronDown,
  ChevronUp,
  Loader2,
  User,
  Mail,
  PenTool,
  Code,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { exportCompleteEICRToPDF } from '@/utils/pdfExport';
import { cn } from '@/lib/utils';

import { useToast } from '@/hooks/use-toast';
import { useCloudSync } from '@/hooks/useCloudSync';
import { formatEICRJson } from '@/utils/eicrJsonFormatter';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import SignatureInput from '@/components/signature/SignatureInput';
import { useEICRForm } from './eicr/EICRFormProvider';
import { useQueryClient } from '@tanstack/react-query';
import { CreateCustomerDialog } from '@/components/CreateCustomerDialog';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';
import { useCustomers } from '@/hooks/useCustomers';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import { useAppReview } from '@/hooks/useAppReview';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';
import { useEstimateRemedialCosts } from '@/hooks/useEstimateRemedialCosts';
import type { EstimateResult } from '@/hooks/useEstimateRemedialCosts';
import type { RemedialQuoteItem } from '@/utils/defectToQuoteItems';
import { mapDefectsToQuoteItems } from '@/utils/defectToQuoteItems';
import QuoteOptionsSheet from '@/components/inspection/eicr/QuoteOptionsSheet';
import AIEstimatorSheet from '@/components/inspection/eicr/AIEstimatorSheet';
import { openOrDownloadPdf } from '@/utils/pdf-download';

interface EICRSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const EICRSummary = ({ formData: propFormData, onUpdate: propOnUpdate }: EICRSummaryProps) => {
  // Use formData and updateFormData from context directly to ensure we always have the latest state
  // (props can be stale due to React's reconciliation timing)
  const {
    effectiveReportId,
    formData: contextFormData,
    updateFormData,
    getLatestFormData,
    syncNow,
    syncNowImmediate,
  } = useEICRForm();
  const formData = contextFormData; // Use context formData for all operations
  const onUpdate = updateFormData; // Use context updateFormData for all operations
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const { recordPositiveAction } = useAppReview();
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [formattedJsonPreview, setFormattedJsonPreview] = useState<string>('');
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [savedReportIdForCustomer, setSavedReportIdForCustomer] = useState<string | null>(null);
  const { saveCustomer, customers } = useCustomers();
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // AI Estimator state
  const [showQuoteOptions, setShowQuoteOptions] = useState(false);
  const [showEstimatorSheet, setShowEstimatorSheet] = useState(false);
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);
  const { estimate, isEstimating, progressStep, elapsedSeconds, cancel } =
    useEstimateRemedialCosts();

  // Collapsible sections for mobile
  const [inspectedByOpen, setInspectedByOpen] = useState(true);
  const [authorisedByOpen, setAuthorisedByOpen] = useState(false);

  // Email hook for sending certificates via Resend
  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'EICR',
    reportId: effectiveReportId,
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.installationAddress,
    inspectionDate: formData.inspectionDate,
    overallAssessment: formData.overallAssessment,
    companyName: formData.companyName,
  });

  // Ref to always access the latest formData in async callbacks
  // This solves React closure issues where callbacks capture stale state
  // useLayoutEffect runs SYNCHRONOUSLY to ensure ref is updated before any user clicks
  const formDataRef = useRef(formData);
  useLayoutEffect(() => {
    formDataRef.current = formData;
    // Debug: log when arrays change
    console.log('[EICRSummary] formData updated (sync):', {
      inspectionItemsCount: formData.inspectionItems?.length || 0,
      scheduleOfTestsCount: formData.scheduleOfTests?.length || 0,
      defectObservationsCount: formData.defectObservations?.length || 0,
    });
  }, [formData]);

  // Clear JSON cache when any form data changes (not just arrays)
  // This ensures the preview always reflects the current data
  useEffect(() => {
    setFormattedJsonPreview('');
  }, [formData]);

  // Load formatted JSON when collapsible is opened
  const handleToggleJsonPreview = async (isOpen: boolean) => {
    setIsJsonOpen(isOpen);
    if (isOpen && !formattedJsonPreview) {
      // Use ref for latest data
      const formattedJson = await formatEICRJson(formDataRef.current, effectiveReportId);
      setFormattedJsonPreview(JSON.stringify(formattedJson, null, 2));
    }
  };

  const handleCopyJson = async () => {
    // Use context's getLatestFormData() to get the absolute latest formData
    const latestFormData = getLatestFormData();
    console.log('[handleCopyJson] Using formData with arrays:', {
      inspectionItemsCount: latestFormData?.inspectionItems?.length || 0,
      scheduleOfTestsCount: latestFormData?.scheduleOfTests?.length || 0,
      defectObservationsCount: latestFormData?.defectObservations?.length || 0,
    });
    const formattedJson = await formatEICRJson(latestFormData, effectiveReportId);
    navigator.clipboard.writeText(JSON.stringify(formattedJson, null, 2));
    toast({
      title: 'JSON copied',
      description: 'Structured form data copied to clipboard.',
    });
  };

  const getOverallAssessmentColor = () => {
    switch (formData.overallAssessment) {
      case 'satisfactory':
        return 'text-green-600';
      case 'unsatisfactory':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAssessmentIcon = () => {
    switch (formData.overallAssessment) {
      case 'satisfactory':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'unsatisfactory':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const handleGenerateCertificate = async () => {
    console.log('[PDF Generation] Starting process...');
    console.log('[PDF Generation] effectiveReportId:', effectiveReportId);

    setIsGenerating(true);
    setShowDialog(true);
    setPdfUrl(null);
    setGenerationError(null);

    try {
      // Step 1: Force immediate sync and get the SAVED data back
      // This is critical - we use the data that was actually synced to the database,
      // not potentially stale in-memory data that may not have been saved yet
      console.log('[PDF Generation] Step 1: Force immediate sync to database...');

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      let savedReportId = effectiveReportId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dataForPdf: any;

      if (syncNowImmediate) {
        // Use the new immediate sync that returns the saved data
        console.log('[PDF Generation] Using syncNowImmediate for guaranteed data consistency...');
        const syncResult = await syncNowImmediate();

        if (syncResult.success && syncResult.reportId) {
          savedReportId = syncResult.reportId;
          dataForPdf = syncResult.data; // Use the data that was actually saved
          console.log('[PDF Generation] Report synced with ID:', savedReportId);
          console.log('[PDF Generation] Using SYNCED data for PDF generation');
        } else {
          console.warn('[PDF Generation] Sync failed, falling back to current form data...');
          dataForPdf = getLatestFormData();
        }
      } else {
        // Fallback to old behavior if syncNowImmediate not available
        console.warn('[PDF Generation] syncNowImmediate not available, using legacy sync...');
        try {
          const syncResult = await syncNow?.();
          if (syncResult?.success && syncResult?.reportId) {
            savedReportId = syncResult.reportId;
          }
        } catch (saveError) {
          console.warn('[PDF Generation] Report save error (non-blocking):', saveError);
        }
        dataForPdf = getLatestFormData();
      }

      // Data verification logging - ensure we're using the right data
      console.log('[PDF Generation] Data verification:', {
        scheduleOfTestsCount: dataForPdf?.scheduleOfTests?.length || 0,
        inspectionItemsCount: dataForPdf?.inspectionItems?.length || 0,
        defectObservationsCount: dataForPdf?.defectObservations?.length || 0,
        clientName: dataForPdf?.clientName,
      });

      // Step 2: Auto-resolve scheme logo if scheme is set but logo is missing or placeholder
      const schemeName = dataForPdf.registrationScheme;
      const currentLogo = dataForPdf.registrationSchemeLogo || '';
      const isPlaceholderLogo =
        !currentLogo || currentLogo.length < 2000 || currentLogo.includes('image/svg+xml');
      if (schemeName && schemeName !== 'none' && schemeName !== 'other' && isPlaceholderLogo) {
        try {
          const { getSchemeInfo } = await import('@/constants/schemeLogos');
          const info = getSchemeInfo(schemeName);
          if (info) {
            const resp = await fetch(info.logoPath);
            const blob = await resp.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            dataForPdf = { ...dataForPdf, registrationSchemeLogo: dataUrl };
            console.log('[PDF Generation] Auto-resolved scheme logo for:', schemeName);
          }
        } catch (err) {
          console.warn('[PDF Generation] Failed to resolve scheme logo:', err);
        }
      }

      // Step 3: Format the EICR data for PDF Monkey (using the SYNCED data)
      console.log('[PDF Generation] Step 3: Formatting data for PDF generation...');
      console.log('[EICRSummary] Raw formData keys:', Object.keys(dataForPdf));
      console.log('[EICRSummary] Critical fields in raw formData:', {
        clientName: dataForPdf.clientName || 'MISSING',
        installationAddress: dataForPdf.installationAddress || 'MISSING',
        inspectorName: dataForPdf.inspectorName || 'MISSING',
        certificateNumber: dataForPdf.certificateNumber || 'MISSING',
      });
      console.log('[EICRSummary] Array counts:', {
        scheduleOfTests: dataForPdf.scheduleOfTests?.length || 0,
        inspectionItems: dataForPdf.inspectionItems?.length || 0,
        defectObservations: dataForPdf.defectObservations?.length || 0,
      });

      const formattedJson = await formatEICRJson(dataForPdf, savedReportId);

      // Save formatted payload for email/reports page reuse
      await supabase
        .from('reports')
        .update({ pdf_payload: formattedJson })
        .eq('report_id', savedReportId);

      console.log(
        '[PDF Generation] Formatted EICR JSON (first 200 chars):',
        JSON.stringify(formattedJson).substring(0, 200)
      );
      console.log('[PDF Generation] Required fields check:', {
        clientName: formattedJson.client_details?.client_name,
        installationAddress: formattedJson.installation_details?.address,
        inspectorName: formattedJson.inspector?.name,
      });

      // Critical debug: flat inspection keys
      const allKeys = Object.keys(formattedJson);
      const flatInspKeys = allKeys.filter((k) => k.startsWith('insp_'));
      console.log('[PDF Generation] ========== FLAT KEYS DEBUG ==========');
      console.log('[PDF Generation] Total keys in formattedJson:', allKeys.length);
      console.log('[PDF Generation] Flat inspection keys count:', flatInspKeys.length);
      console.log('[PDF Generation] Sample flat keys:', flatInspKeys.slice(0, 10));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log('[PDF Generation] insp_1_0_acc:', (formattedJson as any).insp_1_0_acc);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log('[PDF Generation] insp_3_5_acc:', (formattedJson as any).insp_3_5_acc);
      console.log(
        '[PDF Generation] inspection_debug_test:',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formattedJson as any).inspection_debug_test
      );
      console.log('[PDF Generation] =================================================');

      // Schedule of Tests debug logging
      console.log('[PDF Generation] ========== SCHEDULE OF TESTS DEBUG ==========');
      console.log(
        '[PDF Generation] schedule_of_tests present:',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(formattedJson as any).schedule_of_tests
      );
      console.log(
        '[PDF Generation] schedule_of_tests length:',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formattedJson as any).schedule_of_tests?.length || 0
      );
      console.log(
        '[PDF Generation] boards_with_schedules present:',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(formattedJson as any).boards_with_schedules
      );
      console.log(
        '[PDF Generation] boards_with_schedules length:',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (formattedJson as any).boards_with_schedules?.length || 0
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((formattedJson as any).schedule_of_tests?.length > 0) {
        console.log(
          '[PDF Generation] First circuit keys:',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.keys((formattedJson as any).schedule_of_tests[0])
        );
        console.log(
          '[PDF Generation] First circuit sample:',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          JSON.stringify((formattedJson as any).schedule_of_tests[0]).substring(0, 500)
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((formattedJson as any).boards_with_schedules?.length > 0) {
        console.log(
          '[PDF Generation] First board circuits count:',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (formattedJson as any).boards_with_schedules[0]?.circuits?.length || 0
        );
      }
      console.log('[PDF Generation] ================================================');

      // Step 4: Call the edge function
      console.log('[PDF Generation] Step 4: Calling edge function generate-eicr-pdf...');
      console.log(
        '[PDF Generation] Sending payload with keys:',
        Object.keys({ formData: formattedJson })
      );

      const { data, error } = await supabase.functions.invoke('generate-eicr-pdf', {
        body: { formData: formattedJson },
      });

      console.log('[PDF Generation] Edge function raw response:', JSON.stringify(data));
      console.log('[PDF Generation] Edge function error:', error);

      // Check for errors - either from Supabase or from our edge function response
      if (error) {
        console.error('[PDF Generation] Edge function invocation error:', error);
        // Try to get more details from the error context
        const errorDetail = error.context?.body
          ? JSON.stringify(error.context.body)
          : error.message;
        throw new Error(`Edge function error: ${errorDetail}`);
      }

      // Check if the edge function returned an error in the response
      if (data?.success === false || data?.error) {
        console.error('[PDF Generation] Edge function returned error:', data.error);
        throw new Error(`PDF Monkey error: ${data.error || 'Unknown error'}`);
      }

      // Try multiple response formats
      const pdfUrlFromResponse =
        data?.pdfUrl || data?.pdf_url || data?.url || data?.data?.pdfUrl || data?.downloadUrl;

      console.log('[PDF Generation] Extracted PDF URL:', pdfUrlFromResponse);

      if (!pdfUrlFromResponse) {
        console.error(
          '[PDF Generation] Edge function succeeded but returned no PDF URL. Full response:',
          data
        );
        throw new Error('Edge function succeeded but returned no PDF URL');
      }

      console.log('[PDF Generation] Step 4: PDF generated successfully:', pdfUrlFromResponse);

      // Step 5: Save PDF to permanent Supabase Storage (PDFMonkey URLs expire after 7 days)
      let permanentUrl = pdfUrlFromResponse; // Fallback to temp URL
      let storagePath: string | null = null;

      try {
        const storageResult = await saveCertificatePdf(
          pdfUrlFromResponse,
          user.id,
          savedReportId,
          dataForPdf.certificateNumber
        );
        permanentUrl = storageResult.permanentUrl;
        storagePath = storageResult.storagePath;
        console.log('[PDF Generation] PDF saved to permanent storage:', storagePath);
      } catch (storageError) {
        console.error(
          '[PDF Generation] Failed to save PDF permanently, using temp URL:',
          storageError
        );
        // Continue with temp URL - user can still download, just won't persist long-term
      }

      setPdfUrl(permanentUrl);

      // Step 6: Save PDF URL to database using the SAVED report_id
      console.log(
        '[PDF Generation] Step 6: Saving PDF URL to database for report_id:',
        savedReportId
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: Record<string, any> = {
        pdf_url: permanentUrl,
        pdf_generated_at: new Date().toISOString(),
      };

      if (storagePath) {
        updateData.storage_path = storagePath;
      }

      const { error: updateError } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', savedReportId)
        .select('id, report_id, pdf_url');

      if (updateError) {
        console.error(
          '[PDF Generation] CRITICAL: Failed to save PDF URL to database:',
          updateError
        );
        console.error('[PDF Generation] Update attempted for report_id:', savedReportId);
        console.error('[PDF Generation] PDF URL that failed to save:', permanentUrl);

        // Still show the PDF to user, but warn them
        toast({
          title: 'Warning',
          description: 'PDF generated but not saved to your account. Please save manually.',
          variant: 'destructive',
        });
      }

      // Mark certificate as completed
      onUpdate('certificateGenerated', true);
      onUpdate('certificateGeneratedAt', new Date().toISOString());
      onUpdate('status', 'completed');

      // Invalidate dashboard queries to refresh
      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });
      queryClient.invalidateQueries({ queryKey: ['customer-reports'] });

      toast({
        title: 'Certificate generated',
        description: storagePath
          ? 'Your EICR certificate has been saved permanently.'
          : 'Your EICR certificate is ready for download.',
      });

      // Prompt for App Store review after a positive win
      recordPositiveAction();

      // Check if customer already exists in pool
      const existingCustomer = customers.find(
        (c) => c.name.toLowerCase() === dataForPdf.clientName?.toLowerCase()
      );

      // If customer doesn't exist, show prompt to save
      if (!existingCustomer && dataForPdf.clientName) {
        setSavedReportIdForCustomer(savedReportId);
        setShowCustomerDialog(true);
      }
    } catch (error) {
      console.error('Cloud PDF generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setGenerationError(errorMessage);

      // Show the error to user - NO FALLBACK so we can debug
      toast({
        title: 'PDF Generation Failed',
        description: `PDF Monkey error: ${errorMessage}. Check console for details.`,
        variant: 'destructive',
        duration: 10000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = () => {
    // Note: Auto-save is now handled by EICRFormProvider via useCloudSync
    toast({
      title: 'Saved to cloud',
      description: 'Your EICR is automatically saved to the cloud.',
    });
  };

  // Email send handler - ensures report is saved before emailing
  const handleSendEmail = async (email: string, cc?: string[], message?: string) => {
    // First, ensure report is saved to database using sync hook
    try {
      console.log('[Email] Syncing report before sending email...');
      const syncResult = await syncNow();
      if (!syncResult.success) {
        throw new Error('Failed to save report before emailing. Please try again.');
      }
      console.log('[Email] Report synced:', syncResult.reportId);
    } catch (saveError) {
      console.error('[Email] Failed to save report before emailing:', saveError);
      toast({
        title: 'Save Error',
        description: 'Please save your certificate before emailing. Try generating the PDF first.',
        variant: 'destructive',
      });
      throw saveError;
    }

    // Now send the email
    await sendCertificateEmail({
      recipientEmail: email,
      cc,
      customMessage: message,
    });
  };

  const handleSaveCustomer = async (customerData: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  }) => {
    await saveCustomer(customerData);

    // Invalidate customer queries to refresh list
    queryClient.invalidateQueries({ queryKey: ['customers'] });
  };

  // Navigate to quote builder with client data pre-filled
  const handleCreateQuote = () => {
    haptics.tap();
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EICR',
      certificateReference: formData.certificateNumber || '',
      reportId: effectiveReportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Navigate to invoice builder with client data pre-filled
  const handleCreateInvoice = () => {
    haptics.tap();
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EICR',
      certificateReference: formData.certificateNumber || '',
      reportId: effectiveReportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // AI Estimator handlers
  const handleAIEstimate = async () => {
    setShowQuoteOptions(false);
    setShowEstimatorSheet(true);
    setEstimateResult(null);

    const defects = (formData.defectObservations || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((d: any) => ['C1', 'C2', 'C3', 'FI'].includes(d.defectCode))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((d: any) => ({
        code: d.defectCode,
        description: d.description,
        location: d.item || '',
        circuitRef: '',
      }));

    if (defects.length === 0) {
      toast({
        title: 'No defects found',
        description: 'Add defect observations before estimating.',
      });
      setShowEstimatorSheet(false);
      return;
    }

    const result = await estimate(defects);
    if (result) {
      setEstimateResult(result);
    } else {
      // Fallback to static mapping
      const staticItems = mapDefectsToQuoteItems(defects);
      if (staticItems.length > 0) {
        const totalMaterials = staticItems
          .filter((i) => i.category === 'materials')
          .reduce((s, i) => s + i.totalPrice, 0);
        const totalLabour = staticItems
          .filter((i) => i.category === 'labour')
          .reduce((s, i) => s + i.totalPrice, 0);
        setEstimateResult({
          items: staticItems,
          summary: {
            totalMaterials,
            totalLabour,
            totalExVat: totalMaterials + totalLabour,
            defectsProcessed: defects.length,
          },
        });
      }
    }
  };

  const handleSendToQuote = () => {
    setShowQuoteOptions(false);
    handleCreateQuote();
  };

  const handleUpdateEstimateItem = (index: number, updates: Partial<RemedialQuoteItem>) => {
    if (!estimateResult) return;
    const newItems = [...estimateResult.items];
    newItems[index] = { ...newItems[index], ...updates };
    const totalMaterials = newItems
      .filter((i) => i.category === 'materials')
      .reduce((s, i) => s + i.totalPrice, 0);
    const totalLabour = newItems
      .filter((i) => i.category === 'labour')
      .reduce((s, i) => s + i.totalPrice, 0);
    setEstimateResult({
      ...estimateResult,
      items: newItems,
      summary: {
        ...estimateResult.summary,
        totalMaterials,
        totalLabour,
        totalExVat: totalMaterials + totalLabour,
      },
    });
  };

  const handleDeleteEstimateItem = (index: number) => {
    if (!estimateResult) return;
    const newItems = estimateResult.items.filter((_, i) => i !== index);
    const totalMaterials = newItems
      .filter((i) => i.category === 'materials')
      .reduce((s, i) => s + i.totalPrice, 0);
    const totalLabour = newItems
      .filter((i) => i.category === 'labour')
      .reduce((s, i) => s + i.totalPrice, 0);
    setEstimateResult({
      ...estimateResult,
      items: newItems,
      summary: {
        ...estimateResult.summary,
        totalMaterials,
        totalLabour,
        totalExVat: totalMaterials + totalLabour,
      },
    });
  };

  const handleUpdateScopeOfWorks = (text: string) => {
    if (!estimateResult) return;
    setEstimateResult({ ...estimateResult, scopeOfWorks: text });
  };

  const handleEstimateToQuote = () => {
    if (!estimateResult) return;
    haptics.tap();

    const materialItems = estimateResult.items.filter((i) => i.category === 'materials');
    const labourItems = estimateResult.items.filter((i) => i.category === 'labour');
    const totalLabourHours = labourItems.reduce((s, i) => s + (i.labourHours || i.quantity), 0);
    const labourRate = labourItems.length > 0 ? labourItems[0].unitPrice : 45;

    const costData = {
      materials: materialItems.map((m) => ({
        item: m.description,
        quantity: m.quantity,
        unitPrice: m.unitPrice,
        supplier: 'Estimated',
        total: m.totalPrice,
      })),
      labour: {
        hours: totalLabourHours,
        rate: labourRate,
        total: labourItems.reduce((s, i) => s + i.totalPrice, 0),
      },
      totalCost: estimateResult.summary.totalExVat,
      valueEngineering: estimateResult.scopeOfWorks ? [estimateResult.scopeOfWorks] : undefined,
    };

    const costSessionId = `estimate-${Date.now()}`;
    sessionStorage.setItem(costSessionId, JSON.stringify({ costData }));

    const certUrl = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EICR',
      certificateReference: formData.certificateNumber || '',
      reportId: effectiveReportId || undefined,
    });
    const certSessionId = new URL(certUrl, window.location.origin).searchParams.get(
      'certificateSessionId'
    );

    // Inject scope of works into job description so QuoteWizard picks it up
    if (certSessionId && estimateResult.scopeOfWorks) {
      const stored = sessionStorage.getItem(certSessionId);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.certificateData?.jobDetails) {
          parsed.certificateData.jobDetails.description = estimateResult.scopeOfWorks;
          sessionStorage.setItem(certSessionId, JSON.stringify(parsed));
        }
      }
    }

    navigate(
      `/electrician/quote-builder/create?costSessionId=${costSessionId}${certSessionId ? `&certificateSessionId=${certSessionId}` : ''}`
    );
  };

  // Allow PDF generation without strict field validation
  const isFormComplete = () => {
    return true;
  };

  return (
    <div className={cn('space-y-6', isMobile && '-mx-4')}>
      {/* Standards Compliance Section */}
      <div>
        <Collapsible defaultOpen={false}>
          <CollapsibleTrigger className="w-full" asChild>
            <button
              onClick={() => haptics.tap()}
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors',
                'bg-card/50 border-y border-border/30',
                'active:bg-card/80'
              )}
            >
              <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-500/20">
                <FileCheck className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Standards Compliance</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Design standard and regulatory compliance
                </p>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('p-4 space-y-4', isMobile ? '' : 'px-6')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Design Standard</Label>
                  <Select
                    value={formData.designStandard || ''}
                    onValueChange={(value) => {
                      haptics.tap();
                      onUpdate('designStandard', value);
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-card/50 border-border/30">
                      <SelectValue placeholder="Select standard" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="BS7671">BS 7671</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">
                    Part P Compliance
                  </Label>
                  <Select
                    value={formData.partPCompliance || ''}
                    onValueChange={(value) => {
                      haptics.tap();
                      onUpdate('partPCompliance', value);
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-card/50 border-border/30">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      <SelectItem value="non-notifiable">Non-notifiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('bs7671Compliance', !formData.bs7671Compliance);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation',
                    formData.bs7671Compliance
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-border/30 bg-card/30'
                  )}
                >
                  <Checkbox
                    checked={formData.bs7671Compliance || false}
                    className="h-5 w-5 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="font-medium">Work complies with BS 7671</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('buildingRegsCompliance', !formData.buildingRegsCompliance);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation',
                    formData.buildingRegsCompliance
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-border/30 bg-card/30'
                  )}
                >
                  <Checkbox
                    checked={formData.buildingRegsCompliance || false}
                    className="h-5 w-5 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="font-medium">Work complies with Building Regulations</span>
                </button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Overall Assessment Section - Edge to Edge */}
      <div>
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger className="w-full" asChild>
            <button
              onClick={() => haptics.tap()}
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors',
                'bg-card/50 border-y border-border/30',
                'active:bg-card/80'
              )}
            >
              <div
                className={cn(
                  'h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  formData.overallAssessment === 'satisfactory'
                    ? 'bg-green-500/20'
                    : formData.overallAssessment === 'unsatisfactory'
                      ? 'bg-red-500/20'
                      : 'bg-elec-yellow/20'
                )}
              >
                {formData.overallAssessment === 'satisfactory' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : formData.overallAssessment === 'unsatisfactory' ? (
                  <XCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Overall Assessment</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formData.overallAssessment === 'satisfactory'
                    ? 'Installation Satisfactory'
                    : formData.overallAssessment === 'unsatisfactory'
                      ? 'Installation Unsatisfactory'
                      : 'Select assessment status'}
                </p>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('p-4 space-y-4', isMobile ? '' : 'px-6')}>
              {/* Assessment Toggle Buttons */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">
                  Overall Assessment *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      onUpdate('overallAssessment', 'satisfactory');
                      haptics.success();
                    }}
                    className={cn(
                      'h-14 rounded-xl font-semibold transition-all touch-manipulation',
                      'flex flex-col items-center justify-center gap-1 active:scale-95',
                      formData.overallAssessment === 'satisfactory'
                        ? 'bg-green-500 text-white ring-2 ring-green-500/50 ring-offset-2 ring-offset-background'
                        : 'bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20'
                    )}
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Satisfactory</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      onUpdate('overallAssessment', 'unsatisfactory');
                      haptics.warning();
                    }}
                    className={cn(
                      'h-14 rounded-xl font-semibold transition-all touch-manipulation',
                      'flex flex-col items-center justify-center gap-1 active:scale-95',
                      formData.overallAssessment === 'unsatisfactory'
                        ? 'bg-red-500 text-white ring-2 ring-red-500/50 ring-offset-2 ring-offset-background'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                    )}
                  >
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm">Unsatisfactory</span>
                  </button>
                </div>
              </div>

              {/* Continued Use Toggle Buttons */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">
                  Satisfactory for Continued Use *
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                    { value: 'yes-with-recommendations', label: 'With Cond.' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        haptics.tap();
                        onUpdate('satisfactoryForContinuedUse', option.value);
                      }}
                      className={cn(
                        'h-11 rounded-lg font-medium transition-all touch-manipulation text-sm',
                        'active:scale-95',
                        formData.satisfactoryForContinuedUse === option.value
                          ? 'bg-elec-yellow text-black'
                          : 'bg-card/50 text-foreground border border-border/30 hover:bg-card'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* No Remedial Action Required */}
              <button
                type="button"
                onClick={() => {
                  haptics.tap();
                  onUpdate('noRemedialAction', !formData.noRemedialAction);
                }}
                className={cn(
                  'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation',
                  formData.noRemedialAction
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-border/30 bg-card/30'
                )}
              >
                <Checkbox
                  checked={formData.noRemedialAction || false}
                  className="h-5 w-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <div className="text-left">
                  <span className="font-medium">No remedial action required</span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tick if no defects or observations were recorded
                  </p>
                </div>
              </button>

              {/* Additional Comments */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">
                  Additional Comments
                </Label>
                <textarea
                  className="w-full p-3 border border-border/30 bg-card/50 rounded-lg resize-none touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow/50"
                  style={{ fontSize: '16px' }}
                  rows={3}
                  placeholder="Enter any additional comments or observations..."
                  value={formData.additionalComments || ''}
                  onChange={(e) => onUpdate('additionalComments', e.target.value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Authorisation Signatures Section - Edge to Edge on Mobile */}
      <div>
        {/* Copy from Inspector Details - Quick Action */}
        <div
          className={cn(
            'p-4 bg-blue-500/10 border-y border-blue-500/20',
            isMobile ? '' : 'mx-4 rounded-lg border'
          )}
        >
          <Button
            onClick={() => {
              haptics.tap();
              onUpdate('inspectedByName', formData.inspectorName);
              onUpdate('inspectedBySignature', formData.inspectorSignature);
              onUpdate('inspectedByForOnBehalfOf', formData.companyName);
              onUpdate('inspectedByPosition', 'Inspector');
              onUpdate('inspectedByAddress', formData.companyAddress);
              onUpdate('inspectedByCpScheme', formData.registrationScheme);
              haptics.success();
              toast({
                title: 'Details copied',
                description: "Inspector details copied to 'Inspected By' section",
              });
            }}
            className="w-full h-12 touch-manipulation text-base bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
            variant="outline"
          >
            <User className="h-4 w-4 mr-2" />
            Copy from Inspector Details
          </Button>
        </div>

        {/* INSPECTED BY Section - Collapsible */}
        <Collapsible
          open={inspectedByOpen}
          onOpenChange={(open) => {
            haptics.tap();
            setInspectedByOpen(open);
          }}
        >
          <CollapsibleTrigger className="w-full" asChild>
            <button
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors',
                'bg-card/50 border-y border-border/30',
                inspectedByOpen && 'bg-card/80',
                'active:bg-card/90'
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <PenTool className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Inspected By</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formData.inspectedByName || 'Inspector signature required'}
                </p>
              </div>
              {formData.inspectedBySignature && (
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              )}
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform duration-200',
                  inspectedByOpen && 'rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('p-4 space-y-4 bg-card/30', isMobile ? '' : 'px-6')}>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Name (Capitals) *</Label>
                <Input
                  value={formData.inspectedByName || ''}
                  onChange={(e) => onUpdate('inspectedByName', e.target.value.toUpperCase())}
                  placeholder="FULL NAME IN CAPITALS"
                  className="uppercase h-11 text-base touch-manipulation bg-card/50 border-border/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Signature *</Label>
                <SignatureInput
                  value={formData.inspectedBySignature || ''}
                  onChange={(value) => onUpdate('inspectedBySignature', value || '')}
                  placeholder="Signature of inspector"
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">For/on behalf of</Label>
                  <Input
                    value={formData.inspectedByForOnBehalfOf || ''}
                    onChange={(e) => onUpdate('inspectedByForOnBehalfOf', e.target.value)}
                    placeholder="Company name"
                    className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Position</Label>
                  <Input
                    value={formData.inspectedByPosition || ''}
                    onChange={(e) => onUpdate('inspectedByPosition', e.target.value)}
                    placeholder="Job title"
                    className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Address</Label>
                <textarea
                  className="w-full p-3 border border-border/30 bg-card/50 rounded-lg resize-none touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow/50"
                  style={{ fontSize: '16px' }}
                  rows={2}
                  value={formData.inspectedByAddress || ''}
                  onChange={(e) => onUpdate('inspectedByAddress', e.target.value)}
                  placeholder="Full address"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">CP Scheme</Label>
                <div className="flex items-center gap-3">
                  <Input
                    value={formData.inspectedByCpScheme || ''}
                    onChange={(e) => onUpdate('inspectedByCpScheme', e.target.value)}
                    placeholder="Competent Person Scheme"
                    disabled={formData.inspectedByCpSchemeNA}
                    className={cn(
                      'flex-1 h-11 text-base touch-manipulation bg-card/50 border-border/30',
                      formData.inspectedByCpSchemeNA && 'opacity-50'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      const newValue = !formData.inspectedByCpSchemeNA;
                      onUpdate('inspectedByCpSchemeNA', newValue);
                      if (newValue) onUpdate('inspectedByCpScheme', '');
                    }}
                    className={cn(
                      'h-11 px-4 rounded-lg font-medium transition-all touch-manipulation',
                      formData.inspectedByCpSchemeNA
                        ? 'bg-gray-500 text-white'
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                    )}
                  >
                    N/A
                  </button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* REPORT AUTHORISED BY Section - Collapsible */}
        <Collapsible
          open={authorisedByOpen}
          onOpenChange={(open) => {
            haptics.tap();
            setAuthorisedByOpen(open);
          }}
        >
          <CollapsibleTrigger className="w-full" asChild>
            <button
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors',
                'bg-card/50 border-y border-border/30',
                authorisedByOpen && 'bg-card/80',
                'active:bg-card/90'
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Report Authorised By</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formData.reportAuthorisedByName || 'Authorisation required'}
                </p>
              </div>
              {formData.reportAuthorisedBySignature && (
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              )}
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform duration-200',
                  authorisedByOpen && 'rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('p-4 space-y-4 bg-card/30', isMobile ? '' : 'px-6')}>
              {/* Same as Inspected By Quick Action */}
              <button
                type="button"
                onClick={() => {
                  haptics.tap();
                  const newValue = !formData.sameAsInspectedBy;
                  onUpdate('sameAsInspectedBy', newValue);
                  if (newValue) {
                    onUpdate('reportAuthorisedByName', formData.inspectedByName);
                    onUpdate('reportAuthorisedBySignature', formData.inspectedBySignature);
                    onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
                    onUpdate('reportAuthorisedByForOnBehalfOf', formData.inspectedByForOnBehalfOf);
                    onUpdate('reportAuthorisedByPosition', formData.inspectedByPosition);
                    onUpdate('reportAuthorisedByAddress', formData.inspectedByAddress);
                    onUpdate('reportAuthorisedByMembershipNo', formData.inspectedByCpScheme);
                    haptics.success();
                    toast({
                      title: 'Details copied',
                      description: "Copied from 'Inspected By' section",
                    });
                  }
                }}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all touch-manipulation',
                  formData.sameAsInspectedBy
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-border/30 bg-card/30'
                )}
              >
                <Checkbox
                  checked={formData.sameAsInspectedBy || false}
                  className="h-5 w-5 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <span className="text-sm font-medium">Same person as Inspected By</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">
                    Name (Capitals) *
                  </Label>
                  <Input
                    value={formData.reportAuthorisedByName || ''}
                    onChange={(e) =>
                      onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())
                    }
                    placeholder="FULL NAME"
                    className="uppercase h-11 text-base touch-manipulation bg-card/50 border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Date *</Label>
                  <Input
                    type="date"
                    value={formData.reportAuthorisedByDate || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                    className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Signature *</Label>
                <SignatureInput
                  value={formData.reportAuthorisedBySignature || ''}
                  onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
                  placeholder="Signature of authorising person"
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">For/on behalf of</Label>
                  <Input
                    value={formData.reportAuthorisedByForOnBehalfOf || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                    placeholder="Company name"
                    className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Position</Label>
                  <Input
                    value={formData.reportAuthorisedByPosition || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByPosition', e.target.value)}
                    placeholder="Job title"
                    className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Address</Label>
                <textarea
                  className="w-full p-3 border border-border/30 bg-card/50 rounded-lg resize-none touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow/50"
                  style={{ fontSize: '16px' }}
                  rows={2}
                  value={formData.reportAuthorisedByAddress || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                  placeholder="Full address"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Membership No</Label>
                <Input
                  value={formData.reportAuthorisedByMembershipNo || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByMembershipNo', e.target.value)}
                  placeholder="Registration number"
                  className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Generate Certificate - Fixed Bottom Bar on Mobile */}
      <div
        className={cn(
          'border-y border-border/30 bg-card/50',
          isMobile ? 'p-4' : 'p-6 mx-4 rounded-xl border'
        )}
      >
        {/* Status Summary */}
        <div
          className={cn(
            'flex items-center gap-3 mb-4 p-3 rounded-lg',
            formData.overallAssessment === 'satisfactory'
              ? 'bg-green-500/10 border border-green-500/20'
              : formData.overallAssessment === 'unsatisfactory'
                ? 'bg-red-500/10 border border-red-500/20'
                : 'bg-elec-yellow/10 border border-elec-yellow/20'
          )}
        >
          <div
            className={cn(
              'h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0',
              formData.overallAssessment === 'satisfactory'
                ? 'bg-green-500/20'
                : formData.overallAssessment === 'unsatisfactory'
                  ? 'bg-red-500/20'
                  : 'bg-elec-yellow/20'
            )}
          >
            {formData.overallAssessment === 'satisfactory' ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : formData.overallAssessment === 'unsatisfactory' ? (
              <XCircle className="h-5 w-5 text-red-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'font-semibold',
                formData.overallAssessment === 'satisfactory'
                  ? 'text-green-400'
                  : formData.overallAssessment === 'unsatisfactory'
                    ? 'text-red-400'
                    : 'text-elec-yellow'
              )}
            >
              {formData.overallAssessment === 'satisfactory' && 'Satisfactory'}
              {formData.overallAssessment === 'unsatisfactory' && 'Unsatisfactory'}
              {!formData.overallAssessment && 'Assessment Pending'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isFormComplete() ? 'Ready to generate certificate' : 'Complete all required fields'}
            </p>
          </div>
          {formData.certificateNumber && (
            <span className="text-xs font-mono text-muted-foreground hidden sm:block">
              {formData.certificateNumber}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full h-14 gap-3 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-bold text-base shadow-lg shadow-elec-yellow/20 transition-all duration-200 active:scale-95 touch-manipulation"
            onClick={() => {
              haptics.tap();
              handleGenerateCertificate();
            }}
            disabled={!isFormComplete() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileDown className="h-5 w-5" />
                Generate PDF Certificate
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 gap-2 bg-card/50 border-border/30 hover:bg-card transition-all duration-200 active:scale-95 touch-manipulation"
              onClick={() => {
                haptics.tap();
                setShowEmailDialog(true);
              }}
              disabled={!isFormComplete()}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              variant="outline"
              className="h-12 gap-2 bg-card/50 border-border/30 hover:bg-card transition-all duration-200 active:scale-95 touch-manipulation"
              onClick={() => {
                haptics.tap();
                handleSaveDraft();
              }}
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
          </div>

          {/* Quote & Invoice Buttons */}
          <Button
            variant="outline"
            className="w-full h-12 gap-2 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 transition-all duration-200 active:scale-95 touch-manipulation"
            onClick={() => {
              haptics.tap();
              setShowQuoteOptions(true);
            }}
          >
            <FileText className="h-4 w-4" />
            Quote
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400 transition-all duration-200 active:scale-95 touch-manipulation"
              onClick={handleCreateInvoice}
            >
              <Receipt className="h-4 w-4" />
              Invoice
            </Button>
            <WhatsAppShareButton
              type="eicr"
              id={effectiveReportId || 'new'}
              recipientPhone={formData.clientPhone || formData.clientTelephone || ''}
              recipientName={formData.clientName || ''}
              documentLabel={`EICR ${formData.certificateNumber || ''}`}
              className="h-12"
            />
          </div>

          {!isFormComplete() && (
            <p className="text-xs text-amber-300/70 flex items-center justify-center gap-2 pt-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              Complete all required fields
            </p>
          )}
        </div>
      </div>

      {/* JSON Data Viewer - Hidden on Mobile */}
      <div className={cn('hidden sm:block', isMobile ? 'px-4' : '')}>
        <Collapsible open={isJsonOpen} onOpenChange={handleToggleJsonPreview}>
          <CollapsibleTrigger className="w-full" asChild>
            <button
              onClick={() => haptics.tap()}
              className={cn(
                'w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors',
                'bg-card/30 border-y border-border/30',
                'active:bg-card/50'
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-gray-500/20 flex items-center justify-center flex-shrink-0">
                <Code className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Developer Tools</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Raw JSON Data (
                  {formattedJsonPreview
                    ? `${Math.round(formattedJsonPreview.length / 1024)}KB`
                    : '...'}
                  )
                </p>
              </div>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform duration-200',
                  isJsonOpen && 'rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('p-4 bg-card/30', isMobile ? '' : 'px-6')}>
              <div className="flex justify-end mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyJson}
                  className="h-9 gap-2 border-elec-yellow/30 hover:bg-elec-yellow/10 touch-manipulation"
                >
                  <Copy className="h-4 w-4" />
                  Copy JSON
                </Button>
              </div>
              <div className="bg-background/50 rounded-xl border border-border/50 overflow-hidden">
                <div className="bg-card/50 px-4 py-2 border-b border-border/50 flex items-center justify-between">
                  <span className="text-xs font-mono text-elec-yellow">form_data.json</span>
                  <span className="text-xs text-muted-foreground">Formatted EICR Data</span>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs font-mono text-neutral-300 whitespace-pre-wrap break-words leading-relaxed">
                    {formattedJsonPreview || 'Loading...'}
                  </pre>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* PDF Generation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generating EICR Certificate</DialogTitle>
            <DialogDescription>
              {isGenerating && !pdfUrl && !generationError && (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating your professional EICR certificate...</span>
                </div>
              )}
              {pdfUrl && (
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Certificate generated successfully!</span>
                  </div>
                  <Button
                    className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    onClick={async () => {
                      if (pdfUrl) {
                        try {
                          const filename = `${formData.metadata?.certificate_number || formData.certificateNumber || 'certificate'}.pdf`;
                          await openOrDownloadPdf(pdfUrl, filename);

                          setShowDialog(false);

                          toast({
                            title: 'Certificate Completed',
                            description: 'Your EICR certificate has been marked as completed.',
                          });
                        } catch (error) {
                          console.error('Download error:', error);
                          toast({
                            title: 'Download Failed',
                            description: 'Please try again or check your internet connection.',
                            variant: 'destructive',
                          });
                        }
                      }
                    }}
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              )}
              {generationError && (
                <div className="space-y-2 py-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Cloud generation failed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Attempting local generation as fallback...
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Save Customer Dialog */}
      <CreateCustomerDialog
        open={showCustomerDialog}
        onOpenChange={setShowCustomerDialog}
        onConfirm={handleSaveCustomer}
        prefillData={{
          name: formData.clientName || '',
          email: formData.clientEmail || '',
          phone: formData.clientPhone || '',
          address: formData.installationAddress || '',
        }}
      />

      {/* Email Certificate Dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="EICR"
        certificateNumber={formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.installationAddress}
        inspectionDate={formData.inspectionDate}
        overallAssessment={formData.overallAssessment}
        companyName={formData.companyName}
        onSend={handleSendEmail}
        isLoading={isEmailSending}
      />

      {/* Quote Options Sheet */}
      <QuoteOptionsSheet
        open={showQuoteOptions}
        onOpenChange={setShowQuoteOptions}
        onAIEstimate={handleAIEstimate}
        onSendToQuote={handleSendToQuote}
      />

      {/* AI Estimator Sheet */}
      <AIEstimatorSheet
        open={showEstimatorSheet}
        onOpenChange={(open) => {
          if (!open) cancel();
          setShowEstimatorSheet(open);
        }}
        isEstimating={isEstimating}
        progressStep={progressStep}
        elapsedSeconds={elapsedSeconds}
        estimateResult={estimateResult}
        onUpdateItem={handleUpdateEstimateItem}
        onDeleteItem={handleDeleteEstimateItem}
        onUpdateScopeOfWorks={handleUpdateScopeOfWorks}
        onCreateQuote={handleEstimateToQuote}
        onCancel={() => {
          cancel();
          setShowEstimatorSheet(false);
        }}
      />
    </div>
  );
};

export default EICRSummary;

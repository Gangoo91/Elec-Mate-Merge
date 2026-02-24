/**
 * PATTestingCertificate.tsx
 * PAT Testing Certificate (IET Code of Practice)
 * Portable Appliance Test Register/Log
 *
 * Features:
 * - 3-tier auto-save: localStorage 10s → cloud 30s → beforeunload emergency
 * - Email certificate via Resend
 * - PDF generation via PDF Monkey
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Plug,
  Save,
  Download,
  Loader2,
  Mail,
  Cloud,
  CloudOff,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';
import { supabase } from '@/integrations/supabase/client';

import PATTestingFormTabs from '@/components/inspection/pat-testing/PATTestingFormTabs';
import { usePATTestingTabs } from '@/hooks/usePATTestingTabs';
import { getDefaultPATTestingFormData, Appliance } from '@/types/pat-testing';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { formatPATTestingJson } from '@/utils/patTestingJsonFormatter';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';

// ─── Constants ───────────────────────────────────────────────────────────────
const REPORT_TYPE = 'pat-testing';
const AUTO_SAVE_INTERVAL = 10000; // 10 seconds to localStorage
const CLOUD_SYNC_DEBOUNCE = 30000; // 30 seconds to cloud

export default function PATTestingCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;

  // ─── State ───────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(getDefaultPATTestingFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );
  const [syncStatus, setSyncStatus] = useState<
    'idle' | 'pending' | 'syncing' | 'synced' | 'error' | 'offline'
  >('idle');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userId, setUserId] = useState<string | null>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Per-appliance test sheet state
  const [activeApplianceId, setActiveApplianceId] = useState<string | null>(null);
  const [copiedApplianceData, setCopiedApplianceData] = useState<Partial<Appliance> | null>(null);

  // ─── Refs ────────────────────────────────────────────────────────────────
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cloudSyncTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedDataRef = useRef<string>('');
  const hasUnsavedChangesRef = useRef(false);

  // Hooks for tabs
  const tabProps = usePATTestingTabs(formData);

  // Company profile for branding
  const { companyProfile } = useCompanyProfile();

  // Check if company branding is available
  const hasSavedCompanyBranding = !!(
    companyProfile?.company_name ||
    companyProfile?.logo_url ||
    companyProfile?.logo_data_url
  );

  // ─── Email hook ──────────────────────────────────────────────────────────
  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'pat-testing',
    reportId: savedReportId || '',
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.siteAddress,
    inspectionDate: formData.testDate,
    companyName: companyProfile?.company_name,
  });

  // ─── Online/Offline tracking ────────────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (hasUnsavedChangesRef.current) {
        setSyncStatus('pending');
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ─── Auth setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  // ─── Load company branding for PDF ──────────────────────────────────────
  const loadCompanyBranding = useCallback(() => {
    if (!companyProfile) return null;

    const fullAddress = companyProfile.company_postcode
      ? `${companyProfile.company_address || ''}, ${companyProfile.company_postcode}`
      : companyProfile.company_address || '';

    return {
      companyLogo: companyProfile.logo_data_url || companyProfile.logo_url || '',
      companyName: companyProfile.company_name || '',
      companyAddress: fullAddress,
      companyPhone: companyProfile.company_phone || '',
      companyEmail: companyProfile.company_email || '',
      companyAccentColor: companyProfile.primary_color || '#3b82f6',
      registrationSchemeLogo: companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
    };
  }, [companyProfile]);

  // ─── Load existing report ───────────────────────────────────────────────
  useEffect(() => {
    const loadReport = async () => {
      if (!isNew && id) {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          // Check for local draft first
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          const report = await reportCloud.getReportByReportId(id, user.id);

          if (localDraft && report) {
            // Compare timestamps — use whichever is newer
            const isLocalNewer = draftStorage.isLocalDraftNewer(REPORT_TYPE, id, report.updated_at);

            if (isLocalNewer) {
              console.log('[PAT] Loading from local draft (newer than cloud)');
              setFormData({ ...getDefaultPATTestingFormData(), ...localDraft.data });
            } else {
              console.log('[PAT] Loading from cloud (newer than local)');
              setFormData({ ...getDefaultPATTestingFormData(), ...report.data });
            }
          } else if (report && report.data) {
            console.log('[PAT] Loading from cloud');
            setFormData({ ...getDefaultPATTestingFormData(), ...report.data });
          } else if (localDraft) {
            console.log('[PAT] Loading from local draft (no cloud data)');
            setFormData({ ...getDefaultPATTestingFormData(), ...localDraft.data });
          }

          // Set the initial sync baseline
          lastSavedDataRef.current = JSON.stringify(formData);
        } catch (error) {
          console.error('Failed to load report:', error);

          // Try local draft as fallback
          const localDraft = draftStorage.loadDraft(REPORT_TYPE, id);
          if (localDraft) {
            console.log('[PAT] Loading from local draft (cloud failed)');
            setFormData({ ...getDefaultPATTestingFormData(), ...localDraft.data });
          } else {
            toast.error('Failed to load certificate');
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadReport();
  }, [id, isNew]);

  // ─── Save to localStorage (fast, synchronous) ──────────────────────────
  const saveToLocalStorage = useCallback(() => {
    const reportId = savedReportId || null;
    draftStorage.saveDraft(REPORT_TYPE, reportId, formData);
    console.log('[PAT] Saved to localStorage');
  }, [formData, savedReportId]);

  // ─── Sync to cloud (debounced, async) ───────────────────────────────────
  const syncToCloud = useCallback(async () => {
    if (!userId || !isOnline) {
      setSyncStatus(isOnline ? 'pending' : 'offline');
      return;
    }

    const currentData = JSON.stringify(formData);
    if (currentData === lastSavedDataRef.current) {
      return; // No changes to sync
    }

    setSyncStatus('syncing');
    try {
      const dataToSave = {
        ...formData,
        status: 'auto-draft',
        client_name: formData.clientName,
        installation_address: formData.siteAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(
          savedReportId,
          userId,
          dataToSave,
          undefined,
          true // isAutoSync
        );
        if (result.success) {
          lastSavedDataRef.current = currentData;
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          console.log('[PAT] Auto-synced to cloud');
        } else {
          setSyncStatus('error');
        }
      } else {
        const result = await reportCloud.createReport(
          userId,
          'pat-testing',
          dataToSave,
          undefined,
          true // isAutoSync
        );
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          lastSavedDataRef.current = currentData;
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          window.history.replaceState(
            null,
            '',
            `/electrician/inspection-testing/pat-testing/${result.reportId}`
          );
          console.log('[PAT] Auto-created in cloud:', result.reportId);
        } else {
          setSyncStatus('error');
        }
      }
    } catch (error) {
      console.error('[PAT] Cloud sync failed:', error);
      setSyncStatus('error');
    }
  }, [formData, savedReportId, userId, isOnline]);

  // ─── Auto-save effect (localStorage every 10s) ─────────────────────────
  useEffect(() => {
    autoSaveTimerRef.current = setInterval(() => {
      if (hasUnsavedChangesRef.current) {
        saveToLocalStorage();
      }
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [saveToLocalStorage]);

  // ─── Cloud sync effect (30s debounce after last change) ─────────────────
  useEffect(() => {
    if (cloudSyncTimerRef.current) {
      clearTimeout(cloudSyncTimerRef.current);
    }

    if (hasUnsavedChangesRef.current && isOnline) {
      cloudSyncTimerRef.current = setTimeout(() => {
        syncToCloud();
      }, CLOUD_SYNC_DEBOUNCE);
    }

    return () => {
      if (cloudSyncTimerRef.current) {
        clearTimeout(cloudSyncTimerRef.current);
      }
    };
  }, [formData, syncToCloud, isOnline]);

  // ─── Emergency save on page unload ──────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formData && (formData.clientName || formData.siteAddress)) {
        draftStorage.saveDraft(REPORT_TYPE, savedReportId, formData);
        console.log('[PAT] Emergency save on beforeunload');
      }

      if (hasUnsavedChangesRef.current && syncStatus !== 'synced') {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, savedReportId, syncStatus]);

  // ─── Update form field ──────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = useCallback((field: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    hasUnsavedChangesRef.current = true;
    setSyncStatus('pending');
  }, []);

  // ─── Manual save draft ──────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      if (!userId) {
        toast.error('Please sign in to save');
        return;
      }

      const dataToSave = {
        ...formData,
        status: 'draft',
        client_name: formData.clientName,
        installation_address: formData.siteAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(savedReportId, userId, dataToSave);
        if (result.success) {
          lastSavedDataRef.current = JSON.stringify(formData);
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          draftStorage.clearDraft(REPORT_TYPE, savedReportId);
          toast.success('Draft saved');
        } else {
          throw new Error(result.error?.message || 'Failed to save');
        }
      } else {
        const result = await reportCloud.createReport(userId, 'pat-testing', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          lastSavedDataRef.current = JSON.stringify(formData);
          hasUnsavedChangesRef.current = false;
          setSyncStatus('synced');
          draftStorage.clearDraft(REPORT_TYPE, null);
          toast.success('Draft saved');
          window.history.replaceState(
            null,
            '',
            `/electrician/inspection-testing/pat-testing/${result.reportId}`
          );
        } else {
          throw new Error(result.error?.message || 'Failed to create report');
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Generate certificate PDF ───────────────────────────────────────────
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      await handleSaveDraft();

      // Get company branding
      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;

      // Prepare PDF data using dedicated formatter
      const pdfData = formatPATTestingJson(formData, {
        companyLogo: branding?.companyLogo,
        companyName: branding?.companyName,
        companyAddress: branding?.companyAddress,
        companyPhone: branding?.companyPhone,
        companyEmail: branding?.companyEmail,
        companyAccentColor: branding?.companyAccentColor,
        registrationScheme: branding?.registrationScheme,
        registrationNumber: branding?.registrationNumber,
        registrationSchemeLogo: branding?.registrationSchemeLogo,
      });

      // Debug log — helps diagnose empty PDF issues
      console.log('[PAT] PDF payload keys:', Object.keys(pdfData));
      console.log('[PAT] Client details:', pdfData.client_details);
      console.log('[PAT] Appliances count:', pdfData.appliances?.length);
      console.log('[PAT] Summary:', pdfData.summary);

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-pat-testing-pdf',
        {
          body: { formData: pdfData },
        }
      );

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      // Download the PDF
      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'PAT',
        formData.certificateNumber || 'PAT',
        formData.clientName || 'Client',
        formData.testDate || new Date()
      );

      const response = await fetch(functionData.pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      toast.success('Certificate generated and downloaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── Email handler ──────────────────────────────────────────────────────
  const handleSendEmail = async (email: string, cc?: string[], message?: string) => {
    try {
      // Ensure report is saved before emailing
      await handleSaveDraft();

      await sendCertificateEmail({
        recipientEmail: email,
        cc,
        customMessage: message,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send email');
      throw error;
    }
  };

  // ─── Navigate to quote builder ──────────────────────────────────────────
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.siteAddress || '',
      certificateType: 'PAT Testing',
      certificateReference: formData.certificateNumber || '',
    });
    navigate(url);
  };

  // ─── Navigate to invoice builder ────────────────────────────────────────
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.siteAddress || '',
      certificateType: 'PAT Testing',
      certificateReference: formData.certificateNumber || '',
    });
    navigate(url);
  };

  // ─── Sync status indicator ──────────────────────────────────────────────
  const SyncIndicator = () => {
    if (syncStatus === 'synced') return <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />;
    if (syncStatus === 'syncing')
      return <Cloud className="h-3.5 w-3.5 text-blue-400 animate-pulse" />;
    if (syncStatus === 'error') return <AlertCircle className="h-3.5 w-3.5 text-red-400" />;
    if (syncStatus === 'offline') return <CloudOff className="h-3.5 w-3.5 text-white" />;
    if (syncStatus === 'pending') return <Cloud className="h-3.5 w-3.5 text-white" />;
    return null;
  };

  // ─── Loading state ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-12 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Mobile-First Header */}
      <div className="bg-[#242428] border-b border-blue-500/20 sticky top-0 z-10">
        <div className="px-4 py-3">
          {/* Top Row - Back & Actions */}
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white hover:bg-white/10 -ml-2 h-9 px-2 touch-manipulation"
              onClick={() => navigate('/electrician/inspection-testing')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <SyncIndicator />
                <Badge className="bg-blue-500/20 text-blue-400 border-0 text-[10px] px-2 py-0.5 font-semibold">
                  {syncStatus === 'synced' ? 'Saved' : 'Draft'}
                </Badge>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmailDialog(true)}
                disabled={!savedReportId}
                className="h-9 w-9 text-white hover:text-white hover:bg-white/10 touch-manipulation"
              >
                <Mail className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="h-9 w-9 text-white hover:text-white hover:bg-white/10 touch-manipulation"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>

              <Button
                size="sm"
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
                className="bg-blue-500 hover:bg-blue-600 text-white h-9 px-3 font-semibold rounded-lg touch-manipulation"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Title Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <Plug className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {isNew ? 'New PAT Testing' : 'PAT Testing'}
              </h1>
              <h1 className="text-base font-bold text-white -mt-0.5">Certificate</h1>
              <p className="text-[11px] text-white">IET Code of Practice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      <main className="py-4 pb-4 sm:px-4 sm:pb-8">
        <PATTestingFormTabs
          currentTab={tabProps.currentTab}
          onTabChange={tabProps.setCurrentTab}
          canAccessTab={tabProps.canAccessTab}
          formData={formData}
          onUpdate={handleUpdate}
          tabNavigationProps={{
            currentTab: tabProps.currentTab,
            currentTabIndex: tabProps.currentTabIndex,
            totalTabs: tabProps.tabs.length,
            canNavigateNext: tabProps.canNavigateNext,
            canNavigatePrevious: tabProps.canNavigatePrevious,
            navigateNext: tabProps.navigateNext,
            navigatePrevious: tabProps.navigatePrevious,
            getProgressPercentage: tabProps.getProgressPercentage,
            isCurrentTabComplete: tabProps.isCurrentTabComplete,
            onGenerateCertificate: handleGenerateCertificate,
            canGenerateCertificate: !isGenerating,
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
          activeApplianceId={activeApplianceId}
          onOpenAppliance={setActiveApplianceId}
          onCloseAppliance={() => setActiveApplianceId(null)}
          copiedApplianceData={copiedApplianceData}
          onCopyApplianceData={setCopiedApplianceData}
        />
      </main>

      {/* Email Certificate Dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="PAT Testing"
        certificateNumber={formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.siteAddress}
        inspectionDate={formData.testDate}
        companyName={companyProfile?.company_name}
        onSend={handleSendEmail}
        isLoading={isEmailSending}
      />
    </div>
  );
}

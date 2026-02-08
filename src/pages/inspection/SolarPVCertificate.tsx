/**
 * SolarPVCertificate.tsx
 * Solar PV Installation Certificate (MCS Compliance)
 * For MCS-certified solar PV installations per BS EN 62446 + BS 7671
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Sun,
  Save,
  Download,
  Loader2,
  FileText,
  Receipt,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { createQuoteFromCertificate, createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { supabase } from '@/integrations/supabase/client';
import { formatSolarPVJson } from '@/utils/solarPVJsonFormatter';

import SolarPVFormTabs from '@/components/inspection/solar-pv/SolarPVFormTabs';
import { useSolarPVTabs, SolarPVTabValue } from '@/hooks/useSolarPVTabs';
import { getDefaultSolarPVFormData, SolarPVFormData } from '@/types/solar-pv';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

export default function SolarPVCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<SolarPVFormData>(getDefaultSolarPVFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(id !== 'new' ? id || null : null);

  // Hooks for tabs
  const tabProps = useSolarPVTabs(formData);

  // Company profile for branding
  const { companyProfile } = useCompanyProfile();

  // Check if company branding is available
  const hasSavedCompanyBranding = !!(companyProfile?.company_name || companyProfile?.logo_url || companyProfile?.logo_data_url);

  // Load company branding for PDF
  const loadCompanyBranding = () => {
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
      companyAccentColor: companyProfile.primary_color || '#f59e0b',
      registrationSchemeLogo: companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || ''
    };
  };

  // Load existing report
  useEffect(() => {
    const loadReport = async () => {
      if (!isNew && id) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const report = await reportCloud.getReport(id, user.id);
          if (report && report.data) {
            setFormData({ ...getDefaultSolarPVFormData(), ...report.data });
          }
        } catch (error) {
          console.error('Failed to load report:', error);
          toast.error('Failed to load certificate');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadReport();
  }, [id, isNew]);

  // Update form field
  const handleUpdate = (field: string, value: any) => {
    setFormData((prev: SolarPVFormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save draft
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to save');
        return;
      }

      const dataToSave = {
        ...formData,
        status: 'draft',
        client_name: formData.clientName,
        installation_address: formData.installationAddress || formData.clientAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(savedReportId, user.id, dataToSave);
        if (result.success) {
          toast.success('Draft saved');
        } else {
          throw new Error(result.error?.message || 'Failed to save');
        }
      } else {
        const result = await reportCloud.createReport(user.id, 'solar-pv', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          toast.success('Draft saved');
          window.history.replaceState(null, '', `/electrician/inspection-testing/solar-pv/${result.reportId}`);
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

  // Generate certificate PDF
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      await handleSaveDraft();

      // Generate certificate number if not set
      let dataWithCertNumber = {
        ...formData,
        certificateNumber: formData.certificateNumber || `SPV-${Date.now()}`,
      };

      // Merge company branding from Business Settings if available
      if (hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          dataWithCertNumber = {
            ...dataWithCertNumber,
            companyLogo: branding.companyLogo || dataWithCertNumber.companyLogo,
            companyName: branding.companyName || dataWithCertNumber.companyName || dataWithCertNumber.installerCompany,
            companyAddress: branding.companyAddress || dataWithCertNumber.companyAddress,
            companyPhone: branding.companyPhone || dataWithCertNumber.companyPhone,
            companyEmail: branding.companyEmail || dataWithCertNumber.companyEmail,
            accentColor: branding.companyAccentColor || dataWithCertNumber.accentColor,
            registrationSchemeLogo: branding.registrationSchemeLogo || dataWithCertNumber.registrationSchemeLogo,
            registrationScheme: branding.registrationScheme || dataWithCertNumber.registrationScheme,
          };
        }
      }

      // Format data for PDF generation using MCS compliant formatter
      const pdfData = formatSolarPVJson(dataWithCertNumber);

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-solar-pv-pdf', {
        body: { formData: pdfData },
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      // Download the PDF
      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'SolarPV',
        formData.certificateNumber || 'SPV',
        formData.clientName || 'Client',
        formData.commissioningDate || new Date()
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

  // Navigate to quote builder
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || formData.clientAddress || '',
      certificateType: 'Solar PV',
      certificateReference: formData.certificateNumber || '',
    });
    navigate(url);
  };

  // Navigate to invoice builder
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || formData.clientAddress || '',
      certificateType: 'Solar PV',
      certificateReference: formData.certificateNumber || '',
    });
    navigate(url);
  };

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
      <div className="bg-[#242428] border-b border-amber-500/20 sticky top-0 z-10">
        <div className="px-4 py-3">
          {/* Top Row - Back & Actions */}
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 -ml-2 h-9 px-2"
              onClick={() => navigate('/electrician/inspection-testing')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[10px] px-2 py-0.5 font-semibold">
                Draft
              </Badge>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="h-9 w-9 text-white/60 hover:text-white hover:bg-white/10"
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
                className="bg-amber-500 hover:bg-amber-600 text-black h-9 px-3 font-semibold rounded-lg"
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Sun className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {isNew ? 'New Solar PV' : 'Solar PV'}
              </h1>
              <h1 className="text-base font-bold text-white -mt-0.5">Installation Certificate</h1>
              <p className="text-[11px] text-white/50">
                MCS Compliance • BS EN 62446
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      <main className="py-4 pb-4 sm:px-4 sm:pb-8">
        <SolarPVFormTabs
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
        />
      </main>
    </div>
  );
}

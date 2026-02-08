/**
 * PATTestingCertificate.tsx
 * PAT Testing Certificate (IET Code of Practice)
 * Portable Appliance Test Register/Log
 */

import { useState, useEffect } from 'react';
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
  FileText,
  Receipt,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { createQuoteFromCertificate, createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { supabase } from '@/integrations/supabase/client';

import PATTestingFormTabs from '@/components/inspection/pat-testing/PATTestingFormTabs';
import { usePATTestingTabs, PATTestingTabValue } from '@/hooks/usePATTestingTabs';
import { getDefaultPATTestingFormData } from '@/types/pat-testing';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

export default function PATTestingCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<any>(getDefaultPATTestingFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(id !== 'new' ? id || null : null);

  // Hooks for tabs
  const tabProps = usePATTestingTabs(formData);

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
      companyAccentColor: companyProfile.primary_color || '#3b82f6',
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
            setFormData({ ...getDefaultPATTestingFormData(), ...report.data });
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
    setFormData((prev: any) => ({
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
        installation_address: formData.siteAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(savedReportId, user.id, dataToSave);
        if (result.success) {
          toast.success('Draft saved');
        } else {
          throw new Error(result.error?.message || 'Failed to save');
        }
      } else {
        const result = await reportCloud.createReport(user.id, 'pat-testing', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          toast.success('Draft saved');
          window.history.replaceState(null, '', `/electrician/inspection-testing/pat-testing/${result.reportId}`);
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

      // Get company branding
      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;

      // Prepare PDF data
      const pdfData = {
        metadata: {
          certificate_number: formData.certificateNumber || `PAT-${Date.now()}`,
          test_date: formData.testDate,
          report_reference: formData.reportReference || '',
        },
        client_details: {
          client_name: formData.clientName || '',
          client_address: formData.clientAddress || '',
          client_phone: formData.clientTelephone || '',
          client_email: formData.clientEmail || '',
          contact_person: formData.contactPerson || '',
        },
        site_details: {
          site_name: formData.siteName || '',
          site_address: formData.siteAddress || '',
          site_contact_name: formData.siteContactName || '',
          site_contact_phone: formData.siteContactPhone || '',
        },
        test_equipment: {
          make: formData.testEquipment?.make || '',
          model: formData.testEquipment?.model || '',
          serial_number: formData.testEquipment?.serialNumber || '',
          last_calibration: formData.testEquipment?.lastCalibrationDate || '',
          next_calibration: formData.testEquipment?.nextCalibrationDue || '',
        },
        appliances: (formData.appliances || []).map((app: any) => ({
          asset_number: app.assetNumber || '',
          description: app.description || '',
          make: app.make || '',
          model: app.model || '',
          serial_number: app.serialNumber || '',
          location: app.location || '',
          appliance_class: app.applianceClass || 'I',
          category: app.category || 'portable',
          visual_inspection: app.visualInspection || {},
          electrical_tests: app.electricalTests || {},
          overall_result: app.overallResult || '',
          next_test_due: app.nextTestDue || '',
          notes: app.notes || '',
        })),
        summary: {
          total_tested: formData.totalAppliancesTested || 0,
          total_passed: formData.totalPassed || 0,
          total_failed: formData.totalFailed || 0,
        },
        failed_appliances: formData.failedAppliances || [],
        recommendations: formData.recommendations || '',
        retest_interval: formData.suggestedRetestInterval || '12',
        next_test_due: formData.nextTestDue || '',
        declarations: {
          tester: {
            name: formData.testerName || '',
            company: formData.testerCompany || '',
            qualifications: formData.testerQualifications || '',
            signature: formData.testerSignature || '',
            date: formData.testerDate || '',
          },
        },
        additional_notes: formData.additionalNotes || '',
        // Company branding for PDF
        company_logo: branding?.companyLogo || formData.companyLogo || '',
        company_name: branding?.companyName || formData.testerCompany || '',
        company_address: branding?.companyAddress || '',
        company_phone: branding?.companyPhone || '',
        company_email: branding?.companyEmail || '',
        registration_scheme_logo: branding?.registrationSchemeLogo || '',
        registration_scheme: branding?.registrationScheme || '',
      };

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-pat-testing-pdf', {
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

  // Navigate to quote builder
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

  // Navigate to invoice builder
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
              className="text-white/60 hover:text-white hover:bg-white/10 -ml-2 h-9 px-2"
              onClick={() => navigate('/electrician/inspection-testing')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-0 text-[10px] px-2 py-0.5 font-semibold">
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
                className="bg-blue-500 hover:bg-blue-600 text-white h-9 px-3 font-semibold rounded-lg"
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
              <p className="text-[11px] text-white/50">
                IET Code of Practice
              </p>
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
        />
      </main>
    </div>
  );
}

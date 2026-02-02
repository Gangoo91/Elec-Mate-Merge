/**
 * FireAlarmCertificate.tsx
 * Fire Alarm System Certificate (BS 5839)
 * For installation, commissioning, and periodic testing
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Bell,
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
import { formatFireAlarmJson } from '@/utils/fireAlarmJsonFormatter';

import FireAlarmFormTabs from '@/components/inspection/fire-alarm/FireAlarmFormTabs';
import { useFireAlarmTabs, FireAlarmTabValue } from '@/hooks/useFireAlarmTabs';
import { getDefaultFireAlarmFormData } from '@/types/fire-alarm';

export default function FireAlarmCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<any>(getDefaultFireAlarmFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(id !== 'new' ? id || null : null);

  // Hooks for tabs
  const tabProps = useFireAlarmTabs(formData);

  // Load existing report
  useEffect(() => {
    const loadReport = async () => {
      if (!isNew && id) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const report = await reportCloud.getReport(id, user.id);
          if (report && report.data) {
            setFormData({ ...getDefaultFireAlarmFormData(), ...report.data });
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
        installation_address: formData.premisesAddress,
      };

      if (savedReportId) {
        const result = await reportCloud.updateReport(savedReportId, user.id, dataToSave);
        if (result.success) {
          toast.success('Draft saved');
        } else {
          throw new Error(result.error?.message || 'Failed to save');
        }
      } else {
        const result = await reportCloud.createReport(user.id, 'fire-alarm', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          toast.success('Draft saved');
          window.history.replaceState(null, '', `/electrician/inspection-testing/fire-alarm/${result.reportId}`);
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

      // Format data for PDF generation using BS 5839 compliant formatter
      const pdfData = formatFireAlarmJson(formData);

      // Call edge function
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-fire-alarm-pdf', {
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
        'FireAlarm',
        formData.certificateNumber || 'FA',
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
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Fire Alarm',
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
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Fire Alarm',
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
      <div className="bg-[#242428] border-b border-elec-yellow/20 sticky top-0 z-10">
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
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 text-[10px] px-2 py-0.5 font-semibold">
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
                className="bg-red-500 hover:bg-red-600 text-white h-9 px-3 font-semibold rounded-lg"
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
            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
              <Bell className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">
                {isNew ? 'New Fire Alarm' : 'Fire Alarm'}
              </h1>
              <h1 className="text-base font-bold text-white -mt-0.5">Certificate</h1>
              <p className="text-[11px] text-white/50">
                BS 5839 Compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Edge-to-edge on mobile, padded on desktop */}
      <main className="py-4 pb-4 sm:px-4 sm:pb-8">
        <FireAlarmFormTabs
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

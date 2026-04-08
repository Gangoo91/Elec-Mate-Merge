/**
 * EICCertificate.tsx
 * Electrical Installation Certificate form page
 * Supports pre-population from Circuit Designer via designId query param
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Zap,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useDesignedCircuit, useUpdateDesignedCircuitStatus } from '@/hooks/useDesignedCircuits';
import { toast } from 'sonner';
import { reportCloud } from '@/utils/reportCloud';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';

// Import EIC form components
import EICFormHeader from '@/components/inspection/eic/EICFormHeader';
import EICFormTabs from '@/components/inspection/eic/EICFormTabs';
import { useEICTabs } from '@/hooks/useEICTabs';
import { useEICObservations } from '@/hooks/useEICObservations';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';

// Default empty form data
const getDefaultFormData = () => ({
  // Client details
  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',

  // Installation details
  installationAddress: '',
  occupier: '',
  description: '',
  purposeOfReport: 'new-installation',

  // Supply characteristics
  supplyVoltage: 230,
  supplyPhases: 'single',
  earthingSystem: 'TN-C-S',
  ze: '',
  prospectiveFaultCurrent: '',

  // Circuit schedule
  scheduleOfTests: [],

  // Distribution boards (multi-board support)
  distributionBoards: [],

  // Inspections
  scheduleOfInspections: {},

  // Declarations
  designerDeclaration: {},
  installerDeclaration: {},
  inspectorDeclaration: {},

  // Metadata
  designSourceId: null,
  designSourceDate: null,
});

export default function EICCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const designId = searchParams.get('designId');

  const isNew = id === 'new' || !id;

  // State
  const [formData, setFormData] = useState<any>(getDefaultFormData());
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('EIC-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [hasLoadedDesign, setHasLoadedDesign] = useState(false);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    id !== 'new' ? id || null : null
  );

  // Hooks for tabs and observations
  const tabProps = useEICTabs(formData);
  const observationsProps = useEICObservations([]);

  // Company profile for branding
  const { companyProfile } = useCompanyProfile();

  // Track certificate opened
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'certificate_opened', { type: 'eic' });
    });
  }, []);

  // Load existing certificate data when opening a saved cert
  useEffect(() => {
    if (isNew || !id) return;
    const loadSavedCert = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const reportData = await reportCloud.getReportData(id, user.id);
        if (reportData) {
          setFormData((prev: any) => ({ ...getDefaultFormData(), ...prev, ...(reportData as any) }));
          setSavedReportId(id);
        }
      } catch (err) {
        console.error('[EIC] Failed to load saved certificate:', err);
      }
    };
    loadSavedCert();
  }, [id, isNew]);

  // Check if company branding is available
  const hasSavedCompanyBranding = !!(
    companyProfile?.company_name ||
    companyProfile?.logo_url ||
    companyProfile?.logo_data_url
  );

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
      companyAccentColor: companyProfile.primary_color || '#22c55e',
      registrationSchemeLogo: companyProfile.registration_scheme_logo || '',
      registrationScheme: companyProfile.registration_scheme || '',
    };
  };

  // Fetch design data if designId is provided
  const {
    data: designData,
    isLoading: isLoadingDesign,
    error: designError,
  } = useDesignedCircuit(designId || '');
  const updateDesignStatus = useUpdateDesignedCircuitStatus();

  // Pre-populate form from design data
  useEffect(() => {
    if (designData && !hasLoadedDesign) {
      const scheduleData = designData.schedule_data;

      // Transform design circuits to test results format
      const transformedCircuits =
        scheduleData.circuits?.map((circuit: any, idx: number) => ({
          id: `design-${idx + 1}`,
          circuitDesignation: `C${idx + 1}`,
          circuitNumber: circuit.circuitNumber || (idx + 1).toString(),
          circuitDescription: circuit.circuitDescription || '',
          phaseType: circuit.phaseType || 'single-phase',
          referenceMethod: circuit.referenceMethod || '',
          pointsServed: circuit.pointsServed || '',
          liveSize: circuit.liveSize || '',
          cpcSize: circuit.cpcSize || '',
          bsStandard: circuit.bsStandard || 'BS EN 60898',
          protectiveDeviceType: circuit.protectiveDeviceType || 'MCB',
          protectiveDeviceCurve: circuit.protectiveDeviceCurve || 'B',
          protectiveDeviceRating: circuit.protectiveDeviceRating || '',
          protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '6',
          // Expected values from design
          expectedR1R2: circuit.r1r2 || '',
          expectedZs: circuit.zs || '',
          expectedMaxZs: circuit.maxZs || '',
          // Actual test values (to be filled on-site)
          r1r2: '',
          zs: '',
          maxZs: circuit.maxZs || '',
          insulationTestVoltage: circuit.insulationTestVoltage || '500V DC',
          insulationResistance: '',
          polarity: '',
          rcdRating: circuit.rcdRating || '',
          rcdOneX: '',
          rcdFiveX: '',
          pfc: '',
          functionalTesting: '',
        })) || [];

      // Pre-populate form data
      setFormData((prev: any) => ({
        ...prev,
        installationAddress: designData.installation_address || '',
        supplyVoltage: scheduleData.supply?.voltage || 230,
        supplyPhases: scheduleData.supply?.phases || 'single',
        earthingSystem: scheduleData.supply?.earthingSystem || 'TN-C-S',
        ze: scheduleData.supply?.ze?.toString() || '',
        prospectiveFaultCurrent: scheduleData.supply?.pscc
          ? (scheduleData.supply.pscc / 1000).toFixed(1)
          : '',
        scheduleOfTests: transformedCircuits,
        designSourceId: designId,
        designSourceDate: designData.created_at,
        // Copy project info
        clientName: scheduleData.projectInfo?.clientName || '',
        description: scheduleData.projectInfo?.projectName || '',
      }));

      setHasLoadedDesign(true);

      toast.success('Design loaded', {
        description: `${transformedCircuits.length} circuits pre-filled from Circuit Designer`,
      });

      // Update design status to 'in-progress'
      updateDesignStatus.mutate({ id: designId!, status: 'in-progress' });
    }
  }, [designData, hasLoadedDesign, designId]);

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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to save');
        return;
      }

      // Prepare data with status
      const dataToSave = {
        ...formData,
        status: 'draft',
      };

      if (savedReportId) {
        // Update existing report
        const result = await reportCloud.updateReport(savedReportId, user.id, dataToSave);
        if (result.success) {
          toast.success('Draft saved');
        } else {
          throw new Error(result.error?.message || 'Failed to save');
        }
      } else {
        // Create new report
        const result = await reportCloud.createReport(user.id, 'eic', dataToSave);
        if (result.success && result.reportId) {
          setSavedReportId(result.reportId);
          toast.success('Draft saved');
          // Update URL without full navigation
          window.history.replaceState(null, '', `/electrician/inspection/eic/${result.reportId}`);
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
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      // First save the current data
      await handleSaveDraft();

      // Get company branding
      const branding = hasSavedCompanyBranding ? loadCompanyBranding() : null;

      // Prepare PDF data
      const pdfData = {
        metadata: {
          certificate_number: formData.certificateNumber || `EIC-${Date.now()}`,
        },
        // Company branding for PDF
        company_logo: branding?.companyLogo || formData.companyLogo || '',
        company_name: branding?.companyName || '',
        company_address: branding?.companyAddress || '',
        company_phone: branding?.companyPhone || '',
        company_email: branding?.companyEmail || '',
        registration_scheme_logo: branding?.registrationSchemeLogo || '',
        registration_scheme: branding?.registrationScheme || '',
        client_details: {
          client_name: formData.clientName || '',
          client_address: formData.clientAddress || '',
          client_phone: formData.clientTelephone || '',
          client_email: formData.clientEmail || '',
        },
        installation_details: {
          address: formData.installationAddress || '',
          description: formData.description || '',
          installation_date: formData.installationDate || '',
        },
        supply_characteristics: {
          supply_voltage: formData.supplyVoltage || '',
          phases: formData.supplyPhases || '',
          earthing_arrangement: formData.earthingSystem || '',
          ze: formData.ze || '',
          pfc: formData.prospectiveFaultCurrent || '',
        },
        schedule_of_tests:
          formData.scheduleOfTests?.map((test: any) => ({
            circuit_number: test.circuitNumber || '',
            circuit_description: test.circuitDescription || '',
            protective_device_type: test.protectiveDeviceType || '',
            protective_device_rating: test.protectiveDeviceRating || '',
            r1r2: test.r1r2 || '',
            zs: test.zs || '',
            max_zs: test.maxZs || '',
            insulation_resistance: test.insulationResistance || '',
            polarity: test.polarity || '',
            rcd_one_x: test.rcdOneX || '',
            pfc: test.pfc || '',
          })) || [],
        declarations: {
          designer: formData.designerDeclaration || {},
          installer: formData.installerDeclaration || {},
          inspector: formData.inspectorDeclaration || {},
        },
      };

      // Call edge function to generate PDF
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-eic-pdf',
        {
          body: {
            formData: pdfData,
            templateId: 'B39538E9-8FF1-4882-BC13-70B1C0D30947',
          },
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
        'EIC',
        formData.certificateNumber || 'EIC',
        formData.clientName || 'Client',
        formData.installationDate || new Date()
      );

      setGeneratedPdfUrl(functionData.pdfUrl);
      setPdfFilename(filename);

      toast.success('Certificate generated successfully');

      // Mark design as completed if from Circuit Designer
      if (designId) {
        updateDesignStatus.mutate({ id: designId, status: 'completed' });
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate certificate';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Navigate to quote builder with client data pre-filled
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EIC',
      certificateReference: formData.certificateNumber || '',
    });
    navigate(url);
  };

  // Navigate to invoice builder with client data pre-filled
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EIC',
      certificateReference: formData.certificateNumber || '',
    });
    navigate(url);
  };

  // Loading state for design
  if (designId && isLoadingDesign) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
          <div className="text-center">
            <h3 className="text-sm font-semibold text-white">Loading Design</h3>
            <p className="text-xs text-white mt-1">Pre-filling circuits from Circuit Designer...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state for design
  if (designId && designError) {
    return (
      <div className="bg-background min-h-screen px-4 py-8">
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            Failed to load design. Please try again or start a new EIC.
          </AlertDescription>
        </Alert>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={() => navigate('/electrician/inspection-testing')}>
            Back
          </Button>
          <Button onClick={() => navigate('/electrician/inspection/eic/new')}>
            Start New EIC
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header — EICR pattern */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <EICFormHeader
            onBack={() => navigate('/electrician/inspection-testing')}
            isSaving={isSaving}
            onManualSave={handleSaveDraft}
            formData={formData}
          />
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Design Source Banner */}
      <AnimatePresence>
        {formData.designSourceId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-elec-yellow/20 bg-elec-yellow/5"
          >
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <span className="text-elec-yellow font-medium">Circuit Designer:</span>
                <span className="text-white text-xs">
                  {formData.scheduleOfTests?.length || 0} circuits pre-filled
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content — full-width mobile */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <EICFormTabs
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
            currentTabHasRequiredFields: true,
            onToggleComplete: () => {},
            onGenerateCertificate: handleGenerateCertificate,
            canGenerateCertificate: !isGenerating,
            whatsApp: {
              type: 'eic' as const,
              id: savedReportId || id || 'new',
              recipientPhone: formData.clientTelephone || '',
              recipientName: formData.clientName || '',
              documentLabel: 'EIC Certificate',
            },
          }}
          observationsProps={{
            observations: observationsProps.observations,
            reportId: id || 'new',
            onAddObservation: observationsProps.addObservation,
            onUpdateObservation: observationsProps.updateObservation,
            onRemoveObservation: observationsProps.removeObservation,
            onAutoCreateObservation: observationsProps.autoCreateObservation,
            onNavigateToObservations: () => tabProps.setCurrentTab('inspections'),
            onSyncToInspectionItem: (itemId: string, outcome: string) => {
              // Sync observation to inspection item
            },
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
        />
      </main>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Certificate"
      />
    </div>
  );
}

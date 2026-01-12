/**
 * EICCertificate.tsx
 * Electrical Installation Certificate form page
 * Supports pre-population from Circuit Designer via designId query param
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  FileText,
  Save,
  Download,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CircuitBoard
} from 'lucide-react';
import { useDesignedCircuit, useUpdateDesignedCircuitStatus } from '@/hooks/useDesignedCircuits';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Import EIC form components
import EICFormTabs from '@/components/inspection/eic/EICFormTabs';
import { useEICTabs, EICTabValue } from '@/hooks/useEICTabs';
import { useEICObservations, EICObservation } from '@/hooks/useEICObservations';

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

  // Inspections
  scheduleOfInspections: {},

  // Declarations
  designerDeclaration: {},
  installerDeclaration: {},
  inspectorDeclaration: {},

  // Metadata
  designSourceId: null,
  designSourceDate: null
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
  const [hasLoadedDesign, setHasLoadedDesign] = useState(false);

  // Hooks for tabs and observations
  const tabProps = useEICTabs(formData);
  const observationsProps = useEICObservations([]);

  // Fetch design data if designId is provided
  const { data: designData, isLoading: isLoadingDesign, error: designError } = useDesignedCircuit(designId || '');
  const updateDesignStatus = useUpdateDesignedCircuitStatus();

  // Pre-populate form from design data
  useEffect(() => {
    if (designData && !hasLoadedDesign) {
      const scheduleData = designData.schedule_data;

      // Transform design circuits to test results format
      const transformedCircuits = scheduleData.circuits?.map((circuit: any, idx: number) => ({
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
        functionalTesting: ''
      })) || [];

      // Pre-populate form data
      setFormData((prev: any) => ({
        ...prev,
        installationAddress: designData.installation_address || '',
        supplyVoltage: scheduleData.supply?.voltage || 230,
        supplyPhases: scheduleData.supply?.phases || 'single',
        earthingSystem: scheduleData.supply?.earthingSystem || 'TN-C-S',
        ze: scheduleData.supply?.ze?.toString() || '',
        prospectiveFaultCurrent: scheduleData.supply?.pscc ? (scheduleData.supply.pscc / 1000).toFixed(1) : '',
        scheduleOfTests: transformedCircuits,
        designSourceId: designId,
        designSourceDate: designData.created_at,
        // Copy project info
        clientName: scheduleData.projectInfo?.clientName || '',
        description: scheduleData.projectInfo?.projectName || ''
      }));

      setHasLoadedDesign(true);

      toast.success('Design loaded', {
        description: `${transformedCircuits.length} circuits pre-filled from Circuit Designer`
      });

      // Update design status to 'in-progress'
      updateDesignStatus.mutate({ id: designId!, status: 'in-progress' });
    }
  }, [designData, hasLoadedDesign, designId]);

  // Update form field
  const handleUpdate = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Save draft
  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement save to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Draft saved');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate certificate
  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      // TODO: Implement PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Certificate generated');

      // Mark design as completed if from Circuit Designer
      if (designId) {
        updateDesignStatus.mutate({ id: designId, status: 'completed' });
      }
    } catch (error) {
      toast.error('Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  // Loading state for design
  if (designId && isLoadingDesign) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Card className="border-elec-yellow/20">
            <CardContent className="py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-elec-yellow/10">
                  <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">Loading Design</h3>
                  <p className="text-sm text-white/50">Pre-filling circuits from Circuit Designer...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error state for design
  if (designId && designError) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              Failed to load design. Please try again or start a new EIC.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => navigate('/electrician/inspection-testing')}>
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate('/electrician/inspection/eic/new')}>
              Start New EIC
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate('/electrician/inspection-testing')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <div>
                  <h1 className="text-lg font-bold text-foreground">
                    {isNew ? 'New EIC' : 'EIC Certificate'}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Electrical Installation Certificate
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Design Source Indicator */}
              {formData.designSourceId && (
                <Badge
                  className={cn(
                    "gap-1.5",
                    "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
                  )}
                >
                  <CircuitBoard className="h-3 w-3" />
                  From Circuit Designer
                </Badge>
              )}

              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                Draft
              </Badge>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>

              <Button
                size="sm"
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Generate PDF
              </Button>
            </div>
          </div>
        </div>
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
            <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <span className="text-elec-yellow font-medium">Circuit Designer Integration:</span>
                <span className="text-white/70">
                  {formData.scheduleOfTests?.length || 0} circuits pre-filled with expected test values.
                  Enter actual readings on-site.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - EIC Form Tabs */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-20 sm:pb-6">
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
            canGenerateCertificate: !isGenerating
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
            }
          }}
          onGenerateCertificate={handleGenerateCertificate}
          onSaveDraft={handleSaveDraft}
          canGenerateCertificate={!isGenerating}
        />
      </main>
    </div>
  );
}

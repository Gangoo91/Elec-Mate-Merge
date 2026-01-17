
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, CheckCircle, XCircle, FileText, FileDown, Save, Beaker, Copy, ChevronDown, ChevronUp, Loader2, User } from 'lucide-react';
import { exportCompleteEICRToPDF } from '@/utils/pdfExport';
import { formatEICRJson } from '@/utils/eicrJsonFormatter';
import { cn } from '@/lib/utils';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import SignatureInput from '@/components/signature/SignatureInput';
import { useEICRForm } from './eicr/EICRFormProvider';
import { useQueryClient } from '@tanstack/react-query';

interface EICRSummaryProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICRSummary = ({ formData: propFormData, onUpdate: propOnUpdate }: EICRSummaryProps) => {
  // Use formData and updateFormData from context directly to ensure we always have the latest state
  // (props can be stale due to React's reconciliation timing)
  const { effectiveReportId, formData: contextFormData, updateFormData } = useEICRForm();
  const formData = contextFormData; // Use context formData for all operations
  const onUpdate = updateFormData; // Use context updateFormData for all operations
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [formattedJsonPreview, setFormattedJsonPreview] = useState<string>('');

  // Ref to always access the latest formData in async callbacks
  // This solves React closure issues where callbacks capture stale state
  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
    // Debug: log when arrays change
    console.log('[EICRSummary] formData updated:', {
      inspectionItemsCount: formData.inspectionItems?.length || 0,
      scheduleOfTestsCount: formData.scheduleOfTests?.length || 0,
      defectObservationsCount: formData.defectObservations?.length || 0
    });
  }, [formData]);

  // Clear JSON cache when form data arrays change (handles dev fill and normal form entry)
  useEffect(() => {
    setFormattedJsonPreview('');
  }, [
    formData.inspectionItems,
    formData.scheduleOfTests,
    formData.defectObservations
  ]);

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
    // Use ref to get the absolute latest formData (solves closure timing issues)
    const latestFormData = formDataRef.current;
    console.log('[handleCopyJson] Using formData with arrays:', {
      inspectionItemsCount: latestFormData.inspectionItems?.length || 0,
      scheduleOfTestsCount: latestFormData.scheduleOfTests?.length || 0,
      defectObservationsCount: latestFormData.defectObservations?.length || 0
    });
    const formattedJson = await formatEICRJson(latestFormData, effectiveReportId);
    navigator.clipboard.writeText(JSON.stringify(formattedJson, null, 2));
    toast({
      title: "JSON copied",
      description: "Structured form data copied to clipboard.",
    });
  };

  const getOverallAssessmentColor = () => {
    switch (formData.overallAssessment) {
      case 'satisfactory': return 'text-green-600';
      case 'unsatisfactory': return 'text-red-600';
      default: return 'text-white/70';
    }
  };

  const getAssessmentIcon = () => {
    switch (formData.overallAssessment) {
      case 'satisfactory': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'unsatisfactory': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const handleGenerateCertificate = async () => {
    console.log('[EICRSummary] Starting local PDF generation:', {
      clientName: formData.clientName,
      certificateNumber: formData.certificateNumber,
      inspectionDate: formData.inspectionDate
    });

    setIsGenerating(true);
    setShowDialog(false); // No dialog needed for local generation
    setPdfUrl(null);
    setGenerationError(null);

    try {
      // Step 0: Validate required fields
      const missingFields = [];
      if (!formData.clientName || formData.clientName.trim() === '') {
        missingFields.push('Client Name');
      }
      if (!formData.installationAddress || formData.installationAddress.trim() === '') {
        missingFields.push('Installation Address');
      }
      if (!formData.inspectorName || formData.inspectorName.trim() === '') {
        missingFields.push('Inspector Name');
      }

      if (missingFields.length > 0) {
        setIsGenerating(false);
        toast({
          title: "Cannot generate PDF",
          description: `Please complete the following required fields: ${missingFields.join(', ')}`,
          variant: "destructive",
          duration: 5000
        });
        return;
      }

      // Step 1: Ensure report is saved to database first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { reportCloud } = await import('@/utils/reportCloud');

      // Check if report exists and save/update it
      let savedReportId = effectiveReportId;
      const existingReport = await reportCloud.getReportByReportId(effectiveReportId, user.id);

      if (!existingReport) {
        const createResult = await reportCloud.createReport(user.id, 'eicr', formData);
        if (!createResult.success || !createResult.reportId) {
          throw new Error('Failed to save report before generating PDF');
        }
        savedReportId = createResult.reportId;
      } else {
        await reportCloud.updateReport(savedReportId, user.id, formData);
      }

      // Step 2: Generate PDF locally using jsPDF (no PDFMonkey dependency)
      console.log('[EICRSummary] Generating PDF locally with jsPDF...');

      await exportCompleteEICRToPDF(
        formData,
        formData.inspectionItems || [],
        formData.defectObservations || []
      );

      // Step 3: Mark certificate as completed
      onUpdate('certificateGenerated', true);
      onUpdate('certificateGeneratedAt', new Date().toISOString());
      onUpdate('status', 'completed');

      // Invalidate dashboard queries to refresh
      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });
      queryClient.invalidateQueries({ queryKey: ['customer-reports'] });

      toast({
        title: "Certificate generated successfully",
        description: "Your EICR certificate has been generated and downloaded.",
      });
    } catch (error) {
      console.error('[EICRSummary] PDF generation failed:', error);
      setGenerationError(error instanceof Error ? error.message : 'Unknown error');
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate certificate. Please check your form data.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = () => {
    // Note: Auto-save is now handled by EICRFormProvider via useCloudSync
    toast({
      title: "Saved to cloud",
      description: "Your EICR is automatically saved to the cloud.",
    });
  };

  const isFormComplete = () => {
    const requiredFields = [
      'clientName',
      'installationAddress',
      'inspectionDate',
      'inspectorName',
      'inspectorQualifications',
      'overallAssessment',
      'satisfactoryForContinuedUse',
      'inspectedBySignature',
      'reportAuthorisedBySignature'
    ];
    
    return requiredFields.every(field => formData[field] && formData[field].toString().trim() !== '');
  };

  const handleGenerateTestData = () => {
    const mockTestResults = [
      {
        id: crypto.randomUUID(),
        circuitReference: "C1",
        circuitDescription: "Ring Main Kitchen",
        livePolarity: "Correct",
        r1_r2: 0.15,
        insulation_resistance: 250,
        zs: 0.42,
        max_zs: 1.44,
        rcd_trip_time: 28,
        rcd_rating: 30,
        pfc: 2.1,
        protective_device_type: "MCB",
        protective_device_rating: 32,
        protective_device_curve: "B",
        protective_device_ka: 6,
        conductor_live: "2.5",
        conductor_cpc: "1.5",
        reference_method: "C",
        points_served: 8,
        functional_testing: "Pass"
      },
      {
        id: crypto.randomUUID(),
        circuitReference: "C2",
        circuitDescription: "Cooker Circuit",
        livePolarity: "Correct",
        r1_r2: 0.22,
        insulation_resistance: 180,
        zs: 0.55,
        max_zs: 0.73,
        pfc: 3.2,
        protective_device_type: "MCB",
        protective_device_rating: 40,
        protective_device_curve: "B",
        protective_device_ka: 10,
        conductor_live: "6.0",
        conductor_cpc: "2.5",
        reference_method: "C",
        points_served: 1,
        functional_testing: "Pass"
      },
      {
        id: crypto.randomUUID(),
        circuitReference: "C3",
        circuitDescription: "Lighting Ground Floor",
        livePolarity: "Correct",
        r1_r2: 0.85,
        insulation_resistance: 45,
        zs: 1.2,
        max_zs: 2.88,
        pfc: 1.8,
        protective_device_type: "MCB",
        protective_device_rating: 6,
        protective_device_curve: "B",
        protective_device_ka: 6,
        conductor_live: "1.5",
        conductor_cpc: "1.0",
        reference_method: "A",
        points_served: 12,
        functional_testing: "Pass"
      }
    ];

    onUpdate('testResults', mockTestResults);
    
    toast({
      title: "Test Data Generated",
      description: "3 sample circuits loaded into Schedule of Testing",
    });
  };

  // DEV ONLY: Fill all form fields with realistic test data
  const handleDevFillAllFields = () => {
    const today = new Date().toISOString().split('T')[0];
    const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Sample signature as base64 (simple line)
    const devSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uIDMuMC4zLCBodHRwOi8vbWF0cGxvdGxpYi5vcmcvnQurowAAB2FJREFUeJzt3V+I5XUdxvHncXddd1fXP6RuJIqWkYQXLUSBFwZB/cEuuuimIKKLboIuiiC66KaLILoJIqIgCCIioskgqEDMhGgRIZPQsPJP5j93d2dnT3PRWRx2Z+bMzPnNfL8zrxcc2HN+c87v+Z3Z+cyZ+czP15ECAFV8YNDXAABL0AEAVdABAFXQAQBV0AEAVdABAFXQAQBV0AEAVdABAFXQAQBV0AEAVdABAFXsHfQFLOVj73s0f/m3fw/6MjaNPQcc4P/a3bvkSy9dftkhr7z00qAvY9O44cJz84OhEwZ9GZvGgQccmH2G9w16yxj4XTMA+kQHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBBwBUQQcAVEEHAFRBB8D/te/uu3Pnl76cb5xxVr5/1tk584Mfyv3XXDPU13Ttl7+S6087PXd95Wu59r++kh+e+6Hcc+XVQ31NW9Geb5922SdOveTiQV8IsDM+dMop+cyNNyZJ/nnLrfnRB8/Nuy+/PE/60Y8GfGUrOvmcc/KZn/w0SfLkLbfkR+d9MG//6iV58o/+b8BXtrXs6fxrMAQAO+aQ447LYSeckL//6pdJko+edloe/NnP8uhNN+WQ447LbZdf3rtk7Zy1c1bcxjA49bjj8+Df/5YkOem003PfzTfnkZtuzqnHH58/XX5571K1c9bOad1G5+e+4rabb8n9t906sNe/kfb8+GuXDPoagB11y4c/mj89+2z++bKX58Btt/f2P/qPf8hnfvi/SZIP/vAHOX7XrqXO+5tf/zq/eMYzcsAdd/T2P3TrLfn5M5+ZA+64o7f/oVtvya+f9azcf/vtvf0P3npLbnzOM7P/nXf09t9/6625+bnPyoF33d3bf/+tt+bXz3lW7r+jd+0P3HZr/vDc5+SA/9y59+1tt+b6ZzwjD/zPOQ/celuuf8Yzcv9/HsvvbhvqDwJDYs9+BxwwYu9+hwyxJFmWsGw58P773TIc7HTXP3ZuvPDJTw76Mjad62++ORc/6UmDvoxN57qbb8nFT3ryoC9j07n+5pvzoyc9adCXsakcfvRRg76EgdvjsMMP93kHHDToywAGat9DD/M7BxyYPfbZx48WKTvqHWAnJ9K2c/HYk/eFjb5gu5dsBkj64pe+OOhL2Fau+8MfBn0J29Z1v//9oC9hW7n2hhsGfQnbyuHHHD3oS9iydvfVCJhHxMbZc9CXAJQ1c8bPB30JQGl7HnroYb59yt4AgC3HN7mA7WuPPfbYc+ATn/jEQV8IUBYdAKDtOeSQQ/ygk7IBIEvxTa51RweAbWTPww8/fOSTnvSkQV8HsCP8K+EOu+aaa3LR057W+8+gL2b8GW8H7P7Y444b9BVsatdce20uftKT+r4t5/DuvvuA62+6ORMPP2LQl7Op/OaG6/P9055e4rnujn8l3Bm/ue66XHjKKX3flt8n7N7vwIOu/82vh+LnAnbUAQcd1Pk1uO7663PhKaf0d1t+n7B7//0PvP76q6/u+7bs6ynuzv8rcJ3+/wquzZ4//W1vz4FvumHo/lU7/wq4DuzYccCBB/3xD1dd1fdtacdz/N4BB/3xyj/0d0Z2vM93bdjxt+f4u4MO+tOVf1jz8fy/Atd/ux500J+uvGbNx/P7hF2v/7YcfneOr+l47n0tOkBJO1N2d9gBdQy0A5pqt+14bmCKYWvf3bjjx32HnXbA7gdcvdN2eBcdhPZEKqCunYPwQOi1dcVb6CActxGx3hgk/TLcwCuCQjbSL0OUbrSFnPQOqGOnB4Le/zPAZjTQDuiRvfW/Awo5EBoINaDuQGhYRNOB0EBoADWg7kC0+RXbXwiF+IqNobaM+j6c+grU/BVbXwiF+IpdoLaMnp1d/gtqfcU2VkLBiS1QC6ono+4wthHq7UTaX6DWDmiihYJTW6DhSXN5Jb7W38MXWr6eDupbvv3hDfyPhvotPyDbf/6TdhYAg+vJoOYX+kM/Ax7xfxp22vp2t7C+fvwPYKh+/YN2FgC7D8AuH4Y3T2n39vsXO18B1A7o2wq7/OX4/wuQ7j7/8wHpuCfQAPUEvqCOQNQ2WFMFqr/O/1WGbC/oC+re6vD0BNXuPl+gE+rIhJd0gP5/Aa6tYEkf0Jn/C5BaC3oL+J8Nh0NdO9xOFq+HdEBj7VbYtg/oqPYvwKq2u6EbqjttOxqq/Quw2o2wnQT/D5r9IMXIXXMFAAAAABJRU5ErkJggg==';

    // ====== CLIENT & INSTALLATION DETAILS ======
    onUpdate('clientName', 'John Smith');
    onUpdate('clientEmail', 'john.smith@example.com');
    onUpdate('clientPhone', '07700 900123');
    onUpdate('clientAddress', '123 High Street, London, W1A 1AA');
    onUpdate('installationAddress', '456 Installation Road, Manchester, M1 2AB');

    // ====== PREMISES DETAILS ======
    onUpdate('description', 'Three storey commercial office building with basement plant room');
    onUpdate('installationType', 'commercial');
    onUpdate('estimatedAge', '15-20 years');
    onUpdate('evidenceOfAlterations', 'Yes - evident additions to distribution board');
    onUpdate('alterationsDetails', 'Additional circuits added to main DB, new sub-distribution board installed on 2nd floor circa 2019');
    onUpdate('previousInspectionDate', '2019-06-15');

    // ====== INSPECTION DETAILS ======
    onUpdate('purposeOfInspection', 'periodic');
    onUpdate('inspectionDate', today);
    onUpdate('nextInspectionDate', nextYear);
    onUpdate('extentOfInspection', 'Full periodic inspection and testing as per BS 7671:2018+A2:2022. All accessible parts of the installation inspected and tested including main intake, distribution boards, final circuits, and protective devices.');
    onUpdate('agreedLimitations', 'Ceiling voids not accessible in server room. Floor boxes in reception area not accessible due to furniture.');

    // ====== SUPPLY CHARACTERISTICS ======
    onUpdate('supplyVoltage', '230');
    onUpdate('supplyFrequency', '50');
    onUpdate('phases', 'three-phase');
    onUpdate('earthingArrangement', 'TN-C-S');
    onUpdate('supplyPME', 'yes');
    onUpdate('nominalVoltageToEarth', '230');
    onUpdate('nominalLineVoltage', '400');
    onUpdate('prospectiveFaultCurrent', '16');
    onUpdate('externalLoopImpedance', '0.08');
    onUpdate('supplyProtectiveDeviceType', 'BS 88 fuse');
    onUpdate('supplyProtectiveDeviceRating', '100');

    // ====== EARTHING & BONDING ======
    onUpdate('earthElectrodeType', 'TN-C-S supplier earth terminal');
    onUpdate('earthElectrodeResistance', 'N/A');
    onUpdate('mainEarthingConductorType', 'Cu');
    onUpdate('mainEarthingConductorSize', '16');
    onUpdate('mainBondingConductorType', 'Cu');
    onUpdate('mainBondingSize', '10');
    onUpdate('bondingCompliance', 'satisfactory');
    onUpdate('mainProtectiveConductorSize', '16');
    onUpdate('mainProtectiveConductorMaterial', 'copper');
    onUpdate('mainProtectiveConductorType', 'single-core insulated');
    onUpdate('waterBonded', 'yes');
    onUpdate('gasBonded', 'yes');
    onUpdate('oilBonded', 'n/a');
    onUpdate('structuralSteelBonded', 'yes');
    onUpdate('lightningProtectionBonded', 'n/a');
    onUpdate('otherServicesBonded', 'HVAC pipework');
    onUpdate('supplementaryBondingSize', '4');
    onUpdate('mainBondingLocations', 'Water, Gas, Oil, Structural Steel');

    // ====== CONSUMER UNIT / DISTRIBUTION BOARD ======
    onUpdate('cuLocation', 'Basement plant room, west wall');
    onUpdate('cuManufacturer', 'Schneider Electric');
    onUpdate('cuType', 'Prisma Plus G IP55');
    onUpdate('boardSize', '24-way');
    onUpdate('boardType', 'three-phase distribution board');
    onUpdate('intakeCableSize', '35mm² 4-core SWA');
    onUpdate('tailsSize', '25mm² singles');
    onUpdate('mainSwitchType', 'MCCB');
    onUpdate('mainSwitchRating', '100A');
    onUpdate('rcdProtection', 'Type A RCCBs on final circuits');
    onUpdate('spd', 'Type 2 SPD fitted');
    onUpdate('afdd', 'Not fitted');

    // ====== INSPECTOR DETAILS ======
    onUpdate('inspectorName', 'DAVID WILSON');
    onUpdate('inspectorQualifications', 'C&G 2391-52, C&G 2382-22, JIB Gold Card, AM&I');
    onUpdate('inspectorSignature', devSignature);

    // ====== COMPANY DETAILS ======
    onUpdate('companyName', 'Wilson Electrical Services Ltd');
    onUpdate('companyAddress', '789 Industrial Estate, Birmingham, B1 1AA');
    onUpdate('companyPhone', '0121 123 4567');
    onUpdate('companyEmail', 'info@wilsonelectrical.co.uk');
    onUpdate('registrationScheme', 'NICEIC');
    onUpdate('registrationNumber', 'NICEIC/12345');

    // ====== DECLARATIONS (INSPECTED BY) ======
    onUpdate('inspectedByName', 'DAVID WILSON');
    onUpdate('inspectedBySignature', devSignature);
    onUpdate('inspectedByForOnBehalfOf', 'Wilson Electrical Services Ltd');
    onUpdate('inspectedByPosition', 'Senior Electrical Inspector');
    onUpdate('inspectedByAddress', '789 Industrial Estate, Birmingham, B1 1AA');
    onUpdate('inspectedByCpScheme', 'NICEIC/12345');

    // ====== REPORT AUTHORISED BY ======
    onUpdate('reportAuthorisedByName', 'DAVID WILSON');
    onUpdate('reportAuthorisedBySignature', devSignature);
    onUpdate('reportAuthorisedByDate', today);
    onUpdate('reportAuthorisedByForOnBehalfOf', 'Wilson Electrical Services Ltd');
    onUpdate('reportAuthorisedByPosition', 'Director');
    onUpdate('reportAuthorisedByAddress', '789 Industrial Estate, Birmingham, B1 1AA');
    onUpdate('reportAuthorisedByMembershipNo', 'NICEIC/12345');

    // ====== ASSESSMENT ======
    onUpdate('overallAssessment', 'satisfactory');
    onUpdate('satisfactoryForContinuedUse', 'yes');
    onUpdate('additionalComments', 'The installation is generally in good condition. Minor recommendations made for improvement. All protective devices operating correctly. RCD test results within acceptable limits.');

    // ====== SCHEDULE OF TESTS - Full 30+ column test results ======
    const comprehensiveTestResults = [
      {
        id: crypto.randomUUID(),
        circuitNumber: '1',
        circuitDescription: 'Lighting Ground Floor',
        circuitType: 'lighting',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '8',
        liveSize: '1.5',
        cpcSize: '1.0',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        maxZs: '7.67',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.85',
        r2: '0.42',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '40',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '1.12',
        rcdOneX: '18',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '1.8',
        pfcLiveNeutral: '1.8',
        pfcLiveEarth: '1.6',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C1',
        type: 'MCB',
        cableSize: '1.5',
        protectiveDevice: 'B6'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '2',
        circuitDescription: 'Lighting First Floor',
        circuitType: 'lighting',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '10',
        liveSize: '1.5',
        cpcSize: '1.0',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        maxZs: '7.67',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '1.02',
        r2: '0.51',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '40',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '1.35',
        rcdOneX: '19',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '1.6',
        pfcLiveNeutral: '1.6',
        pfcLiveEarth: '1.4',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C2',
        type: 'MCB',
        cableSize: '1.5',
        protectiveDevice: 'B6'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '3',
        circuitDescription: 'Ring Main - Kitchen',
        circuitType: 'ring',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '6',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        maxZs: '1.37',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.45',
        r2: '0.28',
        ringContinuityLive: '0.32',
        ringContinuityNeutral: '0.31',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '40',
        ringR1: '0.32',
        ringRn: '0.31',
        ringR2: '0.52',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.42',
        rcdOneX: '22',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '2.1',
        pfcLiveNeutral: '2.1',
        pfcLiveEarth: '1.9',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C3',
        type: 'MCB',
        cableSize: '2.5',
        protectiveDevice: 'B32'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '4',
        circuitDescription: 'Ring Main - Ground Floor',
        circuitType: 'ring',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '8',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        maxZs: '1.37',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.52',
        r2: '0.32',
        ringContinuityLive: '0.38',
        ringContinuityNeutral: '0.36',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '40',
        ringR1: '0.38',
        ringRn: '0.36',
        ringR2: '0.58',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.48',
        rcdOneX: '21',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '2.0',
        pfcLiveNeutral: '2.0',
        pfcLiveEarth: '1.8',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C4',
        type: 'MCB',
        cableSize: '2.5',
        protectiveDevice: 'B32'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '5',
        circuitDescription: 'Ring Main - First Floor',
        circuitType: 'ring',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '10',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        maxZs: '1.37',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.62',
        r2: '0.38',
        ringContinuityLive: '0.45',
        ringContinuityNeutral: '0.44',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '40',
        ringR1: '0.45',
        ringRn: '0.44',
        ringR2: '0.72',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.55',
        rcdOneX: '24',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '1.9',
        pfcLiveNeutral: '1.9',
        pfcLiveEarth: '1.7',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C5',
        type: 'MCB',
        cableSize: '2.5',
        protectiveDevice: 'B32'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '6',
        circuitDescription: 'Cooker',
        circuitType: 'cooker',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '1',
        liveSize: '6.0',
        cpcSize: '2.5',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        maxZs: '1.37',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.22',
        r2: '0.14',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.28',
        rcdOneX: '',
        rcdTestButton: '',
        afddTest: 'N/A',
        pfc: '3.2',
        pfcLiveNeutral: '3.2',
        pfcLiveEarth: '2.9',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C6',
        type: 'MCB',
        cableSize: '6.0',
        protectiveDevice: 'B32'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '7',
        circuitDescription: 'Electric Shower',
        circuitType: 'shower',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '1',
        liveSize: '10.0',
        cpcSize: '4.0',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '45',
        protectiveDeviceKaRating: '6',
        maxZs: '0.97',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.18',
        r2: '0.11',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '45',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.24',
        rcdOneX: '16',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '3.5',
        pfcLiveNeutral: '3.5',
        pfcLiveEarth: '3.2',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C7',
        type: 'MCB',
        cableSize: '10.0',
        protectiveDevice: 'B45'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '8',
        circuitDescription: 'Immersion Heater',
        circuitType: 'immersion',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '1',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '16',
        protectiveDeviceKaRating: '6',
        maxZs: '2.73',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.38',
        r2: '0.24',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.42',
        rcdOneX: '',
        rcdTestButton: '',
        afddTest: 'N/A',
        pfc: '2.4',
        pfcLiveNeutral: '2.4',
        pfcLiveEarth: '2.2',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C8',
        type: 'MCB',
        cableSize: '2.5',
        protectiveDevice: 'B16'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '9',
        circuitDescription: 'Smoke Detectors',
        circuitType: 'smoke',
        typeOfWiring: 'A',
        referenceMethod: 'C',
        pointsServed: '5',
        liveSize: '1.5',
        cpcSize: '1.0',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        maxZs: '7.67',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.72',
        r2: '0.36',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.95',
        rcdOneX: '',
        rcdTestButton: '',
        afddTest: 'N/A',
        pfc: '1.7',
        pfcLiveNeutral: '1.7',
        pfcLiveEarth: '1.5',
        functionalTesting: 'Pass',
        notes: 'Interlinked mains smoke/CO alarms',
        circuitDesignation: 'C9',
        type: 'MCB',
        cableSize: '1.5',
        protectiveDevice: 'B6'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '10',
        circuitDescription: 'Outdoor Sockets',
        circuitType: 'socket',
        typeOfWiring: 'D',
        referenceMethod: 'D',
        pointsServed: '2',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 60898',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '20',
        protectiveDeviceKaRating: '6',
        maxZs: '2.19',
        protectiveDeviceLocation: 'Main DB',
        r1r2: '0.58',
        r2: '0.36',
        ringContinuityLive: '',
        ringContinuityNeutral: '',
        rcdBsStandard: 'BS EN 61009',
        rcdType: 'A',
        rcdRating: '30',
        rcdRatingA: '20',
        ringR1: '',
        ringRn: '',
        ringR2: '',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.65',
        rcdOneX: '15',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '2.2',
        pfcLiveNeutral: '2.2',
        pfcLiveEarth: '2.0',
        functionalTesting: 'Pass',
        notes: 'IP66 rated weatherproof sockets',
        circuitDesignation: 'C10',
        type: 'RCBO',
        cableSize: '2.5',
        protectiveDevice: 'B20'
      }
    ];
    onUpdate('testResults', comprehensiveTestResults);
    onUpdate('scheduleOfTests', comprehensiveTestResults); // For JSON formatter

    // ====== 66 INSPECTION ITEMS - BS 7671:2018+A3:2024 ======
    const fullInspectionItems = [
      // Section 1: Intake Equipment
      { id: 'item_1_0', itemNumber: '1.0', item: 'Service cable, Service head, Earthing arrangement, Meter tails, Metering equipment, Isolator', clause: '132.12', outcome: 'satisfactory', notes: '' },
      { id: 'item_1_1', itemNumber: '1.1', item: "Consumer's isolator (where present)", clause: '537.2.1.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_1_2', itemNumber: '1.2', item: "Consumer's meter tails", clause: '521.10.1', outcome: 'satisfactory', notes: '' },
      // Section 2: Microgenerators
      { id: 'item_2_0', itemNumber: '2.0', item: 'Presence of adequate arrangements for other sources such as microgenerators', clause: '551.6; 551.7', outcome: 'not-applicable', notes: '' },
      // Section 3: Earthing/Bonding
      { id: 'item_3_1', itemNumber: '3.1', item: "Presence and condition of distributor's earthing arrangement", clause: '542.1.2.1; 542.1.2.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_3_2', itemNumber: '3.2', item: 'Presence and condition of earth electrode connection where applicable', clause: '542.1.2.3', outcome: 'not-applicable', notes: 'TN-C-S supply' },
      { id: 'item_3_3', itemNumber: '3.3', item: 'Provision of earthing/bonding labels at all appropriate locations', clause: '514.13.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_3_4', itemNumber: '3.4', item: 'Confirmation of earthing conductor size', clause: '542.3; 543.1.1', outcome: 'satisfactory', notes: '16mm² copper' },
      { id: 'item_3_5', itemNumber: '3.5', item: 'Accessibility and condition of earthing conductor at MET', clause: '543.3.2', outcome: 'C1', notes: 'Main earthing conductor disconnected at MET - DANGER' },
      { id: 'item_3_6', itemNumber: '3.6', item: 'Confirmation of main protective bonding conductor sizes', clause: '544.1', outcome: 'satisfactory', notes: '10mm² copper' },
      { id: 'item_3_7', itemNumber: '3.7', item: 'Condition and accessibility of main protective bonding conductor connections', clause: '543.3.2; 544.1.2', outcome: 'C2', notes: 'Bonding to gas disconnected - see observations' },
      { id: 'item_3_8', itemNumber: '3.8', item: 'Accessibility and condition of other protective bonding connections', clause: '543.3.1; 543.3.2', outcome: 'satisfactory', notes: '' },
      // Section 4: Consumer Units
      { id: 'item_4_1', itemNumber: '4.1', item: 'Adequacy of working space/accessibility to consumer unit/distribution board', clause: '132.12; 513.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_2', itemNumber: '4.2', item: 'Security of fixing', clause: '134.1.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_3', itemNumber: '4.3', item: 'Condition of enclosure(s) in terms of IP rating etc.', clause: '416.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_4', itemNumber: '4.4', item: 'Condition of enclosure(s) in terms of fire rating etc.', clause: '421.1.201; 526.5', outcome: 'satisfactory', notes: 'Metal consumer unit' },
      { id: 'item_4_5', itemNumber: '4.5', item: 'Enclosure not damaged/deteriorated so as to impair safety', clause: '651.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_6', itemNumber: '4.6', item: 'Presence of main linked switch (as required by 462.1.201)', clause: '462.1.201', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_7', itemNumber: '4.7', item: 'Operation of main switch (functional check)', clause: '643.10', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_8', itemNumber: '4.8', item: 'Manual operation of circuit-breakers and RCDs to prove disconnection', clause: '643.10', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_9', itemNumber: '4.9', item: 'Correct identification of circuit details and protective devices', clause: '514.8.1; 514.9.1', outcome: 'C3', notes: 'Circuit chart requires updating' },
      { id: 'item_4_10', itemNumber: '4.10', item: 'Presence of RCD six-monthly test notice, where required', clause: '514.12.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_11', itemNumber: '4.11', item: 'Presence of alternative supply warning notice at or near consumer unit/distribution board', clause: '514.15', outcome: 'not-applicable', notes: '' },
      { id: 'item_4_12', itemNumber: '4.12', item: 'Presence of other required labelling (please specify)', clause: 'Section 514', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_13', itemNumber: '4.13', item: 'Compatibility of protective devices, bases and other components', clause: '411.3.2; 411.4; 411.5; 411.6', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_14', itemNumber: '4.14', item: 'Single-pole switching or protective devices in line conductor only', clause: '132.14.1; 530.3.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_15', itemNumber: '4.15', item: 'Protection against mechanical damage where cables enter consumer unit', clause: '522.8.1; 522.8.5; 522.8.11', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_16', itemNumber: '4.16', item: 'Protection against electromagnetic effects where cables enter consumer unit', clause: '521.5.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_17', itemNumber: '4.17', item: 'RCD(s) provided for fault protection – includes RCBOs', clause: '411.4.204; 411.5.2; 531.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_18', itemNumber: '4.18', item: 'RCD(s) provided for additional protection/requirements – includes RCBOs', clause: '411.3.3; 415.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_19', itemNumber: '4.19', item: 'Confirmation of indication that SPD is functional', clause: '651.4', outcome: 'satisfactory', notes: 'Type 2 SPD fitted, indicator green' },
      { id: 'item_4_20', itemNumber: '4.20', item: 'Confirmation that ALL conductor connections are correctly located and secure', clause: '526.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_4_21', itemNumber: '4.21', item: 'Adequate arrangements where a generating set operates as switched alternative', clause: '551.6', outcome: 'not-applicable', notes: '' },
      { id: 'item_4_22', itemNumber: '4.22', item: 'Adequate arrangements where a generating set operates in parallel', clause: '551.7', outcome: 'not-applicable', notes: '' },
      // Section 5: Final Circuits
      { id: 'item_5_1', itemNumber: '5.1', item: 'Identification of conductors', clause: '514.3.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_2', itemNumber: '5.2', item: 'Cables correctly supported throughout their run', clause: '521.10.202; 522.8.5', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_3', itemNumber: '5.3', item: 'Condition of insulation of live parts', clause: '416.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_4', itemNumber: '5.4', item: 'Non-sheathed cables protected by enclosure in conduit, ducting or trunking', clause: '521.10.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_5', itemNumber: '5.5', item: 'Adequacy of cables for current-carrying capacity', clause: 'Section 523', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_6', itemNumber: '5.6', item: 'Coordination between conductors and overload protective devices', clause: '433.1; 533.2.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_7', itemNumber: '5.7', item: 'Adequacy of protective devices: type and rated current for fault protection', clause: '411.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_8', itemNumber: '5.8', item: 'Presence and adequacy of circuit protective conductors', clause: '411.3.1; Section 543', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_9', itemNumber: '5.9', item: 'Wiring system(s) appropriate for the type and nature of the installation', clause: 'Section 522', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_10', itemNumber: '5.10', item: 'Concealed cables installed in prescribed zones', clause: '522.6.202', outcome: 'LIM', notes: 'Unable to verify all concealed cables' },
      { id: 'item_5_11', itemNumber: '5.11', item: 'Cables concealed under floors, above ceilings adequately protected', clause: '522.6.204', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_12', itemNumber: '5.12', item: 'Provision of additional requirements for protection by RCD not exceeding 30 mA', clause: '411.3.3; 522.6.202; 522.6.203; 411.3.4', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_13', itemNumber: '5.13', item: 'Provision of fire barriers, sealing arrangements and protection against thermal effects', clause: 'Section 527', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_14', itemNumber: '5.14', item: 'Band II cables segregated/separated from Band I cables', clause: '528.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_15', itemNumber: '5.15', item: 'Cables segregated/separated from communications cabling', clause: '528.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_16', itemNumber: '5.16', item: 'Cables segregated/separated from non-electrical services', clause: '528.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_17', itemNumber: '5.17', item: 'Termination of cables at enclosures', clause: 'Section 526; 526.6; 526.8; 526.5; 522.8.5', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_18', itemNumber: '5.18', item: 'Condition of accessories including socket-outlets, switches and joint boxes', clause: '651.2(v)', outcome: 'C2', notes: 'Damaged socket in kitchen - see observations' },
      { id: 'item_5_19', itemNumber: '5.19', item: 'Suitability of accessories for external influences', clause: '512.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_20', itemNumber: '5.20', item: 'Adequacy of working space/accessibility to equipment', clause: '132.12; 513.1', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_21', itemNumber: '5.21', item: 'Single-pole switching or protective devices in line conductors only', clause: '132.14.1; 530.3.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_5_22', itemNumber: '5.22', item: 'RCD protection of socket-outlets with rated current not exceeding 32 A', clause: '411.3.3', outcome: 'satisfactory', notes: 'All socket circuits RCD protected' },
      // Section 6: Bath/Shower
      { id: 'item_6_0', itemNumber: '6.0', item: 'Additional protection for all LV circuits by RCD not exceeding 30 mA', clause: '701.411.3.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_6_1', itemNumber: '6.1', item: 'Where used as a protective measure, requirements for SELV or PELV met', clause: '701.414.4.5', outcome: 'not-applicable', notes: '' },
      { id: 'item_6_2', itemNumber: '6.2', item: 'Shaver supply units comply with BS EN 61558-2-5', clause: '701.512.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_6_3', itemNumber: '6.3', item: 'Presence of supplementary bonding conductors, unless not required', clause: '701.415.2', outcome: 'satisfactory', notes: 'Not required - all circuits RCD protected' },
      { id: 'item_6_4', itemNumber: '6.4', item: 'Low voltage socket-outlets sited at least 2.5 m from zone 1', clause: '701.512.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_6_5', itemNumber: '6.5', item: 'Suitability of equipment for external influences in terms of IP rating', clause: '701.512.2', outcome: 'satisfactory', notes: '' },
      { id: 'item_6_6', itemNumber: '6.6', item: 'Suitability of accessories and controlgear etc. for a particular zone', clause: '701.512.3', outcome: 'satisfactory', notes: '' },
      { id: 'item_6_7', itemNumber: '6.7', item: 'Suitability of current-using equipment for particular position', clause: '701.55', outcome: 'satisfactory', notes: '' },
      // Section 7: Special Locations
      { id: 'item_7_0', itemNumber: '7.0', item: 'List all other special installations or locations present, if any', clause: 'Part 7', outcome: 'not-applicable', notes: 'No other special locations identified' },
      // Section 8: Prosumer
      { id: 'item_8_0', itemNumber: '8.0', item: 'Where the installation includes Chapter 82 requirements, add items to checklist', clause: 'Chapter 82', outcome: 'not-applicable', notes: 'No prosumer installation present' }
    ];
    onUpdate('inspectionItems', fullInspectionItems);

    // ====== SAMPLE DEFECT OBSERVATIONS ======
    const sampleObservations = [
      {
        id: crypto.randomUUID(),
        item: 'Earthing arrangement',
        defectCode: 'C1',
        description: 'Main earthing conductor found disconnected at MET - installation has no earth connection',
        recommendation: 'Immediate reconnection of main earthing conductor required. Installation unsafe until rectified.',
        regulation: '411.3.1.1',
        rectified: false
      },
      {
        id: crypto.randomUUID(),
        item: 'Circuit chart labelling',
        defectCode: 'C3',
        description: 'Circuit chart not up to date with current circuit descriptions',
        recommendation: 'Update circuit chart to reflect current installation',
        regulation: '514.9.1',
        rectified: false
      },
      {
        id: crypto.randomUUID(),
        item: 'Distribution board enclosure',
        defectCode: 'C3',
        description: 'Missing blanking plate on spare way in 2nd floor sub-distribution board',
        recommendation: 'Fit appropriate blanking plate',
        regulation: '416.2',
        rectified: false
      },
      {
        id: crypto.randomUUID(),
        item: 'Bonding conductor',
        defectCode: 'C2',
        description: 'Main protective bonding conductor to gas installation disconnected',
        recommendation: 'Reconnect main protective bonding conductor to gas installation',
        regulation: '411.3.1.2',
        rectified: false
      },
      {
        id: crypto.randomUUID(),
        item: 'Socket outlet condition',
        defectCode: 'C2',
        description: 'Damaged socket outlet in kitchen with exposed live terminals when faceplate removed',
        recommendation: 'Replace damaged socket outlet with new accessory',
        regulation: '651.2',
        rectified: false
      },
      {
        id: crypto.randomUUID(),
        item: 'Floor boxes inspection',
        defectCode: 'FI',
        description: 'Floor boxes in reception area unable to be inspected due to furniture',
        recommendation: 'Inspect at next convenient opportunity when area is accessible',
        regulation: '',
        rectified: false
      }
    ];
    onUpdate('defectObservations', sampleObservations);

    // Clear cached JSON preview so it regenerates with the new data
    setFormattedJsonPreview('');

    toast({
      title: "Dev Mode: All Fields Populated",
      description: "Complete EICR: 66 inspection items (with C1, C2, C3, LIM, N/A outcomes), 10 circuits, 6 observations (C1, C2, C3, FI), all earthing conductor fields",
    });
  };

  return (
    <div className="space-y-8 md:max-w-6xl mx-auto">
      <Card className="overflow-hidden rounded-xl shadow-lg shadow-black/10 border border-border bg-card">
        <CardHeader className="p-6 lg:p-8 bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-border/50">
          <div className="flex items-center gap-3">
            {getAssessmentIcon()}
            <div>
              <CardTitle className="text-xl font-bold text-elec-yellow">Overall Assessment</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Final assessment and recommendations per BS 7671
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 lg:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Overall Assessment</Label>
            <MobileSelectPicker
              value={formData.overallAssessment || ''}
              onValueChange={(value) => onUpdate('overallAssessment', value)}
              options={[
                { value: 'satisfactory', label: 'Satisfactory' },
                { value: 'unsatisfactory', label: 'Unsatisfactory' },
              ]}
              placeholder="Select overall assessment"
              title="Overall Assessment"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Satisfactory for Continued Use</Label>
            <MobileSelectPicker
              value={formData.satisfactoryForContinuedUse || ''}
              onValueChange={(value) => onUpdate('satisfactoryForContinuedUse', value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'yes-with-recommendations', label: 'Yes, subject to recommendations' },
              ]}
              placeholder="Yes/No"
              title="Satisfactory for Continued Use"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Additional Comments</Label>
          <textarea
            className="w-full max-w-full p-3 border border-input rounded-md resize-none overflow-auto touch-manipulation text-base min-h-[100px] sm:min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20"
            rows={4}
            placeholder="Enter any additional comments or observations..."
            value={formData.additionalComments || ''}
            onChange={(e) => onUpdate('additionalComments', e.target.value)}
          />
        </div>

        {/* Authorisation Signatures Section */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 pt-6 sm:pt-8 border-t-2 border-border/50">
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-elec-yellow">Authorisation Signatures</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Both signatures are required per BS 7671 regulations to authorise this EICR for issue.
            </p>
          </div>

          {/* Copy from Inspector Details Button */}
          <div className="p-3 sm:p-4 bg-blue-500/5 sm:bg-blue-500/10 border border-blue-500/20 sm:border-blue-500/30 rounded-lg">
            <Button 
              onClick={() => {
                onUpdate('inspectedByName', formData.inspectorName);
                onUpdate('inspectedBySignature', formData.inspectorSignature);
                onUpdate('inspectedByForOnBehalfOf', formData.companyName);
                onUpdate('inspectedByPosition', 'Inspector');
                onUpdate('inspectedByAddress', formData.companyAddress);
                onUpdate('inspectedByCpScheme', formData.registrationScheme);
                toast({
                  title: "Details copied",
                  description: "Inspector details copied to 'Inspected By' section"
                });
              }}
              className="w-full h-11 touch-manipulation text-sm sm:text-base"
              variant="outline"
            >
              <User className="h-4 w-4 sm:mr-2" />
              <span className="ml-2 sm:ml-0">Copy from Inspector Details</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INSPECTED BY Section */}
            <Card className="p-4 sm:p-6 space-y-6 bg-card/50 border border-border/50 rounded-lg">
              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                <User className="h-4 w-4" />
                INSPECTED BY:
              </h4>
              
              <div>
                <Label htmlFor="inspectedByName">Name (Capitals): *</Label>
                <Input
                  id="inspectedByName"
                  value={formData.inspectedByName || ''}
                  onChange={(e) => onUpdate('inspectedByName', e.target.value.toUpperCase())}
                  placeholder="FULL NAME IN CAPITALS"
                  className="uppercase h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="inspectedBySignature">Signature: *</Label>
                <SignatureInput
                  value={formData.inspectedBySignature || ''}
                  onChange={(value) => onUpdate('inspectedBySignature', value || '')}
                  placeholder="Signature of inspector"
                  required={true}
                />
              </div>

              <div>
                <Label htmlFor="inspectedByForOnBehalfOf">For/on behalf of:</Label>
                <Input
                  id="inspectedByForOnBehalfOf"
                  value={formData.inspectedByForOnBehalfOf || ''}
                  onChange={(e) => onUpdate('inspectedByForOnBehalfOf', e.target.value)}
                  placeholder="Company or organisation name"
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="inspectedByPosition">Position:</Label>
                <Input
                  id="inspectedByPosition"
                  value={formData.inspectedByPosition || ''}
                  onChange={(e) => onUpdate('inspectedByPosition', e.target.value)}
                  placeholder="Job title or position"
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="inspectedByAddress">Address:</Label>
                <textarea
                  id="inspectedByAddress"
                  className="w-full max-w-full p-3 border border-input rounded-md resize-none overflow-auto touch-manipulation text-base min-h-[100px] sm:min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20"
                  rows={3}
                  value={formData.inspectedByAddress || ''}
                  onChange={(e) => onUpdate('inspectedByAddress', e.target.value)}
                  placeholder="Full address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspectedByCpScheme">CP Scheme:</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="inspectedByCpScheme"
                    value={formData.inspectedByCpScheme || ''}
                    onChange={(e) => onUpdate('inspectedByCpScheme', e.target.value)}
                    placeholder="Competent Person Scheme"
                    disabled={formData.inspectedByCpSchemeNA}
                    className={cn("h-11 text-base touch-manipulation", formData.inspectedByCpSchemeNA && 'opacity-50')}
                  />
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Checkbox
                      id="inspectedByCpSchemeNA"
                      checked={formData.inspectedByCpSchemeNA || false}
                      onCheckedChange={(checked) => {
                        onUpdate('inspectedByCpSchemeNA', checked);
                        if (checked) onUpdate('inspectedByCpScheme', '');
                      }}
                    />
                    <Label htmlFor="inspectedByCpSchemeNA" className="cursor-pointer">N/A</Label>
                  </div>
                </div>
              </div>
            </Card>

            {/* REPORT AUTHORISED FOR ISSUE BY Section */}
            <Card className="p-4 sm:p-6 space-y-6 bg-card/50 border border-border/50 rounded-lg">
              {/* Same as Inspected By Checkbox */}
              <div className="p-3 sm:p-4 bg-purple-500/5 sm:bg-purple-500/10 border border-purple-500/20 sm:border-purple-500/30 rounded-lg">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Checkbox
                    id="sameAsInspectedBy"
                    checked={formData.sameAsInspectedBy || false}
                    onCheckedChange={(checked) => {
                      onUpdate('sameAsInspectedBy', checked);
                      if (checked) {
                        onUpdate('reportAuthorisedByName', formData.inspectedByName);
                        onUpdate('reportAuthorisedBySignature', formData.inspectedBySignature);
                        onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
                        onUpdate('reportAuthorisedByForOnBehalfOf', formData.inspectedByForOnBehalfOf);
                        onUpdate('reportAuthorisedByPosition', formData.inspectedByPosition);
                        onUpdate('reportAuthorisedByAddress', formData.inspectedByAddress);
                        onUpdate('reportAuthorisedByMembershipNo', formData.inspectedByCpScheme);
                        toast({
                          title: "Details copied",
                          description: "Copied from 'Inspected By' section"
                        });
                      }
                    }}
                  />
                  <Label htmlFor="sameAsInspectedBy" className="text-sm sm:text-base font-medium cursor-pointer leading-relaxed">
                    Same person as Inspected By (auto-populate fields)
                  </Label>
                </div>
              </div>

              <h4 className="text-base font-semibold text-elec-yellow flex items-center gap-2">
                <User className="h-4 w-4" />
                REPORT AUTHORISED FOR ISSUE BY:
              </h4>
              
              <div>
                <Label htmlFor="reportAuthorisedByName">Name (Capitals): *</Label>
                <Input
                  id="reportAuthorisedByName"
                  value={formData.reportAuthorisedByName || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                  placeholder="FULL NAME IN CAPITALS"
                  className="uppercase h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="reportAuthorisedBySignature">Signature: *</Label>
                <SignatureInput
                  value={formData.reportAuthorisedBySignature || ''}
                  onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
                  placeholder="Signature of authorising person"
                  required={true}
                />
              </div>

              <div>
                <Label htmlFor="reportAuthorisedByDate">Date: *</Label>
                <Input
                  id="reportAuthorisedByDate"
                  type="date"
                  value={formData.reportAuthorisedByDate || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="reportAuthorisedByForOnBehalfOf">For/on behalf of:</Label>
                <Input
                  id="reportAuthorisedByForOnBehalfOf"
                  value={formData.reportAuthorisedByForOnBehalfOf || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                  placeholder="Company or organisation name"
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="reportAuthorisedByPosition">Position:</Label>
                <Input
                  id="reportAuthorisedByPosition"
                  value={formData.reportAuthorisedByPosition || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByPosition', e.target.value)}
                  placeholder="Job title or position"
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="reportAuthorisedByAddress">Address:</Label>
                <textarea
                  id="reportAuthorisedByAddress"
                  className="w-full max-w-full p-3 border border-input rounded-md resize-none overflow-auto touch-manipulation text-base min-h-[100px] sm:min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20"
                  rows={3}
                  value={formData.reportAuthorisedByAddress || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                  placeholder="Full address"
                />
              </div>

              <div>
                <Label htmlFor="reportAuthorisedByMembershipNo">Membership No:</Label>
                <Input
                  id="reportAuthorisedByMembershipNo"
                  value={formData.reportAuthorisedByMembershipNo || ''}
                  onChange={(e) => onUpdate('reportAuthorisedByMembershipNo', e.target.value)}
                  placeholder="Membership or registration number"
                  className="h-11 text-base touch-manipulation"
                />
              </div>
            </Card>
          </div>
        </div>

        <div className={`p-8 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
          formData.overallAssessment === 'satisfactory' 
            ? 'border-green-500/40 bg-gradient-to-br from-green-500/10 to-green-600/5 shadow-lg shadow-green-500/10' 
            : formData.overallAssessment === 'unsatisfactory'
            ? 'border-red-500/40 bg-gradient-to-br from-red-500/10 to-red-600/5 shadow-lg shadow-red-500/10'
            : 'border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/10 to-amber-500/5 shadow-lg shadow-elec-yellow/10'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${
              formData.overallAssessment === 'satisfactory' 
                ? 'bg-green-500/20 ring-2 ring-green-500/30' 
                : formData.overallAssessment === 'unsatisfactory'
                ? 'bg-red-500/20 ring-2 ring-red-500/30'
                : 'bg-elec-yellow/20 ring-2 ring-elec-yellow/30'
            }`}>
              {React.cloneElement(getAssessmentIcon(), { className: 'h-7 w-7' })}
            </div>
            <div className="flex-1 space-y-2">
              <span className={`text-xl font-semibold tracking-tight ${getOverallAssessmentColor()}`}>
                {formData.overallAssessment === 'satisfactory' && 'Installation is Satisfactory'}
                {formData.overallAssessment === 'unsatisfactory' && 'Installation is Unsatisfactory'}
                {!formData.overallAssessment && 'Assessment Pending'}
              </span>
              <p className={`text-sm leading-relaxed ${
                formData.overallAssessment === 'satisfactory' ? 'text-green-100/90' :
                formData.overallAssessment === 'unsatisfactory' ? 'text-red-100/90' :
                'text-amber-100/80'
              }`}>
                {formData.overallAssessment === 'satisfactory' && 
                  'The electrical installation is in a satisfactory condition for continued service.'}
                {formData.overallAssessment === 'unsatisfactory' && 
                  'The electrical installation requires attention. Refer to observations and recommendations.'}
                {!formData.overallAssessment && 
                  'Complete the inspection and select an overall assessment to proceed with certificate generation.'}
              </p>
              {formData.overallAssessment && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-current/10">
                  <span className="text-xs font-medium opacity-70">BS 7671 Compliant</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form completion status */}
        <div className={`p-6 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 ${
          isFormComplete() 
            ? 'border-green-500/40 bg-gradient-to-br from-green-500/10 to-green-600/5 shadow-lg shadow-green-500/10' 
            : 'border-border/50 bg-gradient-to-br from-neutral-800/50 to-neutral-900/30'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-lg ${
              isFormComplete() 
                ? 'bg-green-500/20 ring-2 ring-green-500/30' 
                : 'bg-muted/30 ring-2 ring-neutral-600/20'
            }`}>
              <FileText className={`h-6 w-6 ${isFormComplete() ? 'text-green-400' : 'text-elec-yellow'}`} />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <span className="text-lg font-semibold text-foreground tracking-tight">Form Completion Status</span>
                <p className={`text-sm mt-1.5 ${isFormComplete() ? 'text-green-100/80' : 'text-muted-foreground'}`}>
                  {isFormComplete() 
                    ? 'All required fields completed. Ready to generate certificate.'
                    : 'Complete all required fields before generating the final certificate.'}
                </p>
              </div>
              
              {!isFormComplete() && (
                <div className="space-y-2 pt-2 border-t border-border/30">
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Required Fields:</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-elec-yellow" />
                      Client name and installation address
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-elec-yellow" />
                      Inspection date
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-elec-yellow" />
                      Inspector details and signatures
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-elec-yellow" />
                      Overall assessment selection
                    </li>
                  </ul>
                </div>
              )}
              
              {isFormComplete() && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Form validated and ready</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-8 rounded-xl border-2 border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/10 via-amber-500/5 to-neutral-800/50 backdrop-blur-sm shadow-xl shadow-elec-yellow/10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-elec-yellow/20 ring-2 ring-elec-yellow/30">
                <FileText className="h-7 w-7 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground tracking-tight">Generate Certificate</h3>
                <p className="text-sm text-neutral-300 mt-1">
                  Create your professional EICR certificate compliant with BS 7671
                </p>
                {formData.reportReference && (
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <span className="font-medium">Certificate No:</span>
                      <span className="text-elec-yellow font-mono">{formData.reportReference}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <span className="font-medium">Date:</span>
                      <span className="text-foreground">{formData.inspectionDate || new Date().toLocaleDateString('en-GB')}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                className="h-12 px-6 gap-2.5 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold shadow-lg shadow-elec-yellow/20 transition-all duration-200 hover:shadow-elec-yellow/30 hover:scale-[1.02]"
                onClick={handleGenerateCertificate}
                disabled={!isFormComplete()}
              >
                <FileDown className="h-5 w-5" />
                Generate PDF
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 gap-2.5 border-border bg-card/50 hover:bg-muted/50 transition-all duration-200 hover:border-neutral-500"
                onClick={handleSaveDraft}
              >
                <Save className="h-5 w-5" />
                Save Draft
              </Button>
            </div>

            {/* DEV ONLY: Fill all fields button */}
            {import.meta.env.DEV && (
              <div className="pt-4 border-t border-purple-500/20">
                <Button
                  variant="outline"
                  className="w-full h-12 gap-2.5 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-200"
                  onClick={handleDevFillAllFields}
                >
                  <Beaker className="h-5 w-5" />
                  DEV: Fill All Fields for Testing
                </Button>
                <p className="text-xs text-purple-300/60 mt-2 text-center">
                  Populates 95+ fields with realistic UK test data
                </p>
              </div>
            )}

            {!isFormComplete() && (
              <div className="pt-4 border-t border-elec-yellow/10">
                <p className="text-xs text-amber-300/70 flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Complete all required fields to enable certificate generation
                </p>
              </div>
            )}
          </div>
        </div>

        {/* JSON Data Viewer */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <Collapsible open={isJsonOpen} onOpenChange={handleToggleJsonPreview}>
            <div className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:border-border/50 transition-colors">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-muted/50">
                  {isJsonOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  <span className="font-medium">Developer Tools: Raw JSON Data</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({formattedJsonPreview ? `${Math.round(formattedJsonPreview.length / 1024)}KB` : '...'})
                  </span>
                </Button>
              </CollapsibleTrigger>
              {isJsonOpen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyJson}
                  className="flex items-center gap-2 border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                >
                  <Copy className="h-4 w-4" />
                  Copy JSON
                </Button>
              )}
            </div>
            <CollapsibleContent className="mt-3">
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
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      </Card>

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
                          // Fetch PDF as blob to ensure correct filename
                          const response = await fetch(pdfUrl);
                          const blob = await response.blob();
                          const blobUrl = URL.createObjectURL(blob);
                          
                          const filename = `${formData.metadata?.certificate_number || formData.certificateNumber || 'certificate'}.pdf`;
                          
                          const link = document.createElement('a');
                          link.href = blobUrl;
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          
                          // Clean up blob URL
                          setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                          
                          setShowDialog(false);
                          
                          toast({
                            title: "Certificate Completed",
                            description: "Your EICR certificate has been marked as completed.",
                          });
                        } catch (error) {
                          toast({
                            title: "Download Failed",
                            description: "Please try again or check your internet connection.",
                            variant: "destructive"
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
    </div>
  );
};

export default EICRSummary;

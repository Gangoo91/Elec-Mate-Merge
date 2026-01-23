
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, CheckCircle, XCircle, FileText, FileDown, Save, Beaker, Copy, ChevronDown, ChevronUp, Loader2, User, Mail, PenTool, Code, Receipt } from 'lucide-react';
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
import { createQuoteFromCertificate, createInvoiceFromCertificate } from '@/utils/certificateToQuote';

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const haptics = useHaptics();
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

  // Collapsible sections for mobile
  const [inspectedByOpen, setInspectedByOpen] = useState(true);
  const [authorisedByOpen, setAuthorisedByOpen] = useState(false);

  // Email hook for sending certificates via Resend
  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'EICR',
    reportId: effectiveReportId,
    certificateNumber: formData.reportReference,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.installationAddress,
    inspectionDate: formData.inspectionDate,
    overallAssessment: formData.overallAssessment,
    companyName: formData.companyName,
  });

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

  // Clear JSON cache when form data arrays change
  useEffect(() => {
    setFormattedJsonPreview('');
  }, [formData.inspectionItems, formData.scheduleOfTests, formData.defectObservations]);

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
      default: return 'text-gray-600';
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
    console.log('[PDF Generation] Starting process...');
    console.log('[PDF Generation] effectiveReportId:', effectiveReportId);
    console.log('[PDF Generation] Form data preview:', { 
      clientName: formData.clientName,
      certificateNumber: formData.certificateNumber,
      inspectionDate: formData.inspectionDate
    });
    
    setIsGenerating(true);
    setShowDialog(true);
    setPdfUrl(null);
    setGenerationError(null);
    
    try {
      // Step 1: Ensure report is saved to database first
      console.log('[PDF Generation] Step 1: Ensuring report is saved to database...');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const { reportCloud } = await import('@/utils/reportCloud');

      // Check if report exists and save/update it (non-blocking)
      let savedReportId = effectiveReportId;
      try {
        const existingReport = await reportCloud.getReportByReportId(effectiveReportId, user.id);

        if (!existingReport) {
          console.log('[PDF Generation] Creating new report in database...');
          const createResult = await reportCloud.createReport(user.id, 'eicr', formData);
          if (createResult.success && createResult.reportId) {
            savedReportId = createResult.reportId;
            console.log('[PDF Generation] Report created with ID:', savedReportId);
          } else {
            console.warn('[PDF Generation] Report save failed, continuing with PDF generation...');
          }
        } else {
          console.log('[PDF Generation] Updating existing report...');
          await reportCloud.updateReport(savedReportId, user.id, formData);
          console.log('[PDF Generation] Report updated with ID:', savedReportId);
        }
      } catch (saveError) {
        console.warn('[PDF Generation] Report save error (non-blocking):', saveError);
        // Continue with PDF generation anyway
      }
      
      // Step 2: Format the EICR data for PDF Monkey
      console.log('[PDF Generation] Step 2: Formatting data for PDF generation...');
      console.log('[EICRSummary] Raw formData keys:', Object.keys(formData));
      console.log('[EICRSummary] Critical fields in raw formData:', {
        clientName: formData.clientName || 'MISSING',
        installationAddress: formData.installationAddress || 'MISSING',
        inspectorName: formData.inspectorName || 'MISSING',
        certificateNumber: formData.certificateNumber || 'MISSING'
      });
      
      const formattedJson = await formatEICRJson(formData, savedReportId);
      console.log('[PDF Generation] Formatted EICR JSON (first 200 chars):', JSON.stringify(formattedJson).substring(0, 200));
      console.log('[PDF Generation] Required fields check:', {
        clientName: formattedJson.client_details?.client_name,
        installationAddress: formattedJson.installation_details?.address,
        inspectorName: formattedJson.inspector?.name
      });

      // Critical debug: flat inspection keys
      const allKeys = Object.keys(formattedJson);
      const flatInspKeys = allKeys.filter(k => k.startsWith('insp_'));
      console.log('[PDF Generation] ========== FLAT KEYS DEBUG ==========');
      console.log('[PDF Generation] Total keys in formattedJson:', allKeys.length);
      console.log('[PDF Generation] Flat inspection keys count:', flatInspKeys.length);
      console.log('[PDF Generation] Sample flat keys:', flatInspKeys.slice(0, 10));
      console.log('[PDF Generation] insp_1_0_acc:', (formattedJson as any).insp_1_0_acc);
      console.log('[PDF Generation] insp_3_5_acc:', (formattedJson as any).insp_3_5_acc);
      console.log('[PDF Generation] inspection_debug_test:', (formattedJson as any).inspection_debug_test);
      console.log('[PDF Generation] =================================================');

      // Step 3: Call the edge function
      console.log('[PDF Generation] Step 3: Calling edge function generate-eicr-pdf...');
      console.log('[PDF Generation] Sending payload with keys:', Object.keys({ formData: formattedJson }));
      
      const { data, error } = await supabase.functions.invoke('generate-eicr-pdf', {
        body: { formData: formattedJson }
      });

      console.log('[PDF Generation] Edge function raw response:', JSON.stringify(data));
      console.log('[PDF Generation] Edge function error:', error);

      // Check for errors - either from Supabase or from our edge function response
      if (error) {
        console.error('[PDF Generation] Edge function invocation error:', error);
        // Try to get more details from the error context
        const errorDetail = error.context?.body ? JSON.stringify(error.context.body) : error.message;
        throw new Error(`Edge function error: ${errorDetail}`);
      }

      // Check if the edge function returned an error in the response
      if (data?.success === false || data?.error) {
        console.error('[PDF Generation] Edge function returned error:', data.error);
        throw new Error(`PDF Monkey error: ${data.error || 'Unknown error'}`);
      }

      // Try multiple response formats
      const pdfUrlFromResponse = data?.pdfUrl || data?.pdf_url || data?.url || data?.data?.pdfUrl || data?.downloadUrl;
      
      console.log('[PDF Generation] Extracted PDF URL:', pdfUrlFromResponse);
      
      if (!pdfUrlFromResponse) {
        console.error('[PDF Generation] Edge function succeeded but returned no PDF URL. Full response:', data);
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
          formData.reportReference || formData.certificateNumber
        );
        permanentUrl = storageResult.permanentUrl;
        storagePath = storageResult.storagePath;
        console.log('[PDF Generation] PDF saved to permanent storage:', storagePath);
      } catch (storageError) {
        console.error('[PDF Generation] Failed to save PDF permanently, using temp URL:', storageError);
        // Continue with temp URL - user can still download, just won't persist long-term
      }

      setPdfUrl(permanentUrl);

      // Step 6: Save PDF URL to database using the SAVED report_id
      console.log('[PDF Generation] Step 6: Saving PDF URL to database for report_id:', savedReportId);

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
        console.error('[PDF Generation] CRITICAL: Failed to save PDF URL to database:', updateError);
        console.error('[PDF Generation] Update attempted for report_id:', savedReportId);
        console.error('[PDF Generation] PDF URL that failed to save:', permanentUrl);

        // Still show the PDF to user, but warn them
        toast({
          title: "Warning",
          description: "PDF generated but not saved to your account. Please save manually.",
          variant: "destructive"
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
        title: "Certificate generated",
        description: storagePath
          ? "Your EICR certificate has been saved permanently."
          : "Your EICR certificate is ready for download.",
      });

      // Check if customer already exists in pool
      const existingCustomer = customers.find(
        c => c.name.toLowerCase() === formData.clientName?.toLowerCase()
      );

      // If customer doesn't exist, show prompt to save
      if (!existingCustomer && formData.clientName) {
        setSavedReportIdForCustomer(savedReportId);
        setShowCustomerDialog(true);
      }
    } catch (error) {
      console.error('Cloud PDF generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setGenerationError(errorMessage);

      // Show the error to user - NO FALLBACK so we can debug
      toast({
        title: "PDF Generation Failed",
        description: `PDF Monkey error: ${errorMessage}. Check console for details.`,
        variant: "destructive",
        duration: 10000
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

  // Email send handler - ensures report is saved before emailing
  const handleSendEmail = async (email: string, cc?: string[], message?: string) => {
    // First, ensure report is saved to database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Please log in to send certificates.');
      }

      const { reportCloud } = await import('@/utils/reportCloud');

      // Check if report exists, if not save it first
      const existingReport = await reportCloud.getReportByReportId(effectiveReportId, user.id);
      if (!existingReport) {
        console.log('[Email] Report not found in database, saving first...');
        const createResult = await reportCloud.createReport(user.id, 'eicr', formData);
        if (!createResult.success) {
          throw new Error('Failed to save report before emailing. Please try again.');
        }
        console.log('[Email] Report saved:', createResult.reportId);
      } else {
        // Update existing report with latest data
        await reportCloud.updateReport(effectiveReportId, user.id, formData);
        console.log('[Email] Report updated before emailing');
      }
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
      certificateReference: formData.reportReference || '',
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
      certificateReference: formData.reportReference || '',
      reportId: effectiveReportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Allow PDF generation without strict field validation
  const isFormComplete = () => {
    return true;
  };

  // DEV ONLY: Fill all required fields for quick PDF testing
  const handleDevFillAllFields = () => {
    const today = new Date().toISOString().split('T')[0];
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 5);
    const nextInspection = futureDate.toISOString().split('T')[0];

    // A simple signature placeholder (small transparent data URL)
    const devSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAYAAACqNX6+AAAABHNCSVQICAgIfAhkiAAAADl0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4xLjEsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy8QZhcZAAAA00lEQVR4nO3XMQ6AIBQFQNj/TusFvBQWJBQkxmjhzEyL0r9J/gIAAAAAAAC+qiY+s5vnPP25/+f6s+z6fV37OefY7fN+79f1s65z7vp5v/frpSfnAICdxQEAq7MBAJY0DgBgSeoAgCWNAwCWNI4AANiTOgJgSeqIgCWpIwKWpA4AWJI6AGBJ6gCAJakDAJakDgBYkjoAYEnqAIAlqQMAlqQOAFiSOgBgSeoAgCWpAwCWpA4AWJI6AGBJ6gCAJakDAJakDgBYkjoAYEnqAIAlqQMAAAAAwHp/8nwMH37tpDsAAAAASUVORK5CYII=';

    // Client & Installation Details
    onUpdate('clientName', 'John Smith');
    onUpdate('clientEmail', 'john.smith@example.com');
    onUpdate('clientPhone', '07700 900123');
    onUpdate('clientAddress', '123 Test Street, London, SW1A 1AA');
    onUpdate('installationAddress', '456 Installation Road, Manchester, M1 2AB');

    // Description of Premises
    onUpdate('description', 'domestic');
    onUpdate('estimatedAge', '15');
    onUpdate('ageUnit', 'years');
    onUpdate('evidenceOfAlterations', 'yes');
    onUpdate('lastInspectionType', 'known');
    onUpdate('dateOfLastInspection', '2019-06-15');

    // Purpose & Inspection Details
    onUpdate('purposeOfInspection', 'Periodic inspection');
    onUpdate('inspectionDate', today);
    onUpdate('inspectionInterval', '5');
    onUpdate('nextInspectionDate', nextInspection);
    onUpdate('extentOfInspection', 'Full installation including consumer unit and all circuits');
    onUpdate('limitationsOfInspection', 'None - full access provided');

    // Supply & Earthing Characteristics
    onUpdate('earthingArrangement', 'TN-C-S');
    onUpdate('dnoName', 'UK Power Networks');
    onUpdate('mpan', '1234567890123');
    onUpdate('cutoutLocation', 'Under stairs cupboard');
    onUpdate('serviceEntry', 'Underground');
    onUpdate('supplyVoltage', '230');
    onUpdate('supplyFrequency', '50');
    onUpdate('phases', 'Single');
    onUpdate('supplyPME', 'Yes');
    onUpdate('earthElectrodeType', 'Rod');

    // Main Protective Device
    onUpdate('mainProtectiveDevice', '100A BS 88-3');
    onUpdate('rcdMainSwitch', 'Yes');
    onUpdate('rcdRating', '100');

    // Main Earthing Conductor
    onUpdate('mainEarthingConductorType', 'Cu');
    onUpdate('mainEarthingConductorSize', '16');

    // Main Protective Bonding
    onUpdate('mainBondingConductorType', 'Cu');
    onUpdate('mainBondingSize', '10');
    onUpdate('bondingCompliance', 'Satisfactory');
    onUpdate('mainBondingLocations', 'Water, Gas, Oil, Structural Steel');
    onUpdate('supplementaryBondingSize', '4');
    onUpdate('equipotentialBonding', 'Satisfactory');

    // Consumer Unit / Distribution Board
    onUpdate('boardSize', '18 Way');
    onUpdate('cuType', 'Metal clad');
    onUpdate('cuLocation', 'Under stairs');
    onUpdate('cuManufacturer', 'Hager');
    onUpdate('intakeCableSize', '25');
    onUpdate('intakeCableType', 'PVC/SWA');
    onUpdate('tailsSize', '25');
    onUpdate('tailsLength', '3');

    // Distribution Board Verification
    onUpdate('dbReference', 'Main CU');
    onUpdate('zdb', '0.15');
    onUpdate('ipf', '4.5');
    onUpdate('confirmedCorrectPolarity', true);
    onUpdate('confirmedPhaseSequence', true);
    onUpdate('spdOperationalStatus', true);

    // Inspector Details
    onUpdate('inspectorName', 'James Wilson');
    onUpdate('inspectorQualifications', 'City & Guilds 2391-52, 18th Edition');
    onUpdate('companyName', 'Wilson Electrical Services Ltd');
    onUpdate('companyAddress', '789 Contractor Lane, Birmingham, B1 1AA');
    onUpdate('companyPhone', '0121 123 4567');
    onUpdate('companyEmail', 'info@wilsonelectrical.co.uk');
    onUpdate('registrationScheme', 'NICEIC');
    onUpdate('registrationNumber', 'NIC123456');
    onUpdate('inspectorSignature', devSignature);

    // Test Instrument
    onUpdate('testInstrumentMake', 'Megger MFT1741');
    onUpdate('testInstrumentSerial', 'SN-2024-001234');
    onUpdate('calibrationDate', '2024-01-15');
    onUpdate('testTemperature', '20');

    // Overall Assessment
    onUpdate('overallAssessment', 'satisfactory');
    onUpdate('satisfactoryForContinuedUse', 'yes');
    onUpdate('additionalComments', 'Installation in good condition. Minor recommendations for improvement included in observations.');

    // Authorisation - Inspected By
    onUpdate('inspectedByName', 'JAMES WILSON');
    onUpdate('inspectedBySignature', devSignature);
    onUpdate('inspectedByForOnBehalfOf', 'Wilson Electrical Services Ltd');
    onUpdate('inspectedByPosition', 'Senior Electrician');
    onUpdate('inspectedByAddress', '789 Contractor Lane, Birmingham, B1 1AA');
    onUpdate('inspectedByCpScheme', 'NICEIC');

    // Authorisation - Report Authorised By
    onUpdate('reportAuthorisedByName', 'JAMES WILSON');
    onUpdate('reportAuthorisedBySignature', devSignature);
    onUpdate('reportAuthorisedByDate', today);
    onUpdate('reportAuthorisedByForOnBehalfOf', 'Wilson Electrical Services Ltd');
    onUpdate('reportAuthorisedByPosition', 'Managing Director');
    onUpdate('reportAuthorisedByAddress', '789 Contractor Lane, Birmingham, B1 1AA');
    onUpdate('reportAuthorisedByMembershipNo', 'NIC123456');

    // ====== 10 COMPREHENSIVE CIRCUITS - SCHEDULE OF TESTS ======
    const comprehensiveTestResults = [
      {
        id: crypto.randomUUID(),
        circuitNumber: '1',
        circuitDescription: 'Ring Final - Kitchen Sockets',
        circuitType: 'Ring Final',
        typeOfWiring: 'Twin & CPC',
        referenceMethod: 'C',
        pointsServed: '12',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 61009-1',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        maxZs: '1.37',
        protectiveDeviceLocation: 'Main CU',
        rcdBsStandard: 'BS EN 61008-1',
        rcdType: 'Type A',
        rcdRating: '30',
        rcdRatingA: '30',
        ringR1: '0.26',
        ringRn: '0.27',
        ringR2: '0.43',
        r1r2: '0.31',
        r2: '0.21',
        ringContinuityLive: '0.26',
        ringContinuityNeutral: '0.27',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.42',
        rcdOneX: '18',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        rcdHalfX: 'N/A',
        rcdFiveX: '14',
        pfc: '2.1',
        pfcLiveNeutral: '2.1',
        pfcLiveEarth: '1.9',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C1',
        type: 'RCBO',
        cableSize: '2.5',
        protectiveDevice: 'B32'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '2',
        circuitDescription: 'Ring Final - Living Room Sockets',
        circuitType: 'Ring Final',
        typeOfWiring: 'Twin & CPC',
        referenceMethod: 'C',
        pointsServed: '10',
        liveSize: '2.5',
        cpcSize: '1.5',
        bsStandard: 'BS EN 61009-1',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        maxZs: '1.37',
        protectiveDeviceLocation: 'Main CU',
        rcdBsStandard: 'BS EN 61008-1',
        rcdType: 'Type A',
        rcdRating: '30',
        rcdRatingA: '30',
        ringR1: '0.32',
        ringRn: '0.33',
        ringR2: '0.52',
        r1r2: '0.38',
        r2: '0.26',
        ringContinuityLive: '0.32',
        ringContinuityNeutral: '0.33',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.51',
        rcdOneX: '19',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '1.8',
        pfcLiveNeutral: '1.8',
        pfcLiveEarth: '1.6',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C2',
        type: 'RCBO',
        cableSize: '2.5',
        protectiveDevice: 'B32'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '3',
        circuitDescription: 'Cooker Circuit',
        circuitType: 'Radial',
        typeOfWiring: 'Twin & CPC',
        referenceMethod: 'C',
        pointsServed: '1',
        liveSize: '6.0',
        cpcSize: '2.5',
        bsStandard: 'BS EN 60898-1',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '40',
        protectiveDeviceKaRating: '6',
        maxZs: '0.57',
        protectiveDeviceLocation: 'Main CU',
        rcdBsStandard: 'N/A',
        rcdType: 'N/A',
        rcdRating: 'N/A',
        rcdRatingA: 'N/A',
        ringR1: 'N/A',
        ringRn: 'N/A',
        ringR2: 'N/A',
        r1r2: '0.18',
        r2: '0.12',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '0.33',
        rcdOneX: 'N/A',
        rcdTestButton: 'N/A',
        afddTest: 'N/A',
        pfc: '3.5',
        pfcLiveNeutral: '3.5',
        pfcLiveEarth: '3.2',
        functionalTesting: 'Pass',
        notes: 'Cooker control unit tested',
        circuitDesignation: 'C3',
        type: 'MCB',
        cableSize: '6.0',
        protectiveDevice: 'B40'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '4',
        circuitDescription: 'Lighting - Ground Floor',
        circuitType: 'Radial',
        typeOfWiring: 'Twin & CPC',
        referenceMethod: 'B',
        pointsServed: '8',
        liveSize: '1.5',
        cpcSize: '1.0',
        bsStandard: 'BS EN 61009-1',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        maxZs: '7.28',
        protectiveDeviceLocation: 'Main CU',
        rcdBsStandard: 'BS EN 61008-1',
        rcdType: 'Type AC',
        rcdRating: '30',
        rcdRatingA: '30',
        ringR1: 'N/A',
        ringRn: 'N/A',
        ringR2: 'N/A',
        r1r2: '0.92',
        r2: '0.62',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '1.05',
        rcdOneX: '22',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '1.2',
        pfcLiveNeutral: '1.2',
        pfcLiveEarth: '1.1',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C4',
        type: 'RCBO',
        cableSize: '1.5',
        protectiveDevice: 'B6'
      },
      {
        id: crypto.randomUUID(),
        circuitNumber: '5',
        circuitDescription: 'Lighting - First Floor',
        circuitType: 'Radial',
        typeOfWiring: 'Twin & CPC',
        referenceMethod: 'B',
        pointsServed: '7',
        liveSize: '1.5',
        cpcSize: '1.0',
        bsStandard: 'BS EN 61009-1',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        maxZs: '7.28',
        protectiveDeviceLocation: 'Main CU',
        rcdBsStandard: 'BS EN 61008-1',
        rcdType: 'Type AC',
        rcdRating: '30',
        rcdRatingA: '30',
        r1r2: '1.15',
        r2: '0.78',
        insulationTestVoltage: '500',
        insulationLiveNeutral: '>200',
        insulationLiveEarth: '>200',
        insulationResistance: '>200',
        insulationNeutralEarth: '>200',
        polarity: '✓',
        zs: '1.28',
        rcdOneX: '21',
        rcdTestButton: '✓',
        afddTest: 'N/A',
        pfc: '1.0',
        functionalTesting: 'Pass',
        notes: '',
        circuitDesignation: 'C5',
        type: 'RCBO',
        cableSize: '1.5',
        protectiveDevice: 'B6'
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
    <div className={cn("space-y-6", isMobile && "-mx-4")}>
      {/* Overall Assessment Section - Edge to Edge */}
      <div>
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger className="w-full" asChild>
            <button
              onClick={() => haptics.tap()}
              className={cn(
                "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
                "bg-card/50 border-y border-border/30",
                "active:bg-card/80"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
                formData.overallAssessment === 'satisfactory' ? "bg-green-500/20" :
                formData.overallAssessment === 'unsatisfactory' ? "bg-red-500/20" :
                "bg-elec-yellow/20"
              )}>
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
                  {formData.overallAssessment === 'satisfactory' ? 'Installation Satisfactory' :
                   formData.overallAssessment === 'unsatisfactory' ? 'Installation Unsatisfactory' :
                   'Select assessment status'}
                </p>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn("p-4 space-y-4", isMobile ? "" : "px-6")}>
              {/* Assessment Toggle Buttons */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Overall Assessment *</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      onUpdate('overallAssessment', 'satisfactory');
                      haptics.success();
                    }}
                    className={cn(
                      "h-14 rounded-xl font-semibold transition-all touch-manipulation",
                      "flex flex-col items-center justify-center gap-1 active:scale-95",
                      formData.overallAssessment === 'satisfactory'
                        ? "bg-green-500 text-white ring-2 ring-green-500/50 ring-offset-2 ring-offset-background"
                        : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20"
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
                      "h-14 rounded-xl font-semibold transition-all touch-manipulation",
                      "flex flex-col items-center justify-center gap-1 active:scale-95",
                      formData.overallAssessment === 'unsatisfactory'
                        ? "bg-red-500 text-white ring-2 ring-red-500/50 ring-offset-2 ring-offset-background"
                        : "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                    )}
                  >
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm">Unsatisfactory</span>
                  </button>
                </div>
              </div>

              {/* Continued Use Toggle Buttons */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Satisfactory for Continued Use *</Label>
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
                        "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                        "active:scale-95",
                        formData.satisfactoryForContinuedUse === option.value
                          ? "bg-elec-yellow text-black"
                          : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Comments */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Additional Comments</Label>
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
        <div className={cn("p-4 bg-blue-500/10 border-y border-blue-500/20", isMobile ? "" : "mx-4 rounded-lg border")}>
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
                title: "Details copied",
                description: "Inspector details copied to 'Inspected By' section"
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
        <Collapsible open={inspectedByOpen} onOpenChange={(open) => { haptics.tap(); setInspectedByOpen(open); }}>
          <CollapsibleTrigger className="w-full" asChild>
            <button className={cn(
              "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
              "bg-card/50 border-y border-border/30",
              inspectedByOpen && "bg-card/80",
              "active:bg-card/90"
            )}>
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
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                inspectedByOpen && "rotate-180"
              )} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn("p-4 space-y-4 bg-card/30", isMobile ? "" : "px-6")}>
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
                    className={cn("flex-1 h-11 text-base touch-manipulation bg-card/50 border-border/30", formData.inspectedByCpSchemeNA && 'opacity-50')}
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
                      "h-11 px-4 rounded-lg font-medium transition-all touch-manipulation",
                      formData.inspectedByCpSchemeNA
                        ? "bg-gray-500 text-white"
                        : "bg-gray-500/10 text-gray-400 border border-gray-500/30"
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
        <Collapsible open={authorisedByOpen} onOpenChange={(open) => { haptics.tap(); setAuthorisedByOpen(open); }}>
          <CollapsibleTrigger className="w-full" asChild>
            <button className={cn(
              "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
              "bg-card/50 border-y border-border/30",
              authorisedByOpen && "bg-card/80",
              "active:bg-card/90"
            )}>
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
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                authorisedByOpen && "rotate-180"
              )} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn("p-4 space-y-4 bg-card/30", isMobile ? "" : "px-6")}>
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
                      title: "Details copied",
                      description: "Copied from 'Inspected By' section"
                    });
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all touch-manipulation",
                  formData.sameAsInspectedBy
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-border/30 bg-card/30"
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
                  <Label className="text-sm font-medium text-foreground/80">Name (Capitals) *</Label>
                  <Input
                    value={formData.reportAuthorisedByName || ''}
                    onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
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
      <div className={cn(
        "border-y border-border/30 bg-card/50",
        isMobile ? "p-4" : "p-6 mx-4 rounded-xl border"
      )}>
        {/* Status Summary */}
        <div className={cn(
          "flex items-center gap-3 mb-4 p-3 rounded-lg",
          formData.overallAssessment === 'satisfactory'
            ? 'bg-green-500/10 border border-green-500/20'
            : formData.overallAssessment === 'unsatisfactory'
            ? 'bg-red-500/10 border border-red-500/20'
            : 'bg-elec-yellow/10 border border-elec-yellow/20'
        )}>
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
            formData.overallAssessment === 'satisfactory' ? 'bg-green-500/20' :
            formData.overallAssessment === 'unsatisfactory' ? 'bg-red-500/20' :
            'bg-elec-yellow/20'
          )}>
            {formData.overallAssessment === 'satisfactory' ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : formData.overallAssessment === 'unsatisfactory' ? (
              <XCircle className="h-5 w-5 text-red-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-semibold",
              formData.overallAssessment === 'satisfactory' ? 'text-green-400' :
              formData.overallAssessment === 'unsatisfactory' ? 'text-red-400' :
              'text-elec-yellow'
            )}>
              {formData.overallAssessment === 'satisfactory' && 'Satisfactory'}
              {formData.overallAssessment === 'unsatisfactory' && 'Unsatisfactory'}
              {!formData.overallAssessment && 'Assessment Pending'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isFormComplete() ? 'Ready to generate certificate' : 'Complete all required fields'}
            </p>
          </div>
          {formData.reportReference && (
            <span className="text-xs font-mono text-muted-foreground hidden sm:block">
              {formData.reportReference}
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
            disabled={!isFormComplete()}
          >
            <FileDown className="h-5 w-5" />
            Generate PDF Certificate
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
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 gap-2 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 transition-all duration-200 active:scale-95 touch-manipulation"
              onClick={handleCreateQuote}
            >
              <FileText className="h-4 w-4" />
              Quote
            </Button>
            <Button
              variant="outline"
              className="h-12 gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400 transition-all duration-200 active:scale-95 touch-manipulation"
              onClick={handleCreateInvoice}
            >
              <Receipt className="h-4 w-4" />
              Invoice
            </Button>
          </div>

          {/* DEV ONLY: Quick fill button for testing */}
          {import.meta.env.DEV && (
            <Button
              variant="outline"
              className="w-full h-10 gap-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 touch-manipulation"
              onClick={handleDevFillAllFields}
            >
              <Beaker className="h-4 w-4" />
              DEV: Fill All Fields
            </Button>
          )}

          {!isFormComplete() && (
            <p className="text-xs text-amber-300/70 flex items-center justify-center gap-2 pt-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              Complete all required fields
            </p>
          )}
        </div>
      </div>

      {/* JSON Data Viewer - Hidden on Mobile */}
      <div className={cn("hidden sm:block", isMobile ? "px-4" : "")}>
        <Collapsible open={isJsonOpen} onOpenChange={handleToggleJsonPreview}>
          <CollapsibleTrigger className="w-full" asChild>
            <button
              onClick={() => haptics.tap()}
              className={cn(
                "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
                "bg-card/30 border-y border-border/30",
                "active:bg-card/50"
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-gray-500/20 flex items-center justify-center flex-shrink-0">
                <Code className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Developer Tools</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Raw JSON Data ({formattedJsonPreview ? `${Math.round(formattedJsonPreview.length / 1024)}KB` : '...'})
                </p>
              </div>
              <ChevronDown className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                isJsonOpen && "rotate-180"
              )} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn("p-4 bg-card/30", isMobile ? "" : "px-6")}>
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
                          console.error('Download error:', error);
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
        certificateNumber={formData.reportReference}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.installationAddress}
        inspectionDate={formData.inspectionDate}
        overallAssessment={formData.overallAssessment}
        companyName={formData.companyName}
        onSend={handleSendEmail}
        isLoading={isEmailSending}
      />
    </div>
  );
};

export default EICRSummary;

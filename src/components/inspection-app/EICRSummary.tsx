
import React, { useState } from 'react';
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

const EICRSummary = ({ formData, onUpdate }: EICRSummaryProps) => {
  const { effectiveReportId } = useEICRForm();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [formattedJsonPreview, setFormattedJsonPreview] = useState<string>('');

  // Load formatted JSON when collapsible is opened
  const handleToggleJsonPreview = async (isOpen: boolean) => {
    setIsJsonOpen(isOpen);
    if (isOpen && !formattedJsonPreview) {
      const formattedJson = await formatEICRJson(formData, effectiveReportId);
      setFormattedJsonPreview(JSON.stringify(formattedJson, null, 2));
    }
  };

  const handleCopyJson = async () => {
    const formattedJson = await formatEICRJson(formData, effectiveReportId);
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

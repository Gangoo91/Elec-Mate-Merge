/**
 * EICRCertificateTab
 *
 * Redesigned certificate completion tab for EICR workflow.
 * Features animated hero, progress stepper, and sticky actions.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  User,
  CheckCircle,
  Copy,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Certificate completion components
import {
  CertificateSummaryHero,
  CertificateCompletionProgress,
  CertificateActionsBar,
  EmailCertificateDialog,
  CompletionStep
} from '@/components/certificate-completion';

// Signature component
import SignatureInput from '@/components/signature/SignatureInput';

// Context
import { useEICRForm } from '../eicr/EICRFormProvider';

// Utils
import { exportCompleteEICRToPDF } from '@/utils/pdfExport';
import { formatEICRJson } from '@/utils/eicrJsonFormatter';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';

interface EICRCertificateTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export const EICRCertificateTab: React.FC<EICRCertificateTabProps> = ({
  formData,
  onUpdate,
}) => {
  const { effectiveReportId } = useEICRForm();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(true);
  const [isSignaturesOpen, setIsSignaturesOpen] = useState(true);

  // Email hook
  const certificateEmail = useCertificateEmail({
    certificateType: 'EICR',
    reportId: effectiveReportId,
    certificateNumber: formData.reportReference || formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.installationAddress,
    inspectionDate: formData.inspectionDate,
    overallAssessment: formData.overallAssessment,
    companyName: formData.companyName,
  });

  // Calculate completion percentage
  const completionData = useMemo(() => {
    const requiredFields = {
      details: ['clientName', 'installationAddress', 'inspectionDate'],
      inspection: ['inspectionItems'],
      testing: ['testResults'],
      signatures: ['inspectedBySignature', 'reportAuthorisedBySignature'],
    };

    let completed = 0;
    let total = 0;

    // Details
    const detailsComplete = requiredFields.details.every(f =>
      formData[f] && String(formData[f]).trim() !== ''
    );

    // Inspection
    const inspectionComplete = formData.inspectionItems && formData.inspectionItems.length > 0;

    // Testing
    const testingComplete = formData.testResults && formData.testResults.length > 0;

    // Signatures
    const signaturesComplete = requiredFields.signatures.every(f =>
      formData[f] && String(formData[f]).trim() !== ''
    );

    // Assessment
    const assessmentComplete = formData.overallAssessment && formData.satisfactoryForContinuedUse;

    // Calculate percentage
    const checks = [detailsComplete, inspectionComplete, testingComplete, signaturesComplete, assessmentComplete];
    completed = checks.filter(Boolean).length;
    total = checks.length;

    return {
      percentage: Math.round((completed / total) * 100),
      detailsComplete,
      inspectionComplete,
      testingComplete,
      signaturesComplete,
      assessmentComplete,
    };
  }, [formData]);

  // Build completion steps
  const completionSteps: CompletionStep[] = useMemo(() => [
    {
      id: 'details',
      label: 'Client Details',
      shortLabel: 'Details',
      isComplete: completionData.detailsComplete,
      missingItems: completionData.detailsComplete ? undefined : [
        !formData.clientName && 'Client name',
        !formData.installationAddress && 'Installation address',
        !formData.inspectionDate && 'Inspection date',
      ].filter(Boolean) as string[],
    },
    {
      id: 'inspection',
      label: 'Inspection',
      shortLabel: 'Inspect',
      isComplete: completionData.inspectionComplete,
      missingItems: completionData.inspectionComplete ? undefined : ['Complete inspection checklist'],
    },
    {
      id: 'testing',
      label: 'Testing',
      shortLabel: 'Testing',
      isComplete: completionData.testingComplete,
      missingItems: completionData.testingComplete ? undefined : ['Add test results'],
    },
    {
      id: 'signatures',
      label: 'Signatures',
      shortLabel: 'Sign',
      isComplete: completionData.signaturesComplete && completionData.assessmentComplete,
      missingItems: (completionData.signaturesComplete && completionData.assessmentComplete) ? undefined : [
        !formData.overallAssessment && 'Overall assessment',
        !formData.inspectedBySignature && 'Inspected by signature',
        !formData.reportAuthorisedBySignature && 'Authorised by signature',
      ].filter(Boolean) as string[],
    },
  ], [completionData, formData]);

  // Count observations
  const observationCounts = useMemo(() => {
    const observations = formData.defectObservations || [];
    return {
      total: observations.length,
      c1: observations.filter((o: any) => o.code === 'C1').length,
      c2: observations.filter((o: any) => o.code === 'C2').length,
      c3: observations.filter((o: any) => o.code === 'C3').length,
    };
  }, [formData.defectObservations]);

  // Check if form can generate certificate
  const canGenerate = useMemo(() => {
    return completionData.detailsComplete &&
           completionData.signaturesComplete &&
           formData.overallAssessment;
  }, [completionData, formData.overallAssessment]);

  // Get disabled reason
  const disabledReason = useMemo(() => {
    if (!completionData.detailsComplete) return 'Complete client details first';
    if (!formData.overallAssessment) return 'Select overall assessment';
    if (!completionData.signaturesComplete) return 'Add required signatures';
    return undefined;
  }, [completionData, formData.overallAssessment]);

  // Handle certificate generation
  const handleGenerateCertificate = useCallback(async () => {
    if (!canGenerate) return;

    haptics.tap();
    setIsGenerating(true);

    try {
      // Validate required fields
      const missingFields = [];
      if (!formData.clientName?.trim()) missingFields.push('Client Name');
      if (!formData.installationAddress?.trim()) missingFields.push('Installation Address');
      if (!formData.inspectorName?.trim()) missingFields.push('Inspector Name');

      if (missingFields.length > 0) {
        haptics.error();
        toast({
          title: 'Cannot generate PDF',
          description: `Please complete: ${missingFields.join(', ')}`,
          variant: 'destructive',
        });
        return;
      }

      // Get user and save report
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { reportCloud } = await import('@/utils/reportCloud');

      // Save/update report
      let savedReportId = effectiveReportId;
      const existingReport = await reportCloud.getReportByReportId(effectiveReportId, user.id);

      if (!existingReport) {
        const createResult = await reportCloud.createReport(user.id, 'eicr', formData);
        if (!createResult.success || !createResult.reportId) {
          throw new Error('Failed to save report');
        }
        savedReportId = createResult.reportId;
      } else {
        await reportCloud.updateReport(savedReportId, user.id, formData);
      }

      // Format data and call edge function
      const formattedJson = await formatEICRJson(formData, savedReportId);

      const { data, error } = await supabase.functions.invoke('generate-eicr-pdf', {
        body: { formData: formattedJson }
      });

      if (error) throw new Error(error.message || 'Failed to generate PDF');

      const pdfUrl = data?.pdfUrl || data?.pdf_url || data?.url;

      if (!pdfUrl) throw new Error('No PDF URL returned');

      // Update report with PDF URL
      await supabase
        .from('reports')
        .update({
          pdf_url: pdfUrl,
          pdf_generated_at: new Date().toISOString()
        })
        .eq('report_id', savedReportId);

      // Update form state
      onUpdate('certificateGenerated', true);
      onUpdate('certificateGeneratedAt', new Date().toISOString());
      onUpdate('status', 'completed');

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });

      // Download PDF
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const filename = `${formData.reportReference || formData.certificateNumber || 'EICR'}.pdf`;
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      haptics.success();
      setIsComplete(true);
      toast({
        title: 'Certificate generated',
        description: 'Your EICR certificate is ready for download.',
      });

    } catch (error) {
      console.error('Error generating certificate:', error);
      haptics.error();

      // Try local fallback
      try {
        await exportCompleteEICRToPDF(
          formData,
          formData.inspectionItems || [],
          formData.defectObservations || []
        );

        onUpdate('certificateGenerated', true);
        onUpdate('status', 'completed');

        queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });

        toast({
          title: 'Certificate generated (local)',
          description: 'Downloaded using local PDF generator.',
        });
      } catch (localError) {
        toast({
          title: 'Generation failed',
          description: localError instanceof Error ? localError.message : 'Failed to generate certificate.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsGenerating(false);
    }
  }, [canGenerate, formData, effectiveReportId, onUpdate, queryClient, toast, haptics]);

  // Handle email
  const handleEmail = useCallback(() => {
    haptics.tap();
    setShowEmailDialog(true);
  }, [haptics]);

  // Handle save draft
  const handleSaveDraft = useCallback(() => {
    haptics.tap();
    toast({
      title: 'Saved to cloud',
      description: 'Your EICR is automatically saved.',
    });
  }, [toast, haptics]);

  // Handle copy JSON
  const handleCopyJson = useCallback(async () => {
    const formattedJson = await formatEICRJson(formData, effectiveReportId);
    navigator.clipboard.writeText(JSON.stringify(formattedJson, null, 2));
    haptics.tap();
    toast({
      title: 'JSON copied',
      description: 'Structured form data copied to clipboard.',
    });
  }, [formData, effectiveReportId, toast, haptics]);

  // Copy from inspector details
  const handleCopyFromInspector = useCallback(() => {
    haptics.tap();
    onUpdate('inspectedByName', formData.inspectorName);
    onUpdate('inspectedBySignature', formData.inspectorSignature);
    onUpdate('inspectedByForOnBehalfOf', formData.companyName);
    onUpdate('inspectedByPosition', 'Inspector');
    onUpdate('inspectedByAddress', formData.companyAddress);
    onUpdate('inspectedByCpScheme', formData.registrationScheme);
    toast({
      title: 'Details copied',
      description: 'Inspector details copied to "Inspected By" section',
    });
  }, [formData, onUpdate, toast, haptics]);

  // Same as inspected by
  const handleSameAsInspectedBy = useCallback((checked: boolean) => {
    onUpdate('sameAsInspectedBy', checked);
    if (checked) {
      haptics.tap();
      onUpdate('reportAuthorisedByName', formData.inspectedByName);
      onUpdate('reportAuthorisedBySignature', formData.inspectedBySignature);
      onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
      onUpdate('reportAuthorisedByForOnBehalfOf', formData.inspectedByForOnBehalfOf);
      onUpdate('reportAuthorisedByPosition', formData.inspectedByPosition);
      onUpdate('reportAuthorisedByAddress', formData.inspectedByAddress);
      onUpdate('reportAuthorisedByMembershipNo', formData.inspectedByCpScheme);
      toast({
        title: 'Details copied',
        description: 'Copied from "Inspected By" section',
      });
    }
  }, [formData, onUpdate, toast, haptics]);

  return (
    <div className={cn('space-y-6', isMobile && 'pb-32')}>
      {/* Hero Card */}
      <CertificateSummaryHero
        certificateType="EICR"
        certificateNumber={formData.reportReference || formData.certificateNumber}
        installationAddress={formData.installationAddress}
        inspectionDate={formData.inspectionDate}
        overallAssessment={formData.overallAssessment}
        completionPercentage={completionData.percentage}
        circuitCount={formData.testResults?.length || 0}
        observationCount={observationCounts.total}
        c1Count={observationCounts.c1}
        c2Count={observationCounts.c2}
        c3Count={observationCounts.c3}
      />

      {/* Completion Progress */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-4 sm:p-6">
          <CertificateCompletionProgress steps={completionSteps} />
        </CardContent>
      </Card>

      {/* Final Assessment Section */}
      <Collapsible open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <Card className="border-border/50 overflow-hidden">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  {formData.overallAssessment ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  )}
                  Final Assessment
                </CardTitle>
                <ChevronDown className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform',
                  isAssessmentOpen && 'rotate-180'
                )} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Overall Assessment *</Label>
                  <Select
                    value={formData.overallAssessment}
                    onValueChange={(value) => onUpdate('overallAssessment', value)}
                  >
                    <SelectTrigger className="h-11 text-base touch-manipulation">
                      <SelectValue placeholder="Select assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satisfactory">Satisfactory</SelectItem>
                      <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Satisfactory for Continued Use *</Label>
                  <Select
                    value={formData.satisfactoryForContinuedUse}
                    onValueChange={(value) => onUpdate('satisfactoryForContinuedUse', value)}
                  >
                    <SelectTrigger className="h-11 text-base touch-manipulation">
                      <SelectValue placeholder="Yes/No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes-with-recommendations">Yes, subject to recommendations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Additional Comments</Label>
                <textarea
                  className="w-full p-3 border border-input rounded-lg resize-none text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow/50 bg-background"
                  rows={4}
                  placeholder="Enter any additional comments or observations..."
                  value={formData.additionalComments || ''}
                  onChange={(e) => onUpdate('additionalComments', e.target.value)}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Authorisation Signatures Section */}
      <Collapsible open={isSignaturesOpen} onOpenChange={setIsSignaturesOpen}>
        <Card className="border-border/50 overflow-hidden">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  {completionData.signaturesComplete ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <User className="h-5 w-5 text-elec-yellow" />
                  )}
                  Authorisation Signatures
                </CardTitle>
                <ChevronDown className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform',
                  isSignaturesOpen && 'rotate-180'
                )} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-6">
              <p className="text-sm text-muted-foreground">
                Both signatures are required per BS 7671 regulations.
              </p>

              {/* Copy from Inspector */}
              <Button
                variant="outline"
                onClick={handleCopyFromInspector}
                className="w-full h-11 gap-2 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
              >
                <Copy className="h-4 w-4" />
                Copy from Inspector Details
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inspected By */}
                <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-card/50">
                  <h4 className="font-semibold text-elec-yellow flex items-center gap-2">
                    <User className="h-4 w-4" />
                    INSPECTED BY:
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <Label>Name (Capitals) *</Label>
                      <Input
                        value={formData.inspectedByName || ''}
                        onChange={(e) => onUpdate('inspectedByName', e.target.value.toUpperCase())}
                        placeholder="FULL NAME"
                        className="uppercase h-11"
                      />
                    </div>

                    <div>
                      <Label>Signature *</Label>
                      <SignatureInput
                        value={formData.inspectedBySignature || ''}
                        onChange={(value) => onUpdate('inspectedBySignature', value || '')}
                        placeholder="Signature"
                        required
                      />
                    </div>

                    <div>
                      <Label>For/on behalf of</Label>
                      <Input
                        value={formData.inspectedByForOnBehalfOf || ''}
                        onChange={(e) => onUpdate('inspectedByForOnBehalfOf', e.target.value)}
                        placeholder="Company name"
                        className="h-11"
                      />
                    </div>

                    <div>
                      <Label>Position</Label>
                      <Input
                        value={formData.inspectedByPosition || ''}
                        onChange={(e) => onUpdate('inspectedByPosition', e.target.value)}
                        placeholder="Job title"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>

                {/* Report Authorised By */}
                <div className="space-y-4 p-4 rounded-xl border border-border/50 bg-card/50">
                  {/* Same as Inspected By */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <Checkbox
                      id="sameAsInspectedBy"
                      checked={formData.sameAsInspectedBy || false}
                      onCheckedChange={handleSameAsInspectedBy}
                    />
                    <Label htmlFor="sameAsInspectedBy" className="cursor-pointer text-sm">
                      Same person as Inspected By
                    </Label>
                  </div>

                  <h4 className="font-semibold text-elec-yellow flex items-center gap-2">
                    <User className="h-4 w-4" />
                    REPORT AUTHORISED BY:
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <Label>Name (Capitals) *</Label>
                      <Input
                        value={formData.reportAuthorisedByName || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                        placeholder="FULL NAME"
                        className="uppercase h-11"
                      />
                    </div>

                    <div>
                      <Label>Signature *</Label>
                      <SignatureInput
                        value={formData.reportAuthorisedBySignature || ''}
                        onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
                        placeholder="Signature"
                        required
                      />
                    </div>

                    <div>
                      <Label>Date *</Label>
                      <Input
                        type="date"
                        value={formData.reportAuthorisedByDate || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div>
                      <Label>For/on behalf of</Label>
                      <Input
                        value={formData.reportAuthorisedByForOnBehalfOf || ''}
                        onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                        placeholder="Company name"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Actions Bar */}
      <CertificateActionsBar
        canGenerate={canGenerate}
        isGenerating={isGenerating}
        isComplete={isComplete}
        onGenerate={handleGenerateCertificate}
        onEmail={handleEmail}
        onSaveDraft={handleSaveDraft}
        onCopyJson={handleCopyJson}
        disabledReason={disabledReason}
        certificateType="EICR"
        showDevTools={true}
      />

      {/* Email Dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="EICR"
        certificateNumber={formData.reportReference || formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.installationAddress}
        inspectionDate={formData.inspectionDate}
        overallAssessment={formData.overallAssessment}
        companyName={formData.companyName}
        onSend={async (email, cc, message) => {
          await certificateEmail.sendCertificateEmail({
            recipientEmail: email,
            cc,
            customMessage: message,
          });
        }}
        isLoading={certificateEmail.isLoading}
      />
    </div>
  );
};

export default EICRCertificateTab;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Download,
  FileText,
  Edit3,
  AlertTriangle,
  CheckCircle,
  Shield,
  Save,
  Sparkles,
  Plus,
  X,
  AlertCircle,
  FolderOpen,
  Loader2,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { generateRAMSPDF } from '@/utils/rams-pdf-professional';
import { generateMethodStatementPDF } from '@/utils/method-statement-pdf';
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { PDFGenerationModal } from './PDFGenerationModal';
import { MobilePDFDownloadSheet } from './MobilePDFDownloadSheet';
import { MobileBottomActionBar } from './MobileBottomActionBar';
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
import { SummaryStatsCard } from './results/SummaryStatsCard';
import { EnhancedRiskCard } from './results/EnhancedRiskCard';
import { PPEGridView } from './results/PPEGridView';
import { EmergencyProceduresCards } from './results/EmergencyProceduresCards';
import { ProjectInfoHeader } from './results/ProjectInfoHeader';
import { EnhancedStepCard } from './results/EnhancedStepCard';
import { ProgressSummary } from './results/ProgressSummary';
import { getRiskColorsByLevel } from '@/utils/risk-level-helpers';
import { EmergencyContactsCard } from './results/EmergencyContactsCard';
import { ScopeOfWorkCard } from './results/ScopeOfWorkCard';
import { PPEDetailsGrid } from './results/PPEDetailsGrid';
import { ComplianceReferencesCard } from './results/ComplianceReferencesCard';
import { MethodStatementSummary } from './results/MethodStatementSummary';
import { SiteLogisticsCard } from './results/SiteLogisticsCard';
import { CompetencyMatrixCard } from './results/CompetencyMatrixCard';
import { RiskAssessmentSummary } from './results/RiskAssessmentSummary';

interface RAMSReviewEditorProps {
  ramsData?: RAMSData;
  methodData?: Partial<MethodStatementData>;
  isSaving?: boolean;
  lastSaved?: Date | null;
  onSave?: () => void;
  onUpdate: (rams: RAMSData, method: Partial<MethodStatementData>) => void;
  rawHSResponse?: any;
  rawInstallerResponse?: any;
  mode?: 'embedded' | 'standalone';
  onRegenerate?: () => void;
  isPartial?: boolean;
  onRetry?: () => void;
  /** Retry just the failed agent — patches the existing job row. */
  onRetryAgent?: (agent: 'hs' | 'method') => void;
}

/**
 * Coerce any stored issued date into the `YYYY-MM-DD` form a native date input
 * needs, defaulting to today when missing or unparseable. Backdating is a
 * legitimate use case (retrospective paperwork, assessment records).
 */
const toInputDate = (value?: string): string => {
  const today = new Date().toISOString().split('T')[0];
  if (!value) return today;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? today : parsed.toISOString().split('T')[0];
};

export const RAMSReviewEditor: React.FC<RAMSReviewEditorProps> = ({
  ramsData: initialRamsData,
  methodData: initialMethodData,
  isSaving = false,
  lastSaved = null,
  onSave,
  onUpdate,
  rawHSResponse,
  rawInstallerResponse,
  mode = 'embedded',
  onRegenerate,
  isPartial = false,
  onRetry,
  onRetryAgent,
}) => {
  // PHASE 4: Handle missing data gracefully
  if (!initialRamsData && !initialMethodData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h3 className="text-lg font-semibold">No Data Available</h3>
              <p className="text-sm text-white">
                Both risk assessment and method statement generation failed. Please try again.
              </p>
              {onRetry && (
                <Button onClick={onRetry} variant="default">
                  Retry Generation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Normalize data on load to handle old/incomplete structures
  const normalizedRamsData: RAMSData | undefined = initialRamsData
    ? {
        ...initialRamsData,
        // Default the issued date to today, normalised to YYYY-MM-DD so the
        // day/month/year picker and all PDF generators read a consistent value.
        date: toInputDate(initialRamsData.date),
        risks: (initialRamsData.risks || []).map((risk) => ({
          ...risk,
          id: risk.id || `risk-${Math.random()}`,
          controls: risk.controls || '',
          riskRating: risk.riskRating || (risk.likelihood || 3) * (risk.severity || 3),
        })),
      }
    : undefined;

  const v2StepsById: Record<string, any> = {};
  if (Array.isArray((initialMethodData as any)?.method_steps)) {
    for (const ms of (initialMethodData as any).method_steps) {
      if (ms?.id) v2StepsById[ms.id] = ms;
    }
  }

  const normalizedMethodData: Partial<MethodStatementData> = initialMethodData
    ? {
        ...initialMethodData,
        steps: (initialMethodData.steps || []).map((step, idx) => {
          const id = step.id || `step-${idx + 1}`;
          const v2 = v2StepsById[id];
          return {
            ...step,
            id,
            equipmentNeeded: Array.isArray(step.equipmentNeeded)
              ? step.equipmentNeeded
              : typeof step.equipmentNeeded === 'string'
                ? [step.equipmentNeeded]
                : [],
            qualifications: Array.isArray(step.qualifications)
              ? step.qualifications
              : typeof step.qualifications === 'string'
                ? [step.qualifications]
                : [],
            estimatedDuration: step.estimatedDuration || '15 minutes',
            safetyRequirements: Array.isArray(step.safetyRequirements)
              ? step.safetyRequirements
              : typeof step.safetyRequirements === 'string'
                ? [step.safetyRequirements]
                : [],
            assignedPersonnel: Array.isArray(step.assignedPersonnel)
              ? step.assignedPersonnel
              : typeof step.assignedPersonnel === 'string'
                ? [step.assignedPersonnel]
                : [],
            // v2 mirror — flat-spread the rich fields onto the v1 step so cards
            // can render them without a second lookup. Optional + ignored by v1 paths.
            ...(v2
              ? {
                  phase: v2.phase,
                  objective: v2.objective,
                  linked_hazard_titles: v2.linked_hazard_titles,
                  linked_hazard_ids: v2.linked_hazard_ids,
                  inputs: v2.inputs,
                  outputs: v2.outputs,
                  named_instruments: v2.named_instruments,
                  named_values: v2.named_values,
                  hold_points: v2.hold_points,
                  witness_points: v2.witness_points,
                  quality_checks: v2.quality_checks,
                  acceptance_criteria: v2.acceptance_criteria,
                  materials_consumed: v2.materials_consumed,
                  ppe_required: v2.ppe_required,
                  bs7671_cites: v2.bs7671_cites,
                  safety_cites: v2.safety_cites,
                  documentation_produced: v2.documentation_produced,
                  sign_off_required: v2.sign_off_required,
                  stop_work_triggers: v2.stop_work_triggers,
                }
              : {}),
          };
        }),
        // Normalize document-level array fields to ensure they're always arrays
        toolsRequired: Array.isArray(initialMethodData.toolsRequired)
          ? initialMethodData.toolsRequired
          : [],
        materialsRequired: Array.isArray(initialMethodData.materialsRequired)
          ? initialMethodData.materialsRequired
          : [],
        practicalTips: Array.isArray(initialMethodData.practicalTips)
          ? initialMethodData.practicalTips
          : [],
        commonMistakes: Array.isArray(initialMethodData.commonMistakes)
          ? initialMethodData.commonMistakes
          : [],
        requiredQualifications: Array.isArray(initialMethodData.requiredQualifications)
          ? initialMethodData.requiredQualifications
          : [],
      }
    : {};

  const [ramsData, setRamsData] = useState<RAMSData | undefined>(normalizedRamsData);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData>>(normalizedMethodData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPDFType, setCurrentPDFType] = useState<'combined' | 'rams' | 'method'>('combined');
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [localIsSaving, setLocalIsSaving] = useState(false);
  const [localLastSaved, setLocalLastSaved] = useState<Date | null>(null);

  const { isVisible: keyboardVisible } = useMobileKeyboard();

  // Notify parent of updates and track unsaved changes
  useEffect(() => {
    if (ramsData && methodData) {
      onUpdate(ramsData, methodData);
      setHasUnsavedChanges(true);
    }
  }, [ramsData, methodData]);

  // Auto-save after 30 seconds of inactivity
  useEffect(() => {
    if (!hasUnsavedChanges || !onSave) return;

    const autoSaveTimer = setTimeout(() => {
      console.log('🔄 Auto-saving changes...');
      onSave();
      setHasUnsavedChanges(false);
    }, 30000); // Auto-save after 30s of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [hasUnsavedChanges, onSave]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update one part of the issued date (day/month/year), rebuild an ISO string,
  // and clamp the day to a valid value for the chosen month/year.
  const setIssuedPart = (part: 'd' | 'm' | 'y', value: string) => {
    const [y, m, d] = toInputDate(ramsData?.date).split('-');
    const next = { y, m, d, [part]: value } as { y: string; m: string; d: string };
    const daysInMonth = new Date(Number(next.y), Number(next.m), 0).getDate();
    const day = Math.min(Number(next.d), daysInMonth);
    const iso = `${next.y}-${next.m.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setRamsData((prev) => (prev ? { ...prev, date: iso } : prev));
  };

  const updateRisk = (riskId: string, updates: Partial<RAMSRisk>) => {
    if (!ramsData) return;
    setRamsData((prev) =>
      prev
        ? {
            ...prev,
            risks: (prev.risks || []).map((risk) =>
              risk.id === riskId ? { ...risk, ...updates } : risk
            ),
          }
        : prev
    );
  };

  const removeRisk = (riskId: string) => {
    if (!ramsData) return;
    setRamsData((prev) =>
      prev
        ? {
            ...prev,
            risks: (prev.risks || []).filter((risk) => risk.id !== riskId),
          }
        : prev
    );
  };

  const addRisk = () => {
    if (!ramsData) return;
    const newRisk: RAMSRisk = {
      id: `risk-${Date.now()}`,
      hazard: '',
      risk: '',
      likelihood: 3,
      severity: 3,
      riskRating: 9,
      controls: '',
      residualRisk: 6,
    };

    setRamsData((prev) =>
      prev
        ? {
            ...prev,
            risks: [...(prev.risks || []), newRisk],
          }
        : prev
    );
  };

  // Safety / emergency contacts live on ramsData and persist into
  // ai_generation_metadata.emergencyContacts on save.
  const updateContact = (
    field:
      | 'siteManagerName'
      | 'siteManagerPhone'
      | 'firstAiderName'
      | 'firstAiderPhone'
      | 'safetyOfficerName'
      | 'safetyOfficerPhone'
      | 'assemblyPoint',
    value: string
  ) => {
    setRamsData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateStep = (stepId: string, updates: Partial<MethodStep>) => {
    setMethodData((prev) => ({
      ...prev,
      steps: prev.steps?.map((step) => (step.id === stepId ? { ...step, ...updates } : step)),
    }));
  };

  const removeStep = (stepId: string) => {
    setMethodData((prev) => ({
      ...prev,
      steps: prev.steps?.filter((step) => step.id !== stepId),
    }));
  };

  const addStep = () => {
    const newStepNumber = (methodData.steps?.length || 0) + 1;
    const newStep: MethodStep = {
      id: `step-${Date.now()}`,
      stepNumber: newStepNumber,
      title: '',
      description: '',
      safetyRequirements: [],
      equipmentNeeded: [],
      qualifications: [],
      estimatedDuration: '15 minutes',
      riskLevel: 'low',
    };

    setMethodData((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), newStep],
    }));
  };

  const updatePPE = (ppeDetails: import('@/types/rams').PPEItem[]) => {
    setRamsData((prev) =>
      prev
        ? {
            ...prev,
            ppeDetails,
          }
        : prev
    );
  };

  // Method Statement Summary update handlers
  const updateTools = (tools: string[]) => {
    setMethodData((prev) => ({ ...prev, toolsRequired: tools }));
  };

  const updateMaterials = (materials: string[]) => {
    setMethodData((prev) => ({ ...prev, materialsRequired: materials }));
  };

  const updateTips = (tips: string[]) => {
    setMethodData((prev) => ({ ...prev, practicalTips: tips }));
  };

  const updateMistakes = (mistakes: string[]) => {
    setMethodData((prev) => ({ ...prev, commonMistakes: mistakes }));
  };

  const handleGenerateRAMSPDF = async () => {
    setIsGenerating(true);
    setCurrentPDFType('rams');
    setShowPDFModal(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase.functions.invoke('generate-rams-pdf', {
        body: {
          ramsData,
          userId: user?.id,
        },
      });

      if (data?.success && data?.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `Risk_Assessment_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`;
        link.click();

        setShowPDFModal(false);
        toast({
          title: 'PDF Downloaded',
          description: 'Your RAMS PDF has been downloaded successfully',
          variant: 'success',
        });
      } else {
        console.log('Falling back to client-side PDF generation', { data, error });
        setShowPDFModal(false);
        const pdfDataUri = generateRAMSPDF(ramsData, {
          includeSignatures: true,
          companyName: methodData.contractor || 'Professional Electrical Services',
          documentReference: `RAMS-${Date.now()}`,
          reviewDate: methodData.reviewDate,
        });

        const link = document.createElement('a');
        link.href = pdfDataUri;
        link.download = `Risk_Assessment_${Date.now()}.pdf`;
        link.click();

        toast({
          title: 'PDF Downloaded',
          description: 'Your RAMS PDF has been downloaded',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Error generating RAMS PDF:', error);
      setShowPDFModal(false);
      const pdfDataUri = generateRAMSPDF(ramsData, {
        includeSignatures: true,
        companyName: methodData.contractor || 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`,
        reviewDate: methodData.reviewDate,
      });

      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `Risk_Assessment_${Date.now()}.pdf`;
      link.click();

      toast({
        title: 'PDF Generation Error',
        description: 'Failed to generate PDF through server, using backup method',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMethodPDF = async () => {
    setIsGenerating(true);
    setCurrentPDFType('method');
    setShowPDFModal(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');

      const { data, error } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: {
          methodData: {
            ...methodData,
            projectName: ramsData.projectName,
          },
        },
      });

      if (data?.success && data?.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `Method_Statement_${methodData.jobTitle?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`;
        link.click();

        setShowPDFModal(false);
        toast({
          title: 'PDF Downloaded',
          description: 'Your Method Statement PDF has been downloaded successfully',
          variant: 'success',
        });
      } else {
        console.log('Falling back to client-side PDF generation', { data, error });
        setShowPDFModal(false);
        const methodPdfData = generateMethodStatementPDF(methodData as MethodStatementData, {
          companyName: methodData.contractor || 'Professional Electrical Services',
        });

        const blob = new Blob([new Uint8Array(methodPdfData)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Method_Statement_${Date.now()}.pdf`;
        link.click();
        URL.revokeObjectURL(url);

        toast({
          title: 'PDF Downloaded',
          description: 'Your Method Statement PDF has been downloaded',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Error generating Method Statement PDF:', error);
      setShowPDFModal(false);
      const methodPdfData = generateMethodStatementPDF(methodData as MethodStatementData, {
        companyName: methodData.contractor || 'Professional Electrical Services',
      });

      const blob = new Blob([new Uint8Array(methodPdfData)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Method_Statement_${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: 'PDF Generation Error',
        description: 'Failed to generate PDF, using backup method',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateCombinedRAMS = async () => {
    if (!ramsData) return;
    // Prevent multiple clicks
    if (isGenerating) return;

    setIsGenerating(true);
    setCurrentPDFType('combined');
    setShowPDFModal(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');

      // 🔍 FRONTEND DATA DIAGNOSTICS - Log what we're sending
      console.log('📤 Sending to PDF generation:', {
        ramsData: {
          projectName: ramsData.projectName,
          risksCount: ramsData.risks?.length,
          ppeDetailsCount: ramsData.ppeDetails?.length || 0,
          requiredPPECount: ramsData.requiredPPE?.length || 0,
          hasPpeDetails: !!ramsData.ppeDetails,
          hasRequiredPPE: !!ramsData.requiredPPE,
        },
        methodData: {
          jobTitle: methodData.jobTitle,
          stepsCount: methodData.steps?.length,
          toolsCount: methodData.toolsRequired?.length || 0,
          tipsCount: methodData.practicalTips?.length || 0,
          mistakesCount: methodData.commonMistakes?.length || 0,
          hasToolsRequired: !!methodData.toolsRequired,
          hasPracticalTips: !!methodData.practicalTips,
        },
      });
      console.log('🔍 Full ramsData.ppeDetails:', ramsData.ppeDetails);
      console.log('🔍 Full ramsData.requiredPPE:', ramsData.requiredPPE);
      console.log('🔍 Full methodData.toolsRequired:', methodData.toolsRequired);
      console.log('🔍 Full methodData.practicalTips:', methodData.practicalTips);
      console.log('🔍 Full methodData.commonMistakes:', methodData.commonMistakes);

      const { data, error } = await supabase.functions.invoke('generate-combined-rams-pdf', {
        body: {
          ramsData: {
            ...ramsData,
            risks: [...(ramsData.risks || [])].sort(
              (a, b) => (b.riskRating || 0) - (a.riskRating || 0)
            ),
          },
          methodData,
        },
      });

      if (data?.success && data?.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `Combined_RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`;
        link.click();

        setShowPDFModal(false);
        toast({
          title: 'PDF Downloaded',
          description: 'Your Combined RAMS PDF has been downloaded successfully',
          variant: 'success',
        });
      } else {
        console.log('PDF Monkey unavailable, using fallback', {
          status: data?.status,
          message: data?.message,
          hint: data?.hint,
          templateId: data?.templateId,
          error: data?.error,
        });

        setShowPDFModal(false);

        if (data?.message || data?.hint) {
          toast({
            title: 'Using Alternative PDF Generator',
            description: data?.hint || data?.message || 'PDF Monkey unavailable',
            variant: 'default',
          });
        }

        // Generate PDF and save to storage
        const { generateCombinedRAMSPDFBlob } = await import('@/utils/rams-combined-pdf');
        const { saveRAMSPDFToStorage } = await import('@/utils/rams-pdf-storage');

        const pdfBlob = await generateCombinedRAMSPDFBlob(
          ramsData,
          methodData as MethodStatementData,
          {
            companyName: methodData.contractor || 'Professional Electrical Services',
            documentReference: `RAMS-${Date.now()}`,
          }
        );

        // Save to storage
        const saveResult = await saveRAMSPDFToStorage(pdfBlob, ramsData, methodData, 'draft');

        if (saveResult.success) {
          // Also trigger download
          const url = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Combined_RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast({
            title: 'PDF Downloaded & Saved',
            description: 'Your Combined RAMS PDF has been downloaded and saved to your library',
            variant: 'success',
          });
        } else {
          toast({
            title: 'PDF Downloaded',
            description: 'Your Combined RAMS PDF has been downloaded (could not save to library)',
            variant: 'default',
          });
        }
      }
    } catch (error) {
      console.error('Error generating combined RAMS:', error);
      setShowPDFModal(false);

      toast({
        title: 'Switching to Alternative Method',
        description: 'Professional PDF generation unavailable, using built-in generator',
        variant: 'default',
      });

      try {
        const { generateCombinedRAMSPDFBlob } = await import('@/utils/rams-combined-pdf');
        const { saveRAMSPDFToStorage } = await import('@/utils/rams-pdf-storage');

        const pdfBlob = await generateCombinedRAMSPDFBlob(
          ramsData,
          methodData as MethodStatementData,
          {
            companyName: methodData.contractor || 'Professional Electrical Services',
            documentReference: `RAMS-${Date.now()}`,
          }
        );

        // Save to storage
        await saveRAMSPDFToStorage(pdfBlob, ramsData, methodData, 'draft');

        // Download
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Combined_RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast({
          title: 'PDF Downloaded & Saved',
          description: 'Your Combined RAMS PDF has been downloaded and saved',
          variant: 'success',
        });
      } catch (fallbackError) {
        console.error('Fallback PDF generation failed:', fallbackError);
        toast({
          title: 'PDF Generation Failed',
          description: 'Could not generate PDF. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyJSON = () => {
    if (!ramsData) return;
    const combinedData = {
      ramsData: {
        ...ramsData,
        contractor: ramsData.contractor || '',
        supervisor: ramsData.supervisor || '',
        siteManagerName: ramsData.siteManagerName || '',
        siteManagerPhone: ramsData.siteManagerPhone || '',
        firstAiderName: ramsData.firstAiderName || '',
        firstAiderPhone: ramsData.firstAiderPhone || '',
        safetyOfficerName: ramsData.safetyOfficerName || '',
        safetyOfficerPhone: ramsData.safetyOfficerPhone || '',
        assemblyPoint: ramsData.assemblyPoint || '',
        risks: (ramsData.risks || []).map((risk) => ({
          ...risk,
          furtherAction: risk.furtherAction || '',
          responsible: risk.responsible || '',
          actionBy: risk.actionBy || '',
          done: risk.done || false,
        })),
      },
      methodStatementData: methodData
        ? {
            ...methodData,
            id: methodData.id || '',
            approvedBy: methodData.approvedBy || '',
            createdAt: methodData.createdAt || '',
            updatedAt: methodData.updatedAt || '',
            steps: (methodData.steps || []).map((step) => ({
              ...step,
              dependencies: step.dependencies || [],
              isCompleted: step.isCompleted || false,
              notes: step.notes || '',
              linkedHazards: step.linkedHazards || [],
            })),
          }
        : null,
    };

    copyToClipboard(JSON.stringify(combinedData, null, 2));
    toast({
      title: 'JSON Copied',
      description: 'Combined RAMS data with all fields copied to clipboard',
      variant: 'success',
    });
  };

  // Save to Library function
  const handleSaveToLibrary = async () => {
    if (!ramsData || !methodData) {
      toast({
        title: 'Cannot Save',
        description: 'No RAMS data available to save',
        variant: 'destructive',
      });
      return;
    }

    setLocalIsSaving(true);

    try {
      // Generate combined PDF blob
      const { generateCombinedRAMSPDFBlob } = await import('@/utils/rams-combined-pdf');
      const { saveRAMSPDFToStorage, updateRAMSDocument } = await import('@/utils/rams-pdf-storage');

      const pdfBlob = await generateCombinedRAMSPDFBlob(
        ramsData,
        methodData as MethodStatementData,
        {
          companyName: methodData.contractor || 'Professional Electrical Services',
          documentReference: `RAMS-${Date.now()}`,
        }
      );

      // Check if document already exists
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const currentDate = new Date().toISOString().split('T')[0];
      const { data: existingDoc } = await supabase
        .from('rams_documents')
        .select('id')
        .eq('user_id', user.id)
        .eq('project_name', ramsData.projectName)
        .eq('location', ramsData.location)
        .eq('date', currentDate)
        .maybeSingle();

      let saveResult;

      if (existingDoc) {
        // Update existing document
        saveResult = await updateRAMSDocument(existingDoc.id, ramsData, methodData);

        if (saveResult.success) {
          setLocalLastSaved(new Date());
          toast({
            title: 'Document Updated',
            description: 'Your RAMS document has been updated in the library',
          });
        }
      } else {
        // Create new document
        saveResult = await saveRAMSPDFToStorage(pdfBlob, ramsData, methodData, 'draft');

        if (saveResult.success) {
          setLocalLastSaved(new Date());
          toast({
            title: 'Saved to Library',
            description:
              'Your RAMS document is now available in Saved RAMS Documents. Tap to view.',
          });
        }
      }

      if (!saveResult.success) {
        throw new Error(saveResult.error || 'Failed to save document');
      }

      // Also update the job record if onSave callback exists
      if (onSave) {
        await onSave();
      }
    } catch (error) {
      console.error('Error saving to library:', error);
      toast({
        title: 'Save Failed',
        description: error instanceof Error ? error.message : 'Could not save to library',
        variant: 'destructive',
      });
    } finally {
      setLocalIsSaving(false);
    }
  };

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  return (
    <div className={cn('space-y-7 sm:space-y-10 pb-12', isMobile && 'pb-24')}>
      {/* Sub-toolbar — orchestrator's editorial header already carries the
          status, project name and "New" button, so this strip just shows
          save state and the regenerate action. */}
      <div className="flex items-center justify-between gap-3 text-[11.5px]">
        <span className="text-white/55 tabular-nums">
          {lastSaved
            ? isSaving
              ? 'Saving…'
              : `Saved ${lastSaved.toLocaleTimeString()}`
            : 'Unsaved draft'}
        </span>
        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/65 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Regenerate</span>
          </button>
        )}
      </div>

      <div className="space-y-7 sm:space-y-10">

        {/* Partial completion banner — editorial style. Retry just the
            failed half if we know which one it is. */}
        {isPartial && (
          <section className="bg-[hsl(0_0%_10%)] border border-amber-500/30 rounded-2xl p-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-amber-400 shrink-0">
                Partial
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[14.5px] font-semibold text-white">
                  RAMS generated with gaps
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">
                  {!ramsData && 'Risk assessment generation failed. '}
                  {!methodData && 'Method statement generation failed. '}
                  Proceed with what's available, or retry just the failed half.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {onRetryAgent && !ramsData && (
                    <button
                      type="button"
                      onClick={() => onRetryAgent('hs')}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.98] touch-manipulation"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Retry hazard register
                    </button>
                  )}
                  {onRetryAgent && !methodData && (
                    <button
                      type="button"
                      onClick={() => onRetryAgent('method')}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.98] touch-manipulation"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Retry method statement
                    </button>
                  )}
                  {!onRetryAgent && onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.98] touch-manipulation"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Retry failed section
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <div>
          <Tabs defaultValue="rams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto bg-transparent rounded-none p-0 gap-0 border-b border-white/[0.08]">
              <TabsTrigger
                value="rams"
                className={cn(
                  'h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent shadow-none px-0 py-3',
                  'text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors touch-manipulation',
                  'data-[state=active]:bg-transparent data-[state=active]:border-elec-yellow data-[state=active]:text-elec-yellow',
                  'data-[state=inactive]:text-white/55 data-[state=inactive]:hover:text-white'
                )}
              >
                Risk Assessment
              </TabsTrigger>
              <TabsTrigger
                value="method"
                className={cn(
                  'h-12 rounded-none border-0 border-b-2 border-transparent bg-transparent shadow-none px-0 py-3',
                  'text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors touch-manipulation',
                  'data-[state=active]:bg-transparent data-[state=active]:border-elec-yellow data-[state=active]:text-elec-yellow',
                  'data-[state=inactive]:text-white/55 data-[state=inactive]:hover:text-white'
                )}
              >
                Method Statement
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rams" className="space-y-7 sm:space-y-10 mt-7 sm:mt-10 p-0">
              {ramsData ? (
                <>
                  {/* Summary Stats Card */}
                  <SummaryStatsCard risks={ramsData.risks || []} />

                  {/* Issued date — day / month / year. Editable so users can
                      backdate documents for assessments or retrospective records. */}
                  {(() => {
                    const [yy, mm, dd] = toInputDate(ramsData.date).split('-');
                    const thisYear = new Date().getFullYear();
                    const MONTHS = [
                      'January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December',
                    ];
                    const selectCls =
                      'h-11 px-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[14px] text-white touch-manipulation focus:border-elec-yellow/50 focus:outline-none [color-scheme:dark]';
                    return (
                      <section className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-3">
                        <div className="space-y-0.5">
                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60 block">
                            Issued date
                          </span>
                          <p className="text-[12px] text-white/55">
                            Defaults to today — change to backdate the document.
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5">
                          <select
                            aria-label="Day"
                            value={String(Number(dd))}
                            onChange={(e) => setIssuedPart('d', e.target.value)}
                            className={selectCls}
                          >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                          <select
                            aria-label="Month"
                            value={mm}
                            onChange={(e) => setIssuedPart('m', e.target.value)}
                            className={selectCls}
                          >
                            {MONTHS.map((name, i) => (
                              <option key={name} value={String(i + 1).padStart(2, '0')}>
                                {name}
                              </option>
                            ))}
                          </select>
                          <select
                            aria-label="Year"
                            value={yy}
                            onChange={(e) => setIssuedPart('y', e.target.value)}
                            className={selectCls}
                          >
                            {Array.from({ length: 8 }, (_, i) => thisYear - 6 + i).map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </section>
                    );
                  })()}

                  {/* Identified Hazards — editorial section */}
                  <section className="space-y-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                          Identified hazards
                        </div>
                        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
                          Risks and controls.
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={addRisk}
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[12.5px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.99] touch-manipulation whitespace-nowrap"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add hazard
                      </button>
                    </div>

                    {/* Empty state — editorial banner */}
                    {(!ramsData.risks || ramsData.risks.length === 0) && (
                      <div className="bg-[hsl(0_0%_10%)] border border-dashed border-white/[0.12] rounded-2xl p-6 sm:p-8 text-center">
                        <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-2">
                          Nothing here yet
                        </div>
                        <h4 className="text-[17px] font-semibold text-white mb-2">
                          No hazards identified
                        </h4>
                        <p className="text-[13px] leading-relaxed text-white/65 max-w-md mx-auto mb-4">
                          Add a hazard manually with the button above, or regenerate to let the AI
                          re-read your brief.
                        </p>
                        {onRegenerate && (
                          <button
                            type="button"
                            onClick={onRegenerate}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Try again
                          </button>
                        )}
                      </div>
                    )}

                    {/* Risk Cards - Sorted by Risk Rating */}
                    {ramsData.risks && ramsData.risks.length > 0 && (
                      <div className="space-y-3">
                        {[...(ramsData.risks || [])]
                          .sort((a, b) => (b.riskRating || 0) - (a.riskRating || 0))
                          .map((risk, sortedIndex) => (
                            <EnhancedRiskCard
                              key={risk.id}
                              risk={risk}
                              index={sortedIndex}
                              editable={true}
                              onUpdate={updateRisk}
                              onRemove={removeRisk}
                            />
                          ))}
                      </div>
                    )}
                  </section>

                  {/* PPE Section */}
                  <PPEGridView
                    ppeDetails={ramsData.ppeDetails}
                    requiredPPE={ramsData.requiredPPE}
                    editable={true}
                    onUpdate={updatePPE}
                  />

                  {/* Emergency Procedures */}
                  <EmergencyProceduresCards procedures={ramsData.emergencyProcedures} />

                  {/* Safety / emergency contacts — editable */}
                  <section className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-2xl p-4 sm:p-6 space-y-4">
                    <div>
                      <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-elec-yellow mb-1">
                        Safety contacts
                      </div>
                      <h3 className="text-[17px] font-semibold text-white">Emergency &amp; site contacts</h3>
                      <p className="text-[12.5px] leading-relaxed text-white/55 mt-1">
                        Who to call on site. These appear on the RAMS and the exported PDF.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(
                        [
                          { label: 'Site manager', nameKey: 'siteManagerName', phoneKey: 'siteManagerPhone' },
                          { label: 'First aider', nameKey: 'firstAiderName', phoneKey: 'firstAiderPhone' },
                          { label: 'Safety officer', nameKey: 'safetyOfficerName', phoneKey: 'safetyOfficerPhone' },
                        ] as const
                      ).map((c) => (
                        <div key={c.nameKey} className="space-y-2">
                          <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-white/55">
                            {c.label}
                          </label>
                          <Input
                            value={(ramsData[c.nameKey] as string) || ''}
                            onChange={(e) => updateContact(c.nameKey, e.target.value)}
                            placeholder="Name"
                            className="h-11 text-base touch-manipulation bg-[hsl(0_0%_8%)] border-white/20 focus:border-elec-yellow focus:ring-elec-yellow text-white"
                          />
                          <Input
                            value={(ramsData[c.phoneKey] as string) || ''}
                            onChange={(e) => updateContact(c.phoneKey, e.target.value)}
                            placeholder="Phone"
                            inputMode="tel"
                            className="h-11 text-base touch-manipulation bg-[hsl(0_0%_8%)] border-white/20 focus:border-elec-yellow focus:ring-elec-yellow text-white"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-white/55">
                        Assembly point
                      </label>
                      <Input
                        value={ramsData.assemblyPoint || ''}
                        onChange={(e) => updateContact('assemblyPoint', e.target.value)}
                        placeholder="e.g. Main car park, front gate"
                        className="h-11 text-base touch-manipulation bg-[hsl(0_0%_8%)] border-white/20 focus:border-elec-yellow focus:ring-elec-yellow text-white"
                      />
                    </div>
                  </section>
                </>
              ) : (
                <div className="bg-[hsl(0_0%_10%)] border border-dashed border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center">
                  <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-amber-400 mb-2">
                    Section unavailable
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-2">
                    Risk assessment not generated
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/65 max-w-md mx-auto mb-4">
                    The risk assessment didn't generate. Retry just this half to patch it in.
                  </p>
                  {onRetryAgent ? (
                    <button
                      type="button"
                      onClick={() => onRetryAgent('hs')}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Retry hazard register
                    </button>
                  ) : (
                    onRetry && (
                      <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Retry generation
                      </button>
                    )
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="method" className="space-y-7 sm:space-y-10 mt-7 sm:mt-10 pb-16">
              {methodData && Object.keys(methodData).length > 0 ? (
                <div className="space-y-7 sm:space-y-10">
                  {/* Project Info Header */}
                  <ProjectInfoHeader
                    methodData={methodData}
                    projectName={ramsData?.projectName}
                    location={ramsData?.location}
                  />

                  {/* Emergency Contacts */}
                  <EmergencyContactsCard methodData={methodData as MethodStatementData} />

                  {/* Scope of Work */}
                  <ScopeOfWorkCard methodData={methodData as MethodStatementData} />

                  {/* Tools, Materials, Tips, Mistakes */}
                  <MethodStatementSummary
                    methodData={methodData as MethodStatementData}
                    editable={true}
                    onUpdateTools={updateTools}
                    onUpdateMaterials={updateMaterials}
                    onUpdateTips={updateTips}
                    onUpdateMistakes={updateMistakes}
                  />

                  {/* Site Logistics */}
                  <SiteLogisticsCard methodData={methodData as MethodStatementData} />

                  {/* Competency Matrix */}
                  <CompetencyMatrixCard methodData={methodData as MethodStatementData} />

                  {/* PPE Details - REMOVED: Already shown in Risk Assessment tab */}
                  {/* <PPEDetailsGrid methodData={methodData as MethodStatementData} /> */}

                  {/* Progress Summary */}
                  {methodData.steps && methodData.steps.length > 0 && (
                    <ProgressSummary steps={methodData.steps} />
                  )}

                  {/* Installation Steps — editorial section */}
                  <section className="space-y-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                          Installation steps
                        </div>
                        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
                          The method, step by step.
                        </h3>
                        <p className="text-[12.5px] text-white/60 tabular-nums">
                          {methodData.steps?.length || 0}{' '}
                          {(methodData.steps?.length || 0) === 1 ? 'step' : 'steps'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addStep}
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[12.5px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors active:scale-[0.99] touch-manipulation whitespace-nowrap"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add step
                      </button>
                    </div>

                    {methodData.steps && methodData.steps.length > 0 ? (
                      <div className="space-y-3">
                        {methodData.steps.map((step, index) => (
                          <EnhancedStepCard
                            key={step.id}
                            step={step}
                            index={index}
                            editable={true}
                            onUpdate={updateStep}
                            onRemove={removeStep}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[hsl(0_0%_10%)] border border-dashed border-white/[0.12] rounded-2xl p-6 sm:p-8 text-center">
                        <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/45 mb-2">
                          Nothing here yet
                        </div>
                        <h4 className="text-[17px] font-semibold text-white mb-2">
                          No installation steps
                        </h4>
                        <p className="text-[13px] leading-relaxed text-white/65 max-w-md mx-auto mb-4">
                          Add a step manually with the button above, or regenerate to have the AI
                          build the method statement.
                        </p>
                        {onRegenerate && (
                          <button
                            type="button"
                            onClick={onRegenerate}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            Try again
                          </button>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Risk Assessment Summary */}
                  <RiskAssessmentSummary ramsData={ramsData} />

                  {/* Compliance References */}
                  <ComplianceReferencesCard methodData={methodData as MethodStatementData} />
                </div>
              ) : (
                <div className="bg-[hsl(0_0%_10%)] border border-dashed border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center">
                  <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-amber-400 mb-2">
                    Section unavailable
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-2">
                    Method statement not generated
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/65 max-w-md mx-auto mb-4">
                    The method statement didn't generate. Retry just this half to patch it
                    into the existing RAMS.
                  </p>
                  {onRetryAgent ? (
                    <button
                      type="button"
                      onClick={() => onRetryAgent('method')}
                      className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Retry method statement
                    </button>
                  ) : (
                    onRegenerate && (
                      <button
                        type="button"
                        onClick={onRegenerate}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Regenerate full document
                      </button>
                    )
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Sticky export footer — editorial CTA pair */}
          <div className="hidden sm:block pt-4 mt-4 border-t border-white/[0.08]">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSaveToLibrary}
                disabled={isGenerating || localIsSaving}
                className="inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[13.5px] font-medium bg-white/[0.05] border border-white/[0.10] text-white hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation active:scale-[0.99] disabled:opacity-50"
              >
                {localIsSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <FolderOpen className="h-4 w-4" />
                    Save to library
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleGenerateCombinedRAMS}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[13.5px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation active:scale-[0.99] disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Sheets */}
      <PDFGenerationModal
        open={showPDFModal}
        onOpenChange={(open) => !open && setShowPDFModal(false)}
        pdfType={currentPDFType}
      />

      <MobilePDFDownloadSheet
        open={showMobileSheet}
        onOpenChange={setShowMobileSheet}
        onDownloadCombined={handleGenerateCombinedRAMS}
        isGenerating={isGenerating}
      />

      {/* Mobile Bottom Action Bar */}
      {isMobile && (
        <MobileBottomActionBar
          onSave={handleSaveToLibrary}
          onDownload={handleGenerateCombinedRAMS}
          isSaving={localIsSaving}
        />
      )}
    </div>
  );
};

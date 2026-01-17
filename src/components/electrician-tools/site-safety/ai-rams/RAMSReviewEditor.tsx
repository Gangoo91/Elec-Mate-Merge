import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, FileText, Edit3, AlertTriangle, CheckCircle, Shield, Save, Sparkles, Plus, X, AlertCircle, FolderOpen, Loader2 } from 'lucide-react';
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
}

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
  onRetry
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
              <p className="text-sm text-muted-foreground">
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
  const normalizedRamsData: RAMSData | undefined = initialRamsData ? {
    ...initialRamsData,
    risks: (initialRamsData.risks || []).map(risk => ({
      ...risk,
      id: risk.id || `risk-${Math.random()}`,
      controls: risk.controls || '',
      riskRating: risk.riskRating || (risk.likelihood || 3) * (risk.severity || 3),
    }))
  } : undefined;

  const normalizedMethodData: Partial<MethodStatementData> = initialMethodData ? {
    ...initialMethodData,
    steps: (initialMethodData.steps || []).map((step, idx) => ({
      ...step,
      id: step.id || `step-${idx + 1}`,
      equipmentNeeded: Array.isArray(step.equipmentNeeded) ? step.equipmentNeeded : 
                      (typeof step.equipmentNeeded === 'string' ? [step.equipmentNeeded] : []),
      qualifications: Array.isArray(step.qualifications) ? step.qualifications : 
                     (typeof step.qualifications === 'string' ? [step.qualifications] : []),
      estimatedDuration: step.estimatedDuration || '15 minutes',
      safetyRequirements: Array.isArray(step.safetyRequirements) ? step.safetyRequirements : 
                         (typeof step.safetyRequirements === 'string' ? [step.safetyRequirements] : []),
      assignedPersonnel: Array.isArray(step.assignedPersonnel) ? step.assignedPersonnel :
                        (typeof step.assignedPersonnel === 'string' ? [step.assignedPersonnel] : [])
    })),
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
      : []
  } : {};

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

  const updateRisk = (riskId: string, updates: Partial<RAMSRisk>) => {
    if (!ramsData) return;
    setRamsData(prev => prev ? ({
      ...prev,
      risks: (prev.risks || []).map(risk =>
        risk.id === riskId ? { ...risk, ...updates } : risk
      )
    }) : prev);
  };

  const removeRisk = (riskId: string) => {
    if (!ramsData) return;
    setRamsData(prev => prev ? ({
      ...prev,
      risks: (prev.risks || []).filter(risk => risk.id !== riskId)
    }) : prev);
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
      residualRisk: 6
    };
    
    setRamsData(prev => prev ? ({
      ...prev,
      risks: [...(prev.risks || []), newRisk]
    }) : prev);
  };

  const updateStep = (stepId: string, updates: Partial<MethodStep>) => {
    setMethodData(prev => ({
      ...prev,
      steps: prev.steps?.map(step =>
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
  };

  const removeStep = (stepId: string) => {
    setMethodData(prev => ({
      ...prev,
      steps: prev.steps?.filter(step => step.id !== stepId)
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
      riskLevel: 'low'
    };
    
    setMethodData(prev => ({
      ...prev,
      steps: [...(prev.steps || []), newStep]
    }));
  };


  const handleGenerateRAMSPDF = async () => {
    setIsGenerating(true);
    setCurrentPDFType('rams');
    setShowPDFModal(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.functions.invoke('generate-rams-pdf', {
        body: { 
          ramsData, 
          userId: user?.id
        }
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
          variant: 'success'
        });
      } else {
        console.log('Falling back to client-side PDF generation', { data, error });
        setShowPDFModal(false);
        const pdfDataUri = generateRAMSPDF(ramsData, {
          includeSignatures: true,
          companyName: methodData.contractor || 'Professional Electrical Services',
          documentReference: `RAMS-${Date.now()}`,
          reviewDate: methodData.reviewDate
        });

        const link = document.createElement('a');
        link.href = pdfDataUri;
        link.download = `Risk_Assessment_${Date.now()}.pdf`;
        link.click();

        toast({
          title: 'PDF Downloaded',
          description: 'Your RAMS PDF has been downloaded',
          variant: 'success'
        });
      }
    } catch (error) {
      console.error('Error generating RAMS PDF:', error);
      setShowPDFModal(false);
      const pdfDataUri = generateRAMSPDF(ramsData, {
        includeSignatures: true,
        companyName: methodData.contractor || 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`,
        reviewDate: methodData.reviewDate
      });

      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `Risk_Assessment_${Date.now()}.pdf`;
      link.click();

      toast({
        title: 'PDF Generation Error',
        description: 'Failed to generate PDF through server, using backup method',
        variant: 'destructive'
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
            projectName: ramsData.projectName
          }
        }
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
          variant: 'success'
        });
      } else {
        console.log('Falling back to client-side PDF generation', { data, error });
        setShowPDFModal(false);
        const methodPdfData = generateMethodStatementPDF(methodData as MethodStatementData, {
          companyName: methodData.contractor || 'Professional Electrical Services'
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
          variant: 'success'
        });
      }
    } catch (error) {
      console.error('Error generating Method Statement PDF:', error);
      setShowPDFModal(false);
      const methodPdfData = generateMethodStatementPDF(methodData as MethodStatementData, {
        companyName: methodData.contractor || 'Professional Electrical Services'
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
        variant: 'destructive'
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
          hasRequiredPPE: !!ramsData.requiredPPE
        },
        methodData: {
          jobTitle: methodData.jobTitle,
          stepsCount: methodData.steps?.length,
          toolsCount: methodData.toolsRequired?.length || 0,
          tipsCount: methodData.practicalTips?.length || 0,
          mistakesCount: methodData.commonMistakes?.length || 0,
          hasToolsRequired: !!methodData.toolsRequired,
          hasPracticalTips: !!methodData.practicalTips
        }
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
            risks: [...(ramsData.risks || [])].sort((a, b) => (b.riskRating || 0) - (a.riskRating || 0))
          }, 
          methodData
        }
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
          variant: 'success'
        });
      } else {
        console.log('PDF Monkey unavailable, using fallback', { 
          status: data?.status,
          message: data?.message,
          hint: data?.hint,
          templateId: data?.templateId,
          error: data?.error 
        });
        
        setShowPDFModal(false);
        
        if (data?.message || data?.hint) {
          toast({
            title: 'Using Alternative PDF Generator',
            description: data?.hint || data?.message || 'PDF Monkey unavailable',
            variant: 'default'
          });
        }
        
        // Generate PDF and save to storage
        const { generateCombinedRAMSPDFBlob } = await import('@/utils/rams-combined-pdf');
        const { saveRAMSPDFToStorage } = await import('@/utils/rams-pdf-storage');
        
        const pdfBlob = await generateCombinedRAMSPDFBlob(ramsData, methodData as MethodStatementData, {
          companyName: methodData.contractor || 'Professional Electrical Services',
          documentReference: `RAMS-${Date.now()}`
        });
        
        // Save to storage
        const saveResult = await saveRAMSPDFToStorage(
          pdfBlob,
          ramsData,
          methodData,
          'draft'
        );
        
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
            variant: 'success'
          });
        } else {
          toast({
            title: 'PDF Downloaded',
            description: 'Your Combined RAMS PDF has been downloaded (could not save to library)',
            variant: 'default'
          });
        }
      }
    } catch (error) {
      console.error('Error generating combined RAMS:', error);
      setShowPDFModal(false);
      
      toast({
        title: 'Switching to Alternative Method',
        description: 'Professional PDF generation unavailable, using built-in generator',
        variant: 'default'
      });
      
      try {
        const { generateCombinedRAMSPDFBlob } = await import('@/utils/rams-combined-pdf');
        const { saveRAMSPDFToStorage } = await import('@/utils/rams-pdf-storage');
        
        const pdfBlob = await generateCombinedRAMSPDFBlob(ramsData, methodData as MethodStatementData, {
          companyName: methodData.contractor || 'Professional Electrical Services',
          documentReference: `RAMS-${Date.now()}`
        });
        
        // Save to storage
        await saveRAMSPDFToStorage(
          pdfBlob,
          ramsData,
          methodData,
          'draft'
        );
        
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
          variant: 'success'
        });
      } catch (fallbackError) {
        console.error('Fallback PDF generation failed:', fallbackError);
        toast({
          title: 'PDF Generation Failed',
          description: 'Could not generate PDF. Please try again.',
          variant: 'destructive'
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
        risks: (ramsData.risks || []).map(risk => ({
          ...risk,
          furtherAction: risk.furtherAction || '',
          responsible: risk.responsible || '',
          actionBy: risk.actionBy || '',
          done: risk.done || false
        }))
      },
      methodStatementData: methodData ? {
        ...methodData,
        id: methodData.id || '',
        approvedBy: methodData.approvedBy || '',
        createdAt: methodData.createdAt || '',
        updatedAt: methodData.updatedAt || '',
        steps: (methodData.steps || []).map(step => ({
          ...step,
          dependencies: step.dependencies || [],
          isCompleted: step.isCompleted || false,
          notes: step.notes || '',
          linkedHazards: step.linkedHazards || []
        }))
      } : null
    };
    
    navigator.clipboard.writeText(JSON.stringify(combinedData, null, 2));
    toast({
      title: 'JSON Copied',
      description: 'Combined RAMS data with all fields copied to clipboard',
      variant: 'success'
    });
  };

  // Save to Library function
  const handleSaveToLibrary = async () => {
    if (!ramsData || !methodData) {
      toast({
        title: 'Cannot Save',
        description: 'No RAMS data available to save',
        variant: 'destructive'
      });
      return;
    }

    setLocalIsSaving(true);
    
    try {
      // Generate combined PDF blob
      const { generateCombinedRAMSPDFBlob } = await import('@/utils/rams-combined-pdf');
      const { saveRAMSPDFToStorage, updateRAMSDocument } = await import('@/utils/rams-pdf-storage');
      
      const pdfBlob = await generateCombinedRAMSPDFBlob(ramsData, methodData as MethodStatementData, {
        companyName: methodData.contractor || 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`
      });
      
      // Check if document already exists
      const { data: { user } } = await supabase.auth.getUser();
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
        saveResult = await saveRAMSPDFToStorage(
          pdfBlob,
          ramsData,
          methodData,
          'draft'
        );
        
        if (saveResult.success) {
          setLocalLastSaved(new Date());
          toast({
            title: 'Saved to Library',
            description: 'Your RAMS document is now available in Saved RAMS Documents. Tap to view.',
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
        variant: 'destructive'
      });
    } finally {
      setLocalIsSaving(false);
    }
  };


  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => {
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
    <div className={cn(
      "max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4 sm:space-y-6",
      isMobile && keyboardVisible && "pb-[100px]",
      isMobile && !keyboardVisible && "pb-[100px]"
    )}>
      <div className="bg-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Review & Edit
              </h2>
              <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-medium px-2 py-0.5">
                AI Generated
              </Badge>
            </div>
            {!isMobile && (
              <div className="flex items-center gap-2">
                {lastSaved && (
                  <span className="text-xs text-white/40 mr-2">
                    {isSaving ? 'Saving...' : `Saved ${lastSaved.toLocaleTimeString()}`}
                  </span>
                )}
                {onRegenerate && (
                  <Button
                    onClick={onRegenerate}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-3 text-xs text-white/50 hover:text-orange-400 hover:bg-orange-500/10"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Regenerate
                  </Button>
                )}
              </div>
            )}
          </div>
          {lastSaved && isMobile && (
            <span className="text-xs text-white/40 mt-1">
              {isSaving ? 'Saving...' : `Saved ${lastSaved.toLocaleTimeString()}`}
            </span>
          )}
        </div>
        
        {/* PHASE 4: Partial Completion Warning Banner */}
        {isPartial && (
          <div className="p-4 bg-yellow-500/10 border-b border-yellow-500/30">
            <Alert className="border-yellow-500/40 bg-yellow-500/5">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <AlertTitle className="text-yellow-500 font-semibold">Partial Generation</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground mt-2 space-y-2">
                <p>
                  {!ramsData && "⚠️ Risk assessment generation failed. "}
                  {!methodData && "⚠️ Method statement generation failed. "}
                  You can proceed with what's available or retry the failed section below.
                </p>
                {onRetry && (
                  <Button onClick={onRetry} variant="outline" size="sm" className="mt-2 border-yellow-500/40 hover:border-yellow-500 hover:bg-yellow-500/10">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Retry Failed Section
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        <div>
          <Tabs defaultValue="rams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-transparent rounded-none p-2 gap-2 border-b border-white/10">
              <TabsTrigger
                value="rams"
                className={cn(
                  "h-full min-h-[48px] rounded-xl text-sm font-medium transition-all duration-200",
                  "flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]",
                  "bg-white/[0.03] border border-transparent",
                  "data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow",
                  "data-[state=active]:border-elec-yellow/20 data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-white/50 data-[state=inactive]:hover:text-white/70",
                  "data-[state=inactive]:hover:bg-white/[0.05]"
                )}
              >
                <Shield className="h-4 w-4" />
                <span>Risk Assessment</span>
              </TabsTrigger>
              <TabsTrigger
                value="method"
                className={cn(
                  "h-full min-h-[48px] rounded-xl text-sm font-medium transition-all duration-200",
                  "flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]",
                  "bg-white/[0.03] border border-transparent",
                  "data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow",
                  "data-[state=active]:border-elec-yellow/20 data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-white/50 data-[state=inactive]:hover:text-white/70",
                  "data-[state=inactive]:hover:bg-white/[0.05]"
                )}
              >
                <FileText className="h-4 w-4" />
                <span>Method Statement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rams" className="space-y-6 mt-0 p-4 md:p-6">
              {ramsData ? (
                <>
                  {/* Summary Stats Card */}
                  <SummaryStatsCard risks={ramsData.risks || []} />
              
              {/* Enhanced Risks Section */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-xl font-bold text-elec-light flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                    <span>Identified Hazards</span>
                  </h4>
                  <Button 
                    onClick={addRisk} 
                    size="sm" 
                    className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-elec-card min-h-[44px] px-4 py-2 text-sm touch-manipulation"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Hazard
                  </Button>
                </div>
                
                {/* Empty state when no risks */}
                {(!ramsData.risks || ramsData.risks.length === 0) && (
                  <Card className="border-dashed border-elec-yellow/30">
                    <CardContent className="p-8 text-center">
                      <AlertTriangle className="h-16 w-16 text-elec-yellow/40 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-elec-light mb-2">No Hazards Identified Yet</h3>
                      <p className="text-sm text-elec-light/60 mb-4">
                        Add hazards manually using the button above or regenerate to identify potential risks for this installation.
                      </p>
                      {onRegenerate && (
                        <Button onClick={onRegenerate} variant="outline" size="sm" className="border-orange-500/40 text-orange-500 hover:bg-orange-500/10">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Try Again
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Risk Cards - Sorted by Risk Rating */}
                {ramsData.risks && ramsData.risks.length > 0 && (
                  <div className="space-y-3">
                    {[...(ramsData.risks || [])].sort((a, b) => (b.riskRating || 0) - (a.riskRating || 0)).map((risk, sortedIndex) => (
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
              </div>

              {/* PPE Section */}
              <PPEGridView 
                ppeDetails={ramsData.ppeDetails}
                requiredPPE={ramsData.requiredPPE}
              />

              {/* Emergency Procedures */}
              <EmergencyProceduresCards procedures={ramsData.emergencyProcedures} />
                </>
              ) : (
                <div className="p-8 text-center">
                  <Card className="border-dashed border-yellow-500/30">
                    <CardContent className="pt-6">
                      <AlertCircle className="h-16 w-16 text-yellow-500/40 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Risk Assessment Not Available</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        The risk assessment generation failed. Please retry to generate this section.
                      </p>
                      {onRetry && (
                        <Button onClick={onRetry} variant="outline" size="sm" className="border-yellow-500/40 hover:border-yellow-500 hover:bg-yellow-500/10">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Retry Generation
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="method" className="space-y-0 mt-0 pb-20">
              {methodData && Object.keys(methodData).length > 0 ? (
                <div className="p-4 md:p-6 space-y-4">
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
                  <MethodStatementSummary methodData={methodData as MethodStatementData} />

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

                  {/* Installation Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold text-elec-light flex items-center gap-2">
                        <FileText className="h-5 w-5 text-elec-yellow" />
                        Installation Steps
                      </h4>
                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                        <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 font-bold text-center">
                          {methodData.steps?.length || 0} Steps
                        </Badge>
                        <Button 
                          onClick={addStep} 
                          size="sm" 
                          className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-card min-h-[44px] px-3 py-2 text-sm touch-manipulation"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Step
                        </Button>
                      </div>
                    </div>
                    
                    {methodData.steps && methodData.steps.length > 0 ? (
                      <>
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
                      </>
                    ) : (
                      <Card className="border-dashed border-elec-yellow/30">
                        <CardContent className="p-8 text-center">
                          <FileText className="h-16 w-16 text-elec-yellow/40 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-elec-light mb-2">No Installation Steps Yet</h3>
                          <p className="text-sm text-elec-light/60 mb-4">
                            Add installation steps manually using the button above or regenerate to create method statement.
                          </p>
                          {onRegenerate && (
                            <Button onClick={onRegenerate} variant="outline" size="sm" className="border-orange-500/40 text-orange-500 hover:bg-orange-500/10">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Try Again
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Risk Assessment Summary */}
                  <RiskAssessmentSummary ramsData={ramsData} />

                  {/* Compliance References */}
                  <ComplianceReferencesCard methodData={methodData as MethodStatementData} />
                </div>
              ) : (
                <div className="p-6 bg-muted/30 rounded-lg border border-dashed border-orange-500/30 m-4">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-8 w-8 text-orange-400 shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-orange-400 mb-2">Method Statement Not Available</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        The method statement generation timed out or failed. You can still use the risk assessment data, or retry to generate the full document with the method statement included.
                      </p>
                      {onRegenerate && (
                        <Button
                          onClick={onRegenerate}
                          variant="outline"
                          size="sm"
                          className="border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/10 text-orange-400"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Regenerate Full Document
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Export Section - Desktop */}
          <div className="hidden sm:block p-4 sm:p-6 border-t border-white/10 bg-white/[0.02]">
            <div className="flex gap-3">
              <Button
                onClick={handleSaveToLibrary}
                disabled={isGenerating || localIsSaving}
                className="gap-2 flex-1 h-14 min-h-[48px] bg-white/[0.03] hover:bg-white/[0.06] text-white border border-white/[0.08] hover:border-white/[0.12] rounded-xl font-medium transition-all touch-manipulation active:scale-[0.98]"
                variant="outline"
              >
                {localIsSaving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FolderOpen className="h-5 w-5" />
                    Save to Library
                  </>
                )}
              </Button>
              <Button
                onClick={handleGenerateCombinedRAMS}
                disabled={isGenerating}
                className="gap-2 flex-1 h-14 min-h-[48px] bg-gradient-to-r from-elec-yellow to-amber-500 text-black hover:from-elec-yellow/90 hover:to-amber-500/90 rounded-xl font-semibold shadow-lg shadow-elec-yellow/20 transition-all touch-manipulation active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download PDF
                  </>
                )}
              </Button>
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
          onSave={() => onSave && onSave()}
          onDownload={handleGenerateCombinedRAMS}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

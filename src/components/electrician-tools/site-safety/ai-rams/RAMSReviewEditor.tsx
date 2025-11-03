import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, FileText, Edit3, AlertTriangle, CheckCircle, Shield, Save, Sparkles, Plus, X, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateRAMSPDF } from '@/utils/rams-pdf-professional';
import { generateMethodStatementPDF } from '@/utils/method-statement-pdf';
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';
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

interface RAMSReviewEditorProps {
  ramsData: RAMSData;
  methodData: Partial<MethodStatementData>;
  isSaving?: boolean;
  lastSaved?: Date | null;
  onSave?: () => void;
  onUpdate: (rams: RAMSData, method: Partial<MethodStatementData>) => void;
  rawHSResponse?: any;
  rawInstallerResponse?: any;
  mode?: 'embedded' | 'standalone';
  onRegenerate?: () => void;
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
  onRegenerate
}) => {
  // Normalize data on load to handle old/incomplete structures
  const normalizedRamsData: RAMSData = {
    ...initialRamsData,
    risks: (initialRamsData.risks || []).map(risk => ({
      ...risk,
      id: risk.id || `risk-${Math.random()}`,
      controls: risk.controls || '',
      riskRating: risk.riskRating || (risk.likelihood || 3) * (risk.severity || 3),
    }))
  };

  const normalizedMethodData: Partial<MethodStatementData> = {
    ...initialMethodData,
    steps: (initialMethodData.steps || []).map((step, idx) => ({
      ...step,
      id: step.id || `step-${idx + 1}`,
      equipmentNeeded: step.equipmentNeeded || [],
      qualifications: step.qualifications || [],
      estimatedDuration: step.estimatedDuration || '15 minutes',
      safetyRequirements: step.safetyRequirements || []
    }))
  };

  const [ramsData, setRamsData] = useState<RAMSData>(normalizedRamsData);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData>>(normalizedMethodData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPDFType, setCurrentPDFType] = useState<'combined' | 'rams' | 'method'>('combined');
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  
  const { isVisible: keyboardVisible } = useMobileKeyboard();

  useEffect(() => {
    onUpdate(ramsData, methodData);
  }, [ramsData, methodData]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateRisk = (riskId: string, updates: Partial<RAMSRisk>) => {
    setRamsData(prev => ({
      ...prev,
      risks: (prev.risks || []).map(risk =>
        risk.id === riskId ? { ...risk, ...updates } : risk
      )
    }));
  };

  const removeRisk = (riskId: string) => {
    setRamsData(prev => ({
      ...prev,
      risks: (prev.risks || []).filter(risk => risk.id !== riskId)
    }));
  };

  const addRisk = () => {
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
    
    setRamsData(prev => ({
      ...prev,
      risks: [...(prev.risks || []), newRisk]
    }));
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
          ramsData.projectName || 'Untitled Project',
          ramsData.location || 'No location specified',
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
          ramsData.projectName || 'Untitled Project',
          ramsData.location || 'No location specified',
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
      "space-y-6 md:space-y-8",
      isMobile && keyboardVisible && "pb-[100px]",
      isMobile && !keyboardVisible && "pb-[100px]"
    )}>
      <Card className="border-0 md:border md:border-elec-yellow/30 shadow-none md:shadow-2xl bg-transparent md:bg-elec-card/90 md:backdrop-blur-sm rounded-none md:rounded-2xl overflow-hidden">
        <CardHeader className="pb-6 bg-gradient-to-r from-elec-grey/50 to-elec-grey/30 border-b border-elec-yellow/20">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 text-foreground">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3 text-2xl md:text-xl font-bold tracking-tight leading-tight">
                <div className="h-12 w-12 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center border border-elec-yellow/40 shadow-[0_0_15px_rgba(255,193,7,0.2)]">
                  <Edit3 className="h-6 w-6 sm:h-5 sm:w-5 text-elec-yellow" />
                </div>
                <span className="bg-gradient-to-r from-elec-yellow to-elec-yellow/70 bg-clip-text text-transparent">
                  Review & Edit Documentation
                </span>
              </span>
              {lastSaved && (
                <span className="text-xs text-muted-foreground ml-13 sm:ml-13">
                  {isSaving ? 'Saving...' : `Last saved ${lastSaved.toLocaleTimeString()}`}
                </span>
              )}
            </div>
            {!isMobile && (
              <div className="flex items-center gap-3">
                {onRegenerate && (
                  <Button
                    onClick={onRegenerate}
                    size="sm"
                    variant="outline"
                    className="border-orange-500/40 hover:border-orange-500 h-11 px-5 font-semibold hover:bg-orange-500/10 transition-all text-orange-500"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                )}
                {onSave && (
                  <Button
                    onClick={onSave}
                    disabled={isSaving}
                    size="sm"
                    variant="outline"
                    className="border-elec-yellow/40 hover:border-elec-yellow h-11 px-5 font-semibold hover:bg-elec-yellow/10 transition-all"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
                <Badge variant="outline" className="bg-green-500/15 text-green-500 border-green-500/40 text-sm font-semibold px-3 py-1.5 h-11 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  AI Generated
                </Badge>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="rams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 lg:h-14 bg-gradient-to-r from-elec-grey to-elec-grey/90 border-b border-elec-yellow/20 rounded-none p-1">
              <TabsTrigger 
                value="rams" 
                className="text-xs sm:text-sm lg:text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow/20 data-[state=active]:to-elec-yellow/10 data-[state=active]:text-elec-yellow data-[state=active]:border data-[state=active]:border-elec-yellow/40 data-[state=active]:shadow-[0_0_15px_rgba(255,193,7,0.3)] transition-all h-full rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-elec-yellow/5"
              >
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Risk Assessment</span>
              </TabsTrigger>
              <TabsTrigger 
                value="method" 
                className="text-xs sm:text-sm lg:text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-elec-yellow/20 data-[state=active]:to-elec-yellow/10 data-[state=active]:text-elec-yellow data-[state=active]:border data-[state=active]:border-elec-yellow/40 data-[state=active]:shadow-[0_0_15px_rgba(255,193,7,0.3)] transition-all h-full rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-elec-yellow/5"
              >
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Method Statement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rams" className="space-y-6 mt-0 p-4 md:p-6">
              {/* Summary Stats Card */}
              <SummaryStatsCard risks={ramsData.risks || []} />
              
              {/* Enhanced Risks Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-elec-light flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                    <span>Identified Hazards</span>
                  </h4>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 font-bold">
                    {ramsData.risks?.length || 0} Risks
                  </Badge>
                </div>
                
                {/* Empty state when no risks */}
                {(!ramsData.risks || ramsData.risks.length === 0) && (
                  <Card className="border-dashed border-elec-yellow/30">
                    <CardContent className="p-8 text-center">
                      <AlertTriangle className="h-16 w-16 text-elec-yellow/40 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-elec-light mb-2">No Hazards Identified Yet</h3>
                      <p className="text-sm text-elec-light/60 mb-4">
                        Add hazards manually or regenerate to identify potential risks for this installation.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={addRisk} variant="outline" size="sm" className="border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Hazard
                        </Button>
                        {onRegenerate && (
                          <Button onClick={onRegenerate} variant="outline" size="sm" className="border-orange-500/40 text-orange-500 hover:bg-orange-500/10">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Try Again
                          </Button>
                        )}
                      </div>
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
            </TabsContent>

            <TabsContent value="method" className="space-y-6 mt-0 p-4 md:p-6">
              {/* SKIP OLD PPE/EMERGENCY - Using new components above */}
              {false && ramsData.ppeDetails && ramsData.ppeDetails.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xl sm:text-lg md:text-base font-bold text-foreground flex items-center gap-2.5">
                    <Shield className="h-5 w-5 md:h-4 md:w-4 text-elec-yellow" />
                    Required Personal Protective Equipment
                  </h4>
                  
                  {/* Desktop: Table View */}
                  <Card className="hidden md:block border md:border-primary/20 bg-elec-grey/30 md:bg-card/40">
                    <CardContent className="pt-4 px-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-elec-yellow/30">
                              <th className="text-left py-3 px-3 font-bold text-elec-yellow text-xs md:text-sm whitespace-nowrap">ITEM</th>
                              <th className="text-left py-3 px-3 font-bold text-elec-yellow text-xs md:text-sm whitespace-nowrap">PPE TYPE</th>
                              <th className="text-left py-3 px-3 font-bold text-elec-yellow text-xs md:text-sm whitespace-nowrap">STANDARD</th>
                              <th className="text-center py-3 px-3 font-bold text-elec-yellow text-xs md:text-sm whitespace-nowrap">MANDATORY?</th>
                              <th className="text-left py-3 px-3 font-bold text-elec-yellow text-xs md:text-sm whitespace-nowrap">PURPOSE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ramsData.ppeDetails.map((ppe, idx) => (
                              <tr key={ppe.id || `ppe-${idx}`} className="border-b border-border/20 hover:bg-elec-grey/20">
                                <td className="py-3 px-3 text-center font-semibold">{ppe.itemNumber}</td>
                                <td className="py-3 px-3 font-medium">{ppe.ppeType}</td>
                                <td className="py-3 px-3 text-primary text-xs">{ppe.standard}</td>
                                <td className="py-3 px-3 text-center">
                                  <Badge 
                                    variant={ppe.mandatory ? "destructive" : "secondary"} 
                                    className={cn("text-xs whitespace-nowrap", ppe.mandatory && "bg-red-500/90 text-white")}
                                  >
                                    {ppe.mandatory ? "MANDATORY" : "Recommended"}
                                  </Badge>
                                </td>
                                <td className="py-3 px-3 text-muted-foreground text-xs leading-relaxed">{ppe.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile: Card Grid View */}
                  <div className="md:hidden space-y-3">
                    {ramsData.ppeDetails.map((ppe, idx) => (
                      <Card key={ppe.id || `ppe-mobile-${idx}`} className="border-0 bg-elec-grey/30 border-l-4 border-l-elec-yellow/60">
                        <CardContent className="pt-3 pb-3 px-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40 font-semibold">
                                  #{ppe.itemNumber}
                                </Badge>
                                <Badge 
                                  variant={ppe.mandatory ? "destructive" : "secondary"}
                                  className={cn("text-xs", ppe.mandatory && "bg-red-500/90 text-white font-semibold")}
                                >
                                  {ppe.mandatory ? "MANDATORY" : "Recommended"}
                                </Badge>
                              </div>
                            </div>
                            
                            <h5 className="font-bold text-foreground text-base leading-tight">{ppe.ppeType}</h5>
                            
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">Standard:</span>
                              <span className="text-primary font-medium">{ppe.standard}</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed pt-1">{ppe.purpose}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback to legacy PPE if ppeDetails not available */}
              {(!ramsData.ppeDetails || ramsData.ppeDetails.length === 0) && 
               ramsData.requiredPPE && ramsData.requiredPPE.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xl sm:text-lg md:text-base font-bold text-foreground flex items-center gap-2.5">
                    <Shield className="h-5 w-5 md:h-4 md:w-4 text-elec-yellow" />
                    Required Personal Protective Equipment
                  </h4>
                  <Card className="border-0 md:border md:border-primary/20 bg-elec-grey/30 md:bg-card/40">
                    <CardContent className="pt-3 md:pt-4 px-4">
                      <ul className="list-disc list-outside space-y-2 pl-5">
                        {ramsData.requiredPPE.map((ppe, idx) => (
                          <li key={idx} className="text-sm text-foreground">{ppe}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Emergency Procedures Section */}
              {ramsData.emergencyProcedures && ramsData.emergencyProcedures.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xl sm:text-lg md:text-base font-bold text-foreground flex items-center gap-2.5 tracking-tight leading-tight">
                    <AlertCircle className="h-5 w-5 md:h-4 md:w-4 text-red-500" />
                    Emergency Procedures
                  </h4>
                  <Card className="border-0 md:border md:border-red-500/20 bg-elec-grey/30 md:bg-card/40 shadow-none rounded-lg">
                    <CardContent className="pt-3 md:pt-4 px-4">
                      <ul className="list-disc list-outside space-y-2 pl-5">
                        {ramsData.emergencyProcedures.map((proc, idx) => (
                          <li key={idx} className="text-sm text-foreground text-left">{proc}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

            </TabsContent>

            <TabsContent value="method" className="space-y-4 mt-6">
              {/* Method Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Contractor</label>
                  <Input
                    value={methodData.contractor}
                    onChange={(e) => setMethodData(prev => ({ ...prev, contractor: e.target.value }))}
                    className="mt-1 bg-background/50 border-primary/30 text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Supervisor</label>
                  <Input
                    value={methodData.supervisor}
                    onChange={(e) => setMethodData(prev => ({ ...prev, supervisor: e.target.value }))}
                    className="mt-1 bg-background/50 border-primary/30 text-foreground"
                  />
                </div>
              </div>

              {/* Method Steps - Now using Accordion */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                    Installation Steps ({methodData.steps?.length || 0})
                  </h4>
                </div>
                
                <Accordion type="multiple" className="space-y-2">
                  {methodData.steps?.map((step, index) => (
                    <AccordionItem 
                      key={step.id || `step-${index}`} 
                      value={`step-${step.id}`}
                      className="border-0 md:border md:border-primary/20 bg-elec-grey/30 md:bg-card/40 rounded-lg overflow-hidden border-l-4 border-l-elec-yellow/40"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:bg-elec-grey/40 hover:no-underline">
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <Badge variant="outline" className="bg-primary/10 shrink-0 font-semibold">
                            Step {step.stepNumber}
                          </Badge>
                          <span className="font-medium text-foreground line-clamp-1">{step.title || 'Untitled Step'}</span>
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3 pt-2">
                          <div className="flex items-start justify-between gap-3">
                            <Input
                              value={step.title}
                              onChange={(e) => updateStep(step.id, { title: e.target.value })}
                              className="flex-1 bg-background/50 border-primary/30 font-medium text-base md:text-lg"
                              placeholder="Step title"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStep(step.id)}
                              className="text-red-500 hover:text-red-600 shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="relative">
                            <label className="text-xs text-muted-foreground mb-1.5 block">Description</label>
                            <Textarea
                              value={step.description}
                              onChange={(e) => updateStep(step.id, { description: e.target.value })}
                              className="bg-background/50 border-primary/30 max-h-[400px] min-h-[120px] overflow-y-auto resize-y"
                              placeholder="Detailed step description with safety requirements..."
                              rows={6}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
                              {step.description?.length || 0} chars
                            </div>
                          </div>

                          {step.safetyRequirements && step.safetyRequirements.length > 0 && (
                            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <Shield className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1">Safety Requirements:</p>
                                  <p className="text-xs text-muted-foreground">{step.safetyRequirements.join(' • ')}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {/* Add New Step Button */}
                <Button
                  onClick={addStep}
                  variant="outline"
                  className="w-full border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Step
                </Button>
              </div>

            </TabsContent>
          </Tabs>

          {/* Download Buttons Section */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 px-4">
              <Download className="h-4 w-4 text-elec-yellow" />
              Download Documents
            </h4>
            
            {/* Desktop View - Download Combined RAMS */}
            <div className="hidden md:flex p-4">
              <Button
                onClick={handleGenerateCombinedRAMS}
                disabled={isGenerating}
                className="gap-2 w-full md:w-auto"
                variant="default"
                size="lg"
              >
                <FileText className="h-5 w-5" />
                Download Combined RAMS
              </Button>
            </div>

            {/* Mobile View - Direct download button */}
            <div className="md:hidden p-4">
              <Button
                onClick={handleGenerateCombinedRAMS}
                disabled={isGenerating}
                className="w-full gap-2"
                size="lg"
              >
                <Download className="h-5 w-5" />
                Download Combined RAMS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>



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

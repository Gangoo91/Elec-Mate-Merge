import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Edit3, Plus, X, AlertTriangle, CheckCircle, Code, Shield, AlertCircle, Copy, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateRAMSPDF } from '@/utils/rams-pdf-professional';
import { generateMethodStatementPDF } from '@/utils/method-statement-pdf';
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';
import { PDFGenerationModal } from './PDFGenerationModal';
import { MobilePDFDownloadSheet } from './MobilePDFDownloadSheet';
import { PDFPreviewModal } from './PDFPreviewModal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MobileBottomActionBar } from './MobileBottomActionBar';
import { SwipeableRiskCard } from './SwipeableRiskCard';
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard';
import { cn } from '@/lib/utils';

interface RAMSReviewEditorProps {
  ramsData: RAMSData;
  methodData: Partial<MethodStatementData>;
  isSaving?: boolean;
  lastSaved?: Date | null;
  onSave?: () => void;
  onUpdate: (rams: RAMSData, method: Partial<MethodStatementData>) => void;
  rawHSResponse?: any;
  rawInstallerResponse?: any;
}

export const RAMSReviewEditor: React.FC<RAMSReviewEditorProps> = ({
  ramsData: initialRamsData,
  methodData: initialMethodData,
  isSaving = false,
  lastSaved = null,
  onSave,
  onUpdate,
  rawHSResponse,
  rawInstallerResponse
}) => {
  const [ramsData, setRamsData] = useState<RAMSData>(initialRamsData);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData>>(initialMethodData);
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
      risks: prev.risks.map(risk =>
        risk.id === riskId ? { ...risk, ...updates } : risk
      )
    }));
  };

  const removeRisk = (riskId: string) => {
    setRamsData(prev => ({
      ...prev,
      risks: prev.risks.filter(risk => risk.id !== riskId)
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

  const getRiskLevelColor = (rating: number) => {
    if (rating <= 4) return 'bg-green-500';
    if (rating <= 9) return 'bg-yellow-500';
    if (rating <= 16) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRiskLevelBadge = (level: string) => {
    const colors = {
      low: 'bg-green-500/10 text-green-600 border-green-500/30',
      medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
      high: 'bg-red-500/10 text-red-600 border-red-500/30'
    };
    return colors[level as keyof typeof colors] || colors.medium;
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
          methodData
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
    setIsGenerating(true);
    setCurrentPDFType('combined');
    setShowPDFModal(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('generate-combined-rams-pdf', {
        body: { 
          ramsData, 
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
        
        const { generateCombinedRAMSPDF } = await import('@/utils/rams-combined-pdf');
        await generateCombinedRAMSPDF(ramsData, methodData as MethodStatementData, {
          companyName: methodData.contractor || 'Professional Electrical Services',
          documentReference: `RAMS-${Date.now()}`
        });
        
        toast({
          title: 'PDF Downloaded',
          description: 'Your Combined RAMS PDF has been downloaded using alternative method',
          variant: 'success'
        });
      }
    } catch (error) {
      console.error('Error generating combined RAMS:', error);
      setShowPDFModal(false);
      
      toast({
        title: 'Switching to Alternative Method',
        description: 'Professional PDF generation unavailable, using built-in generator',
        variant: 'default'
      });
      
      const { generateCombinedRAMSPDF } = await import('@/utils/rams-combined-pdf');
      await generateCombinedRAMSPDF(ramsData, methodData as MethodStatementData, {
        companyName: methodData.contractor || 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`
      });
      
      toast({
        title: 'PDF Downloaded',
        description: 'Your Combined RAMS PDF has been downloaded',
        variant: 'success'
      });
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
        risks: ramsData.risks.map(risk => ({
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
        steps: methodData.steps.map(step => ({
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
      "space-y-6 md:space-y-8 px-3 sm:px-0",
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

            <TabsContent value="rams" className="space-y-6 mt-0 p-6 md:p-8">
              {/* Project Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                <div>
                  <label className="text-lg sm:text-base md:text-sm font-semibold text-elec-light tracking-wide">Project Name</label>
                  <Input
                    value={ramsData.projectName}
                    onChange={(e) => setRamsData(prev => ({ ...prev, projectName: e.target.value }))}
                    className="mt-2 h-14 sm:h-12 text-base sm:text-sm bg-elec-grey border-elec-yellow/20 text-foreground font-medium"
                  />
                </div>
                <div>
                  <label className="text-lg sm:text-base md:text-sm font-semibold text-elec-light tracking-wide">Location</label>
                  <Input
                    value={ramsData.location}
                    onChange={(e) => setRamsData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-2 h-14 sm:h-12 text-base sm:text-sm bg-elec-grey border-elec-yellow/20 text-foreground font-medium"
                  />
                </div>
              </div>

              {/* Enhanced Risks Section */}
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-elec-yellow/10 to-transparent border-l-4 border-elec-yellow">
                  <h4 className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-3 tracking-tight">
                    <AlertTriangle className="h-6 w-6 sm:h-5 sm:w-5 text-elec-yellow" />
                    <span>Identified Risks</span>
                  </h4>
                  <Badge variant="outline" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 font-bold text-base px-3 py-1">
                    {ramsData.risks.length}
                  </Badge>
                </div>
                
                {ramsData.risks.map((risk) => {
                  const riskRating = risk.riskRating || 0;
                  const riskLevel = riskRating <= 4 ? 'low' : riskRating <= 9 ? 'medium' : 'high';
                  const borderColors = {
                    low: 'border-l-green-500',
                    medium: 'border-l-yellow-500',
                    high: 'border-l-red-500'
                  };
                  return (
                    <Card key={risk.id} className={`border-0 md:border md:border-elec-yellow/30 bg-elec-grey/30 md:bg-elec-grey/50 md:backdrop-blur-sm hover:border-elec-yellow/50 transition-all border-l-4 ${borderColors[riskLevel]} shadow-none md:shadow-lg rounded-lg`}>
                      <CardContent className="pt-4 pb-4 px-4 md:pt-5 md:pb-5 md:px-6">
                      {/* Risk card content */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-2">
                          <Input
                            value={risk.hazard}
                            onChange={(e) => updateRisk(risk.id, { hazard: e.target.value })}
                            className="flex-1 bg-background/50 border-primary/30 font-medium"
                            placeholder="Hazard"
                          />
                          <Badge className={`${getRiskLevelColor(risk.riskRating)} text-white whitespace-nowrap`}>
                            Risk: {risk.riskRating}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRisk(risk.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <Textarea
                          value={risk.controls}
                          onChange={(e) => updateRisk(risk.id, { controls: e.target.value })}
                          className="bg-background/50 border-primary/30"
                          placeholder="Control measures"
                          rows={2}
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-muted-foreground">Likelihood (1-5)</label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={risk.likelihood}
                              onChange={(e) => {
                                const likelihood = parseInt(e.target.value);
                                updateRisk(risk.id, {
                                  likelihood,
                                  riskRating: likelihood * risk.severity
                                });
                              }}
                              className="bg-background/50 border-primary/30"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Severity (1-5)</label>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={risk.severity}
                              onChange={(e) => {
                                const severity = parseInt(e.target.value);
                                updateRisk(risk.id, {
                                  severity,
                                  riskRating: risk.likelihood * severity
                                });
                              }}
                              className="bg-background/50 border-primary/30"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
              </div>

              {/* PPE Section */}
              {ramsData.requiredPPE && ramsData.requiredPPE.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xl sm:text-lg md:text-base font-bold text-foreground flex items-center gap-2.5 tracking-tight leading-tight">
                    <Shield className="h-5 w-5 md:h-4 md:w-4 text-elec-yellow" />
                    Required Personal Protective Equipment
                  </h4>
                  <Card className="border-0 md:border md:border-primary/20 bg-elec-grey/30 md:bg-card/40 shadow-none rounded-lg">
                    <CardContent className="pt-3 md:pt-4 px-4">
                      <ul className="list-disc list-inside space-y-2">
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
                      <ul className="list-disc list-inside space-y-2">
                        {ramsData.emergencyProcedures.map((proc, idx) => (
                          <li key={idx} className="text-sm text-foreground">{proc}</li>
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

              {/* Method Steps */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  Installation Steps ({methodData.steps?.length || 0})
                </h4>
                
                {methodData.steps?.map((step) => (
                  <Card key={step.id} className="border-0 md:border md:border-primary/20 bg-elec-grey/30 md:bg-card/40 shadow-none rounded-lg border-l-4 border-l-elec-yellow/40">
                    <CardContent className="pt-3 md:pt-4 px-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10">
                              Step {step.stepNumber}
                            </Badge>
                            <Input
                              value={step.title}
                              onChange={(e) => updateStep(step.id, { title: e.target.value })}
                              className="flex-1 bg-background/50 border-primary/30 font-medium"
                              placeholder="Step title"
                            />
                          </div>
                          <Badge className={getRiskLevelBadge(step.riskLevel)}>
                            {step.riskLevel}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStep(step.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <Textarea
                          value={step.description}
                          onChange={(e) => updateStep(step.id, { description: e.target.value })}
                          className="bg-background/50 border-primary/30"
                          placeholder="Step description"
                          rows={2}
                        />

                        <div className="text-xs text-muted-foreground">
                          Safety: {step.safetyRequirements.join(', ')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

            </TabsContent>
          </Tabs>

          {/* Download Buttons Section */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Download className="h-4 w-4 text-elec-yellow" />
              Download Documents
            </h4>
            
            {/* Desktop View - All buttons visible */}
            <div className="hidden md:flex flex-wrap gap-3">
              <Button
                onClick={handleGenerateCombinedRAMS}
                disabled={isGenerating}
                className="gap-2"
                variant="default"
              >
                <FileText className="h-4 w-4" />
                Combined RAMS
              </Button>
              <Button
                onClick={handleGenerateRAMSPDF}
                disabled={isGenerating}
                className="gap-2"
                variant="outline"
              >
                <FileText className="h-4 w-4" />
                RAMS Only
              </Button>
              <Button
                onClick={handleGenerateMethodPDF}
                disabled={isGenerating}
                className="gap-2"
                variant="outline"
              >
                <FileText className="h-4 w-4" />
                Method Statement
              </Button>
            </div>

            {/* Mobile View - Single button to open sheet */}
            <div className="md:hidden">
              <Button
                onClick={() => setShowMobileSheet(true)}
                disabled={isGenerating}
                className="w-full gap-2"
                size="lg"
              >
                <Download className="h-5 w-5" />
                Download PDF Options
              </Button>
              <Button
                onClick={handleCopyJSON}
                disabled={isGenerating}
                className="w-full gap-2 mt-2"
                variant="outline"
                size="lg"
              >
                <Code className="h-5 w-5" />
                Copy JSON
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Response JSON Display - Developer/Debug Section */}
      {(rawHSResponse || rawInstallerResponse) && (
        <Card className="border-0 md:border md:border-blue-500/30 bg-slate-900/30 md:bg-slate-900/50 shadow-none rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-blue-400">
                <Code className="h-5 w-5" />
                AI Response Data (Debug)
              </span>
              <Button
                onClick={() => {
                  const debugData = {
                    timestamp: new Date().toISOString(),
                    rawResponses: {
                      healthSafety: rawHSResponse,
                      installer: rawInstallerResponse
                    },
                    transformedData: {
                      ramsData,
                      methodData
                    },
                    dataMapping: {
                      hazardsIdentified: ramsData.hazards?.length || 0,
                      risksGenerated: ramsData.risks?.length || 0,
                      methodSteps: methodData.steps?.length || 0,
                      linkedHazards: methodData.steps?.filter(s => s.linkedHazards?.length > 0).length || 0,
                      ppeItems: ramsData.requiredPPE?.length || 0,
                      emergencyProcedures: ramsData.emergencyProcedures?.length || 0,
                      practicalTips: methodData.practicalTips?.length || 0,
                      commonMistakes: methodData.commonMistakes?.length || 0,
                      toolsRequired: methodData.toolsRequired?.length || 0,
                      materialsRequired: methodData.materialsRequired?.length || 0,
                      complianceRegulations: ramsData.complianceRegulations?.length || 0
                    }
                  };
                  
                  navigator.clipboard.writeText(JSON.stringify(debugData, null, 2));
                  toast({
                    title: 'Debug Data Copied',
                    description: 'Complete AI response data copied to clipboard',
                    variant: 'default'
                  });
                }}
                size="sm"
                variant="outline"
                className="border-blue-500/30"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Debug JSON
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {/* Health & Safety Response */}
              {rawHSResponse && (
                <AccordionItem value="hs-response">
                  <AccordionTrigger className="text-blue-300">
                    Health & Safety Agent Response
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-slate-950 p-4 rounded-lg overflow-auto max-h-96">
                      <pre className="text-xs text-green-400">
                        {JSON.stringify(rawHSResponse, null, 2)}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Installer Response */}
              {rawInstallerResponse && (
                <AccordionItem value="installer-response">
                  <AccordionTrigger className="text-blue-300">
                    Installer Agent Response
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-slate-950 p-4 rounded-lg overflow-auto max-h-96">
                      <pre className="text-xs text-green-400">
                        {JSON.stringify(rawInstallerResponse, null, 2)}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Transformed RAMS Data */}
              <AccordionItem value="rams-data">
                <AccordionTrigger className="text-blue-300">
                  Transformed RAMS Data
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-slate-950 p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="text-xs text-yellow-400">
                      {JSON.stringify(ramsData, null, 2)}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Transformed Method Statement Data */}
              <AccordionItem value="method-data">
                <AccordionTrigger className="text-blue-300">
                  Transformed Method Statement Data
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-slate-950 p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="text-xs text-yellow-400">
                      {JSON.stringify(methodData, null, 2)}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Data Mapping Summary */}
              <AccordionItem value="mapping-summary">
                <AccordionTrigger className="text-blue-300">
                  Data Mapping Summary
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Hazards Identified:</span>
                      <span className="font-mono text-blue-400">{ramsData.hazards?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risks Generated:</span>
                      <span className="font-mono text-blue-400">{ramsData.risks?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method Steps:</span>
                      <span className="font-mono text-blue-400">{methodData.steps?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Steps with Linked Hazards:</span>
                      <span className="font-mono text-blue-400">
                        {methodData.steps?.filter(s => s.linkedHazards?.length > 0).length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>PPE Items:</span>
                      <span className="font-mono text-blue-400">{ramsData.requiredPPE?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Procedures:</span>
                      <span className="font-mono text-blue-400">{ramsData.emergencyProcedures?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Practical Tips:</span>
                      <span className="font-mono text-blue-400">{methodData.practicalTips?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Common Mistakes:</span>
                      <span className="font-mono text-blue-400">{methodData.commonMistakes?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tools Required:</span>
                      <span className="font-mono text-blue-400">{methodData.toolsRequired?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materials Required:</span>
                      <span className="font-mono text-blue-400">{methodData.materialsRequired?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Regulations:</span>
                      <span className="font-mono text-blue-400">{ramsData.complianceRegulations?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Warnings:</span>
                      <span className="font-mono text-blue-400">{ramsData.complianceWarnings?.length || 0}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

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
        onDownloadRAMS={handleGenerateRAMSPDF}
        onDownloadMethod={handleGenerateMethodPDF}
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

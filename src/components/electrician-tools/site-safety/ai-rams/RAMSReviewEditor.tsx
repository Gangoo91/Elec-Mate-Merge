import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Edit3, Plus, X, AlertTriangle, CheckCircle, Code } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateRAMSPDF } from '@/utils/rams-pdf-professional';
import { generateMethodStatementPDF } from '@/utils/method-statement-pdf';
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';
import { PDFGenerationModal } from './PDFGenerationModal';
import { MobilePDFDownloadSheet } from './MobilePDFDownloadSheet';
import { PDFPreviewModal } from './PDFPreviewModal';

interface RAMSReviewEditorProps {
  ramsData: RAMSData;
  methodData: Partial<MethodStatementData>;
  isSaving?: boolean;
  lastSaved?: Date | null;
  onSave?: () => void;
  onUpdate: (rams: RAMSData, method: Partial<MethodStatementData>) => void;
}

export const RAMSReviewEditor: React.FC<RAMSReviewEditorProps> = ({
  ramsData: initialRamsData,
  methodData: initialMethodData,
  isSaving = false,
  lastSaved = null,
  onSave,
  onUpdate
}) => {
  const [ramsData, setRamsData] = useState<RAMSData>(initialRamsData);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData>>(initialMethodData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPDFType, setCurrentPDFType] = useState<'combined' | 'rams' | 'method'>('combined');
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        console.log('Falling back to client-side PDF generation', { data, error });
        setShowPDFModal(false);
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
      }
    } catch (error) {
      console.error('Error generating combined RAMS:', error);
      setShowPDFModal(false);
      const { generateCombinedRAMSPDF } = await import('@/utils/rams-combined-pdf');
      await generateCombinedRAMSPDF(ramsData, methodData as MethodStatementData, {
        companyName: methodData.contractor || 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`
      });
      
      toast({
        title: 'PDF Generation Error',
        description: 'Failed to generate PDF, using backup method',
        variant: 'destructive'
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

  return (
    <div className="space-y-5 md:space-y-6 pb-safe">
      <Card className="border-elec-yellow/20 shadow-md bg-elec-grey">
        <CardHeader className="pb-5">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-foreground">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2.5 text-xl md:text-xl font-bold tracking-tight leading-tight">
                <Edit3 className="h-5 w-5" />
                Review & Edit Generated Documentation
              </span>
              {lastSaved && (
                <span className="text-xs text-elec-light/60">
                  {isSaving ? 'Saving...' : `Last saved ${lastSaved.toLocaleTimeString()}`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onSave && (
                <Button
                  onClick={onSave}
                  disabled={isSaving}
                  size="sm"
                  variant="outline"
                  className="border-elec-yellow/30 h-10 px-4 font-semibold"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              )}
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30 text-sm font-semibold">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                AI Generated
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-elec-grey/80">
              <TabsTrigger value="rams" className="text-base md:text-base font-semibold">Risk Assessment</TabsTrigger>
              <TabsTrigger value="method" className="text-base md:text-base font-semibold">Method Statement</TabsTrigger>
            </TabsList>

            <TabsContent value="rams" className="space-y-5 mt-6">
              {/* Project Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
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

              {/* Risks */}
              <div className="space-y-4">
                <h4 className="text-xl sm:text-lg md:text-base font-bold text-foreground flex items-center gap-2.5 tracking-tight leading-tight">
                  <AlertTriangle className="h-5 w-5 md:h-4 md:w-4 text-elec-yellow" />
                  Identified Risks ({ramsData.risks.length})
                </h4>
                
                {ramsData.risks.map((risk) => (
                  <Card key={risk.id} className="border-primary/20 bg-card/40">
                    <CardContent className="pt-4">
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
                ))}
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-4 gap-4 pb-safe">
                <Button
                  onClick={handleGenerateRAMSPDF}
                  disabled={isGenerating}
                  className="h-14 w-full touch-manipulation border-2 border-elec-yellow/30 bg-elec-gray text-elec-light hover:border-elec-yellow/50 hover:bg-elec-gray/80 font-semibold active:scale-95 transition-all"
                >
                  <Download className="h-5 w-5 mr-2 text-elec-yellow" />
                  Risk Assessment
                </Button>
                
                <Button
                  onClick={handleGenerateMethodPDF}
                  disabled={isGenerating}
                  className="h-14 w-full touch-manipulation border-2 border-elec-yellow/30 bg-elec-gray text-elec-light hover:border-elec-yellow/50 hover:bg-elec-gray/80 font-semibold active:scale-95 transition-all"
                >
                  <Download className="h-5 w-5 mr-2 text-elec-yellow" />
                  Method Statement
                </Button>
                
                <Button
                  onClick={handleGenerateCombinedRAMS}
                  disabled={isGenerating}
                  className="h-14 w-full touch-manipulation bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-bold active:scale-95 transition-transform"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Combined RAMS
                </Button>

                <Button
                  onClick={handleCopyJSON}
                  variant="outline"
                  className="h-14 w-full touch-manipulation border-2 border-primary/30 bg-background text-foreground hover:border-primary/50 hover:bg-background/80 font-semibold active:scale-95 transition-all"
                >
                  <Code className="h-5 w-5 mr-2" />
                  Copy JSON
                </Button>
              </div>
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
                  <Card key={step.id} className="border-primary/20 bg-card/40">
                    <CardContent className="pt-4">
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
              <Button
                onClick={handleCopyJSON}
                disabled={isGenerating}
                className="gap-2 ml-auto"
                variant="ghost"
              >
                <Code className="h-4 w-4" />
                Copy JSON
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
    </div>
  );
};

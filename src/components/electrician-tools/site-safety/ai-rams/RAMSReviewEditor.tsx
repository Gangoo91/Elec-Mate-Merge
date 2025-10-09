import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Edit3, Plus, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateRAMSPDF } from '@/utils/rams-pdf-professional';
import { generateMethodStatementPDF } from '@/utils/method-statement-pdf';
import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';

interface RAMSReviewEditorProps {
  ramsData: RAMSData;
  methodData: Partial<MethodStatementData>;
  onUpdate: (rams: RAMSData, method: Partial<MethodStatementData>) => void;
}

export const RAMSReviewEditor: React.FC<RAMSReviewEditorProps> = ({
  ramsData: initialRamsData,
  methodData: initialMethodData,
  onUpdate
}) => {
  const [ramsData, setRamsData] = useState<RAMSData>(initialRamsData);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData>>(initialMethodData);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    onUpdate(ramsData, methodData);
  }, [ramsData, methodData]);

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
    try {
      await generateRAMSPDF(ramsData, {
        includeSignatures: true,
        companyName: methodData.contractor || 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`,
        reviewDate: methodData.reviewDate
      });

      toast({
        title: 'RAMS PDF Generated',
        description: 'Your Risk Assessment document has been downloaded.'
      });
    } catch (error) {
      console.error('Error generating RAMS PDF:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate RAMS PDF.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMethodPDF = async () => {
    setIsGenerating(true);
    try {
      const methodPdfData = generateMethodStatementPDF(methodData as MethodStatementData, {
        companyName: methodData.contractor || 'Professional Electrical Services'
      });

      // Create blob and download
      const blob = new Blob([new Uint8Array(methodPdfData)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Method_Statement_${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: 'Method Statement PDF Generated',
        description: 'Your Method Statement has been downloaded.'
      });
    } catch (error) {
      console.error('Error generating Method Statement PDF:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate Method Statement PDF.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-card/60">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <span className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Review & Edit Generated Documentation
            </span>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              AI Generated
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rams" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rams">Risk Assessment</TabsTrigger>
              <TabsTrigger value="method">Method Statement</TabsTrigger>
            </TabsList>

            <TabsContent value="rams" className="space-y-4 mt-6">
              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Project Name</label>
                  <Input
                    value={ramsData.projectName}
                    onChange={(e) => setRamsData(prev => ({ ...prev, projectName: e.target.value }))}
                    className="mt-1 bg-background/50 border-primary/30 text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Input
                    value={ramsData.location}
                    onChange={(e) => setRamsData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1 bg-background/50 border-primary/30 text-foreground"
                  />
                </div>
              </div>

              {/* Risks */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  Identified Risks ({ramsData.risks.length})
                </h4>
                
                {ramsData.risks.map((risk) => (
                  <Card key={risk.id} className="border-primary/20 bg-card/40">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
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

              <Button
                onClick={handleGenerateRAMSPDF}
                disabled={isGenerating}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Download Risk Assessment PDF'}
              </Button>
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

              <Button
                onClick={handleGenerateMethodPDF}
                disabled={isGenerating}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Download Method Statement PDF'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

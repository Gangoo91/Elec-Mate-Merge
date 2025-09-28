import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  FileText, 
  Plus, 
  X, 
  Download, 
  Eye, 
  AlertTriangle, 
  Building, 
  Shield,
  ClipboardList,
  Edit3,
  Loader2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Users,
  Wrench
} from 'lucide-react';
import { useRAMS } from './rams/RAMSContext';
import { generateRAMSPDF } from '@/utils/rams-pdf';
import { HazardSelect } from './common/HazardSelect';
import { RiskSelect } from './common/RiskSelect';
import { RiskMatrix } from './common/RiskMatrix';
import { toast } from '@/hooks/use-toast';
import type { MethodStep, MethodStatementData } from '@/types/method-statement';
import type { RAMSRisk } from '@/types/rams';

interface IntegratedRAMSData {
  // Project Information
  projectName: string;
  location: string;
  assessor: string;
  date: string;
  
  // Risk Assessment
  risks: RAMSRisk[];
  
  // Method Statement
  contractor: string;
  supervisor: string;
  workType: string;
  duration: string;
  teamSize: string;
  description: string;
  overallRiskLevel: 'low' | 'medium' | 'high';
  reviewDate: string;
  steps: MethodStep[];
}

const IntegratedRAMSGenerator: React.FC = () => {
  const { ramsData, updateProjectInfo, addRisk, updateRisk, removeRisk } = useRAMS();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Method Statement specific data
  const [methodData, setMethodData] = useState<Partial<MethodStatementData>>({
    contractor: '',
    supervisor: '',
    workType: '',
    duration: '',
    teamSize: '',
    description: '',
    overallRiskLevel: 'medium',
    reviewDate: '',
    steps: []
  });

  const [newRisk, setNewRisk] = useState({
    hazard: '',
    risk: '',
    likelihood: 1,
    severity: 1,
    controls: ''
  });

  const [newStep, setNewStep] = useState<Partial<MethodStep>>({
    title: '',
    description: '',
    safetyRequirements: [],
    equipmentNeeded: [],
    qualifications: [],
    estimatedDuration: '',
    riskLevel: 'medium'
  });

  const steps = [
    { id: 'project', title: 'Project Details', icon: Building },
    { id: 'risks', title: 'Risk Assessment', icon: Shield },
    { id: 'method', title: 'Method Statement', icon: ClipboardList },
    { id: 'review', title: 'Review & Export', icon: Eye }
  ];

  const currentStepProgress = ((currentStep + 1) / steps.length) * 100;

  const handleAddRisk = () => {
    if (newRisk.hazard && newRisk.risk) {
      const riskRating = newRisk.likelihood * newRisk.severity;
      const residualRisk = Math.max(1, Math.floor(riskRating / 2));
      
      addRisk({
        ...newRisk,
        riskRating,
        residualRisk
      });
      
      setNewRisk({
        hazard: '',
        risk: '',
        likelihood: 1,
        severity: 1,
        controls: ''
      });
      
      toast({
        title: 'Risk Added',
        description: 'Risk assessment has been added successfully.',
        variant: 'success'
      });
    }
  };

  const handleAddMethodStep = () => {
    if (newStep.title && newStep.description) {
      const step: MethodStep = {
        id: `step-${Date.now()}`,
        stepNumber: (methodData.steps?.length || 0) + 1,
        title: newStep.title,
        description: newStep.description,
        safetyRequirements: newStep.safetyRequirements || [],
        equipmentNeeded: newStep.equipmentNeeded || [],
        qualifications: newStep.qualifications || [],
        estimatedDuration: newStep.estimatedDuration || '30 mins',
        riskLevel: newStep.riskLevel || 'medium',
        isCompleted: false
      };

      setMethodData(prev => ({
        ...prev,
        steps: [...(prev.steps || []), step]
      }));

      setNewStep({
        title: '',
        description: '',
        safetyRequirements: [],
        equipmentNeeded: [],
        qualifications: [],
        estimatedDuration: '',
        riskLevel: 'medium'
      });

      toast({
        title: 'Method Step Added',
        description: 'Work step has been added to the method statement.',
        variant: 'success'
      });
    }
  };

  const linkRiskToMethodStep = (riskId: string, stepId: string) => {
    // Link specific risks to method steps for integrated documentation
    setMethodData(prev => ({
      ...prev,
      steps: prev.steps?.map(step => 
        step.id === stepId 
          ? { ...step, linkedHazards: [...(step.linkedHazards || []), riskId] }
          : step
      ) || []
    }));
  };

  const generateIntegratedPDF = async () => {
    const validation = validateAllSections();
    if (!validation.isValid) {
      toast({
        title: 'Validation Error',
        description: validation.errors.join('. '),
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Create integrated RAMS document with method statement
      const integratedData = {
        ...ramsData,
        methodStatement: methodData,
        integrationNotes: 'This document contains both risk assessment and method statement for comprehensive safety planning.'
      };

      await generateRAMSPDF(integratedData, {
        includeSignatures: true,
        companyName: 'Professional Electrical Services',
        documentReference: `RAMS-${Date.now()}`,
        reviewDate: methodData.reviewDate
      });

      toast({
        title: 'RAMS Document Generated',
        description: 'Professional integrated RAMS document has been downloaded.',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate PDF. Please check your data and try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const validateAllSections = () => {
    const errors: string[] = [];
    
    // Project validation
    if (!ramsData.projectName) errors.push('Project name is required');
    if (!ramsData.location) errors.push('Location is required');
    if (!ramsData.assessor) errors.push('Assessor name is required');
    if (!ramsData.date) errors.push('Assessment date is required');
    
    // Risk assessment validation
    if (!ramsData.risks || ramsData.risks.length === 0) {
      errors.push('At least one risk must be identified');
    }
    
    // Method statement validation
    if (!methodData.contractor) errors.push('Contractor name is required');
    if (!methodData.supervisor) errors.push('Supervisor name is required');
    if (!methodData.workType) errors.push('Work type is required');
    if (!methodData.steps || methodData.steps.length === 0) {
      errors.push('At least one method step is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const getRiskLevelColor = (rating: number) => {
    if (rating <= 4) return 'bg-green-500';
    if (rating <= 9) return 'bg-yellow-500';
    if (rating <= 16) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const renderProjectDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="projectName" className="text-white">Project Name *</Label>
          <Input
            id="projectName"
            value={ramsData.projectName}
            onChange={(e) => updateProjectInfo({ projectName: e.target.value })}
            placeholder="Enter project name"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="location" className="text-white">Location *</Label>
          <Input
            id="location"
            value={ramsData.location}
            onChange={(e) => updateProjectInfo({ location: e.target.value })}
            placeholder="Enter project location"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="assessor" className="text-white">Assessor *</Label>
          <Input
            id="assessor"
            value={ramsData.assessor}
            onChange={(e) => updateProjectInfo({ assessor: e.target.value })}
            placeholder="Enter assessor name"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="date" className="text-white">Assessment Date *</Label>
          <Input
            id="date"
            type="date"
            value={ramsData.date}
            onChange={(e) => updateProjectInfo({ date: e.target.value })}
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contractor" className="text-white">Contractor *</Label>
          <Input
            id="contractor"
            value={methodData.contractor}
            onChange={(e) => setMethodData(prev => ({ ...prev, contractor: e.target.value }))}
            placeholder="Enter contractor name"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="supervisor" className="text-white">Supervisor *</Label>
          <Input
            id="supervisor"
            value={methodData.supervisor}
            onChange={(e) => setMethodData(prev => ({ ...prev, supervisor: e.target.value }))}
            placeholder="Enter supervisor name"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="workType" className="text-white">Work Type *</Label>
          <Input
            id="workType"
            value={methodData.workType}
            onChange={(e) => setMethodData(prev => ({ ...prev, workType: e.target.value }))}
            placeholder="e.g., Electrical Installation"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="teamSize" className="text-white">Team Size</Label>
          <Input
            id="teamSize"
            value={methodData.teamSize}
            onChange={(e) => setMethodData(prev => ({ ...prev, teamSize: e.target.value }))}
            placeholder="e.g., 2 electricians"
            className="mt-1 bg-background/50 border-primary/30 text-foreground"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-white">Work Description</Label>
        <Textarea
          id="description"
          value={methodData.description}
          onChange={(e) => setMethodData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the work to be carried out..."
          className="mt-1 bg-background/50 border-primary/30 text-foreground"
          rows={3}
        />
      </div>
    </div>
  );

  const renderRiskAssessment = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <RiskMatrix />
      </div>

      <Card className="border-primary/30 bg-card/60">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground">Hazard *</Label>
              <HazardSelect 
                value={newRisk.hazard}
                onValueChange={(hazard) => setNewRisk(prev => ({ ...prev, hazard }))}
                placeholder="Select or type hazard"
              />
            </div>
            <div>
              <Label className="text-foreground">Risk/Consequence *</Label>
              <RiskSelect
                selectedHazard={newRisk.hazard}
                value={newRisk.risk}
                onValueChange={(risk) => setNewRisk(prev => ({ ...prev, risk }))}
                onControlMeasuresChange={(measures) => setNewRisk(prev => ({ ...prev, controls: measures.join('\n• ') }))}
                placeholder="Select or type risk"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground">Likelihood (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={newRisk.likelihood}
                onChange={(e) => setNewRisk(prev => ({ ...prev, likelihood: parseInt(e.target.value) || 1 }))}
                className="bg-background/50 border-primary/30 text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground">Severity (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={newRisk.severity}
                onChange={(e) => setNewRisk(prev => ({ ...prev, severity: parseInt(e.target.value) || 1 }))}
                className="bg-background/50 border-primary/30 text-foreground"
              />
            </div>
          </div>

          <div>
            <Label className="text-foreground">Control Measures</Label>
            <Textarea
              value={newRisk.controls}
              onChange={(e) => setNewRisk(prev => ({ ...prev, controls: e.target.value }))}
              placeholder="Describe control measures to mitigate this risk..."
              className="bg-background/50 border-primary/30 text-foreground"
              rows={3}
            />
          </div>

          <Button 
            onClick={handleAddRisk}
            disabled={!newRisk.hazard || !newRisk.risk}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </Button>
        </CardContent>
      </Card>

      {ramsData.risks.length > 0 && (
        <Card className="border-primary/30 bg-card/60">
          <CardHeader>
            <CardTitle className="text-foreground">Identified Risks ({ramsData.risks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ramsData.risks.map((risk) => (
                <div key={risk.id} className="p-4 border border-primary/20 rounded-lg bg-card/40">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{risk.hazard}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{risk.risk}</p>
                    </div>
                    <Badge className={`${getRiskLevelColor(risk.riskRating)} text-white`}>
                      Risk: {risk.riskRating}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <strong>Controls:</strong> {risk.controls}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderMethodStatement = () => (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-card/60">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Method Step
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-foreground">Step Title *</Label>
            <Input
              value={newStep.title}
              onChange={(e) => setNewStep(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Isolate electrical supply"
              className="bg-background/50 border-primary/30 text-foreground"
            />
          </div>

          <div>
            <Label className="text-foreground">Step Description *</Label>
            <Textarea
              value={newStep.description}
              onChange={(e) => setNewStep(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of how to perform this step safely..."
              className="bg-background/50 border-primary/30 text-foreground"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-foreground">Duration</Label>
              <Input
                value={newStep.estimatedDuration}
                onChange={(e) => setNewStep(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                placeholder="e.g., 30 mins"
                className="bg-background/50 border-primary/30 text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground">Risk Level</Label>
              <select
                value={newStep.riskLevel}
                onChange={(e) => setNewStep(prev => ({ ...prev, riskLevel: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full p-2 rounded-md bg-background/50 border border-primary/30 text-foreground"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={handleAddMethodStep}
            disabled={!newStep.title || !newStep.description}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </CardContent>
      </Card>

      {methodData.steps && methodData.steps.length > 0 && (
        <Card className="border-primary/30 bg-card/60">
          <CardHeader>
            <CardTitle className="text-foreground">Method Steps ({methodData.steps.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {methodData.steps.map((step, index) => (
                <div key={step.id} className="p-4 border border-primary/20 rounded-lg bg-card/40">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{step.title}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.estimatedDuration}
                        </span>
                        <Badge variant={step.riskLevel === 'high' ? 'destructive' : step.riskLevel === 'medium' ? 'secondary' : 'default'}>
                          {step.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderReview = () => {
    const validation = validateAllSections();
    
    return (
      <div className="space-y-6">
        <Card className="border-primary/30 bg-card/60">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Document Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{ramsData.risks.length}</div>
                <div className="text-sm text-muted-foreground">Risks Identified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{methodData.steps?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Method Steps</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${validation.isValid ? 'text-green-500' : 'text-red-500'}`}>
                  {validation.isValid ? '✓' : '✗'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {validation.isValid ? 'Ready to Export' : 'Needs Completion'}
                </div>
              </div>
            </div>

            {!validation.isValid && (
              <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                <h5 className="font-medium text-red-400 mb-2">Required Sections:</h5>
                <ul className="text-sm text-red-300 space-y-1">
                  {validation.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={generateIntegratedPDF}
                disabled={!validation.isValid || isGenerating}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export RAMS Document
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Integrated Risk Assessment & Method Statement
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Professional RAMS documentation combining risk assessment and method statements in one workflow
          </p>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card className="border-primary/20 bg-card/60">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(currentStepProgress)}% Complete</span>
            </div>
            <Progress value={currentStepProgress} className="h-2" />
            
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center gap-2">
                    <div className={`p-2 rounded-full ${isActive ? 'bg-primary text-primary-foreground' : isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="text-xs text-center">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="border-primary/20 bg-card/60">
        <CardContent className="pt-6">
          {currentStep === 0 && renderProjectDetails()}
          {currentStep === 1 && renderRiskAssessment()}
          {currentStep === 2 && renderMethodStatement()}
          {currentStep === 3 && renderReview()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default IntegratedRAMSGenerator;
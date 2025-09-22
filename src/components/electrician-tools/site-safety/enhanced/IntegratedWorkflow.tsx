// Integrated Workflow Component
// Combines RAMS and Method Statement creation with task and hazard management

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Link2,
  AlertTriangle,
  Zap,
  Save,
  Download
} from 'lucide-react';
import { useRAMS } from '@/components/electrician-tools/site-safety/rams/RAMSContext';
import { useEnhancedRAMS } from '@/hooks/useEnhancedRAMS';
import { MethodStatementData } from '@/types/method-statement';
import { Task, ValidationResult } from '@/types/enhanced-rams';
import TaskManager from './TaskManager';
import HazardDatabase from './HazardDatabase';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  required: boolean;
  completed: boolean;
  validation?: () => ValidationResult;
}

const IntegratedWorkflow: React.FC = () => {
  const { ramsData, reportOptions, validate: validateRAMS } = useRAMS();
  const { tasks, createRamsMethodLink, validateTask } = useEnhancedRAMS();

  const [currentStep, setCurrentStep] = useState(0);
  const [methodStatementData, setMethodStatementData] = useState<MethodStatementData>({
    jobTitle: '',
    location: '',
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
  const [linkedTasks, setLinkedTasks] = useState<string[]>([]);
  const [linkedHazards, setLinkedHazards] = useState<string[]>([]);

  // Define workflow steps
  const workflowSteps: WorkflowStep[] = [
    {
      id: 'project-setup',
      title: 'Project Setup',
      description: 'Define project details and scope',
      component: ProjectSetupStep,
      required: true,
      completed: false
    },
    {
      id: 'task-management',
      title: 'Task Planning',
      description: 'Create and organize work tasks',
      component: TaskManager,
      required: true,
      completed: false
    },
    {
      id: 'hazard-assessment',
      title: 'Hazard Identification',
      description: 'Identify and assess hazards from database',
      component: HazardDatabase,
      required: true,
      completed: false
    },
    {
      id: 'rams-creation',
      title: 'Risk Assessment',
      description: 'Create comprehensive risk assessment',
      component: RAMSCreationStep,
      required: true,
      completed: false,
      validation: () => {
        const result = validateRAMS();
        return {
          is_valid: result.isValid,
          warnings: [],
          errors: result.errors,
          suggestions: []
        };
      }
    },
    {
      id: 'method-statement',
      title: 'Method Statement',
      description: 'Develop detailed work method',
      component: MethodStatementStep,
      required: true,
      completed: false
    },
    {
      id: 'integration',
      title: 'Document Integration',
      description: 'Link all documents and validate completeness',
      component: IntegrationStep,
      required: true,
      completed: false
    },
    {
      id: 'review-export',
      title: 'Review & Export',
      description: 'Final review and document generation',
      component: ReviewExportStep,
      required: true,
      completed: false
    }
  ];

  // Calculate progress based on completed steps
  const progress = (workflowSteps.filter(step => step.completed).length / workflowSteps.length) * 100;

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  // Update step completion status
  const updateStepCompletion = (stepIndex: number, completed: boolean) => {
    workflowSteps[stepIndex].completed = completed;
  };

  // Validate current step
  const validateCurrentStep = (): ValidationResult => {
    const currentStepData = workflowSteps[currentStep];
    
    if (currentStepData.validation) {
      return currentStepData.validation();
    }

    // Default validation
    return {
      is_valid: true,
      warnings: [],
      errors: [],
      suggestions: []
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Integrated Safety Workflow</h1>
        <p className="text-muted-foreground">
          Complete safety documentation with task and hazard management
        </p>
      </div>

      {/* Progress indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Workflow Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          {/* Step indicators */}
          <div className="flex justify-between">
            {workflowSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center cursor-pointer p-2 rounded transition-colors ${
                  index === currentStep 
                    ? 'bg-primary/10 text-primary' 
                    : step.completed 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => goToStep(index)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step.completed 
                    ? 'bg-green-100 text-green-600' 
                    : index === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs text-center leading-tight">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current step content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {currentStep + 1}
                </span>
                {workflowSteps[currentStep].title}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {workflowSteps[currentStep].description}
              </p>
            </div>
            
            {workflowSteps[currentStep].completed && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Render current step component */}
          {React.createElement(workflowSteps[currentStep].component, {
            onComplete: () => updateStepCompletion(currentStep, true),
            onNext: goToNextStep,
            onPrevious: goToPreviousStep,
            methodStatementData,
            setMethodStatementData,
            linkedTasks,
            setLinkedTasks,
            linkedHazards,
            setLinkedHazards
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {/* Validation status */}
          {(() => {
            const validation = validateCurrentStep();
            if (!validation.is_valid) {
              return (
                <Button variant="outline" className="text-red-600 border-red-200">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {validation.errors.length} Error(s)
                </Button>
              );
            }
            if (validation.warnings.length > 0) {
              return (
                <Button variant="outline" className="text-yellow-600 border-yellow-200">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {validation.warnings.length} Warning(s)
                </Button>
              );
            }
            return null;
          })()}

          <Button
            onClick={goToNextStep}
            disabled={currentStep === workflowSteps.length - 1}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Individual step components (simplified for demonstration)
const ProjectSetupStep: React.FC<any> = ({ onComplete, onNext }) => {
  return (
    <div className="space-y-4">
      <p>Project setup component would go here...</p>
      <Button onClick={() => { onComplete(); onNext(); }}>
        Complete Setup
      </Button>
    </div>
  );
};

const RAMSCreationStep: React.FC<any> = ({ onComplete, onNext }) => {
  return (
    <div className="space-y-4">
      <p>RAMS creation component would go here...</p>
      <Button onClick={() => { onComplete(); onNext(); }}>
        Complete RAMS
      </Button>
    </div>
  );
};

const MethodStatementStep: React.FC<any> = ({ onComplete, onNext }) => {
  return (
    <div className="space-y-4">
      <p>Method statement component would go here...</p>
      <Button onClick={() => { onComplete(); onNext(); }}>
        Complete Method Statement
      </Button>
    </div>
  );
};

const IntegrationStep: React.FC<any> = ({ onComplete, onNext }) => {
  return (
    <div className="space-y-4">
      <p>Document integration component would go here...</p>
      <Button onClick={() => { onComplete(); onNext(); }}>
        Complete Integration
      </Button>
    </div>
  );
};

const ReviewExportStep: React.FC<any> = ({ onComplete }) => {
  return (
    <div className="space-y-4">
      <p>Review and export component would go here...</p>
      <div className="flex gap-2">
        <Button variant="outline">
          <Save className="w-4 h-4 mr-2" />
          Save Documents
        </Button>
        <Button onClick={onComplete}>
          <Download className="w-4 h-4 mr-2" />
          Export Package
        </Button>
      </div>
    </div>
  );
};

export default IntegratedWorkflow;

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, AlertTriangle, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { enhancedVisualInspectionSections, type InspectionSection } from '@/data/eicr/enhancedVisualInspectionData';
import EnhancedVisualInspection from './EnhancedVisualInspection';
import VisualInspectionResults from './VisualInspectionResults';

interface VisualInspectionWizardProps {
  reportType: string;
  onComplete: () => void;
}

type WizardStep = 'overview' | 'inspection' | 'results';

const VisualInspectionWizard = ({ reportType, onComplete }: VisualInspectionWizardProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('overview');
  const [isInspectionComplete, setIsInspectionComplete] = useState(false);

  useEffect(() => {
    // Check if inspection is already completed
    const savedResults = localStorage.getItem('eicr-visual-inspection-results');
    if (savedResults) {
      setIsInspectionComplete(true);
      setCurrentStep('results');
    }
  }, []);

  const handleStartInspection = () => {
    setCurrentStep('inspection');
  };

  const handleInspectionComplete = () => {
    setIsInspectionComplete(true);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    localStorage.removeItem('eicr-visual-inspection-results');
    setIsInspectionComplete(false);
    setCurrentStep('overview');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
              <Eye className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-2xl">EICR Visual Inspection Overview</CardTitle>
              <p className="text-muted-foreground">
                Comprehensive visual inspection covering all aspects of the electrical installation
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-2">10 Main Sections</h4>
              <p className="text-sm text-muted-foreground">
                Covering all aspects from external intake to protection systems
              </p>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">50+ Inspection Items</h4>
              <p className="text-sm text-muted-foreground">
                Detailed checklist based on BS 7671 requirements
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="font-medium text-purple-300 mb-2">Professional Reporting</h4>
              <p className="text-sm text-muted-foreground">
                C1, C2, C3 classification with detailed notes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Inspection Sections Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enhancedVisualInspectionSections.map((section, index) => (
              <div key={section.id} className="p-3 border border-elec-yellow/10 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-sm">{section.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{section.description}</p>
                <p className="text-xs text-blue-300">{section.regulation}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  {section.items.length} inspection items
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium mb-1">Ready to Begin Inspection</h3>
              <p className="text-sm text-muted-foreground">
                The inspection will guide you through each section systematically
              </p>
            </div>
            <Button
              onClick={handleStartInspection}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Start Visual Inspection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'overview':
        return renderOverview();
      case 'inspection':
        return (
          <EnhancedVisualInspection
            reportType={reportType}
            onComplete={handleInspectionComplete}
          />
        );
      case 'results':
        return (
          <div className="space-y-6">
            <VisualInspectionResults />
            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handleRestart}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Restart Inspection
                  </Button>
                  <Button
                    onClick={onComplete}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
                  >
                    Continue to Testing
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'overview':
        return 0;
      case 'inspection':
        return 50;
      case 'results':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <FileText className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle>Visual Inspection Wizard</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Step-by-step visual inspection process
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <div className="w-32 h-2 bg-elec-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-elec-yellow transition-all duration-300" 
                  style={{ width: `${getStepProgress()}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{getStepProgress()}%</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Indicators */}
      <div className="flex gap-2">
        {[
          { key: 'overview', label: 'Overview', icon: Eye },
          { key: 'inspection', label: 'Inspection', icon: CheckCircle },
          { key: 'results', label: 'Results', icon: FileText }
        ].map((step) => {
          const StepIcon = step.icon;
          const isActive = currentStep === step.key;
          const isComplete = (step.key === 'overview' && currentStep !== 'overview') || 
                           (step.key === 'inspection' && isInspectionComplete) ||
                           (step.key === 'results' && isInspectionComplete);
          
          return (
            <div
              key={step.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                  : isComplete
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-elec-dark text-muted-foreground border border-elec-yellow/10'
              }`}
            >
              <StepIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      {renderStepContent()}
    </div>
  );
};

export default VisualInspectionWizard;

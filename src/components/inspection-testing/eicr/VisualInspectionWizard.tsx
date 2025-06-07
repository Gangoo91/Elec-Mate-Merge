import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, AlertTriangle, FileText, ArrowRight, ArrowLeft, Hash } from 'lucide-react';
import { numberedVisualInspectionSections, type NumberedInspectionSection } from '@/data/eicr/numberedVisualInspectionData';
import NumberedVisualInspection from './NumberedVisualInspection';
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
              <Hash className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-2xl">Numbered EICR Visual Inspection System</CardTitle>
              <p className="text-muted-foreground">
                Structured BS 7671 compliant visual inspection with numbered reference system
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-2">10 Numbered Sections</h4>
              <p className="text-sm text-muted-foreground">
                Systematically organised inspection sections (1-10)
              </p>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="font-medium text-green-300 mb-2">40 Numbered Items</h4>
              <p className="text-sm text-muted-foreground">
                Each inspection point numbered for easy reference (e.g., 1.1, 1.2)
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="font-medium text-purple-300 mb-2">BS 7671 Compliance</h4>
              <p className="text-sm text-muted-foreground">
                Referenced to specific BS 7671 regulations and sections
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Numbered Inspection Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {numberedVisualInspectionSections.map((section) => (
              <div key={section.id} className="p-3 border border-elec-yellow/10 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-2 px-2 py-1 bg-elec-yellow/20 rounded border border-elec-yellow/30">
                    <Hash className="h-3 w-3 text-elec-yellow" />
                    <span className="text-elec-yellow font-mono text-sm">{section.number}</span>
                  </div>
                  <h4 className="font-medium text-sm">{section.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{section.description}</p>
                <p className="text-xs text-blue-300 mb-2">{section.regulation}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {section.items.length} numbered items
                  </div>
                  <div className="flex gap-1">
                    {section.items.map((item, index) => (
                      <div key={item.id} className="w-1 h-1 bg-elec-yellow/30 rounded-full" />
                    ))}
                  </div>
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
              <h3 className="font-medium mb-1">Ready to Begin Numbered Inspection</h3>
              <p className="text-sm text-muted-foreground">
                Follow the numbered system for systematic visual inspection
              </p>
            </div>
            <Button
              onClick={handleStartInspection}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Start Numbered Inspection
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
          <NumberedVisualInspection
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
                <Hash className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle>Numbered Visual Inspection Wizard</CardTitle>
                <p className="text-sm text-muted-foreground">
                  BS 7671 numbered inspection reference system
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
          { key: 'inspection', label: 'Numbered Inspection', icon: Hash },
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

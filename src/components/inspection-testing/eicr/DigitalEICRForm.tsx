
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Save, Download, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEICR } from '@/contexts/EICRContext';
import ReportTypeSelector from './ReportTypeSelector';
import InspectionChecklist from './InspectionChecklist';
import TestEntrySection from './TestEntrySection';
import LiveSummaryReview from './LiveSummaryReview';
import EICRExportOptions from './EICRExportOptions';

export type ReportType = 'eicr' | 'initial-verification' | 'minor-works';
export type FormStep = 'report-type' | 'inspection' | 'testing' | 'review' | 'export';

const DigitalEICRForm = () => {
  const { eicrSession, initializeEICR } = useEICR();
  const [currentStep, setCurrentStep] = useState<FormStep>('report-type');
  const [reportType, setReportType] = useState<ReportType>('eicr');
  const [formData, setFormData] = useState({
    reportType: 'eicr' as ReportType,
    installation: {
      address: '',
      description: '',
      age: '',
      earthingSystem: '',
      supply: '',
      mainSwitch: '',
    },
    inspector: {
      name: '',
      qualification: '',
      registration: '',
      organisation: '',
    },
    inspectionComplete: false,
    testingComplete: false,
  });

  const steps: { key: FormStep; title: string; description: string }[] = [
    { key: 'report-type', title: 'Report Type', description: 'Select the type of electrical report' },
    { key: 'inspection', title: 'Visual Inspection', description: 'Complete visual inspection checklist' },
    { key: 'testing', title: 'Testing & Measurements', description: 'Enter test results and measurements' },
    { key: 'review', title: 'Review & Summary', description: 'Review all data and classifications' },
    { key: 'export', title: 'Export Report', description: 'Generate and export the final report' },
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    // Initialize EICR context when component mounts
    if (!eicrSession && formData.installation.address && formData.inspector.name) {
      initializeEICR(formData.installation, formData.inspector);
    }
  }, [formData.installation, formData.inspector, eicrSession, initializeEICR]);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleStepComplete = (stepKey: FormStep) => {
    if (stepKey === 'inspection') {
      setFormData(prev => ({ ...prev, inspectionComplete: true }));
    } else if (stepKey === 'testing') {
      setFormData(prev => ({ ...prev, testingComplete: true }));
    }
    handleNext();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'report-type':
        return formData.installation.address && formData.inspector.name;
      case 'inspection':
        return formData.inspectionComplete;
      case 'testing':
        return formData.testingComplete;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'report-type':
        return (
          <ReportTypeSelector
            selectedType={reportType}
            onTypeSelect={setReportType}
            formData={formData}
            onFormDataChange={setFormData}
          />
        );
      case 'inspection':
        return (
          <InspectionChecklist
            reportType={reportType}
            onComplete={() => handleStepComplete('inspection')}
          />
        );
      case 'testing':
        return (
          <TestEntrySection
            reportType={reportType}
            onComplete={() => handleStepComplete('testing')}
          />
        );
      case 'review':
        return (
          <LiveSummaryReview
            reportType={reportType}
            formData={formData}
          />
        );
      case 'export':
        return (
          <EICRExportOptions
            reportType={reportType}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Digital EICR Tool</h1>
            <p className="text-muted-foreground">
              Interactive electrical inspection and testing system
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Progress
          </Button>
          <Link to="/electrician-tools/eicr-reports">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to EICR Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStepIndex + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Navigation */}
            <div className="flex gap-2 overflow-x-auto">
              {steps.map((step, index) => (
                <div
                  key={step.key}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                    index <= currentStepIndex
                      ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                      : 'bg-elec-dark text-muted-foreground border border-elec-yellow/10'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : index === currentStepIndex ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-current" />
                  )}
                  <span>{step.title}</span>
                </div>
              ))}
            </div>

            {/* Current Step Info */}
            <div className="pt-2 border-t border-elec-yellow/10">
              <h2 className="text-lg font-semibold mb-1">
                {steps[currentStepIndex]?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {steps[currentStepIndex]?.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <div className="space-y-6">
        {renderStepContent()}
      </div>

      {/* Footer Navigation */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Badge variant="outline" className="text-xs">
              {reportType.toUpperCase().replace('-', ' ')}
            </Badge>

            <Button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1 || !canProceed()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {!canProceed() && (
            <Alert className="mt-4 bg-orange-500/10 border-orange-500/30">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <AlertDescription className="text-orange-200">
                Please complete all required fields before proceeding to the next step.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalEICRForm;

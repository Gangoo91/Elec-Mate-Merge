
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TestEntrySection from '@/components/inspection-testing/eicr/TestEntrySection';

const EICRTesting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if previous steps are completed
    const installationData = localStorage.getItem('eicr-installation-details');
    const inspectorData = localStorage.getItem('eicr-inspector-details');
    const inspectionComplete = localStorage.getItem('eicr-inspection-complete');
    
    if (!installationData) {
      navigate('/electrician-tools/eicr/installation-details');
    } else if (!inspectorData) {
      navigate('/electrician-tools/eicr/inspector-details');
    } else if (!inspectionComplete) {
      navigate('/electrician-tools/eicr/inspection');
    }
  }, [navigate]);

  const handleNext = () => {
    navigate('/electrician-tools/eicr/summary');
  };

  const handleBack = () => {
    navigate('/electrician-tools/eicr/inspection');
  };

  const handleTestingComplete = () => {
    localStorage.setItem('eicr-testing-complete', 'true');
    handleNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testing & Measurements</h1>
          <p className="text-muted-foreground">
            Enter test results and measurements for each circuit
          </p>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Testing Section */}
      <TestEntrySection 
        reportType="eicr" 
        onComplete={handleTestingComplete}
      />

      {/* Navigation */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button 
              onClick={handleBack}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back: Visual Inspection
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Complete all required tests to proceed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRTesting;


import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VisualInspectionWizard from '@/components/inspection-testing/eicr/VisualInspectionWizard';

const EICRInspection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if previous steps are completed
    const installationData = localStorage.getItem('eicr-installation-details');
    const inspectorData = localStorage.getItem('eicr-inspector-details');
    
    if (!installationData) {
      navigate('/electrician-tools/eicr/installation-details');
    } else if (!inspectorData) {
      navigate('/electrician-tools/eicr/inspector-details');
    }
  }, [navigate]);

  const handleNext = () => {
    navigate('/electrician-tools/eicr/testing');
  };

  const handleBack = () => {
    navigate('/electrician-tools/eicr/circuits');
  };

  const handleInspectionComplete = () => {
    localStorage.setItem('eicr-inspection-complete', 'true');
    handleNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EICR Visual Inspection</h1>
          <p className="text-muted-foreground">
            Complete the comprehensive visual inspection using the enhanced BS 7671 Schedule of Inspections
          </p>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Enhanced Visual Inspection Wizard */}
      <VisualInspectionWizard 
        reportType="eicr" 
        onComplete={handleInspectionComplete}
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
              Back: Circuit Information
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Complete the enhanced visual inspection to proceed to testing phase
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRInspection;

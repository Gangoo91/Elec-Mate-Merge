
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CircuitManager from '@/components/inspection-testing/eicr/CircuitManager';

const EICRCircuits = () => {
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
    navigate('/electrician-tools/eicr/inspection');
  };

  const handleBack = () => {
    navigate('/electrician-tools/eicr/inspector-details');
  };

  const handleCircuitsChange = (circuits: any[]) => {
    localStorage.setItem('eicr-circuits', JSON.stringify(circuits));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Circuit Information</h1>
          <p className="text-muted-foreground">
            Add and configure circuits for this EICR
          </p>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Circuit Manager */}
      <CircuitManager onCircuitsChange={handleCircuitsChange} />

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
              Back: Inspector Details
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Next: Visual Inspection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRCircuits;

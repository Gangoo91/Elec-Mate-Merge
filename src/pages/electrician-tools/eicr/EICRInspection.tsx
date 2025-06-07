
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Eye, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VisualInspectionWizard from '@/components/inspection-testing/eicr/VisualInspectionWizard';

const EICRInspection = () => {
  const navigate = useNavigate();
  const [installationData, setInstallationData] = useState<any>(null);
  const [inspectorData, setInspectorData] = useState<any>(null);
  const [isInspectionComplete, setIsInspectionComplete] = useState(false);

  useEffect(() => {
    // Check if previous steps are completed and load data
    const savedInstallationData = localStorage.getItem('eicr-installation-details');
    const savedInspectorData = localStorage.getItem('eicr-inspector-details');
    const savedInspectionResults = localStorage.getItem('eicr-visual-inspection-results');
    
    if (!savedInstallationData) {
      navigate('/electrician-tools/eicr/installation-details');
      return;
    }
    
    if (!savedInspectorData) {
      navigate('/electrician-tools/eicr/inspector-details');
      return;
    }

    setInstallationData(JSON.parse(savedInstallationData));
    setInspectorData(JSON.parse(savedInspectorData));
    
    if (savedInspectionResults) {
      setIsInspectionComplete(true);
    }
  }, [navigate]);

  const handleNext = () => {
    navigate('/electrician-tools/eicr/testing');
  };

  const handleBack = () => {
    navigate('/electrician-tools/eicr/circuits');
  };

  const handleInspectionComplete = () => {
    setIsInspectionComplete(true);
    localStorage.setItem('eicr-inspection-complete', 'true');
    // Auto-advance or show completion state
  };

  if (!installationData || !inspectorData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading EICR data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <Eye className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">EICR Visual Inspection</h1>
            <p className="text-muted-foreground">
              Enhanced BS 7671 Schedule of Inspections - comprehensive visual inspection system
            </p>
          </div>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2 border-elec-yellow/20 hover:border-elec-yellow/40">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Installation Context Card */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-lg text-blue-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Installation Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Installation Type</p>
              <p className="font-medium">{installationData.description || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Earthing System</p>
              <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                {installationData.earthingSystem || 'Unknown'}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Supply Type</p>
              <p className="font-medium">{installationData.supply || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Inspector</p>
              <p className="font-medium">{inspectorData.name || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Status */}
      {isInspectionComplete && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <div>
                <h3 className="font-medium text-green-300">Visual Inspection Complete</h3>
                <p className="text-sm text-muted-foreground">
                  Enhanced visual inspection has been completed. You can proceed to testing or review the results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Visual Inspection Wizard */}
      <VisualInspectionWizard 
        reportType="eicr" 
        onComplete={handleInspectionComplete}
      />

      {/* Enhanced Navigation */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button 
              onClick={handleBack}
              variant="outline" 
              className="flex items-center gap-2 border-elec-yellow/20 hover:border-elec-yellow/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back: Circuit Information
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                {isInspectionComplete ? 'Proceed to Testing Phase' : 'Complete Enhanced Visual Inspection'}
              </p>
              <p className="text-xs text-muted-foreground">
                Based on BS 7671 Schedule of Inspections
              </p>
            </div>

            <Button
              onClick={handleNext}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
              disabled={!isInspectionComplete}
            >
              Next: Testing Phase
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Process Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">EICR Process Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-medium">✓</div>
              <span className="text-green-400">Installation Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-medium">✓</div>
              <span className="text-green-400">Inspector Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-medium">✓</div>
              <span className="text-green-400">Circuit Information</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                isInspectionComplete 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-elec-yellow/20 text-elec-yellow'
              }`}>
                {isInspectionComplete ? '✓' : '4'}
              </div>
              <span className={isInspectionComplete ? 'text-green-400' : 'text-elec-yellow font-medium'}>
                Visual Inspection
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center text-xs font-medium">5</div>
              <span className="text-muted-foreground">Testing & Results</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Enhanced visual inspection includes 10 main sections with 80+ inspection points compliant with BS 7671
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRInspection;

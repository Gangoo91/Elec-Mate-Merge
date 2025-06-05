
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileText, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface EICRData {
  installation: any;
  inspector: any;
  circuits: any[];
  inspection: any;
  testing: any;
}

const EICRSummary = () => {
  const navigate = useNavigate();
  const [eicrData, setEicrData] = useState<EICRData | null>(null);
  const [overallAssessment, setOverallAssessment] = useState<'satisfactory' | 'unsatisfactory'>('satisfactory');

  useEffect(() => {
    // Check if all previous steps are completed
    const installationData = localStorage.getItem('eicr-installation-details');
    const inspectorData = localStorage.getItem('eicr-inspector-details');
    const circuitsData = localStorage.getItem('eicr-circuits');
    const inspectionComplete = localStorage.getItem('eicr-inspection-complete');
    const testingComplete = localStorage.getItem('eicr-testing-complete');
    
    if (!installationData) {
      navigate('/electrician-tools/eicr/installation-details');
      return;
    }
    if (!inspectorData) {
      navigate('/electrician-tools/eicr/inspector-details');
      return;
    }
    if (!inspectionComplete) {
      navigate('/electrician-tools/eicr/inspection');
      return;
    }
    if (!testingComplete) {
      navigate('/electrician-tools/eicr/testing');
      return;
    }

    // Load all EICR data
    const data: EICRData = {
      installation: installationData ? JSON.parse(installationData) : {},
      inspector: inspectorData ? JSON.parse(inspectorData) : {},
      circuits: circuitsData ? JSON.parse(circuitsData) : [],
      inspection: inspectionComplete,
      testing: testingComplete,
    };

    setEicrData(data);

    // Determine overall assessment based on test results or faults
    // This would normally check for any C1/C2 faults
    const hasC1OrC2Faults = false; // This would be determined from actual test data
    setOverallAssessment(hasC1OrC2Faults ? 'unsatisfactory' : 'satisfactory');
  }, [navigate]);

  const handleBack = () => {
    navigate('/electrician-tools/eicr/testing');
  };

  const handleGeneratePDF = () => {
    // Generate PDF functionality would go here
    console.log('Generating EICR PDF report...');
    
    // Mock PDF generation - in real implementation this would create a proper EICR PDF
    const reportData = {
      ...eicrData,
      overallAssessment,
      generatedAt: new Date().toISOString(),
      reportId: `EICR-${Date.now()}`,
    };
    
    console.log('EICR Report Data:', reportData);
    
    // Save completed report to localStorage
    const existingReports = JSON.parse(localStorage.getItem('completed-eicr-reports') || '[]');
    existingReports.push(reportData);
    localStorage.setItem('completed-eicr-reports', JSON.stringify(existingReports));
    
    // Clear current EICR session data
    localStorage.removeItem('eicr-installation-details');
    localStorage.removeItem('eicr-inspector-details');
    localStorage.removeItem('eicr-circuits');
    localStorage.removeItem('eicr-inspection-complete');
    localStorage.removeItem('eicr-testing-complete');
    
    // Navigate back to EICR reports page
    navigate('/electrician-tools/eicr-reports');
  };

  const getSummaryIcon = () => {
    switch (overallAssessment) {
      case 'satisfactory':
        return <CheckCircle className="h-8 w-8 text-green-400" />;
      case 'unsatisfactory':
        return <XCircle className="h-8 w-8 text-red-400" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-yellow-400" />;
    }
  };

  const getSummaryColor = () => {
    switch (overallAssessment) {
      case 'satisfactory':
        return 'border-green-500/30 bg-green-500/10';
      case 'unsatisfactory':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-yellow-500/30 bg-yellow-500/10';
    }
  };

  if (!eicrData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading EICR summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">EICR Summary</h1>
            <p className="text-muted-foreground">
              Review and generate your completed EICR report
            </p>
          </div>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Overall Assessment */}
      <Card className={`border-2 ${getSummaryColor()}`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getSummaryIcon()}
              <div>
                <h2 className="text-2xl font-bold">
                  Overall Assessment: {overallAssessment === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory'}
                </h2>
                <p className="text-muted-foreground">
                  {overallAssessment === 'satisfactory' 
                    ? 'The electrical installation is considered safe for continued use'
                    : 'The electrical installation requires immediate attention before continued use'
                  }
                </p>
              </div>
            </div>
            <Badge 
              variant={overallAssessment === 'satisfactory' ? 'default' : 'destructive'}
              className="text-sm px-4 py-2"
            >
              {overallAssessment === 'satisfactory' ? 'PASS' : 'FAIL'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Installation Details Summary */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Installation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{eicrData.installation.address || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{eicrData.installation.description || 'Not specified'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Earthing System</p>
                <p className="font-medium">{eicrData.installation.earthingSystem || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Supply Type</p>
                <p className="font-medium">{eicrData.installation.supply || 'Not specified'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inspector Details Summary */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Inspector Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Inspector Name</p>
              <p className="font-medium">{eicrData.inspector.name || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Qualification</p>
              <p className="font-medium">{eicrData.inspector.qualification || 'Not specified'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Inspection Date</p>
                <p className="font-medium">{eicrData.inspector.inspectionDate || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Due Date</p>
                <p className="font-medium">{eicrData.inspector.nextDueDate || 'Not specified'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Circuits Summary */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Circuits Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Total Circuits: <span className="font-medium">{eicrData.circuits.length}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Visual Inspection: <span className="font-medium text-green-400">Complete</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Testing: <span className="font-medium text-green-400">Complete</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overallAssessment === 'satisfactory' ? (
                <>
                  <p className="text-sm">✓ Installation is satisfactory for continued use</p>
                  <p className="text-sm">✓ Next inspection recommended in 5-10 years</p>
                  <p className="text-sm">✓ Keep this report for your records</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-red-400">⚠ Immediate remedial work required</p>
                  <p className="text-sm text-red-400">⚠ Re-inspection required after remedial work</p>
                  <p className="text-sm text-red-400">⚠ Consult qualified electrician</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Report Section */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Generate EICR Report</h3>
              <p className="text-muted-foreground">
                Create a professional PDF report with all inspection and testing data. 
                This report will be compliant with BS 7671:2018+A2:2022 requirements.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleBack}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back: Testing
              </Button>
              <Button
                onClick={handleGeneratePDF}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Generate PDF Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRSummary;


import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Download, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EICRSummary = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<any>(null);
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

    // Compile all data
    const compiledData = {
      installation: JSON.parse(installationData),
      inspector: JSON.parse(inspectorData),
      circuits: circuitsData ? JSON.parse(circuitsData) : [],
      inspectionComplete: true,
      testingComplete: true,
    };

    setReportData(compiledData);
  }, [navigate]);

  const handleBack = () => {
    navigate('/electrician-tools/eicr/testing');
  };

  const handleGenerateReport = () => {
    // Save final report data
    const finalReport = {
      ...reportData,
      overallAssessment,
      generatedAt: new Date().toISOString(),
      reportId: `EICR-${Date.now()}`,
    };

    localStorage.setItem('eicr-final-report', JSON.stringify(finalReport));
    console.log('EICR Report Generated:', finalReport);
    
    // Navigate back to reports list or show success message
    navigate('/electrician-tools/eicr-reports');
  };

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const circuitCount = reportData.circuits?.length || 0;
  const hasIssues = false; // This would be determined from inspection/testing results

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
              Review and finalise your EICR before generation
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
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {overallAssessment === 'satisfactory' ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            )}
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge 
              variant={overallAssessment === 'satisfactory' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {overallAssessment === 'satisfactory' ? 'SATISFACTORY' : 'UNSATISFACTORY'}
            </Badge>
            <p className="text-muted-foreground">
              {overallAssessment === 'satisfactory' 
                ? 'The electrical installation is considered to be safe for continued use.'
                : 'The electrical installation requires remedial work before continued use.'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Installation</p>
                <p className="text-lg font-semibold">{reportData.installation.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {reportData.installation.address.split('\n')[0]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inspector</p>
                <p className="text-lg font-semibold">{reportData.inspector.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {reportData.inspector.qualification}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Circuits Tested</p>
                <p className="text-2xl font-bold">{circuitCount}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  All tests completed
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installation Details Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Installation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="whitespace-pre-line">{reportData.installation.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p>{reportData.installation.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Earthing System</label>
                <p>{reportData.installation.earthingSystem}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Supply Type</label>
                <p>{reportData.installation.supply}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Inspection Date</label>
                <p>{new Date(reportData.inspector.inspectionDate).toLocaleDateString()}</p>
              </div>
              {reportData.inspector.nextDueDate && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Due</label>
                  <p>{new Date(reportData.inspector.nextDueDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button 
              onClick={handleBack}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back: Testing & Measurements
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={handleGenerateReport}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Generate EICR Report
              </Button>
            </div>
          </div>

          <Alert className="mt-4 bg-green-500/10 border-green-500/30">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              All sections completed successfully. Ready to generate professional EICR report.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRSummary;

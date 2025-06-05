
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, AlertTriangle, CheckCircle, Download, Plus, Settings } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import FaultCodeManager from './FaultCodeManager';
import CircuitManager from './CircuitManager';
import EICRReportPreview from './EICRReportPreview';
import EICRSettings from './EICRSettings';

const EICRDashboard = () => {
  const { eicrSession, generateEICRReport } = useEICR();

  if (!eicrSession) {
    return (
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            EICR Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            EICR integration will be available once you start a testing session.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { eicr_report } = eicrSession;
  const faultCounts = {
    C1: eicr_report.faults.filter(f => f.faultCode === 'C1').length,
    C2: eicr_report.faults.filter(f => f.faultCode === 'C2').length,
    C3: eicr_report.faults.filter(f => f.faultCode === 'C3').length,
    FI: eicr_report.faults.filter(f => f.faultCode === 'FI').length,
  };

  const handleExportEICR = () => {
    const report = generateEICRReport();
    if (report) {
      // Create downloadable EICR report
      const blob = new Blob([JSON.stringify(report, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EICR-${report.id}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCircuitsChange = (circuits: any[]) => {
    // Handle circuits change - this could update the EICR context if needed
    console.log('Circuits updated:', circuits);
  };

  return (
    <div className="space-y-6">
      {/* EICR Status Header */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle className="text-lg">EICR Report Generation</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Live integration with testing results
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportEICR} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export EICR
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Overall Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {eicr_report.overall_assessment === 'satisfactory' ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              )}
              <span className="font-medium">
                Overall Assessment: {eicr_report.overall_assessment === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory'}
              </span>
            </div>
            <Badge variant={eicr_report.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}>
              {eicr_report.overall_assessment === 'satisfactory' ? 'PASS' : 'FAIL'}
            </Badge>
          </div>

          {/* Fault Summary */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{faultCounts.C1}</div>
              <div className="text-xs text-red-300">C1 - Dangerous</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">{faultCounts.C2}</div>
              <div className="text-xs text-orange-300">C2 - Potentially Dangerous</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{faultCounts.C3}</div>
              <div className="text-xs text-yellow-300">C3 - Improvement Recommended</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{faultCounts.FI}</div>
              <div className="text-xs text-blue-300">FI - Further Investigation</div>
            </div>
          </div>

          {/* Critical Alerts */}
          {(faultCounts.C1 > 0 || faultCounts.C2 > 0) && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>Critical Issues Detected:</strong> 
                {faultCounts.C1 > 0 && ` ${faultCounts.C1} dangerous condition(s)`}
                {faultCounts.C1 > 0 && faultCounts.C2 > 0 && ' and'}
                {faultCounts.C2 > 0 && ` ${faultCounts.C2} potentially dangerous condition(s)`}
                {' '}found. Immediate attention required.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* EICR Management Tabs */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <Tabs defaultValue="faults" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="faults" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Fault Codes
            </TabsTrigger>
            <TabsTrigger value="circuits" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Circuits
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faults" className="mt-6">
            <FaultCodeManager />
          </TabsContent>

          <TabsContent value="circuits" className="mt-6">
            <CircuitManager onCircuitsChange={handleCircuitsChange} />
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <EICRReportPreview />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <EICRSettings />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EICRDashboard;

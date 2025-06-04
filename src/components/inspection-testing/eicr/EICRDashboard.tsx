
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Zap, AlertTriangle, CheckCircle, Download, Settings } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import EICRFormEngine from './EICRFormEngine';
import CircuitManager from './CircuitManager';
import FaultManager from './FaultManager';

const EICRDashboard = () => {
  const { eicrSession, generateEICRReport } = useEICR();

  if (!eicrSession) {
    return (
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            EICR Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No EICR in Progress</h3>
            <p className="text-muted-foreground mb-4">
              Start a testing session to begin creating an EICR report
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const report = eicrSession.eicr_report;
  const circuits = report.circuits || [];
  const faults = report.faults || [];
  
  const testedCircuits = circuits.filter(c => 
    c.measured_zs !== undefined || 
    c.insulation_resistance !== undefined ||
    c.rcd_operation !== undefined ||
    c.continuity_cpc !== undefined
  ).length;

  const completionPercentage = circuits.length > 0 ? (testedCircuits / circuits.length) * 100 : 0;

  const c1Faults = faults.filter(f => f.faultCode === 'C1').length;
  const c2Faults = faults.filter(f => f.faultCode === 'C2').length;
  const c3Faults = faults.filter(f => f.faultCode === 'C3').length;
  const fiFaults = faults.filter(f => f.faultCode === 'FI').length;

  return (
    <div className="space-y-6">
      {/* EICR Overview */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              EICR Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                size="sm"
                disabled={circuits.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export EICR
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Circuits</p>
                <p className="text-xl font-bold">{circuits.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tested</p>
                <p className="text-xl font-bold">{testedCircuits}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Faults</p>
                <p className="text-xl font-bold">{faults.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall</p>
                <Badge 
                  className={report.overall_assessment === 'satisfactory' 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                  }
                >
                  {report.overall_assessment}
                </Badge>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Testing Progress</span>
              <span>{Math.round(completionPercentage)}% Complete</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {/* Fault Summary */}
          {faults.length > 0 && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="font-medium text-red-200 mb-2">Fault Classification Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {c1Faults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-600 text-white">C1</Badge>
                    <span>{c1Faults} Dangerous</span>
                  </div>
                )}
                {c2Faults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-600 text-white">C2</Badge>
                    <span>{c2Faults} Potentially Dangerous</span>
                  </div>
                )}
                {c3Faults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-600 text-white">C3</Badge>
                    <span>{c3Faults} Improvement Recommended</span>
                  </div>
                )}
                {fiFaults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white">FI</Badge>
                    <span>{fiFaults} Further Investigation</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Installation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">Installation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{report.installation_details.address || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{report.installation_details.description || 'Not specified'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Earthing</p>
                <p className="font-medium">{report.installation_details.earthing_arrangements || 'TBD'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Main Switch</p>
                <p className="font-medium">{report.installation_details.main_switch_rating || 'TBD'}A</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">Inspector Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Inspector</p>
              <p className="font-medium">{report.inspector_details.name || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Qualification</p>
              <p className="font-medium">{report.inspector_details.qualification || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Report Created</p>
              <p className="font-medium">{report.created_at.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">{report.updated_at.toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Management Sections */}
      <EICRFormEngine />
      <CircuitManager />
      <FaultManager />
    </div>
  );
};

export default EICRDashboard;

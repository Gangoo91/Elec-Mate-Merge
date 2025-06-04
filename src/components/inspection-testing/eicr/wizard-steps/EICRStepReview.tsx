
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';

interface EICRStepReviewProps {
  onComplete: () => void;
}

const EICRStepReview = ({ onComplete }: EICRStepReviewProps) => {
  const { eicrSession, generateEICRReport } = useEICR();
  
  if (!eicrSession) return null;

  const report = eicrSession.eicr_report;
  const circuits = report.circuits || [];
  const faults = report.faults || [];
  
  const testedCircuits = circuits.filter(c => 
    c.measured_zs !== undefined || 
    c.insulation_resistance !== undefined ||
    c.rcd_operation !== undefined ||
    c.continuity_cpc !== undefined
  ).length;

  const c1Faults = faults.filter(f => f.faultCode === 'C1').length;
  const c2Faults = faults.filter(f => f.faultCode === 'C2').length;
  const c3Faults = faults.filter(f => f.faultCode === 'C3').length;
  const fiFaults = faults.filter(f => f.faultCode === 'FI').length;

  const handleExport = () => {
    const finalReport = generateEICRReport();
    if (finalReport) {
      console.log('EICR Report Generated:', finalReport);
      // Here you would typically trigger a PDF export or save functionality
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            EICR Review & Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation Summary */}
          <div>
            <h3 className="font-medium mb-3">Installation Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Address:</span>
                <p className="font-medium">{report.installation_details.address || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Description:</span>
                <p className="font-medium">{report.installation_details.description || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Earthing:</span>
                <p className="font-medium">{report.installation_details.earthing_arrangements || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Inspector:</span>
                <p className="font-medium">{report.inspector_details.name || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Testing Summary */}
          <div>
            <h3 className="font-medium mb-3">Testing Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                <div className="text-xl font-bold text-blue-400">{circuits.length}</div>
                <div className="text-xs text-blue-300">Total Circuits</div>
              </div>
              <div className="text-center p-3 bg-green-500/20 rounded-lg">
                <div className="text-xl font-bold text-green-400">{testedCircuits}</div>
                <div className="text-xs text-green-300">Tested</div>
              </div>
              <div className="text-center p-3 bg-red-500/20 rounded-lg">
                <div className="text-xl font-bold text-red-400">{faults.length}</div>
                <div className="text-xs text-red-300">Total Faults</div>
              </div>
              <div className="text-center p-3 bg-elec-yellow/20 rounded-lg">
                <div className="text-xl font-bold text-elec-yellow">
                  {report.overall_assessment === 'satisfactory' ? 'PASS' : 'FAIL'}
                </div>
                <div className="text-xs text-elec-yellow">Overall</div>
              </div>
            </div>
          </div>

          {/* Fault Summary */}
          {faults.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Fault Classification</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {c1Faults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-600 text-white">C1</Badge>
                    <span className="text-sm">{c1Faults} Dangerous</span>
                  </div>
                )}
                {c2Faults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-600 text-white">C2</Badge>
                    <span className="text-sm">{c2Faults} Potentially Dangerous</span>
                  </div>
                )}
                {c3Faults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-600 text-white">C3</Badge>
                    <span className="text-sm">{c3Faults} Improvement Recommended</span>
                  </div>
                )}
                {fiFaults > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white">FI</Badge>
                    <span className="text-sm">{fiFaults} Further Investigation</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Overall Assessment */}
          <div className={`p-4 rounded-lg border ${
            report.overall_assessment === 'satisfactory'
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {report.overall_assessment === 'satisfactory' ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              )}
              <h4 className={`font-medium ${
                report.overall_assessment === 'satisfactory' ? 'text-green-200' : 'text-red-200'
              }`}>
                Overall Assessment: {report.overall_assessment.toUpperCase()}
              </h4>
            </div>
            <p className={`text-sm ${
              report.overall_assessment === 'satisfactory' ? 'text-green-300' : 'text-red-300'
            }`}>
              {report.overall_assessment === 'satisfactory'
                ? 'The electrical installation is in a satisfactory condition.'
                : 'The electrical installation requires attention due to safety concerns.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-medium mb-2">Ready to Generate EICR</h3>
              <p className="text-sm text-muted-foreground">
                Your EICR is complete and ready for export. The report will include all test results, 
                fault classifications, and recommendations.
              </p>
            </div>
            
            <Button 
              onClick={handleExport}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              size="lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Generate & Export EICR
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRStepReview;

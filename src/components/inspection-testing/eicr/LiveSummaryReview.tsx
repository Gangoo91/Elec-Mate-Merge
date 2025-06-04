
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, AlertTriangle, CheckCircle, Info, Eye, TestTube } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { ReportType } from './DigitalEICRForm';

interface LiveSummaryReviewProps {
  reportType: ReportType;
  formData: any;
}

const LiveSummaryReview = ({ reportType, formData }: LiveSummaryReviewProps) => {
  const { eicrSession } = useEICR();

  if (!eicrSession) {
    return (
      <div className="space-y-6">
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            EICR data not available. Please ensure you've completed the previous steps.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { eicr_report } = eicrSession;
  
  const faultCounts = {
    C1: eicr_report.faults.filter(f => f.faultCode === 'C1').length,
    C2: eicr_report.faults.filter(f => f.faultCode === 'C2').length,
    C3: eicr_report.faults.filter(f => f.faultCode === 'C3').length,
    FI: eicr_report.faults.filter(f => f.faultCode === 'FI').length,
  };

  const totalFaults = Object.values(faultCounts).reduce((a, b) => a + b, 0);
  const hasC1OrC2 = faultCounts.C1 > 0 || faultCounts.C2 > 0;

  const getOverallAssessment = () => {
    if (hasC1OrC2) return 'unsatisfactory';
    if (totalFaults === 0) return 'satisfactory';
    return 'satisfactory'; // C3 and FI don't affect overall assessment
  };

  const overallAssessment = getOverallAssessment();

  return (
    <div className="space-y-6">
      {/* Report Summary Header */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            {reportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Installation Details</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Address:</strong> {eicr_report.installation_details.address || 'Not specified'}</p>
                <p><strong>Description:</strong> {eicr_report.installation_details.description || 'Not specified'}</p>
                <p><strong>Age:</strong> {eicr_report.installation_details.estimated_age || 'Not specified'}</p>
                <p><strong>Earthing:</strong> {eicr_report.installation_details.earthing_arrangements || 'Not specified'}</p>
                <p><strong>Supply:</strong> {eicr_report.installation_details.supply_characteristics || 'Not specified'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Inspector Details</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {eicr_report.inspector_details.name || 'Not specified'}</p>
                <p><strong>Qualification:</strong> {eicr_report.inspector_details.qualification || 'Not specified'}</p>
                <p><strong>Date:</strong> {new Date(eicr_report.inspector_details.signature_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card className={`border-2 ${overallAssessment === 'satisfactory' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {overallAssessment === 'satisfactory' ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-400" />
              )}
              Overall Assessment
            </CardTitle>
            <Badge 
              variant={overallAssessment === 'satisfactory' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {overallAssessment === 'satisfactory' ? 'SATISFACTORY' : 'UNSATISFACTORY'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-lg font-medium ${overallAssessment === 'satisfactory' ? 'text-green-300' : 'text-red-300'}`}>
            {overallAssessment === 'satisfactory' 
              ? 'The electrical installation is satisfactory for continued service'
              : 'The electrical installation requires immediate attention before continued use'
            }
          </p>
          {hasC1OrC2 && (
            <Alert className="mt-4 bg-red-500/20 border-red-500/50">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>Critical Issues Detected:</strong> C1 or C2 faults require immediate remedial action.
                The installation should not be used until these issues are resolved.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Fault Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Fault Classification Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-3xl font-bold text-red-400">{faultCounts.C1}</div>
              <div className="text-sm text-red-300 font-medium">C1 - Dangerous</div>
              <div className="text-xs text-red-400 mt-1">Immediate danger present</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="text-3xl font-bold text-orange-400">{faultCounts.C2}</div>
              <div className="text-sm text-orange-300 font-medium">C2 - Potentially Dangerous</div>
              <div className="text-xs text-orange-400 mt-1">Urgent remedial action</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="text-3xl font-bold text-yellow-400">{faultCounts.C3}</div>
              <div className="text-sm text-yellow-300 font-medium">C3 - Improvement Recommended</div>
              <div className="text-xs text-yellow-400 mt-1">Non-urgent improvement</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400">{faultCounts.FI}</div>
              <div className="text-sm text-blue-300 font-medium">FI - Further Investigation</div>
              <div className="text-xs text-blue-400 mt-1">Requires investigation</div>
            </div>
          </div>

          {totalFaults === 0 && (
            <Alert className="bg-green-500/10 border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">
                No faults detected during inspection and testing. The installation is in good condition.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Faults List */}
      {eicr_report.faults.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Detailed Fault List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eicr_report.faults.map((fault, index) => (
                <div 
                  key={fault.id}
                  className={`p-4 rounded-lg border ${
                    fault.faultCode === 'C1' ? 'border-red-500/50 bg-red-500/10' :
                    fault.faultCode === 'C2' ? 'border-orange-500/50 bg-orange-500/10' :
                    fault.faultCode === 'C3' ? 'border-yellow-500/50 bg-yellow-500/10' :
                    'border-blue-500/50 bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline"
                        className={`${
                          fault.faultCode === 'C1' ? 'border-red-500 text-red-300' :
                          fault.faultCode === 'C2' ? 'border-orange-500 text-orange-300' :
                          fault.faultCode === 'C3' ? 'border-yellow-500 text-yellow-300' :
                          'border-blue-500 text-blue-300'
                        }`}
                      >
                        {fault.faultCode}
                      </Badge>
                      <span className="font-medium">{fault.circuitRef}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(fault.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="font-medium mb-1">{fault.description}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Location:</strong> {fault.location}
                  </p>
                  <p className="text-sm">
                    <strong>Remedy:</strong> {fault.remedy}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circuit Summary */}
      {eicr_report.circuits.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-elec-yellow" />
              Circuit Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/20">
                    <th className="text-left p-2">Ref</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Protection</th>
                    <th className="text-left p-2">Rating</th>
                    <th className="text-left p-2">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {eicr_report.circuits.map((circuit) => (
                    <tr key={circuit.ref} className="border-b border-elec-yellow/10">
                      <td className="p-2 font-medium">{circuit.ref}</td>
                      <td className="p-2">{circuit.description}</td>
                      <td className="p-2 capitalize">{circuit.type}</td>
                      <td className="p-2">{circuit.protective_device}</td>
                      <td className="p-2">{circuit.rating}</td>
                      <td className="p-2">
                        <Badge 
                          variant={circuit.overall_condition === 'satisfactory' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {circuit.overall_condition}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Information */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            Standards Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Standards Applied:</strong> BS 7671:2018+A2:2022 (18th Edition)</p>
            <p><strong>Guidance:</strong> IET Guidance Note 3: Inspection & Testing</p>
            <p><strong>Report Type:</strong> {reportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p><strong>Generated:</strong> {new Date().toLocaleString()}</p>
          </div>
          
          <Alert className="mt-4 bg-blue-500/10 border-blue-500/30">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              This report has been generated using the ElecMate digital EICR tool and should be reviewed 
              by a qualified electrician before being issued to the client.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveSummaryReview;

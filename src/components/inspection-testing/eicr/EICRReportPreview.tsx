
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Share } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { Button } from '@/components/ui/button';

const EICRReportPreview = () => {
  const { eicrSession, generateEICRReport } = useEICR();

  if (!eicrSession) return null;

  const { eicr_report } = eicrSession;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">EICR Report Preview</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-base">Installation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Address:</span>
              <div>{eicr_report.installation_details.address || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Description:</span>
              <div>{eicr_report.installation_details.description || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Estimated Age:</span>
              <div>{eicr_report.installation_details.estimated_age || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Earthing Arrangements:</span>
              <div>{eicr_report.installation_details.earthing_arrangements || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Supply Characteristics:</span>
              <div>{eicr_report.installation_details.supply_characteristics || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Main Switch Rating:</span>
              <div>{eicr_report.installation_details.main_switch_rating || 'Not specified'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card className={`border-2 ${eicr_report.overall_assessment === 'satisfactory' ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge 
              variant={eicr_report.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}
              className="text-lg py-2 px-4"
            >
              {eicr_report.overall_assessment === 'satisfactory' ? 'SATISFACTORY' : 'UNSATISFACTORY'}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {eicr_report.overall_assessment === 'satisfactory' 
                ? 'The installation is in a satisfactory condition for continued service.'
                : 'The installation requires remedial action before continued use.'
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fault Summary */}
      {eicr_report.faults.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-base">Observations and Faults</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eicr_report.faults.map((fault, index) => (
                <div key={fault.id} className="border-l-4 border-l-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      className={
                        fault.faultCode === 'C1' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        fault.faultCode === 'C2' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                        fault.faultCode === 'C3' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                        'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }
                    >
                      {fault.faultCode}
                    </Badge>
                    <span className="font-medium text-sm">{fault.circuitRef}</span>
                    <span className="text-xs text-muted-foreground">{fault.location}</span>
                  </div>
                  <p className="text-sm mb-1">{fault.description}</p>
                  {fault.remedy && (
                    <p className="text-xs text-blue-200">
                      <strong>Remedy:</strong> {fault.remedy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circuit Schedule Summary */}
      {eicr_report.circuits.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-base">Circuit Schedule Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-elec-yellow/20">
                    <th className="text-left p-2">Ref</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Protection</th>
                    <th className="text-left p-2">Conductor</th>
                    <th className="text-left p-2">Max Zs</th>
                    <th className="text-left p-2">Measured Zs</th>
                    <th className="text-left p-2">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {eicr_report.circuits.map((circuit) => (
                    <tr key={circuit.ref} className="border-b border-elec-yellow/10">
                      <td className="p-2 font-mono">{circuit.ref}</td>
                      <td className="p-2 capitalize">{circuit.type.replace('-', ' ')}</td>
                      <td className="p-2">{circuit.protective_device} {circuit.rating}</td>
                      <td className="p-2">{circuit.conductor_csa}</td>
                      <td className="p-2">{circuit.max_zs}Ω</td>
                      <td className="p-2">
                        {circuit.measured_zs ? (
                          <span className={circuit.measured_zs > circuit.max_zs ? 'text-red-400' : 'text-green-400'}>
                            {circuit.measured_zs}Ω
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
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

      {/* Inspector Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-base">Inspector Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <div>{eicr_report.inspector_details.name || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Qualification:</span>
              <div>{eicr_report.inspector_details.qualification || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Date:</span>
              <div>{eicr_report.inspector_details.signature_date.toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRReportPreview;

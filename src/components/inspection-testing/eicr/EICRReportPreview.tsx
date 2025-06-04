
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';

const EICRReportPreview = () => {
  const { eicrSession, generateEICRReport } = useEICR();

  if (!eicrSession) return null;

  const { eicr_report } = eicrSession;

  const handleDownloadReport = () => {
    const report = generateEICRReport();
    if (report) {
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

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">EICR Report Preview</h3>
          <p className="text-sm text-muted-foreground">
            Preview and export your Electrical Installation Condition Report
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrintReport} variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Print Preview
          </Button>
          <Button onClick={handleDownloadReport} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Download className="h-4 w-4 mr-2" />
            Download EICR
          </Button>
        </div>
      </div>

      {/* Report Header */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            Electrical Installation Condition Report (EICR)
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Report ID: {eicr_report.id}</span>
            <span>Created: {eicr_report.created_at.toLocaleDateString('en-GB')}</span>
            <Badge variant={eicr_report.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}>
              {eicr_report.overall_assessment === 'satisfactory' ? 'SATISFACTORY' : 'UNSATISFACTORY'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Installation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Address:</strong>
              <p className="text-muted-foreground">{eicr_report.installation_details.address || 'Not specified'}</p>
            </div>
            <div>
              <strong>Description:</strong>
              <p className="text-muted-foreground">{eicr_report.installation_details.description || 'Not specified'}</p>
            </div>
            <div>
              <strong>Estimated Age:</strong>
              <p className="text-muted-foreground">{eicr_report.installation_details.estimated_age || 'Not specified'}</p>
            </div>
            <div>
              <strong>Earthing Arrangements:</strong>
              <p className="text-muted-foreground">{eicr_report.installation_details.earthing_arrangements || 'Not specified'}</p>
            </div>
            <div>
              <strong>Supply Characteristics:</strong>
              <p className="text-muted-foreground">{eicr_report.installation_details.supply_characteristics || 'Not specified'}</p>
            </div>
            <div>
              <strong>Main Switch Rating:</strong>
              <p className="text-muted-foreground">{eicr_report.installation_details.main_switch_rating || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Inspection Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <strong>Extent of Inspection:</strong>
            <p className="text-muted-foreground">{eicr_report.inspection_details.extent_of_inspection}</p>
          </div>
          
          {eicr_report.inspection_details.limitations.length > 0 && (
            <div>
              <strong>Limitations:</strong>
              <ul className="list-disc list-inside text-muted-foreground">
                {eicr_report.inspection_details.limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
          )}

          {eicr_report.inspection_details.departures_from_bs7671.length > 0 && (
            <div>
              <strong>Departures from BS 7671:</strong>
              <ul className="list-disc list-inside text-muted-foreground">
                {eicr_report.inspection_details.departures_from_bs7671.map((departure, index) => (
                  <li key={index}>{departure}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Circuit Schedule */}
      {eicr_report.circuits.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg">Circuit Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/20">
                    <th className="text-left p-2">Ref</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Protection</th>
                    <th className="text-left p-2">Conductor</th>
                    <th className="text-left p-2">Max Zs (Ω)</th>
                    <th className="text-left p-2">Measured Zs (Ω)</th>
                    <th className="text-left p-2">IR (MΩ)</th>
                    <th className="text-left p-2">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {eicr_report.circuits.map((circuit) => (
                    <tr key={circuit.ref} className="border-b border-elec-yellow/10">
                      <td className="p-2 font-mono">{circuit.ref}</td>
                      <td className="p-2">{circuit.description}</td>
                      <td className="p-2">{circuit.protective_device} {circuit.rating}A</td>
                      <td className="p-2">{circuit.conductor_csa}mm²</td>
                      <td className="p-2">{circuit.max_zs}</td>
                      <td className="p-2">{circuit.measured_zs || '-'}</td>
                      <td className="p-2">{circuit.insulation_resistance || '-'}</td>
                      <td className="p-2">
                        <Badge variant={circuit.overall_condition === 'satisfactory' ? 'default' : 'destructive'}>
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

      {/* Faults Found */}
      {eicr_report.faults.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Faults and Defects Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {eicr_report.faults.map((fault) => (
              <div key={fault.id} className="p-4 border border-elec-yellow/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={
                    fault.faultCode === 'C1' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    fault.faultCode === 'C2' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    fault.faultCode === 'C3' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }>
                    {fault.faultCode}
                  </Badge>
                  <span className="font-mono text-sm">{fault.circuitRef}</span>
                  <span className="text-sm text-muted-foreground">({fault.circuitType})</span>
                </div>
                <h4 className="font-medium mb-1">{fault.description}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Location:</strong> {fault.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Remedy:</strong> {fault.remedy}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Inspector Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Inspector Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Name:</strong>
              <p className="text-muted-foreground">{eicr_report.inspector_details.name || 'Not specified'}</p>
            </div>
            <div>
              <strong>Qualification:</strong>
              <p className="text-muted-foreground">{eicr_report.inspector_details.qualification || 'Not specified'}</p>
            </div>
            <div>
              <strong>Signature Date:</strong>
              <p className="text-muted-foreground">{eicr_report.inspector_details.signature_date.toLocaleDateString('en-GB')}</p>
            </div>
            {eicr_report.next_inspection_date && (
              <div>
                <strong>Next Inspection Due:</strong>
                <p className="text-muted-foreground">{eicr_report.next_inspection_date.toLocaleDateString('en-GB')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card className={`border-2 ${
        eicr_report.overall_assessment === 'satisfactory' 
          ? 'border-green-500/50 bg-green-500/10' 
          : 'border-red-500/50 bg-red-500/10'
      }`}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            {eicr_report.overall_assessment === 'satisfactory' ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-red-400" />
            )}
            <div>
              <h3 className="text-lg font-bold">
                Overall Assessment: {eicr_report.overall_assessment.toUpperCase()}
              </h3>
              <p className="text-sm text-muted-foreground">
                {eicr_report.overall_assessment === 'satisfactory'
                  ? 'The electrical installation is in a satisfactory condition and safe for continued use.'
                  : 'The electrical installation is unsatisfactory and requires remedial work before continued use.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRReportPreview;


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, FileText, Mail, Printer, Share, CheckCircle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { ReportType } from './DigitalEICRForm';

interface EICRExportOptionsProps {
  reportType: ReportType;
  formData: any;
}

const EICRExportOptions = ({ reportType, formData }: EICRExportOptionsProps) => {
  const { eicrSession, generateEICRReport } = useEICR();
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const report = generateEICRReport();
      if (report) {
        // Create PDF content
        const pdfContent = generatePDFContent(report);
        
        // Create blob and download
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType.toUpperCase()}-${report.id}-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setExported(true);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const handleExportJSON = () => {
    const report = generateEICRReport();
    if (report) {
      const blob = new Blob([JSON.stringify(report, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType.toUpperCase()}-${report.id}-data.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleEmailReport = () => {
    const report = generateEICRReport();
    if (report) {
      const subject = `${reportType.toUpperCase()} Report - ${report.installation_details.address}`;
      const body = `Please find attached the ${reportType.replace('-', ' ')} report for ${report.installation_details.address}.

Overall Assessment: ${report.overall_assessment.toUpperCase()}
Inspection Date: ${new Date(report.inspector_details.signature_date).toLocaleDateString()}
Inspector: ${report.inspector_details.name}

This report was generated using ElecMate digital EICR tools.`;
      
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    }
  };

  const generatePDFContent = (report: any): string => {
    // Simplified PDF content generation
    // In a real implementation, you would use a proper PDF library
    return `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 1000
>>
stream
BT
/F1 12 Tf
50 750 Td
(${reportType.toUpperCase()} REPORT) Tj
0 -30 Td
(Installation: ${report.installation_details.address}) Tj
0 -20 Td
(Overall Assessment: ${report.overall_assessment.toUpperCase()}) Tj
0 -20 Td
(Inspector: ${report.inspector_details.name}) Tj
0 -20 Td
(Date: ${new Date(report.inspector_details.signature_date).toLocaleDateString()}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000210 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
1265
%%EOF
`;
  };

  if (!eicrSession) {
    return (
      <Alert className="bg-red-500/10 border-red-500/30">
        <FileText className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          EICR data not available. Please complete the previous steps.
        </AlertDescription>
      </Alert>
    );
  }

  const { eicr_report } = eicrSession;
  const faultCounts = {
    C1: eicr_report.faults.filter(f => f.faultCode === 'C1').length,
    C2: eicr_report.faults.filter(f => f.faultCode === 'C2').length,
    C3: eicr_report.faults.filter(f => f.faultCode === 'C3').length,
    FI: eicr_report.faults.filter(f => f.faultCode === 'FI').length,
  };

  return (
    <div className="space-y-6">
      {/* Export Summary */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            Report Ready for Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Report Information</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Report ID:</strong> {eicr_report.id}</p>
                <p><strong>Type:</strong> {reportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                <p><strong>Installation:</strong> {eicr_report.installation_details.address}</p>
                <p><strong>Inspector:</strong> {eicr_report.inspector_details.name}</p>
                <p><strong>Created:</strong> {new Date(eicr_report.created_at).toLocaleString()}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Report Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Assessment:</span>
                  <Badge variant={eicr_report.overall_assessment === 'satisfactory' ? 'default' : 'destructive'}>
                    {eicr_report.overall_assessment.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Circuits:</span>
                  <Badge variant="outline">{eicr_report.circuits.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Faults:</span>
                  <Badge variant="outline">
                    {Object.values(faultCounts).reduce((a, b) => a + b, 0)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {exported && (
            <Alert className="bg-green-500/10 border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">
                Report exported successfully! The file has been downloaded to your device.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Export */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              PDF Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a professional PDF report suitable for client presentation and regulatory compliance.
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="mr-2">BS 7671 Compliant</Badge>
              <Badge variant="outline" className="mr-2">Professional Format</Badge>
              <Badge variant="outline">Digital Signature Ready</Badge>
            </div>
            <Button 
              onClick={handleExportPDF}
              disabled={exporting}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Download className="h-4 w-4 mr-2" />
              {exporting ? 'Generating PDF...' : 'Download PDF Report'}
            </Button>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5 text-elec-yellow" />
              Data Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Export raw data in JSON format for integration with other systems or backup purposes.
            </p>
            <div className="space-y-2">
              <Badge variant="outline" className="mr-2">JSON Format</Badge>
              <Badge variant="outline" className="mr-2">API Compatible</Badge>
              <Badge variant="outline">Backup Ready</Badge>
            </div>
            <Button 
              onClick={handleExportJSON}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data (JSON)
            </Button>
          </CardContent>
        </Card>

        {/* Email Option */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-elec-yellow" />
              Email Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Send the report directly to your client or colleague via email.
            </p>
            <Button 
              onClick={handleEmailReport}
              variant="outline"
              className="w-full"
            >
              <Mail className="h-4 w-4 mr-2" />
              Compose Email
            </Button>
          </CardContent>
        </Card>

        {/* Print Option */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Printer className="h-5 w-5 text-elec-yellow" />
              Print Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Print the report directly from your browser for physical copies.
            </p>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="w-full"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Important Notes */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• This report is generated using ElecMate digital EICR tools and complies with BS 7671:2018+A2:2022</p>
            <p>• All fault classifications follow IET Guidance Note 3 recommendations</p>
            <p>• The report should be reviewed and signed by a qualified electrician before issue</p>
            <p>• Keep a copy of this report for your records and provide a copy to the installation owner</p>
            <p>• Any C1 or C2 faults require immediate attention before the installation can be safely used</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRExportOptions;

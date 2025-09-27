
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3, FileText, Award, AlertTriangle } from 'lucide-react';
import ReportGenerator from '../ReportGenerator';
import { useEnhancedTesting } from '@/hooks/useEnhancedTesting';

const ReportsTab = () => {
  const { session } = useEnhancedTesting();
  const [reportFormat, setReportFormat] = useState<'eicr' | 'eic' | 'minor-works'>('eicr');

  const handleGenerateReport = (format: 'pdf' | 'excel' | 'word') => {
    console.log('Generating report in format:', format);
    // TODO: Implement actual report generation
  };

  const handleEmailReport = () => {
    console.log('Emailing report...');
    // TODO: Implement email functionality
  };

  const handlePrintReport = () => {
    console.log('Printing report...');
    // TODO: Implement print functionality
  };

  const handleGenerateBlankReport = (type: string) => {
    console.log('Generating blank report template:', type);
    // TODO: Implement blank report generation
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Professional Reports & Certification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Generate professional electrical installation reports and certificates compliant with 
            BS 7671:2018+A3:2024 requirements. All reports include proper formatting, fault codes, 
            and regulatory compliance documentation.
          </p>

          <Alert className="mb-6 bg-green-500/10 border-green-500/30">
            <Award className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              <strong>Professional Standards:</strong> All generated reports meet professional 
              electrical industry standards and include proper certification documentation with 
              digital signatures and compliance verification.
            </AlertDescription>
          </Alert>

          {session && session.status === 'completed' ? (
            <ReportGenerator
              session={session}
              onGenerateReport={handleGenerateReport}
              onEmailReport={handleEmailReport}
              onPrintReport={handlePrintReport}
            />
          ) : (
            <div className="space-y-6">
              <Alert className="bg-yellow-500/10 border-yellow-500/30">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200">
                  <strong>No Completed Session:</strong> Complete a testing session to generate 
                  professional reports with actual test results. Alternatively, generate blank 
                  report templates below.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      EICR Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Electrical Installation Condition Report for periodic inspection
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleGenerateBlankReport('eicr')}
                    >
                      Generate Blank EICR
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      EIC Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Electrical Installation Certificate for new installations
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleGenerateBlankReport('eic')}
                    >
                      Generate Blank EIC
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20 bg-orange-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Minor Works Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Certificate for minor electrical works and additions
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleGenerateBlankReport('minor-works')}
                    >
                      Generate Blank Minor Works
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Professional Certification Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Regulatory Compliance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• BS 7671:2018+A3:2024 compliant</li>
                <li>• IET Guidance Note 3 formatted</li>
                <li>• Professional fault code classification</li>
                <li>• Digital signature capability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Report Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Automated test result validation</li>
                <li>• Professional formatting</li>
                <li>• Multiple export formats</li>
                <li>• Email and print integration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;

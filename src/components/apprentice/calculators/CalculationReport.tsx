
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { CalculatorValidator } from "@/services/calculatorValidation";

interface CalculationReportProps {
  calculationType: string;
  inputs: { [key: string]: any };
  results: { [key: string]: any };
  validation: any;
  onDownload?: () => void;
}

const CalculationReport: React.FC<CalculationReportProps> = ({
  calculationType,
  inputs,
  results,
  validation,
  onDownload
}) => {
  const generateReport = () => {
    if (!validation) return '';
    
    return CalculatorValidator.generateCalculationReport(
      calculationType,
      inputs,
      results,
      validation
    );
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculationType.replace(/\s+/g, '_')}_calculation_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          Calculation Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-xs text-muted-foreground">
            Generate a professional calculation report for documentation and compliance purposes.
          </div>
          
          <Button 
            onClick={downloadReport}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          
          <div className="bg-elec-dark/50 rounded p-3 text-xs">
            <div className="font-medium text-elec-yellow mb-2">Report includes:</div>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>All input parameters and calculated results</li>
              <li>Standards compliance verification</li>
              <li>Safety warnings and recommendations</li>
              <li>Professional validation status</li>
              <li>Timestamp and calculation methodology</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculationReport;

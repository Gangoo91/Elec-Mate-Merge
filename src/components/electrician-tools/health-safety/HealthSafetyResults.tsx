import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RotateCcw, Send } from 'lucide-react';
import { toast } from 'sonner';
import { SendToAgentDropdown } from '@/components/install-planner-v2/SendToAgentDropdown';

interface HealthSafetyResultsProps {
  data: any;
  onStartOver: () => void;
}

export const HealthSafetyResults = ({ data, onStartOver }: HealthSafetyResultsProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success("Copied to clipboard");
  };

  const handleExportPDF = () => {
    try {
      const { generateRiskAssessmentPDF } = require('@/utils/pdf-generators/risk-assessment-pdf');
      
      const pdfData = {
        projectName: data.projectName || 'Untitled Project',
        location: data.location || 'Not specified',
        assessor: 'AI Health & Safety Advisor',
        date: new Date().toISOString().split('T')[0],
        projectType: data.workType || 'general',
        hazards: data.hazards || [],
        requiredPPE: data.ppe?.map((p: any) => p.ppeType) || [],
        emergencyProcedures: data.emergencyProcedures || [],
        notes: data.notes
      };
      
      const pdf = generateRiskAssessmentPDF(pdfData);
      pdf.save(`Risk-Assessment-${data.projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">Safety Documentation Results</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleCopy}
            className="touch-manipulation"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleExportPDF}
            className="touch-manipulation"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <SendToAgentDropdown 
            currentAgent="health-safety" 
            currentOutput={data} 
          />
          <Button 
            size="sm" 
            variant="ghost"
            onClick={onStartOver}
            className="touch-manipulation"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>

      {/* Risk Assessment */}
      {data?.hazards && data.hazards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.hazards.map((hazard: any, idx: number) => (
              <div key={idx} className="p-4 bg-muted/50 rounded-lg border">
                <div className="font-medium mb-2">{hazard.hazard}</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>
                    Likelihood: {hazard.likelihood}/5 | Severity: {hazard.severity}/5 | 
                    Risk: <span className="font-medium">{hazard.riskLevel}</span> ({hazard.riskScore})
                  </div>
                  {hazard.controlMeasure && (
                    <div className="mt-2">
                      <span className="font-medium">Control: </span>{hazard.controlMeasure}
                    </div>
                  )}
                  {hazard.regulation && (
                    <div className="text-xs mt-1">
                      Ref: {hazard.regulation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* PPE Requirements */}
      {data?.ppe && data.ppe.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Required PPE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.ppe.map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-lg border">
                  <div className="font-medium text-sm mb-1">{item.ppeType}</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Standard: {item.standard}</div>
                    <div>{item.mandatory ? '✓ Mandatory' : '○ Recommended'}</div>
                    <div className="mt-2">Purpose: {item.purpose}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Procedures */}
      {data?.emergencyProcedures && data.emergencyProcedures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Emergency Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.emergencyProcedures.map((procedure: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-400 font-bold mt-1">{idx + 1}.</span>
                  <span>{procedure}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {data?.notes && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

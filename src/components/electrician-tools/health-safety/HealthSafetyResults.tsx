import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { SendToAgentDropdown } from '@/components/install-planner-v2/SendToAgentDropdown';
import { RiskSummaryStats } from './results/RiskSummaryStats';
import { EnhancedHazardCard } from './results/EnhancedHazardCard';
import { PPERequirementsGrid } from './results/PPERequirementsGrid';
import { EmergencyProceduresSection } from './results/EmergencyProceduresSection';

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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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

      {/* Summary Statistics */}
      <RiskSummaryStats
        hazards={data?.hazards || []}
        ppeItems={data?.ppe || []}
        emergencyProcedures={data?.emergencyProcedures || []}
      />

      {/* Risk Assessment - Enhanced Cards */}
      {data?.hazards && data.hazards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.hazards.map((hazard: any, idx: number) => (
              <EnhancedHazardCard key={idx} hazard={hazard} index={idx} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* PPE Requirements - Enhanced Grid */}
      <PPERequirementsGrid ppeItems={data?.ppe || []} />

      {/* Emergency Procedures - Enhanced Section */}
      <EmergencyProceduresSection procedures={data?.emergencyProcedures || []} />

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

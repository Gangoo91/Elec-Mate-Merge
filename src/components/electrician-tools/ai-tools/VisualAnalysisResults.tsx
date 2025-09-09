import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Save, 
  Plus,
  Eye,
  Wrench,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
}

interface AnalysisResult {
  findings: Array<{
    description: string;
    eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
    confidence: number;
    bs7671_clauses: string[];
    location?: string;
    fix_guidance: string;
    bounding_box?: BoundingBox;
  }>;
  recommendations: Array<{
    action: string;
    priority: 'immediate' | 'urgent' | 'recommended';
    bs7671_reference?: string;
    cost_estimate?: string;
    eicr_code: 'C1' | 'C2' | 'C3';
  }>;
  compliance_summary: {
    overall_assessment: 'satisfactory' | 'unsatisfactory';
    c1_count: number;
    c2_count: number;
    c3_count: number;
    fi_count: number;
    safety_rating: number;
  };
  summary: string;
}

interface VisualAnalysisResultsProps {
  analysisResult: AnalysisResult;
  onExportReport: () => void;
}

const VisualAnalysisResults: React.FC<VisualAnalysisResultsProps> = ({ 
  analysisResult, 
  onExportReport 
}) => {

  const getEicrCodeColor = (code: string) => {
    switch (code) {
      case 'C1': return 'bg-red-500 text-white';
      case 'C2': return 'bg-amber-500 text-white';
      case 'C3': return 'bg-blue-500 text-white';
      case 'FI': return 'bg-slate-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEicrCodeDescription = (code: string) => {
    switch (code) {
      case 'C1': return 'Danger present - immediate action required';
      case 'C2': return 'Potentially dangerous - urgent remedial action required';
      case 'C3': return 'Improvement recommended';
      case 'FI': return 'Further investigation required';
      default: return 'Unknown code';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'urgent': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'recommended': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const copySummary = () => {
    const summary = `VISUAL FAULT ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString('en-GB')}
Safety Rating: ${analysisResult.compliance_summary.safety_rating}/10

IDENTIFIED ISSUES:
${analysisResult.findings.map(finding => 
  `• ${finding.description} (${finding.eicr_code}) - ${finding.bs7671_clauses.join(', ')}`
).join('\n')}

KEY ACTIONS REQUIRED:
${analysisResult.recommendations.map(rec => 
  `• ${rec.action} (${rec.priority})`
).join('\n')}

This analysis is for guidance only and must be verified by a qualified electrician.`;

    navigator.clipboard.writeText(summary);
    toast({
      title: "Summary copied",
      description: "Analysis summary copied to clipboard.",
    });
  };

  return (
    <Card className="bg-card border-border max-w-5xl mx-auto">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {analysisResult.compliance_summary.overall_assessment === 'satisfactory' && 
             analysisResult.compliance_summary.c1_count === 0 && 
             analysisResult.compliance_summary.c2_count === 0 ? (
              <>
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <CardTitle className="text-lg sm:text-xl text-foreground">All Clear — Satisfactory</CardTitle>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                <CardTitle className="text-lg sm:text-xl text-foreground">Issues Identified</CardTitle>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportReport}
              className="border-border hover:bg-accent/50 w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copySummary}
              className="border-border hover:bg-accent/50 w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Copy Summary</span>
              <span className="sm:hidden">Copy</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
        {/* Compliance Summary */}
        <div className="bg-accent/10 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Assessment Summary</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {analysisResult.compliance_summary.safety_rating}/10
              </span>
              {analysisResult.compliance_summary.safety_rating >= 8 ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : analysisResult.compliance_summary.safety_rating >= 6 ? (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-400" />
              )}
            </div>
          </div>
          
          {/* Code Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{analysisResult.compliance_summary.c1_count}</div>
              <div className="text-sm text-muted-foreground">C1 Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{analysisResult.compliance_summary.c2_count}</div>
              <div className="text-sm text-muted-foreground">C2 Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{analysisResult.compliance_summary.c3_count}</div>
              <div className="text-sm text-muted-foreground">C3 Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-400">{analysisResult.compliance_summary.fi_count}</div>
              <div className="text-sm text-muted-foreground">FI Issues</div>
            </div>
          </div>
          
          <div className="mb-4">
            {analysisResult.compliance_summary.overall_assessment === 'satisfactory' && 
             analysisResult.compliance_summary.c1_count === 0 && 
             analysisResult.compliance_summary.c2_count === 0 ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-green-400 mb-1">All Clear — Satisfactory</h3>
                <p className="text-green-300/80 text-sm">No immediate safety concerns identified</p>
              </div>
            ) : (
              <Badge className={`${
                analysisResult.compliance_summary.overall_assessment === 'satisfactory' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                Overall Assessment: {analysisResult.compliance_summary.overall_assessment.charAt(0).toUpperCase() + analysisResult.compliance_summary.overall_assessment.slice(1)}
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm">{analysisResult.summary}</p>
        </div>

        {/* Findings */}
        {analysisResult.findings.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Findings</h3>
            <div className="space-y-3">
              {analysisResult.findings.map((finding, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getEicrCodeColor(finding.eicr_code)}>
                          {finding.eicr_code}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {getEicrCodeDescription(finding.eicr_code)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(finding.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground mb-2">{finding.description}</p>
                      {finding.location && (
                        <p className="text-sm text-muted-foreground mb-2">Location: {finding.location}</p>
                      )}
                      
                      {/* BS 7671 Clauses */}
                      {finding.bs7671_clauses.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {finding.bs7671_clauses.map((clause, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              BS 7671: {clause}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Fix Guidance */}
                      <div className="bg-accent/10 rounded-lg p-3 mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-sm">How to Fix</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{finding.fix_guidance}</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysisResult.recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
            <div className="space-y-3">
              {analysisResult.recommendations.map((rec, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                        </Badge>
                        <Badge className={getEicrCodeColor(rec.eicr_code)}>
                          {rec.eicr_code}
                        </Badge>
                        {rec.cost_estimate && (
                          <Badge variant="outline" className="text-xs">
                            Est. {rec.cost_estimate}
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium text-foreground">{rec.action}</p>
                      {rec.bs7671_reference && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <FileText className="h-3 w-3 inline mr-1" />
                          BS 7671 Reference: {rec.bs7671_reference}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-400 mb-1">Important Disclaimer</h4>
              <p className="text-sm text-amber-200/80">
                This AI analysis is provided as guidance only and should not replace professional electrical inspection. 
                All findings must be verified by a qualified electrician. Visual analysis may not detect all potential 
                issues, especially those requiring physical testing or access to concealed installations.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualAnalysisResults;
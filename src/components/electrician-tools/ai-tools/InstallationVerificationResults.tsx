import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Save,
  FileText,
  Shield,
  XCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VerificationCheck {
  check_name: string;
  status: 'pass' | 'fail' | 'requires_testing';
  details: string;
  bs7671_references: string[];
  confidence: number;
}

interface VerificationResult {
  verification_checks: VerificationCheck[];
  improvement_recommendations: string[];
  overall_result: 'pass' | 'fail' | 'requires_testing';
  confidence_score: number;
  processing_time: number;
}

interface InstallationVerificationResultsProps {
  verificationResult: VerificationResult;
  onExportReport: () => void;
  onRetry?: () => void;
}

const InstallationVerificationResults: React.FC<InstallationVerificationResultsProps> = ({ 
  verificationResult, 
  onExportReport
}) => {
  // Normalise incoming payload to a stable shape (defensive against model variations)
  const formatStatus = (s?: string) => (s ? s.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN');
  const percent = (n?: number) => {
    const v = n ?? 0;
    return Math.round(v <= 1 ? v * 100 : v);
  };

  const overall = (verificationResult as any)?.overall_result 
    ?? (verificationResult as any)?.assessment 
    ?? (verificationResult as any)?.overall 
    ?? 'requires_testing';

  const confidenceScore = (verificationResult as any)?.confidence_score 
    ?? (verificationResult as any)?.confidence 
    ?? 0.7;

  const processingTime = (verificationResult as any)?.processing_time 
    ?? (verificationResult as any)?.processing_time_ms 
    ?? 0;

  const checksRaw = Array.isArray((verificationResult as any)?.verification_checks) 
    ? (verificationResult as any).verification_checks 
    : [];

  const checks: VerificationCheck[] = checksRaw.map((c: any) => ({
    check_name: c?.check_name ?? c?.check ?? c?.name ?? 'Verification check',
    status: (c?.status ?? c?.result ?? 'requires_testing') as VerificationCheck['status'],
    details: c?.details ?? c?.detail ?? c?.summary ?? c?.description ?? 'No detail provided',
    bs7671_references: Array.isArray(c?.bs7671_references)
      ? c.bs7671_references
      : (c?.bs7671_reference ? [c.bs7671_reference] : []),
    confidence: typeof c?.confidence === 'number' 
      ? c.confidence 
      : (typeof c?.confidence_score === 'number' ? c.confidence_score : 0.7),
  }));

  const recommendations: string[] = Array.isArray((verificationResult as any)?.improvement_recommendations)
    ? (verificationResult as any).improvement_recommendations
    : (Array.isArray((verificationResult as any)?.recommendations) ? (verificationResult as any).recommendations : []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'requires_testing': return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      default: return <Shield className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'fail': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'requires_testing': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOverallStatusBg = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-500/10 border-green-500/30';
      case 'fail': return 'bg-red-500/10 border-red-500/30';
      case 'requires_testing': return 'bg-amber-500/10 border-amber-500/30';
      default: return 'bg-muted';
    }
  };

  const copySummary = () => {
    const summary = `INSTALLATION VERIFICATION REPORT
Generated: ${new Date().toLocaleDateString('en-GB')}
Overall Result: ${formatStatus(overall)}
Confidence: ${percent(confidenceScore)}%

VERIFICATION CHECKS:
${checks.map(check => 
  `• ${check.check_name}: ${formatStatus(check.status)} (${percent(check.confidence)}% confidence)\n  ${check.details}\n  BS 7671: ${Array.isArray(check.bs7671_references) && check.bs7671_references.length > 0 ? check.bs7671_references.join(', ') : 'N/A'}`
).join('\n\n')}

IMPROVEMENT RECOMMENDATIONS:
${recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n')}

Processing Time: ${processingTime}ms

This verification is visual only and must be supplemented with physical testing by a qualified electrician.`;

    navigator.clipboard.writeText(summary);
    toast({
      title: "Summary copied",
      description: "Verification summary copied to clipboard.",
    });
  };

  const passCount = checks.filter(c => c.status === 'pass').length;
  const failCount = checks.filter(c => c.status === 'fail').length;
  const testingCount = checks.filter(c => c.status === 'requires_testing').length;

  return (
    <Card className="bg-card border-border w-full">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 mb-2">
          <CardTitle className="text-xl sm:text-2xl text-foreground">Installation Verification Results</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onExportReport}
              className="border-border hover:bg-accent/50 min-h-[44px] text-sm sm:text-base"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              onClick={copySummary}
              className="border-border hover:bg-accent/50 min-h-[44px] text-sm sm:text-base"
            >
              <Save className="h-4 w-4 mr-2" />
              Copy Summary
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
        {/* Overall Result */}
        <div className={`border rounded-lg p-6 ${getOverallStatusBg(overall)}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-lg">Overall Assessment</h3>
            <Badge className={`${getStatusColor(overall)} text-lg px-4 py-2`}>
              {formatStatus(overall)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{passCount}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{failCount}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{testingCount}</div>
              <div className="text-sm text-muted-foreground">Requires Testing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{percent(confidenceScore)}%</div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
          </div>
        </div>

        {/* Verification Checks */}
        {checks.length > 0 && (
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Verification Checks</h3>
            <div className="space-y-4">
              {checks.map((check, index) => (
                <div key={index} className="border border-border rounded-lg p-4 sm:p-5 space-y-4">
                  {/* Check Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(check.status)}
                        <h4 className="text-lg font-semibold text-foreground">{check.check_name}</h4>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getStatusColor(check.status)}>
                          {formatStatus(check.status)}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {percent(check.confidence)}% confidence
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Check Details */}
                  <p className="text-base text-foreground leading-relaxed">
                    {check.details}
                  </p>
                  
                  {/* BS 7671 References */}
                  {Array.isArray(check.bs7671_references) && check.bs7671_references.length > 0 && (
                    <div className="bg-accent/30 border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-foreground" />
                        <h5 className="text-base font-semibold text-foreground">BS 7671 References</h5>
                      </div>
                      <ul className="space-y-2 pl-2">
                        {check.bs7671_references.map((ref, idx) => (
                          <li key={idx} className="text-sm sm:text-base text-foreground font-mono flex items-center gap-2">
                            <span className="text-elec-yellow">•</span>
                            <span>Regulation {ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Improvement Recommendations</h3>
            <div className="bg-elec-card border border-elec-yellow/20 rounded-lg p-5 space-y-3">
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm sm:text-base text-foreground leading-relaxed flex items-start gap-3">
                    <span className="text-elec-yellow font-bold flex-shrink-0">{index + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Processing Info */}
        <div className="text-sm text-muted-foreground text-center">
          Analysis completed in {processingTime}ms
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-400 mb-1">Important Disclaimer</h4>
              <p className="text-sm text-amber-200/80">
                This visual verification is provided as guidance only and must be supplemented with comprehensive 
                physical testing (insulation resistance, earth fault loop impedance, RCD testing, etc.) by a qualified 
                electrician. Visual inspection alone cannot verify full BS 7671 compliance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstallationVerificationResults;

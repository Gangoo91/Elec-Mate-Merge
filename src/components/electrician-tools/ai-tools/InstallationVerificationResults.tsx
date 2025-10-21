import { useState } from "react";
import { FileText, Download, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalyzedImageViewer } from "./AnalyzedImageViewer";
import { VerificationCheckAccordion } from "./VerificationCheckAccordion";
import { ComplianceScoreGauge } from "./ComplianceScoreGauge";
import { NextStepsChecklist } from "./NextStepsChecklist";
import { VerificationFilter } from "./VerificationFilter";

interface VerificationCheck {
  check_name: string;
  status: 'pass' | 'fail' | 'requires_testing';
  details: string;
  bs7671_references: string[];
  confidence: number;
}

interface InstallationVerificationResultsProps {
  analysisResult: {
    verification_checks?: VerificationCheck[];
    improvement_recommendations?: string[];
    overall_result?: 'pass' | 'fail' | 'requires_testing';
    confidence_score?: number;
    processing_time?: number;
  };
  imageUrl?: string;
  timestamp?: string;
  onStartChat?: () => void;
  onExportReport?: () => void;
}

const InstallationVerificationResults = ({
  analysisResult,
  imageUrl,
  timestamp,
  onStartChat,
  onExportReport
}: InstallationVerificationResultsProps) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pass' | 'fail' | 'testing'>('all');

  // Normalise and extract data
  const checks = analysisResult?.verification_checks || [];
  const recommendations = analysisResult?.improvement_recommendations || [];
  const overallResult = analysisResult?.overall_result || 'requires_testing';
  const confidenceScore = analysisResult?.confidence_score || 0;
  const processingTime = analysisResult?.processing_time;

  // Calculate counts
  const passCount = checks.filter(c => c.status === 'pass').length;
  const failCount = checks.filter(c => c.status === 'fail').length;
  const requiresTestingCount = checks.filter(c => c.status === 'requires_testing').length;

  // Filter checks
  const filteredChecks = checks.filter(check => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pass') return check.status === 'pass';
    if (selectedFilter === 'fail') return check.status === 'fail';
    if (selectedFilter === 'testing') return check.status === 'requires_testing';
    return true;
  });

  const filterCounts = {
    all: checks.length,
    pass: passCount,
    fail: failCount,
    testing: requiresTestingCount
  };

  if (!checks || checks.length === 0) {
    return (
      <Card className="bg-card border-border/40">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No verification results available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with metadata */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Installation Verification Results
              </CardTitle>
              <CardDescription>
                AI-powered visual assessment • {checks.length} checks performed
              </CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              {onStartChat && (
                <Button variant="outline" onClick={onStartChat} className="touch-target">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              )}
              {onExportReport && (
                <Button variant="outline" onClick={onExportReport} className="touch-target">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Analysis metadata */}
          <div className="flex flex-wrap gap-3 text-sm">
            <Badge variant="outline" className="text-xs">
              Confidence: {Math.round(confidenceScore * 100)}%
            </Badge>
            {processingTime && (
              <Badge variant="outline" className="text-xs">
                Processing: {processingTime.toFixed(1)}s
              </Badge>
            )}
            {timestamp && (
              <Badge variant="outline" className="text-xs">
                {new Date(timestamp).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analyzed image */}
      {imageUrl && (
        <AnalyzedImageViewer 
          imageUrl={imageUrl} 
          timestamp={timestamp}
        />
      )}

      {/* Compliance score overview */}
      <ComplianceScoreGauge
        passCount={passCount}
        failCount={failCount}
        requiresTestingCount={requiresTestingCount}
        totalChecks={checks.length}
      />

      {/* Next steps checklist */}
      <NextStepsChecklist
        failCount={failCount}
        requiresTestingCount={requiresTestingCount}
        recommendations={recommendations}
      />

      {/* Filter controls */}
      <Card className="bg-card border-border/40">
        <CardHeader>
          <CardTitle className="text-base">Verification Checks</CardTitle>
          <CardDescription>
            {selectedFilter === 'all' 
              ? `Showing all ${checks.length} checks` 
              : `Showing ${filteredChecks.length} of ${checks.length} checks`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <VerificationFilter
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            counts={filterCounts}
          />
          
          {filteredChecks.length > 0 ? (
            <VerificationCheckAccordion checks={filteredChecks} />
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No checks match the selected filter
            </div>
          )}
        </CardContent>
      </Card>

      {/* Important notice */}
      <Card className="bg-amber-500/5 border-amber-500/20">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important:</strong> This is a visual assessment only. 
            Physical testing with calibrated instruments is required for full BS 7671 compliance verification. 
            Always engage a qualified electrician for certification work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallationVerificationResults;

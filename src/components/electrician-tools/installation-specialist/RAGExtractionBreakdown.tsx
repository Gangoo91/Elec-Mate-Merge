import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, BookOpen, TrendingUp, Package, FileText, AlertCircle } from "lucide-react";

interface ExtractionBreakdown {
  practicalWork: {
    documentsUsed: number;
    toolsExtracted: number;
    materialsExtracted: number;
    regulationsExtracted: number;
    avgConfidence: number;
  };
  bs7671: {
    documentsUsed: number;
    regulationsExtracted: number;
    avgRelevance: number;
  };
}

interface RAGExtractionBreakdownProps {
  extractionBreakdown: ExtractionBreakdown;
}

export const RAGExtractionBreakdown = ({ extractionBreakdown }: RAGExtractionBreakdownProps) => {
  const { practicalWork, bs7671 } = extractionBreakdown;

  const totalTools = practicalWork.toolsExtracted;
  const totalMaterials = practicalWork.materialsExtracted;
  const totalRegulations = practicalWork.regulationsExtracted + bs7671.regulationsExtracted;
  const totalDocuments = practicalWork.documentsUsed + bs7671.documentsUsed;

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-background shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-blue-400/30">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base sm:text-lg">RAG Extraction Breakdown</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Knowledge extracted from {totalDocuments} database source{totalDocuments !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5">
          <div className="bg-gradient-to-br from-blue-500/10 to-background border border-blue-400/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Wrench className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-muted-foreground font-medium">Tools</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalTools}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-background border border-emerald-400/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Package className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs text-muted-foreground font-medium">Materials</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalMaterials}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-background border border-orange-400/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <FileText className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-xs text-muted-foreground font-medium">Regulations</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalRegulations}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-background border border-purple-400/20 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs text-muted-foreground font-medium">Sources</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{totalDocuments}</p>
          </div>
        </div>

        {/* Detailed Source Breakdown */}
        <div className="space-y-3">
          {/* Practical Work Intelligence */}
          <div className="bg-muted/30 rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-500/20">
                  <Wrench className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Practical Work Intelligence</h4>
                  <p className="text-xs text-muted-foreground">Real-world installation procedures</p>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-blue-500/10 text-blue-400 border-blue-400/30 text-xs"
              >
                {practicalWork.avgConfidence}% confidence
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                <p className="text-lg sm:text-xl font-bold text-foreground">{practicalWork.documentsUsed}</p>
                <p className="text-xs text-muted-foreground">Documents</p>
              </div>
              <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                <p className="text-lg sm:text-xl font-bold text-blue-400">{practicalWork.toolsExtracted}</p>
                <p className="text-xs text-muted-foreground">Tools</p>
              </div>
              <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                <p className="text-lg sm:text-xl font-bold text-emerald-400">{practicalWork.materialsExtracted}</p>
                <p className="text-xs text-muted-foreground">Materials</p>
              </div>
              <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                <p className="text-lg sm:text-xl font-bold text-orange-400">{practicalWork.regulationsExtracted}</p>
                <p className="text-xs text-muted-foreground">Regulations</p>
              </div>
            </div>
          </div>

          {/* BS 7671 Intelligence */}
          <div className="bg-muted/30 rounded-lg border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-orange-500/20">
                  <BookOpen className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">BS 7671 Regulations</h4>
                  <p className="text-xs text-muted-foreground">18th Edition wiring regulations</p>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-orange-500/10 text-orange-400 border-orange-400/30 text-xs"
              >
                {bs7671.avgRelevance}% relevance
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                <p className="text-lg sm:text-xl font-bold text-foreground">{bs7671.documentsUsed}</p>
                <p className="text-xs text-muted-foreground">Regulation Entries</p>
              </div>
              <div className="text-center p-2 bg-background/50 rounded border border-border/30">
                <p className="text-lg sm:text-xl font-bold text-orange-400">{bs7671.regulationsExtracted}</p>
                <p className="text-xs text-muted-foreground">Citations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Indicator */}
        <div className="mt-4 flex items-start gap-2 bg-blue-500/5 rounded-lg p-3 border border-blue-500/20">
          <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Data Quality:</strong> Higher extraction counts indicate more comprehensive generated steps. 
            Tools and materials are sourced from practical work database ({practicalWork.documentsUsed} procedures analyzed). 
            Regulatory compliance verified against {bs7671.documentsUsed} BS 7671 regulation{bs7671.documentsUsed !== 1 ? 's' : ''}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

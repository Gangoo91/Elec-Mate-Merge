import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Clock, TrendingUp } from "lucide-react";
import { ClientType } from "./ClientTypeSelector";

interface LivePreviewProps {
  content: string;
  tone: string;
  readingLevel: string;
  clientType: ClientType;
  includeAnalogy: boolean;
  emphasizeSafety: boolean;
}

const LivePreview = ({
  content,
  tone,
  readingLevel,
  clientType,
  includeAnalogy,
  emphasizeSafety
}: LivePreviewProps) => {
  const getReadabilityScore = (text: string) => {
    if (!text) return 0;
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordsPerSentence = words / Math.max(sentences, 1);
    
    // Simple readability approximation
    if (avgWordsPerSentence < 10) return 95; // Very easy
    if (avgWordsPerSentence < 15) return 85; // Easy
    if (avgWordsPerSentence < 20) return 75; // Standard
    if (avgWordsPerSentence < 25) return 65; // Difficult
    return 50; // Very difficult
  };

  const getEstimatedReadTime = (text: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readabilityScore = getReadabilityScore(content);
  const readTime = getEstimatedReadTime(content);
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  const getClientTypeIcon = (type: ClientType) => {
    switch (type) {
      case "homeowner": return "🏠";
      case "business": return "🏢";
      case "landlord": return "🏘️";
      case "contractor": return "🔧";
      default: return "👤";
    }
  };

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-elec-yellow" />
          <CardTitle className="text-sm">Live Preview</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="text-lg font-semibold text-foreground">{wordCount}</div>
            <div className="text-xs text-muted-foreground">Words</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="text-lg font-semibold text-foreground">{readabilityScore}%</div>
            <div className="text-xs text-muted-foreground">Readability</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="text-lg font-semibold text-foreground">{readTime}m</div>
            <div className="text-xs text-muted-foreground">Read Time</div>
          </div>
        </div>

        {/* Settings Preview */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              <span className="mr-1">{getClientTypeIcon(clientType)}</span>
              {clientType}
            </Badge>
            <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
              {tone}
            </Badge>
            <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-400">
              {readingLevel}
            </Badge>
            {includeAnalogy && (
              <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
                analogies
              </Badge>
            )}
            {emphasizeSafety && (
              <Badge variant="outline" className="text-xs border-red-400/30 text-red-400">
                safety focus
              </Badge>
            )}
          </div>
        </div>

        {/* Content Preview */}
        {content ? (
          <div className="bg-muted/30 rounded-lg p-3 max-h-32 overflow-y-auto">
            <p className="text-xs text-muted-foreground line-clamp-6">
              {content.substring(0, 200)}
              {content.length > 200 && "..."}
            </p>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Preview will appear here as you type
            </p>
          </div>
        )}

        {/* Readability Indicator */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Readability</span>
            <span className={`font-medium ${
              readabilityScore >= 80 ? "text-green-400" :
              readabilityScore >= 60 ? "text-yellow-400" : "text-red-400"
            }`}>
              {readabilityScore >= 80 ? "Excellent" :
               readabilityScore >= 60 ? "Good" : "Needs work"}
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                readabilityScore >= 80 ? "bg-green-400" :
                readabilityScore >= 60 ? "bg-yellow-400" : "bg-red-400"
              }`}
              style={{ width: `${readabilityScore}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePreview;
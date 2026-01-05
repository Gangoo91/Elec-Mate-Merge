import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, ExternalLink, FileText, Target, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAnalysisSummaryCardProps {
  aiAnalysis: {
    qualityAssurance: {
      agreesWithInspector: boolean;
      feedback: string;
      suggestedClassification?: string;
    };
    aiClassification: string;
    confidence: number;
    regulations: Array<{
      code: string;
      title?: string;
    }>;
  };
  inspectorClassification?: string;
  onViewFullAnalysis: () => void;
}

const AIAnalysisSummaryCard: React.FC<AIAnalysisSummaryCardProps> = ({
  aiAnalysis,
  inspectorClassification,
  onViewFullAnalysis,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const { agreesWithInspector, feedback, suggestedClassification } = aiAnalysis.qualityAssurance;
  const { aiClassification, confidence, regulations } = aiAnalysis;

  // Get status badge info
  const getStatusInfo = () => {
    if (agreesWithInspector) {
      return {
        icon: CheckCircle,
        text: `AI Confirms ${inspectorClassification || aiClassification}`,
        bgColor: 'bg-success/10',
        borderColor: 'border-success/30',
        textColor: 'text-success',
      };
    } else if (aiClassification === 'NO_DEFECT_VISIBLE') {
      return {
        icon: HelpCircle,
        text: 'AI Queries Classification',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/30',
        textColor: 'text-warning',
      };
    } else {
      return {
        icon: AlertTriangle,
        text: `AI Suggests ${suggestedClassification || aiClassification}`,
        bgColor: 'bg-destructive/10',
        borderColor: 'border-destructive/30',
        textColor: 'text-destructive',
      };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;
  
  // Truncate feedback to ~100 characters at last complete word
  const briefFeedback = feedback.length > 100 
    ? feedback.slice(0, 100).split(' ').slice(0, -1).join(' ') + '...' 
    : feedback;
  const keyRegulation = regulations[0] || null;

  // Get confidence color
  const getConfidenceColor = () => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="w-full justify-between text-xs h-8"
      >
        <span className="flex items-center gap-1">
          <StatusIcon className="h-3 w-3" />
          Show AI Summary
        </span>
        <ChevronDown className="h-3 w-3" />
      </Button>
    );
  }

  return (
    <Card className={cn('border-2', statusInfo.borderColor, statusInfo.bgColor)}>
      <CardContent className="p-3 space-y-2">
        {/* Header with Badge and Collapse */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn('h-4 w-4', statusInfo.textColor)} />
            <span className={cn('text-xs font-semibold', statusInfo.textColor)}>
              {statusInfo.text}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(false)}
            className="h-5 w-5 -mt-1"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
        </div>

        {/* Brief Reasoning */}
        <p className="text-xs text-foreground/80 leading-relaxed">
          {briefFeedback}
        </p>

        {/* Key Regulation & Confidence */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            {keyRegulation && (
              <>
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <Badge variant="outline" className="text-xs font-medium h-5">
                  Reg {keyRegulation.code}
                </Badge>
              </>
            )}
            {regulations.length > 1 && (
              <span className="text-xs text-muted-foreground">
                +{regulations.length - 1} more
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-muted-foreground" />
            <span className={cn('text-sm font-bold', getConfidenceColor())}>
              {Math.round(confidence)}%
            </span>
          </div>
        </div>

        {/* View Full Analysis Button */}
        <Button
          variant={agreesWithInspector ? "outline" : "default"}
          size="sm"
          onClick={onViewFullAnalysis}
          className="w-full h-8 text-xs gap-1.5 mt-1"
        >
          View Full Analysis
          <ExternalLink className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisSummaryCard;

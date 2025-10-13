import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { BookOpen } from "lucide-react";

interface RegulationCitationTooltipProps {
  citation: {
    regulation_number: string;
    section: string;
    content: string;
    confidence?: {
      overall: number;
      reasoning: string;
    };
    interactiveTooltip?: string;
  };
  index: number;
}

export const RegulationCitationTooltip = ({ citation, index }: RegulationCitationTooltipProps) => {
  const confidence = citation.confidence?.overall || 0.75;
  const reasoning = citation.confidence?.reasoning || 'Referenced regulation';

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div className="inline-flex items-center gap-2 p-2 rounded-lg border border-elec-yellow/30 bg-elec-yellow/5 hover:bg-elec-yellow/10 transition-colors cursor-help">
          <BookOpen className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-medium text-foreground">{citation.regulation_number}</span>
          <ConfidenceBadge confidence={confidence} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 bg-elec-dark-lighter border-elec-yellow/20">
        <div className="space-y-3">
          <div className="font-semibold text-elec-yellow">{citation.regulation_number}</div>
          <div className="text-sm text-gray-300">{citation.section}</div>
          <div className="text-xs text-gray-400 border-t border-gray-700 pt-2 max-h-32 overflow-y-auto">
            {citation.content.substring(0, 200)}...
          </div>
          <div className="mt-3 pt-2 border-t border-gray-700">
            <div className="text-xs">
              <div className="font-medium mb-1 flex items-center gap-2">
                <span>Confidence:</span>
                <Badge variant={confidence > 0.85 ? "default" : "secondary"} className="text-xs">
                  {Math.round(confidence * 100)}%
                </Badge>
              </div>
              <div className="text-gray-400">{reasoning}</div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

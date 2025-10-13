import { ConfidenceBadge } from "./ConfidenceBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RegulationCitationProps {
  citation: {
    regulation_number: string;
    section: string;
    content: string;
    confidence?: {
      overall: number;
      reasoning: string;
      factors?: any;
    };
    relevanceToQuery?: string;
  };
}

export const RegulationCitation = ({ citation }: RegulationCitationProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-elec-yellow/30 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <h4 className="font-semibold text-elec-yellow mb-1">
                {citation.regulation_number}
              </h4>
              <p className="text-sm text-gray-400">{citation.section}</p>
              {citation.relevanceToQuery && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  {citation.relevanceToQuery}
                </p>
              )}
            </div>
            {citation.confidence && (
              <ConfidenceBadge confidence={citation.confidence.overall} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-md bg-slate-900 border-elec-yellow/20">
          <div className="space-y-2">
            <div className="font-semibold text-elec-yellow">
              {citation.regulation_number}
            </div>
            <div className="text-sm text-gray-300">{citation.section}</div>
            <div className="text-xs text-gray-400 mt-2">
              {citation.content.substring(0, 200)}...
            </div>
            {citation.confidence && (
              <div className="mt-3 pt-2 border-t border-gray-700">
                <div className="text-xs">
                  <div className="font-medium mb-1">
                    Confidence: {Math.round(citation.confidence.overall * 100)}%
                  </div>
                  <div className="text-gray-400">{citation.confidence.reasoning}</div>
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

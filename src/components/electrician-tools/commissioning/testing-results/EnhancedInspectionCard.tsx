import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedInspectionCardProps {
  item: string;
  requirement: string;
  reference?: string;
  tools?: string[];
  passCriteria?: string;
  commonIssues?: string[];
  riskLevel?: 'C1' | 'C2' | 'C3' | 'Low';
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  checkboxId: string;
}

export const EnhancedInspectionCard = ({
  item,
  requirement,
  reference,
  tools,
  passCriteria,
  commonIssues,
  riskLevel,
  checked,
  onCheckedChange,
  checkboxId
}: EnhancedInspectionCardProps) => {
  const riskColors = {
    'C1': 'border-red-500/40 bg-red-500/5',
    'C2': 'border-amber-500/40 bg-amber-500/5',
    'C3': 'border-blue-500/40 bg-blue-500/5',
    'Low': 'border-elec-yellow/20 bg-elec-card'
  };

  const riskBadgeColors = {
    'C1': 'bg-red-500/20 text-red-300 border-red-500/30',
    'C2': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'C3': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Low': 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30'
  };

  return (
    <div
      className={cn(
        "rounded-lg border-2 transition-all duration-200 hover:scale-[1.01]",
        riskColors[riskLevel || 'Low'],
        checked && "opacity-60"
      )}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border/40">
        <div className="flex items-start gap-3 sm:gap-4">
          <Checkbox
            id={checkboxId}
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="mt-1 min-w-[24px] min-h-[24px] touch-manipulation"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="font-semibold text-base sm:text-lg text-foreground">{item}</h4>
              {riskLevel && (
                <Badge variant="outline" className={cn("text-xs", riskBadgeColors[riskLevel])}>
                  {riskLevel} Risk
                </Badge>
              )}
            </div>
            {reference && (
              <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                {reference}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* What to Check */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            🔍 What to Check
          </div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">{requirement}</p>
        </div>

        {/* Tools Required */}
        {tools && tools.length > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 mb-2">
              <Wrench className="h-4 w-4" />
              Equipment Needed
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <Badge key={idx} variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Pass Criteria */}
        {passCriteria && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-300 mb-2">
              <CheckCircle2 className="h-4 w-4" />
              Pass Criteria
            </div>
            <p className="text-sm text-foreground leading-relaxed">{passCriteria}</p>
          </div>
        )}

        {/* Common Issues */}
        {commonIssues && commonIssues.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 mb-2">
              <AlertTriangle className="h-4 w-4" />
              Common Issues
            </div>
            <ul className="space-y-1.5">
              {commonIssues.map((issue, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-amber-300 shrink-0">•</span>
                  <span className="leading-relaxed">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

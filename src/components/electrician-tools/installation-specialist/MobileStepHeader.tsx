import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

interface MobileStepHeaderProps {
  title: string;
  estimatedDuration?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  hazardCount: number;
}

const riskColors = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20'
};

export const MobileStepHeader = ({ 
  title, 
  estimatedDuration, 
  riskLevel,
  hazardCount 
}: MobileStepHeaderProps) => {
  const { isMobile } = useMobileEnhanced();
  const [isExpanded, setIsExpanded] = useState(false);

  // Smart title splitting for mobile
  const splitTitle = (fullTitle: string) => {
    if (!isMobile || fullTitle.length <= 40) {
      return { primary: fullTitle, subtitle: null };
    }

    // Find natural break points (commas, dashes, "and")
    const breakPoints = [
      fullTitle.indexOf(','),
      fullTitle.indexOf(' - '),
      fullTitle.indexOf(' and ')
    ].filter(idx => idx > 0);

    if (breakPoints.length > 0) {
      const breakIndex = Math.min(...breakPoints);
      return {
        primary: fullTitle.substring(0, breakIndex).trim(),
        subtitle: fullTitle.substring(breakIndex + 1).trim()
      };
    }

    // Fallback: Split at first 2-3 words
    const words = fullTitle.split(' ');
    if (words.length >= 4) {
      return {
        primary: words.slice(0, 3).join(' '),
        subtitle: words.slice(3).join(' ')
      };
    }

    return { primary: fullTitle, subtitle: null };
  };

  const { primary, subtitle } = splitTitle(title);
  const shouldTruncate = subtitle && subtitle.length > 50 && !isExpanded;

  return (
    <div className="flex-1">
      {/* Primary Title */}
      <h3 className={cn(
        "font-bold text-foreground leading-tight",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {primary}
      </h3>

      {/* Subtitle (mobile only) */}
      {subtitle && (
        <p 
          className={cn(
            "text-sm font-medium text-muted-foreground mt-1 leading-relaxed",
            shouldTruncate && "line-clamp-2"
          )}
          onClick={() => isMobile && setIsExpanded(!isExpanded)}
        >
          {subtitle}
        </p>
      )}

      {/* Mobile-Optimised Metadata Badges */}
      <div className={cn(
        "mt-3 gap-2",
        isMobile ? "grid grid-cols-2" : "flex flex-wrap"
      )}>
        {/* Duration Badge */}
        {estimatedDuration && (
          <Badge 
            variant="outline" 
            className={cn(
              "justify-center font-medium border-border/50",
              isMobile ? "h-11 text-sm" : "h-9 text-xs"
            )}
          >
            <Clock className={cn(isMobile ? "h-4 w-4 mr-1.5" : "h-3 w-3 mr-1")} />
            <span className="whitespace-nowrap">Duration: {estimatedDuration}</span>
          </Badge>
        )}

        {/* Risk Level Badge */}
        {riskLevel && (
          <Badge 
            className={cn(
              "justify-center font-semibold",
              riskColors[riskLevel],
              isMobile ? "h-11 text-sm" : "h-9 text-xs"
            )}
          >
            <span className="whitespace-nowrap">Risk: {riskLevel.toUpperCase()}</span>
          </Badge>
        )}

        {/* Hazards Badge (full width on mobile if exists) */}
        {hazardCount > 0 && (
          <Badge 
            variant="outline" 
            className={cn(
              "justify-center font-medium bg-destructive/5 border-destructive/40 text-destructive",
              isMobile ? "h-11 text-sm col-span-2" : "h-9 text-xs"
            )}
          >
            <ShieldAlert className={cn(isMobile ? "h-4 w-4 mr-1.5" : "h-3 w-3 mr-1")} />
            <span className="whitespace-nowrap">Hazards Identified: {hazardCount} risks</span>
          </Badge>
        )}
      </div>
    </div>
  );
};

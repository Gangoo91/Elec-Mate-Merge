import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { MobileGestureHandler } from '@/components/ui/mobile-gesture-handler';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

interface Risk {
  id: string;
  hazard: string;
  whoAtRisk: string;
  likelihood: number;
  severity: number;
  riskRating: number;
  controlMeasures: string[];
}

interface SwipeableRiskCardProps {
  risk: Risk;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const getRiskColor = (rating: number) => {
  if (rating <= 4) return { bg: 'bg-green-500/10', border: 'border-green-500/40', text: 'text-green-400', label: 'Low' };
  if (rating <= 9) return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400', label: 'Medium' };
  if (rating <= 15) return { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', label: 'High' };
  return { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400', label: 'Very High' };
};

export const SwipeableRiskCard: React.FC<SwipeableRiskCardProps> = ({
  risk,
  index,
  onEdit,
  onDelete
}) => {
  const { isMobile } = useMobileEnhanced();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const riskColor = getRiskColor(risk.riskRating);

  const handleSwipeLeft = () => {
    if (isMobile) {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleLongPress = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const CardContent = (
    <Card className={cn(
      "backdrop-blur-sm transition-all duration-300 border-l-4",
      riskColor.border,
      riskColor.bg,
      showDeleteConfirm && "translate-x-[-100px] opacity-70"
    )}>
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-elec-yellow">#{index + 1}</span>
              <Badge className={cn("text-xs font-semibold", riskColor.bg, riskColor.text, riskColor.border)}>
                {riskColor.label} ({risk.riskRating})
              </Badge>
            </div>
            <h4 className="font-bold text-base sm:text-lg text-foreground leading-tight">
              {risk.hazard}
            </h4>
          </div>
          
          {/* Action Buttons - Larger on mobile */}
          <div className="flex gap-2 shrink-0">
            <Button
              onClick={() => onEdit(risk.id)}
              variant="outline"
              size="icon"
              className="h-11 w-11 sm:h-9 sm:w-9 border-elec-yellow/40 hover:border-elec-yellow hover:bg-elec-yellow/10"
            >
              <Pencil className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-elec-yellow" />
            </Button>
            <Button
              onClick={() => onDelete(risk.id)}
              variant="outline"
              size="icon"
              className="h-11 w-11 sm:h-9 sm:w-9 border-red-500/40 hover:border-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-red-400" />
            </Button>
          </div>
        </div>

        {/* Who at Risk */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-elec-yellow/80 uppercase tracking-wide">Who's at Risk</p>
          <p className="text-sm text-foreground/90 font-medium">{risk.whoAtRisk}</p>
        </div>

        {/* Expandable Control Measures */}
        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-elec-yellow/80 uppercase tracking-wide hover:text-elec-yellow transition-colors"
          >
            <span>Control Measures ({risk.controlMeasures.length})</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {isExpanded && (
            <ul className="space-y-2 animate-fade-in">
              {risk.controlMeasures.map((measure, idx) => (
                <li key={idx} className="flex gap-2.5 text-sm text-foreground/90 font-medium">
                  <span className="text-elec-yellow shrink-0 font-bold">•</span>
                  <span className="leading-relaxed">{measure}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Likelihood & Severity */}
        <div className="flex gap-4 pt-2 border-t border-border/40">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Likelihood</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    level <= risk.likelihood ? "bg-elec-yellow" : "bg-elec-gray"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Severity</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    level <= risk.severity ? "bg-elec-yellow" : "bg-elec-gray"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-red-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center animate-fade-in">
          <Button
            onClick={() => {
              setShowDeleteConfirm(false);
              onDelete(risk.id);
            }}
            className="bg-white text-red-600 hover:bg-white/90 font-bold"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Confirm Delete
          </Button>
        </div>
      )}
    </Card>
  );

  if (isMobile) {
    return (
      <MobileGestureHandler
        onSwipeLeft={handleSwipeLeft}
        onLongPress={handleLongPress}
      >
        {CardContent}
      </MobileGestureHandler>
    );
  }

  return CardContent;
};

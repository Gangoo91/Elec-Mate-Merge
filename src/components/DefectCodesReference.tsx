import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, FileText, Minus, Info, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

const defectCodes = [
  {
    code: 'C1',
    label: 'Danger Present',
    description: 'Immediate action required - risk of injury',
    severity: 'high',
    color: 'red'
  },
  {
    code: 'C2',
    label: 'Potentially Dangerous',
    description: 'Urgent remedial action required',
    severity: 'medium',
    color: 'orange'
  },
  {
    code: 'C3',
    label: 'Improvement Recommended',
    description: 'Does not comply with current regs',
    severity: 'low',
    color: 'yellow'
  },
  {
    code: 'FI',
    label: 'Further Investigation',
    description: 'Further investigation required',
    severity: 'info',
    color: 'blue'
  },
  {
    code: 'N/A',
    label: 'Not Applicable',
    description: 'Not applicable to this installation',
    severity: 'neutral',
    color: 'gray'
  },
  {
    code: 'LIM',
    label: 'Limitation',
    description: 'Limitation noted during inspection',
    severity: 'limitation',
    color: 'purple'
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high': return XCircle;
    case 'medium': return AlertTriangle;
    case 'low': return CheckCircle;
    case 'info': return FileText;
    case 'neutral': return Minus;
    case 'limitation': return Info;
    default: return FileText;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case 'red': return { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-400', icon: 'text-red-500' };
    case 'orange': return { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-400', icon: 'text-orange-500' };
    case 'yellow': return { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: 'text-yellow-500' };
    case 'blue': return { bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'text-blue-500' };
    case 'gray': return { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/60', icon: 'text-white/40' };
    case 'purple': return { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'text-purple-500' };
    default: return { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/60', icon: 'text-white/40' };
  }
};

interface DefectCodesReferenceProps {
  defaultOpen?: boolean;
}

const DefectCodesReference = ({ defaultOpen = false }: DefectCodesReferenceProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn(isMobile && "-mx-4")}>
      <Collapsible open={isOpen} onOpenChange={(open) => { haptics.tap(); setIsOpen(open); }}>
        {/* Header */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className={cn(
            "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
            "bg-card/50 border-y border-border/30",
            isOpen && "bg-card/80",
            "active:bg-card/90"
          )}>
            {/* Icon Badge */}
            <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Defect Classification</h3>
              <p className="text-xs text-muted-foreground mt-0.5">BS 7671 observation codes</p>
            </div>

            {/* Chevron */}
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className={cn(
            "space-y-2 bg-card/30",
            isMobile ? "p-4" : "p-4"
          )}>
            {defectCodes.map((code) => {
              const Icon = getSeverityIcon(code.severity);
              const colors = getColorClasses(code.color);

              return (
                <div
                  key={code.code}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-colors touch-manipulation",
                    colors.bg,
                    colors.border
                  )}
                >
                  {/* Code Badge */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center",
                    colors.bg,
                    "border",
                    colors.border
                  )}>
                    <Icon className={cn("h-5 w-5", colors.icon)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("font-bold text-base", colors.text)}>
                        {code.code}
                      </span>
                      <span className="text-sm text-foreground font-medium">
                        {code.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {code.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DefectCodesReference;

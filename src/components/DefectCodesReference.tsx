import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Minus,
  Info,
  ChevronDown,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';

const defectCodes = [
  {
    code: 'C1',
    label: 'Danger Present',
    description: 'Immediate action required - risk of injury',
    severity: 'high',
    color: 'red',
  },
  {
    code: 'C2',
    label: 'Potentially Dangerous',
    description: 'Urgent remedial action required',
    severity: 'medium',
    color: 'orange',
  },
  {
    code: 'C3',
    label: 'Improvement Recommended',
    description: 'Does not comply with current regs',
    severity: 'low',
    color: 'yellow',
  },
  {
    code: 'FI',
    label: 'Further Investigation',
    description: 'Further investigation required',
    severity: 'info',
    color: 'blue',
  },
  {
    code: 'N/A',
    label: 'Not Applicable',
    description: 'Not applicable to this installation',
    severity: 'neutral',
    color: 'gray',
  },
  {
    code: 'LIM',
    label: 'Limitation',
    description: 'Limitation noted during inspection',
    severity: 'limitation',
    color: 'purple',
  },
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return XCircle;
    case 'medium':
      return AlertTriangle;
    case 'low':
      return CheckCircle;
    case 'info':
      return FileText;
    case 'neutral':
      return Minus;
    case 'limitation':
      return Info;
    default:
      return FileText;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case 'red':
      return {
        bg: 'bg-red-500/15',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: 'text-red-500',
      };
    case 'orange':
      return {
        bg: 'bg-orange-500/15',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: 'text-orange-500',
      };
    case 'yellow':
      return {
        bg: 'bg-yellow-500/15',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        icon: 'text-yellow-500',
      };
    case 'blue':
      return {
        bg: 'bg-blue-500/15',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        icon: 'text-blue-500',
      };
    case 'gray':
      return {
        bg: 'bg-white/5',
        border: 'border-white/10',
        text: 'text-white',
        icon: 'text-white',
      };
    case 'purple':
      return {
        bg: 'bg-purple-500/15',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        icon: 'text-purple-500',
      };
    default:
      return {
        bg: 'bg-white/5',
        border: 'border-white/10',
        text: 'text-white',
        icon: 'text-white',
      };
  }
};

interface DefectCodesReferenceProps {
  defaultOpen?: boolean;
}

const DefectCodesReference = ({ defaultOpen = false }: DefectCodesReferenceProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn(isMobile && '-mx-4')}>
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => {
          haptic.light();
          setIsOpen(open);
        }}
      >
        {/* Header — gradient line pattern */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className="w-full flex items-center gap-2.5 p-3 text-left touch-manipulation active:scale-[0.98] transition-all">
            <div className="flex-1 min-w-0">
              <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
              <h2 className="text-xs font-medium text-white uppercase tracking-wider">Defect Classification</h2>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-white/30 transition-transform duration-200 flex-shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className={cn('space-y-2 bg-white/[0.02]', isMobile ? 'p-4' : 'p-4')}>
            {defectCodes.map((code) => {
              const Icon = getSeverityIcon(code.severity);
              const colors = getColorClasses(code.color);

              return (
                <div
                  key={code.code}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border transition-colors touch-manipulation',
                    colors.bg,
                    colors.border
                  )}
                >
                  {/* Code */}
                  <span className={cn('flex-shrink-0 w-10 text-center text-sm font-bold', colors.text)}>
                    {code.code}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-white font-medium">{code.label}</span>
                    <p className="text-[10px] text-white/40 mt-0.5 line-clamp-1">
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

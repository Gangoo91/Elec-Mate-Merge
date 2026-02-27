import React, { useState } from 'react';
import {
  Book,
  CheckCircle,
  AlertTriangle,
  FileText,
  Settings,
  Zap,
  ChevronDown,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ukElectricalStandards, voltageDropLimits } from '@/data/standards';

const StandardsReference = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getAccentColour = (code: string) => {
    if (code.includes('7671')) return 'border-l-blue-400';
    if (code.includes('60898')) return 'border-l-yellow-400';
    if (code.includes('61008')) return 'border-l-green-400';
    if (code.includes('60439')) return 'border-l-purple-400';
    return 'border-l-white';
  };

  const getIconColour = (code: string) => {
    if (code.includes('7671')) return 'text-blue-400';
    if (code.includes('60898')) return 'text-yellow-400';
    if (code.includes('61008')) return 'text-green-400';
    if (code.includes('60439')) return 'text-purple-400';
    return 'text-white';
  };

  const getIcon = (code: string) => {
    if (code.includes('7671')) return Book;
    if (code.includes('60898')) return Zap;
    if (code.includes('61008')) return CheckCircle;
    if (code.includes('60439')) return Settings;
    return FileText;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">UK Electrical Standards Reference</h2>
        </div>
        <p className="text-sm text-white">Key Standards Used in Calculations</p>
      </div>

      {/* Standards List */}
      <div className="space-y-2">
        {ukElectricalStandards.map((standard, index) => {
          const isOpen = !!openItems[index];
          const IconComponent = getIcon(standard.code);

          return (
            <Collapsible key={index} open={isOpen} onOpenChange={() => toggleItem(index)}>
              <CollapsibleTrigger className="w-full touch-manipulation">
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-150',
                    'border-l-2',
                    getAccentColour(standard.code),
                    'hover:bg-white/[0.03]',
                    isOpen && 'bg-white/[0.03]'
                  )}
                >
                  <IconComponent className={cn('h-4 w-4 shrink-0', getIconColour(standard.code))} />
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-sm font-semibold text-white">{standard.code}</span>
                    <span className="text-sm text-white ml-2">{standard.description}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="pl-4 pr-2 py-3 space-y-4">
                  {/* Title and scope */}
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-white">{standard.title}</h4>
                    <p className="text-sm text-white leading-relaxed">{standard.scope}</p>
                    {standard.notes && (
                      <p className="text-sm text-blue-300 font-medium">{standard.notes}</p>
                    )}
                  </div>

                  {/* Use Cases */}
                  <div className="space-y-1.5">
                    <h5 className="text-sm font-semibold text-white">Common Use Cases</h5>
                    <ul className="space-y-1">
                      {standard.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white">
                          <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-1.5">
                    <h5 className="text-sm font-semibold text-white">Key Points</h5>
                    <ul className="space-y-1">
                      {standard.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Sections */}
                  <div className="space-y-1.5">
                    <h5 className="text-sm font-semibold text-white">Key Sections</h5>
                    <ul className="space-y-1">
                      {standard.sections.map((section, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white">
                          <span className="text-amber-400 mt-0.5 shrink-0">§</span>
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {/* Voltage Drop Limits */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-white">BS 7671 Voltage Drop Limits</h3>
        <div className="space-y-2">
          {voltageDropLimits.map((item, index) => (
            <div
              key={index}
              className="rounded-xl p-3 bg-white/[0.04] border border-white/5 border-l-2 border-l-amber-400/60"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-white">{item.circuit}</span>
                <span className="text-xl font-bold text-amber-400">{item.limit}</span>
              </div>
              <div className="space-y-0.5 text-sm text-white">
                <p>
                  <span className="font-medium">Reference:</span> {item.reference}
                </p>
                <p>
                  <span className="font-medium">Application:</span> {item.application}
                </p>
                <p>
                  <span className="font-medium">Calculation:</span> {item.calculation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 pt-1">
        <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
        <p className="text-sm text-white">
          <strong>Important:</strong> These calculators are based on current UK electrical standards
          but should not replace professional electrical design. Always consult qualified personnel
          for critical installations and verify against the latest editions of relevant standards.
        </p>
      </div>
    </div>
  );
};

export default StandardsReference;

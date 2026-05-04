import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ukElectricalStandards, voltageDropLimits } from '@/data/standards';

const StandardsReference = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          UK electrical standards reference
        </span>
        <p className="text-[13px] text-white/85 leading-relaxed">
          Key standards used in calculations
        </p>
      </div>

      {/* Standards List */}
      <div className="space-y-2">
        {ukElectricalStandards.map((standard, index) => {
          const isOpen = !!openItems[index];

          return (
            <Collapsible key={index} open={isOpen} onOpenChange={() => toggleItem(index)}>
              <CollapsibleTrigger className="w-full touch-manipulation min-h-[44px]">
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg border transition-colors duration-150',
                    'border-white/[0.06] bg-white/[0.02]',
                    'hover:bg-white/[0.04]'
                  )}
                >
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-[14px] font-mono text-white">{standard.code}</span>
                    <span className="text-[13px] text-white/85 ml-2">{standard.description}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white/55 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="pl-4 pr-2 py-3 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[14px] font-medium text-white">{standard.title}</h4>
                    <p className="text-[13px] text-white/85 leading-relaxed">{standard.scope}</p>
                    {standard.notes && (
                      <p className="text-[12px] text-white/55 leading-relaxed">{standard.notes}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Common use cases
                    </span>
                    <ul className="space-y-1">
                      {standard.useCases.map((useCase, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Key points
                    </span>
                    <ul className="space-y-1">
                      {standard.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Key sections
                    </span>
                    <ul className="space-y-1">
                      {standard.sections.map((section, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
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
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          BS 7671 voltage drop limits
        </span>
        <div className="space-y-2">
          {voltageDropLimits.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
            >
              <div className="flex justify-between items-baseline">
                <span className="text-[14px] text-white font-medium">{item.circuit}</span>
                <span className="text-xl font-mono text-elec-yellow">{item.limit}</span>
              </div>
              <div className="space-y-0.5 text-[13px] text-white/85">
                <p>
                  <span className="text-white/55">Reference:</span> {item.reference}
                </p>
                <p>
                  <span className="text-white/55">Application:</span> {item.application}
                </p>
                <p>
                  <span className="text-white/55">Calculation:</span> {item.calculation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[12px] text-white/55 leading-relaxed">
        These calculators are based on current UK electrical standards but should not replace
        professional electrical design. Always consult qualified personnel for critical installations
        and verify against the latest editions of relevant standards.
      </p>
    </div>
  );
};

export default StandardsReference;

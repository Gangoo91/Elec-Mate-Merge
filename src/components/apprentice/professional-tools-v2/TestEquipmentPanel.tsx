import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  testInstruments,
  mftFunctions,
  testEquipmentTip,
  brandComparison,
} from '@/data/professional-tools/testEquipmentData';

const TestEquipmentPanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['basic']));

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const basicInstruments = testInstruments.filter((t) => t.tier === 'basic');
  const professionalInstruments = testInstruments.filter((t) => t.tier === 'professional');

  const sections = [
    {
      id: 'basic',
      title: 'Basic Test Equipment (Year 1-2)',
      count: `${basicInstruments.length} items`,
      instruments: basicInstruments,
    },
    {
      id: 'professional',
      title: 'Professional Test Equipment (Year 3+)',
      count: `${professionalInstruments.length} items`,
      instruments: professionalInstruments,
    },
    { id: 'mft-reference', title: 'MFT Function Reference', count: `${mftFunctions.length} tests` },
    {
      id: 'brand-comparison',
      title: 'Brand Comparison',
      count: `${brandComparison.length} brands`,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test equipment
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Your test instruments are what separate you from a DIYer. An uncalibrated tester means
          invalid certificates. Build your test kit progressively through your apprenticeship.
        </p>
      </div>

      {sections.map((section) => {
        const isOpen = openSections.has(section.id);
        return (
          <Collapsible
            key={section.id}
            open={isOpen}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all touch-manipulation active:scale-[0.99] hover:bg-white/[0.04] min-h-[44px]">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-white">{section.title}</span>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    {section.count}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-white/55" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-white/55" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-3 space-y-3">
                {section.id === 'mft-reference' ? (
                  <div className="space-y-3">
                    {mftFunctions.map((fn) => (
                      <div
                        key={fn.test}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
                      >
                        <h4 className="text-[14px] font-semibold text-white">{fn.test}</h4>
                        <p className="text-[14px] text-white/85 leading-relaxed">{fn.purpose}</p>
                        <div className="text-[13px] text-white/85 space-y-1">
                          <div>
                            <span className="font-medium">Acceptable range:</span>{' '}
                            {fn.acceptableRange}
                          </div>
                          <div>
                            <span className="font-medium">Standard:</span> {fn.standard}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.id === 'brand-comparison' ? (
                  <div className="space-y-3">
                    {brandComparison.map((brand) => (
                      <div
                        key={brand.brand}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-[14px] font-semibold text-white">{brand.brand}</h4>
                          <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                            {brand.priceRange}
                          </span>
                        </div>
                        <p className="text-[14px] text-white/85 leading-relaxed">
                          {brand.strengths}
                        </p>
                        <div className="text-[13px] text-white/85">
                          <span className="font-medium">Key models:</span> {brand.models}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  section.instruments?.map((instrument) => (
                    <div
                      key={instrument.name}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[14px] font-semibold text-white">{instrument.name}</h4>
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                          {instrument.price}
                        </span>
                      </div>
                      <p className="text-[14px] text-white/85 leading-relaxed">
                        {instrument.description}
                      </p>
                      {instrument.functions && (
                        <div className="flex flex-wrap gap-1.5">
                          {instrument.functions.map((fn) => (
                            <span
                              key={fn}
                              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                            >
                              {fn}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {instrument.brands.map((brand) => (
                          <span
                            key={brand}
                            className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                      {instrument.calibration && (
                        <div className="text-[13px] text-white/85">
                          <span className="font-medium">Calibration:</span>{' '}
                          {instrument.calibration}
                        </div>
                      )}
                      {instrument.apprenticeTip && (
                        <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                            Tip
                          </span>
                          <p className="text-[14px] text-white/85 leading-relaxed">
                            {instrument.apprenticeTip}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Testing sequence
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">{testEquipmentTip}</p>
      </div>
    </div>
  );
};

export default TestEquipmentPanel;

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SupplierCard from './SupplierCard';
import {
  suppliers,
  buyingGuides,
  suppliersTip,
  apprenticeBudgetGuide,
} from '@/data/professional-tools/suppliersData';

const SuppliersAndBudgetPanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['suppliers']));

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

  const sections = [
    {
      id: 'suppliers',
      title: 'UK Suppliers',
      count: `${suppliers.length} suppliers`,
    },
    {
      id: 'buying-guide',
      title: 'Where to buy what',
      count: `${buyingGuides.length} categories`,
    },
    {
      id: 'budget-guide',
      title: 'Apprentice budget planner',
      count: `${apprenticeBudgetGuide.length} phases`,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Suppliers & budget
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Where to buy your tools and materials at the best prices. Open trade accounts early — the
          savings add up fast over your career.
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
                {section.id === 'suppliers' &&
                  suppliers.map((supplier) => (
                    <SupplierCard key={supplier.name} supplier={supplier} />
                  ))}

                {section.id === 'buying-guide' &&
                  buyingGuides.map((guide) => (
                    <div
                      key={guide.category}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
                    >
                      <h4 className="text-[14px] font-semibold text-white">{guide.category}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.bestSuppliers.map((s) => (
                          <span
                            key={s}
                            className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-[14px] text-white/85 leading-relaxed">{guide.tip}</p>
                    </div>
                  ))}

                {section.id === 'budget-guide' &&
                  apprenticeBudgetGuide.map((phase) => (
                    <div
                      key={phase.phase}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[14px] font-semibold text-white">{phase.phase}</h4>
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                          {phase.budget}
                        </span>
                      </div>
                      <ul className="text-[14px] text-white/85 space-y-1 pl-3">
                        {phase.items.map((item) => (
                          <li key={item} className="list-disc list-outside">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                          Tip
                        </span>
                        <p className="text-[14px] text-white/85 leading-relaxed">{phase.tip}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Top tip
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">{suppliersTip}</p>
      </div>
    </div>
  );
};

export default SuppliersAndBudgetPanel;

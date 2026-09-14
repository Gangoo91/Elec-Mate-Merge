import SupplierCard from './SupplierCard';
import {
  suppliers,
  buyingGuides,
  suppliersTip,
  apprenticeBudgetGuide,
} from '@/data/professional-tools/suppliersData';

const SuppliersAndBudgetPanel = () => {
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
      {/* Flat, not collapsed — see FixingsHardwarePanel for the reasoning.
          Reference content that has to be opened gets replaced by a search. */}
      {sections.map((section) => (
        <section key={section.id} className="space-y-3 pt-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">{section.title}</h3>
            <span className="text-[12px] text-white">{section.count}</span>
          </div>
          <div className="space-y-3">
            {section.id === 'suppliers' &&
              suppliers.map((supplier) => <SupplierCard key={supplier.name} supplier={supplier} />)}

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
                        className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] text-white leading-relaxed">{guide.tip}</p>
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
                    <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                      {phase.budget}
                    </span>
                  </div>
                  <ul className="text-[14px] text-white space-y-1 pl-3">
                    {phase.items.map((item) => (
                      <li key={item} className="list-disc list-outside">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg border border-elec-yellow/20 bg-white/[0.05] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Tip
                    </span>
                    <p className="text-[14px] text-white leading-relaxed">{phase.tip}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}

      <div className="rounded-xl border border-elec-yellow/20 bg-white/[0.05] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Top tip
        </span>
        <p className="text-[14px] text-white leading-relaxed">{suppliersTip}</p>
      </div>
    </div>
  );
};

export default SuppliersAndBudgetPanel;

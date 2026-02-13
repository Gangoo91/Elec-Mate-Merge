import { useState } from "react";
import { ChevronDown, ChevronRight, Lightbulb } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SupplierCard from "./SupplierCard";
import {
  suppliers,
  buyingGuides,
  suppliersTip,
  apprenticeBudgetGuide,
} from "@/data/professional-tools/suppliersData";

const SuppliersAndBudgetPanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["suppliers"])
  );

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
      id: "suppliers",
      title: "UK Suppliers",
      count: `${suppliers.length} suppliers`,
    },
    {
      id: "buying-guide",
      title: "Where to Buy What",
      count: `${buyingGuides.length} categories`,
    },
    {
      id: "budget-guide",
      title: "Apprentice Budget Planner",
      count: `${apprenticeBudgetGuide.length} phases`,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <p className="text-sm text-white">
          <span className="font-semibold text-purple-300">
            Suppliers & Budget
          </span>{" "}
          — Where to buy your tools and materials at the best prices. Open trade
          accounts early — the savings add up fast over your career.
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
              <button
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all touch-manipulation active:scale-[0.99] ${
                  isOpen
                    ? "bg-purple-500/10 border border-purple-500/20"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {section.title}
                  </span>
                  <span className="text-xs text-white px-2 py-0.5 rounded-full bg-white/10">
                    {section.count}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-white" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-white" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-3 space-y-3">
                {section.id === "suppliers" &&
                  suppliers.map((supplier) => (
                    <SupplierCard key={supplier.name} supplier={supplier} />
                  ))}

                {section.id === "buying-guide" &&
                  buyingGuides.map((guide) => (
                    <div
                      key={guide.category}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
                    >
                      <h4 className="text-sm font-semibold text-white">
                        {guide.category}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {guide.bestSuppliers.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-white leading-relaxed">
                        {guide.tip}
                      </p>
                    </div>
                  ))}

                {section.id === "budget-guide" &&
                  apprenticeBudgetGuide.map((phase) => (
                    <div
                      key={phase.phase}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {phase.phase}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                          {phase.budget}
                        </span>
                      </div>
                      <ul className="text-xs text-white space-y-1 pl-3">
                        {phase.items.map((item) => (
                          <li key={item} className="list-disc list-outside">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                        <p className="text-xs text-white">
                          <span className="font-semibold text-amber-300">
                            Tip:{" "}
                          </span>
                          {phase.tip}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-2">
        <Lightbulb className="h-4 w-4 text-amber-300 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white leading-relaxed">
          <span className="font-semibold text-amber-300">Top Tip: </span>
          {suppliersTip}
        </p>
      </div>
    </div>
  );
};

export default SuppliersAndBudgetPanel;

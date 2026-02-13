import { useState } from "react";
import { ChevronDown, ChevronRight, Lightbulb } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  testInstruments,
  mftFunctions,
  testEquipmentTip,
  brandComparison,
} from "@/data/professional-tools/testEquipmentData";

const TestEquipmentPanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["basic"])
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

  const basicInstruments = testInstruments.filter((t) => t.tier === "basic");
  const professionalInstruments = testInstruments.filter(
    (t) => t.tier === "professional"
  );

  const sections = [
    {
      id: "basic",
      title: "Basic Test Equipment (Year 1-2)",
      count: `${basicInstruments.length} items`,
      instruments: basicInstruments,
    },
    {
      id: "professional",
      title: "Professional Test Equipment (Year 3+)",
      count: `${professionalInstruments.length} items`,
      instruments: professionalInstruments,
    },
    { id: "mft-reference", title: "MFT Function Reference", count: `${mftFunctions.length} tests` },
    { id: "brand-comparison", title: "Brand Comparison", count: `${brandComparison.length} brands` },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
        <p className="text-sm text-white">
          <span className="font-semibold text-green-300">Test Equipment</span> —
          Your test instruments are what separate you from a DIYer. An
          uncalibrated tester means invalid certificates. Build your test kit
          progressively through your apprenticeship.
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
                    ? "bg-green-500/10 border border-green-500/20"
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
                {section.id === "mft-reference" ? (
                  <div className="space-y-3">
                    {mftFunctions.map((fn) => (
                      <div
                        key={fn.test}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
                      >
                        <h4 className="text-sm font-semibold text-white">
                          {fn.test}
                        </h4>
                        <p className="text-xs text-white leading-relaxed">
                          {fn.purpose}
                        </p>
                        <div className="text-xs text-white space-y-1">
                          <div>
                            <span className="font-medium">
                              Acceptable range:
                            </span>{" "}
                            {fn.acceptableRange}
                          </div>
                          <div>
                            <span className="font-medium">Standard:</span>{" "}
                            {fn.standard}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.id === "brand-comparison" ? (
                  <div className="space-y-3">
                    {brandComparison.map((brand) => (
                      <div
                        key={brand.brand}
                        className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            {brand.brand}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white whitespace-nowrap">
                            {brand.priceRange}
                          </span>
                        </div>
                        <p className="text-xs text-white leading-relaxed">
                          {brand.strengths}
                        </p>
                        <div className="text-xs text-white">
                          <span className="font-medium">Key models:</span>{" "}
                          {brand.models}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  section.instruments?.map((instrument) => (
                    <div
                      key={instrument.name}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {instrument.name}
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 whitespace-nowrap">
                          {instrument.price}
                        </span>
                      </div>
                      <p className="text-xs text-white leading-relaxed">
                        {instrument.description}
                      </p>
                      {instrument.functions && (
                        <div className="flex flex-wrap gap-1">
                          {instrument.functions.map((fn) => (
                            <span
                              key={fn}
                              className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white"
                            >
                              {fn}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {instrument.brands.map((brand) => (
                          <span
                            key={brand}
                            className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                      {instrument.calibration && (
                        <div className="text-xs text-white">
                          <span className="font-medium">Calibration:</span>{" "}
                          {instrument.calibration}
                        </div>
                      )}
                      {instrument.apprenticeTip && (
                        <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                          <p className="text-xs text-white">
                            <span className="font-semibold text-amber-300">
                              Tip:{" "}
                            </span>
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

      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-2">
        <Lightbulb className="h-4 w-4 text-amber-300 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white leading-relaxed">
          <span className="font-semibold text-amber-300">Testing Sequence: </span>
          {testEquipmentTip}
        </p>
      </div>
    </div>
  );
};

export default TestEquipmentPanel;

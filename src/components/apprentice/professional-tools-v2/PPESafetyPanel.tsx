import { useState } from "react";
import { ChevronDown, ChevronRight, Lightbulb } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ppeItems, ppeTip } from "@/data/professional-tools/ppeData";

const PPESafetyPanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["daily"])
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

  const dailyItems = ppeItems.filter((item) => item.group === "daily");
  const taskItems = ppeItems.filter((item) => item.group === "task-specific");

  const groups = [
    {
      id: "daily",
      title: "Daily Essentials",
      count: `${dailyItems.length} items`,
      items: dailyItems,
    },
    {
      id: "task-specific",
      title: "Task-Specific PPE",
      count: `${taskItems.length} items`,
      items: taskItems,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
        <p className="text-sm text-white">
          <span className="font-semibold text-red-300">PPE & Safety</span> —
          Your PPE is non-negotiable. Every item on this list exists because
          someone was seriously injured without it. Wear it properly, every
          single time.
        </p>
      </div>

      {groups.map((group) => {
        const isOpen = openSections.has(group.id);
        return (
          <Collapsible
            key={group.id}
            open={isOpen}
            onOpenChange={() => toggleSection(group.id)}
          >
            <CollapsibleTrigger asChild>
              <button
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all touch-manipulation active:scale-[0.99] ${
                  isOpen
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {group.title}
                  </span>
                  <span className="text-xs text-white px-2 py-0.5 rounded-full bg-white/10">
                    {group.count}
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
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white">
                        {item.name}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-white leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-xs text-white space-y-1">
                      <div>
                        <span className="font-medium">Standard:</span>{" "}
                        {item.standard}
                      </div>
                      <div>
                        <span className="font-medium">Replace:</span>{" "}
                        {item.replacementFrequency}
                      </div>
                    </div>
                    {item.apprenticeTip && (
                      <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                        <p className="text-xs text-white">
                          <span className="font-semibold text-amber-300">
                            Tip:{" "}
                          </span>
                          {item.apprenticeTip}
                        </p>
                      </div>
                    )}
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
          <span className="font-semibold text-amber-300">Remember: </span>
          {ppeTip}
        </p>
      </div>
    </div>
  );
};

export default PPESafetyPanel;

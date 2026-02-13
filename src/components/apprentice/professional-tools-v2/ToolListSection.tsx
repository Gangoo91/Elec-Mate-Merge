import { useState } from "react";
import { ChevronDown, ChevronRight, AlertTriangle, Star, ThumbsUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Tool } from "@/data/professional-tools/types";

interface ToolListSectionProps {
  id: string;
  title: string;
  tools: Tool[];
  defaultOpen?: boolean;
  accentColour?: string;
}

const priorityConfig = {
  essential: {
    label: "Essential",
    className: "bg-red-500/20 text-red-300 border border-red-500/30",
    icon: AlertTriangle,
  },
  recommended: {
    label: "Recommended",
    className: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    icon: Star,
  },
  "nice-to-have": {
    label: "Nice to Have",
    className: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    icon: ThumbsUp,
  },
};

const ToolListSection = ({
  title,
  tools,
  defaultOpen = false,
  accentColour = "cyan",
}: ToolListSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all touch-manipulation active:scale-[0.99] ${
            isOpen
              ? `bg-${accentColour}-500/10 border border-${accentColour}-500/20`
              : "bg-white/5 border border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{title}</span>
            <span className="text-xs text-white px-2 py-0.5 rounded-full bg-white/10">
              {tools.length}
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
        <div className="space-y-3 pt-3">
          {tools.map((tool) => {
            const config = priorityConfig[tool.priority];
            const PriorityIcon = config.icon;
            return (
              <div
                key={tool.name}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white">
                    {tool.name}
                  </h4>
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${config.className}`}
                  >
                    <PriorityIcon className="h-3 w-3" />
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-white leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white">
                  <span>
                    <span className="font-medium">Price:</span> {tool.price}
                  </span>
                  {tool.standard && (
                    <span>
                      <span className="font-medium">Standard:</span>{" "}
                      {tool.standard}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {tool.brands.map((brand) => (
                    <span
                      key={brand}
                      className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                {tool.apprenticeTip && (
                  <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-white">
                      <span className="font-semibold text-amber-300">
                        Tip:{" "}
                      </span>
                      {tool.apprenticeTip}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ToolListSection;

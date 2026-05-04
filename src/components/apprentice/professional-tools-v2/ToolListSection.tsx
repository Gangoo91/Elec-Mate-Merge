import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Tool } from '@/data/professional-tools/types';

interface ToolListSectionProps {
  id: string;
  title: string;
  tools: Tool[];
  defaultOpen?: boolean;
  accentColour?: string;
}

const priorityLabel = {
  essential: 'Essential',
  recommended: 'Recommended',
  'nice-to-have': 'Nice to have',
};

const ToolListSection = ({
  title,
  tools,
  defaultOpen = false,
}: ToolListSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all touch-manipulation active:scale-[0.99] hover:bg-white/[0.04] min-h-[44px]">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-white">{title}</span>
            <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
              {tools.length}
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
        <div className="space-y-3 pt-3">
          {tools.map((tool) => {
            return (
              <div
                key={tool.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[14px] font-semibold text-white">{tool.name}</h4>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                    {priorityLabel[tool.priority]}
                  </span>
                </div>
                <p className="text-[14px] text-white/85 leading-relaxed">{tool.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-white/85">
                  <span>
                    <span className="font-medium">Price:</span> {tool.price}
                  </span>
                  {tool.standard && (
                    <span>
                      <span className="font-medium">Standard:</span> {tool.standard}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tool.brands.map((brand) => (
                    <span
                      key={brand}
                      className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                {tool.apprenticeTip && (
                  <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Tip
                    </span>
                    <p className="text-[14px] text-white/85 leading-relaxed">
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

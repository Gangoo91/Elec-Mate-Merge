import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ppeItems, ppeTip } from '@/data/professional-tools/ppeData';

const PPESafetyPanel = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['daily']));

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

  const dailyItems = ppeItems.filter((item) => item.group === 'daily');
  const taskItems = ppeItems.filter((item) => item.group === 'task-specific');

  const groups = [
    {
      id: 'daily',
      title: 'Daily Essentials',
      count: `${dailyItems.length} items`,
      items: dailyItems,
    },
    {
      id: 'task-specific',
      title: 'Task-Specific PPE',
      count: `${taskItems.length} items`,
      items: taskItems,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          PPE & Safety
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Your PPE is non-negotiable. Every item on this list exists because someone was seriously
          injured without it. Wear it properly, every single time.
        </p>
      </div>

      {groups.map((group) => {
        const isOpen = openSections.has(group.id);
        return (
          <Collapsible key={group.id} open={isOpen} onOpenChange={() => toggleSection(group.id)}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all touch-manipulation active:scale-[0.99] hover:bg-white/[0.04] min-h-[44px]">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-white">{group.title}</span>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    {group.count}
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
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] font-semibold text-white">{item.name}</h4>
                      <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[14px] text-white/85 leading-relaxed">{item.description}</p>
                    <div className="text-[13px] text-white/85 space-y-1">
                      <div>
                        <span className="font-medium">Standard:</span> {item.standard}
                      </div>
                      <div>
                        <span className="font-medium">Replace:</span> {item.replacementFrequency}
                      </div>
                    </div>
                    {item.apprenticeTip && (
                      <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                          Tip
                        </span>
                        <p className="text-[14px] text-white/85 leading-relaxed">
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

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Remember
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">{ppeTip}</p>
      </div>
    </div>
  );
};

export default PPESafetyPanel;

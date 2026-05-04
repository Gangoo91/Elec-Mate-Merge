import { useState } from 'react';
import { CheckCircle, ChevronDown, Info } from 'lucide-react';
import { MobileInput } from '@/components/ui/mobile-input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { ChecklistCategory } from './data/siteAssessmentChecklist';

interface SiteAssessmentCategoryProps {
  category: ChecklistCategory;
  isChecked: (id: string) => boolean;
  getNote: (id: string) => string;
  onToggle: (id: string) => void;
  onNote: (id: string, note: string) => void;
  progress: { checked: number; total: number };
}

const SiteAssessmentCategory = ({
  category,
  isChecked,
  getNote,
  onToggle,
  onNote,
  progress,
}: SiteAssessmentCategoryProps) => {
  const [expandedInfo, setExpandedInfo] = useState<Set<string>>(new Set());
  const allDone = progress.checked === progress.total;

  const toggleInfo = (id: string) => {
    setExpandedInfo((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors touch-manipulation h-auto min-h-[44px]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-medium text-[14px] truncate">{category.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`text-[12px] px-2 py-0.5 rounded-md border ${allDone ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow' : 'border-white/10 bg-white/[0.03] text-white/85'}`}
          >
            {progress.checked}/{progress.total}
          </span>
          <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 space-y-2">
          {category.items.map((item) => {
            const checked = isChecked(item.id);
            const note = getNote(item.id);
            const showInfo = expandedInfo.has(item.id);

            return (
              <div key={item.id} className="space-y-0">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggle(item.id)}
                    className={`
                      flex-1 flex items-start gap-3 p-3 rounded-xl border transition-all
                      touch-manipulation active:scale-[0.99] min-h-[44px]
                      ${
                        checked
                          ? 'bg-white/[0.04] border-white/10'
                          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                      }
                    `}
                  >
                    <div
                      className={`
                      flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all mt-0.5
                      ${checked ? 'bg-elec-yellow' : 'border-2 border-white/30'}
                    `}
                    >
                      {checked && <CheckCircle className="h-4 w-4 text-black" />}
                    </div>
                    <span
                      className={`text-[14px] leading-relaxed text-left ${checked ? 'text-white' : 'text-white/85'}`}
                    >
                      {item.text}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleInfo(item.id)}
                    className={`
                      flex-shrink-0 p-2 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px]
                      flex items-center justify-center
                      ${showInfo ? 'bg-white/[0.04] border border-white/10' : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/10'}
                    `}
                  >
                    <Info className={`h-4 w-4 ${showInfo ? 'text-white' : 'text-white/55'}`} />
                  </button>
                </div>

                {showInfo && (
                  <div className="ml-9 mr-[52px] p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] mt-1 space-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Why this matters
                    </span>
                    <p className="text-[14px] text-white/85 leading-relaxed">{item.whyItMatters}</p>
                    {item.regulation && (
                      <p className="text-[11px] text-white/55 font-mono">{item.regulation}</p>
                    )}
                  </div>
                )}

                {checked && (
                  <div className="ml-9 mr-[52px] mt-1">
                    <MobileInput
                      label=""
                      placeholder="Add a note (optional)..."
                      value={note}
                      onChange={(e) => onNote(item.id, e.target.value)}
                      className="text-sm"
                    />
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

export default SiteAssessmentCategory;

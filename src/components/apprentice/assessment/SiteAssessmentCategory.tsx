import { useState } from "react";
import { CheckCircle, ChevronDown, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobileInput } from "@/components/ui/mobile-input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ChecklistCategory } from "./data/siteAssessmentChecklist";

interface SiteAssessmentCategoryProps {
  category: ChecklistCategory;
  isChecked: (id: string) => boolean;
  getNote: (id: string) => string;
  onToggle: (id: string) => void;
  onNote: (id: string, note: string) => void;
  progress: { checked: number; total: number };
}

const colorMap: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
  green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
  yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', iconBg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', iconBg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30' },
};

const SiteAssessmentCategory = ({
  category,
  isChecked,
  getNote,
  onToggle,
  onNote,
  progress,
}: SiteAssessmentCategoryProps) => {
  const [expandedInfo, setExpandedInfo] = useState<Set<string>>(new Set());
  const config = colorMap[category.color] || colorMap.yellow;
  const allDone = progress.checked === progress.total;

  const toggleInfo = (id: string) => {
    setExpandedInfo(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors touch-manipulation h-auto min-h-[44px]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-medium text-sm truncate">{category.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={`${allDone ? 'bg-green-500/20 text-green-400 border-green-500/30' : `${config.bg} ${config.text} ${config.border}`}`}>
            {progress.checked}/{progress.total}
          </Badge>
          <ChevronDown className="h-4 w-4 text-white transition-transform [[data-state=open]>&]:rotate-180" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 space-y-2">
          {category.items.map(item => {
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
                      ${checked
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <div className={`
                      flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all mt-0.5
                      ${checked
                        ? 'bg-green-500'
                        : 'border-2 border-white/30'
                      }
                    `}>
                      {checked && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    <span className={`text-sm text-left ${checked ? 'text-green-400' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </button>
                  <button
                    onClick={() => toggleInfo(item.id)}
                    className={`
                      flex-shrink-0 p-2 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px]
                      flex items-center justify-center
                      ${showInfo ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5 border border-white/10 hover:border-white/20'}
                    `}
                  >
                    <Info className={`h-4 w-4 ${showInfo ? 'text-blue-400' : 'text-white'}`} />
                  </button>
                </div>

                {showInfo && (
                  <div className="ml-9 mr-[52px] p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 mt-1">
                    <p className="text-sm text-white">{item.whyItMatters}</p>
                    {item.regulation && (
                      <p className="text-xs text-blue-400 mt-2 font-medium">{item.regulation}</p>
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

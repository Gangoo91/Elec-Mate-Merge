import React from 'react';
import { CheckSquare, Square, Shield, Wrench, FileText, MapPin } from 'lucide-react';
import type { PreStartChecklist, PreStartChecklistItem } from '@/types/siteVisit';

interface PreStartChecklistViewProps {
  checklist: PreStartChecklist;
}

const categoryIcons: Record<string, React.ElementType> = {
  Safety: Shield,
  'Site Setup': MapPin,
  Tools: Wrench,
  Documentation: FileText,
  Compliance: Shield,
  Access: MapPin,
  'Site Conditions': MapPin,
  Materials: Wrench,
  Testing: Wrench,
};

export const PreStartChecklistView = ({ checklist }: PreStartChecklistViewProps) => {
  // Group by category
  const grouped: Record<string, PreStartChecklistItem[]> = {};
  for (const item of checklist.items) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="p-3 bg-white/[0.02] border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">Pre-Start Checklist</h3>
        <p className="text-xs text-white">{checklist.items.length} items generated</p>
      </div>

      <div className="p-3 space-y-4">
        {Object.entries(grouped).map(([category, items]) => {
          const Icon = categoryIcons[category] || CheckSquare;
          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-elec-yellow" />
                <p className="text-xs font-semibold text-white uppercase tracking-wide">
                  {category}
                </p>
              </div>
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5 ml-5">
                  <div className="mt-0.5 flex-shrink-0">
                    {item.checked ? (
                      <CheckSquare className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Square className="h-4 w-4 text-white/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white">{item.description}</p>
                    {item.required && (
                      <span className="text-[10px] text-red-400 font-medium">Required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * SafetyChecklist — editorial pre-work safety checks.
 *
 * Drops orange flood + green-on-completion banner for editorial gradient
 * surface, hairline dividers, elec-yellow checkmark, emerald accent on
 * completion. No icons inline.
 */

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const SafetyChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const safetyItems = [
    { id: 'isolated', label: 'Supply isolated at consumer unit' },
    { id: 'tested', label: 'Voltage tested + confirmed dead' },
    { id: 'ppe', label: 'Appropriate PPE available + worn' },
    { id: 'cable', label: 'Correct cable size calculated' },
    { id: 'protection', label: 'Protection device rating verified' },
    { id: 'rcd', label: 'RCD protection confirmed if required' },
  ];

  const allChecked = safetyItems.every((item) => checkedItems[item.id]);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <Eyebrow>PRE-WORK SAFETY</Eyebrow>
        <span
          className={cn(
            'text-[10.5px] uppercase tracking-[0.14em] font-semibold tabular-nums',
            allChecked ? 'text-emerald-300' : 'text-white/65'
          )}
        >
          {checkedCount} / {safetyItems.length} done
        </span>
      </div>

      <ul className="mt-4 divide-y divide-white/[0.06]">
        {safetyItems.map((item) => {
          const active = checkedItems[item.id] || false;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center gap-3 py-3 text-left touch-manipulation hover:bg-white/[0.02] transition-colors -mx-1 px-1 rounded-md"
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors',
                    active
                      ? 'bg-elec-yellow border-elec-yellow text-black'
                      : 'border-white/30'
                  )}
                >
                  {active && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>
                <span
                  className={cn(
                    'text-[13px] leading-relaxed',
                    active ? 'text-white' : 'text-white/85'
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {allChecked && (
        <div className="mt-4 pt-4 border-t border-emerald-500/30 animate-fade-in">
          <p className="text-[12.5px] uppercase tracking-[0.14em] font-semibold text-emerald-300 inline-flex items-center gap-1.5">
            <Check className="h-3 w-3" strokeWidth={3} />
            Safe to proceed
          </p>
        </div>
      )}
    </div>
  );
};

export default SafetyChecklist;

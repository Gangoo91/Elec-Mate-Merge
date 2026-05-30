/**
 * ReadinessGate — declarative pre-issue / pre-export compliance checklist.
 *
 * Shared across Site Safety modules: pass a list of {ok,label} predicates and it
 * renders the monochrome readiness list (filled-yellow dot = met, hollow = pending).
 * Gate the primary action with `allReady(items)`.
 */

import { cn } from '@/lib/utils';
import { FormCard } from '@/components/college/primitives';

export interface ReadinessItem {
  ok: boolean;
  label: string;
}

export function ReadinessGate({ items, title = 'Ready to issue?' }: { items: ReadinessItem[]; title?: string }) {
  return (
    <FormCard eyebrow={title}>
      <div className="space-y-2">
        {items.map((r, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {r.ok ? (
              <span className="h-2 w-2 rounded-full bg-elec-yellow shrink-0" />
            ) : (
              <span className="h-2 w-2 rounded-full border border-white/25 shrink-0" />
            )}
            <span className={cn('text-[12.5px]', r.ok ? 'text-white/90' : 'text-white/50')}>{r.label}</span>
          </div>
        ))}
      </div>
    </FormCard>
  );
}

export default ReadinessGate;

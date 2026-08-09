import { useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { SafetyListCard } from './SafetyList';
import { safetyInputCn } from './SafetyDocField';

/**
 * A curated list of short lines — precautions, PPE, anything the user should be
 * able to shape for the job in front of them.
 *
 * The permit wizard used to print its precautions and PPE as read-only text.
 * That looks finished but isn't: a permit's precautions are the thing the
 * receiver signs up to, and the issuer is the one who decides which apply to
 * this job. Printing a fixed list means a precaution that doesn't apply stays
 * on the document, and a site-specific one can never be added — so the parts
 * of the permit that matter most were the only parts nobody could touch.
 *
 * Removal is deliberately a full 44px control rather than a small glyph: it is
 * used one-handed, on site, often wearing gloves.
 */
export function EditableList({
  items,
  onChange,
  addLabel = 'Add another',
  placeholder = 'Add an item…',
  emptyLabel,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  addLabel?: string;
  placeholder?: string;
  emptyLabel?: string;
}) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft('');
  };

  const removeAt = (index: number) => onChange(items.filter((_, i) => i !== index));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    }
  };

  return (
    <div className="space-y-2">
      {items.length > 0 ? (
        <SafetyListCard>
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-start gap-2 pl-5 pr-1">
              <span className="flex-1 py-3 text-[12.5px] leading-relaxed text-white">{item}</span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`Remove "${item}"`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent] hover:bg-white/[0.06] active:bg-white/[0.1]"
              >
                <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </SafetyListCard>
      ) : (
        emptyLabel && <p className="text-[11.5px] text-white">{emptyLabel}</p>
      )}

      <div className="flex items-end gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          className={cn(safetyInputCn, 'flex-1')}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={commit}
          disabled={!draft.trim()}
          className={cn(
            'h-11 shrink-0 rounded-full px-4 text-[13px] transition-colors touch-manipulation active:scale-[0.98]',
            draft.trim()
              ? 'bg-elec-yellow font-semibold text-black'
              : 'border border-white/[0.12] bg-white/[0.06] font-medium text-white opacity-50'
          )}
        >
          {addLabel}
        </button>
      </div>
    </div>
  );
}

export default EditableList;

import { useState, useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPVisualInspection({ formData, onUpdate }: Props) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoTargetId, setPhotoTargetId] = useState<string | null>(null);

  const items = formData.visualInspection || [];
  const categories = useMemo(() => {
    const cats: string[] = [];
    items.forEach((i: any) => { if (!cats.includes(i.category)) cats.push(i.category); });
    return cats;
  }, [items]);

  const updateItem = (id: string, field: string, value: any) => {
    onUpdate('visualInspection', items.map((i: any) => i.id === id ? { ...i, [field]: value } : i));
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files || !photoTargetId) return; e.target.value = '';
    const reader = new FileReader();
    reader.onload = () => { updateItem(photoTargetId, 'photo', reader.result as string); setPhotoTargetId(null); };
    reader.readAsDataURL(files[0]);
  };

  const completedCount = items.filter((i: any) => i.result).length;

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoCapture} />

      {/* Progress */}
      <div className="flex items-center justify-between gap-3 px-1 lg:col-span-2">
        <span className="text-[13px] font-medium text-white">{completedCount}/{items.length} items inspected</span>
        <div className="h-2 w-32 bg-white/[0.12] rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300 rounded-full" style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }} />
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeader title={cat} />
          <div>
            {items.filter((i: any) => i.category === cat).map((item: any, idx: number) => (
              <div key={item.id} className={cn(idx > 0 && 'border-t border-white/[0.08] mt-4 pt-4')}>
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className="flex-1 min-h-11 py-1 text-left touch-manipulation"
                  >
                    <span className={cn('text-sm leading-snug', item.result === 'fail' ? 'text-red-400 font-semibold' : 'text-white')}>{item.description}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPhotoTargetId(item.id); photoInputRef.current?.click(); }}
                    className={cn(
                      'h-11 shrink-0 px-2 text-[13px] font-medium touch-manipulation active:scale-[0.97]',
                      item.photo ? 'text-elec-yellow' : 'text-white/85'
                    )}
                  >
                    {item.photo ? 'Photo added' : 'Photo'}
                  </button>
                </div>

                {/* Pass / Fail / N/A chips */}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(['pass', 'fail', 'na'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => updateItem(item.id, 'result', r)}
                      className={cn(
                        'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
                        item.result === r
                          ? r === 'pass' ? 'bg-green-500 border border-green-500 text-black font-semibold'
                          : r === 'fail' ? 'bg-red-500 border border-red-500 text-white font-semibold'
                          : 'bg-white/20 border border-white/20 text-white font-semibold'
                          : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
                      )}
                    >
                      {r === 'pass' ? 'Pass' : r === 'fail' ? 'Fail' : 'N/A'}
                    </button>
                  ))}
                </div>

                {/* Expanded: note + photo preview */}
                {expandedItem === item.id && (
                  <div className="mt-3 space-y-3">
                    <Input value={item.note} onChange={(e) => updateItem(item.id, 'note', e.target.value)}
                      className={inputCn}
                      placeholder="Add note..." />
                    {item.photo && (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                        <img src={item.photo} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => updateItem(item.id, 'photo', '')}
                          className="absolute top-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white touch-manipulation"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

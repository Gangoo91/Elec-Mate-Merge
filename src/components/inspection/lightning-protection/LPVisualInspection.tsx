import { useState, useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Camera, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const resultColors = {
    pass: 'bg-green-500 text-white',
    fail: 'bg-red-500 text-white',
    na: 'bg-white/20 text-white',
  };

  return (
    <div className="space-y-4">
      <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoCapture} />

      {/* Progress */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-white">{completedCount}/{items.length} items inspected</span>
        <div className="h-2 w-32 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300 rounded-full" style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }} />
        </div>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="eicr-section-card">
          <div className="p-3 border-b border-white/[0.06]">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{cat}</h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {items.filter((i: any) => i.category === cat).map((item: any) => (
              <div key={item.id} className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {/* Result buttons */}
                  <div className="flex gap-1 flex-shrink-0">
                    {(['pass', 'fail', 'na'] as const).map((r) => (
                      <button key={r} type="button" onClick={() => updateItem(item.id, 'result', r)}
                        className={cn('w-8 h-8 rounded-lg flex items-center justify-center touch-manipulation active:scale-[0.95] transition-all',
                          item.result === r ? resultColors[r] : 'bg-white/[0.04] border border-white/[0.08]')}>
                        {r === 'pass' ? <CheckCircle2 className="h-4 w-4" /> : r === 'fail' ? <XCircle className="h-4 w-4" /> : <MinusCircle className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>

                  {/* Description */}
                  <button type="button" onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className="flex-1 text-left touch-manipulation">
                    <span className={cn('text-sm', item.result === 'fail' ? 'text-red-400 font-semibold' : 'text-white')}>{item.description}</span>
                  </button>

                  {/* Photo indicator */}
                  <button type="button" onClick={() => { setPhotoTargetId(item.id); photoInputRef.current?.click(); }}
                    className={cn('w-8 h-8 rounded-lg flex items-center justify-center touch-manipulation flex-shrink-0',
                      item.photo ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-white/[0.04] border border-white/[0.08]')}>
                    <Camera className={cn('h-3.5 w-3.5', item.photo ? 'text-cyan-400' : 'text-white')} />
                  </button>
                </div>

                {/* Expanded: note + photo preview */}
                {expandedItem === item.id && (
                  <div className="mt-2 ml-[108px] space-y-2">
                    <Input value={item.note} onChange={(e) => updateItem(item.id, 'note', e.target.value)}
                      className="h-9 text-sm bg-white/[0.04] border-white/[0.08] text-white focus:border-yellow-500"
                      placeholder="Add note..." />
                    {item.photo && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <img src={item.photo} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => updateItem(item.id, 'photo', '')}
                          className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                          <XCircle className="h-3 w-3 text-white" />
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

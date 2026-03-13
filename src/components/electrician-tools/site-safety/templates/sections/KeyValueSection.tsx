import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { KeyValueSection as KeyValueSectionType, KeyValuePair } from '@/types/safety-template';

interface Props {
  section: KeyValueSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: KeyValueSectionType) => void;
}

export function KeyValueSection({ section, mode, onChange }: Props) {
  const updatePair = (index: number, patch: Partial<KeyValuePair>) => {
    const pairs = [...section.pairs];
    pairs[index] = { ...pairs[index], ...patch };
    onChange?.({ ...section, pairs });
  };

  const removePair = (index: number) => {
    const pairs = section.pairs.filter((_, i) => i !== index);
    onChange?.({ ...section, pairs });
  };

  const addPair = () => {
    onChange?.({
      ...section,
      pairs: [...section.pairs, { label: '', value: '' }],
    });
  };

  if (mode === 'preview') {
    return (
      <div className="grid grid-cols-1 gap-1.5">
        {section.pairs.map((kv, i) => (
          <div key={i} className="flex items-baseline gap-2 px-3 py-2 rounded-lg bg-white/[0.02]">
            <span className="text-[12px] font-semibold text-white flex-shrink-0">{kv.label}:</span>
            <span className="text-[12px] text-white">{kv.value || '___'}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {section.pairs.map((kv, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={kv.label}
            onChange={(e) => updatePair(i, { label: e.target.value })}
            placeholder="Label"
            className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white w-32 flex-shrink-0"
          />
          <Input
            value={kv.value}
            onChange={(e) => updatePair(i, { value: e.target.value })}
            placeholder="Value"
            className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white flex-1"
          />
          <button
            onClick={() => removePair(i)}
            className="h-11 w-11 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation flex-shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={addPair}
        className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
      >
        <Plus className="h-4 w-4" /> Add Field
      </button>
    </div>
  );
}

export default KeyValueSection;

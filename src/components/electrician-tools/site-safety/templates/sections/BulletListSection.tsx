import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { BulletListSection as BulletListSectionType } from '@/types/safety-template';

interface Props {
  section: BulletListSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: BulletListSectionType) => void;
}

export function BulletListSection({ section, mode, onChange }: Props) {
  const updateItem = (index: number, value: string) => {
    const items = [...section.items];
    items[index] = value;
    onChange?.({ ...section, items });
  };

  const removeItem = (index: number) => {
    const items = section.items.filter((_, i) => i !== index);
    onChange?.({ ...section, items });
  };

  const addItem = () => {
    onChange?.({ ...section, items: [...section.items, ''] });
  };

  if (mode === 'preview') {
    return (
      <ul className="space-y-1 pl-1">
        {section.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] text-white">
            <span className="text-elec-yellow mt-1 flex-shrink-0">&#8226;</span>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-1.5">
      {section.items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-elec-yellow mt-3 flex-shrink-0">&#8226;</span>
          <Input
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder="List item"
            className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white flex-1"
          />
          <button
            onClick={() => removeItem(i)}
            className="h-11 w-11 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation flex-shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
      >
        <Plus className="h-4 w-4" /> Add Item
      </button>
    </div>
  );
}

export default BulletListSection;

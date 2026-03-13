import { Plus, Trash2, Shield, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { PPEGridSection as PPEGridSectionType, PPEItem } from '@/types/safety-template';

interface Props {
  section: PPEGridSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: PPEGridSectionType) => void;
}

export function PPEGridSection({ section, mode, onChange }: Props) {
  const updateItem = (index: number, patch: Partial<PPEItem>) => {
    const items = [...section.items];
    items[index] = { ...items[index], ...patch };
    onChange?.({ ...section, items });
  };

  const removeItem = (index: number) => {
    const items = section.items.filter((_, i) => i !== index);
    onChange?.({ ...section, items });
  };

  const addItem = () => {
    onChange?.({
      ...section,
      items: [...section.items, { name: '', required: true }],
    });
  };

  if (mode === 'preview') {
    return (
      <div className="grid grid-cols-2 gap-2">
        {section.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
          >
            {item.required ? (
              <ShieldCheck className="h-4 w-4 text-green-400 flex-shrink-0" />
            ) : (
              <Shield className="h-4 w-4 text-white flex-shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-white truncate">{item.name}</p>
              {item.specification && (
                <p className="text-[10px] text-white truncate">{item.specification}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {section.items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 p-2 rounded-lg border border-white/[0.06] bg-white/[0.02]"
        >
          <Checkbox
            checked={item.required}
            onCheckedChange={(checked) => updateItem(i, { required: !!checked })}
            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white h-5 w-5 touch-manipulation"
          />
          <Input
            value={item.name}
            onChange={(e) => updateItem(i, { name: e.target.value })}
            placeholder="PPE item"
            className="h-9 text-sm touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white flex-1"
          />
          <Input
            value={item.specification ?? ''}
            onChange={(e) => updateItem(i, { specification: e.target.value || undefined })}
            placeholder="Spec"
            className="h-9 text-sm touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white w-28"
          />
          <button
            onClick={() => removeItem(i)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation flex-shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
      >
        <Plus className="h-4 w-4" /> Add PPE Item
      </button>
    </div>
  );
}

export default PPEGridSection;

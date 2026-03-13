import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type {
  ChecklistSection as ChecklistSectionType,
  ChecklistItem,
} from '@/types/safety-template';

interface Props {
  section: ChecklistSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: ChecklistSectionType) => void;
}

export function ChecklistSection({ section, mode, onChange }: Props) {
  const toggleItem = (index: number) => {
    const items = [...section.items];
    items[index] = { ...items[index], checked: !items[index].checked };
    onChange?.({ ...section, items });
  };

  const updateLabel = (index: number, label: string) => {
    const items = [...section.items];
    items[index] = { ...items[index], label };
    onChange?.({ ...section, items });
  };

  const removeItem = (index: number) => {
    const items = section.items.filter((_, i) => i !== index);
    onChange?.({ ...section, items });
  };

  const addItem = () => {
    const newItem: ChecklistItem = {
      id: `chk_${Date.now()}`,
      label: '',
      checked: false,
    };
    onChange?.({ ...section, items: [...section.items, newItem] });
  };

  return (
    <div className="space-y-1.5">
      {section.items.map((item, i) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
        >
          <Checkbox
            checked={item.checked}
            onCheckedChange={() => toggleItem(i)}
            className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black h-5 w-5 touch-manipulation"
          />
          {mode === 'edit' ? (
            <>
              <Input
                value={item.label}
                onChange={(e) => updateLabel(i, e.target.value)}
                placeholder="Checklist item"
                className="h-11 text-base touch-manipulation border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white flex-1"
              />
              <button
                onClick={() => removeItem(i)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation flex-shrink-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <span
              className={`text-[13px] flex-1 ${
                item.checked ? 'line-through text-white' : 'text-white'
              }`}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
      {mode === 'edit' && (
        <button
          onClick={addItem}
          className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      )}
    </div>
  );
}

export default ChecklistSection;

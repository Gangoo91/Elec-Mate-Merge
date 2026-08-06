/**
 * FireLogSelect — responsive option picker for the fire alarm log book.
 *
 * Desktop: shadcn dropdown (house dark styling). Mobile: the existing
 * FormSelectSheet bottom drawer with haptics and custom entry. One prop
 * surface for both, so the log entry forms stay declarative.
 */
import { useIsMobile } from '@/hooks/use-mobile';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const OTHER = '__other__';

interface FireLogSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  allowCustom?: boolean;
}

export default function FireLogSelect({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  allowCustom = true,
}: FireLogSelectProps) {
  const isMobile = useIsMobile();
  const [customMode, setCustomMode] = useState(false);

  if (isMobile) {
    return (
      <FormSelectSheet
        value={value}
        onValueChange={onChange}
        options={options.map((o) => ({ value: o, label: o }))}
        placeholder={placeholder}
        allowCustom={allowCustom}
        className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation"
      />
    );
  }

  const isListed = !value || options.includes(value);

  if (customMode || (!isListed && allowCustom)) {
    return (
      <div className="flex gap-2">
        <Input
          autoFocus={customMode}
          className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none [color-scheme:dark] touch-manipulation"
          placeholder="Type it…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            setCustomMode(false);
            onChange('');
          }}
          className="shrink-0 h-12 px-3 rounded-lg text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/[0.08] touch-manipulation"
        >
          List
        </button>
      </div>
    );
  }

  return (
    <Select
      value={value || undefined}
      onValueChange={(v) => {
        if (v === OTHER) {
          onChange('');
          setCustomMode(true);
        } else {
          onChange(v);
        }
      }}
    >
      <SelectTrigger className="h-12 touch-manipulation bg-white/[0.08] border-white/[0.16] text-white focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_16%)] border-white/[0.12] text-white shadow-xl shadow-black/50">
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
        {allowCustom && <SelectItem value={OTHER}>Other — type it…</SelectItem>}
      </SelectContent>
    </Select>
  );
}

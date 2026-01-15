import { cn } from '@/lib/utils';

interface FilterPillProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, count, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-full border-2 font-medium transition-all min-w-[80px] touch-manipulation whitespace-nowrap',
        active
          ? 'bg-elec-yellow border-elec-yellow text-black'
          : 'bg-card border-border/30 text-muted-foreground hover:border-border/50'
      )}
    >
      {label} {count > 0 && `(${count})`}
    </button>
  );
}

import { useState } from 'react';
import { Search, Sparkles, ArrowRight, Clock } from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';

/* ==========================================================================
   EmployerCommandPalette — ⌘K command bar for the Employer Hub. Jump to any
   section, run a quick action, or ask Mate, from one keyboard-first surface.
   Premium + restrained — built on the shared cmdk dialog, no floating chrome.
   ========================================================================== */

export interface CommandSection {
  key: string;
  eyebrow: string;
  title: string;
}

export const QUICK_ACTIONS: { label: string; section: string }[] = [
  { label: 'New job', section: 'jobs' },
  { label: 'New quote', section: 'quotes' },
  { label: 'New invoice', section: 'quotes' },
  { label: 'Add a worker', section: 'team' },
  { label: 'Post a vacancy', section: 'vacancies' },
  { label: 'Log an expense', section: 'expenses' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: CommandSection[];
  recents?: CommandSection[];
  onNavigate: (key: string) => void;
  onAskMate: (query: string) => void;
}

export function EmployerCommandPalette({
  open,
  onOpenChange,
  sections,
  recents = [],
  onNavigate,
  onAskMate,
}: Props) {
  const [search, setSearch] = useState('');
  const close = (o: boolean) => {
    if (!o) setSearch('');
    onOpenChange(o);
  };
  const go = (key: string) => {
    onNavigate(key);
    close(false);
  };
  const query = search.trim();

  return (
    <CommandDialog open={open} onOpenChange={close}>
      <CommandInput placeholder="Jump to, or ask Mate…" value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>

        {recents.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recents.map((s) => (
                <CommandItem
                  key={`recent-${s.key}`}
                  value={`recent ${s.title} ${s.eyebrow}`}
                  onSelect={() => go(s.key)}
                >
                  <Clock className="mr-2 h-4 w-4 text-white" />
                  {s.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Ask">
          <CommandItem
            value={`ask mate ai assistant help question ${query}`}
            onSelect={() => {
              onAskMate(query);
              close(false);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4 text-elec-yellow" />
            {query ? `Ask Mate: “${query}”` : 'Ask Mate'}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick actions">
          {QUICK_ACTIONS.map((a) => (
            <CommandItem key={a.label} value={`action ${a.label}`} onSelect={() => go(a.section)}>
              <ArrowRight className="mr-2 h-4 w-4 text-white" />
              {a.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Go to">
          {sections.map((s) => (
            <CommandItem
              key={s.key}
              value={`${s.title} ${s.eyebrow} ${s.key}`}
              onSelect={() => go(s.key)}
            >
              <span className="mr-2 w-16 shrink-0 text-[12px] text-white">{s.eyebrow}</span>
              <span className="truncate">{s.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

/** Slim, premium ⌘K trigger for the header (full pill on desktop, icon on mobile). */
export function CommandTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Search or ask Mate"
      className="flex items-center justify-center gap-2 h-11 min-w-[44px] rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 sm:px-4 text-white hover:bg-white/[0.08] transition-colors touch-manipulation"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline text-[12px]">Search</span>
      <kbd className="hidden sm:inline text-[10px] font-medium bg-white/[0.06] border border-white/[0.08] rounded px-1 py-0.5 leading-none">
        ⌘K
      </kbd>
    </button>
  );
}

import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { searchablePages } from '@/config/searchablePages';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Page = (typeof searchablePages)[number];

/**
 * Landing on an empty palette that lists all 133 pages is a wall, not an
 * answer. Until something is typed we show the hubs and the business pages —
 * where people actually go — and search the full set once they type.
 */
const DEFAULT_CATEGORIES = ['Hubs', 'Business'];

const groupByCategory = (pages: Page[]) =>
  pages.reduce<Record<string, Page[]>>((acc, page) => {
    (acc[page.category] ||= []).push(page);
    return acc;
  }, {});

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const handleSelect = useCallback(
    (path: string) => {
      navigate(path);
      onOpenChange(false);
    },
    [navigate, onOpenChange]
  );

  // cmdk's own filter is switched off below so that the count in the footer and
  // the rows on screen can never disagree — one filter, one source of truth.
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return searchablePages.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  const visible = useMemo(() => {
    if (matches) return groupByCategory(matches);
    const defaults = searchablePages.filter((p) => DEFAULT_CATEGORIES.includes(p.category));
    return groupByCategory(defaults);
  }, [matches]);

  const handleOpenChange = (next: boolean) => {
    // Reset on close so reopening never shows the last search's results.
    if (!next) setQuery('');
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        // Search opens ready to type — otherwise it is tap the icon, tap the
        // field, then type, and users type into nothing (ELE-1433).
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        className={cn(
          // Phone: a bottom sheet, thumb-reachable. Desktop: a centred palette.
          // Every part of the base centring has to be undone for the sheet.
          'left-0 top-auto bottom-0 h-[85vh] w-full max-w-none translate-x-0 translate-y-0',
          'rounded-2xl rounded-b-none border-white/[0.14] bg-[#16161b]',
          'sm:left-[50%] sm:top-[12%] sm:bottom-auto sm:h-auto sm:max-w-2xl',
          'sm:translate-x-[-50%] sm:rounded-2xl',
          'gap-0 overflow-hidden p-0 shadow-2xl shadow-black/50',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
          'sm:data-[state=closed]:slide-out-to-top-[12%] sm:data-[state=open]:slide-in-from-top-[12%]'
        )}
      >
        <VisuallyHidden>
          <DialogTitle>Search pages</DialogTitle>
        </VisuallyHidden>

        <Command shouldFilter={false} className="flex h-full flex-col rounded-none bg-transparent">
          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            placeholder="Search for a page or a job to do"
            className="h-14 border-b border-white/[0.10] text-base"
          />

          <CommandList className="flex-1 overflow-y-auto p-2 sm:max-h-[58vh]">
            {matches && matches.length === 0 ? (
              <div className="px-3 py-14 text-center">
                <div className="mb-1.5 text-[15px] font-semibold text-white">
                  Nothing matches that
                </div>
                <div className="text-[13px] text-white">
                  Try a page name, or what you want to do — &ldquo;quote&rdquo;, &ldquo;EICR&rdquo;,
                  &ldquo;stock&rdquo;.
                </div>
              </div>
            ) : (
              Object.entries(visible).map(([category, pages]) => (
                <CommandGroup
                  key={category}
                  heading={category}
                  className="[&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group-heading]]:border-b-0 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-elec-yellow"
                >
                  {pages.map((page) => (
                    <CommandItem
                      key={page.path}
                      value={page.path}
                      onSelect={() => handleSelect(page.path)}
                      className="group h-12 cursor-pointer rounded-xl px-2.5 transition-colors duration-100 touch-manipulation data-[selected=true]:bg-white/[0.12]"
                    >
                      <div className="flex w-full items-center gap-3">
                        <page.icon className="h-4 w-4 flex-shrink-0 text-white/70 transition-colors group-data-[selected=true]:text-elec-yellow" />
                        <span className="flex-1 truncate text-[14.5px] text-white">
                          {page.name}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 -translate-x-1 text-white opacity-0 transition-all duration-150 group-data-[selected=true]:translate-x-0 group-data-[selected=true]:opacity-100" />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            )}
          </CommandList>

          {/* Footer: what you are looking at, and how to drive it. The key
              hints are desktop-only — there is no Esc key on a phone. */}
          <div className="flex flex-shrink-0 items-center justify-between border-t border-white/[0.10] px-4 py-2.5">
            <span className="text-[12px] font-medium text-white">
              {matches
                ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'}`
                : 'Start typing to search all pages'}
            </span>
            <span className="hidden items-center gap-3 text-[11px] text-white sm:flex">
              <span>
                <kbd className="rounded bg-white/[0.10] px-1.5 py-0.5 font-sans">↑↓</kbd> move
              </span>
              <span>
                <kbd className="rounded bg-white/[0.10] px-1.5 py-0.5 font-sans">↵</kbd> open
              </span>
              <span>
                <kbd className="rounded bg-white/[0.10] px-1.5 py-0.5 font-sans">esc</kbd> close
              </span>
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

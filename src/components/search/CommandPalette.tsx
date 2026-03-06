import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { searchablePages } from '@/config/searchablePages';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (path: string) => {
      navigate(path);
      onOpenChange(false);
    },
    [navigate, onOpenChange]
  );

  // Group pages by category
  const grouped = searchablePages.reduce<Record<string, typeof searchablePages>>((acc, page) => {
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category].push(page);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] translate-y-0 p-0 gap-0 overflow-hidden data-[state=closed]:slide-out-to-top-[12%] data-[state=open]:slide-in-from-top-[12%]">
        <VisuallyHidden>
          <DialogTitle>Search pages</DialogTitle>
        </VisuallyHidden>
        <Command className="rounded-lg">
          <CommandInput placeholder="Search pages..." className="h-12 text-base" />
          <CommandList className="max-h-[50vh]">
            <CommandEmpty className="py-6 text-center text-sm text-white">
              No pages found.
            </CommandEmpty>
            {Object.entries(grouped).map(([category, pages]) => (
              <CommandGroup key={category} heading={category}>
                {pages.map((page) => (
                  <CommandItem
                    key={page.path}
                    value={`${page.name} ${page.keywords.join(' ')}`}
                    onSelect={() => handleSelect(page.path)}
                    className="h-11 touch-manipulation cursor-pointer"
                  >
                    <page.icon className="mr-2 h-4 w-4 text-elec-yellow flex-shrink-0" />
                    <span className="text-white">{page.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

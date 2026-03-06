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
import { ChevronRight } from 'lucide-react';

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
      <DialogContent className="top-[10%] translate-y-0 p-0 gap-0 overflow-hidden border-white/[0.08] bg-background shadow-2xl shadow-black/40 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-top-[10%]">
        <VisuallyHidden>
          <DialogTitle>Search pages</DialogTitle>
        </VisuallyHidden>
        <Command className="rounded-lg">
          <CommandInput
            placeholder="Where do you want to go?"
            className="h-13 text-base border-b border-white/[0.06]"
          />

          <CommandList className="max-h-[55vh] overflow-y-auto p-1.5">
            <CommandEmpty className="py-10 text-center">
              <div className="text-white text-sm font-medium mb-1">No pages found</div>
              <div className="text-white text-xs">Try a different search term</div>
            </CommandEmpty>
            {Object.entries(grouped).map(([category, pages]) => (
              <CommandGroup
                key={category}
                heading={category}
                className="[&_[cmdk-group-heading]]:text-white [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:border-b-0 [&_[cmdk-group-heading]]:mb-0"
              >
                {pages.map((page) => (
                  <CommandItem
                    key={page.path}
                    value={`${page.name} ${page.keywords.join(' ')}`}
                    onSelect={() => handleSelect(page.path)}
                    className="group h-10 px-2.5 rounded-xl touch-manipulation cursor-pointer transition-all duration-100 data-[selected=true]:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-2.5 w-full">
                      <page.icon className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                      <span className="text-sm text-white flex-1 truncate">{page.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-white opacity-0 -translate-x-1 group-data-[selected=true]:opacity-100 group-data-[selected=true]:translate-x-0 transition-all duration-150 flex-shrink-0" />
                    </div>
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

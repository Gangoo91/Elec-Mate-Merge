import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface MobileBottomSheetProps {
  trigger: React.ReactNode;
  title: string;
  options: FilterOption[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  className?: string;
}

export function MobileBottomSheet({
  trigger,
  title,
  options,
  selected,
  onSelectionChange,
  multiSelect = true,
  searchable = false,
  className
}: MobileBottomSheetProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(selected);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected, open]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (value: string) => {
    if (multiSelect) {
      setLocalSelected(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    } else {
      setLocalSelected([value]);
      onSelectionChange([value]);
      setOpen(false);
    }
  };

  const handleApply = () => {
    onSelectionChange(localSelected);
    setOpen(false);
  };

  const handleClear = () => {
    setLocalSelected([]);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={cn("max-h-[85vh]", className)}>
        <DrawerHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          
          {searchable && (
            <div className="relative mt-3">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              )}
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(!searchQuery && "pl-9")}
              />
            </div>
          )}
        </DrawerHeader>
        
        <div className="flex-1 overflow-auto p-4 space-y-1 max-h-[50vh]">
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleToggle(option.value)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-colors touch-feedback",
                localSelected.includes(option.value)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted/50"
              )}
            >
              {multiSelect && (
                <Checkbox
                  checked={localSelected.includes(option.value)}
                  className="pointer-events-none"
                />
              )}
              {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
              <span className="flex-1 text-left font-medium">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-muted-foreground text-sm">({option.count})</span>
              )}
              {!multiSelect && localSelected.includes(option.value) && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
        
        {multiSelect && (
          <div className="border-t border-border p-4 flex gap-3 pb-safe">
            <Button variant="outline" onClick={handleClear} className="flex-1">
              Clear ({localSelected.length})
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

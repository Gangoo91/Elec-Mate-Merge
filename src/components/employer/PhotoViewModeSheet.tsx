import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
  Grid3X3, 
  List, 
  Calendar, 
  MapPin, 
  GitCompare,
  X,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list" | "timeline" | "map";

interface ViewModeOption {
  value: ViewMode | "compare";
  label: string;
  description: string;
  icon: React.ReactNode;
}

const viewModeOptions: ViewModeOption[] = [
  {
    value: "grid",
    label: "Grid View",
    description: "Photo thumbnails in a grid layout",
    icon: <Grid3X3 className="h-5 w-5" />
  },
  {
    value: "list",
    label: "List View",
    description: "Detailed list with photo info",
    icon: <List className="h-5 w-5" />
  },
  {
    value: "timeline",
    label: "Timeline View",
    description: "Photos organised by date",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    value: "map",
    label: "Map View",
    description: "See photos on a map",
    icon: <MapPin className="h-5 w-5" />
  },
  {
    value: "compare",
    label: "Compare Photos",
    description: "Before & after comparison",
    icon: <GitCompare className="h-5 w-5" />
  }
];

interface PhotoViewModeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onCompareClick: () => void;
}

export function PhotoViewModeSheet({
  isOpen,
  onClose,
  currentMode,
  onModeChange,
  onCompareClick
}: PhotoViewModeSheetProps) {
  const handleSelect = (value: ViewMode | "compare") => {
    if (value === "compare") {
      onCompareClick();
    } else {
      onModeChange(value);
    }
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">View Options</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-4 space-y-2">
          {viewModeOptions.map((option) => {
            const isActive = option.value === currentMode;
            const isCompare = option.value === "compare";
            
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl transition-all touch-feedback text-left",
                  isActive && !isCompare
                    ? "bg-elec-yellow/10 border-2 border-elec-yellow"
                    : "bg-muted/30 border-2 border-transparent hover:bg-muted/50"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center",
                  isActive && !isCompare
                    ? "bg-elec-yellow text-elec-dark"
                    : "bg-muted text-muted-foreground"
                )}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
                {isActive && !isCompare && (
                  <div className="h-6 w-6 rounded-full bg-elec-yellow flex items-center justify-center">
                    <Check className="h-4 w-4 text-elec-dark" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

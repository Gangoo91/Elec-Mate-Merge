import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Circuit {
  position: number;
  label: string;
}

interface InsertPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuits: Circuit[];
  onInsert: (position: number) => void;
}

export function InsertPositionDialog({
  open,
  onOpenChange,
  circuits,
  onInsert,
}: InsertPositionDialogProps) {
  const [selectedPosition, setSelectedPosition] = useState<string>("1");

  const handleInsert = () => {
    const position = parseInt(selectedPosition);
    onInsert(position);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Insert Circuit at Position</DialogTitle>
          <DialogDescription>
            Select where to insert the new circuit. All circuits below will shift down.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px] pr-4">
          <RadioGroup value={selectedPosition} onValueChange={setSelectedPosition}>
            <div className="space-y-2">
              {circuits.map((circuit) => (
                <div key={circuit.position} className="flex items-center space-x-3 rounded-md border border-border p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={circuit.position.toString()} id={`pos-${circuit.position}`} />
                  <Label htmlFor={`pos-${circuit.position}`} className="flex-1 cursor-pointer">
                    <span className="font-semibold">Position {circuit.position}:</span>{" "}
                    <span className="text-muted-foreground">{circuit.label || "Blank"}</span>
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3 rounded-md border border-border p-3 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={(circuits.length + 1).toString()} id="pos-end" />
                <Label htmlFor="pos-end" className="flex-1 cursor-pointer">
                  <span className="font-semibold">Position {circuits.length + 1}:</span>{" "}
                  <span className="text-muted-foreground">(End)</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsert}>
            Insert Circuit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

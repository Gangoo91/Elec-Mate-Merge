import { CircuitInput } from '@/types/installation-design';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MobileInput } from '@/components/ui/mobile-input';
import { Pencil, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface CircuitBuilderCardProps {
  circuit: CircuitInput;
  circuitNumber: number;
  onUpdate: (circuit: CircuitInput) => void;
  onDelete: () => void;
}

export const CircuitBuilderCard = ({ circuit, circuitNumber, onUpdate, onDelete }: CircuitBuilderCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const loadTypeLabels: Record<string, string> = {
    'socket': 'Socket Circuit',
    'lighting': 'Lighting',
    'cooker': 'Cooker',
    'shower': 'Shower',
    'ev-charger': 'EV Charger',
    'immersion': 'Immersion Heater',
    'heating': 'Heating',
    'motor': 'Motor',
    'other': 'Other'
  };

  const EditForm = () => (
    <div className="space-y-4">
      <MobileInput
        label="Circuit Name"
        value={circuit.name}
        onChange={(e) => onUpdate({ ...circuit, name: e.target.value })}
        placeholder="e.g., Kitchen Ring Main"
      />

      <div className="space-y-2">
        <Label className="text-sm font-medium">Load Type</Label>
        <Select
          value={circuit.loadType}
          onValueChange={(value: any) => onUpdate({ ...circuit, loadType: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="socket">Socket Circuit</SelectItem>
            <SelectItem value="lighting">Lighting</SelectItem>
            <SelectItem value="cooker">Cooker</SelectItem>
            <SelectItem value="shower">Shower</SelectItem>
            <SelectItem value="ev-charger">EV Charger</SelectItem>
            <SelectItem value="immersion">Immersion Heater</SelectItem>
            <SelectItem value="heating">Heating</SelectItem>
            <SelectItem value="motor">Motor</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MobileInput
          label="Load Power (W)"
          type="number"
          inputMode="numeric"
          value={circuit.loadPower?.toString() || ''}
          onChange={(e) => onUpdate({ ...circuit, loadPower: e.target.value ? Number(e.target.value) : undefined })}
          placeholder="AI will infer"
          hint="Optional"
        />
        <MobileInput
          label="Cable Length (m)"
          type="number"
          inputMode="numeric"
          value={circuit.cableLength?.toString() || ''}
          onChange={(e) => onUpdate({ ...circuit, cableLength: e.target.value ? Number(e.target.value) : undefined })}
          placeholder="AI will infer"
          hint="Optional"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Special Location</Label>
        <Select
          value={circuit.specialLocation || 'none'}
          onValueChange={(value: any) => onUpdate({ ...circuit, specialLocation: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="bathroom">Bathroom</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
            <SelectItem value="underground">Underground</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <MobileInput
        label="Notes (Optional)"
        value={circuit.notes || ''}
        onChange={(e) => onUpdate({ ...circuit, notes: e.target.value })}
        placeholder="Any special requirements..."
      />
    </div>
  );

  // Collapsed view
  if (!isEditing) {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">C{circuitNumber}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{circuit.name}</h4>
              <p className="text-sm text-muted-foreground">{loadTypeLabels[circuit.loadType]}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                {circuit.loadPower ? (
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {circuit.loadPower}W
                  </span>
                ) : (
                  <span className="text-primary">AI will calculate</span>
                )}
                {circuit.cableLength ? (
                  <span>{circuit.cableLength}m</span>
                ) : (
                  <span className="text-primary">AI will determine</span>
                )}
                {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                  <span className="capitalize">{circuit.specialLocation}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-10 w-10 md:h-9 md:w-9"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-10 w-10 md:h-9 md:w-9"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Edit mode - Mobile uses drawer, Desktop uses inline
  if (isMobile) {
    return (
      <>
        <Card className="p-4 border-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">C{circuitNumber}</span>
              </div>
              <h4 className="font-semibold">Editing...</h4>
            </div>
          </div>
        </Card>
        <Drawer open={isEditing} onOpenChange={setIsEditing}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">C{circuitNumber}</span>
                </div>
                Edit Circuit
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8 overflow-y-auto">
              <EditForm />
              <DrawerClose asChild>
                <Button className="w-full mt-6 h-12" onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop inline edit
  return (
    <Card className="p-4 border-primary">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">C{circuitNumber}</span>
            </div>
            <h4 className="font-semibold">Edit Circuit</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Done
          </Button>
        </div>

        <EditForm />
      </div>
    </Card>
  );
};

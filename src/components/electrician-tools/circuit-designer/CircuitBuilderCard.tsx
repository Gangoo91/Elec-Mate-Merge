import { CircuitInput } from '@/types/installation-design';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Zap } from 'lucide-react';
import { useState } from 'react';

interface CircuitBuilderCardProps {
  circuit: CircuitInput;
  circuitNumber: number;
  onUpdate: (circuit: CircuitInput) => void;
  onDelete: () => void;
}

export const CircuitBuilderCard = ({ circuit, circuitNumber, onUpdate, onDelete }: CircuitBuilderCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

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

        <div className="grid gap-3">
          <div>
            <Label>Circuit Name</Label>
            <Input
              value={circuit.name}
              onChange={(e) => onUpdate({ ...circuit, name: e.target.value })}
              placeholder="e.g., Kitchen Ring Main"
            />
          </div>

          <div>
            <Label>Load Type</Label>
            <Select
              value={circuit.loadType}
              onValueChange={(value: any) => onUpdate({ ...circuit, loadType: value })}
            >
              <SelectTrigger>
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
            <div>
              <Label>Load Power (W)</Label>
              <Input
                type="number"
                value={circuit.loadPower || ''}
                onChange={(e) => onUpdate({ ...circuit, loadPower: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="AI will infer"
              />
            </div>
            <div>
              <Label>Cable Length (m)</Label>
              <Input
                type="number"
                value={circuit.cableLength || ''}
                onChange={(e) => onUpdate({ ...circuit, cableLength: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="AI will infer"
              />
            </div>
          </div>

          <div>
            <Label>Special Location</Label>
            <Select
              value={circuit.specialLocation || 'none'}
              onValueChange={(value: any) => onUpdate({ ...circuit, specialLocation: value })}
            >
              <SelectTrigger>
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

          <div>
            <Label>Notes (Optional)</Label>
            <Input
              value={circuit.notes || ''}
              onChange={(e) => onUpdate({ ...circuit, notes: e.target.value })}
              placeholder="Any special requirements..."
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

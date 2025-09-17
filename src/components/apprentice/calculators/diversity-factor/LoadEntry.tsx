import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertTriangle, Zap } from "lucide-react";

interface LoadEntryProps {
  load: {
    id: string;
    type: string;
    connectedLoad: string;
    numberOfUnits: string;
    power: string;
    inputMode: 'kw' | 'amperage';
    powerFactor: string;
  };
  index: number;
  canRemove: boolean;
  loadTypes: Record<string, string>;
  errors: Record<string, string>;
  inputMode: 'kw' | 'amperage';
  supplyVoltage: string;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  onClearError: (field: string) => void;
}

export function LoadEntry({
  load,
  index,
  canRemove,
  loadTypes,
  errors,
  inputMode,
  supplyVoltage,
  onUpdate,
  onRemove,
  onClearError,
}: LoadEntryProps) {
  
  // Group load types by category for better organization
  const groupedLoadTypes = Object.entries(loadTypes).reduce((acc, [key, value]) => {
    let category = 'Other';
    if (key.includes('lighting')) category = 'Lighting';
    else if (key.includes('socket') || key.includes('power')) category = 'Socket Outlets & Power';
    else if (key.includes('cooker') || key.includes('water') || key.includes('heating')) category = 'Heating & Cooking';
    else if (key.includes('motor') || key.includes('equipment') || key.includes('conditioning')) category = 'Motors & Equipment';
    
    if (!acc[category]) acc[category] = [];
    acc[category].push({ value: key, label: key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), description: value });
    return acc;
  }, {} as Record<string, Array<{value: string, label: string, description: string}>>);

  const selectOptions = Object.entries(groupedLoadTypes).flatMap(([category, items]) => [
    { value: '', label: `--- ${category} ---`, disabled: true },
    ...items
  ]);

  return (
    <Card className="border-muted/40">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            Load #{index + 1}
          </Badge>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(load.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <MobileSelectWrapper
            label="Load Type"
            value={load.type}
            onValueChange={(value) => onUpdate(load.id, 'type', value)}
            options={selectOptions}
            placeholder="Select load type"
            error={errors[`${load.id}_type`]}
            hint="Choose the type of electrical load for accurate diversity calculation"
          />

          <div className="grid grid-cols-2 gap-3">
            <MobileInputWrapper
              label={inputMode === 'kw' ? "Connected Load" : "Connected Load"}
              value={load.connectedLoad}
              onChange={(value) => onUpdate(load.id, 'connectedLoad', value)}
              type="number"
              inputMode="decimal"
              unit={inputMode === 'kw' ? "kW" : "A"}
              error={errors[`${load.id}_connectedLoad`]}
              hint={inputMode === 'kw' ? "Power rating in kilowatts" : "Full load current of the circuit"}
            />

            <MobileInputWrapper
              label="Number of Units"
              value={load.numberOfUnits}
              onChange={(value) => onUpdate(load.id, 'numberOfUnits', value)}
              type="number"
              inputMode="numeric"
              error={errors[`${load.id}_numberOfUnits`]}
              hint="Quantity of identical loads"
            />
          </div>

          {inputMode === 'kw' && (
            <MobileInputWrapper
              label="Power Factor"
              value={load.powerFactor}
              onChange={(value) => onUpdate(load.id, 'powerFactor', value)}
              type="number"
              inputMode="decimal"
              error={errors[`${load.id}_powerFactor`]}
              hint="Power factor (0.1 to 1.0, typical 0.9)"
            />
          )}

          {load.power && (
            <div className="bg-primary/10 border border-primary/20 rounded p-3">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Calculated Power:</span>
                <span className="font-semibold text-primary">{load.power} kW</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
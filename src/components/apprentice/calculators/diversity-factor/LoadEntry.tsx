import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
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
  };
  index: number;
  canRemove: boolean;
  loadTypes: Record<string, string>;
  errors: Record<string, string>;
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
  onUpdate, 
  onRemove, 
  onClearError 
}: LoadEntryProps) {
  const loadTypeOptions = Object.entries(loadTypes).map(([key, description]) => ({
    value: key,
    label: description
  }));

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
            options={loadTypeOptions}
            placeholder="Select load type"
            error={errors[`${load.id}_type`]}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`connected-load-${load.id}`}>Connected Load (A)</Label>
              <Input
                id={`connected-load-${load.id}`}
                type="number"
                step="0.1"
                min="0"
                placeholder="Enter load"
                value={load.connectedLoad}
                onChange={(e) => onUpdate(load.id, 'connectedLoad', e.target.value)}
                className={`bg-card border ${errors[`${load.id}_connectedLoad`] ? 'border-destructive' : 'border-muted/40'}`}
              />
              {errors[`${load.id}_connectedLoad`] && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors[`${load.id}_connectedLoad`]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`units-${load.id}`}>Number of Units</Label>
              <Input
                id={`units-${load.id}`}
                type="number"
                min="1"
                placeholder="1"
                value={load.numberOfUnits}
                onChange={(e) => onUpdate(load.id, 'numberOfUnits', e.target.value)}
                className={`bg-card border ${errors[`${load.id}_numberOfUnits`] ? 'border-destructive' : 'border-muted/40'}`}
              />
              {errors[`${load.id}_numberOfUnits`] && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors[`${load.id}_numberOfUnits`]}
                </p>
              )}
            </div>
          </div>

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
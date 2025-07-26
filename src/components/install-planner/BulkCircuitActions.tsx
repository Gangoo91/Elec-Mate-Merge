
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Power, PowerOff, Copy, Trash2, Settings } from "lucide-react";
import { Circuit } from "./types";

interface BulkCircuitActionsProps {
  circuits: Circuit[];
  onUpdateCircuits: (circuits: Circuit[]) => void;
  installationType: string;
}

const BulkCircuitActions: React.FC<BulkCircuitActionsProps> = ({
  circuits,
  onUpdateCircuits,
  installationType
}) => {
  const [selectedAction, setSelectedAction] = useState<string>("");

  const enabledCount = circuits.filter(c => c.enabled).length;
  const disabledCount = circuits.length - enabledCount;

  const handleBulkAction = () => {
    let updatedCircuits = [...circuits];

    switch (selectedAction) {
      case "enable-all":
        updatedCircuits = circuits.map(c => ({ ...c, enabled: true }));
        break;
      case "disable-all":
        updatedCircuits = circuits.map(c => ({ ...c, enabled: false }));
        break;
      case "duplicate-enabled":
        const enabledCircuits = circuits.filter(c => c.enabled);
        const duplicates = enabledCircuits.map(c => ({
          ...c,
          id: crypto.randomUUID(),
          name: `${c.name} (Copy)`
        }));
        updatedCircuits = [...circuits, ...duplicates];
        break;
      case "remove-disabled":
        updatedCircuits = circuits.filter(c => c.enabled);
        break;
      case "standardize-installation":
        updatedCircuits = circuits.map(c => ({
          ...c,
          installationMethod: installationType === "industrial" ? "tray" : 
                             installationType === "commercial" ? "trunking" : "clipped-direct",
          cableType: installationType === "domestic" ? "t&e" : "swa"
        }));
        break;
    }

    onUpdateCircuits(updatedCircuits);
    setSelectedAction("");
  };

  if (circuits.length === 0) {
    return null;
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Bulk Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Circuit Status Summary */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Power className="h-4 w-4 text-green-400" />
            <span>{enabledCount} Active</span>
          </div>
          <div className="flex items-center gap-2">
            <PowerOff className="h-4 w-4 text-gray-400" />
            <span>{disabledCount} Disabled</span>
          </div>
          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
            {circuits.length} Total
          </Badge>
        </div>

        {/* Bulk Action Selector */}
        <div className="flex gap-2">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/30 focus:border-elec-yellow/50">
              <SelectValue placeholder="Choose bulk action..." />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20 shadow-lg">
              <SelectItem value="enable-all">Enable All Circuits</SelectItem>
              <SelectItem value="disable-all">Disable All Circuits</SelectItem>
              <SelectItem value="duplicate-enabled">Duplicate Active Circuits</SelectItem>
              {disabledCount > 0 && (
                <SelectItem value="remove-disabled">Remove Disabled Circuits</SelectItem>
              )}
              <SelectItem value="standardize-installation">Standardise Installation Methods</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleBulkAction}
            disabled={!selectedAction}
            size="sm"
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkCircuitActions;

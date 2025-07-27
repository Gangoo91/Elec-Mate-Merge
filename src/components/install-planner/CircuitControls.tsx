
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Copy, Settings, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Circuit } from "./types";

interface CircuitControlsProps {
  circuit: Circuit;
  onToggleEnabled: (enabled: boolean) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleExpanded: () => void;
  isExpanded: boolean;
  canDelete: boolean;
}

const CircuitControls: React.FC<CircuitControlsProps> = ({
  circuit,
  onToggleEnabled,
  onDuplicate,
  onDelete,
  onToggleExpanded,
  isExpanded,
  canDelete
}) => {
  return (
    <div className="w-full flex justify-center">
      {/* Control Grid - 2x2 layout */}
      <div className="grid grid-cols-2 gap-1 w-[68px]">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDuplicate}
          className="h-8 w-8 p-0 hover:bg-elec-yellow/10"
          title="Duplicate circuit"
        >
          <Copy className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpanded}
          className="h-8 w-8 p-0 hover:bg-elec-yellow/10"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <Settings className="h-3 w-3" />
        </Button>

        <div className="flex items-center justify-center">
          <Switch 
            checked={circuit.enabled}
            onCheckedChange={onToggleEnabled}
            className="scale-75"
          />
        </div>

        {canDelete ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 hover:bg-red-400/10 text-red-400"
            title="Delete circuit"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        ) : (
          <div className="h-8 w-8" />
        )}
      </div>
    </div>
  );
};

export default CircuitControls;

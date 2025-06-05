
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
    <div className="flex items-center gap-2">
      {/* Circuit Status */}
      <div className="flex items-center gap-2">
        <Switch 
          checked={circuit.enabled}
          onCheckedChange={onToggleEnabled}
          size="sm"
        />
        {!circuit.enabled && (
          <Badge variant="outline" className="border-gray-600/30 text-gray-400 text-xs">
            Disabled
          </Badge>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-1">
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

        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 hover:bg-red-400/10 text-red-400"
            title="Delete circuit"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CircuitControls;

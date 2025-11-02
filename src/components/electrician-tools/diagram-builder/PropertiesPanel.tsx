import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PropertiesPanelProps {
  selectedObject: any;
  onUpdate: (updates: any) => void;
}

export const PropertiesPanel = ({ selectedObject, onUpdate }: PropertiesPanelProps) => {
  if (!selectedObject) {
    return (
      <div className="hidden lg:block w-64 border-l border-elec-yellow/20 bg-elec-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-elec-yellow" />
          <h3 className="font-semibold text-elec-light">Properties</h3>
        </div>
        <p className="text-sm text-elec-light/60">Select an object to edit properties</p>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-64 border-l border-elec-yellow/20 bg-elec-card p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-elec-yellow" />
        <h3 className="font-semibold text-elec-light">Properties</h3>
      </div>

      <div className="space-y-4">
        {/* Position */}
        <div className="space-y-2">
          <Label className="text-elec-light text-xs">Position</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-elec-light/60 text-xs">X</Label>
              <Input
                type="number"
                value={Math.round(selectedObject.x || 0)}
                onChange={(e) => onUpdate({ x: Number(e.target.value) })}
                className="bg-elec-dark border-elec-yellow/20 text-elec-light h-8"
              />
            </div>
            <div>
              <Label className="text-elec-light/60 text-xs">Y</Label>
              <Input
                type="number"
                value={Math.round(selectedObject.y || 0)}
                onChange={(e) => onUpdate({ y: Number(e.target.value) })}
                className="bg-elec-dark border-elec-yellow/20 text-elec-light h-8"
              />
            </div>
          </div>
        </div>

        {/* Size (for rectangles) */}
        {selectedObject.type === "rectangle" && (
          <div className="space-y-2">
            <Label className="text-elec-light text-xs">Size</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-elec-light/60 text-xs">W</Label>
                <Input
                  type="number"
                  value={Math.round(selectedObject.width || 100)}
                  onChange={(e) => onUpdate({ width: Number(e.target.value) })}
                  className="bg-elec-dark border-elec-yellow/20 text-elec-light h-8"
                />
              </div>
              <div>
                <Label className="text-elec-light/60 text-xs">H</Label>
                <Input
                  type="number"
                  value={Math.round(selectedObject.height || 100)}
                  onChange={(e) => onUpdate({ height: Number(e.target.value) })}
                  className="bg-elec-dark border-elec-yellow/20 text-elec-light h-8"
                />
              </div>
            </div>
          </div>
        )}

        {/* Rotation */}
        <div className="space-y-2">
          <Label className="text-elec-light text-xs">Rotation</Label>
          <Input
            type="number"
            value={Math.round(selectedObject.rotation || 0)}
            onChange={(e) => onUpdate({ rotation: Number(e.target.value) })}
            className="bg-elec-dark border-elec-yellow/20 text-elec-light h-8"
            min="0"
            max="360"
          />
          <div className="flex gap-1">
            {[0, 45, 90, 180, 270].map((angle) => (
              <Button
                key={angle}
                variant="outline"
                size="sm"
                onClick={() => onUpdate({ rotation: angle })}
                className="flex-1 h-7 text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                {angle}°
              </Button>
            ))}
          </div>
        </div>

        {/* Text content */}
        {selectedObject.type === "text" && (
          <>
            <Separator className="bg-elec-yellow/20" />
            <div className="space-y-2">
              <Label className="text-elec-light text-xs">Text Content</Label>
              <Input
                type="text"
                value={selectedObject.text || ""}
                onChange={(e) => onUpdate({ text: e.target.value })}
                className="bg-elec-dark border-elec-yellow/20 text-elec-light"
              />
            </div>
          </>
        )}

        {/* Symbol info */}
        {selectedObject.type === "symbol" && selectedObject.symbolId && (
          <>
            <Separator className="bg-elec-yellow/20" />
            <div className="space-y-2">
              <Label className="text-elec-light text-xs">Symbol</Label>
              <p className="text-sm text-elec-light/80">{selectedObject.symbolId}</p>
            </div>
          </>
        )}

        {/* Quick actions */}
        <Separator className="bg-elec-yellow/20" />
        <div className="space-y-2">
          <Label className="text-elec-light text-xs">Quick Actions</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate({ rotation: (selectedObject.rotation || 0) + 90 })}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Rotate 90°
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Duplicate functionality would go here
              }}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Duplicate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

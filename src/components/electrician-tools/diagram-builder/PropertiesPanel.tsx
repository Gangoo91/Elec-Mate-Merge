import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface PropertiesPanelProps {
  selectedObject: any;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

export const PropertiesPanel = ({ selectedObject, onUpdate, onClose }: PropertiesPanelProps) => {
  if (!selectedObject) return null;

  return (
    <Sheet open={!!selectedObject} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="bottom"
        className="h-[50vh] p-0 rounded-t-2xl overflow-hidden bg-elec-card border-white/10"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <SheetHeader className="px-4 pb-3">
          <SheetTitle className="text-white text-lg font-semibold">Properties</SheetTitle>
        </SheetHeader>

        <div className="px-4 pb-6 overflow-y-auto flex-1 space-y-4">
          {/* Rotation */}
          <div className="space-y-2">
            <Label className="text-white text-xs">Rotation</Label>
            <Input
              type="range"
              min="0"
              max="360"
              value={selectedObject.rotation || 0}
              onChange={(e) => onUpdate({ rotation: Number(e.target.value) })}
              className="h-11 touch-manipulation accent-elec-yellow"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white">{Math.round(selectedObject.rotation || 0)}deg</span>
              <div className="flex gap-1">
                {[0, 90, 180, 270].map((angle) => (
                  <Button
                    key={angle}
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdate({ rotation: angle })}
                    className="h-8 px-2 text-xs border-white/10 text-white hover:bg-white/10 touch-manipulation"
                  >
                    {angle}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label className="text-white text-xs">Position</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-white text-xs">X</Label>
                <Input
                  type="number"
                  value={Math.round(selectedObject.x || 0)}
                  onChange={(e) => onUpdate({ x: Number(e.target.value) })}
                  className="h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation"
                />
              </div>
              <div>
                <Label className="text-white text-xs">Y</Label>
                <Input
                  type="number"
                  value={Math.round(selectedObject.y || 0)}
                  onChange={(e) => onUpdate({ y: Number(e.target.value) })}
                  className="h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation"
                />
              </div>
            </div>
          </div>

          {/* Size (for rectangles and symbols) */}
          {(selectedObject.type === 'rectangle' || selectedObject.type === 'symbol') && (
            <div className="space-y-2">
              <Label className="text-white text-xs">Size</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-white text-xs">W</Label>
                  <Input
                    type="number"
                    value={Math.round(selectedObject.width || 40)}
                    onChange={(e) => onUpdate({ width: Number(e.target.value) })}
                    className="h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation"
                  />
                </div>
                <div>
                  <Label className="text-white text-xs">H</Label>
                  <Input
                    type="number"
                    value={Math.round(selectedObject.height || 40)}
                    onChange={(e) => onUpdate({ height: Number(e.target.value) })}
                    className="h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Text content */}
          {selectedObject.type === 'text' && (
            <>
              <Separator className="bg-white/10" />
              <div className="space-y-2">
                <Label className="text-white text-xs">Text Content</Label>
                <Input
                  type="text"
                  value={selectedObject.text || ''}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                  className="h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation"
                  autoFocus
                />
              </div>
            </>
          )}

          {/* Symbol info */}
          {selectedObject.type === 'symbol' && selectedObject.symbolId && (
            <>
              <Separator className="bg-white/10" />
              <div className="space-y-1">
                <Label className="text-white text-xs">Symbol</Label>
                <p className="text-sm text-white">{selectedObject.symbolId}</p>
              </div>
            </>
          )}

          {/* Delete */}
          <Separator className="bg-white/10" />
          <Button
            variant="outline"
            onClick={() => {
              onUpdate({ _delete: true });
              onClose();
            }}
            className="w-full h-11 border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Object
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

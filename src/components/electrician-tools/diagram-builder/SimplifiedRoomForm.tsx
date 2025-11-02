import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface SimplifiedRoomFormProps {
  onGenerate: (description: string) => void;
  isGenerating: boolean;
}

export const SimplifiedRoomForm = ({ onGenerate, isGenerating }: SimplifiedRoomFormProps) => {
  const [roomType, setRoomType] = useState('Kitchen');
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(3);
  const [hasWindow, setHasWindow] = useState(true);
  const [windowPosition, setWindowPosition] = useState<'top' | 'right' | 'bottom' | 'left'>('top');
  const [hasDoor, setHasDoor] = useState(true);
  const [doorPosition, setDoorPosition] = useState<'top' | 'right' | 'bottom' | 'left'>('right');
  const [numSockets, setNumSockets] = useState(2);
  const [numLights, setNumLights] = useState(1);

  const handleSubmit = () => {
    // Convert simple form to natural language description
    const wallMap = {
      top: 'north',
      right: 'east',
      bottom: 'south',
      left: 'west'
    };

    let description = `${roomType} - ${width}m by ${height}m`;
    
    if (hasWindow) {
      description += `, window on ${wallMap[windowPosition]} wall`;
    }
    
    if (hasDoor) {
      description += `, door on ${wallMap[doorPosition]} wall`;
    }
    
    if (numSockets > 0) {
      description += `, ${numSockets}x double sockets evenly spaced on bottom wall`;
    }
    
    description += `, light switch near door`;
    
    if (numLights > 0) {
      description += `, ${numLights}x ceiling light${numLights > 1 ? 's' : ''}`;
    }

    onGenerate(description);
  };

  return (
    <div className="space-y-4 bg-background/50 p-4 rounded-lg border border-border">
      <div className="grid grid-cols-2 gap-3">
        {/* Room Type */}
        <div className="col-span-2">
          <label className="text-xs font-medium text-foreground mb-1 block">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-background border border-border text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Kitchen</option>
            <option>Bedroom</option>
            <option>Living Room</option>
            <option>Bathroom</option>
            <option>Office</option>
            <option>Hallway</option>
          </select>
        </div>

        {/* Width & Height */}
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Width (m)</label>
          <input
            type="number"
            min="2"
            max="10"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full bg-background border border-border text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Height (m)</label>
          <input
            type="number"
            min="2"
            max="10"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full bg-background border border-border text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Window */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={hasWindow}
              onChange={(e) => setHasWindow(e.target.checked)}
              className="accent-primary"
            />
            <label className="text-xs font-medium text-foreground">Window</label>
          </div>
          {hasWindow && (
            <div className="grid grid-cols-4 gap-1">
              {(['top', 'right', 'bottom', 'left'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setWindowPosition(pos)}
                  className={`px-2 py-1 rounded text-xs transition-colors capitalize ${
                    windowPosition === pos
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground hover:bg-accent'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Door */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={hasDoor}
              onChange={(e) => setHasDoor(e.target.checked)}
              className="accent-primary"
            />
            <label className="text-xs font-medium text-foreground">Door</label>
          </div>
          {hasDoor && (
            <div className="grid grid-cols-4 gap-1">
              {(['top', 'right', 'bottom', 'left'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setDoorPosition(pos)}
                  className={`px-2 py-1 rounded text-xs transition-colors capitalize ${
                    doorPosition === pos
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-foreground hover:bg-accent'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sockets & Lights Sliders */}
        <div className="col-span-2">
          <label className="text-xs font-medium text-foreground mb-1 block">
            Double Sockets: {numSockets}
          </label>
          <input
            type="range"
            min="0"
            max="6"
            value={numSockets}
            onChange={(e) => setNumSockets(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="col-span-2">
          <label className="text-xs font-medium text-foreground mb-1 block">
            Ceiling Lights: {numLights}
          </label>
          <input
            type="range"
            min="0"
            max="4"
            value={numLights}
            onChange={(e) => setNumLights(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleSubmit}
        disabled={isGenerating}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Room
          </>
        )}
      </Button>
    </div>
  );
};

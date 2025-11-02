import { MousePointer2, Minus, Square, Type, Eraser, Grid3x3, Magnet, Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DrawingTool } from "@/pages/electrician-tools/ai-tools/DiagramBuilderPage";
import { Separator } from "@/components/ui/separator";

interface DrawingToolbarProps {
  activeTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
  gridEnabled: boolean;
  snapEnabled: boolean;
  onGridToggle: () => void;
  onSnapToggle: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

export const DrawingToolbar = ({
  activeTool,
  onToolChange,
  gridEnabled,
  snapEnabled,
  onGridToggle,
  onSnapToggle,
  onUndo,
  onRedo,
}: DrawingToolbarProps) => {
  const tools: { id: DrawingTool; icon: any; label: string }[] = [
    { id: "select", icon: MousePointer2, label: "Select" },
    { id: "line", icon: Minus, label: "Line" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "text", icon: Type, label: "Text" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
  ];

  return (
    <div className="flex items-center justify-between gap-2 p-3 md:p-4">
      <div className="flex items-center gap-1 md:gap-2">
        {/* Text tool hint when active */}
        {activeTool === 'text' && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-elec-yellow/20 border border-elec-yellow/40 rounded-lg mr-2 animate-fade-in">
            <Type className="h-3.5 w-3.5 text-elec-yellow" />
            <span className="text-xs font-medium text-elec-yellow">Click canvas to add text</span>
          </div>
        )}
        
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "outline"}
              size="sm"
              onClick={() => onToolChange(tool.id)}
              className={
                activeTool === tool.id
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              }
            >
              <Icon className="h-4 w-4" />
              <span className="ml-2 hidden md:inline">{tool.label}</span>
            </Button>
          );
        })}
      </div>

      <Separator orientation="vertical" className="h-8 bg-elec-yellow/20" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8 bg-elec-yellow/20" />

      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant={gridEnabled ? "default" : "outline"}
          size="sm"
          onClick={onGridToggle}
          className={
            gridEnabled
              ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          }
        >
          <Grid3x3 className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">Grid</span>
        </Button>

        <Button
          variant={snapEnabled ? "default" : "outline"}
          size="sm"
          onClick={onSnapToggle}
          className={
            snapEnabled
              ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          }
        >
          <Magnet className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">Snap</span>
        </Button>
      </div>
    </div>
  );
};

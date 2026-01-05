import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Save, Download, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DiagramCanvas } from "@/components/electrician-tools/diagram-builder/DiagramCanvas";
import { SymbolLibrary } from "@/components/electrician-tools/diagram-builder/SymbolLibrary";
import { DrawingToolbar } from "@/components/electrician-tools/diagram-builder/DrawingToolbar";
import { ExportControls } from "@/components/electrician-tools/diagram-builder/ExportControls";
import { PropertiesPanel } from "@/components/electrician-tools/diagram-builder/PropertiesPanel";
import { AIRoomBuilderDialog } from "@/components/electrician-tools/diagram-builder/AIRoomBuilderDialog";
import { toast } from "@/hooks/use-toast";

const DEMO_ROOM = {
  room: { name: "Example Kitchen", dimensions: { width: 4, height: 3, unit: "m" } },
  walls: [
    { id: "north", length: 4, features: [{ type: "window", position: "center", width: 1.5 }] },
    { id: "east", length: 3, features: [{ type: "door", position: "right", width: 0.9 }] },
    { id: "south", length: 4, features: [] },
    { id: "west", length: 3, features: [] }
  ],
  symbols: [
    { type: "socket-double-13a-bs7671", wall: "south", position: 1, heightFromFloor: 0.3 },
    { type: "socket-double-13a-bs7671", wall: "south", position: 2.5, heightFromFloor: 0.3 },
    { type: "switch-1way-bs7671", wall: "west", position: 0.3, heightFromFloor: 1.2 },
    { type: "light-ceiling-bs7671", position: "center" }
  ]
};

export type DrawingTool = "select" | "line" | "rectangle" | "text" | "symbol" | "eraser";

export interface CanvasObject {
  id: string;
  type: "symbol" | "line" | "rectangle" | "text";
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  symbolId?: string;
  text?: string;
  points?: { x: number; y: number }[];
}

const DiagramBuilderPage = () => {
  const [activeTool, setActiveTool] = useState<DrawingTool>("select");
  const [selectedSymbolId, setSelectedSymbolId] = useState<string | null>(null);
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([]);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const undoStackRef = useState<CanvasObject[][]>([]);
  const redoStackRef = useState<CanvasObject[][]>([]);
  const canvasRef = useRef<any>(null);

  // Load demo room on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('diagram-builder-first-visit');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('diagram-builder-first-visit', 'true');
      
      // Small delay to ensure canvas is ready
      setTimeout(() => {
        if (canvasRef.current?.renderAIRoom) {
          canvasRef.current.renderAIRoom(DEMO_ROOM);
        }
      }, 500);
    }
  }, []);

  const handleSave = () => {
    const projectData = {
      objects: canvasObjects,
      settings: { gridEnabled, snapEnabled },
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("diagram-builder-project", JSON.stringify(projectData));
    toast({ 
      title: "Project saved", 
      description: "Your diagram has been saved locally",
      variant: "success" 
    });
  };

  const handleLoad = () => {
    const saved = localStorage.getItem("diagram-builder-project");
    if (saved) {
      const data = JSON.parse(saved);
      setCanvasObjects(data.objects || []);
      setGridEnabled(data.settings?.gridEnabled ?? true);
      setSnapEnabled(data.settings?.snapEnabled ?? true);
      toast({ 
        title: "Project loaded", 
        description: "Your saved diagram has been restored",
        variant: "success" 
      });
    } else {
      toast({ 
        title: "No saved project", 
        description: "No saved diagram found",
        variant: "default" 
      });
    }
  };

  const handleUndo = () => {
    if (undoStackRef[0].length === 0) return;
    const prevState = undoStackRef[0].pop();
    if (prevState) {
      redoStackRef[0].push([...canvasObjects]);
      setCanvasObjects(prevState);
    }
  };

  const handleRedo = () => {
    if (redoStackRef[0].length === 0) return;
    const nextState = redoStackRef[0].pop();
    if (nextState) {
      undoStackRef[0].push([...canvasObjects]);
      setCanvasObjects(nextState);
    }
  };

  const handleObjectUpdate = (updates: Partial<CanvasObject>) => {
    if (!selectedObject) return;
    const updatedObjects = canvasObjects.map((obj) =>
      obj.id === selectedObject.id ? { ...obj, ...updates } : obj
    );
    setCanvasObjects(updatedObjects);
    setSelectedObject({ ...selectedObject, ...updates });
  };

  const handleRoomGenerated = (roomData: any) => {
    console.log('🏠 Room data received:', roomData);
    
    // Pass room data to canvas for rendering
    if (canvasRef.current?.renderAIRoom) {
      canvasRef.current.renderAIRoom(roomData);
      toast({ 
        title: "Room generated!", 
        description: `${roomData.room.name} diagram created successfully`,
        variant: "success" 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark flex flex-col">
      {/* First Visit Banner */}
      {isFirstVisit && (
        <div className="bg-elec-yellow/20 border-b border-elec-yellow/40 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <p className="text-sm text-elec-light">
              <strong>Example room loaded!</strong> Click <strong>AI Room Builder</strong> in the header to create your own.
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsFirstVisit(false)}
            className="text-elec-yellow hover:bg-elec-yellow/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Header - Compact on mobile */}
      <div className="border-b border-white/10 bg-gradient-to-r from-elec-dark to-elec-grey">
        <div className="px-3 py-2 md:px-4 md:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/electrician-tools/ai-tooling">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 border-white/20 text-white/70 hover:text-white hover:bg-white/10 touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="p-1.5 md:p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold text-white">Diagram Builder</h1>
                <p className="text-[10px] md:text-xs text-white/60 hidden sm:block">BS 7671 compliant symbols</p>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <Button
                onClick={() => setAiDialogOpen(true)}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold gap-1.5 h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm animate-pulse"
              >
                <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden sm:inline">AI Room Builder</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleSave}
                className="h-8 w-8 md:h-9 md:w-9 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                title="Save"
              >
                <Save className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <ExportControls canvasObjects={canvasObjects} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Symbol Library - Desktop Left Panel */}
        <div className="hidden md:block w-64 border-r border-elec-yellow/20 bg-elec-card overflow-y-auto">
          <SymbolLibrary 
            onSymbolSelect={(symbolId) => {
              setSelectedSymbolId(symbolId);
              setActiveTool("symbol");
            }}
            selectedSymbolId={selectedSymbolId}
          />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DiagramCanvas
            ref={canvasRef}
            activeTool={activeTool}
            selectedSymbolId={selectedSymbolId}
            objects={canvasObjects}
            onObjectsChange={setCanvasObjects}
            gridEnabled={gridEnabled}
            snapEnabled={snapEnabled}
          />
        </div>

        {/* Properties Panel - Desktop Right Panel */}
        <PropertiesPanel 
          selectedObject={selectedObject}
          onUpdate={handleObjectUpdate}
        />
      </div>

      {/* Bottom Panel - Mobile & Desktop */}
      <div className="border-t border-elec-yellow/20 bg-elec-card">
        <DrawingToolbar
          activeTool={activeTool}
          onToolChange={setActiveTool}
          gridEnabled={gridEnabled}
          snapEnabled={snapEnabled}
          onGridToggle={() => setGridEnabled(!gridEnabled)}
          onSnapToggle={() => setSnapEnabled(!snapEnabled)}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
        
        {/* Mobile Symbol Quick Access */}
        <div className="md:hidden">
          <SymbolLibrary 
            onSymbolSelect={(symbolId) => {
              setSelectedSymbolId(symbolId);
              setActiveTool("symbol");
            }}
            selectedSymbolId={selectedSymbolId}
            isMobile
          />
        </div>
      </div>

      {/* AI Room Builder Dialog */}
      <AIRoomBuilderDialog
        open={aiDialogOpen}
        onOpenChange={setAiDialogOpen}
        onRoomGenerated={handleRoomGenerated}
      />
    </div>
  );
};

export default DiagramBuilderPage;

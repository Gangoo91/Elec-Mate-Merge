import { useState } from "react";
import { ArrowLeft, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DiagramCanvas } from "@/components/electrician-tools/diagram-builder/DiagramCanvas";
import { SymbolLibrary } from "@/components/electrician-tools/diagram-builder/SymbolLibrary";
import { DrawingToolbar } from "@/components/electrician-tools/diagram-builder/DrawingToolbar";
import { ExportControls } from "@/components/electrician-tools/diagram-builder/ExportControls";
import { PropertiesPanel } from "@/components/electrician-tools/diagram-builder/PropertiesPanel";
import { toast } from "@/hooks/use-toast";

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
  const undoStackRef = useState<CanvasObject[][]>([]);
  const redoStackRef = useState<CanvasObject[][]>([]);

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

  return (
    <div className="min-h-screen bg-elec-dark flex flex-col">
      {/* Header */}
      <div className="border-b border-elec-yellow/20 bg-elec-card">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/electrician-tools/ai-tooling">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-elec-light">Circuit Diagram Builder</h1>
                <p className="text-xs text-elec-light/60">Floor Plan Mode</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoad}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hidden md:flex"
              >
                Load
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Save className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Save</span>
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

      {/* Bottom Toolbar - Mobile */}
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
        
        {/* Mobile Symbol Library Drawer Trigger */}
        <div className="md:hidden px-4 pb-4">
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
    </div>
  );
};

export default DiagramBuilderPage;

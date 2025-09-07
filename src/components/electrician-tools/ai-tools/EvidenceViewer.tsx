import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Eye,
  EyeOff,
  Download,
  Share,
  Info
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
  eicr_code?: 'C1' | 'C2' | 'C3' | 'FI';
  description?: string;
}

interface EvidenceViewerProps {
  imageUrl: string;
  boundingBoxes?: BoundingBox[];
  findings?: Array<{
    description: string;
    eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
    confidence: number;
    bounding_box?: BoundingBox;
  }>;
  onBoundingBoxClick?: (box: BoundingBox) => void;
  showOverlays?: boolean;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  imageUrl,
  boundingBoxes = [],
  findings = [],
  onBoundingBoxClick,
  showOverlays = true
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [showBoxes, setShowBoxes] = useState(showOverlays);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const getEicrCodeColor = (code: string) => {
    switch (code) {
      case 'C1': return 'border-red-500 bg-red-500/20 text-red-400';
      case 'C2': return 'border-amber-500 bg-amber-500/20 text-amber-400';
      case 'C3': return 'border-blue-500 bg-blue-500/20 text-blue-400';
      case 'FI': return 'border-slate-500 bg-slate-500/20 text-slate-400';
      default: return 'border-primary bg-primary/20 text-primary';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setSelectedBox(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleBoundingBoxClick = (box: BoundingBox, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBox(selectedBox?.label === box.label ? null : box);
    onBoundingBoxClick?.(box);
  };

  const downloadEvidence = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `evidence-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Merge bounding boxes from findings and direct boxes
  const allBoxes = [
    ...boundingBoxes,
    ...findings
      .filter(f => f.bounding_box)
      .map(f => ({
        ...f.bounding_box!,
        eicr_code: f.eicr_code,
        description: f.description
      }))
  ];

  return (
    <TooltipProvider>
      <Card className="relative overflow-hidden bg-background border-border">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowBoxes(!showBoxes)}
            className="bg-background/80 backdrop-blur-sm"
          >
            {showBoxes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleZoomIn}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleZoomOut}
            className="bg-background/80 backdrop-blur-sm"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleReset}
            className="bg-background/80 backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={downloadEvidence}
            className="bg-background/80 backdrop-blur-sm"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {Math.round(zoom * 100)}%
          </Badge>
        </div>

        {/* Image container */}
        <CardContent className="p-0 relative h-96 overflow-hidden cursor-move">
          <div
            ref={containerRef}
            className="w-full h-full relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Evidence"
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-200"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: 'center center'
              }}
              draggable={false}
            />
            
            {/* Bounding boxes overlay */}
            {showBoxes && allBoxes.map((box, index) => (
              <Tooltip key={`${box.label}-${index}`}>
                <TooltipTrigger asChild>
                  <div
                    className={`absolute border-2 cursor-pointer transition-all hover:scale-105 ${
                      getEicrCodeColor(box.eicr_code || 'FI')
                    } ${selectedBox?.label === box.label ? 'ring-2 ring-primary' : ''}`}
                    style={{
                      left: `${box.x * 100}%`,
                      top: `${box.y * 100}%`,
                      width: `${box.width * 100}%`,
                      height: `${box.height * 100}%`,
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    }}
                    onClick={(e) => handleBoundingBoxClick(box, e)}
                  >
                    {/* EICR Code badge */}
                    <div className="absolute -top-2 -left-2">
                      <Badge 
                        className={`text-xs ${getEicrCodeColor(box.eicr_code || 'FI')}`}
                      >
                        {box.eicr_code || 'FI'}
                      </Badge>
                    </div>
                    
                    {/* Confidence indicator */}
                    <div className="absolute -bottom-2 -right-2">
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-background/80"
                      >
                        {Math.round(box.confidence * 100)}%
                      </Badge>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">{box.label}</p>
                    {box.description && (
                      <p className="text-sm text-muted-foreground">{box.description}</p>
                    )}
                    <p className="text-xs">
                      Code: {box.eicr_code || 'FI'} | Confidence: {Math.round(box.confidence * 100)}%
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </CardContent>

        {/* Selected box details */}
        {selectedBox && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <Card className="bg-background/95 backdrop-blur-sm border-border">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{selectedBox.label}</span>
                      <Badge className={`text-xs ${getEicrCodeColor(selectedBox.eicr_code || 'FI')}`}>
                        {selectedBox.eicr_code || 'FI'}
                      </Badge>
                    </div>
                    {selectedBox.description && (
                      <p className="text-sm text-muted-foreground">{selectedBox.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: {Math.round(selectedBox.confidence * 100)}%
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedBox(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default EvidenceViewer;
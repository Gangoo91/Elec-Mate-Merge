/**
 * EvidenceViewer — editorial bounding-box image viewer.
 *
 * Drops Card chrome and the icon-led control buttons for editorial pill
 * controls. Bounding boxes use semantic toned borders only (no flood
 * fills), EICR code chips inherit the editorial chip style.
 */

import React, { useState, useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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

const codeBorder = (code: string) => {
  switch (code) {
    case 'C1':
      return 'border-red-400';
    case 'C2':
      return 'border-orange-400';
    case 'C3':
      return 'border-amber-400';
    case 'FI':
      return 'border-blue-400';
    default:
      return 'border-elec-yellow';
  }
};

const codeChipTone = (code: string) => {
  switch (code) {
    case 'C1':
      return 'text-red-300 border-red-500/40 bg-red-500/[0.08]';
    case 'C2':
      return 'text-orange-300 border-orange-500/40 bg-orange-500/[0.08]';
    case 'C3':
      return 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]';
    case 'FI':
      return 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]';
    default:
      return 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]';
  }
};

const ControlButton = ({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/85 border border-white/15 hover:border-white/30 bg-[hsl(0_0%_8%)]/80 backdrop-blur rounded-full px-3 py-1.5 min-h-[32px] inline-flex items-center justify-center touch-manipulation transition-colors"
  >
    {children}
  </button>
);

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  imageUrl,
  boundingBoxes = [],
  findings = [],
  onBoundingBoxClick,
  showOverlays = true,
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [showBoxes, setShowBoxes] = useState(showOverlays);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.5));
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
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

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

  const allBoxes = [
    ...boundingBoxes,
    ...findings
      .filter((f) => f.bounding_box)
      .map((f) => ({
        ...f.bounding_box!,
        eicr_code: f.eicr_code,
        description: f.description,
      })),
  ];

  return (
    <TooltipProvider>
      <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {/* Top-right controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-1.5">
          <ControlButton onClick={() => setShowBoxes(!showBoxes)} ariaLabel="Toggle overlays">
            {showBoxes ? 'Hide boxes' : 'Show boxes'}
          </ControlButton>
          <ControlButton onClick={handleZoomIn} ariaLabel="Zoom in">
            +
          </ControlButton>
          <ControlButton onClick={handleZoomOut} ariaLabel="Zoom out">
            −
          </ControlButton>
          <ControlButton onClick={handleReset} ariaLabel="Reset">
            Reset
          </ControlButton>
          <ControlButton onClick={downloadEvidence} ariaLabel="Download">
            Save
          </ControlButton>
        </div>

        {/* Top-left zoom indicator */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold tabular-nums text-white/85 border border-white/15 bg-[hsl(0_0%_8%)]/80 backdrop-blur rounded-full px-2 py-0.5">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Image container */}
        <div
          ref={containerRef}
          className="relative h-96 overflow-hidden cursor-move bg-black/40"
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
              transformOrigin: 'center center',
            }}
            draggable={false}
          />

          {/* Bounding boxes overlay */}
          {showBoxes &&
            allBoxes.map((box, index) => (
              <Tooltip key={`${box.label}-${index}`}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'absolute border-2 cursor-pointer transition-transform hover:scale-[1.02]',
                      codeBorder(box.eicr_code || 'FI'),
                      selectedBox?.label === box.label && 'ring-2 ring-elec-yellow'
                    )}
                    style={{
                      left: `${box.x * 100}%`,
                      top: `${box.y * 100}%`,
                      width: `${box.width * 100}%`,
                      height: `${box.height * 100}%`,
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    }}
                    onClick={(e) => handleBoundingBoxClick(box, e)}
                    aria-label={box.label}
                  >
                    <span
                      className={cn(
                        'absolute -top-2 -left-2 inline-flex items-center text-[9.5px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
                        codeChipTone(box.eicr_code || 'FI')
                      )}
                    >
                      {box.eicr_code || 'FI'}
                    </span>
                    <span className="absolute -bottom-2 -right-2 inline-flex items-center text-[9.5px] uppercase tracking-[0.14em] font-semibold tabular-nums text-white/85 border border-white/15 bg-[hsl(0_0%_8%)]/80 backdrop-blur rounded-md px-1.5 py-0.5">
                      {Math.round(box.confidence * 100)}%
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-semibold text-[12px]">{box.label}</p>
                    {box.description && (
                      <p className="text-[11.5px] text-white/85">{box.description}</p>
                    )}
                    <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                      {box.eicr_code || 'FI'} · {Math.round(box.confidence * 100)}%
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
        </div>

        {/* Selected box details */}
        {selectedBox && (
          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="rounded-xl bg-[hsl(0_0%_8%)]/95 backdrop-blur border border-white/[0.10] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span
                      className={cn(
                        'inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
                        codeChipTone(selectedBox.eicr_code || 'FI')
                      )}
                    >
                      {selectedBox.eicr_code || 'FI'}
                    </span>
                    <p className="text-[13px] font-semibold text-white truncate">
                      {selectedBox.label}
                    </p>
                  </div>
                  {selectedBox.description && (
                    <p className="mt-1.5 text-[12px] leading-relaxed text-white/85">
                      {selectedBox.description}
                    </p>
                  )}
                  <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                    {Math.round(selectedBox.confidence * 100)}% confidence
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBox(null)}
                  aria-label="Close"
                  className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-7 w-7 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors text-[14px] leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default EvidenceViewer;

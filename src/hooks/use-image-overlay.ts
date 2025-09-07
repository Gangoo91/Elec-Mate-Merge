import { useState, useCallback } from 'react';

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

export const useImageOverlay = () => {
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [hoveredBox, setHoveredBox] = useState<BoundingBox | null>(null);
  const [showOverlays, setShowOverlays] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const selectBox = useCallback((box: BoundingBox | null) => {
    setSelectedBox(box);
  }, []);

  const hoverBox = useCallback((box: BoundingBox | null) => {
    setHoveredBox(box);
  }, []);

  const toggleOverlays = useCallback(() => {
    setShowOverlays(prev => !prev);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setSelectedBox(null);
  }, []);

  const updatePosition = useCallback((newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
  }, []);

  return {
    selectedBox,
    hoveredBox,
    showOverlays,
    zoom,
    position,
    selectBox,
    hoverBox,
    toggleOverlays,
    zoomIn,
    zoomOut,
    resetView,
    updatePosition,
  };
};
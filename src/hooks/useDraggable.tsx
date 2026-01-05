import { useState, useEffect, useCallback, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  storageKey?: string;
  defaultPosition?: Position;
  bounds?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export function useDraggable(
  elementRef: RefObject<HTMLElement>,
  { storageKey = 'draggable-position', defaultPosition = { x: 16, y: 80 }, bounds }: UseDraggableOptions = {}
) {
  const [position, setPosition] = useState<Position>(defaultPosition);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  const constrainPosition = useCallback((pos: Position): Position => {
    if (!bounds) return pos;
    
    const element = elementRef.current;
    if (!element) return pos;
    
    const rect = element.getBoundingClientRect();
    
    return {
      x: Math.max(bounds.left, Math.min(pos.x, bounds.right - rect.width)),
      y: Math.max(bounds.top, Math.min(pos.y, bounds.bottom - rect.height))
    };
  }, [bounds, elementRef]);

  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newPosition = constrainPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
    
    setPosition(newPosition);
  }, [isDragging, dragStart, constrainPosition]);

  const handleMouseUp = useCallback(async () => {
    if (isDragging) {
      setIsDragging(false);
      const { offlineStorage } = await import('@/utils/offlineStorage');
      await offlineStorage.saveUiPosition(storageKey, position);
    }
  }, [isDragging, position, storageKey]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousedown', handleMouseDown as any);
    element.addEventListener('touchstart', handleMouseDown as any, { passive: false });

    return () => {
      element.removeEventListener('mousedown', handleMouseDown as any);
      element.removeEventListener('touchstart', handleMouseDown as any);
    };
  }, [elementRef, handleMouseDown]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove as any);
      window.addEventListener('touchmove', handleMouseMove as any);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove as any);
        window.removeEventListener('touchmove', handleMouseMove as any);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const resetPosition = useCallback(async () => {
    setPosition(defaultPosition);
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.saveUiPosition(storageKey, defaultPosition);
  }, [defaultPosition, storageKey]);

  // Load initial position from IndexedDB
  useEffect(() => {
    const loadPosition = async () => {
      if (typeof window === 'undefined') return;
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const saved = await offlineStorage.getUiPosition(storageKey);
      if (saved) {
        setPosition(saved);
      }
    };
    loadPosition();
  }, [storageKey]);

  return {
    position,
    isDragging,
    resetPosition
  };
}

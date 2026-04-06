import { useState, useCallback } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const STORAGE_KEY = 'floor-plan-saved-rooms';

export interface SavedRoom {
  id: string;
  name: string;
  thumbnail: string;       // small 120x90 for room strip
  fullImage?: string;      // high-res 2x for PDF export
  canvasState: string;
  photoBase64?: string;
  symbolIds: string[];
  createdAt: string;
}

export interface UseFloorPlanRoomsReturn {
  rooms: SavedRoom[];
  saveRoom: (room: Omit<SavedRoom, 'id' | 'createdAt'>) => void;
  deleteRoom: (id: string) => void;
  updateRoom: (id: string, updates: Partial<SavedRoom>) => void;
  clearAllRooms: () => void;
}

function loadRooms(): SavedRoom[] {
  return storageGetJSONSync<SavedRoom[]>(STORAGE_KEY, []);
}

function persistRooms(rooms: SavedRoom[]): void {
  storageSetJSONSync(STORAGE_KEY, rooms);
}

export function useFloorPlanRooms(): UseFloorPlanRoomsReturn {
  const [rooms, setRooms] = useState<SavedRoom[]>(loadRooms);

  const saveRoom = useCallback((room: Omit<SavedRoom, 'id' | 'createdAt'>) => {
    const newRoom: SavedRoom = {
      ...room,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setRooms((prev) => {
      const next = [...prev, newRoom];
      persistRooms(next);
      return next;
    });
  }, []);

  const deleteRoom = useCallback((id: string) => {
    setRooms((prev) => {
      const next = prev.filter((r) => r.id !== id);
      persistRooms(next);
      return next;
    });
  }, []);

  const updateRoom = useCallback((id: string, updates: Partial<SavedRoom>) => {
    setRooms((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, ...updates } : r));
      persistRooms(next);
      return next;
    });
  }, []);

  const clearAllRooms = useCallback(() => {
    setRooms([]);
    persistRooms([]);
  }, []);

  return { rooms, saveRoom, deleteRoom, updateRoom, clearAllRooms };
}

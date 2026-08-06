import { useState, useCallback, useRef } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

/**
 * Exported so callers that need to resolve a room id BEFORE this hook has run
 * (e.g. hydrating `activeRoomId` inside a `useState` initialiser) can read the
 * same store rather than duplicating the key.
 */
export const FLOOR_PLAN_ROOMS_KEY = 'floor-plan-saved-rooms';

const STORAGE_KEY = FLOOR_PLAN_ROOMS_KEY;

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
  /**
   * Adds a room and returns it. Check `didLastWriteFail()` straight afterwards
   * to find out whether it actually reached storage.
   */
  saveRoom: (room: Omit<SavedRoom, 'id' | 'createdAt'>) => SavedRoom;
  deleteRoom: (id: string) => void;
  updateRoom: (id: string, updates: Partial<SavedRoom>) => void;
  clearAllRooms: () => void;
  /**
   * True when the most recent write did NOT reach storage — almost always the
   * device being out of localStorage quota, which rooms hit easily because
   * they carry base64 images. Callers must surface this: the old behaviour
   * swallowed the error and still showed a "saved" toast.
   *
   * This is React state, so it is only current on the NEXT render. Callers
   * that need the result in the same tick as `saveRoom`/`updateRoom` must use
   * `didLastWriteFail()` instead.
   */
  persistFailed: boolean;
  /** Synchronous read of the same signal — safe immediately after a write. */
  didLastWriteFail: () => boolean;
}

function loadRooms(): SavedRoom[] {
  return storageGetJSONSync<SavedRoom[]>(STORAGE_KEY, []);
}

function persistRooms(rooms: SavedRoom[]): boolean {
  return storageSetJSONSync(STORAGE_KEY, rooms);
}

export function useFloorPlanRooms(): UseFloorPlanRoomsReturn {
  const [rooms, setRooms] = useState<SavedRoom[]>(loadRooms);
  const [persistFailed, setPersistFailed] = useState(false);
  // Mirrors `rooms` synchronously. Several callers drive these setters in a
  // tight forEach (loading a cloud plan saves every room in one tick), so the
  // next call has to see the previous one's result before React re-renders.
  const roomsRef = useRef<SavedRoom[]>(rooms);
  const persistFailedRef = useRef(false);

  const commit = useCallback((next: SavedRoom[]) => {
    roomsRef.current = next;
    const failed = !persistRooms(next);
    persistFailedRef.current = failed;
    setPersistFailed(failed);
    setRooms(next);
  }, []);

  const saveRoom = useCallback((room: Omit<SavedRoom, 'id' | 'createdAt'>) => {
    const newRoom: SavedRoom = {
      ...room,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    commit([...roomsRef.current, newRoom]);
    return newRoom;
  }, [commit]);

  const deleteRoom = useCallback((id: string) => {
    commit(roomsRef.current.filter((r) => r.id !== id));
  }, [commit]);

  const updateRoom = useCallback((id: string, updates: Partial<SavedRoom>) => {
    commit(roomsRef.current.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, [commit]);

  const clearAllRooms = useCallback(() => {
    commit([]);
  }, [commit]);

  const didLastWriteFail = useCallback(() => persistFailedRef.current, []);

  return {
    rooms,
    saveRoom,
    deleteRoom,
    updateRoom,
    clearAllRooms,
    persistFailed,
    didLastWriteFail,
  };
}

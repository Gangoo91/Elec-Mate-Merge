import { useState, useCallback, useEffect } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

// ─── Types ──────────────────────────────────────────────────────────────────────

export type RoomType =
  | 'kitchen'
  | 'bedroom'
  | 'bathroom'
  | 'living'
  | 'hallway'
  | 'garage'
  | 'utility'
  | 'office'
  | 'en-suite'
  | 'wc'
  | 'conservatory'
  | 'other';

export interface Room {
  id: string;
  name: string;
  roomType: RoomType;
  dimensions?: { width: number; height: number };
  canvasState: string; // JSON serialised canvas objects
  photoBase64?: string; // room photo
  symbolIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FloorPlanProject {
  id: string;
  name: string;
  address: string;
  clientName: string;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'floor-plan-projects';

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  bathroom: 'Bathroom',
  living: 'Living Room',
  hallway: 'Hallway',
  garage: 'Garage',
  utility: 'Utility',
  office: 'Office',
  'en-suite': 'En-Suite',
  wc: 'WC',
  conservatory: 'Conservatory',
  other: 'Other',
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

function loadProjects(): FloorPlanProject[] {
  return storageGetJSONSync<FloorPlanProject[]>(STORAGE_KEY, []);
}

function saveProjects(projects: FloorPlanProject[]): void {
  storageSetJSONSync(STORAGE_KEY, projects);
}

// ─── Hook ───────────────────────────────────────────────────────────────────────

export function useFloorPlanProject(activeProjectId?: string) {
  const [projects, setProjects] = useState<FloorPlanProject[]>(() => loadProjects());

  // Keep local state in sync if storage changes externally
  const refreshProjects = useCallback(() => {
    setProjects(loadProjects());
  }, []);

  // Persist whenever projects change
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  // Derived: current project
  const currentProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId) ?? null
    : null;

  // ── Project CRUD ────────────────────────────────────────────────────────────

  const createProject = useCallback(
    (name: string, address: string, clientName: string): FloorPlanProject => {
      const now = new Date().toISOString();
      const project: FloorPlanProject = {
        id: crypto.randomUUID(),
        name,
        address,
        clientName,
        rooms: [],
        createdAt: now,
        updatedAt: now,
      };
      setProjects((prev) => [...prev, project]);
      return project;
    },
    []
  );

  const updateProject = useCallback(
    (id: string, updates: Partial<Omit<FloorPlanProject, 'id' | 'createdAt' | 'rooms'>>) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        )
      );
    },
    []
  );

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ── Room CRUD ───────────────────────────────────────────────────────────────

  const addRoom = useCallback(
    (
      projectId: string,
      name: string,
      roomType: RoomType,
      dimensions?: { width: number; height: number }
    ): Room => {
      const now = new Date().toISOString();
      const room: Room = {
        id: crypto.randomUUID(),
        name,
        roomType,
        dimensions,
        canvasState: '[]',
        symbolIds: [],
        createdAt: now,
        updatedAt: now,
      };
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, rooms: [...p.rooms, room], updatedAt: now }
            : p
        )
      );
      return room;
    },
    []
  );

  const updateRoom = useCallback(
    (projectId: string, roomId: string, updates: Partial<Omit<Room, 'id' | 'createdAt'>>) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                rooms: p.rooms.map((r) =>
                  r.id === roomId
                    ? { ...r, ...updates, updatedAt: new Date().toISOString() }
                    : r
                ),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    []
  );

  const deleteRoom = useCallback((projectId: string, roomId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.filter((r) => r.id !== roomId),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  }, []);

  const getRoomCanvasState = useCallback(
    (projectId: string, roomId: string): string => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return '[]';
      const room = project.rooms.find((r) => r.id === roomId);
      return room?.canvasState ?? '[]';
    },
    [projects]
  );

  return {
    projects,
    currentProject,
    createProject,
    updateProject,
    deleteProject,
    addRoom,
    updateRoom,
    deleteRoom,
    getRoomCanvasState,
    refreshProjects,
  };
}

export default useFloorPlanProject;

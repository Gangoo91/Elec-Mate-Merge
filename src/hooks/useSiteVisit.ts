import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { draftStorage } from '@/utils/draftStorage';
import type {
  SiteVisit,
  SiteVisitRoom,
  SiteVisitItem,
  SiteVisitPhoto,
  SiteVisitPrompt,
  RoomType,
  PropertyType,
  PhotoPhase,
} from '@/types/siteVisit';

const DRAFT_TYPE = 'site-visit';

export interface UseSiteVisitReturn {
  visit: SiteVisit;
  currentStep: number;
  activeRoomId: string | null;

  // Bulk restore (for draft recovery)
  restoreVisit: (
    data: Partial<SiteVisit> & { currentStep?: number; activeRoomId?: string | null }
  ) => void;

  // Step navigation
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Client / property
  updateClient: (
    updates: Partial<
      Pick<SiteVisit, 'customerId' | 'customerName' | 'customerEmail' | 'customerPhone'>
    >
  ) => void;
  updateProperty: (
    updates: Partial<
      Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode' | 'propertyType' | 'accessNotes'>
    >
  ) => void;

  // Rooms
  addRoom: (roomType: RoomType, roomName: string) => string;
  removeRoom: (roomId: string) => void;
  updateRoomNotes: (roomId: string, notes: string) => void;
  reorderRooms: (roomIds: string[]) => void;
  setActiveRoom: (roomId: string | null) => void;

  // Items
  addItem: (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>) => string;
  updateItem: (itemId: string, updates: Partial<SiteVisitItem>) => void;
  removeItem: (roomId: string, itemId: string) => void;

  // Photos
  addPhoto: (photo: Omit<SiteVisitPhoto, 'id' | 'siteVisitId'>) => string;
  removePhoto: (photoId: string) => void;

  // Prompts
  setPromptResponse: (
    promptKey: string,
    response: string,
    roomId?: string,
    question?: string
  ) => void;
  getPromptResponse: (promptKey: string, roomId?: string) => string | undefined;

  // Draft management
  lastSaved: Date | undefined;
  isSaving: boolean;

  // Summary stats
  totalRooms: number;
  totalItems: number;
  totalPhotos: number;
  totalPromptsAnswered: number;
}

function createEmptyVisit(): SiteVisit {
  return {
    id: uuidv4(),
    userId: '',
    status: 'in_progress',
    rooms: [],
    prompts: [],
    photos: [],
  };
}

export function useSiteVisit(initialVisit?: Partial<SiteVisit>): UseSiteVisitReturn {
  const [visit, setVisit] = useState<SiteVisit>(() => ({
    ...createEmptyVisit(),
    ...initialVisit,
  }));
  const [currentStep, setCurrentStep] = useState(0);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const visitRef = useRef(visit);

  // Keep ref in sync
  useEffect(() => {
    visitRef.current = visit;
  }, [visit]);

  // Auto-save to localStorage every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      const v = visitRef.current;
      if (v.rooms.length > 0 || v.customerName || v.propertyAddress) {
        setIsSaving(true);
        draftStorage.saveDraft(DRAFT_TYPE, v.id || null, {
          ...v,
          currentStep,
          activeRoomId,
        });
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [currentStep, activeRoomId]);

  // Bulk restore from draft (recovers rooms, items, photos, prompts, step, etc.)
  const restoreVisit = useCallback(
    (data: Partial<SiteVisit> & { currentStep?: number; activeRoomId?: string | null }) => {
      setVisit((v) => ({
        ...v,
        ...data,
        rooms: data.rooms ?? v.rooms,
        photos: data.photos ?? v.photos,
        prompts: data.prompts ?? v.prompts,
      }));
      if (typeof data.currentStep === 'number') setCurrentStep(data.currentStep);
      if (data.activeRoomId !== undefined) setActiveRoomId(data.activeRoomId);
    },
    []
  );

  // Step navigation
  const setStep = useCallback((step: number) => setCurrentStep(step), []);
  const nextStep = useCallback(() => setCurrentStep((s) => s + 1), []);
  const prevStep = useCallback(() => setCurrentStep((s) => Math.max(0, s - 1)), []);

  // Client
  const updateClient = useCallback(
    (
      updates: Partial<
        Pick<SiteVisit, 'customerId' | 'customerName' | 'customerEmail' | 'customerPhone'>
      >
    ) => {
      setVisit((v) => ({ ...v, ...updates }));
    },
    []
  );

  // Property
  const updateProperty = useCallback(
    (
      updates: Partial<
        Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode' | 'propertyType' | 'accessNotes'>
      >
    ) => {
      setVisit((v) => ({ ...v, ...updates }));
    },
    []
  );

  // Rooms
  const addRoom = useCallback((roomType: RoomType, roomName: string): string => {
    const id = uuidv4();
    setVisit((v) => ({
      ...v,
      rooms: [
        ...v.rooms,
        {
          id,
          siteVisitId: v.id,
          roomName,
          roomType,
          sortOrder: v.rooms.length,
          items: [],
        },
      ],
    }));
    setActiveRoomId(id);
    return id;
  }, []);

  const removeRoom = useCallback((roomId: string) => {
    setVisit((v) => ({
      ...v,
      rooms: v.rooms.filter((r) => r.id !== roomId),
      photos: v.photos.filter((p) => p.roomId !== roomId),
      prompts: v.prompts.filter((p) => p.roomId !== roomId),
    }));
    setActiveRoomId((current) => (current === roomId ? null : current));
  }, []);

  const updateRoomNotes = useCallback((roomId: string, notes: string) => {
    setVisit((v) => ({
      ...v,
      rooms: v.rooms.map((r) => (r.id === roomId ? { ...r, notes } : r)),
    }));
  }, []);

  const reorderRooms = useCallback((roomIds: string[]) => {
    setVisit((v) => ({
      ...v,
      rooms: roomIds
        .map((id, idx) => {
          const room = v.rooms.find((r) => r.id === id);
          return room ? { ...room, sortOrder: idx } : null;
        })
        .filter(Boolean) as SiteVisitRoom[],
    }));
  }, []);

  const setActiveRoom = useCallback((roomId: string | null) => {
    setActiveRoomId(roomId);
  }, []);

  // Items
  const addItem = useCallback(
    (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>): string => {
      const id = uuidv4();
      setVisit((v) => ({
        ...v,
        rooms: v.rooms.map((r) =>
          r.id === roomId
            ? {
                ...r,
                items: [...r.items, { ...item, id, roomId, sortOrder: r.items.length }],
              }
            : r
        ),
      }));
      return id;
    },
    []
  );

  const updateItem = useCallback((itemId: string, updates: Partial<SiteVisitItem>) => {
    setVisit((v) => ({
      ...v,
      rooms: v.rooms.map((r) => ({
        ...r,
        items: r.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
      })),
    }));
  }, []);

  const removeItem = useCallback((roomId: string, itemId: string) => {
    setVisit((v) => ({
      ...v,
      rooms: v.rooms.map((r) =>
        r.id === roomId ? { ...r, items: r.items.filter((i) => i.id !== itemId) } : r
      ),
    }));
  }, []);

  // Photos
  const addPhoto = useCallback((photo: Omit<SiteVisitPhoto, 'id' | 'siteVisitId'>): string => {
    const id = uuidv4();
    setVisit((v) => ({
      ...v,
      photos: [...v.photos, { ...photo, id, siteVisitId: v.id }],
    }));
    return id;
  }, []);

  const removePhoto = useCallback((photoId: string) => {
    setVisit((v) => ({
      ...v,
      photos: v.photos.filter((p) => p.id !== photoId),
    }));
  }, []);

  // Prompts
  const setPromptResponse = useCallback(
    (promptKey: string, response: string, roomId?: string, question?: string) => {
      setVisit((v) => {
        const existing = v.prompts.find(
          (p) => p.promptKey === promptKey && p.roomId === (roomId ?? undefined)
        );
        if (existing) {
          return {
            ...v,
            prompts: v.prompts.map((p) => (p.id === existing.id ? { ...p, response } : p)),
          };
        }
        return {
          ...v,
          prompts: [
            ...v.prompts,
            {
              id: uuidv4(),
              siteVisitId: v.id,
              roomId,
              promptKey,
              promptQuestion: question ?? promptKey,
              response,
            },
          ],
        };
      });
    },
    []
  );

  const getPromptResponse = useCallback(
    (promptKey: string, roomId?: string): string | undefined => {
      return visit.prompts.find(
        (p) => p.promptKey === promptKey && p.roomId === (roomId ?? undefined)
      )?.response;
    },
    [visit.prompts]
  );

  // Summary stats
  const totalRooms = visit.rooms.length;
  const totalItems = visit.rooms.reduce((sum, r) => sum + r.items.length, 0);
  const totalPhotos = visit.photos.length;
  const totalPromptsAnswered = visit.prompts.filter((p) => p.response).length;

  return {
    visit,
    currentStep,
    activeRoomId,
    restoreVisit,
    setStep,
    nextStep,
    prevStep,
    updateClient,
    updateProperty,
    addRoom,
    removeRoom,
    updateRoomNotes,
    reorderRooms,
    setActiveRoom,
    addItem,
    updateItem,
    removeItem,
    addPhoto,
    removePhoto,
    setPromptResponse,
    getPromptResponse,
    lastSaved,
    isSaving,
    totalRooms,
    totalItems,
    totalPhotos,
    totalPromptsAnswered,
  };
}

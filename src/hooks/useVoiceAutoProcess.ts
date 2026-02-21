/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * useVoiceAutoProcess
 *
 * Buffers final speech chunks and auto-sends them to the parse-voice-transcript
 * edge function after 3 seconds of silence. Results are returned immediately
 * for live display — the user keeps talking while batches process.
 *
 * Why 3 seconds: natural speech pauses within sentences are <2s,
 * room-transition pauses are 3-5s.
 */

import { useRef, useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ACCESSORY_TYPES, getAccessoryLabel } from '@/data/siteVisit/accessoryTypes';
import { getGlobalPrompts, ROOM_PROMPTS } from '@/data/siteVisit/smartPrompts';
import { mapRoomName } from '@/utils/roomTypeMapper';
import { toast } from 'sonner';
import type { SiteVisit, SiteVisitItem, RoomType } from '@/types/siteVisit';

const SILENCE_TIMEOUT_MS = 3000;

/** A confirmed item returned from a successful parse batch */
export interface ConfirmedItem {
  id: string;
  roomName: string;
  accessory_id: string;
  label: string;
  quantity: number;
  unit: string;
  notes?: string;
  timestamp: number;
}

interface UseVoiceAutoProcessOptions {
  visit: SiteVisit;
  activeRoomId: string | null;
  onAddRoom: (roomType: RoomType, roomName: string) => string;
  onSetActiveRoom: (roomId: string | null) => void;
  onAddItem: (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<SiteVisitItem>) => void;
  onRemoveItem: (roomId: string, itemId: string) => void;
  setPromptResponse: (
    promptKey: string,
    response: string,
    roomId?: string,
    question?: string
  ) => void;
}

interface UseVoiceAutoProcessReturn {
  /** Feed a new final chunk from useSpeechToText */
  feedChunk: (chunk: string) => void;
  /** Whether a batch is currently being processed */
  isProcessing: boolean;
  /** Live-confirmed items (most recent first) */
  confirmedItems: ConfirmedItem[];
  /** Undo the last confirmed item by ID */
  undoItem: (id: string) => void;
  /** Flush any buffered text immediately (called on "Done") */
  flush: () => Promise<void>;
  /** Reset all state */
  reset: () => void;
  /** Number of batches processed so far */
  batchCount: number;
}

let itemIdCounter = 0;
function nextItemId() {
  return `vi_${Date.now()}_${++itemIdCounter}`;
}

export function useVoiceAutoProcess(
  options: UseVoiceAutoProcessOptions
): UseVoiceAutoProcessReturn {
  const {
    visit,
    activeRoomId,
    onAddRoom,
    onSetActiveRoom,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    setPromptResponse,
  } = options;

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedItems, setConfirmedItems] = useState<ConfirmedItem[]>([]);
  const [batchCount, setBatchCount] = useState(0);

  // Refs for stable access
  const visitRef = useRef(visit);
  visitRef.current = visit;
  const activeRoomIdRef = useRef(activeRoomId);
  activeRoomIdRef.current = activeRoomId;
  const bufferRef = useRef('');
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const processingRef = useRef(false);

  /**
   * Build compact catalogue payloads for the edge function.
   */
  const buildPayload = useCallback(() => {
    const accessories = ACCESSORY_TYPES.map((a) => ({
      id: a.id,
      label: a.label,
      category: a.category,
    }));

    const propertyType = visitRef.current.propertyType || undefined;
    const globalPrompts = getGlobalPrompts(propertyType as any);
    const allPrompts = [...globalPrompts, ...ROOM_PROMPTS].map((p) => ({
      key: p.key,
      question: p.question,
      options: p.options,
      inputType: p.inputType,
    }));

    return { accessories, prompts: allPrompts };
  }, []);

  /**
   * Process a buffer of text through the edge function.
   */
  const processBuffer = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      processingRef.current = true;
      setIsProcessing(true);

      try {
        const { accessories, prompts } = buildPayload();

        const activeRoom = activeRoomIdRef.current
          ? visitRef.current.rooms.find((r) => r.id === activeRoomIdRef.current)?.roomName
          : undefined;

        const { data, error } = await supabase.functions.invoke('parse-voice-transcript', {
          body: {
            transcript: text.trim(),
            propertyType: visitRef.current.propertyType || undefined,
            existingRooms: visitRef.current.rooms.map((r) => r.roomName),
            activeRoom,
            accessories,
            prompts,
          },
        });

        if (error) {
          throw new Error(error.message || 'Failed to parse transcript');
        }

        // Apply prompt responses
        if (data?.prompt_responses?.length > 0) {
          for (const pr of data.prompt_responses) {
            let roomId: string | undefined;
            if (pr.room_name) {
              const { roomType } = mapRoomName(pr.room_name);
              const room = visitRef.current.rooms.find((r) => r.roomType === roomType);
              roomId = room?.id;
            }
            const allPrompts = [...getGlobalPrompts(), ...ROOM_PROMPTS];
            const prompt = allPrompts.find((p) => p.key === pr.prompt_key);
            setPromptResponse(pr.prompt_key, pr.value, roomId, prompt?.question);
            toast.success(
              `Set: ${prompt?.question?.replace('?', '') || pr.prompt_key} → ${pr.value}`
            );
          }
        }

        // Apply corrections
        if (data?.corrections?.length > 0) {
          for (const corr of data.corrections) {
            const { roomType } = mapRoomName(corr.room_name);
            const room = visitRef.current.rooms.find((r) => r.roomType === roomType);
            if (!room) continue;
            const item = room.items.find((i) => i.itemType === corr.accessory_id);
            if (!item) continue;

            if (corr.action === 'update_quantity' && corr.new_quantity != null) {
              onUpdateItem(item.id, { quantity: corr.new_quantity });
              toast.success(
                `Updated: ${getAccessoryLabel(corr.accessory_id)} → ${corr.new_quantity}`
              );
            } else if (corr.action === 'remove') {
              onRemoveItem(room.id, item.id);
              toast.success(
                `Removed: ${getAccessoryLabel(corr.accessory_id)} from ${room.roomName}`
              );
            }
          }
        }

        // Handle room switch
        if (data?.active_room_switch) {
          const { roomType, label } = mapRoomName(data.active_room_switch);
          const existingRoom = visitRef.current.rooms.find((r) => r.roomType === roomType);
          if (existingRoom) {
            onSetActiveRoom(existingRoom.id);
          } else {
            const newId = onAddRoom(roomType, label);
            onSetActiveRoom(newId);
          }
          toast.success(`Switched to ${label}`);
        }

        // Add rooms and items
        if (data?.rooms?.length > 0) {
          const newConfirmed: ConfirmedItem[] = [];

          for (const parsedRoom of data.rooms) {
            if (!parsedRoom.items?.length) continue;

            const { roomType, label } = mapRoomName(parsedRoom.roomName);
            const existingRoom = visitRef.current.rooms.find((r) => r.roomType === roomType);
            let roomId: string;

            if (existingRoom) {
              roomId = existingRoom.id;
            } else {
              roomId = onAddRoom(roomType, label);
            }

            for (const item of parsedRoom.items) {
              const accessory = ACCESSORY_TYPES.find((a) => a.id === item.accessory_id);
              const accessoryId = accessory ? item.accessory_id : 'custom_item';
              const itemLabel = accessory?.label || item.accessory_id;

              onAddItem(roomId, {
                itemType: accessoryId,
                itemDescription: itemLabel,
                quantity: item.quantity || 1,
                unit: accessory?.defaultUnit || item.unit || 'each',
                notes: item.notes || (!accessory ? item.accessory_id : undefined),
              });

              newConfirmed.push({
                id: nextItemId(),
                roomName: label,
                accessory_id: accessoryId,
                label: itemLabel,
                quantity: item.quantity || 1,
                unit: accessory?.defaultUnit || item.unit || 'each',
                notes: item.notes,
                timestamp: Date.now(),
              });
            }
          }

          if (newConfirmed.length > 0) {
            setConfirmedItems((prev) => [...newConfirmed, ...prev]);
          }
        }

        setBatchCount((c) => c + 1);
      } catch (err) {
        console.error('[AUTO-PROCESS] Parse error:', err);
        toast.error('Failed to process speech batch', {
          description: err instanceof Error ? err.message : 'Unknown error',
        });
        // Keep the buffer text — it will get picked up in the next batch
        bufferRef.current = text + ' ' + bufferRef.current;
      } finally {
        processingRef.current = false;
        setIsProcessing(false);
      }
    },
    [
      buildPayload,
      onAddRoom,
      onSetActiveRoom,
      onAddItem,
      onUpdateItem,
      onRemoveItem,
      setPromptResponse,
    ]
  );

  /**
   * Feed a new final chunk. Resets the 3s silence timer.
   */
  const feedChunk = useCallback(
    (chunk: string) => {
      bufferRef.current += chunk;

      // Reset silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      silenceTimerRef.current = setTimeout(() => {
        const text = bufferRef.current.trim();
        if (text) {
          bufferRef.current = '';
          processBuffer(text);
        }
      }, SILENCE_TIMEOUT_MS);
    },
    [processBuffer]
  );

  /**
   * Flush any remaining buffer immediately (called when user taps "Done").
   */
  const flush = useCallback(async () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    const text = bufferRef.current.trim();
    bufferRef.current = '';

    if (text) {
      await processBuffer(text);
    }
  }, [processBuffer]);

  /**
   * Undo a confirmed item — removes it from the visit and the confirmed list.
   */
  const undoItem = useCallback(
    (confirmedId: string) => {
      const item = confirmedItems.find((ci) => ci.id === confirmedId);
      if (!item) return;

      // Find in visit data and remove
      const { roomType } = mapRoomName(item.roomName);
      const room = visitRef.current.rooms.find((r) => r.roomType === roomType);
      if (room) {
        const visitItem = room.items.find(
          (i) => i.itemType === item.accessory_id && i.quantity === item.quantity
        );
        if (visitItem) {
          onRemoveItem(room.id, visitItem.id);
        }
      }

      setConfirmedItems((prev) => prev.filter((ci) => ci.id !== confirmedId));
      toast.success(`Undone: ${item.label}`);
    },
    [confirmedItems, onRemoveItem]
  );

  /**
   * Reset all state (called when leaving capture mode).
   */
  const reset = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    bufferRef.current = '';
    processingRef.current = false;
    setIsProcessing(false);
    setConfirmedItems([]);
    setBatchCount(0);
  }, []);

  return {
    feedChunk,
    isProcessing,
    confirmedItems,
    undoItem,
    flush,
    reset,
    batchCount,
  };
}

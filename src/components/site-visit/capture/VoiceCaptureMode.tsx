import React, { useState, useCallback, useRef } from 'react';
import {
  Mic,
  Square,
  Send,
  Loader2,
  X,
  Check,
  RotateCcw,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { mapRoomName } from '@/utils/roomTypeMapper';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { ACCESSORY_TYPES, getAccessoryLabel } from '@/data/siteVisit/accessoryTypes';
import { toast } from 'sonner';
import type { SiteVisit, SiteVisitItem, SiteVisitPhoto, RoomType } from '@/types/siteVisit';

// --- Voice alias map: common spoken phrases → accessory ID ---
const VOICE_ALIASES: Record<string, string> = {
  socket: 'single_socket',
  sockets: 'single_socket',
  'single socket': 'single_socket',
  'double socket': 'double_socket',
  doubles: 'double_socket',
  'double sockets': 'double_socket',
  'twin socket': 'double_socket',
  'usb socket': 'usb_socket',
  'usb sockets': 'usb_socket',
  spur: 'switched_fused_spur',
  'fused spur': 'switched_fused_spur',
  'switched spur': 'switched_fused_spur',
  'unswitched spur': 'unswitched_fused_spur',
  'shaver point': 'shaver_socket',
  'shaver socket': 'shaver_socket',
  'floor box': 'floor_socket',
  'floor socket': 'floor_socket',
  pendant: 'ceiling_pendant',
  'ceiling light': 'ceiling_pendant',
  'ceiling pendant': 'ceiling_pendant',
  'pendant light': 'ceiling_pendant',
  downlight: 'led_downlight',
  downlights: 'led_downlight',
  'led downlight': 'led_downlight',
  'led downlights': 'led_downlight',
  spotlight: 'spotlight_bar',
  spotlights: 'spotlight_bar',
  'spot light': 'spotlight_bar',
  'led strip': 'led_strip',
  'strip light': 'led_strip',
  'strip lighting': 'led_strip',
  'wall light': 'wall_light',
  'wall lights': 'wall_light',
  'under cabinet light': 'under_cabinet_light',
  'under cabinet': 'under_cabinet_light',
  'outdoor light': 'outdoor_light',
  'outside light': 'outdoor_light',
  'exterior light': 'outdoor_light',
  'security light': 'pir_sensor_light',
  'pir light': 'pir_sensor_light',
  'sensor light': 'pir_sensor_light',
  'emergency light': 'emergency_light',
  'bathroom light': 'bathroom_light',
  switch: 'single_switch',
  switches: 'single_switch',
  'light switch': 'single_switch',
  'light switches': 'single_switch',
  'single switch': 'single_switch',
  'double switch': 'double_switch',
  '2 gang switch': 'double_switch',
  'two gang switch': 'double_switch',
  'two way switch': 'two_way_switch',
  '2 way switch': 'two_way_switch',
  'two way': 'two_way_switch',
  'intermediate switch': 'intermediate_switch',
  dimmer: 'dimmer_switch',
  'dimmer switch': 'dimmer_switch',
  'pull cord': 'pull_cord_switch',
  'pull cord switch': 'pull_cord_switch',
  'smart switch': 'smart_switch',
  cooker: 'cooker_switch',
  'cooker switch': 'cooker_switch',
  'cooker outlet': 'cooker_outlet',
  'cooker connection': 'cooker_outlet',
  hob: 'hob_outlet',
  'hob outlet': 'hob_outlet',
  'hob connection': 'hob_outlet',
  'extractor fan': 'extractor_fan',
  extractor: 'extractor_fan',
  fan: 'extractor_fan',
  'towel rail': 'towel_rail_spur',
  'heated towel rail': 'towel_rail_spur',
  immersion: 'immersion_heater',
  'immersion heater': 'immersion_heater',
  'waste disposal': 'waste_disposal',
  'smoke alarm': 'smoke_detector',
  'smoke detector': 'smoke_detector',
  'heat alarm': 'heat_detector',
  'heat detector': 'heat_detector',
  'co alarm': 'co_detector',
  'co detector': 'co_detector',
  'carbon monoxide detector': 'co_detector',
  'carbon monoxide alarm': 'co_detector',
  'data point': 'cat6_outlet',
  'data outlet': 'cat6_outlet',
  'cat 6': 'cat6_outlet',
  'network point': 'cat6_outlet',
  'tv point': 'tv_outlet',
  'tv outlet': 'tv_outlet',
  aerial: 'tv_outlet',
  'telephone point': 'bt_outlet',
  'phone point': 'bt_outlet',
  'storage heater': 'storage_heater',
  'panel heater': 'panel_heater',
  thermostat: 'thermostat',
  'room thermostat': 'thermostat',
  'underfloor heating': 'underfloor_heating',
  'ev charger': 'ev_charger',
  'car charger': 'ev_charger',
  'electric vehicle charger': 'ev_charger',
  'outside socket': 'outside_socket',
  'outdoor socket': 'outside_socket',
  'external socket': 'outside_socket',
  'garden light': 'garden_spike_light',
  'spike light': 'garden_spike_light',
  'consumer unit': 'consumer_unit',
  'fuse board': 'consumer_unit',
  'fuse box': 'consumer_unit',
  'distribution board': 'distribution_board',
  'db board': 'distribution_board',
  'cable run': 'cable_run',
  cable: 'cable_run',
  'light fitting': 'ceiling_pendant',
  'light fittings': 'ceiling_pendant',
};

/**
 * Resolve an accessory description (could be an ID like "double_socket",
 * freetext like "Double socket", or spoken alias like "doubles") into
 * the canonical accessory entry. Falls back to custom_item.
 */
function resolveAccessory(description: string) {
  const normalised = description.toLowerCase().trim();

  // 1. Voice alias match (most common voice phrases)
  const aliasId = VOICE_ALIASES[normalised];
  if (aliasId) {
    const found = ACCESSORY_TYPES.find((a) => a.id === aliasId);
    if (found) return found;
  }

  // 2. Direct ID match (best case — OpenAI returned the exact ID)
  const asId = normalised.replace(/[\s-]+/g, '_');
  const byId = ACCESSORY_TYPES.find((a) => a.id === asId);
  if (byId) return byId;

  // 3. Label match (case-insensitive, ignoring parenthetical suffixes)
  const byLabel = ACCESSORY_TYPES.find(
    (a) => a.label.toLowerCase().replace(/\s*\(.*\)/, '') === normalised
  );
  if (byLabel) return byLabel;

  // 4. Substring / contains match
  const byContains = ACCESSORY_TYPES.find(
    (a) =>
      a.label.toLowerCase().includes(normalised) ||
      normalised.includes(a.label.toLowerCase().replace(/\s*\(.*\)/, ''))
  );
  if (byContains) return byContains;

  // 5. Fallback
  return ACCESSORY_TYPES.find((a) => a.id === 'custom_item')!;
}

type Phase = 'idle' | 'listening' | 'parsing' | 'reviewing';

interface ParsedItem {
  description: string;
  quantity: number;
  unit: string;
  notes?: string;
  included: boolean;
}

interface ParsedRoom {
  roomName: string;
  items: ParsedItem[];
}

interface VoiceCaptureModeProps {
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
  onAddPhoto: (photo: Omit<SiteVisitPhoto, 'id' | 'siteVisitId'>) => void;
}

export const VoiceCaptureMode = ({
  visit,
  activeRoomId,
  onAddRoom,
  onSetActiveRoom,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: VoiceCaptureModeProps) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [parsedRooms, setParsedRooms] = useState<ParsedRoom[]>([]);

  // Refs for stable access in callbacks
  const visitRef = useRef(visit);
  visitRef.current = visit;

  const speech = useSpeechToText({ continuous: true, interimResults: true });

  // --- Phase transitions ---

  const handleStart = useCallback(() => {
    speech.resetTranscript();
    speech.startListening();
    setPhase('listening');
  }, [speech]);

  const handleStop = useCallback(() => {
    speech.stopListening();
    setPhase('idle');
  }, [speech]);

  const handleProcess = useCallback(async () => {
    const text = speech.transcript.trim();
    if (!text) {
      toast.error('No transcript to process');
      return;
    }

    speech.stopListening();
    setPhase('parsing');

    try {
      const { data, error } = await supabase.functions.invoke('parse-voice-transcript', {
        body: {
          transcript: text,
          propertyType: visitRef.current.propertyType || undefined,
          existingRooms: visitRef.current.rooms.map((r) => r.roomName),
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to parse transcript');
      }

      if (!data?.rooms || !Array.isArray(data.rooms) || data.rooms.length === 0) {
        toast.error('No rooms or items found in transcript');
        setPhase('listening');
        speech.startListening();
        return;
      }

      // Resolve each item through the accessory matcher immediately
      const rooms: ParsedRoom[] = data.rooms.map(
        (r: {
          roomName: string;
          items: Array<{ description: string; quantity: number; unit: string; notes?: string }>;
        }) => ({
          roomName: r.roomName,
          items: r.items.map((item) => {
            const accessory = resolveAccessory(item.description);
            return {
              description: accessory.id,
              quantity: item.quantity || 1,
              unit: accessory.defaultUnit,
              notes: item.notes || (accessory.id === 'custom_item' ? item.description : undefined),
              included: true,
            };
          }),
        })
      );

      setParsedRooms(rooms);
      setPhase('reviewing');
    } catch (err) {
      console.error('Parse error:', err);
      toast.error('Failed to process transcript', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
      setPhase('listening');
      speech.startListening();
    }
  }, [speech]);

  const handleToggleItem = useCallback((roomIdx: number, itemIdx: number) => {
    setParsedRooms((prev) =>
      prev.map((room, ri) =>
        ri === roomIdx
          ? {
              ...room,
              items: room.items.map((item, ii) =>
                ii === itemIdx ? { ...item, included: !item.included } : item
              ),
            }
          : room
      )
    );
  }, []);

  const handleReviewQtyChange = useCallback((roomIdx: number, itemIdx: number, delta: number) => {
    setParsedRooms((prev) =>
      prev.map((room, ri) =>
        ri === roomIdx
          ? {
              ...room,
              items: room.items.map((item, ii) =>
                ii === itemIdx
                  ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                  : item
              ),
            }
          : room
      )
    );
  }, []);

  const handleConfirm = useCallback(() => {
    let roomsAdded = 0;
    let itemsAdded = 0;

    for (const parsed of parsedRooms) {
      const includedItems = parsed.items.filter((i) => i.included);
      if (includedItems.length === 0) continue;

      const { roomType, label } = mapRoomName(parsed.roomName);

      // Check if this room type already exists in the visit
      const existingRoom = visitRef.current.rooms.find((r) => r.roomType === roomType);
      let roomId: string;

      if (existingRoom) {
        roomId = existingRoom.id;
      } else {
        roomId = onAddRoom(roomType, label);
        roomsAdded++;
      }

      // Add each included item — already resolved to canonical IDs
      for (const item of includedItems) {
        const accessory = ACCESSORY_TYPES.find((a) => a.id === item.description);
        onAddItem(roomId, {
          itemType: item.description,
          itemDescription: accessory?.label || item.description,
          quantity: item.quantity,
          unit: item.unit,
          notes: item.notes,
        });
        itemsAdded++;
      }
    }

    const parts: string[] = [];
    if (roomsAdded > 0) parts.push(`${roomsAdded} room${roomsAdded !== 1 ? 's' : ''}`);
    if (itemsAdded > 0) parts.push(`${itemsAdded} item${itemsAdded !== 1 ? 's' : ''}`);

    toast.success(`Added ${parts.join(' and ')}`);

    // Reset for next dictation
    speech.resetTranscript();
    setParsedRooms([]);
    setPhase('idle');
  }, [parsedRooms, onAddRoom, onAddItem, speech]);

  const handleKeepDictating = useCallback(() => {
    setParsedRooms([]);
    speech.startListening();
    setPhase('listening');
  }, [speech]);

  const handleDiscard = useCallback(() => {
    setParsedRooms([]);
    speech.resetTranscript();
    setPhase('idle');
  }, [speech]);

  // --- Captured item editing ---

  const handleCapturedQtyChange = useCallback(
    (itemId: string, delta: number, currentQty: number) => {
      const newQty = Math.max(1, currentQty + delta);
      onUpdateItem(itemId, { quantity: newQty });
    },
    [onUpdateItem]
  );

  const handleCapturedRemove = useCallback(
    (roomId: string, itemId: string) => {
      onRemoveItem(roomId, itemId);
    },
    [onRemoveItem]
  );

  // --- Unsupported browser ---

  if (!speech.isSupported) {
    return (
      <div className="rounded-xl border border-white/10 p-6 text-center space-y-3">
        <Mic className="h-8 w-8 text-white mx-auto" />
        <p className="text-sm text-white">
          Speech recognition is not supported in this browser. Please use Chrome or Safari.
        </p>
      </div>
    );
  }

  // --- Render ---

  return (
    <div className="space-y-4">
      {/* Status card */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            {phase === 'listening' ? (
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            ) : phase === 'parsing' ? (
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
            )}
            <span className="text-sm font-medium text-white">
              {phase === 'listening'
                ? 'Listening...'
                : phase === 'parsing'
                  ? 'Processing...'
                  : phase === 'reviewing'
                    ? 'Review Items'
                    : 'Voice Capture'}
            </span>
          </div>
        </div>

        {/* Live transcript (listening phase) */}
        {(phase === 'listening' || phase === 'parsing') && (
          <div className="p-3 border-t border-white/[0.06]">
            <p className="text-[11px] text-white mb-1 font-medium">Transcript</p>
            <p className="text-sm text-white min-h-[40px]">
              {speech.transcript}
              {speech.interimTranscript && (
                <span className="text-white/50">{speech.interimTranscript}</span>
              )}
              {!speech.transcript && !speech.interimTranscript && 'Start speaking...'}
            </p>
          </div>
        )}

        {/* Review list (reviewing phase) */}
        {phase === 'reviewing' && parsedRooms.length > 0 && (
          <div className="border-t border-white/[0.06] max-h-[50vh] overflow-y-auto">
            {parsedRooms.map((room, ri) => (
              <div key={ri} className="border-b border-white/[0.06] last:border-b-0">
                <div className="px-3 py-2 bg-white/[0.03]">
                  <span className="text-xs font-semibold text-white">{room.roomName}</span>
                  <span className="text-xs text-white ml-2">
                    ({room.items.filter((i) => i.included).length} item
                    {room.items.filter((i) => i.included).length !== 1 ? 's' : ''})
                  </span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {room.items.map((item, ii) => {
                    const accessory = ACCESSORY_TYPES.find((a) => a.id === item.description);
                    const label = accessory?.label || item.description;
                    return (
                      <div
                        key={ii}
                        className={`flex items-center gap-2 px-3 py-2 ${
                          !item.included ? 'opacity-40' : ''
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-white">{label}</span>
                          {item.notes && (
                            <span className="text-xs text-white ml-1">({item.notes})</span>
                          )}
                        </div>
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleReviewQtyChange(ri, ii, -1)}
                            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 text-white" />
                          </button>
                          <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleReviewQtyChange(ri, ii, 1)}
                            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 text-white" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleToggleItem(ri, ii)}
                          className="h-7 w-7 flex items-center justify-center rounded-lg touch-manipulation flex-shrink-0"
                          aria-label={item.included ? 'Exclude item' : 'Include item'}
                        >
                          {item.included ? (
                            <X className="h-4 w-4 text-red-400" />
                          ) : (
                            <RotateCcw className="h-4 w-4 text-emerald-400" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error display */}
      {speech.error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-sm text-white">{speech.error}</p>
        </div>
      )}

      {/* Action buttons by phase */}
      {phase === 'idle' && (
        <button
          onClick={handleStart}
          className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition-all touch-manipulation bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 active:bg-emerald-500/30"
        >
          <Mic className="h-5 w-5" />
          Start Listening
        </button>
      )}

      {phase === 'listening' && (
        <div className="flex gap-3">
          <button
            onClick={handleProcess}
            disabled={!speech.transcript.trim()}
            className="flex-1 h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition-all touch-manipulation bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 active:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            Process
          </button>
          <button
            onClick={handleStop}
            className="h-14 px-5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold transition-all touch-manipulation bg-red-500/20 border border-red-500/40 text-red-400 active:bg-red-500/30"
          >
            <Square className="h-4 w-4" />
            Stop
          </button>
        </div>
      )}

      {phase === 'parsing' && (
        <div className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold bg-elec-yellow/10 border border-elec-yellow/30 text-white">
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </div>
      )}

      {phase === 'reviewing' && (
        <div className="space-y-2">
          <button
            onClick={handleConfirm}
            className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition-all touch-manipulation bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 active:bg-emerald-500/30"
          >
            <Check className="h-5 w-5" />
            Confirm & Add
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleKeepDictating}
              className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all touch-manipulation bg-blue-500/20 border border-blue-500/40 text-blue-400 active:bg-blue-500/30"
            >
              <Mic className="h-4 w-4" />
              Keep Dictating
            </button>
            <button
              onClick={handleDiscard}
              className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all touch-manipulation bg-red-500/20 border border-red-500/40 text-red-400 active:bg-red-500/30"
            >
              <Trash2 className="h-4 w-4" />
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Captured so far — editable room-by-room breakdown */}
      {visit.rooms.length > 0 && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[11px] text-white font-medium">Captured So Far</p>
            <div className="flex gap-3 text-[11px] text-white">
              <span>
                {visit.rooms.length} room{visit.rooms.length !== 1 ? 's' : ''}
              </span>
              <span>
                {visit.rooms.reduce((s, r) => s + r.items.length, 0)} item
                {visit.rooms.reduce((s, r) => s + r.items.length, 0) !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="border-t border-white/[0.06] max-h-[40vh] overflow-y-auto">
            {visit.rooms.map((room) => (
              <div key={room.id} className="border-b border-white/[0.04] last:border-b-0">
                <div className="px-3 py-1.5 bg-white/[0.02] flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{room.roomName}</span>
                  <span className="text-[11px] text-white">
                    {room.items.length} item{room.items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {room.items.length > 0 && (
                  <div className="divide-y divide-white/[0.04]">
                    {room.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 px-3 py-1.5">
                        <span className="text-xs text-white flex-1 min-w-0 truncate">
                          {getAccessoryLabel(item.itemType)}
                        </span>
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() =>
                              handleCapturedQtyChange(item.id, -1, item.quantity)
                            }
                            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 text-white" />
                          </button>
                          <span className="text-xs text-white w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleCapturedQtyChange(item.id, 1, item.quantity)
                            }
                            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 text-white" />
                          </button>
                        </div>
                        {/* Delete */}
                        <button
                          onClick={() => handleCapturedRemove(room.id, item.id)}
                          className="h-7 w-7 flex items-center justify-center rounded-lg touch-manipulation flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <X className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

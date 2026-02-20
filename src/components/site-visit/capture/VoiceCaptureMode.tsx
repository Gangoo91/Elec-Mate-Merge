import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getSetting } from '@/services/settingsService';
import { mapRoomName } from '@/utils/roomTypeMapper';
import { toast } from 'sonner';
import type { SiteVisit, SiteVisitItem, SiteVisitPhoto, RoomType } from '@/types/siteVisit';

const SITE_SURVEY_AGENT_SETTINGS_KEY = 'elevenlabs_site_survey_agent_id';
const DEFAULT_SITE_SURVEY_AGENT_ID = 'agent_0801kdxbb7hhepg80gfpgq8kgpgs';

interface ParsedAction {
  type: 'room_created' | 'item_added' | 'room_switched' | 'prompt_answered' | 'issue_flagged';
  label: string;
  detail?: string;
}

interface VoiceCaptureModeProps {
  visit: SiteVisit;
  activeRoomId: string | null;
  onAddRoom: (roomType: RoomType, roomName: string) => string;
  onSetActiveRoom: (roomId: string | null) => void;
  onAddItem: (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>) => void;
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
  setPromptResponse,
  onAddPhoto,
}: VoiceCaptureModeProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedActions, setParsedActions] = useState<ParsedAction[]>([]);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for stable callback access
  const visitRef = useRef(visit);
  const activeRoomIdRef = useRef(activeRoomId);
  visitRef.current = visit;
  activeRoomIdRef.current = activeRoomId;

  const onAddRoomRef = useRef(onAddRoom);
  const onSetActiveRoomRef = useRef(onSetActiveRoom);
  const onAddItemRef = useRef(onAddItem);
  const setPromptResponseRef = useRef(setPromptResponse);
  onAddRoomRef.current = onAddRoom;
  onSetActiveRoomRef.current = onSetActiveRoom;
  onAddItemRef.current = onAddItem;
  setPromptResponseRef.current = setPromptResponse;

  const addParsedAction = useCallback((action: ParsedAction) => {
    setParsedActions((prev) => [...prev.slice(-19), action]);
  }, []);

  // Get current room name for display
  const currentRoom = visit.rooms.find((r) => r.id === activeRoomId);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnecting(false);
      setIsActive(true);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.success('Voice capture connected');
    },
    onDisconnect: () => {
      setIsActive(false);
      setIsConnecting(false);
    },
    onError: (error) => {
      setIsConnecting(false);
      setIsActive(false);
      toast.error('Voice error', {
        description: error.message || 'Connection failed',
      });
    },
    onMessage: (message) => {
      const msg = message as unknown as Record<string, unknown>;
      if (msg.type === 'user_transcript') {
        const event = msg.user_transcription_event as { user_transcript?: string } | undefined;
        setTranscript(event?.user_transcript || '');
      }
    },
    clientTools: {
      add_room: async (params: { roomType?: string; roomName: string }) => {
        const input = params.roomName || params.roomType || '';
        const { roomType, label } = mapRoomName(input);
        const roomId = onAddRoomRef.current(roomType, label);
        addParsedAction({ type: 'room_created', label: `${label} created` });
        return `Room "${label}" created with ID ${roomId}`;
      },

      add_item: async (params: {
        description: string;
        quantity?: number;
        unit?: string;
        notes?: string;
      }) => {
        const roomId = activeRoomIdRef.current;
        if (!roomId) {
          return 'No room selected. Please add or select a room first.';
        }
        onAddItemRef.current(roomId, {
          itemType: params.description,
          itemDescription: params.description,
          quantity: params.quantity || 1,
          unit: params.unit || 'nr',
          notes: params.notes,
        });
        const qty = params.quantity || 1;
        addParsedAction({
          type: 'item_added',
          label: `${params.description} x${qty}`,
        });
        return `Added ${qty}x ${params.description}`;
      },

      set_room: async (params: { roomName: string }) => {
        const target = params.roomName.toLowerCase().trim();
        const match = visitRef.current.rooms.find(
          (r) =>
            r.roomName.toLowerCase().includes(target) || target.includes(r.roomName.toLowerCase())
        );
        if (match) {
          onSetActiveRoomRef.current(match.id);
          addParsedAction({
            type: 'room_switched',
            label: `Switched to ${match.roomName}`,
          });
          return `Switched to room "${match.roomName}"`;
        }
        return `Room "${params.roomName}" not found. Available rooms: ${visitRef.current.rooms.map((r) => r.roomName).join(', ')}`;
      },

      answer_prompt: async (params: { promptKey: string; response: string }) => {
        setPromptResponseRef.current(
          params.promptKey,
          params.response,
          activeRoomIdRef.current ?? undefined,
          params.promptKey
        );
        addParsedAction({
          type: 'prompt_answered',
          label: `${params.promptKey}: ${params.response}`,
        });
        return `Prompt "${params.promptKey}" set to "${params.response}"`;
      },

      flag_issue: async (params: { issue: string; severity?: string }) => {
        addParsedAction({
          type: 'issue_flagged',
          label: params.issue,
          detail: params.severity,
        });
        return `Issue flagged: ${params.issue}`;
      },
    },
  });

  const startVoice = useCallback(async () => {
    if (isConnecting || isActive) return;
    setIsConnecting(true);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get agent ID from settings or use default
      let agentId = DEFAULT_SITE_SURVEY_AGENT_ID;
      try {
        const saved = await getSetting(SITE_SURVEY_AGENT_SETTINGS_KEY);
        if (saved) agentId = saved;
      } catch {
        // Use default
      }

      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { agentId },
      });

      if (error || !data?.token) {
        throw new Error(error?.message || 'Failed to get conversation token');
      }

      connectionTimeoutRef.current = setTimeout(() => {
        setIsConnecting(false);
        conversation.endSession();
        toast.error('Connection timed out');
      }, 15000);

      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

      // Send initial context
      setTimeout(() => {
        if (conversation.status === 'connected') {
          const context = [
            `Property type: ${visitRef.current.propertyType || 'Not set'}`,
            `Address: ${visitRef.current.propertyAddress || 'Not set'}`,
            `Rooms already captured: ${visitRef.current.rooms.map((r) => r.roomName).join(', ') || 'None'}`,
            `Current active room: ${currentRoom?.roomName || 'None'}`,
          ].join('\n');
          conversation.sendContextualUpdate(context);
        }
      }, 500);
    } catch (error) {
      setIsConnecting(false);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.error('Failed to connect', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, [conversation, isConnecting, isActive, currentRoom]);

  const stopVoice = useCallback(async () => {
    await conversation.endSession();
    setIsActive(false);
    setIsConnecting(false);
  }, [conversation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    };
  }, []);

  const actionIcon = (type: ParsedAction['type']) => {
    switch (type) {
      case 'room_created':
      case 'item_added':
      case 'prompt_answered':
        return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />;
      case 'room_switched':
        return <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />;
      case 'issue_flagged':
        return <AlertCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Status card */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            {isActive ? (
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            ) : isConnecting ? (
              <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
            )}
            <span className="text-sm font-medium text-white">
              {isActive ? 'Listening...' : isConnecting ? 'Connecting...' : 'Voice Capture'}
            </span>
          </div>

          {currentRoom && (
            <span className="text-xs text-white bg-white/10 px-2.5 py-1 rounded-full">
              {currentRoom.roomName}
            </span>
          )}
        </div>

        {/* Transcript */}
        {(isActive || transcript) && (
          <div className="p-3 border-t border-white/[0.06]">
            <p className="text-[11px] text-white mb-1 font-medium">Live Transcript</p>
            <p className="text-sm text-white min-h-[40px]">{transcript || 'Start speaking...'}</p>
          </div>
        )}

        {/* Parsed actions */}
        {parsedActions.length > 0 && (
          <div className="p-3 border-t border-white/[0.06] space-y-1.5">
            <p className="text-[11px] text-white font-medium">Parsed Items</p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {parsedActions.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {actionIcon(action.type)}
                  <span className="text-white">{action.label}</span>
                  {action.detail && <span className="text-white ml-auto">{action.detail}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connect / Stop button */}
      <button
        onClick={isActive ? stopVoice : startVoice}
        disabled={isConnecting}
        className={`w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition-all touch-manipulation ${
          isActive
            ? 'bg-red-500/20 border border-red-500/40 text-red-400 active:bg-red-500/30'
            : isConnecting
              ? 'bg-elec-yellow/10 border border-elec-yellow/30 text-white'
              : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 active:bg-emerald-500/30'
        }`}
      >
        {isConnecting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Connecting...
          </>
        ) : isActive ? (
          <>
            <MicOff className="h-5 w-5" />
            Stop Voice Capture
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" />
            Start Voice Capture
          </>
        )}
      </button>

      {/* Photo capture hint */}
      {isActive && (
        <button
          onClick={() => {
            toast.info('Photo capture', {
              description: 'Use the camera tab to snap photos during voice capture',
            });
          }}
          className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center gap-2 text-sm text-white touch-manipulation active:bg-white/[0.06]"
        >
          <Camera className="h-4 w-4" />
          Tap to snap a photo
        </button>
      )}

      {/* Summary of what's captured so far */}
      {visit.rooms.length > 0 && (
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <p className="text-[11px] text-white font-medium mb-2">Captured So Far</p>
          <div className="flex gap-4 text-xs text-white">
            <span>
              {visit.rooms.length} room{visit.rooms.length !== 1 ? 's' : ''}
            </span>
            <span>
              {visit.rooms.reduce((sum, r) => sum + r.items.length, 0)} item
              {visit.rooms.reduce((sum, r) => sum + r.items.length, 0) !== 1 ? 's' : ''}
            </span>
            <span>
              {visit.photos.length} photo{visit.photos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

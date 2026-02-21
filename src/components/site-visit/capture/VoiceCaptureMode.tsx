import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, Loader2, X, Plus, Minus, CheckCircle, Undo2 } from 'lucide-react';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useVoiceAutoProcess } from '@/hooks/useVoiceAutoProcess';
import { getAccessoryLabel } from '@/data/siteVisit/accessoryTypes';
import { toast } from 'sonner';
import type { SiteVisit, SiteVisitItem, SiteVisitPhoto, RoomType } from '@/types/siteVisit';

type Phase = 'idle' | 'capturing' | 'finishing';

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

/**
 * Format seconds as M:SS
 */
function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const VoiceCaptureMode = ({
  visit,
  activeRoomId,
  onAddRoom,
  onSetActiveRoom,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  setPromptResponse,
}: VoiceCaptureModeProps) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-process hook — handles buffering, silence detection, and edge function calls
  const autoProcess = useVoiceAutoProcess({
    visit,
    activeRoomId,
    onAddRoom,
    onSetActiveRoom,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    setPromptResponse,
  });

  // Speech hook — feeds final chunks to auto-process
  const speech = useSpeechToText({
    continuous: true,
    interimResults: true,
    onFinalChunk: useCallback(
      (chunk: string) => {
        autoProcess.feedChunk(chunk);
      },
      [autoProcess.feedChunk]
    ),
  });

  // --- Elapsed time counter ---
  useEffect(() => {
    if (phase === 'capturing') {
      setElapsed(0);
      elapsedRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    } else {
      if (elapsedRef.current) {
        clearInterval(elapsedRef.current);
        elapsedRef.current = null;
      }
    }
    return () => {
      if (elapsedRef.current) {
        clearInterval(elapsedRef.current);
      }
    };
  }, [phase]);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [speech.transcript, speech.interimTranscript]);

  // --- Phase transitions ---

  const handleStart = useCallback(() => {
    speech.resetTranscript();
    autoProcess.reset();
    speech.startListening();
    setPhase('capturing');
  }, [speech, autoProcess]);

  const handleDone = useCallback(async () => {
    speech.stopListening();
    setPhase('finishing');

    // Flush any remaining buffered text
    await autoProcess.flush();

    const totalItems = visit.rooms.reduce((s, r) => s + r.items.length, 0);
    if (totalItems > 0 || autoProcess.batchCount > 0) {
      toast.success(
        `Capture complete — ${visit.rooms.length} room${visit.rooms.length !== 1 ? 's' : ''}, ${totalItems} item${totalItems !== 1 ? 's' : ''}`
      );
    }

    setPhase('idle');
  }, [speech, autoProcess, visit]);

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
      {/* === IDLE STATE === */}
      {phase === 'idle' && (
        <>
          <div className="rounded-xl border border-white/10 p-6 text-center space-y-3">
            <Mic className="h-8 w-8 text-white mx-auto" />
            <p className="text-sm text-white">
              Tap to start. Walk through the property and describe what you see — rooms, items,
              quantities. Items appear in real time.
            </p>
          </div>
          <button
            onClick={handleStart}
            className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition-all touch-manipulation bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 active:bg-emerald-500/30"
          >
            <Mic className="h-5 w-5" />
            Start Capture
          </button>
        </>
      )}

      {/* === CAPTURING STATE === */}
      {(phase === 'capturing' || phase === 'finishing') && (
        <>
          {/* Status bar */}
          <div className="rounded-xl border border-emerald-500/30 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-emerald-500/[0.05]">
              <div className="flex items-center gap-2">
                {phase === 'finishing' ? (
                  <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span className="text-sm font-medium text-white">
                  {phase === 'finishing' ? 'Finishing...' : 'Listening'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {autoProcess.isProcessing && (
                  <div className="flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 text-elec-yellow animate-spin" />
                    <span className="text-[11px] text-white">Processing</span>
                  </div>
                )}
                <span className="text-xs text-white font-mono tabular-nums">
                  {formatElapsed(elapsed)}
                </span>
              </div>
            </div>

            {/* Live transcript */}
            <div className="p-3 border-t border-white/[0.06] max-h-[120px] overflow-y-auto">
              <p className="text-sm text-white leading-relaxed">
                {speech.transcript}
                {speech.interimTranscript && (
                  <span className="text-white/50">{speech.interimTranscript}</span>
                )}
                {!speech.transcript && !speech.interimTranscript && (
                  <span className="text-white/50">Start speaking...</span>
                )}
                <span ref={transcriptEndRef} />
              </p>
            </div>
          </div>

          {/* Error display */}
          {speech.error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
              <p className="text-sm text-white">{speech.error}</p>
            </div>
          )}

          {/* Live item feed — most recent first */}
          {autoProcess.confirmedItems.length > 0 && (
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] text-white font-medium">Live Feed</span>
                </div>
                <span className="text-[11px] text-white">
                  {autoProcess.confirmedItems.length} item
                  {autoProcess.confirmedItems.length !== 1 ? 's' : ''} confirmed
                </span>
              </div>
              <div className="border-t border-white/[0.06] max-h-[200px] overflow-y-auto divide-y divide-white/[0.04]">
                {autoProcess.confirmedItems.map((ci) => (
                  <div
                    key={ci.id}
                    className="flex items-center gap-2 px-3 py-2 animate-in fade-in slide-in-from-top-1 duration-300"
                  >
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex-shrink-0">
                      {ci.roomName}
                    </span>
                    <span className="text-xs text-white flex-1 min-w-0 truncate">
                      {ci.quantity > 1 ? `${ci.quantity}x ` : ''}
                      {ci.label}
                    </span>
                    <button
                      onClick={() => autoProcess.undoItem(ci.id)}
                      className="h-7 w-7 flex items-center justify-center rounded-lg touch-manipulation flex-shrink-0 active:bg-white/10"
                      aria-label={`Undo ${ci.label}`}
                    >
                      <Undo2 className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Done button */}
          {phase === 'capturing' && (
            <button
              onClick={handleDone}
              className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition-all touch-manipulation bg-white/10 border border-white/20 text-white active:bg-white/20"
            >
              <CheckCircle className="h-5 w-5" />
              Done
            </button>
          )}

          {phase === 'finishing' && (
            <div className="w-full h-14 rounded-xl flex items-center justify-center gap-3 text-base font-semibold bg-elec-yellow/10 border border-elec-yellow/30 text-white">
              <Loader2 className="h-5 w-5 animate-spin" />
              Finishing...
            </div>
          )}
        </>
      )}

      {/* === CAPTURED SO FAR — always visible when rooms exist === */}
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
                            onClick={() => handleCapturedQtyChange(item.id, -1, item.quantity)}
                            className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/[0.05] touch-manipulation active:bg-white/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 text-white" />
                          </button>
                          <span className="text-xs text-white w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleCapturedQtyChange(item.id, 1, item.quantity)}
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

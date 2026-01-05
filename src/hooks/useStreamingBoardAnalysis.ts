import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

// ============================================================================
// TYPES
// ============================================================================

interface DetectedCircuit {
  id: string;
  index: number;
  label_text: string;
  device: {
    category: string;
    type: string;
    rating_amps: number | null;
    curve: string | null;
    breaking_capacity_kA: number | null;
  };
  pictograms: Array<{ type: string; confidence: number }>;
  phase: '1P' | '3P';
  phases?: string[];
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
  source_model: string;
}

interface BoardInfo {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  spd_status: string;
  board_layout: string;
  estimated_total_ways: number;
  evidence: string;
}

interface StreamState {
  status: 'idle' | 'connecting' | 'streaming' | 'complete' | 'error';
  stage: string;
  stageMessage: string;
  board: BoardInfo | null;
  circuits: DetectedCircuit[];
  decisions: string[];
  warnings: string[];
  metadata: {
    analysisTime?: number;
    modelsUsed?: string[];
    imageCount?: number;
    circuitCount?: number;
    boardSize?: number;
  } | null;
  error: string | null;
  progress: number; // 0-100
}

type StreamEvent =
  | { type: 'stage'; stage: string; message: string }
  | { type: 'board'; data: BoardInfo }
  | { type: 'circuits_batch'; circuits: DetectedCircuit[] }
  | { type: 'circuit_update'; index: number; updates: Partial<DetectedCircuit> }
  | { type: 'warning'; message: string }
  | { type: 'decision'; message: string }
  | { type: 'complete'; metadata: any }
  | { type: 'error'; message: string };

// ============================================================================
// HOOK
// ============================================================================

export function useStreamingBoardAnalysis() {
  const [state, setState] = useState<StreamState>({
    status: 'idle',
    stage: '',
    stageMessage: '',
    board: null,
    circuits: [],
    decisions: [],
    warnings: [],
    metadata: null,
    error: null,
    progress: 0
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setState({
      status: 'idle',
      stage: '',
      stageMessage: '',
      board: null,
      circuits: [],
      decisions: [],
      warnings: [],
      metadata: null,
      error: null,
      progress: 0
    });
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setState(prev => ({
      ...prev,
      status: 'idle',
      stageMessage: 'Cancelled'
    }));
  }, []);

  const analyzeImages = useCallback(async (
    images: string[],
    hints?: {
      main_switch_side?: 'left' | 'right';
      expected_ways?: number;
      board_type?: 'domestic' | 'commercial' | 'industrial';
      is_three_phase?: boolean;
    },
    options?: {
      use_claude_ocr?: boolean;
      use_openai_components?: boolean;
      fast_mode?: boolean;
    }
  ): Promise<{ circuits: DetectedCircuit[]; board: BoardInfo | null; metadata: any }> => {
    // Reset state
    setState({
      status: 'connecting',
      stage: 'connecting',
      stageMessage: 'Connecting to AI...',
      board: null,
      circuits: [],
      decisions: [],
      warnings: [],
      metadata: null,
      error: null,
      progress: 5
    });

    // Create abort controller
    abortControllerRef.current = new AbortController();

    try {
      // Get the Supabase URL and anon key
      const supabaseUrl = (supabase as any).supabaseUrl ||
        import.meta.env.VITE_SUPABASE_URL ||
        'https://fyhfxlhbtyqjvcxavqwx.supabase.co';

      const supabaseKey = (supabase as any).supabaseKey ||
        import.meta.env.VITE_SUPABASE_ANON_KEY ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5aGZ4bGhidHlxanZjeGF2cXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODE2NDAsImV4cCI6MjA2MTg1NzY0MH0.VN3rlhSBDPMnuIffTMg__jtJ6lMiUKyrdBuosmv-u7E';

      // Make the streaming request
      const response = await fetch(`${supabaseUrl}/functions/v1/board-read-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey
        },
        body: JSON.stringify({ images, hints, options }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      setState(prev => ({ ...prev, status: 'streaming', progress: 10 }));

      // Read the SSE stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalCircuits: DetectedCircuit[] = [];
      let finalBoard: BoardInfo | null = null;
      let finalMetadata: any = null;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete events from buffer
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const event: StreamEvent = JSON.parse(line.slice(6));

              // Process each event type
              switch (event.type) {
                case 'stage':
                  const progressMap: Record<string, number> = {
                    'start': 10,
                    'gemini': 15,
                    'gemini_complete': 50,
                    'claude': 55,
                    'claude_complete': 75,
                    'openai': 80,
                    'openai_complete': 95
                  };
                  setState(prev => ({
                    ...prev,
                    stage: event.stage,
                    stageMessage: event.message,
                    progress: progressMap[event.stage] || prev.progress
                  }));
                  break;

                case 'board':
                  finalBoard = event.data;
                  setState(prev => ({
                    ...prev,
                    board: event.data,
                    progress: Math.max(prev.progress, 25)
                  }));
                  break;

                case 'circuits_batch':
                  const newCircuits = event.circuits.map((c, i) => ({
                    ...c,
                    id: `${c.index}-${Date.now()}-${i}`,
                    label_text: c.label_text || `Circuit ${c.index}`,
                    device: c.device || { category: 'MCB', type: '', rating_amps: null, curve: null, breaking_capacity_kA: null },
                    pictograms: c.pictograms || [],
                    phase: c.phase || '1P',
                    confidence: c.confidence || 'medium',
                    evidence: c.evidence || '',
                    source_model: c.source_model || 'unknown'
                  }));

                  setState(prev => {
                    // Merge new circuits, avoiding duplicates by index
                    const existingIndices = new Set(prev.circuits.map(c => c.index));
                    const uniqueNew = newCircuits.filter(c => !existingIndices.has(c.index));
                    const merged = [...prev.circuits, ...uniqueNew].sort((a, b) => a.index - b.index);
                    finalCircuits = merged;
                    return {
                      ...prev,
                      circuits: merged,
                      progress: Math.min(prev.progress + 5, 60)
                    };
                  });
                  break;

                case 'circuit_update':
                  setState(prev => {
                    const updated = prev.circuits.map(c => {
                      if (c.index === event.index) {
                        const newCircuit = {
                          ...c,
                          ...event.updates,
                          device: event.updates.device
                            ? { ...c.device, ...event.updates.device }
                            : c.device
                        };
                        return newCircuit;
                      }
                      return c;
                    });
                    finalCircuits = updated;
                    return { ...prev, circuits: updated };
                  });
                  break;

                case 'warning':
                  setState(prev => ({
                    ...prev,
                    warnings: [...prev.warnings, event.message]
                  }));
                  break;

                case 'decision':
                  setState(prev => ({
                    ...prev,
                    decisions: [...prev.decisions, event.message]
                  }));
                  break;

                case 'complete':
                  finalMetadata = event.metadata;
                  setState(prev => ({
                    ...prev,
                    status: 'complete',
                    metadata: event.metadata,
                    progress: 100
                  }));
                  break;

                case 'error':
                  setState(prev => ({
                    ...prev,
                    status: 'error',
                    error: event.message
                  }));
                  throw new Error(event.message);
              }
            } catch (parseError) {
              // Skip malformed events
              console.warn('Failed to parse SSE event:', line, parseError);
            }
          }
        }
      }

      return {
        circuits: finalCircuits,
        board: finalBoard,
        metadata: finalMetadata
      };

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // Request was aborted, don't set error state
        return { circuits: [], board: null, metadata: null };
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        status: 'error',
        error: errorMessage,
        stageMessage: `Error: ${errorMessage}`
      }));

      throw error;
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  return {
    ...state,
    analyzeImages,
    reset,
    abort,
    isStreaming: state.status === 'streaming',
    isComplete: state.status === 'complete',
    isError: state.status === 'error'
  };
}

export default useStreamingBoardAnalysis;

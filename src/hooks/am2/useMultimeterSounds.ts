/**
 * useMultimeterSounds
 *
 * Generates authentic multimeter and UI sounds via Web Audio API.
 * No external audio files needed — works offline, tiny footprint.
 *
 * Sounds:
 *  - continuityBeep:  2kHz sine tone, like a real meter on low Ω
 *  - probeTap:        Short tick when touching a test point
 *  - modeClick:       Rotary switch click when changing mode
 *  - irWhine:         Rising tone characteristic of insulation testers
 *  - abnormalAlert:   Three quick beeps for abnormal readings
 *  - successChime:    Ascending two-note for correct diagnosis
 *  - failBuzz:        Low descending tone for incorrect diagnosis
 *  - sessionStart:    Rising sweep for starting a session
 */

import { useCallback, useRef, useEffect } from 'react';

/** Master volume 0–1. Keep low so it's subtle, not jarring. */
const MASTER_VOLUME = 0.15;

export function useMultimeterSounds() {
  const ctxRef = useRef<AudioContext | null>(null);

  // Lazily create AudioContext on first interaction (browser policy)
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new AudioContext();
      } catch {
        return null;
      }
    }
    // Resume if suspended (autoplay policy)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  // --- Helper: play a simple tone ---
  const playTone = useCallback(
    (
      frequency: number,
      duration: number,
      type: OscillatorType = 'sine',
      volume = MASTER_VOLUME,
      delay = 0
    ) => {
      const ctx = getCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.value = frequency;

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration + 0.01);
    },
    [getCtx]
  );

  // --- Helper: noise burst (for clicks) ---
  const playNoiseBurst = useCallback(
    (duration: number, volume = MASTER_VOLUME) => {
      const ctx = getCtx();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.value = volume;

      // Bandpass to make it sound like a mechanical click
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2000;
      filter.Q.value = 1;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start();
    },
    [getCtx]
  );

  // ===== PUBLIC SOUNDS =====

  /** Continuity beep — 2kHz sine, 200ms. The real multimeter sound. */
  const continuityBeep = useCallback(() => {
    playTone(2000, 0.2, 'sine', MASTER_VOLUME * 0.8);
  }, [playTone]);

  /** Probe tap — short tick when touching a test point */
  const probeTap = useCallback(() => {
    playNoiseBurst(0.02, MASTER_VOLUME * 0.5);
  }, [playNoiseBurst]);

  /** Mode click — rotary switch click */
  const modeClick = useCallback(() => {
    playNoiseBurst(0.015, MASTER_VOLUME * 0.7);
    // Slight resonance after the click
    playTone(800, 0.03, 'sine', MASTER_VOLUME * 0.2, 0.015);
  }, [playNoiseBurst, playTone]);

  /** IR whine — rising tone characteristic of insulation resistance testers */
  const irWhine = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.4, ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.6, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, [getCtx]);

  /** Abnormal alert — three quick beeps */
  const abnormalAlert = useCallback(() => {
    playTone(1500, 0.08, 'square', MASTER_VOLUME * 0.4, 0);
    playTone(1500, 0.08, 'square', MASTER_VOLUME * 0.4, 0.12);
    playTone(1500, 0.08, 'square', MASTER_VOLUME * 0.4, 0.24);
  }, [playTone]);

  /** Success chime — ascending C5→E5 */
  const successChime = useCallback(() => {
    playTone(523, 0.15, 'sine', MASTER_VOLUME * 0.6, 0); // C5
    playTone(659, 0.25, 'sine', MASTER_VOLUME * 0.6, 0.12); // E5
  }, [playTone]);

  /** Fail buzz — low descending A3→F3 */
  const failBuzz = useCallback(() => {
    playTone(220, 0.2, 'sawtooth', MASTER_VOLUME * 0.3, 0); // A3
    playTone(175, 0.25, 'sawtooth', MASTER_VOLUME * 0.3, 0.15); // F3
  }, [playTone]);

  /** Session start — rising sweep */
  const sessionStart = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(MASTER_VOLUME * 0.5, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }, [getCtx]);

  return {
    continuityBeep,
    probeTap,
    modeClick,
    irWhine,
    abnormalAlert,
    successChime,
    failBuzz,
    sessionStart,
  };
}

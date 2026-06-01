/**
 * useVideoProgress
 *
 * Per-video playback progress for resume + "Continue watching".
 * Device-local (localStorage, user-keyed) — fast, offline-tolerant, and
 * avoids a schema change. Cross-device sync can layer on later by mirroring
 * to Supabase the way useVideoBookmarks does.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const BASE_KEY = 'elec-mate-video-progress';

// Below this we treat a video as "not really started" (ignore stray seeks);
// above COMPLETE_PCT it's effectively finished and drops off the resume rail.
const START_PCT = 5;
const COMPLETE_PCT = 95;

export interface VideoProgress {
  positionSeconds: number;
  durationSeconds: number;
  pct: number;
  completed: boolean;
  updatedAt: string;
}

type ProgressMap = Record<string, VideoProgress>;

export function useVideoProgress() {
  const { user } = useAuth();
  const key = useMemo(() => `${BASE_KEY}${user?.id ? `-${user.id}` : ''}`, [user]);
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    setProgress(storageGetJSONSync<ProgressMap>(key, {}));
  }, [key]);

  const saveProgress = useCallback(
    (videoId: string, positionSeconds: number, durationSeconds: number) => {
      if (!durationSeconds || durationSeconds < 1 || positionSeconds < 0) return;
      const pct = Math.min(100, Math.round((positionSeconds / durationSeconds) * 100));
      setProgress((prev) => {
        // Don't let a momentary seek-to-start wipe real progress
        const existing = prev[videoId];
        if (existing?.completed && pct < COMPLETE_PCT) return prev;
        const next: ProgressMap = {
          ...prev,
          [videoId]: {
            positionSeconds: Math.floor(positionSeconds),
            durationSeconds: Math.floor(durationSeconds),
            pct,
            completed: pct >= COMPLETE_PCT,
            updatedAt: new Date().toISOString(),
          },
        };
        storageSetJSONSync(key, next);
        return next;
      });
    },
    [key]
  );

  const markCompleted = useCallback(
    (videoId: string) => {
      setProgress((prev) => {
        const cur = prev[videoId];
        const dur = cur?.durationSeconds ?? 0;
        const next: ProgressMap = {
          ...prev,
          [videoId]: {
            positionSeconds: dur,
            durationSeconds: dur,
            pct: 100,
            completed: true,
            updatedAt: new Date().toISOString(),
          },
        };
        storageSetJSONSync(key, next);
        return next;
      });
    },
    [key]
  );

  const getProgress = useCallback((videoId: string) => progress[videoId], [progress]);

  // Started but not finished, most-recently-watched first
  const inProgressIds = useMemo(
    () =>
      Object.entries(progress)
        .filter(([, p]) => p.pct >= START_PCT && !p.completed)
        .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
        .map(([id]) => id),
    [progress]
  );

  return { progress, saveProgress, markCompleted, getProgress, inProgressIds };
}

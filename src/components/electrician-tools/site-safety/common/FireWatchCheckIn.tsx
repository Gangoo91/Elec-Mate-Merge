/**
 * FireWatchCheckIn
 *
 * Interval check-in prompt for active fire watches.
 * Captures photo + notes at regular intervals during the watch.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SafetyPhotoCapture } from './SafetyPhotoCapture';

interface CheckIn {
  timestamp: string;
  notes: string;
  photoUrl?: string;
  allClear: boolean;
}

interface FireWatchCheckInProps {
  onSubmit: (checkIn: CheckIn) => Promise<void>;
  intervalMinutes: number;
  checkInCount: number;
}

export function FireWatchCheckIn({
  onSubmit,
  intervalMinutes,
  checkInCount,
}: FireWatchCheckInProps) {
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (allClear: boolean) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        timestamp: new Date().toISOString(),
        notes: notes.trim(),
        photoUrl: photos[0] || undefined,
        allClear,
      });
      setNotes('');
      setPhotos([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-400" />
        <h4 className="text-sm font-bold text-amber-400">
          Check-In #{checkInCount + 1} — {intervalMinutes} min interval
        </h4>
      </div>

      <p className="text-xs text-white">
        Inspect the work area for signs of fire, smouldering, or excessive heat.
      </p>

      <Input
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Observations (optional)"
        className="h-11 text-sm bg-white/[0.03] border-white/[0.08] text-white touch-manipulation focus:border-amber-500"
      />

      <SafetyPhotoCapture
        photos={photos}
        onPhotosChange={setPhotos}
        label="Check-in photo (optional)"
        maxPhotos={1}
      />

      <div className="flex gap-2">
        <button
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
          className="flex-1 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-sm font-bold touch-manipulation active:scale-[0.97] disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          All Clear
        </button>
        <button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          className="flex-1 h-11 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-sm font-bold touch-manipulation active:scale-[0.97] disabled:opacity-40 flex items-center justify-center gap-2"
        >
          Issue Found
        </button>
      </div>
    </motion.div>
  );
}

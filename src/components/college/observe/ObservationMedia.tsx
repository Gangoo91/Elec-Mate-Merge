import { useEffect, useRef, useState } from 'react';
import { Camera, Captions, Check, FileAudio, Images, Loader2, Mic, Square, Video, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import { sha256OfBlob } from '@/lib/portfolio/contentHash';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import {
  EVIDENCE_MAX_BYTES,
  VIDEO_LIMIT_COPY,
  VIDEO_MAX_SECONDS,
  uploadWithProgress,
  videoDurationSeconds,
} from '@/lib/storage/uploadWithProgress';

/* ==========================================================================
   ObservationMedia — photos, video (up to 2 minutes) and recordings for an observation
   or professional discussion, uploaded the moment they are taken so a locked
   phone or a dropped signal loses nothing.

   Files go to the learner's own folder in the evidence bucket
   (portfolio-evidence/<learner>/observations/…), the same place their own
   evidence lives; the storage policy lets an assessor add only there. Each
   file carries its SHA-256 so the sent observation's fingerprint covers the
   bytes, the same as learner evidence (ELE-1865).
   ========================================================================== */

export interface ObservationFile {
  url: string;
  path: string;
  name: string;
  type: string;
  size: number;
  sha256: string | null;
}

const MAX_BYTES = EVIDENCE_MAX_BYTES; // the bucket's limit (100 MB)

const extOf = (name: string, type: string) => {
  const m = name.match(/\.([a-zA-Z0-9]+)$/);
  if (m) return m[1].toLowerCase();
  if (type.includes('webm')) return 'webm';
  if (type.includes('mp4')) return type.startsWith('audio') ? 'm4a' : 'mp4';
  if (type.includes('mpeg')) return 'mp3';
  if (type.includes('ogg')) return 'ogg';
  if (type.includes('png')) return 'png';
  return 'jpg';
};

const fmtSize = (b: number) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1048576).toFixed(1)} MB`);
const fmtClock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function ObservationMedia({
  learnerUserId,
  files,
  onChange,
  recorderLabel = 'Record a voice note',
  onTranscript,
  showRecorderFirst = false,
  onServerTranscript,
  observationId = null,
}: {
  learnerUserId: string;
  files: ObservationFile[];
  onChange: (next: ObservationFile[]) => void;
  recorderLabel?: string;
  /** Live words while recording (where the device can transcribe). */
  onTranscript?: (chunk: string) => void;
  /** A professional discussion leads with the recorder. */
  showRecorderFirst?: boolean;
  /**
   * Server transcription (transcribe-evidence-media). Offered on videos, and
   * on recordings when this device cannot transcribe live (e.g. Firefox).
   */
  onServerTranscript?: (text: string) => void;
  /** The saved draft, so the server also stores the words on it. */
  observationId?: string | null;
}) {
  const { toast } = useToast();
  // Uploads in flight: id → fraction sent (0–1), shown on the tiles.
  const [uploads, setUploads] = useState<Record<string, number>>({});
  const busy = Object.keys(uploads).length;
  const photoRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  const pickRef = useRef<HTMLInputElement | null>(null);
  const filesRef = useRef(files);
  filesRef.current = files;
  const liveSpeech = useSpeechToText({}).isSupported;
  const [transcribing, setTranscribing] = useState<Record<string, boolean>>({});
  const [transcribed, setTranscribed] = useState<Record<string, boolean>>({});

  const canTranscribe = (f: ObservationFile) =>
    !!onServerTranscript &&
    (f.type.startsWith('video/') || (f.type.startsWith('audio/') && !liveSpeech));

  const transcribe = async (f: ObservationFile) => {
    setTranscribing((t) => ({ ...t, [f.path]: true }));
    try {
      const { data, error } = await supabase.functions.invoke('transcribe-evidence-media', {
        body: { path: f.path, observation_id: observationId },
      });
      const res = (data ?? {}) as { transcript?: string; empty?: boolean; error?: string };
      if (error || res.error) {
        let msg = res.error;
        try {
          const ctx = (error as { context?: Response } | null)?.context;
          if (!msg && ctx) msg = ((await ctx.json()) as { error?: string }).error;
        } catch {
          /* keep the default */
        }
        throw new Error(msg || 'Could not transcribe that file. Try again, or type the key answers.');
      }
      if (res.empty || !res.transcript) {
        toast({ title: 'No speech found', description: `Nothing to transcribe in ${f.name}.` });
      } else {
        onServerTranscript?.(res.transcript);
        toast({ title: 'Transcribed', description: 'Added to the transcript. Check it reads right.' });
      }
      setTranscribed((t) => ({ ...t, [f.path]: true }));
    } catch (e) {
      toast({ title: 'Transcription failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setTranscribing((t) => {
        const next = { ...t };
        delete next[f.path];
        return next;
      });
    }
  };

  const upload = async (raw: File | Blob, name: string) => {
    let file: File | Blob = raw;
    const baseType = (raw.type || 'application/octet-stream').split(';')[0];
    if (baseType.startsWith('image/')) {
      try {
        file = await compressImageForUpload(raw as File);
      } catch {
        /* keep the original */
      }
    }
    if (file.size > MAX_BYTES) {
      toast({
        title: baseType.startsWith('video') ? 'That video is over 100 MB' : 'That file is over 100 MB',
        description: baseType.startsWith('video')
          ? 'Keep clips to 2 minutes. If your phone films in 4K, switch to 1080p.'
          : 'Try a smaller file.',
        variant: 'destructive',
      });
      return;
    }
    if (baseType.startsWith('video/')) {
      const secs = await videoDurationSeconds(file);
      if (secs != null && secs > VIDEO_MAX_SECONDS + 1) {
        toast({
          title: 'That video is over 2 minutes',
          description: 'Trim it to 2 minutes or less, or film it as two clips.',
          variant: 'destructive',
        });
        return;
      }
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setUploads((u) => ({ ...u, [id]: 0 }));
    try {
      const type = (file.type || baseType).split(';')[0];
      const path = `${learnerUserId}/observations/${id}.${extOf(name, type)}`;
      const [hash] = await Promise.all([
        sha256OfBlob(file),
        uploadWithProgress('portfolio-evidence', path, file, {
          contentType: type,
          onProgress: (f) => setUploads((u) => (id in u ? { ...u, [id]: f } : u)),
        }),
      ]);
      const { data: pub } = supabase.storage.from('portfolio-evidence').getPublicUrl(path);
      onChange([
        ...filesRef.current,
        { url: pub.publicUrl, path, name, type, size: file.size, sha256: hash },
      ]);
    } catch (e) {
      toast({
        title: 'Upload failed',
        description: (e as Error).message || 'Check your signal and try again.',
        variant: 'destructive',
      });
    } finally {
      setUploads((u) => {
        const next = { ...u };
        delete next[id];
        return next;
      });
    }
  };

  const onPick = (list: FileList | null) => {
    if (!list) return;
    Array.from(list)
      .slice(0, 10)
      .forEach((f) => void upload(f, f.name));
  };

  const recorder = (
    <AudioRecorder
      label={recorderLabel}
      onTranscript={onTranscript}
      onDone={(blob, seconds) =>
        void upload(blob, `Recording ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} (${fmtClock(seconds)})`)
      }
    />
  );

  const tile =
    'flex h-14 flex-col items-center justify-center gap-1 rounded-2xl border border-white/[0.14] bg-white/[0.05] text-[12.5px] font-semibold text-white transition-colors touch-manipulation active:bg-white/[0.1]';

  return (
    <div className="space-y-3">
      {showRecorderFirst && recorder}
      <div className="grid grid-cols-3 gap-2">
        <button type="button" className={tile} onClick={() => photoRef.current?.click()}>
          <Camera className="h-5 w-5 text-elec-yellow" aria-hidden /> Photo
        </button>
        <button type="button" className={tile} onClick={() => videoRef.current?.click()}>
          <Video className="h-5 w-5 text-elec-yellow" aria-hidden /> Video
        </button>
        <button type="button" className={tile} onClick={() => pickRef.current?.click()}>
          <Images className="h-5 w-5 text-elec-yellow" aria-hidden /> Library
        </button>
      </div>
      {!showRecorderFirst && recorder}
      <p className="text-[12px] leading-snug text-white">{VIDEO_LIMIT_COPY}</p>

      <input ref={photoRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => { onPick(e.target.files); e.target.value = ''; }} />
      <input ref={videoRef} type="file" accept="video/*" capture="environment" className="hidden"
        onChange={(e) => { onPick(e.target.files); e.target.value = ''; }} />
      <input ref={pickRef} type="file" accept="image/*,video/*,audio/*,application/pdf" multiple className="hidden"
        onChange={(e) => { onPick(e.target.files); e.target.value = ''; }} />

      {(files.length > 0 || busy > 0) && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {files.map((f) => (
            <li key={f.path} className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04]">
              {f.type.startsWith('image/') ? (
                <img src={f.url} alt={f.name} className="aspect-square w-full object-cover" loading="lazy" />
              ) : f.type.startsWith('video/') ? (
                <video src={f.url} className="aspect-square w-full object-cover" muted playsInline preload="metadata" />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-1 p-2 text-center">
                  <FileAudio className="h-6 w-6 text-elec-yellow" aria-hidden />
                  <span className="line-clamp-2 text-[12px] text-white">{f.name}</span>
                </div>
              )}
              <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 text-[12px] tabular-nums text-white">
                {fmtSize(f.size)}
              </span>
              <button
                type="button"
                onClick={() => onChange(filesRef.current.filter((x) => x.path !== f.path))}
                aria-label={`Remove ${f.name}`}
                className="absolute right-0 top-0 flex h-11 w-11 items-start justify-end p-1.5 touch-manipulation"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/75">
                  <X className="h-3.5 w-3.5 text-white" />
                </span>
              </button>
            </li>
          ))}
          {Object.entries(uploads).map(([id, frac]) => (
            <li
              key={`busy-${id}`}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.2] px-3"
            >
              <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" aria-hidden />
              <span className="text-[12px] font-semibold tabular-nums text-white">
                {Math.round(frac * 100)}%
              </span>
              <span
                className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.1]"
                role="progressbar"
                aria-label="Uploading"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(frac * 100)}
              >
                <span
                  className="block h-full rounded-full bg-elec-yellow transition-[width]"
                  style={{ width: `${Math.max(4, frac * 100)}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      )}

      {files.some(canTranscribe) && (
        <ul className="space-y-2">
          {files.filter(canTranscribe).map((f) => {
            const busyNow = !!transcribing[f.path];
            const done = !!transcribed[f.path];
            return (
              <li key={`tr-${f.path}`}>
                <button
                  type="button"
                  onClick={() => void transcribe(f)}
                  disabled={busyNow}
                  className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-white/[0.14] bg-white/[0.05] px-3 text-left text-[13px] font-semibold text-white touch-manipulation active:bg-white/[0.1] disabled:opacity-70"
                >
                  {busyNow ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-elec-yellow" aria-hidden />
                  ) : done ? (
                    <Check className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                  ) : (
                    <Captions className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    {busyNow ? 'Transcribing' : done ? 'Transcribed' : 'Transcribe'}: {f.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── Recorder ───────────────────────────────────────────────────────── */

function pickMime() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const m of ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg']) {
    try {
      if (MediaRecorder.isTypeSupported(m)) return m;
    } catch {
      /* next */
    }
  }
  return '';
}

function AudioRecorder({
  label,
  onDone,
  onTranscript,
}: {
  label: string;
  onDone: (blob: Blob, seconds: number) => void;
  onTranscript?: (chunk: string) => void;
}) {
  const { toast } = useToast();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const tick = useRef<number | null>(null);
  const speech = useSpeechToText({
    continuous: true,
    onFinalChunk: (chunk) => {
      const t = chunk.trim();
      if (t) onTranscript?.(t);
    },
  });
  const supported = typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && pickMime() !== null;

  useEffect(
    () => () => {
      if (tick.current) window.clearInterval(tick.current);
      recRef.current?.stream.getTracks().forEach((t) => t.stop());
    },
    []
  );

  if (!supported) return null;

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = pickMime() || undefined;
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const secs = Math.round((Date.now() - started.current) / 1000);
        const blob = new Blob(chunks.current, { type: (rec.mimeType || mime || 'audio/webm').split(';')[0] });
        if (blob.size > 0) onDone(blob, secs);
      };
      rec.start(1000);
      recRef.current = rec;
      started.current = Date.now();
      setSeconds(0);
      setRecording(true);
      tick.current = window.setInterval(() => setSeconds(Math.round((Date.now() - started.current) / 1000)), 500);
      if (onTranscript && speech.isSupported) speech.startListening();
    } catch {
      toast({
        title: 'No microphone',
        description: 'Allow the microphone for Elec-Mate in your phone settings, then try again.',
        variant: 'destructive',
      });
    }
  };

  const stop = () => {
    if (tick.current) window.clearInterval(tick.current);
    tick.current = null;
    recRef.current?.stop();
    recRef.current = null;
    setRecording(false);
    if (speech.isListening) speech.stopListening();
  };

  return (
    <button
      type="button"
      onClick={() => (recording ? stop() : void start())}
      aria-pressed={recording}
      className={cn(
        'flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold transition-colors touch-manipulation active:scale-[0.99]',
        recording ? 'bg-red-500 text-white' : 'border border-white/[0.14] bg-white/[0.05] text-white'
      )}
    >
      {recording ? (
        <>
          <Square className="h-4 w-4" aria-hidden />
          Stop recording <span className="tabular-nums">{fmtClock(seconds)}</span>
        </>
      ) : (
        <>
          <Mic className="h-5 w-5 text-elec-yellow" aria-hidden /> {label}
        </>
      )}
    </button>
  );
}

import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pill,
  Field,
  PrimaryButton,
  IconButton,
  Eyebrow,
  selectTriggerClass,
  selectContentClass,
} from "@/components/college/primitives";

interface VoiceEvidenceCaptureProps {
  studentName?: string;
  context?: "observation" | "professional-discussion" | "witness-statement" | "general";
  onRecordingComplete?: (data: {
    audioBlob: Blob | null;
    duration: number;
    transcription: string;
    context: string;
  }) => void;
  compact?: boolean;
}

// Simulated transcription phrases for demo
const sampleTranscriptions = {
  "observation": [
    "The apprentice demonstrated safe isolation procedures before commencing work on the consumer unit. They correctly identified the supply, isolated using the main switch, and verified using an approved voltage indicator. The apprentice then applied lock-off devices and warning labels as per best practice.",
    "During today's observation, the apprentice successfully completed the installation of a new lighting circuit. They showed good understanding of cable sizing requirements, correctly selected appropriate protective devices, and demonstrated neat workmanship throughout.",
    "I observed the apprentice carrying out insulation resistance testing on a new installation. They correctly set up the test instrument, ensured the installation was isolated, and recorded results in line with BS 7671 requirements.",
  ],
  "professional-discussion": [
    "When asked about their approach to fault finding, the apprentice explained a systematic methodology starting with visual inspection, gathering information from the customer, and using appropriate test instruments. They demonstrated good knowledge of common fault types and how to identify them.",
    "The apprentice discussed their understanding of the requirements for earthing and bonding. They correctly explained the difference between main and supplementary bonding, and could identify appropriate conductor sizes based on supply characteristics.",
    "In discussing safe working practices, the apprentice showed awareness of relevant health and safety legislation including the Electricity at Work Regulations. They explained the importance of risk assessments and demonstrated understanding of permit to work systems.",
  ],
  "witness-statement": [
    "I confirm that the apprentice completed the installation of the distribution board safely and to a professional standard. All connections were correctly made and the installation passed all required tests.",
    "The apprentice assisted with the installation of emergency lighting in accordance with BS 5266. They demonstrated understanding of the different system types and testing requirements.",
    "During the cable containment installation, the apprentice showed good technical ability and worked safely at all times. They correctly calculated bend radii and maintained proper support spacing.",
  ],
  "general": [
    "Recording of practical work completed on site today. The apprentice demonstrated competence in the required skills and worked safely throughout.",
    "Evidence submission for workplace activity. The apprentice completed the assigned task to the required standard.",
    "General observation notes recorded for portfolio evidence.",
  ],
};

export function VoiceEvidenceCapture({
  studentName = "",
  context = "general",
  onRecordingComplete,
  compact = false,
}: VoiceEvidenceCaptureProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedContext, setSelectedContext] = useState(context);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const contextOptions = [
    { value: "observation", label: "Workplace Observation" },
    { value: "professional-discussion", label: "Professional Discussion" },
    { value: "witness-statement", label: "Witness Statement" },
    { value: "general", label: "General Evidence" },
  ];

  useEffect(() => {
    // Check for microphone permission on mount
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => setHasPermission(true))
        .catch(() => setHasPermission(false));
    } else {
      setHasPermission(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      setHasPermission(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setHasPermission(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const clearRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setTranscription("");
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const transcribeAudio = () => {
    setIsTranscribing(true);

    // Simulate AI transcription with delay
    setTimeout(() => {
      const contextSamples = sampleTranscriptions[selectedContext as keyof typeof sampleTranscriptions];
      const randomIndex = Math.floor(Math.random() * contextSamples.length);
      const transcribedText = contextSamples[randomIndex];

      setTranscription(transcribedText);
      setIsTranscribing(false);

      onRecordingComplete?.({
        audioBlob,
        duration: recordingTime,
        transcription: transcribedText,
        context: selectedContext,
      });
    }, 2000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (compact) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <Eyebrow>VOICE EVIDENCE</Eyebrow>
            <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-white tracking-tight">Voice capture</h3>
          </div>
          <Pill tone="yellow">AI</Pill>
        </div>
        <p className="mt-3 text-[13px] text-white leading-relaxed">
          Record observations and discussions with automatic transcription
        </p>
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <span className="text-sm text-white">Record &amp; transcribe</span>
          <span className="text-[13px] font-medium text-elec-yellow/90">→</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
      <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Eyebrow>VOICE EVIDENCE</Eyebrow>
          <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">Voice evidence capture</h3>
        </div>
        <Pill tone="yellow">AI Transcription</Pill>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
        {/* Permission Warning */}
        {hasPermission === false && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" aria-hidden />
              <div className="text-xs text-red-400">
                <p className="font-medium">Microphone access required</p>
                <p className="mt-1">Please allow microphone access in your browser to record audio evidence.</p>
              </div>
            </div>
          </div>
        )}

        {/* Context Selection */}
        <Field label="Evidence Type">
          <Select value={selectedContext} onValueChange={setSelectedContext}>
            <SelectTrigger id="context" className={selectTriggerClass}>
              <SelectValue placeholder="Select evidence type" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              {contextOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Recording Interface */}
        <div className="p-5 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
          {/* Timer Display */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isRecording && (
                <div className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-red-400 animate-pulse'}`} aria-hidden />
              )}
              <span className="text-3xl font-mono font-semibold tabular-nums text-white tracking-tight">
                {formatTime(recordingTime)}
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white">
              {isRecording ? (isPaused ? "Paused" : "Recording") : audioBlob ? "Complete" : "Ready to record"}
            </p>
          </div>

          {/* Recording Controls */}
          <div className="flex items-center justify-center gap-3">
            {!isRecording && !audioBlob && (
              <PrimaryButton onClick={startRecording} disabled={hasPermission === false}>
                <span className="h-2 w-2 rounded-full bg-black mr-2" aria-hidden />
                Start Recording
                <span aria-hidden className="ml-2">→</span>
              </PrimaryButton>
            )}

            {isRecording && (
              <>
                <IconButton onClick={pauseRecording} aria-label={isPaused ? "Resume" : "Pause"}>
                  <span aria-hidden className="text-base">{isPaused ? "▶" : "‖"}</span>
                </IconButton>
                <IconButton
                  onClick={stopRecording}
                  aria-label="Stop"
                  className="border-red-500/40 text-red-400 hover:text-red-300 hover:border-red-400"
                >
                  <span aria-hidden className="text-base">■</span>
                </IconButton>
              </>
            )}

            {audioBlob && !isRecording && (
              <>
                <IconButton onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>
                  <span aria-hidden className="text-base">{isPlaying ? "‖" : "▶"}</span>
                </IconButton>
                <IconButton
                  onClick={clearRecording}
                  aria-label="Delete"
                  className="text-red-400 hover:text-red-300"
                >
                  <span aria-hidden className="text-base">×</span>
                </IconButton>
              </>
            )}
          </div>

          {/* Hidden audio element for playback */}
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          )}
        </div>

        {/* Audio Visualization (placeholder) */}
        {isRecording && (
          <div className="h-16 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] flex items-center justify-center px-4">
            <div className="flex items-end gap-1 h-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-elec-yellow rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Transcribe Button */}
        {audioBlob && !isRecording && (
          <PrimaryButton fullWidth onClick={transcribeAudio} disabled={isTranscribing}>
            {isTranscribing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-elec-yellow/30 border-t-elec-yellow animate-spin mr-2" aria-hidden />
                Transcribing with AI...
              </>
            ) : transcription ? (
              <>
                <span aria-hidden className="mr-2">⟳</span>
                Re-transcribe
              </>
            ) : (
              <>
                Transcribe with AI
                <span aria-hidden className="ml-2">→</span>
              </>
            )}
          </PrimaryButton>
        )}

        {/* Transcription Result */}
        {transcription && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <Eyebrow>TRANSCRIPTION</Eyebrow>
                <h4 className="mt-1 text-base font-semibold text-white tracking-tight">AI output</h4>
              </div>
              <Pill tone="green">Complete</Pill>
            </div>
            <div className="p-4 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
              <p className="text-sm whitespace-pre-wrap text-white leading-relaxed">{transcription}</p>
            </div>

            {/* Recording Info */}
            <div className="flex items-center gap-4 text-[11.5px] text-white">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden />
                <span>Duration: {formatTime(recordingTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden />
                <span>Type: {contextOptions.find(o => o.value === selectedContext)?.label}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {!audioBlob && !isRecording && (
          <div className="p-4 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
            <Eyebrow>TIPS</Eyebrow>
            <p className="mt-1.5 text-sm font-medium text-white">Recording tips</p>
            <ul className="mt-3 space-y-1.5 text-[12.5px] text-white">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 shrink-0" aria-hidden />
                Find a quiet environment with minimal background noise
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 shrink-0" aria-hidden />
                Speak clearly and at a moderate pace
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 shrink-0" aria-hidden />
                Include specific details about the work being observed
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 shrink-0" aria-hidden />
                Reference assessment criteria where relevant
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

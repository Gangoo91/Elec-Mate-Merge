import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  Trash2,
  FileAudio,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Loader2,
  Volume2,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Mic className="h-4 w-4 text-elec-yellow" />
            Voice Evidence
            <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px]">AI</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Record observations and discussions with automatic transcription
          </p>
          <div className="flex items-center justify-between p-2 rounded-lg bg-background border border-border">
            <div className="flex items-center gap-2">
              <FileAudio className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">Record & transcribe</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-elec-yellow" />
          Voice Evidence Capture
          <Badge className="bg-elec-yellow/20 text-elec-yellow">AI Transcription</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Permission Warning */}
        {hasPermission === false && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <div className="text-xs text-destructive">
                <p className="font-medium">Microphone access required</p>
                <p className="mt-1">Please allow microphone access in your browser to record audio evidence.</p>
              </div>
            </div>
          </div>
        )}

        {/* Context Selection */}
        <div>
          <Label htmlFor="context">Evidence Type</Label>
          <Select value={selectedContext} onValueChange={setSelectedContext}>
            <SelectTrigger id="context" className="mt-1">
              <SelectValue placeholder="Select evidence type" />
            </SelectTrigger>
            <SelectContent>
              {contextOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recording Interface */}
        <div className="p-4 rounded-lg bg-background border border-border">
          {/* Timer Display */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isRecording && (
                <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`} />
              )}
              <span className="text-3xl font-mono font-bold">
                {formatTime(recordingTime)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isRecording ? (isPaused ? "Paused" : "Recording...") : audioBlob ? "Recording complete" : "Ready to record"}
            </p>
          </div>

          {/* Recording Controls */}
          <div className="flex items-center justify-center gap-3">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                disabled={hasPermission === false}
                className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                <Mic className="h-4 w-4" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={pauseRecording}
                  className="h-10 w-10"
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={stopRecording}
                  className="h-10 w-10"
                >
                  <Square className="h-4 w-4" />
                </Button>
              </>
            )}

            {audioBlob && !isRecording && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayback}
                  className="h-10 w-10"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={clearRecording}
                  className="h-10 w-10 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
          <div className="h-16 rounded-lg bg-background border border-border flex items-center justify-center px-4">
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
          <Button
            onClick={transcribeAudio}
            disabled={isTranscribing}
            className="w-full gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
          >
            {isTranscribing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Transcribing with AI...
              </>
            ) : transcription ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Re-transcribe
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Transcribe with AI
              </>
            )}
          </Button>
        )}

        {/* Transcription Result */}
        {transcription && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Transcription
              </h3>
              <Badge className="bg-success/20 text-success">Complete</Badge>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-sm whitespace-pre-wrap">{transcription}</p>
            </div>

            {/* Recording Info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Duration: {formatTime(recordingTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileAudio className="h-3 w-3" />
                <span>Type: {contextOptions.find(o => o.value === selectedContext)?.label}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {!audioBlob && !isRecording && (
          <div className="p-3 rounded-lg bg-info/10 border border-info/20">
            <div className="flex items-start gap-2">
              <Volume2 className="h-4 w-4 text-info mt-0.5 shrink-0" />
              <div className="text-xs text-info">
                <p className="font-medium mb-1">Recording Tips:</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Find a quiet environment with minimal background noise</li>
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Include specific details about the work being observed</li>
                  <li>Reference assessment criteria where relevant</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

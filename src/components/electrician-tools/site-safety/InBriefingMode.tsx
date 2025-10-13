import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Play,
  Pause,
  StopCircle,
  Camera,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  PenTool,
  FileText
} from "lucide-react";

interface InBriefingModeProps {
  briefing: any;
  onComplete: () => void;
  onExit: () => void;
}

export const InBriefingMode = ({ briefing, onComplete, onExit }: InBriefingModeProps) => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [attendees, setAttendees] = useState<Array<{ name: string; signed: boolean; timestamp?: string }>>([]);
  const [newAttendeeName, setNewAttendeeName] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const sections = [
    { id: 'intro', title: 'Introduction', required: true },
    { id: 'scope', title: 'Work Scope', required: true },
    { id: 'hazards', title: 'Hazard Briefing', required: true },
    { id: 'ppe', title: 'PPE Requirements', required: true },
    { id: 'qa', title: 'Q&A', required: false },
    { id: 'sign-off', title: 'Sign-Off', required: true },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    setIsRunning(true);
    try {
      await supabase
        .from('team_briefings')
        .update({
          status: 'in_progress',
          presentation_started_at: new Date().toISOString()
        })
        .eq('id', briefing.id);
    } catch (error) {
      console.error('Error starting briefing:', error);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Resumed" : "Paused",
      description: isPaused ? "Briefing timer resumed" : "Briefing timer paused",
    });
  };

  const handleAddAttendee = () => {
    if (!newAttendeeName.trim()) return;
    
    setAttendees(prev => [...prev, {
      name: newAttendeeName.trim(),
      signed: false,
    }]);
    setNewAttendeeName("");
    
    toast({
      title: "Attendee Added",
      description: `${newAttendeeName} added to briefing`,
    });
  };

  const handleSignAttendee = (index: number) => {
    setAttendees(prev => prev.map((att, i) => 
      i === index 
        ? { ...att, signed: true, timestamp: new Date().toISOString() }
        : att
    ));
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleComplete = async () => {
    if (attendees.filter(a => a.signed).length === 0) {
      toast({
        title: "Cannot Complete",
        description: "At least one attendee must sign off",
        variant: "destructive",
      });
      return;
    }

    try {
      await supabase
        .from('team_briefings')
        .update({
          status: 'completed',
          completed: true,
          presentation_ended_at: new Date().toISOString(),
          duration_minutes: Math.ceil(elapsedTime / 60),
          attendees: attendees,
          attendee_signatures: attendees.map(a => ({
            name: a.name,
            timestamp: a.timestamp || new Date().toISOString(),
          })),
          notes: notes,
        })
        .eq('id', briefing.id);

      toast({
        title: "Briefing Completed",
        description: "Team briefing completed successfully",
      });

      onComplete();
    } catch (error: any) {
      console.error('Error completing briefing:', error);
      toast({
        title: "Error",
        description: "Failed to complete briefing",
        variant: "destructive",
      });
    }
  };

  const handleExit = () => {
    if (elapsedTime > 30) {
      // Save draft
      supabase
        .from('team_briefings')
        .update({
          notes: notes,
          attendees: attendees,
        })
        .eq('id', briefing.id);
    }
    onExit();
  };

  const progressPercent = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-elec-yellow/20 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-elec-light">{briefing.briefing_name}</h2>
              <p className="text-sm text-elec-light/60">{briefing.location}</p>
            </div>
            <MobileButton
              variant="ghost"
              size="icon"
              onClick={handleExit}
              icon={<X className="h-5 w-5" />}
            />
          </div>

          {/* Timer and Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="text-2xl font-mono font-bold text-elec-light">
                {formatTime(elapsedTime)}
              </span>
              {isPaused && (
                <Badge className="bg-orange-500/20 text-orange-400 border-0">
                  Paused
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              {!isRunning ? (
                <MobileButton
                  onClick={handleStart}
                  variant="elec"
                  size="default"
                  icon={<Play className="h-4 w-4" />}
                >
                  Start
                </MobileButton>
              ) : (
                <>
                  <MobileButton
                    onClick={handlePause}
                    variant="outline"
                    size="icon"
                    icon={isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  />
                  <MobileButton
                    onClick={handleComplete}
                    variant="elec"
                    size="default"
                    icon={<CheckCircle2 className="h-4 w-4" />}
                  >
                    Complete
                  </MobileButton>
                </>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-elec-light/60 mb-1">
              <span>Section {currentSection + 1} of {sections.length}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Section Navigation */}
        <Card className="bg-card/50 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              Briefing Sections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                  currentSection === index
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40'
                    : 'bg-card border border-transparent hover:border-elec-yellow/20'
                }`}
              >
                <span className={`font-medium ${
                  currentSection === index ? 'text-elec-yellow' : 'text-elec-light'
                }`}>
                  {section.title}
                </span>
                {section.required && (
                  <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">
                    Required
                  </Badge>
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Attendees Management */}
        <Card className="bg-card/50 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Attendees ({attendees.filter(a => a.signed).length}/{attendees.length} signed)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newAttendeeName}
                onChange={(e) => setNewAttendeeName(e.target.value)}
                placeholder="Attendee name..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddAttendee()}
                className="bg-card border-primary/30 text-elec-light"
              />
              <MobileButton onClick={handleAddAttendee} variant="elec">
                Add
              </MobileButton>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {attendees.map((attendee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-primary/20"
                >
                  <span className="text-elec-light font-medium">{attendee.name}</span>
                  {attendee.signed ? (
                    <Badge className="bg-green-500/20 text-green-400 border-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Signed
                    </Badge>
                  ) : (
                    <MobileButton
                      size="sm"
                      variant="elec-outline"
                      onClick={() => handleSignAttendee(index)}
                      icon={<PenTool className="h-3 w-3" />}
                    >
                      Sign
                    </MobileButton>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="bg-card/50 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow" />
              Briefing Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes, observations, or action items during the briefing..."
              className="min-h-32 bg-card border-primary/30 text-elec-light"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

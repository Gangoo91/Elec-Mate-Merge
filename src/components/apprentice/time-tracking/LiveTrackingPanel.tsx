import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRealtimeTracking } from "@/hooks/time-tracking/useRealtimeTracking";
import { Play, Pause, Square, Clock, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const LiveTrackingPanel = () => {
  const { activeSession, startSession, endSession, pauseSession, isLoading } = useRealtimeTracking();
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [activityType, setActivityType] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const isMobile = useIsMobile();

  // Calculate elapsed time
  const getElapsedTime = () => {
    if (!activeSession?.start_time) return "00:00";
    
    const start = new Date(activeSession.start_time);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
  };

  const handleStartSession = async () => {
    if (!activityType.trim()) return;
    
    await startSession(activityType, undefined, undefined, location);
    setShowStartDialog(false);
    setActivityType("");
    setLocation("");
  };

  const handleEndSession = async () => {
    if (activeSession) {
      await endSession(activeSession.id, notes);
      setShowEndDialog(false);
      setNotes("");
    }
  };

  const activityTypes = [
    "Study Centre Learning",
    "Online Course",
    "Video Tutorial",
    "Reading Technical Documentation",
    "Practical Exercises",
    "Portfolio Development",
    "Research",
    "Other"
  ];

  if (isLoading) {
    return (
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse h-4 w-4 bg-elec-yellow/50 rounded-full" />
            <span className="text-elec-light">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-elec-light flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Live Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeSession ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Active
                </Badge>
                <p className="text-sm text-elec-light/70 mt-1">
                  {activeSession.activity_type}
                </p>
                {activeSession.location && (
                  <p className="text-xs text-elec-light/50 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {activeSession.location}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono text-elec-yellow">
                  {getElapsedTime()}
                </div>
                <p className="text-xs text-elec-light/50">elapsed</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={pauseSession}
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-elec-gray border-elec-yellow/20">
                  <DialogHeader>
                    <DialogTitle className="text-elec-light">End Session</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-elec-light/70 mb-2">
                        Session: {activeSession.activity_type}
                      </p>
                      <p className="text-sm text-elec-light/70 mb-4">
                        Duration: {getElapsedTime()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-elec-light">Notes (optional)</label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this session..."
                        className="bg-elec-dark border-elec-yellow/20 text-elec-light"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowEndDialog(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleEndSession}
                        className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        End Session
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-elec-light/70">
              No active tracking session
            </p>
            <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Tracking
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-elec-gray border-elec-yellow/20">
                <DialogHeader>
                  <DialogTitle className="text-elec-light">Start New Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-elec-light">Activity Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {activityTypes.map((type) => (
                        <Button
                          key={type}
                          variant={activityType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActivityType(type)}
                          className={activityType === type ? "bg-elec-yellow text-elec-dark" : ""}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                    {activityType === "Other" && (
                      <Input
                        placeholder="Specify activity..."
                        value={activityType === "Other" ? "" : activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20 text-elec-light"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-elec-light">Location (optional)</label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Study Centre, Home, Library"
                      className="bg-elec-dark border-elec-yellow/20 text-elec-light"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowStartDialog(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleStartSession}
                      disabled={!activityType.trim()}
                      className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                    >
                      Start Session
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveTrackingPanel;
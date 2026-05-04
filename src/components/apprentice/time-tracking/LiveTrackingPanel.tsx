import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRealtimeTracking } from '@/hooks/time-tracking/useRealtimeTracking';
import { Play, Pause, Square, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const LiveTrackingPanel = () => {
  const { activeSession, startSession, endSession, pauseSession, isLoading } =
    useRealtimeTracking();
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const isMobile = useIsMobile();

  // Calculate elapsed time
  const getElapsedTime = () => {
    if (!activeSession?.start_time) return '00:00';

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
    setActivityType('');
    setLocation('');
  };

  const handleEndSession = async () => {
    if (activeSession) {
      await endSession(activeSession.id, notes);
      setShowEndDialog(false);
      setNotes('');
    }
  };

  const activityTypes = [
    'Study Centre Learning',
    'Online Course',
    'Video Tutorial',
    'Reading Technical Documentation',
    'Practical Exercises',
    'Portfolio Development',
    'Research',
    'Other',
  ];

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-center space-x-2">
          <div className="animate-pulse h-4 w-4 bg-white/[0.04] rounded-full" />
          <span className="text-[14px] text-white/85">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Live tracking
      </span>

      {activeSession ? (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full animate-pulse" />
                <span className="text-[11px] text-white/85">Active</span>
              </div>
              <p className="text-[14px] text-white/85 mt-2 leading-relaxed">
                {activeSession.activity_type}
              </p>
              {activeSession.location && (
                <p className="text-[11px] text-white/55 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {activeSession.location}
                </p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-mono text-elec-yellow">{getElapsedTime()}</div>
              <p className="text-[11px] text-white/55">elapsed</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={pauseSession}
              className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 h-11 border-red-500/30 text-red-300 hover:bg-red-500/[0.08] touch-manipulation"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background border-white/[0.06]">
                <DialogHeader>
                  <DialogTitle className="text-white">End session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[13px] text-white/70">
                      Session: {activeSession.activity_type}
                    </p>
                    <p className="text-[13px] text-white/70 font-mono">
                      Duration: {getElapsedTime()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] text-white/85">Notes (optional)</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this session..."
                      className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowEndDialog(false)}
                      className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEndSession}
                      className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                    >
                      End session
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[14px] text-white/55 leading-relaxed">No active tracking session</p>
          <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
            <DialogTrigger asChild>
              <Button className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
                <Play className="h-4 w-4 mr-2" />
                Start tracking
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background border-white/[0.06]">
              <DialogHeader>
                <DialogTitle className="text-white">Start new session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] text-white/85">Activity type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {activityTypes.map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() => setActivityType(type)}
                        className={`h-10 touch-manipulation ${
                          activityType === type
                            ? 'bg-elec-yellow text-black border-elec-yellow hover:bg-elec-yellow/90'
                            : 'border-white/15 text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                  {activityType === 'Other' && (
                    <Input
                      placeholder="Specify activity..."
                      value={activityType === 'Other' ? '' : activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] text-white/85">Location (optional)</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Study Centre, Home, Library"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowStartDialog(false)}
                    className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleStartSession}
                    disabled={!activityType.trim()}
                    className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
                  >
                    Start session
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default LiveTrackingPanel;

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OJTHubShell } from '@/components/ojt-hub/OJTHubShell';
import { OJTDashboard } from '@/components/ojt-hub/OJTDashboard';
import { OJTNavSection } from '@/components/ojt-hub/OJTHubNav';
import { TimeSection } from './sections/TimeSection';
import { EvidenceSection } from './sections/EvidenceSection';
import { AssessmentsSection } from './sections/AssessmentsSection';
import { GoalsSection } from './sections/GoalsSection';
import { useAuth } from '@/contexts/AuthContext';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ACTIVITY_TYPES = [
  { value: 'workshop', label: 'Workshop Training' },
  { value: 'college', label: 'College Session' },
  { value: 'online', label: 'Online Learning' },
  { value: 'practical', label: 'Practical Assessment' },
  { value: 'study', label: 'Self Study' },
  { value: 'site-visit', label: 'Site Visit/Tour' },
  { value: 'mentoring', label: 'Mentoring Session' },
  { value: 'safety', label: 'Safety Training' },
];

/**
 * OJTHub - Main unified page for OJT management
 *
 * Routes:
 * - /apprentice/ojt-hub (default: dashboard)
 * - /apprentice/ojt-hub?section=time
 * - /apprentice/ojt-hub?section=evidence
 * - /apprentice/ojt-hub?section=assessments
 * - /apprentice/ojt-hub?section=goals
 */
export default function OJTHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Get section from URL or default to 'home'
  const sectionParam = searchParams.get('section') as OJTNavSection | null;
  const [activeSection, setActiveSection] = useState<OJTNavSection>(sectionParam || 'home');

  // Quick log state
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [quickLogData, setQuickLogData] = useState({
    activity: '',
    type: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Data hooks
  const { entries, totalTime, addTimeEntry, isLoading: entriesLoading } = useTimeEntries();
  const { otjGoal, isLoading: complianceLoading } = useComplianceTracking();

  // Sync URL with active section - use replace: false to create history entries for back button
  useEffect(() => {
    if (activeSection === 'home') {
      searchParams.delete('section');
    } else {
      searchParams.set('section', activeSection);
    }
    setSearchParams(searchParams, { replace: false });
  }, [activeSection]);

  // Sync active section with URL on mount
  useEffect(() => {
    if (sectionParam && ['home', 'time', 'evidence', 'assessments', 'goals'].includes(sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, []);

  const handleSectionChange = (section: OJTNavSection) => {
    setActiveSection(section);
  };

  const handleQuickLog = () => {
    setShowQuickLog(true);
  };

  const handleStartTimer = () => {
    setActiveSection('time');
    // Timer will be handled in TimeSection
  };

  const handleSubmitQuickLog = async () => {
    if (!quickLogData.activity || !quickLogData.duration) {
      toast({
        title: 'Missing information',
        description: 'Please fill in activity and duration',
        variant: 'destructive',
      });
      return;
    }

    const durationMinutes = parseFloat(quickLogData.duration) * 60;

    await addTimeEntry({
      date: quickLogData.date,
      duration: durationMinutes,
      activity: quickLogData.activity,
      notes: quickLogData.notes,
    });

    toast({
      title: 'Time logged',
      description: `${quickLogData.duration}h added successfully`,
    });

    setQuickLogData({
      activity: '',
      type: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setShowQuickLog(false);
  };

  // Calculate progress data
  const weeklyHours = getWeeklyHours(entries);
  const weeklyTarget = 7.5;

  const yearlyHours = Math.round(totalTime.hours + totalTime.minutes / 60);
  const yearlyTarget = otjGoal?.target_hours || 400;

  // Recent sessions for dashboard
  const recentSessions = entries.slice(0, 5).map((entry) => ({
    id: entry.id,
    activity: entry.activity,
    duration: entry.duration,
    date: new Date(entry.date),
    type: entry.isAutomatic ? 'Auto' : 'Manual',
  }));

  // Pending tasks (mock for now)
  const pendingTasks = {
    evidence: 2,
    assessments: 1,
    goals: 3,
  };

  // Get user display name
  const userName = profile?.full_name
    ? profile.full_name
    : user?.email?.split('@')[0] || 'Apprentice';

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <OJTDashboard
            userName={userName}
            weeklyProgress={{ current: weeklyHours, target: weeklyTarget }}
            yearlyProgress={{ current: yearlyHours, target: yearlyTarget }}
            recentSessions={recentSessions}
            pendingTasks={pendingTasks}
            onNavigate={handleSectionChange}
            onQuickLog={handleQuickLog}
            onStartTimer={handleStartTimer}
          />
        );
      case 'time':
        return <TimeSection />;
      case 'evidence':
        return <EvidenceSection />;
      case 'assessments':
        return <AssessmentsSection />;
      case 'goals':
        return <GoalsSection />;
      default:
        return null;
    }
  };

  return (
    <>
      <OJTHubShell
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        showQuickLog={activeSection === 'home'}
        onQuickLog={handleQuickLog}
      >
        {renderSectionContent()}
      </OJTHubShell>

      {/* Quick Log Sheet */}
      <Sheet open={showQuickLog} onOpenChange={setShowQuickLog}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl safe-bottom">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4 touch-manipulation" />
          <SheetHeader>
            <SheetTitle>Quick Log</SheetTitle>
            <SheetDescription>
              Quickly log your off-the-job training time
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            {/* Activity Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Type</label>
              <Select
                value={quickLogData.type}
                onValueChange={(value) => {
                  const type = ACTIVITY_TYPES.find((t) => t.value === value);
                  setQuickLogData({
                    ...quickLogData,
                    type: value,
                    activity: type?.label || '',
                  });
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Activity Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="What did you work on?"
                value={quickLogData.activity}
                onChange={(e) =>
                  setQuickLogData({ ...quickLogData, activity: e.target.value })
                }
                className="h-11 touch-manipulation"
              />
            </div>

            {/* Duration & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (hours)</label>
                <Input
                  type="number"
                  step="0.5"
                  min="0.5"
                  placeholder="e.g., 2.5"
                  value={quickLogData.duration}
                  onChange={(e) =>
                    setQuickLogData({ ...quickLogData, duration: e.target.value })
                  }
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={quickLogData.date}
                  onChange={(e) =>
                    setQuickLogData({ ...quickLogData, date: e.target.value })
                  }
                  className="h-11 touch-manipulation"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea
                placeholder="Any additional details..."
                value={quickLogData.notes}
                onChange={(e) =>
                  setQuickLogData({ ...quickLogData, notes: e.target.value })
                }
                rows={2}
                className="touch-manipulation"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-20 sm:pb-8">
              <Button
                variant="outline"
                onClick={() => setShowQuickLog(false)}
                className="flex-1 h-12 touch-manipulation active:scale-95"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitQuickLog}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
              >
                Log Time
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

// Helper: Get hours logged this week
function getWeeklyHours(entries: any[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  return entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + e.duration / 60, 0);
}

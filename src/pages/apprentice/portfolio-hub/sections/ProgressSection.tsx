import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Clock,
  Target,
  Calendar,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Send,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react';
import { ProgressRing, MiniProgressRing } from '@/components/portfolio-hub/ProgressRings';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { QualificationProgress } from '@/components/apprentice/portfolio/QualificationProgress';
import { QualificationRequirements } from '@/components/apprentice/portfolio/QualificationRequirements';
import { parseEvidencedACs } from '@/utils/parseEvidencedACs';
import { useSendVerification } from '@/hooks/portfolio/useSendVerification';

/**
 * ProgressSection - KSB tracking, OTJ hours, OJT training log
 */
export function ProgressSection() {
  const { categories, entries, analytics } = useUltraFastPortfolio();
  const { otjGoal, getRemainingHours } = useComplianceTracking();
  const { entries: timeEntries, totalTime } = useTimeEntries();
  const { qualificationCode, qualificationName } = useStudentQualification();
  const { sendVerification, isSending } = useSendVerification();
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

  // Build set of evidenced ACs using shared parser
  const evidencedACs = parseEvidencedACs(entries);

  const currentHours = Math.round(otjGoal?.current_hours || 0);
  const targetHours = otjGoal?.target_hours || 400;
  const remainingHours = getRemainingHours();
  const otjPercent = targetHours > 0 ? Math.round((currentHours / targetHours) * 100) : 0;

  const totalRequired = categories.reduce((sum, cat) => sum + (cat.requiredEntries || 0), 0);
  const totalCompleted = analytics?.completedEntries || 0;
  const portfolioPercent =
    totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0;

  // Compute weekly training minutes from time entries
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weeklyMinutes = timeEntries
    .filter((e) => new Date(e.date) >= weekAgo)
    .reduce((sum, e) => sum + e.duration, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Progress Tracker</h1>
        <p className="text-sm text-muted-foreground">Monitor your apprenticeship journey</p>
      </div>

      {/* Main Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* OTJ Hours Card */}
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-500" />
              20% Off-the-Job Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ProgressRing percentage={otjPercent} size="lg" color="#a855f7" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Logged</span>
                  <span className="font-semibold text-foreground">{currentHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-semibold text-foreground">{targetHours}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span
                    className={cn(
                      'font-semibold',
                      remainingHours > 100 ? 'text-amber-500' : 'text-green-500'
                    )}
                  >
                    {remainingHours}h
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Progress Card */}
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              Portfolio Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ProgressRing percentage={portfolioPercent} size="lg" color="#22c55e" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-foreground">{totalCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Required</span>
                  <span className="font-semibold text-foreground">{totalRequired}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-amber-500">
                    {entries.filter((e) => e.status === 'in-progress').length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Qualification Requirements Progress */}
      {qualificationCode && (
        <>
          <QualificationProgress
            qualificationCode={qualificationCode}
            qualificationName={qualificationName}
            evidencedACs={evidencedACs}
          />

          {/* View Requirements button */}
          <button
            onClick={() => setRequirementsOpen(true)}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
          >
            <BookOpen className="h-4 w-4" />
            View Full Requirements
          </button>

          <QualificationRequirements
            open={requirementsOpen}
            onOpenChange={setRequirementsOpen}
            qualificationCode={qualificationCode}
            evidencedACs={evidencedACs}
          />
        </>
      )}

      {/* OJT Training Log */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-purple-500" />
            OJT Training Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timeEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No training entries yet. Log your first OJT activity to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {timeEntries.slice(0, 20).map((entry) => {
                const isExpanded = expandedEntryId === entry.id;
                const isVerified = entry.is_supervisor_verified === true;
                const durationHours = Math.floor(entry.duration / 60);
                const durationMins = entry.duration % 60;
                const formattedDate = new Date(entry.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <div key={entry.id} className="rounded-lg border border-border overflow-hidden">
                    <button
                      onClick={() => setExpandedEntryId(isExpanded ? null : entry.id)}
                      className="w-full flex items-center gap-3 p-3 text-left touch-manipulation active:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {entry.activity || 'Training activity'}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{formattedDate}</span>
                          <span className="text-xs text-muted-foreground">
                            {durationHours > 0 ? `${durationHours}h ` : ''}
                            {durationMins > 0 ? `${durationMins}m` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Verification status badge */}
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] shrink-0',
                          isVerified
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        )}
                      >
                        {isVerified ? 'Verified' : 'Unverified'}
                      </Badge>

                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-border space-y-3">
                        {entry.notes && <p className="text-xs text-white">{entry.notes}</p>}

                        <div className="flex gap-2">
                          {!isVerified && (
                            <button
                              onClick={() =>
                                sendVerification(entry.id, 'time_entry', {
                                  activity: entry.activity,
                                  date: entry.date,
                                  duration: entry.duration,
                                  notes: entry.notes,
                                })
                              }
                              disabled={isSending}
                              className={cn(
                                'flex-1 flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-medium touch-manipulation transition-all active:scale-[0.98]',
                                'bg-blue-500/10 border border-blue-500/25 text-blue-400',
                                isSending && 'opacity-50'
                              )}
                            >
                              <Send className="h-4 w-4" />
                              {isSending ? 'Sending...' : 'Send for Verification'}
                            </button>
                          )}
                          {isVerified && (
                            <div className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-medium bg-green-500/10 border border-green-500/25 text-green-400">
                              <ShieldCheck className="h-4 w-4" />
                              Verified by Supervisor
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* KSB Category Progress */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-elec-yellow" />
            KSB Category Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const catEntries = entries.filter((e) => e.category?.id === category.id);
              const completed = catEntries.filter((e) => e.status === 'completed').length;
              const required = category.requiredEntries || 3;
              const percent = Math.round((completed / required) * 100);

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MiniProgressRing
                        percentage={percent}
                        color={percent >= 100 ? '#22c55e' : '#FACC15'}
                      />
                      <span className="text-sm font-medium text-foreground line-clamp-1">
                        {category.name}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        percent >= 100
                          ? 'bg-green-500/10 text-green-500 border-green-500/20'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {completed}/{required}
                    </Badge>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        percent >= 100 ? 'bg-green-500' : 'bg-elec-yellow'
                      )}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-500">
                {(weeklyMinutes / 60).toFixed(1)}h
              </p>
              <p className="text-xs text-muted-foreground">Training Hours</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-500">
                {
                  entries.filter((e) => {
                    const created = new Date(e.dateCreated);
                    return created >= weekAgo;
                  }).length
                }
              </p>
              <p className="text-xs text-muted-foreground">New Evidence</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-500">
                {entries.filter((e) => e.status === 'pending_review').length}
              </p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-amber-500">
                {7.5 - weeklyMinutes / 60 > 0 ? (7.5 - weeklyMinutes / 60).toFixed(1) : '0'}h
              </p>
              <p className="text-xs text-muted-foreground">Hours Needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProgressSection;

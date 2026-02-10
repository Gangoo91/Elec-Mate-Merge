import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { ProgressRing, MiniProgressRing } from '@/components/portfolio-hub/ProgressRings';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { QualificationProgress } from '@/components/apprentice/portfolio/QualificationProgress';
import { QualificationRequirements } from '@/components/apprentice/portfolio/QualificationRequirements';

/**
 * ProgressSection - KSB tracking, OTJ hours, timeline view
 *
 * Phase 4 will enhance with:
 * - Visual KSB matrix
 * - Gap analysis
 * - Milestone celebrations
 * - Projections
 */
export function ProgressSection() {
  const { categories, entries, analytics } = useUltraFastPortfolio();
  const { otjGoal, getRemainingHours } = useComplianceTracking();
  const { totalTime, weeklyTime, timeEntries } = useTimeEntries();
  const { qualificationCode, qualificationName } = useStudentQualification();
  const [requirementsOpen, setRequirementsOpen] = useState(false);

  // Build set of evidenced ACs from portfolio entries (same logic as PortfolioHub)
  const evidencedACs = useMemo(() => {
    const set = new Set<string>();
    for (const pe of entries) {
      for (const ac of pe.assessmentCriteria || []) {
        const acMatch = ac.match(/\bAC\s+(\S+)/);
        if (!acMatch) continue;
        const acCode = acMatch[1];
        const primaryUnit = ac.match(/^(\S+)/)?.[1];
        if (primaryUnit) set.add(`${primaryUnit}.${acCode}`);
        const parenUnit = ac.match(/\(Unit\s+(\S+)\)/i);
        if (parenUnit) set.add(`${parenUnit[1]}.${acCode}`);
      }
    }
    return set;
  }, [entries]);

  const currentHours = Math.round(otjGoal?.current_hours || 0);
  const targetHours = otjGoal?.target_hours || 400;
  const remainingHours = getRemainingHours();
  const otjPercent = targetHours > 0 ? Math.round((currentHours / targetHours) * 100) : 0;

  const totalRequired = categories.reduce((sum, cat) => sum + (cat.requiredEntries || 0), 0);
  const totalCompleted = analytics?.completedEntries || 0;
  const portfolioPercent =
    totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
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
              <p className="text-2xl font-bold text-purple-500">{(weeklyTime / 60).toFixed(1)}h</p>
              <p className="text-xs text-muted-foreground">Training Hours</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-500">
                {
                  entries.filter((e) => {
                    const created = new Date(e.dateCreated);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return created >= weekAgo;
                  }).length
                }
              </p>
              <p className="text-xs text-muted-foreground">New Evidence</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-500">2</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-amber-500">
                {7.5 - weeklyTime / 60 > 0 ? (7.5 - weeklyTime / 60).toFixed(1) : '0'}h
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

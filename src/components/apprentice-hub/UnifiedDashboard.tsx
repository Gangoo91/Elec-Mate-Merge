/**
 * UnifiedDashboard
 *
 * Home tab — smart course-focused dashboard.
 * Shows greeting, course overview, unit progress with LOs/ACs,
 * quick actions, and recent activity.
 */

import { useState } from 'react';
import {
  Clock,
  Briefcase,
  Target,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  FileCheck,
  Timer,
  Plus,
  GraduationCap,
  BookOpen,
  Layers,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { ApprenticeHubTab } from './ApprenticeHubNav';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';

interface UnifiedDashboardProps {
  onNavigate: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

export function UnifiedDashboard({ onNavigate, onCapture }: UnifiedDashboardProps) {
  const { user, profile } = useAuth();
  const { entries: portfolioEntries } = usePortfolioData();
  const { actionRequiredCount } = usePortfolioComments();
  const { entries: timeEntries, totalTime } = useTimeEntries();
  const { otjGoal } = useComplianceTracking();
  const { userSelection, loading: qualLoading } = useQualifications();
  const { requirementCode, isLoading: studentLoading } = useStudentQualification();
  const { tree, isLoading: acLoading } = useQualificationACs(requirementCode);

  const [showCourseSelector, setShowCourseSelector] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  // Stats
  const portfolioTotal = portfolioEntries?.length || 0;
  const portfolioCompleted =
    portfolioEntries?.filter((e) => e.status === 'completed' || e.status === 'reviewed').length ||
    0;

  const yearlyHours = Math.round(totalTime.hours + totalTime.minutes / 60);
  const yearlyTarget = otjGoal?.target_hours || 400;
  const yearlyPercent = Math.round((yearlyHours / yearlyTarget) * 100);

  const weeklyHours = getWeeklyHours(timeEntries || []);
  const weeklyTarget = 7.5;
  const weeklyPercent = Math.round((weeklyHours / weeklyTarget) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const fullName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const firstName = fullName.split(' ')[0];

  const toggleUnit = (unitCode: string) => {
    const next = new Set(expandedUnits);
    if (next.has(unitCode)) {
      next.delete(unitCode);
    } else {
      next.add(unitCode);
    }
    setExpandedUnits(next);
  };

  // No course selected
  if (!userSelection && !qualLoading) {
    return (
      <div className="px-5 py-6 space-y-6 lg:px-6 lg:max-w-4xl lg:mx-auto">
        <div>
          <h2 className="text-xl font-bold text-white">
            {getGreeting()}, {firstName}
          </h2>
          <p className="text-sm text-white/70 mt-1">Select your qualification to get started</p>
        </div>
        <QualificationSelector />
      </div>
    );
  }

  return (
    <div className="px-5 py-6 space-y-6 lg:px-6 lg:max-w-4xl lg:mx-auto">
      {/* Greeting + Course header */}
      <div>
        <h2 className="text-xl font-bold text-white">
          {getGreeting()}, {firstName}
        </h2>
        {userSelection && (
          <button
            onClick={() => setShowCourseSelector(true)}
            className="flex items-center gap-2 mt-2 touch-manipulation active:opacity-70"
          >
            <GraduationCap className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <span className="text-sm text-white/80 truncate max-w-[240px]">
              {userSelection.qualification?.title}
            </span>
            <span className="text-xs text-elec-yellow font-semibold whitespace-nowrap">Change</span>
          </button>
        )}
      </div>

      {/* No-data guard */}
      {userSelection && !acLoading && !studentLoading && tree.totalACs === 0 && (
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-orange-500/30 bg-orange-500/10">
          <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              No curriculum data for this course yet.
            </p>
            <button
              onClick={() => setShowCourseSelector(true)}
              className="text-sm text-orange-300 font-semibold mt-1.5 touch-manipulation"
            >
              Switch to a supported course
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onCapture}
          className="h-14 rounded-2xl bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-sm touch-manipulation active:scale-[0.97] transition-transform shadow-lg shadow-elec-yellow/20"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Evidence
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate('hours')}
          className="h-14 rounded-2xl font-semibold text-sm touch-manipulation active:scale-[0.97] transition-transform border-white/15 bg-white/[0.04]"
        >
          <Timer className="h-5 w-5 mr-2" />
          Log Time
        </Button>
      </div>

      {/* Progress Overview — stats row */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onNavigate('work')}
          className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left touch-manipulation active:scale-[0.97] transition-all"
        >
          <Briefcase className="h-5 w-5 text-elec-yellow mb-2" />
          <p className="text-lg font-bold text-white">
            {portfolioCompleted}/{portfolioTotal}
          </p>
          <p className="text-xs text-white/60">Portfolio</p>
        </button>
        <button
          onClick={() => onNavigate('hours')}
          className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left touch-manipulation active:scale-[0.97] transition-all"
        >
          <Clock
            className={cn(
              'h-5 w-5 mb-2',
              weeklyPercent >= 100 ? 'text-green-400' : 'text-blue-400'
            )}
          />
          <p className="text-lg font-bold text-white">{weeklyHours.toFixed(1)}h</p>
          <p className="text-xs text-white/60">This Week</p>
        </button>
        <button
          onClick={() => onNavigate('hours')}
          className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left touch-manipulation active:scale-[0.97] transition-all"
        >
          <Target className="h-5 w-5 text-blue-400 mb-2" />
          <p className="text-lg font-bold text-white">{yearlyHours}h</p>
          <p className="text-xs text-white/60">Yearly OJT</p>
        </button>
      </div>

      {/* Course Requirements — Units with LOs & ACs */}
      {(acLoading || studentLoading) && userSelection && (
        <div className="flex items-center justify-center py-8">
          <div className="h-5 w-5 border-2 border-elec-yellow border-t-transparent rounded-full animate-spin" />
          <span className="ml-2 text-sm text-white/60">Loading course data...</span>
        </div>
      )}
      {tree.totalACs > 0 && (
        <div className="space-y-4">
          {/* Section header with stats */}
          <div>
            <h3 className="text-base font-bold text-white">Course Requirements</h3>
            <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-elec-yellow" />
                {tree.units.length} units
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-green-400" />
                {tree.totalACs} ACs
              </span>
            </div>
          </div>

          {/* Units accordion */}
          <div className="space-y-2">
            {tree.units.map((unit) => {
              const totalUnitACs = unit.learningOutcomes.reduce(
                (sum, lo) => sum + lo.assessmentCriteria.length,
                0
              );

              return (
                <Collapsible
                  key={unit.unitCode}
                  open={expandedUnits.has(unit.unitCode)}
                  onOpenChange={() => toggleUnit(unit.unitCode)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        'w-full text-left p-4 rounded-2xl transition-all',
                        'bg-white/[0.03] border border-white/[0.08]',
                        'hover:border-white/[0.15] active:scale-[0.99] touch-manipulation',
                        expandedUnits.has(unit.unitCode) && 'border-elec-yellow/30 bg-white/[0.05]'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'p-1.5 rounded-lg mt-0.5 flex-shrink-0',
                            expandedUnits.has(unit.unitCode)
                              ? 'bg-elec-yellow/20'
                              : 'bg-white/[0.06]'
                          )}
                        >
                          {expandedUnits.has(unit.unitCode) ? (
                            <ChevronDown className="h-4 w-4 text-elec-yellow" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-white/50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white leading-tight">
                            {unit.unitTitle}
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            {unit.unitCode} · {unit.learningOutcomes.length} outcomes ·{' '}
                            {totalUnitACs} ACs
                          </p>
                        </div>
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-4 mr-1 mt-2 mb-1 space-y-4">
                      {unit.learningOutcomes.map((lo) => (
                        <div key={`${unit.unitCode}-${lo.loNumber}`} className="space-y-2">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs font-medium text-blue-400 leading-snug">
                              LO{lo.loNumber}: {lo.loText}
                            </p>
                          </div>
                          <div className="space-y-1.5 ml-5">
                            {lo.assessmentCriteria.map((ac) => (
                              <div
                                key={ac.acFullRef}
                                className="flex items-start gap-2 text-xs text-white/70"
                              >
                                <span className="text-elec-yellow/60 flex-shrink-0 mt-px">•</span>
                                <span>
                                  <span className="font-medium text-white/90">{ac.acRef}</span>{' '}
                                  {ac.acText.replace(`${ac.acRef} `, '')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {portfolioEntries && portfolioEntries.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Activity</h3>
            <button
              onClick={() => onNavigate('work')}
              className="text-xs text-elec-yellow font-medium touch-manipulation flex items-center gap-0.5"
            >
              View All <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2">
            {portfolioEntries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="p-2 rounded-xl bg-white/[0.06]">
                  <FileCheck className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{entry.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">
                    {formatRelativeDate(new Date(entry.dateCreated))}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'text-[10px] px-2 py-0.5',
                    entry.status === 'completed' || entry.status === 'reviewed'
                      ? 'border-green-500/30 text-green-400'
                      : entry.status === 'in-progress'
                        ? 'border-blue-500/30 text-blue-400'
                        : 'border-white/20 text-white/60'
                  )}
                >
                  {entry.status || 'draft'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Selector Sheet */}
      <Sheet open={showCourseSelector} onOpenChange={setShowCourseSelector}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader className="pb-4">
            <SheetTitle>Change Qualification</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto pb-20 sm:pb-8">
            <QualificationSelector />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function getWeeklyHours(entries: any[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  return entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + (e.duration || 0) / 60, 0);
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default UnifiedDashboard;

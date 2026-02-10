/**
 * UnifiedDashboard
 *
 * Home tab — smart course-focused dashboard.
 * Shows greeting, course overview, unit progress with LOs/ACs,
 * quick actions, and recent activity.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { PortfolioEntry } from '@/types/portfolio';
import { useHaptics } from '@/hooks/useHaptics';
import { useAuth } from '@/contexts/AuthContext';
import { XPProgressRing } from '@/components/apprentice/XPProgressRing';
import { useLearningXP } from '@/hooks/useLearningXP';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { ApprenticeHubTab } from './ApprenticeHubNav';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';

interface UnifiedDashboardProps {
  onNavigate: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

/** Mini progress ring for unit AC coverage */
function ProgressRing({
  progress,
  size = 28,
  strokeWidth = 2.5,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(progress, 1) * circumference);

  return (
    <svg
      width={size}
      height={size}
      className="flex-shrink-0 -rotate-90"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={progress >= 1 ? '#4ade80' : '#facc15'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.1 }}
      />
    </svg>
  );
}

/** Thumbnail for evidence files */
function EvidenceThumbnail({ entry }: { entry: PortfolioEntry }) {
  const imageFile = entry.evidenceFiles?.find((f) =>
    f.type?.startsWith('image/') || f.url?.match(/\.(jpg|jpeg|png|webp|gif)$/i)
  );

  if (imageFile?.url) {
    return (
      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/[0.06] flex-shrink-0">
        <img
          src={imageFile.url}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="p-2 rounded-xl bg-white/[0.06] flex-shrink-0">
      <FileCheck className="h-4 w-4 text-white/70" />
    </div>
  );
}

export function UnifiedDashboard({ onNavigate, onCapture }: UnifiedDashboardProps) {
  const { user, profile } = useAuth();
  const haptics = useHaptics();
  const xp = useLearningXP();
  const { entries: portfolioEntries } = usePortfolioData();
  const { actionRequiredCount } = usePortfolioComments();
  const { entries: timeEntries, totalTime } = useTimeEntries();
  const { otjGoal } = useComplianceTracking();
  const { userSelection, loading: qualLoading } = useQualifications();
  const courseCode = userSelection?.qualification?.code ?? null;
  const { tree, isLoading: acLoading } = useQualificationACs(courseCode);

  const [showCourseSelector, setShowCourseSelector] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [selectedAC, setSelectedAC] = useState<{ code: string; text: string } | null>(null);
  const [showACEvidence, setShowACEvidence] = useState(false);

  // Build AC → evidence lookup from portfolio entries
  const acEvidenceMap = useMemo(() => {
    const map = new Map<string, PortfolioEntry[]>();
    if (!portfolioEntries) return map;
    for (const entry of portfolioEntries) {
      if (entry.assessmentCriteria && entry.assessmentCriteria.length > 0) {
        for (const acCode of entry.assessmentCriteria) {
          if (!map.has(acCode)) {
            map.set(acCode, []);
          }
          map.get(acCode)!.push(entry);
        }
      }
    }
    return map;
  }, [portfolioEntries]);

  // Overall AC progress
  const { evidencedCount, overallPercent } = useMemo(() => {
    const allACs = tree.units.flatMap(u =>
      u.learningOutcomes.flatMap(lo => lo.assessmentCriteria)
    );
    const count = allACs.filter(
      ac => acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)
    ).length;
    const pct = tree.totalACs > 0 ? Math.round((count / tree.totalACs) * 100) : 0;
    return { evidencedCount: count, overallPercent: pct };
  }, [tree, acEvidenceMap]);

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
    haptics.tap();
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
          <div className="mt-2 space-y-1.5">
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white leading-snug">
                {userSelection.qualification?.title}
              </p>
            </div>
            <button
              onClick={() => setShowCourseSelector(true)}
              className="ml-6 text-xs text-elec-yellow font-semibold touch-manipulation active:opacity-70 h-8 flex items-center"
            >
              Change Qualification
            </button>
          </div>
        )}
      </div>

      {/* No-data guard */}
      {userSelection && !acLoading && !qualLoading && tree.totalACs === 0 && (
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

      {/* Overall AC Progress */}
      {tree.totalACs > 0 && (
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
          <div className="flex items-baseline justify-between">
            <span
              className={cn(
                'text-3xl font-bold',
                overallPercent >= 75
                  ? 'text-green-400'
                  : overallPercent >= 25
                    ? 'text-amber-400'
                    : 'text-red-400'
              )}
            >
              {overallPercent}%
            </span>
            <span className="text-xs text-white/60">
              {evidencedCount} of {tree.totalACs} ACs evidenced · {tree.totalACs - evidencedCount} remaining
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full',
                overallPercent >= 75
                  ? 'bg-green-400'
                  : overallPercent >= 25
                    ? 'bg-amber-400'
                    : 'bg-red-400'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${overallPercent}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.1 }}
            />
          </div>
        </div>
      )}

      {/* Course Requirements — Units with LOs & ACs */}
      {(acLoading || qualLoading) && userSelection && (
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
                {evidencedCount}/{tree.totalACs} ACs evidenced
              </span>
            </div>
          </div>

          {/* Units accordion */}
          <div className="space-y-2">
            {tree.units.map((unit) => {
              const allUnitACs = unit.learningOutcomes.flatMap(
                (lo) => lo.assessmentCriteria
              );
              const totalUnitACs = allUnitACs.length;
              const evidencedUnitACs = allUnitACs.filter(
                (ac) => acEvidenceMap.has(ac.acRef) || acEvidenceMap.has(ac.acFullRef)
              ).length;

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
                        {/* Progress ring */}
                        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                          <ProgressRing
                            progress={totalUnitACs > 0 ? evidencedUnitACs / totalUnitACs : 0}
                          />
                          <span
                            className={cn(
                              'text-[10px] font-medium',
                              evidencedUnitACs === totalUnitACs && totalUnitACs > 0
                                ? 'text-green-400'
                                : 'text-white/50'
                            )}
                          >
                            {evidencedUnitACs}/{totalUnitACs}
                          </span>
                        </div>
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-4 mr-1 mt-2 mb-1 space-y-4 text-left">
                      {unit.learningOutcomes.map((lo) => (
                        <div key={`${unit.unitCode}-${lo.loNumber}`} className="space-y-2">
                          <div className="flex items-start gap-2 text-left">
                            <BookOpen className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs font-medium text-white leading-snug text-left">
                              LO{lo.loNumber}: {lo.loText}
                            </p>
                          </div>
                          <div className="space-y-1.5 ml-5">
                            {lo.assessmentCriteria.map((ac) => {
                              const evidenceList =
                                acEvidenceMap.get(ac.acRef) ||
                                acEvidenceMap.get(ac.acFullRef) ||
                                [];
                              const hasEvidence = evidenceList.length > 0;

                              return (
                                <button
                                  key={ac.acFullRef}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    haptics.tap();
                                    setSelectedAC({
                                      code: ac.acRef,
                                      text: ac.acText.replace(`${ac.acRef} `, ''),
                                    });
                                    setShowACEvidence(true);
                                  }}
                                  className="w-full flex items-start gap-2 text-xs text-white text-left touch-manipulation active:bg-white/[0.04] rounded-lg py-1 px-1 -mx-1 transition-colors"
                                >
                                  {hasEvidence ? (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0 mt-px" />
                                  ) : (
                                    <span className="text-elec-yellow/60 flex-shrink-0 mt-px w-3.5 text-center">
                                      •
                                    </span>
                                  )}
                                  <span className="flex-1 text-left">
                                    <span
                                      className={cn(
                                        'font-medium',
                                        hasEvidence ? 'text-green-400' : 'text-white'
                                      )}
                                    >
                                      {ac.acRef}
                                    </span>{' '}
                                    {ac.acText.replace(`${ac.acRef} `, '')}
                                  </span>
                                  {hasEvidence && (
                                    <Badge
                                      variant="outline"
                                      className="text-[9px] px-1 py-0 border-green-500/30 text-green-400 shrink-0"
                                    >
                                      {evidenceList.length}
                                    </Badge>
                                  )}
                                </button>
                              );
                            })}
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
                  {String(entry.status || 'draft')}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AC Evidence Bottom Sheet */}
      <Sheet
        open={showACEvidence}
        onOpenChange={(v) => {
          setShowACEvidence(v);
          if (!v) setSelectedAC(null);
        }}
      >
        <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl p-0">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />
          <div className="flex flex-col h-full">
            <SheetHeader className="px-4 pb-3">
              <SheetTitle className="text-left">
                {selectedAC?.code}
              </SheetTitle>
              <SheetDescription className="text-left text-white/80 text-sm">
                {selectedAC?.text}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-20 sm:pb-8">
              <AnimatePresence mode="wait">
                {selectedAC && (
                  <motion.div
                    key={selectedAC.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {(() => {
                      const entries = acEvidenceMap.get(selectedAC.code) || [];

                      if (entries.length === 0) {
                        return (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="flex flex-col items-center justify-center py-8 space-y-3"
                          >
                            <div className="p-3 rounded-full bg-white/[0.06]">
                              <FileText className="h-6 w-6 text-white/40" />
                            </div>
                            <p className="text-sm text-white/60 text-center">
                              No evidence linked to this criterion yet
                            </p>
                            <Button
                              onClick={() => {
                                haptics.tap();
                                setShowACEvidence(false);
                                setSelectedAC(null);
                                onCapture();
                              }}
                              className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Evidence
                            </Button>
                          </motion.div>
                        );
                      }

                      return (
                        <div className="space-y-2">
                          {entries.map((entry, i) => (
                            <motion.div
                              key={entry.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: i * 0.06,
                                type: 'spring',
                                stiffness: 400,
                                damping: 25,
                              }}
                              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                            >
                              <EvidenceThumbnail entry={entry} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate">
                                  {entry.title}
                                </p>
                                <p className="text-xs text-white/50 mt-0.5">
                                  {formatRelativeDate(new Date(entry.dateCreated))}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-[10px] px-2 py-0.5',
                                  entry.status === 'completed' ||
                                    entry.status === 'reviewed'
                                    ? 'border-green-500/30 text-green-400'
                                    : entry.status === 'in-progress'
                                      ? 'border-blue-500/30 text-blue-400'
                                      : 'border-white/20 text-white/60'
                                )}
                              >
                                {String(entry.status || 'draft')}
                              </Badge>
                            </motion.div>
                          ))}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: entries.length * 0.06 + 0.1 }}
                          >
                            <Button
                              variant="outline"
                              onClick={() => {
                                haptics.tap();
                                setShowACEvidence(false);
                                setSelectedAC(null);
                                onCapture();
                              }}
                              className="w-full h-11 mt-3 touch-manipulation active:scale-95 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add More Evidence
                            </Button>
                          </motion.div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </SheetContent>
      </Sheet>

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

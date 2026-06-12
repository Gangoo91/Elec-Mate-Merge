/**
 * QualificationSelector
 *
 * Flat list of tappable qualification cards with AC counts and unit counts.
 * Grouped by awarding body. Shows yellow ring on selected card.
 */

import { useState, useEffect, useMemo } from 'react';
import { CalendarDays, Loader2 } from 'lucide-react';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { Qualification } from '@/types/qualification';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import QualificationConfirmationDialog from './QualificationConfirmationDialog';
import PortfolioSetupAnimation from './PortfolioSetupAnimation';
import { cn } from '@/lib/utils';

interface RequirementStats {
  acCount: number;
  unitCount: number;
}

interface QualificationSelectorProps {
  /**
   * College-enrolled apprentices don't free-pick — their college's course is
   * authoritative. When set, the list locks to that course code so the only
   * action available is aligning the portfolio to the college's choice.
   */
  lockedToCode?: string | null;
}

const QualificationSelector = ({ lockedToCode }: QualificationSelectorProps = {}) => {
  const {
    qualifications,
    awardingBodies,
    categories,
    loading,
    selectQualification,
    clearQualificationSelection,
    userSelection,
  } = useQualifications();
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [requirementStats, setRequirementStats] = useState<Record<string, RequirementStats>>({});

  // College-locked mode: only the college's course is offered.
  const visibleBodies = useMemo(() => {
    if (!lockedToCode) return awardingBodies;
    const out: Record<string, Qualification[]> = {};
    for (const [body, quals] of Object.entries(awardingBodies)) {
      const matches = (quals as Qualification[]).filter((q) => q.code === lockedToCode);
      if (matches.length > 0) out[body] = matches;
    }
    return out;
  }, [awardingBodies, lockedToCode]);
  const lockedMatchCount = lockedToCode
    ? Object.values(visibleBodies).reduce((n, quals) => n + quals.length, 0)
    : 0;

  // Load AC counts per requirement code
  useEffect(() => {
    async function loadStats() {
      try {
        const { data, error } = await supabase
          .from('qualification_requirements')
          .select('qualification_code, unit_code');

        if (error || !data) return;

        const stats: Record<string, RequirementStats> = {};
        for (const row of data) {
          if (!stats[row.qualification_code]) {
            stats[row.qualification_code] = { acCount: 0, unitCount: 0 };
          }
          stats[row.qualification_code].acCount++;
        }

        // Count unique units per code
        const unitSets: Record<string, Set<string>> = {};
        for (const row of data) {
          if (!unitSets[row.qualification_code]) {
            unitSets[row.qualification_code] = new Set();
          }
          unitSets[row.qualification_code].add(row.unit_code);
        }
        for (const [code, unitSet] of Object.entries(unitSets)) {
          if (stats[code]) {
            stats[code].unitCount = unitSet.size;
          }
        }

        setRequirementStats(stats);
      } catch {
        // Non-critical — continue without stats
      }
    }
    loadStats();
  }, []);

  // Resolve requirement code for a qualification
  const getRequirementCode = (qualification: Qualification): string | null => {
    // Check mappings from the loaded qualifications context
    // The useQualifications hook already filters to only qualifications with mappings
    return qualification.code;
  };

  const handleSelectQualification = (qualification: Qualification) => {
    setSelectedQualification(qualification);
    setShowConfirmDialog(true);
  };

  const handleConfirmSelection = async (targetDate?: string) => {
    if (!selectedQualification) return;

    setShowConfirmDialog(false);
    setIsSettingUp(true);

    try {
      await selectQualification(selectedQualification.id, targetDate);
    } catch (error) {
      setIsSettingUp(false);
      toast.error('Failed to set up portfolio. Please try again.');
    }
  };

  const handleSetupComplete = () => {
    setIsSettingUp(false);
    setSelectedQualification(null);
    toast.success('Your portfolio is ready!');
  };

  const selectedQualificationCategories = selectedQualification
    ? categories.filter((cat) => cat.qualification_id === selectedQualification.id)
    : [];

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 text-white/55 animate-spin" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Loading qualifications
          </span>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-white/[0.04] rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (userSelection && !isChanging) {
    const pct = userSelection.progress_percentage ?? 0;
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Current qualification
          </span>
          <p className="text-[12px] text-white/55 leading-relaxed">
            {lockedToCode
              ? 'Set by your college — your portfolio is tailored to these requirements.'
              : 'Your portfolio is tailored to these requirements.'}
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
          <div className="p-4 sm:p-5 space-y-3">
            {/* One meta line — never fights the title for width */}
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-white/85 px-1.5 py-0.5 rounded border border-elec-yellow/25 bg-elec-yellow/[0.06] text-elec-yellow">
                Level {userSelection.qualification?.level}
              </span>
              <span className="text-white/55 truncate">
                {userSelection.qualification?.awarding_body}
              </span>
              <span className="text-white/35">·</span>
              <span className="text-white/55">{userSelection.qualification?.code}</span>
            </div>

            {/* Title gets the full width */}
            <h3 className="text-[17px] font-semibold text-white leading-snug tracking-tight">
              {userSelection.qualification?.title}
            </h3>

            {/* Progress as a bar, not a shouting number */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Progress
                </span>
                <span className="text-[13px] font-mono tabular-nums text-white">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-elec-yellow transition-all"
                  style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                />
              </div>
            </div>

            {userSelection.target_completion_date && (
              <div className="flex items-center gap-2 text-[12px] text-white/55 pt-2 border-t border-white/[0.05] font-mono">
                <CalendarDays className="h-3 w-3" />
                Target:{' '}
                {new Date(userSelection.target_completion_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsChanging(true)}
            className="flex-1 h-11 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] touch-manipulation active:scale-[0.97] transition-transform"
          >
            {lockedToCode ? 'View course' : 'Change course'}
          </button>
          {/* College-enrolled apprentices can't remove their course — the
              college manages it. */}
          {!lockedToCode && (
          <button
            onClick={async () => {
              const cleared = await clearQualificationSelection();
              if (cleared) {
                toast.success('Qualification removed');
              }
            }}
            className="h-11 px-5 rounded-xl border border-red-500/30 text-red-300 font-medium text-[14px] touch-manipulation active:scale-[0.97] transition-transform hover:bg-red-500/[0.08]"
          >
            Remove
          </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {lockedToCode ? 'Your college course' : 'Select your qualification'}
        </span>
        <p className="text-[12px] text-white/55 leading-relaxed">
          {lockedToCode
            ? `Your college enrolled you on ${lockedToCode} — your course is managed by them. Confirm it below to align your portfolio.`
            : 'Choose your course to get a tailored portfolio experience'}
        </p>
      </div>

      {lockedToCode && lockedMatchCount === 0 && (
        <p className="text-[12px] text-white/55 leading-relaxed rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-4">
          Your college's course (<span className="font-mono text-white">{lockedToCode}</span>)
          isn't in the course library yet — ask your tutor, or contact{' '}
          <span className="text-white">info@elec-mate.com</span>.
        </p>
      )}

      {Object.entries(visibleBodies).map(([body, quals]) => (
        <div key={body} className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 px-1">
            {body}
          </span>
          <div className="space-y-2">
            {quals.map((qualification) => {
              const stats =
                Object.values(requirementStats).length > 0
                  ? requirementStats[qualification.code]
                  : null;

              return (
                <button
                  key={qualification.id}
                  onClick={() => handleSelectQualification(qualification)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl min-h-[88px]',
                    'border border-white/[0.06] bg-white/[0.02]',
                    'hover:bg-white/[0.04] active:scale-[0.98] transition-all duration-200 touch-manipulation',
                    'focus:outline-none focus:ring-2 focus:ring-elec-yellow/50',
                    selectedQualification?.id === qualification.id &&
                      'ring-2 ring-elec-yellow'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono flex-shrink-0">
                      {qualification.level}
                    </span>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-[14px] font-medium text-white leading-tight line-clamp-2">
                        {qualification.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/55 flex-wrap font-mono">
                        {stats && (
                          <>
                            <span>{stats.acCount} ACs</span>
                            <span>·</span>
                            <span>{stats.unitCount} units</span>
                            <span>·</span>
                          </>
                        )}
                        <span>{qualification.code}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <QualificationConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        qualification={selectedQualification}
        categories={selectedQualificationCategories}
        onConfirm={handleConfirmSelection}
      />

      <PortfolioSetupAnimation
        isVisible={isSettingUp}
        onComplete={handleSetupComplete}
        qualificationTitle={selectedQualification?.title}
      />
    </div>
  );
};

export default QualificationSelector;

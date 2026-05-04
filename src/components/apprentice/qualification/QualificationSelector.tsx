/**
 * QualificationSelector
 *
 * Flat list of tappable qualification cards with AC counts and unit counts.
 * Grouped by awarding body. Shows yellow ring on selected card.
 */

import { useState, useEffect } from 'react';
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

const QualificationSelector = () => {
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
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Current qualification
        </span>
        <p className="text-[12px] text-white/55 leading-relaxed">
          Your portfolio is tailored to these requirements
        </p>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                  {userSelection.qualification?.level}
                </span>
                <span className="text-[11px] text-white/55 font-mono">
                  {userSelection.qualification?.awarding_body}
                </span>
              </div>
              <h3 className="text-[15px] font-medium text-white leading-tight">
                {userSelection.qualification?.title}
              </h3>
              <p className="text-[11px] text-white/55 font-mono">
                Code: {userSelection.qualification?.code}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-mono text-white">
                {userSelection.progress_percentage}%
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
                Complete
              </span>
            </div>
          </div>
          {userSelection.target_completion_date && (
            <div className="flex items-center gap-2 text-[12px] text-white/55 pt-2 border-t border-white/[0.06] font-mono">
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

        <div className="flex gap-2">
          <button
            onClick={() => setIsChanging(true)}
            className="flex-1 h-11 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] touch-manipulation active:scale-[0.97] transition-transform"
          >
            Change course
          </button>
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
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Select your qualification
        </span>
        <p className="text-[12px] text-white/55 leading-relaxed">
          Choose your course to get a tailored portfolio experience
        </p>
      </div>

      {Object.entries(awardingBodies).map(([body, quals]) => (
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

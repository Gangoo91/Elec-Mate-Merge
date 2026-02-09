/**
 * QualificationSelector
 *
 * Flat list of tappable qualification cards with AC counts and unit counts.
 * Grouped by awarding body. Shows yellow ring on selected card.
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, GraduationCap, Award, Loader2 } from 'lucide-react';
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
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10">
              <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
            </div>
            <div>
              <CardTitle className="text-lg">Loading Qualifications</CardTitle>
              <p className="text-sm text-white/80">Fetching available courses...</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-muted rounded-xl" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Already selected state — show current with change/remove buttons
  if (userSelection && !isChanging) {
    return (
      <Card className="bg-card border-border overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-elec-yellow via-elec-yellow/80 to-orange-500" />
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Award className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Current Qualification</CardTitle>
              <p className="text-sm text-white/80">
                Your portfolio is tailored to these requirements
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-elec-yellow text-black font-semibold text-xs">
                    {userSelection.qualification?.level}
                  </Badge>
                  <span className="text-xs text-white/80">
                    {userSelection.qualification?.awarding_body}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground leading-tight">
                  {userSelection.qualification?.title}
                </h3>
                <p className="text-xs text-white/80">Code: {userSelection.qualification?.code}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-elec-yellow">
                  {userSelection.progress_percentage}%
                </div>
                <span className="text-xs text-white/80">Complete</span>
              </div>
            </div>
            {userSelection.target_completion_date && (
              <div className="flex items-center gap-2 text-sm text-white/80 pt-2 border-t border-border">
                <CalendarDays className="h-4 w-4" />
                Target:{' '}
                {new Date(userSelection.target_completion_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>

          {/* Change / Remove buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsChanging(true)}
              className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.97] transition-transform"
            >
              Change Course
            </button>
            <button
              onClick={async () => {
                const cleared = await clearQualificationSelection();
                if (cleared) {
                  toast.success('Qualification removed');
                }
              }}
              className="h-12 px-5 rounded-xl border border-red-500/30 text-red-400 font-semibold text-sm touch-manipulation active:scale-[0.97] transition-transform hover:bg-red-500/10"
            >
              Remove
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Selection state — flat cards grouped by awarding body
  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-elec-yellow via-elec-yellow/80 to-orange-500" />
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-lg">Select Your Qualification</CardTitle>
            <p className="text-sm text-white/80">
              Choose your course to get a tailored portfolio experience
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {Object.entries(awardingBodies).map(([body, quals]) => (
          <div key={body} className="space-y-2">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider px-1">
              {body}
            </h4>
            <div className="space-y-2">
              {quals.map((qualification) => {
                // Look up stats from requirement mappings
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
                      'bg-muted/50 border border-border',
                      'hover:border-elec-yellow/50 hover:bg-muted/80',
                      'active:scale-[0.98] transition-all duration-200 touch-manipulation',
                      'focus:outline-none focus:ring-2 focus:ring-elec-yellow/50',
                      selectedQualification?.id === qualification.id &&
                        'ring-2 ring-elec-yellow border-elec-yellow/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Badge className="bg-elec-yellow text-black font-semibold text-xs px-2.5 py-1">
                          {qualification.level}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="font-semibold text-foreground leading-tight line-clamp-2">
                          {qualification.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/80 flex-wrap">
                          {stats && (
                            <>
                              <span>{stats.acCount} Assessment Criteria</span>
                              <span className="text-white/40">·</span>
                              <span>{stats.unitCount} units</span>
                              <span className="text-white/40">·</span>
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
      </CardContent>
    </Card>
  );
};

export default QualificationSelector;

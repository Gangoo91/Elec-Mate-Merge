import { useState } from 'react';
import { TimeEntry } from '@/types/time-tracking';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Zap, ShieldCheck } from 'lucide-react';
import { useTimeToPortfolio } from '@/hooks/portfolio/useTimeToPortfolio';
import { useUniversalPortfolio } from '@/hooks/portfolio/useUniversalPortfolio';
import { useTimeEntryVerification } from '@/hooks/time-tracking/useTimeEntryVerification';
import { useAuth } from '@/contexts/AuthContext';
import TimeEntryToPortfolioDialog from '@/components/apprentice/portfolio/TimeEntryToPortfolioDialog';
import UniversalPortfolioButton from '@/components/apprentice/portfolio/UniversalPortfolioButton';
import TimeEntryVerificationQRSheet from './TimeEntryVerificationQRSheet';

interface TimeEntryCardProps {
  entry: TimeEntry;
}

const TimeEntryCard = ({ entry }: TimeEntryCardProps) => {
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [showVerificationSheet, setShowVerificationSheet] = useState(false);
  const { convertTimeEntryToPortfolio, quickConvertTimeEntry, isConverting, categories } =
    useTimeToPortfolio();
  const { convertTimeEntryToUniversal } = useUniversalPortfolio();
  const { createVerification, getVerificationUrl, getVerificationForTimeEntry } =
    useTimeEntryVerification();
  const { profile } = useAuth();

  const existingVerification = getVerificationForTimeEntry(entry.id);
  const isVerified = entry.is_supervisor_verified || !!existingVerification?.verified_at;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  };

  const getBadgeLabel = () => {
    if (entry.isQuiz) return 'Quiz';
    if (entry.isAutomatic) return 'Automatic';
    if (entry.notes && entry.notes.includes('activity verification')) return 'Verified';
    return 'Manual';
  };

  const handleAddToPortfolio = async (portfolioData: any) => {
    try {
      await convertTimeEntryToPortfolio(entry, portfolioData);
      setShowPortfolioDialog(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleQuickAdd = async () => {
    try {
      await quickConvertTimeEntry(entry);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleVerify = async () => {
    if (existingVerification) {
      setShowVerificationSheet(true);
      return;
    }

    const apprenticeName = profile?.full_name || profile?.username || 'Apprentice';
    const verification = await createVerification({
      timeEntry: entry,
      apprenticeName,
    });

    if (verification) {
      setShowVerificationSheet(true);
    }
  };

  const badgeLabel = getBadgeLabel();
  const hours = Math.floor(entry.duration / 60);
  const minutes = entry.duration % 60;

  const universalActivity = convertTimeEntryToUniversal(entry);

  return (
    <>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-[15px] font-medium text-white">{entry.activity}</h4>
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {badgeLabel}
              </span>
              {isVerified && (
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>

            {entry.notes && (
              <p className="text-[13px] text-white/70 mt-1 line-clamp-2 leading-relaxed">
                {entry.notes}
              </p>
            )}
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-[15px] font-mono text-white">
              {hours > 0 ? `${hours}h ` : ''}
              {minutes}m
            </div>
            <div className="text-[11px] text-white/55 mt-0.5">{formatDate(entry.date)}</div>
          </div>
        </div>

        {entry.notes && entry.notes.includes('activity verification') && (
          <div className="mt-2 flex items-center text-[11px] text-white/55">
            <Activity className="h-3 w-3 mr-1" />
            Activity verified
          </div>
        )}

        {entry.isQuiz && entry.score !== undefined && entry.totalQuestions !== undefined && (
          <div className="mt-2 text-[11px] text-white/55 font-mono">
            Score: {entry.score}/{entry.totalQuestions} (
            {Math.round((entry.score / entry.totalQuestions) * 100)}%)
          </div>
        )}

        <div className="mt-3 flex justify-between gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleQuickAdd}
            disabled={isConverting}
            className="gap-1 h-9 border-white/15 text-white hover:bg-white/[0.05] flex-1 touch-manipulation"
          >
            <Zap className="h-3 w-3" />
            Quick add
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleVerify}
            className="gap-1 h-9 border-white/15 text-white hover:bg-white/[0.05] flex-1 touch-manipulation"
          >
            <ShieldCheck className="h-3 w-3" />
            {isVerified ? 'Verified' : 'Verify'}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPortfolioDialog(true)}
            className="gap-1 h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <Plus className="h-3 w-3" />
            Custom
          </Button>
        </div>
      </div>

      {/* Portfolio Dialog */}
      <TimeEntryToPortfolioDialog
        timeEntry={entry}
        categories={categories}
        isOpen={showPortfolioDialog}
        onClose={() => setShowPortfolioDialog(false)}
        onSubmit={handleAddToPortfolio}
        isLoading={isConverting}
      />

      {/* Verification QR Sheet */}
      {existingVerification && (
        <TimeEntryVerificationQRSheet
          open={showVerificationSheet}
          onOpenChange={setShowVerificationSheet}
          verification={existingVerification}
          verificationUrl={getVerificationUrl(existingVerification.verification_token)}
          activityTitle={entry.activity}
        />
      )}
    </>
  );
};

export default TimeEntryCard;

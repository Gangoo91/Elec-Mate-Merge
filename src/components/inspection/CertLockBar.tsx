import React from 'react';
import { Lock, ShieldCheck, FilePlus2, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VersionHistorySheet } from '@/components/ui/VersionHistorySheet';

interface CertLockBarProps {
  isLocked: boolean;
  lockedAt: string | null;
  editVersion: number;
  /** Cert is signed + saved, so it can be issued & locked. */
  canIssue: boolean;
  onLock: () => void;
  onAmend: () => void;
  /** DB uuid of the report — enables the version history timeline. */
  databaseId?: string | null;
  /** True when the cert is part of a version chain (has a parent or children). */
  hasVersions?: boolean;
  /** Open a specific version's report (receives its report_id string). */
  onOpenVersion?: (reportId: string) => void;
}

const formatLockedDate = (iso: string | null) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
};

/**
 * Lock / version bar shown above any certificate form (ELE-1037).
 * - Locked  → read-only banner with issue date + version + "Amend" (new version).
 * - Signed but unlocked → "Issue & lock" prompt.
 * - Otherwise renders nothing.
 */
const CertLockBar: React.FC<CertLockBarProps> = ({
  isLocked,
  lockedAt,
  editVersion,
  canIssue,
  onLock,
  onAmend,
  databaseId,
  hasVersions,
  onOpenVersion,
}) => {
  const showHistory = !!databaseId && !!hasVersions;
  const historySheet = showHistory ? (
    <VersionHistorySheet
      reportId={databaseId}
      onOpenVersion={onOpenVersion}
      trigger={
        <Button
          type="button"
          variant="ghost"
          className="h-10 gap-1.5 flex-shrink-0 text-white/70 hover:text-white hover:bg-white/10 touch-manipulation"
        >
          <History className="h-4 w-4" />
          History
        </Button>
      }
    />
  ) : null;

  if (isLocked) {
    return (
      <div className="px-4 pt-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] p-3 sm:p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Lock className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-300">
                Issued &amp; locked{editVersion > 1 ? ` · Version ${editVersion}` : ''}
              </p>
              <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                This certificate is read-only
                {lockedAt ? ` — issued ${formatLockedDate(lockedAt)}` : ''}. To make changes,
                create a new version.
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {historySheet}
              <Button
                type="button"
                variant="outline"
                onClick={onAmend}
                className="h-10 gap-1.5 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 touch-manipulation"
              >
                <FilePlus2 className="h-4 w-4" />
                Amend
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (canIssue) {
    return (
      <div className="px-4 pt-3">
        <div className="rounded-xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.08] to-amber-500/[0.03] p-3 sm:p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-elec-yellow/15 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Ready to issue?</p>
              <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                Lock this certificate to mark it as final and issued. It becomes read-only — any
                later change creates a new version.
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {historySheet}
              <Button
                type="button"
                onClick={onLock}
                className="h-10 gap-1.5 bg-elec-yellow/15 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/20 font-semibold touch-manipulation"
              >
                <Lock className="h-4 w-4" />
                Issue &amp; lock
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked, unsigned, but part of a version chain — still surface the timeline.
  if (showHistory) {
    return (
      <div className="px-4 pt-3">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 flex items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            Version {editVersion} of this certificate
          </p>
          {historySheet}
        </div>
      </div>
    );
  }

  return null;
};

export default CertLockBar;

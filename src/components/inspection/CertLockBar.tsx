import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VersionHistorySheet } from '@/components/ui/VersionHistorySheet';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';

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
  const [pdfOpen, setPdfOpen] = useState(false);
  const showHistory = !!databaseId && !!hasVersions;
  const pdfViewer = databaseId ? (
    <ReportPdfViewer reportId={databaseId} open={pdfOpen} onOpenChange={setPdfOpen} />
  ) : null;
  const historySheet = showHistory ? (
    <VersionHistorySheet
      reportId={databaseId}
      onOpenVersion={onOpenVersion}
      trigger={
        <Button
          type="button"
          variant="ghost"
          className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation sm:flex-initial"
        >
          History
        </Button>
      }
    />
  ) : null;

  if (isLocked) {
    return (
      <div className="-mx-3 px-3 pt-3 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div className="rounded-xl border border-emerald-500/30 bg-white/[0.03] p-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-emerald-400">
              Issued &amp; locked{editVersion > 1 ? ` · Version ${editVersion}` : ''}
            </p>
            <p className="text-[12.5px] text-white/85 mt-0.5 leading-relaxed">
              Final and read-only{lockedAt ? ` — issued ${formatLockedDate(lockedAt)}` : ''}. Amend
              creates a new version.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {databaseId && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPdfOpen(true)}
                className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation sm:flex-initial"
              >
                PDF
              </Button>
            )}
            {historySheet}
            <Button
              type="button"
              variant="outline"
              onClick={onAmend}
              className="h-11 flex-1 rounded-xl border-white/[0.12] bg-white/[0.04] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation sm:flex-initial"
            >
              Amend
            </Button>
          </div>
        </div>
        {pdfViewer}
      </div>
    );
  }

  if (canIssue) {
    return (
      <div className="-mx-3 sm:mx-0">
        <div className="mx-auto px-3 pt-3 sm:px-4 lg:max-w-[1600px] lg:px-8">
          <Button
            type="button"
            onClick={onLock}
            className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99]"
          >
            Issue &amp; lock
          </Button>
          {historySheet && <div className="mt-2 flex">{historySheet}</div>}
        </div>
      </div>
    );
  }

  // Unlocked, unsigned, but part of a version chain — still surface the timeline.
  if (showHistory) {
    return (
      <div className="-mx-3 px-3 pt-3 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 flex items-center justify-between gap-3">
          <p className="text-[12.5px] text-white/85">Version {editVersion} of this certificate</p>
          {historySheet}
        </div>
      </div>
    );
  }

  return null;
};

export default CertLockBar;

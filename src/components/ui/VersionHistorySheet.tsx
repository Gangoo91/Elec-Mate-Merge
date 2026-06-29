/**
 * VersionHistorySheet
 * Bottom sheet showing version timeline from reportVersioning.ts.
 */

import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, FileText, RotateCcw, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getVersionHistory } from '@/utils/reportVersioning';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { cn } from '@/lib/utils';

interface VersionHistorySheetProps {
  /** DB uuid of any report in the chain. */
  reportId: string | null;
  /** Open a specific version — receives that version's report_id string. */
  onOpenVersion?: (reportId: string) => void;
  trigger?: React.ReactNode;
}

interface VersionInfo {
  id: string;
  report_id: string;
  version: number;
  certificate_number: string;
  created_at: string;
  locked_at: string | null;
  is_latest_version: boolean;
}

export const VersionHistorySheet: React.FC<VersionHistorySheetProps> = ({
  reportId,
  onOpenVersion,
  trigger,
}) => {
  const [versions, setVersions] = useState<VersionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // report_id of the version whose PDF the user is downloading/viewing
  const [pdfReportId, setPdfReportId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && reportId) {
      setIsLoading(true);
      getVersionHistory(reportId).then((result) => {
        setVersions(result);
        setIsLoading(false);
      });
    }
  }, [isOpen, reportId]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="h-11 gap-2 touch-manipulation"
            disabled={!reportId}
          >
            <Clock className="h-4 w-4" />
            Version History
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[75vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="px-5 pt-5 pb-3">
            <SheetHeader>
              <SheetTitle className="text-base font-semibold text-left">Version History</SheetTitle>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-elec-yellow" />
              </div>
            ) : versions.length === 0 ? (
              <div className="text-center py-12 text-white text-sm">
                {reportId
                  ? 'No version history available'
                  : 'Save your report first to see version history'}
              </div>
            ) : (
              <div className="space-y-0">
                {versions.map((version, index) => {
                  const isCurrent = version.is_latest_version;
                  const isLast = index === versions.length - 1;
                  return (
                    <div key={version.id} className="flex gap-3">
                      {/* Timeline rail */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center',
                            isCurrent ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white/45'
                          )}
                        >
                          {isCurrent ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <FileText className="h-3.5 w-3.5" />
                          )}
                        </div>
                        {!isLast && <div className="w-px flex-1 min-h-[14px] bg-white/[0.08] my-1" />}
                      </div>

                      {/* Version card */}
                      <div
                        className={cn(
                          'flex-1 min-w-0 rounded-xl border p-3.5 mb-2.5',
                          isCurrent
                            ? 'border-elec-yellow/25 bg-elec-yellow/[0.05]'
                            : 'border-white/[0.07] bg-white/[0.02]'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            Version {version.version}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-elec-yellow bg-elec-yellow/15 px-1.5 py-0.5 rounded">
                              Current
                            </span>
                          )}
                          {version.locked_at && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-300/90">
                              <Lock className="h-2.5 w-2.5" />
                              Locked
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-white/45 mt-1 truncate">
                          {version.certificate_number}
                        </p>
                        <p className="text-xs text-white/45 mt-0.5">
                          {formatDate(version.created_at)}
                        </p>

                        <div className="mt-3 flex gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => setPdfReportId(version.report_id)}
                            className="h-9 flex-1 sm:flex-initial gap-1.5 text-xs bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/10 touch-manipulation"
                          >
                            <Download className="h-3.5 w-3.5" />
                            PDF
                          </Button>
                          {!isCurrent && onOpenVersion && (
                            <Button
                              variant="ghost"
                              onClick={() => {
                                onOpenVersion(version.report_id);
                                setIsOpen(false);
                              }}
                              className="h-9 flex-1 sm:flex-initial gap-1.5 text-xs bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/10 touch-manipulation"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              Open
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </SheetContent>

      {/* PDF preview / download for the selected version (reads its preserved
          data — works for old, locked versions and any cert type). */}
      {pdfReportId && (
        <ReportPdfViewer
          reportId={pdfReportId}
          open={!!pdfReportId}
          onOpenChange={(o) => {
            if (!o) setPdfReportId(null);
          }}
        />
      )}
    </Sheet>
  );
};

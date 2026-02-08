/**
 * VersionHistorySheet
 * Bottom sheet showing version timeline from reportVersioning.ts.
 */

import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, FileText, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getVersionHistory } from '@/utils/reportVersioning';
import { cn } from '@/lib/utils';

interface VersionHistorySheetProps {
  reportId: string | null;
  onRestore?: (versionId: string) => void;
  trigger?: React.ReactNode;
}

interface VersionInfo {
  id: string;
  version: number;
  certificate_number: string;
  created_at: string;
  is_latest_version: boolean;
}

export const VersionHistorySheet: React.FC<VersionHistorySheetProps> = ({
  reportId,
  onRestore,
  trigger,
}) => {
  const [versions, setVersions] = useState<VersionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && reportId) {
      setIsLoading(true);
      getVersionHistory(reportId).then(result => {
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
              <div className="text-center py-12 text-muted-foreground text-sm">
                {reportId ? 'No version history available' : 'Save your report first to see version history'}
              </div>
            ) : (
              <div className="space-y-1">
                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    className={cn(
                      'relative flex items-start gap-3 p-3 rounded-xl transition-colors',
                      version.is_latest_version
                        ? 'bg-elec-yellow/10 border border-elec-yellow/20'
                        : 'bg-card/30',
                    )}
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                      <div className={cn(
                        'h-7 w-7 rounded-full flex items-center justify-center',
                        version.is_latest_version
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/10 text-white/50',
                      )}>
                        {version.is_latest_version
                          ? <CheckCircle2 className="h-4 w-4" />
                          : <FileText className="h-3.5 w-3.5" />
                        }
                      </div>
                      {index < versions.length - 1 && (
                        <div className="w-px h-4 bg-border/30 mt-1" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          Version {version.version}
                        </p>
                        {version.is_latest_version && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-elec-yellow bg-elec-yellow/20 px-1.5 py-0.5 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {version.certificate_number}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(version.created_at)}
                      </p>
                    </div>

                    {!version.is_latest_version && onRestore && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1.5 text-xs touch-manipulation"
                        onClick={() => onRestore(version.id)}
                      >
                        <RotateCcw className="h-3 w-3" />
                        Restore
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

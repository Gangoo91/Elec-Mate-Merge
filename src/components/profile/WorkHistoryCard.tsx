/**
 * WorkHistoryCard
 *
 * Shows Elec-ID work history (certificate logs).
 * Only visible if user has Elec-ID activated.
 */

import React from 'react';
import { History, FileCheck, ClipboardCheck, Wrench, Plug, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  WorkHistoryEntry,
  CertificateType,
  CertificateOutcome,
  formatOutcome,
  getOutcomeColors,
} from '@/services/certificateLoggingService';

interface WorkHistoryCardProps {
  workHistory: WorkHistoryEntry[];
  isLoading?: boolean;
  hasElecId: boolean;
  totalCertificates: number;
  className?: string;
}

export const WorkHistoryCard: React.FC<WorkHistoryCardProps> = ({
  workHistory,
  isLoading = false,
  hasElecId,
  totalCertificates,
  className,
}) => {
  // Don't render if user doesn't have Elec-ID
  if (!hasElecId) {
    return null;
  }

  return (
    <Card className={cn('bg-card border-border', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Work History
          </CardTitle>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs">
            {totalCertificates}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : workHistory.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <FileCheck className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No certificates logged yet</p>
            <p className="text-xs mt-1">Complete certificates to build your history</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {workHistory.map((entry) => (
              <WorkHistoryItem key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface WorkHistoryItemProps {
  entry: WorkHistoryEntry;
}

const WorkHistoryItem: React.FC<WorkHistoryItemProps> = ({ entry }) => {
  const metadata = entry.metadata;
  const outcomeColors = getOutcomeColors(metadata.outcome);
  const Icon = getCertificateIcon(metadata.certificate_type);

  const hasObservations = metadata.c1 > 0 || metadata.c2 > 0 || metadata.c3 > 0 || metadata.fi > 0;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-border transition-colors">
      {/* Icon */}
      <div className={cn('p-2 rounded-md shrink-0', outcomeColors.bg)}>
        <Icon className={cn('h-4 w-4', outcomeColors.text)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{metadata.certificate_type}</span>
          <Badge
            variant="outline"
            className={cn(
              'text-xs px-1.5 py-0',
              outcomeColors.bg,
              outcomeColors.text,
              'border',
              outcomeColors.border
            )}
          >
            {formatOutcome(metadata.outcome)}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {entry.description}
        </p>

        {/* Observations summary */}
        {hasObservations && (
          <div className="flex items-center gap-2 mt-1.5">
            {metadata.c1 > 0 && (
              <ObservationBadge code="C1" count={metadata.c1} />
            )}
            {metadata.c2 > 0 && (
              <ObservationBadge code="C2" count={metadata.c2} />
            )}
            {metadata.c3 > 0 && (
              <ObservationBadge code="C3" count={metadata.c3} />
            )}
            {metadata.fi > 0 && (
              <ObservationBadge code="FI" count={metadata.fi} />
            )}
          </div>
        )}
      </div>

      {/* Date */}
      <div className="text-right shrink-0">
        <p className="text-xs text-muted-foreground">
          {format(new Date(entry.date_recorded), 'dd MMM yyyy')}
        </p>
      </div>
    </div>
  );
};

interface ObservationBadgeProps {
  code: string;
  count: number;
}

const ObservationBadge: React.FC<ObservationBadgeProps> = ({ code, count }) => {
  const getCodeColor = (code: string) => {
    switch (code) {
      case 'C1':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'C2':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'C3':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'FI':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <span className={cn('text-[10px] px-1.5 py-0.5 rounded border', getCodeColor(code))}>
      {code}: {count}
    </span>
  );
};

function getCertificateIcon(type: CertificateType) {
  switch (type) {
    case 'EICR':
      return FileCheck;
    case 'EIC':
      return ClipboardCheck;
    case 'Minor Works':
      return Wrench;
    case 'PAT':
      return Plug;
    default:
      return FileText;
  }
}

export default WorkHistoryCard;

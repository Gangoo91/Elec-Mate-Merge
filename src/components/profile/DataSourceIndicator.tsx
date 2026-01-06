/**
 * DataSourceIndicator
 *
 * Shows the cascade hierarchy for profile data:
 * Elec-ID → Inspector Profile → Account
 *
 * Highlights the active source and shows verified status.
 */

import React from 'react';
import { ChevronRight, Shield, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DataSource } from '@/services/profileDataService';

interface DataSourceIndicatorProps {
  activeSource: DataSource | null;
  isVerified: boolean;
  elecIdNumber?: string | null;
  className?: string;
}

export const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({
  activeSource,
  isVerified,
  elecIdNumber,
  className,
}) => {
  const sources: { key: DataSource; label: string }[] = [
    { key: 'elec_id', label: 'Elec-ID' },
    { key: 'inspector_profile', label: 'Inspector Profile' },
    { key: 'account', label: 'Account' },
  ];

  const getSourceStyles = (source: DataSource, isActive: boolean) => {
    if (!isActive) {
      return 'bg-muted/50 text-muted-foreground border-border';
    }

    switch (source) {
      case 'elec_id':
        return 'bg-green-500/20 text-green-400 border-green-500/40';
      case 'inspector_profile':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'account':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 p-3 rounded-lg bg-card border border-border',
        className
      )}
    >
      <span className="text-sm text-muted-foreground mr-1">Data source:</span>

      {sources.map((source, index) => (
        <React.Fragment key={source.key}>
          <Badge
            variant="outline"
            className={cn(
              'px-2.5 py-1 text-xs font-medium transition-colors',
              getSourceStyles(source.key, activeSource === source.key)
            )}
          >
            {activeSource === source.key && source.key === 'elec_id' && (
              <CheckCircle2 className="h-3 w-3 mr-1" />
            )}
            {source.label}
          </Badge>

          {index < sources.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          )}
        </React.Fragment>
      ))}

      {/* Verified badge */}
      {isVerified && (
        <Badge className="ml-auto bg-green-500/20 text-green-400 border border-green-500/40">
          <Shield className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      )}

      {/* Elec-ID number */}
      {elecIdNumber && activeSource === 'elec_id' && (
        <span className="text-xs text-muted-foreground ml-2">
          {elecIdNumber}
        </span>
      )}
    </div>
  );
};

export default DataSourceIndicator;

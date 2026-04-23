import React, { useState } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, differenceInDays, isPast } from 'date-fns';

interface ExpiringDocument {
  id: string;
  type: 'ecs_card' | 'qualification' | 'training' | 'cscs' | 'driving_licence' | 'insurance';
  name: string;
  expiryDate: Date;
  renewalUrl?: string;
  notificationsEnabled: boolean;
}

interface ExpiryAlertsProps {
  documents: ExpiringDocument[];
  onRenewClick?: (documentId: string) => void;
  onToggleNotification?: (documentId: string, enabled: boolean) => void;
  className?: string;
}

const DOCUMENT_LABELS: Record<string, string> = {
  ecs_card: 'ECS Card',
  qualification: 'Qualification',
  training: 'Training Certificate',
  cscs: 'CSCS Card',
  driving_licence: 'Driving Licence',
  insurance: 'Insurance',
};

function getExpiryStatus(expiryDate: Date): {
  status: 'expired' | 'critical' | 'warning' | 'ok';
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
} {
  const daysUntil = differenceInDays(expiryDate, new Date());

  if (isPast(expiryDate)) {
    return {
      status: 'expired',
      label: 'Expired',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    };
  }
  if (daysUntil <= 30) {
    return {
      status: 'critical',
      label: `${daysUntil}d`,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    };
  }
  if (daysUntil <= 90) {
    return {
      status: 'warning',
      label: `${daysUntil}d`,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    };
  }
  return {
    status: 'ok',
    label: `${daysUntil}d`,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  };
}

export function ExpiryAlerts({
  documents,
  onRenewClick,
  onToggleNotification,
  className,
}: ExpiryAlertsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedDocuments = [...documents].sort(
    (a, b) => a.expiryDate.getTime() - b.expiryDate.getTime()
  );

  const alertDocuments = sortedDocuments.filter((doc) => {
    const daysUntil = differenceInDays(doc.expiryDate, new Date());
    return daysUntil <= 180 || isPast(doc.expiryDate);
  });

  const expiredCount = alertDocuments.filter((doc) => isPast(doc.expiryDate)).length;
  const criticalCount = alertDocuments.filter((doc) => {
    const days = differenceInDays(doc.expiryDate, new Date());
    return days > 0 && days <= 30;
  }).length;

  if (alertDocuments.length === 0) return null;

  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden p-5 space-y-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Document renewals
          </div>
          <div className="mt-1 text-base font-semibold text-white">
            {expiredCount > 0
              ? `${expiredCount} expired`
              : criticalCount > 0
                ? `${criticalCount} expiring soon`
                : 'All documents valid'}
          </div>
        </div>
        {(expiredCount > 0 || criticalCount > 0) && (
          <span
            className={cn(
              'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border',
              expiredCount > 0
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            )}
          >
            Action required
          </span>
        )}
      </div>

      <div className="space-y-2">
        {alertDocuments.map((doc) => {
          const expiry = getExpiryStatus(doc.expiryDate);
          const isExpanded = expandedId === doc.id;

          return (
            <div
              key={doc.id}
              className={cn('rounded-xl border', expiry.bgColor, expiry.borderColor)}
            >
              <button
                className="w-full flex items-center gap-3 p-3 text-left touch-manipulation"
                onClick={() => setExpandedId(isExpanded ? null : doc.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{doc.name}</p>
                  <p className="text-xs text-white">{DOCUMENT_LABELS[doc.type]}</p>
                </div>

                <div className="text-right">
                  <span className={cn('font-semibold text-sm', expiry.color)}>{expiry.label}</span>
                  <p className="text-xs text-white">{format(doc.expiryDate, 'dd MMM yyyy')}</p>
                </div>

                <span
                  aria-hidden
                  className={cn(
                    'text-sm text-white transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                >
                  →
                </span>
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 pt-0 space-y-2 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white">Renewal reminders</span>
                    <Button
                      variant="ghost"
                      className={cn(
                        'h-11 px-3 text-sm rounded-lg touch-manipulation active:scale-[0.98]',
                        doc.notificationsEnabled ? 'text-emerald-400' : 'text-white'
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleNotification?.(doc.id, !doc.notificationsEnabled);
                      }}
                    >
                      {doc.notificationsEnabled ? 'On' : 'Off'}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 h-11 rounded-xl border-white/[0.06] bg-transparent text-white touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRenewClick?.(doc.id);
                      }}
                    >
                      Update document
                    </Button>
                    {doc.renewalUrl && (
                      <Button
                        className="flex-1 h-11 rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternalUrl(doc.renewalUrl);
                        }}
                      >
                        Book renewal
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 text-xs text-white">
        <span>
          {documents.length - alertDocuments.length} up to date
        </span>
        <span className="text-elec-yellow font-medium">View all →</span>
      </div>
    </div>
  );
}

export default ExpiryAlerts;

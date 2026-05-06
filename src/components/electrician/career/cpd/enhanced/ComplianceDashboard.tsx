/**
 * ComplianceDashboard — editorial regulatory + CPD compliance view.
 *
 * Type-led: action row, BS 7671 currency strip (refreshed for A4:2026),
 * priority alerts as editorial banners, overall + per-body status,
 * category gaps with hairline dividers, recommendations, deadlines.
 * Drops stock Card chrome and the green/yellow/red badge floods for
 * uniform editorial surfaces with semantic text accents.
 */

import React from 'react';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Plus,
  Download,
  FileText,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { cpdExportService } from '@/services/cpdExportService';
import { useCPDData } from '@/hooks/cpd/useCPDData';
import { CPDStats } from '@/services/cpdDataService';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface ComplianceDashboardProps {
  onAddEntry?: () => void;
  onViewHistory?: () => void;
  onManageGoals?: () => void;
}

const ComplianceDashboard = ({
  onAddEntry,
  onViewHistory,
  onManageGoals,
}: ComplianceDashboardProps = {}) => {
  const { compliance, settings, reminders, loading } = useEnhancedCPD();
  const { entries, goals } = useCPDData();

  const handleExportPDF = () => {
    if (compliance && entries && goals) {
      const statsData: CPDStats = {
        totalHours: compliance.hoursCompleted,
        hoursThisYear: compliance.hoursCompleted,
        targetHours: compliance.hoursRequired,
        completionPercentage: Math.round(
          (compliance.hoursCompleted / compliance.hoursRequired) * 100
        ),
        daysRemaining: Math.ceil(
          (new Date(`${new Date().getFullYear()}-12-31`).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        ),
        hoursThisMonth: entries
          .filter(
            (e) =>
              new Date(e.date).getMonth() === new Date().getMonth() &&
              new Date(e.date).getFullYear() === new Date().getFullYear()
          )
          .reduce((sum, e) => sum + e.hours, 0),
        averageHoursPerMonth: compliance.hoursCompleted / 12,
        categoryBreakdown: compliance.categoryGaps.map((gap) => ({
          category: gap.category,
          hours: gap.completed,
          percentage: Math.round((gap.completed / compliance.hoursCompleted) * 100),
        })),
      };
      cpdExportService.exportToPDF(entries, statsData, goals);
    }
  };

  const handleExportCSV = () => {
    if (entries) cpdExportService.exportToCSV(entries);
  };

  if (loading || !compliance || !settings) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 animate-pulse"
            >
              <div className="h-20 bg-white/[0.06] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statusTone = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'complete':
        return 'text-emerald-300';
      case 'at-risk':
      case 'on-track':
        return 'text-amber-300';
      case 'non-compliant':
      case 'behind':
        return 'text-red-300';
      default:
        return 'text-white/85';
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'compliant')
      return <CheckCircle className="h-4 w-4 text-emerald-300" aria-hidden />;
    if (status === 'at-risk')
      return <AlertTriangle className="h-4 w-4 text-amber-300" aria-hidden />;
    if (status === 'non-compliant')
      return <Shield className="h-4 w-4 text-red-300" aria-hidden />;
    return <Clock className="h-4 w-4 text-white/65" aria-hidden />;
  };

  const progressPercentage = Math.round(
    (compliance.hoursCompleted / compliance.hoursRequired) * 100
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Action row */}
      <section className="flex flex-wrap gap-2">
        {onAddEntry && (
          <button
            type="button"
            onClick={onAddEntry}
            className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add CPD entry
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {onViewHistory && (
          <ChipButton icon={Clock} label="History" onClick={onViewHistory} />
        )}
        {onManageGoals && <ChipButton icon={Target} label="Goals" onClick={onManageGoals} />}
        <ChipButton icon={Download} label="Export PDF" onClick={handleExportPDF} />
        <ChipButton icon={FileText} label="Export CSV" onClick={handleExportCSV} />
      </section>

      {/* BS 7671 currency strip — A4:2026 refresh */}
      <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="flex items-baseline gap-2">
            <Shield className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
            <Eyebrow>BS 7671 STANDARD</Eyebrow>
          </div>
          <span className="text-[11px] tabular-nums uppercase tracking-[0.14em] font-semibold text-emerald-300">
            Current
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3 text-[11px]">
          <Stat label="Edition" value="18th" subtitle="Wiring regulations" />
          <Stat label="Amendment" value="A4:2026" subtitle="Latest in force" accent />
          <Stat label="Next review" value="A5 — 2029" subtitle="Provisional cycle" />
        </dl>
        <p className="mt-3 pt-3 border-t border-white/[0.06] text-[11.5px] leading-relaxed text-white/85">
          A4:2026 introduces mandatory AFDD on socket circuits in HMOs + care premises, restricts
          TN-C-S (PNB) on EV/PV new-builds, and updates Schedule of Tests headers — refresh CPD
          should cover all three.
        </p>
      </section>

      {/* High-priority alerts */}
      {reminders
        .filter((r) => r.priority === 'high')
        .map((reminder) => (
          <div
            key={reminder.id}
            className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-red-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-red-300 shrink-0 self-center" aria-hidden />
              <div className="min-w-0">
                <Eyebrow>PRIORITY</Eyebrow>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
                  <span className="font-semibold">{reminder.title}:</span> {reminder.message}
                </p>
              </div>
            </div>
          </div>
        ))}

      {/* Overall compliance */}
      <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="flex items-baseline gap-2">
            <StatusIcon status={compliance.overallStatus} />
            <Eyebrow>OVERALL</Eyebrow>
          </div>
          <span
            className={cn(
              'text-[11px] uppercase tracking-[0.14em] font-semibold',
              statusTone(compliance.overallStatus)
            )}
          >
            {compliance.overallStatus.replace('-', ' ')}
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <div>
            <span
              className={cn(
                'text-[34px] sm:text-[40px] font-semibold tabular-nums',
                statusTone(compliance.overallStatus)
              )}
            >
              {progressPercentage}%
            </span>
            <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-white/65">
              Annual target
            </p>
          </div>
          <p className="text-[12px] tabular-nums text-white/85 self-end">
            <span className="text-white font-semibold">{compliance.hoursCompleted}</span> /{' '}
            {compliance.hoursRequired}h
          </p>
        </div>
        <Progress value={Math.min(progressPercentage, 100)} className="mt-3 h-1.5" />
      </section>

      {/* Professional bodies */}
      {settings.professionalBodies.length > 0 && (
        <section className="space-y-3">
          <Eyebrow>BY BODY</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {settings.professionalBodies.map((body, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-[14px] font-semibold text-white">{body.body}</h4>
                  <span
                    className={cn(
                      'text-[10px] uppercase tracking-[0.14em] font-semibold',
                      statusTone(body.complianceStatus)
                    )}
                  >
                    {body.complianceStatus}
                  </span>
                </div>
                {body.membershipNumber && (
                  <p className="mt-1 text-[11.5px] tabular-nums text-white/65">
                    #{body.membershipNumber}
                  </p>
                )}
                <dl className="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5 text-[12px]">
                  {body.renewalDate && (
                    <DateRow icon={Calendar} label="Renewal" date={body.renewalDate} />
                  )}
                  {body.nextAssessment && (
                    <DateRow icon={Award} label="Assessment" date={body.nextAssessment} />
                  )}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category progress */}
      <section className="space-y-3">
        <Eyebrow>BY CATEGORY</Eyebrow>
        <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 divide-y divide-white/[0.06]">
          {compliance.categoryGaps.map((gap, index) => (
            <div key={index} className="py-3 first:pt-0 last:pb-0 space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13.5px] font-semibold text-white capitalize">
                  {gap.category.replace('-', ' ')}
                </span>
                <div className="flex items-baseline gap-3 text-[11.5px] tabular-nums">
                  <span
                    className={cn(
                      'uppercase tracking-[0.14em] text-[10px] font-semibold',
                      statusTone(gap.status)
                    )}
                  >
                    {gap.status}
                  </span>
                  <span className="text-white/85">
                    <span className="text-white font-semibold">{gap.completed}</span>/{gap.required}h
                  </span>
                </div>
              </div>
              <Progress
                value={Math.min((gap.completed / gap.required) * 100, 100)}
                className="h-1.5"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      {compliance.recommendations.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
            <Eyebrow>RECOMMENDED</Eyebrow>
          </div>
          <ol className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 divide-y divide-white/[0.06]">
            {compliance.recommendations.map((rec, index) => (
              <li key={index} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[13px] leading-relaxed text-white">{rec}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Upcoming deadlines */}
      {compliance.nextDeadlines.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <Calendar className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
            <Eyebrow>DEADLINES</Eyebrow>
          </div>
          <ul className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] divide-y divide-white/[0.06]">
            {compliance.nextDeadlines.slice(0, 3).map((deadline, index) => {
              const daysUntil = Math.ceil(
                (new Date(deadline.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              const overdue = daysUntil <= 0;
              return (
                <li key={index} className="px-5 sm:px-6 py-3 first:rounded-t-2xl last:rounded-b-2xl">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-white truncate">
                        {deadline.description}
                      </p>
                      <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                        {deadline.type}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={cn(
                          'text-[12.5px] font-semibold tabular-nums',
                          overdue ? 'text-red-300' : 'text-elec-yellow'
                        )}
                      >
                        {overdue ? 'Overdue' : `${daysUntil}d`}
                      </p>
                      <p className="text-[10.5px] tabular-nums text-white/65">
                        {new Date(deadline.date).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Bell-icon footer hint, drops dead reference */}
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {(() => {
        // keep Bell import live in case future reminders use it
        const _ref = Bell;
        return null;
      })()}
    </div>
  );
};

const Stat = ({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string;
  value: string;
  subtitle: string;
  accent?: boolean;
}) => (
  <div className="min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
    <dd
      className={cn(
        'mt-0.5 text-[16px] sm:text-[17px] font-semibold tabular-nums',
        accent ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
    </dd>
    <p className="text-[10.5px] text-white/65">{subtitle}</p>
  </div>
);

const DateRow = ({
  icon: Icon,
  label,
  date,
}: {
  icon: React.ElementType;
  label: string;
  date: string;
}) => (
  <div className="flex items-baseline justify-between gap-3">
    <dt className="inline-flex items-baseline gap-1.5 text-white/85">
      <Icon className="h-3 w-3 text-white/65 self-center" aria-hidden />
      {label}
    </dt>
    <dd className="text-white tabular-nums">
      {new Date(date).toLocaleDateString('en-GB')}
    </dd>
  </div>
);

const ChipButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-3 py-2 min-h-[40px] touch-manipulation transition-colors"
  >
    <Icon className="h-3.5 w-3.5" aria-hidden />
    {label}
  </button>
);

export default ComplianceDashboard;

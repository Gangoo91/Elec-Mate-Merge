/**
 * MobileEnhancedCPD — editorial mobile CPD shell.
 *
 * Compact stat strip → urgent alerts → tabs (overview / quick add / recent
 * / alerts). Drops stock Card/Badge chrome and per-priority colour boxes
 * for editorial gradient surfaces, eyebrows, hairline dividers.
 */

import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Clock,
  Camera,
  Mic,
  MapPin,
  Bell,
  CheckCircle,
  AlertTriangle,
  Star,
  FileText,
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { CPD_ACTIVITY_TEMPLATES, QUICK_ACTIVITY_TEMPLATES } from '@/data/cpd-templates';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface MobileEnhancedCPDProps {
  onAddEntry?: () => void;
  onViewHistory?: () => void;
  onManageGoals?: () => void;
}

const surface =
  'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

const priorityTone = (p: string) =>
  p === 'high' ? 'text-red-300' : p === 'medium' ? 'text-amber-300' : 'text-blue-300';

const statusTone = (s: string) =>
  s === 'compliant' || s === 'complete'
    ? 'text-emerald-300'
    : s === 'at-risk' || s === 'on-track'
      ? 'text-amber-300'
      : 'text-red-300';

const MobileEnhancedCPD = ({ onAddEntry, onViewHistory }: MobileEnhancedCPDProps) => {
  const { entries, compliance, reminders, addFromTemplate } = useEnhancedCPD();
  const [activeTab, setActiveTab] = useState('dashboard');

  const recentEntries = entries.slice(0, 3);
  const urgentReminders = reminders.filter((r) => r.priority === 'high').slice(0, 2);
  const popularTemplates = CPD_ACTIVITY_TEMPLATES.filter((t) => t.isPopular).slice(0, 4);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickAdd = (template: any) => addFromTemplate(template);

  const pct = compliance
    ? Math.round((compliance.hoursCompleted / compliance.hoursRequired) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Header stat strip */}
      <section className={cn(surface, 'p-4')}>
        <dl className="grid grid-cols-3 gap-4 text-center">
          <Cell value={compliance?.hoursCompleted || 0} label="Hours" />
          <Cell value={entries.length} label="Activities" />
          <Cell value={`${pct}%`} label="Progress" accent />
        </dl>
        {compliance && (
          <div className="mt-3">
            <Progress value={Math.min(pct, 100)} className="h-1.5" />
            <p className="mt-1.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 text-center tabular-nums">
              {compliance.hoursRequired - compliance.hoursCompleted}h to target
            </p>
          </div>
        )}
      </section>

      {/* Urgent alerts */}
      {urgentReminders.length > 0 && (
        <ul className="space-y-2">
          {urgentReminders.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-red-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-3"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-300 shrink-0 self-center" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-white">{r.title}</p>
                  <p className="text-[11.5px] text-white/85">{r.message}</p>
                </div>
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-500/40 bg-red-500/[0.08] rounded-md px-1.5 py-0.5 shrink-0">
                  Urgent
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/[0.04] border border-white/[0.10] rounded-xl p-1">
          {[
            { v: 'dashboard', l: 'Overview' },
            { v: 'quick-add', l: 'Quick add' },
            { v: 'recent', l: 'Recent' },
            { v: 'reminders', l: 'Alerts' },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="text-[10.5px] uppercase tracking-[0.12em] font-semibold data-[state=active]:bg-elec-yellow/[0.08] data-[state=active]:text-elec-yellow"
            >
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview */}
        <TabsContent value="dashboard" className="space-y-3 mt-3">
          {compliance && (
            <section className={cn(surface, 'p-4')}>
              <div className="flex items-baseline justify-between gap-2">
                <Eyebrow>STATUS</Eyebrow>
                <span
                  className={cn(
                    'text-[10.5px] uppercase tracking-[0.14em] font-semibold',
                    statusTone(compliance.overallStatus)
                  )}
                >
                  {compliance.overallStatus.replace('-', ' ')}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={cn('text-[28px] font-semibold tabular-nums', statusTone(compliance.overallStatus))}>
                  {pct}%
                </span>
                <span className="text-[12px] tabular-nums text-white/85">
                  <span className="text-white font-semibold">{compliance.hoursCompleted}</span>/
                  {compliance.hoursRequired}h
                </span>
              </div>
              <Progress value={Math.min(pct, 100)} className="h-1.5 mt-2" />
              {compliance.recommendations.length > 0 && (
                <p className="mt-3 pt-3 border-t border-white/[0.06] text-[11.5px] leading-relaxed text-white/85">
                  <span className="text-elec-yellow font-semibold">Tip · </span>
                  {compliance.recommendations[0]}
                </p>
              )}
            </section>
          )}

          {compliance && compliance.categoryGaps.length > 0 && (
            <section className={cn(surface, 'p-4')}>
              <Eyebrow>BY CATEGORY</Eyebrow>
              <div className="mt-3 space-y-3">
                {compliance.categoryGaps.slice(0, 3).map((gap, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[12.5px] font-semibold text-white capitalize truncate">
                        {gap.category.replace('-', ' ')}
                      </span>
                      <span className={cn('text-[10.5px] uppercase tracking-[0.14em] font-semibold', statusTone(gap.status))}>
                        {gap.status} · <span className="tabular-nums text-white">{gap.completed}h</span>
                      </span>
                    </div>
                    <Progress value={Math.min((gap.completed / gap.required) * 100, 100)} className="h-1" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={cn(surface, 'p-4')}>
            <Eyebrow>QUICK ACTIONS</Eyebrow>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ChipAction icon={Plus} label="Log activity" onClick={onAddEntry} primary />
              <ChipAction icon={Camera} label="Photo" />
              <ChipAction icon={Mic} label="Voice note" />
              <ChipAction icon={MapPin} label="Site log" />
            </div>
          </section>
        </TabsContent>

        {/* Quick add */}
        <TabsContent value="quick-add" className="space-y-3 mt-3">
          <section className={cn(surface, 'p-4')}>
            <div className="flex items-baseline gap-2">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400 self-center" aria-hidden />
              <Eyebrow>POPULAR</Eyebrow>
            </div>
            <ul className="mt-3 divide-y divide-white/[0.06]">
              {popularTemplates.map((template) => (
                <li key={template.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-white truncate">
                        {template.title}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="text-[9.5px] uppercase tracking-[0.12em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5 tabular-nums">
                          {template.estimatedHours}h
                        </span>
                        <span className="text-[9.5px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                          {template.category.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(template)}
                      aria-label="Add"
                      className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/85 touch-manipulation transition-colors shrink-0"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={cn(surface, 'p-4')}>
            <Eyebrow>QUICK ACTIVITIES</Eyebrow>
            <ul className="mt-3 space-y-2">
              {QUICK_ACTIVITY_TEMPLATES.map((template) => (
                <li key={template.id}>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(template)}
                    className="w-full inline-flex items-center justify-between gap-2 text-left rounded-xl border border-white/[0.10] hover:border-elec-yellow/40 bg-white/[0.02] hover:bg-white/[0.04] p-3 touch-manipulation transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-semibold text-white truncate">
                        {template.title}
                      </p>
                      <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums mt-0.5">
                        {template.estimatedHours}h
                      </p>
                    </div>
                    <Plus className="h-4 w-4 text-elec-yellow shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>

        {/* Recent */}
        <TabsContent value="recent" className="space-y-3 mt-3">
          <section className={cn(surface, 'p-4')}>
            <div className="flex items-baseline justify-between gap-2">
              <Eyebrow>RECENT</Eyebrow>
              <button
                type="button"
                onClick={onViewHistory}
                className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-elec-yellow hover:text-elec-yellow/80 transition-colors"
              >
                View all
              </button>
            </div>
            {recentEntries.length > 0 ? (
              <ol className="mt-3 divide-y divide-white/[0.06]">
                {recentEntries.map((entry) => (
                  <li key={entry.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-3">
                      <FileText className="h-3.5 w-3.5 text-elec-yellow shrink-0 self-center" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-semibold text-white truncate">
                          {entry.activity}
                        </p>
                        <div className="mt-0.5 flex items-baseline gap-2 text-[10.5px] tabular-nums text-white/65">
                          <span>{new Date(entry.date).toLocaleDateString('en-GB')}</span>
                          <span className="text-white/40">·</span>
                          <span>{entry.hours}h</span>
                          <span className="text-white/40">·</span>
                          <span className="uppercase tracking-[0.12em] font-semibold">
                            {entry.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="text-center py-6">
                <Clock className="h-8 w-8 text-white/25 mx-auto" aria-hidden />
                <p className="mt-2 text-[12.5px] text-white/85">
                  No activities yet — log your first CPD entry.
                </p>
              </div>
            )}
          </section>
        </TabsContent>

        {/* Reminders */}
        <TabsContent value="reminders" className="space-y-3 mt-3">
          <section className={cn(surface, 'p-4')}>
            <div className="flex items-baseline gap-2">
              <Bell className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
              <Eyebrow>ALERTS</Eyebrow>
            </div>
            {reminders.length > 0 ? (
              <ul className="mt-3 divide-y divide-white/[0.06]">
                {reminders.slice(0, 5).map((reminder) => (
                  <li key={reminder.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-3">
                      <Bell
                        className={cn(
                          'h-3 w-3 shrink-0 self-center',
                          priorityTone(reminder.priority)
                        )}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-semibold text-white">{reminder.title}</p>
                        <p className="mt-0.5 text-[11.5px] text-white/85">{reminder.message}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="text-[9.5px] uppercase tracking-[0.12em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                            {reminder.type.replace('-', ' ')}
                          </span>
                          <span
                            className={cn(
                              'text-[9.5px] uppercase tracking-[0.12em] border rounded-md px-1.5 py-0.5',
                              reminder.priority === 'high'
                                ? 'text-red-300 border-red-500/40 bg-red-500/[0.08]'
                                : reminder.priority === 'medium'
                                  ? 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]'
                                  : 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]'
                            )}
                          >
                            {reminder.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="h-8 w-8 text-emerald-300 mx-auto" aria-hidden />
                <p className="mt-2 text-[12.5px] text-white/85">All caught up.</p>
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Cell = ({
  value,
  label,
  accent,
}: {
  value: number | string;
  label: string;
  accent?: boolean;
}) => (
  <div>
    <dd
      className={cn(
        'text-[18px] font-semibold tabular-nums',
        accent ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
    </dd>
    <dt className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
  </div>
);

const ChipAction = ({
  icon: Icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] rounded-full px-3 py-2 min-h-[40px] touch-manipulation transition-colors',
      primary
        ? 'text-black bg-elec-yellow hover:bg-elec-yellow/90'
        : 'text-white/85 border border-white/15 hover:border-white/30'
    )}
  >
    <Icon className="h-3.5 w-3.5" aria-hidden />
    {label}
  </button>
);

export default MobileEnhancedCPD;

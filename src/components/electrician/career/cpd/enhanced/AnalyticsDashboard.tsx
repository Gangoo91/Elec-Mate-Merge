/**
 * AnalyticsDashboard — editorial CPD analytics view.
 *
 * Stat strip → tabs (progress / categories / effectiveness / gaps). All
 * stock Card chrome, badge floods, and per-stat colour boxes replaced with
 * editorial gradient surfaces, eyebrows, hairline dividers, tabular nums.
 * Recharts retained — colours pulled from semantic CSS vars.
 */

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Target,
  Clock,
  BookOpen,
  Star,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const surface =
  'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

const Section = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn(surface, 'p-5 sm:p-6', className)}>
    <Eyebrow>{title}</Eyebrow>
    <div className="mt-4">{children}</div>
  </section>
);

const COLORS = ['#FFD60A', '#10B981', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];

const tone = (pct: number) =>
  pct >= 80 ? 'text-emerald-300' : pct >= 60 ? 'text-amber-300' : 'text-red-300';

const StatusGlyph = ({ pct }: { pct: number }) =>
  pct >= 80 ? (
    <CheckCircle className="h-4 w-4 text-emerald-300" aria-hidden />
  ) : pct >= 60 ? (
    <AlertTriangle className="h-4 w-4 text-amber-300" aria-hidden />
  ) : (
    <AlertTriangle className="h-4 w-4 text-red-300" aria-hidden />
  );

const AnalyticsDashboard = () => {
  const { getAnalytics } = useEnhancedCPD();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getAnalytics();
      if (!cancelled) setAnalytics(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [getAnalytics]);

  if (!analytics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={cn(surface, 'p-5 animate-pulse')}>
            <div className="h-20 bg-white/[0.06] rounded" />
          </div>
        ))}
      </div>
    );
  }

  const {
    monthlyProgress,
    categoryBreakdown,
    providerBreakdown,
    learningEffectiveness,
    competencyGaps,
  } = analytics;

  const totalHours = monthlyProgress.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, m: any) => sum + m.hours,
    0
  );
  const totalActivities = monthlyProgress.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, m: any) => sum + m.activities,
    0
  );

  const tooltipStyle = {
    backgroundColor: 'hsl(0 0% 11%)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#fff',
  };

  return (
    <div className="space-y-6">
      {/* Stat strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KeyStat icon={Clock} label="Total hours" value={totalHours} />
        <KeyStat icon={Target} label="Activities" value={totalActivities} />
        <KeyStat
          icon={Award}
          label="Effectiveness"
          value={`${learningEffectiveness.overallEffectiveness}%`}
          accent
        />
        <KeyStat
          icon={TrendingUp}
          label="Competency"
          value={`${competencyGaps.completionPercentage}%`}
        />
      </section>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/[0.04] border border-white/[0.10] rounded-xl p-1">
          {[
            { v: 'progress', l: 'Progress' },
            { v: 'categories', l: 'Categories' },
            { v: 'effectiveness', l: 'Quality' },
            { v: 'gaps', l: 'Skill gaps' },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="text-[11px] uppercase tracking-[0.14em] font-semibold data-[state=active]:bg-elec-yellow/[0.08] data-[state=active]:text-elec-yellow"
            >
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Progress */}
        <TabsContent value="progress" className="space-y-5 mt-4">
          <Section title="MONTHLY HOURS">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.65)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.65)" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="hours" fill="#FFD60A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section title="ACTIVITY TREND">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.65)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.65)" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="activities" stroke="#FFD60A" strokeWidth={2} dot={{ fill: '#FFD60A', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Section>

            <Section title="TOP PROVIDERS">
              <div className="divide-y divide-white/[0.06]">
                {providerBreakdown
                  .slice(0, 5)
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .map((provider: any) => (
                    <div key={provider.provider} className="py-3 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[13px] font-semibold text-white truncate">
                          {provider.provider}
                        </span>
                        <span className="text-[11.5px] tabular-nums text-white/85 shrink-0">
                          <span className="text-white font-semibold">{provider.hours}</span>h ·{' '}
                          {provider.activities}
                        </span>
                      </div>
                      <Progress
                        value={(provider.hours / providerBreakdown[0]?.hours) * 100}
                        className="h-1.5"
                      />
                    </div>
                  ))}
              </div>
            </Section>
          </div>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories" className="space-y-5 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Section title="DISTRIBUTION">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={88}
                    dataKey="hours"
                    label={({ category, hours }) => `${category}: ${hours}h`}
                    labelLine={false}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {categoryBreakdown.map((_: any, index: number) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </Section>

            <Section title="BREAKDOWN">
              <div className="divide-y divide-white/[0.06]">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {categoryBreakdown.map((category: any, index: number) => (
                  <div key={category.category} className="py-3 first:pt-0 last:pb-0 space-y-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-semibold text-white inline-flex items-baseline gap-2">
                        <span
                          className="w-2 h-2 rounded-full self-center"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          aria-hidden
                        />
                        {category.category}
                      </span>
                      <span className="text-[11.5px] tabular-nums text-white/85">
                        <span className="text-white font-semibold">{category.hours}</span>h ·{' '}
                        {category.activities}
                      </span>
                    </div>
                    <Progress
                      value={
                        (category.hours /
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          Math.max(...categoryBreakdown.map((c: any) => c.hours))) *
                        100
                      }
                      className="h-1.5"
                    />
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </TabsContent>

        {/* Effectiveness */}
        <TabsContent value="effectiveness" className="space-y-5 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <RateCell
              label="Evidence rate"
              value={learningEffectiveness.evidenceRate}
              subtitle="Activities with proof"
            />
            <RateCell
              label="Reflection rate"
              value={learningEffectiveness.reflectionRate}
              subtitle="With reflection notes"
            />
            <RateCell
              label="Verification rate"
              value={learningEffectiveness.verificationRate}
              subtitle="Verified activities"
            />
          </div>

          <Section title="QUALITY RECOMMENDATIONS">
            <ul className="space-y-2">
              {learningEffectiveness.evidenceRate < 70 && (
                <Recommendation tone="warn" icon={AlertTriangle} title="Improve evidence collection">
                  Upload certificates, photos or receipts for more activities — verifiers want
                  proof, not just hours.
                </Recommendation>
              )}
              {learningEffectiveness.reflectionRate < 60 && (
                <Recommendation tone="info" icon={BookOpen} title="Add more reflection">
                  Write 2-3 lines per entry on what you learned and how you'll apply it on the
                  next job.
                </Recommendation>
              )}
              {learningEffectiveness.overallEffectiveness >= 80 && (
                <Recommendation tone="ok" icon={Star} title="Excellent quality">
                  Your CPD is well-evidenced and reflective — exactly what NICEIC/ECA assessors
                  look for.
                </Recommendation>
              )}
            </ul>
          </Section>
        </TabsContent>

        {/* Gaps */}
        <TabsContent value="gaps" className="space-y-5 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section title="COMPETENCY">
              <div className="text-center">
                <div
                  className={cn(
                    'text-[34px] font-semibold tabular-nums',
                    tone(competencyGaps.completionPercentage)
                  )}
                >
                  {competencyGaps.completionPercentage}%
                </div>
                <p className="mt-0.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                  Overall progress
                </p>
                <Progress value={competencyGaps.completionPercentage} className="h-1.5 mt-3" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                <div className="text-center">
                  <div className="text-[20px] font-semibold tabular-nums text-emerald-300">
                    {competencyGaps.acquiredCompetencies}
                  </div>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                    Acquired
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-semibold tabular-nums text-amber-300">
                    {competencyGaps.identifiedGaps.length}
                  </div>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                    Gaps
                  </p>
                </div>
              </div>
            </Section>

            <Section title="IDENTIFIED GAPS">
              {competencyGaps.identifiedGaps.length > 0 ? (
                <ol className="divide-y divide-white/[0.06]">
                  {competencyGaps.identifiedGaps.map((gap: string, index: number) => (
                    <li key={index} className="py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[10.5px] tabular-nums font-semibold text-amber-300 shrink-0 w-5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[13px] text-white">{gap}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="h-8 w-8 text-emerald-300 mx-auto" aria-hidden />
                  <p className="mt-2 text-[13px] text-white">No gaps identified.</p>
                </div>
              )}
            </Section>
          </div>

          {competencyGaps.identifiedGaps.length > 0 && (
            <Section title="RECOMMENDED ACTIONS">
              <ul className="divide-y divide-white/[0.06]">
                {competencyGaps.identifiedGaps
                  .slice(0, 3)
                  .map((gap: string, index: number) => (
                    <li key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[13.5px] font-semibold text-white">{gap}</h4>
                          <p className="mt-0.5 text-[12px] leading-relaxed text-white/85">
                            Look for a short course or webinar in this area to close the gap.
                          </p>
                          <span className="mt-1.5 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 border border-amber-500/40 bg-amber-500/[0.08] rounded-md px-1.5 py-0.5">
                            High priority
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </Section>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const KeyStat = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  accent?: boolean;
}) => (
  <div className={cn(surface, 'p-4')}>
    <div className="flex items-baseline justify-between gap-2">
      <Icon
        className={cn('h-3.5 w-3.5', accent ? 'text-emerald-300' : 'text-elec-yellow')}
        aria-hidden
      />
      <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
        {label}
      </span>
    </div>
    <div
      className={cn(
        'mt-2 text-[22px] sm:text-[26px] font-semibold tabular-nums',
        accent ? 'text-emerald-300' : 'text-white'
      )}
    >
      {value}
    </div>
  </div>
);

const RateCell = ({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: number;
  subtitle: string;
}) => (
  <div className={cn(surface, 'p-5')}>
    <div className="flex items-baseline justify-between gap-2">
      <Eyebrow>{label.toUpperCase()}</Eyebrow>
      <StatusGlyph pct={value} />
    </div>
    <div className="mt-3 flex items-baseline gap-2">
      <span className={cn('text-[26px] font-semibold tabular-nums', tone(value))}>{value}%</span>
    </div>
    <Progress value={value} className="h-1.5 mt-2" />
    <p className="mt-2 text-[11.5px] text-white/85">{subtitle}</p>
  </div>
);

const Recommendation = ({
  tone: t,
  icon: Icon,
  title,
  children,
}: {
  tone: 'ok' | 'warn' | 'info';
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => {
  const colour =
    t === 'ok' ? 'text-emerald-300' : t === 'warn' ? 'text-amber-300' : 'text-blue-300';
  return (
    <li className="flex items-baseline gap-3 py-3 first:pt-0 last:pb-0 border-b border-white/[0.06] last:border-0">
      <Icon className={cn('h-4 w-4 shrink-0 self-center', colour)} aria-hidden />
      <div className="min-w-0">
        <h4 className={cn('text-[13.5px] font-semibold', colour)}>{title}</h4>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-white/85">{children}</p>
      </div>
    </li>
  );
};

export default AnalyticsDashboard;

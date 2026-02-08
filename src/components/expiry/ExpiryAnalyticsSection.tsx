/**
 * ExpiryAnalyticsSection
 * Renders conversion metrics and monthly trends from analyticsHelper.ts.
 * Shows: re-test conversion rate, revenue recaptured, monthly trend chart.
 */

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CalendarCheck, PoundSterling } from 'lucide-react';
import { calculateConversionMetrics, getMonthlyTrends, formatResponseTime, type ConversionMetrics, type MonthlyTrend } from '@/utils/analyticsHelper';
import type { ExpiryReminder } from '@/types/expiryTypes';
import { cn } from '@/lib/utils';

interface ExpiryAnalyticsSectionProps {
  reminders: ExpiryReminder[];
  className?: string;
}

const MetricCard = ({
  icon: Icon,
  label,
  value,
  suffix = '%',
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
    <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0', color)}>
      <Icon className="h-4 w-4 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">
        {suffix === '£' ? `£${value.toLocaleString()}` : `${value.toFixed(0)}${suffix}`}
      </p>
    </div>
  </div>
);

export const ExpiryAnalyticsSection: React.FC<ExpiryAnalyticsSectionProps> = ({
  reminders,
  className,
}) => {
  const metrics = calculateConversionMetrics(reminders);
  const trends = getMonthlyTrends(reminders, 6);
  const totalRevenue = reminders.filter(r => r.reminder_status === 'completed').length * 250;

  if (reminders.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        Expiry Analytics
      </h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={Users}
          label="Contact Rate"
          value={metrics.contactRate}
          color="bg-blue-500/80"
        />
        <MetricCard
          icon={CalendarCheck}
          label="Booking Rate"
          value={metrics.bookingRate}
          color="bg-purple-500/80"
        />
        <MetricCard
          icon={TrendingUp}
          label="Completion Rate"
          value={metrics.completionRate}
          color="bg-green-500/80"
        />
        <MetricCard
          icon={PoundSterling}
          label="Revenue Recaptured"
          value={totalRevenue}
          suffix="£"
          color="bg-elec-yellow/80"
        />
      </div>

      {/* Response Time */}
      {metrics.avgResponseTime > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Average response time: {formatResponseTime(metrics.avgResponseTime)}
        </p>
      )}

      {/* Monthly Trend Chart */}
      {trends.length > 1 && (
        <div className="p-4 rounded-xl bg-card/30 border border-border/30">
          <p className="text-xs font-medium text-muted-foreground mb-3">Monthly Completions & Revenue</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="expiryRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expiryCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#e2e8f0',
                }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                fill="url(#expiryCompleted)"
                strokeWidth={2}
                name="Completed"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#facc15"
                fill="url(#expiryRevenue)"
                strokeWidth={2}
                name="Revenue (£)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

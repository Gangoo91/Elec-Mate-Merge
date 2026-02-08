import React, { useState, useEffect, useMemo } from 'react';
import {
  PoundSterling,
  FileText,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { useCustomerReports } from '@/hooks/inspection/useCustomerReports';
import { useCustomerActivity } from '@/hooks/inspection/useCustomerActivity';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface CustomerDetailAnalyticsProps {
  customerId: string;
}

const CERT_COLOURS: Record<string, string> = {
  eicr: '#f59e0b',
  eic: '#3b82f6',
  'minor-works': '#10b981',
  'fire-alarm': '#ef4444',
  'emergency-lighting': '#8b5cf6',
  'ev-charging': '#06b6d4',
  'solar-pv': '#f97316',
};

const CERT_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'fire-alarm': 'Fire Alarm',
  'emergency-lighting': 'Emergency Lighting',
  'ev-charging': 'EV Charging',
  'solar-pv': 'Solar PV',
};

const formatCurrency = (value: number): string => {
  if (value >= 1000) return `£${(value / 1000).toFixed(1)}k`;
  return `£${value.toFixed(0)}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-card/95 backdrop-blur-xl px-3 py-2 text-sm shadow-xl">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          {p.name}: {typeof p.value === 'number' && p.dataKey?.includes('value')
            ? formatCurrency(p.value)
            : p.value}
        </p>
      ))}
    </div>
  );
};

export const CustomerDetailAnalytics = ({ customerId }: CustomerDetailAnalyticsProps) => {
  const { reports, isLoading: reportsLoading } = useCustomerReports(customerId);
  const { activities, isLoading: activityLoading } = useCustomerActivity(customerId);
  const [quoteStats, setQuoteStats] = useState<{
    totalQuoted: number;
    totalInvoiced: number;
    quoteCount: number;
    invoiceCount: number;
  }>({ totalQuoted: 0, totalInvoiced: 0, quoteCount: 0, invoiceCount: 0 });
  const [loadingQuotes, setLoadingQuotes] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await supabase.rpc('get_customer_quote_stats', {
          p_customer_ids: [customerId],
        });
        if (data && data.length > 0) {
          const row = data[0];
          setQuoteStats({
            totalQuoted: Number(row.total_quoted || 0),
            totalInvoiced: Number(row.total_invoiced || 0),
            quoteCount: row.quote_count || 0,
            invoiceCount: row.invoice_count || 0,
          });
        }
      } catch {
        // RPC not available
      } finally {
        setLoadingQuotes(false);
      }
    };
    fetchStats();
  }, [customerId]);

  // Certificate history — certs per month by type, last 6 months
  const certHistoryData = useMemo(() => {
    if (!reports || reports.length === 0) return [];
    const now = new Date();
    const months: { key: string; label: string }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        label: d.toLocaleDateString('en-GB', { month: 'short' }),
      });
    }

    return months.map(m => {
      const entry: Record<string, any> = { month: m.label };
      for (const r of reports) {
        const rMonth = r.created_at.slice(0, 7);
        if (rMonth === m.key) {
          const type = r.report_type || 'other';
          entry[type] = (entry[type] || 0) + 1;
        }
      }
      return entry;
    });
  }, [reports]);

  // Unique cert types for stacked bar
  const certTypes = useMemo(() => {
    if (!reports) return [];
    const types = new Set(reports.map(r => r.report_type || 'other'));
    return Array.from(types);
  }, [reports]);

  // Activity frequency — interactions per month, last 6 months
  const activityFrequency = useMemo(() => {
    if (!activities || activities.length === 0) return [];
    const now = new Date();
    const months: { key: string; label: string }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        label: d.toLocaleDateString('en-GB', { month: 'short' }),
      });
    }

    return months.map(m => {
      const count = activities.filter(a => a.createdAt.slice(0, 7) === m.key).length;
      return { month: m.label, count };
    });
  }, [activities]);

  const totalValue = quoteStats.totalQuoted + quoteStats.totalInvoiced;
  const averageJobValue = quoteStats.quoteCount + quoteStats.invoiceCount > 0
    ? totalValue / (quoteStats.quoteCount + quoteStats.invoiceCount)
    : 0;

  const isLoading = reportsLoading || activityLoading || loadingQuotes;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <PoundSterling className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs text-muted-foreground">Quoted</span>
          </div>
          <p className="text-lg font-bold text-green-400">{formatCurrency(quoteStats.totalQuoted)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <FileText className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs text-muted-foreground">Invoiced</span>
          </div>
          <p className="text-lg font-bold text-blue-400">{formatCurrency(quoteStats.totalInvoiced)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs text-muted-foreground">Avg Job</span>
          </div>
          <p className="text-lg font-bold text-amber-400">{formatCurrency(averageJobValue)}</p>
        </div>
      </div>

      {/* Certificate History Chart */}
      {certHistoryData.length > 0 && certTypes.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Certificate History
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={certHistoryData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {certTypes.map((type) => (
                  <Bar
                    key={type}
                    dataKey={type}
                    name={CERT_LABELS[type] || type.toUpperCase()}
                    stackId="certs"
                    fill={CERT_COLOURS[type] || '#6b7280'}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={32}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {certTypes.map((type) => (
              <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CERT_COLOURS[type] || '#6b7280' }}
                />
                {CERT_LABELS[type] || type.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Frequency Line Chart */}
      {activityFrequency.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Activity Frequency
          </h3>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityFrequency} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Activities"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 3 }}
                  activeDot={{ r: 5, stroke: '#8b5cf6', strokeWidth: 2, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Empty state */}
      {certTypes.length === 0 && activityFrequency.length === 0 && totalValue === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-8 text-center">
          <TrendingUp className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Analytics will appear once this customer has certificates or activity
          </p>
        </div>
      )}
    </div>
  );
};

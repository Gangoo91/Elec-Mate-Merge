import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  PoundSterling,
  FileText,
  AlertTriangle,
  ChevronDown,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useCustomerAnalytics } from '@/hooks/useCustomerAnalytics';
import { cn } from '@/lib/utils';

const PIE_COLOURS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#f97316'];

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
          {typeof p.value === 'number' && p.name === 'revenue'
            ? formatCurrency(p.value)
            : p.value}
        </p>
      ))}
    </div>
  );
};

export const CustomerAnalyticsPanel = () => {
  const { data, isLoading } = useCustomerAnalytics();
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    {
      label: 'Customers',
      value: data.totalCustomers,
      icon: Users,
      colour: 'text-elec-yellow',
      bgColour: 'bg-elec-yellow/10',
      sub: data.customersLastMonth > 0 ? `+${data.customersLastMonth} last month` : undefined,
    },
    {
      label: 'Revenue',
      value: formatCurrency(data.totalRevenue),
      icon: PoundSterling,
      colour: 'text-green-400',
      bgColour: 'bg-green-400/10',
    },
    {
      label: 'Certificates',
      value: data.activeCertificates,
      icon: FileText,
      colour: 'text-blue-400',
      bgColour: 'bg-blue-400/10',
    },
    {
      label: 'Expiring',
      value: data.expiringSoonCount,
      icon: AlertTriangle,
      colour: data.expiringSoonCount > 0 ? 'text-amber-400' : 'text-green-400',
      bgColour: data.expiringSoonCount > 0 ? 'bg-amber-400/10' : 'bg-green-400/10',
      sub: data.expiringSoonCount > 0 ? 'within 30 days' : 'none due',
    },
  ];

  return (
    <div className="space-y-3">
      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', stat.bgColour)}>
                <stat.icon className={cn('h-3.5 w-3.5', stat.colour)} />
              </div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className={cn('text-lg font-bold', stat.colour)}>
              {stat.value}
            </p>
            {stat.sub && (
              <p className="text-[11px] text-muted-foreground mt-0.5">{stat.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-3 min-h-[44px] rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium touch-manipulation active:bg-white/[0.04] transition-colors"
      >
        <TrendingUp className="h-4 w-4 text-elec-yellow" />
        <span className="flex-1 text-left">View Insights</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expandable Charts Section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden space-y-4"
          >
            {/* Customer Growth Bar Chart */}
            {data.customerGrowth.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  Customer Growth
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.customerGrowth} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
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
                      <Bar
                        dataKey="count"
                        fill="hsl(var(--elec-yellow))"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Revenue by Customer — Horizontal Bar */}
            {data.revenueByCustomer.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Top Customers by Revenue
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.revenueByCustomer}
                      layout="vertical"
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => formatCurrency(v)}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={false}
                        tickLine={false}
                        width={80}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="revenue"
                        fill="#10b981"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={28}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Two-column: Cert Distribution + Activity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Certificate Type Distribution — Pie */}
              {data.certTypeDistribution.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Certificate Types
                  </h3>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.certTypeDistribution}
                          dataKey="count"
                          nameKey="type"
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={4}
                        >
                          {data.certTypeDistribution.map((_, i) => (
                            <Cell key={i} fill={PIE_COLOURS[i % PIE_COLOURS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {data.certTypeDistribution.map((item, i) => (
                      <div key={item.type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: PIE_COLOURS[i % PIE_COLOURS.length] }}
                        />
                        {item.type} ({item.count})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity by Day of Week */}
              {data.activityByDay.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    Busiest Days
                  </h3>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.activityByDay} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                        <XAxis
                          dataKey="day"
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
                        <Bar
                          dataKey="count"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={32}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const IncidentStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    byType: [] as Array<{ name: string; value: number; color: string }>,
    bySeverity: [] as Array<{ name: string; value: number; color: string }>,
    byStatus: [] as Array<{ name: string; value: number; color: string }>,
    byMonth: [] as Array<{ month: string; incidents: number }>,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data: incidents, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const incidentData = incidents || [];

      const total = incidentData.length;

      const typeCount: Record<string, number> = {};
      const severityCount: Record<string, number> = {};
      const statusCount: Record<string, number> = {};
      const monthCount: Record<string, number> = {};

      incidentData.forEach((incident) => {
        const type = incident.incident_type;
        typeCount[type] = (typeCount[type] || 0) + 1;

        const severity = incident.severity;
        severityCount[severity] = (severityCount[severity] || 0) + 1;

        const status = incident.status;
        statusCount[status] = (statusCount[status] || 0) + 1;

        const month = new Date(incident.date_occurred).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        });
        monthCount[month] = (monthCount[month] || 0) + 1;
      });

      const typeColors = [
        '#f59e0b',
        '#3b82f6',
        '#ef4444',
        '#10b981',
        '#8b5cf6',
        '#f97316',
        '#06b6d4',
        '#84cc16',
      ];
      const byType = Object.entries(typeCount).map(([name, value], index) => ({
        name: name.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value,
        color: typeColors[index % typeColors.length],
      }));

      const severityColors = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#f97316',
        critical: '#ef4444',
      };
      const bySeverity = Object.entries(severityCount).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: severityColors[name as keyof typeof severityColors] || '#6b7280',
      }));

      const statusColors = {
        draft: '#6b7280',
        submitted: '#3b82f6',
        under_review: '#f59e0b',
        investigating: '#f97316',
        resolved: '#10b981',
        closed: '#64748b',
      };
      const byStatus = Object.entries(statusCount).map(([name, value]) => ({
        name: name.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value,
        color: statusColors[name as keyof typeof statusColors] || '#6b7280',
      }));

      const byMonth = Object.entries(monthCount)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([month, incidents]) => ({ month, incidents }));

      setStats({
        total,
        byType,
        bySeverity,
        byStatus,
        byMonth,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 animate-pulse"
          >
            <div className="h-3 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-white/10 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.1) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const summaryCard = (label: string, value: number | string) => (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
      <p className="text-2xl font-mono text-white">{value}</p>
    </div>
  );

  const inProgressCount = stats.byStatus
    .filter((s) => ['Under Review', 'Investigating'].includes(s.name))
    .reduce((sum, s) => sum + s.value, 0);

  const thisMonthCount =
    stats.byMonth.length > 0 ? stats.byMonth[stats.byMonth.length - 1]?.incidents || 0 : 0;

  const chartCard = (title: string, children: React.ReactNode) => (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {title}
      </span>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCard('Total incidents', stats.total)}
        {summaryCard(
          'Resolved',
          stats.byStatus.find((s) => s.name === 'Resolved')?.value || 0
        )}
        {summaryCard('In progress', inProgressCount)}
        {summaryCard('This month', thisMonthCount)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {chartCard(
          'Incidents by type',
          stats.byType.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.byType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.byType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[14px] text-white/55">
              No data available
            </div>
          )
        )}

        {chartCard(
          'Incidents by severity',
          stats.bySeverity.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.bySeverity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                <YAxis tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[14px] text-white/55">
              No data available
            </div>
          )
        )}

        {chartCard(
          'Incidents by status',
          stats.byStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.byStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.byStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[14px] text-white/55">
              No data available
            </div>
          )
        )}

        {chartCard(
          'Monthly trend',
          stats.byMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.byMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af' }} />
                <YAxis tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="incidents" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[14px] text-white/55">
              No data available
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default IncidentStats;

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { AccidentSeverityData } from '@/hooks/useSafetyTrends';

interface AccidentSeverityChartProps {
  data: AccidentSeverityData[];
}

export function AccidentSeverityChart({ data }: AccidentSeverityChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[120px]">
        <p className="text-sm text-white">No accident data — keep it that way</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="flex items-center gap-4">
      <div className="h-[120px] w-[120px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="severity"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={50}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.colour} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-1.5">
        {data.map((d) => (
          <div key={d.severity} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.colour }}
            />
            <span className="text-xs text-white flex-1">{d.severity}</span>
            <span className="text-xs font-bold text-white">{d.count}</span>
          </div>
        ))}
        <div className="pt-1 border-t border-white/[0.06]">
          <span className="text-[10px] text-white font-medium">
            {total} incident{total !== 1 ? 's' : ''} (12 months)
          </span>
        </div>
      </div>
    </div>
  );
}

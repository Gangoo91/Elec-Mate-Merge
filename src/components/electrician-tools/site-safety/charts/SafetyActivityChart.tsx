import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import type { ToolUsageData } from "@/hooks/useSafetyTrends";

interface SafetyActivityChartProps {
  data: ToolUsageData[];
}

export function SafetyActivityChart({ data }: SafetyActivityChartProps) {
  const hasData = data.some((d) => d.count > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-[120px]">
        <p className="text-sm text-white">No activity data yet</p>
      </div>
    );
  }

  return (
    <div className="h-[140px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, bottom: 5, left: 5 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "#ffffff", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="tool"
            type="category"
            tick={{ fill: "#ffffff", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={70}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Records">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.colour} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

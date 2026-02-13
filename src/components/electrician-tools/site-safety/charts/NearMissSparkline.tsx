import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import type { WeeklyNearMissData } from "@/hooks/useSafetyTrends";

interface NearMissSparklineProps {
  data: WeeklyNearMissData[];
}

export function NearMissSparkline({ data }: NearMissSparklineProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[120px]">
        <p className="text-sm text-white">No near-miss data yet</p>
      </div>
    );
  }

  return (
    <div className="h-[120px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
          <defs>
            <linearGradient id="nearMissGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="week"
            tick={{ fill: "#ffffff", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#f87171"
            strokeWidth={2}
            fill="url(#nearMissGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#f87171" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

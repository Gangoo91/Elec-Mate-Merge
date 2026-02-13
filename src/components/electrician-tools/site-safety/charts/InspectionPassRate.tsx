import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { InspectionResultData } from "@/hooks/useSafetyTrends";

interface InspectionPassRateProps {
  data: InspectionResultData[];
}

export function InspectionPassRate({ data }: InspectionPassRateProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[120px]">
        <p className="text-sm text-white">No inspection data yet</p>
      </div>
    );
  }

  return (
    <div className="h-[160px] w-full">
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
            dataKey="title"
            type="category"
            tick={{ fill: "#ffffff", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={80}
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
          <Bar
            dataKey="passed"
            stackId="a"
            fill="#4ade80"
            radius={[0, 0, 0, 0]}
            name="Passed"
          />
          <Bar
            dataKey="failed"
            stackId="a"
            fill="#f87171"
            radius={[0, 4, 4, 0]}
            name="Failed"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

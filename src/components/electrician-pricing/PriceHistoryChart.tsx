
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface PriceDataPoint {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  title: string;
  data: PriceDataPoint[];
  color: string;
  unit: string;
}

const PriceHistoryChart = ({ title, data, color, unit }: PriceHistoryChartProps) => {
  const config = {
    price: {
      label: title,
      color: color
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl">{title} Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                <XAxis 
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis
                  tickFormatter={(value) => `${unit}${value}`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={color}
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent payload={[]} />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceHistoryChart;

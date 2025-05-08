
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useEffect, useState } from "react";

interface RetentionData {
  day: string;
  w1Retention: number;
  w2Retention: number;
  w3Retention: number;
  w4Retention: number;
}

interface UserRetentionChartProps {
  timeRange: string;
}

const UserRetentionChart = ({ timeRange }: UserRetentionChartProps) => {
  const [data, setData] = useState<RetentionData[]>([]);
  
  useEffect(() => {
    // In a real implementation, this would fetch data from your backend
    const generateMockData = () => {
      const mockData: RetentionData[] = [];
      
      // Get number of days based on timeRange
      let days = 7;
      if (timeRange === "30d") days = 30;
      if (timeRange === "90d") days = 90;
      if (timeRange === "24h") days = 1;
      
      // Limit to last 10 data points for clarity
      const dataPoints = Math.min(days, 10);
      
      for (let i = 0; i < dataPoints; i++) {
        // Generate realistic retention data (decreasing over time)
        mockData.push({
          day: `Day ${i + 1}`,
          w1Retention: Math.round(95 - (i * 1.5) - Math.random() * 5),
          w2Retention: Math.round(85 - (i * 2) - Math.random() * 8),
          w3Retention: Math.round(75 - (i * 2.5) - Math.random() * 10),
          w4Retention: Math.round(65 - (i * 3) - Math.random() * 12),
        });
      }
      
      setData(mockData);
    };
    
    generateMockData();
  }, [timeRange]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          User Retention Analysis
        </CardTitle>
        <CardDescription>
          How well users are retained over time after initial sign-up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis 
                stroke="#888" 
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, undefined]}
                contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="w1Retention" 
                name="Week 1 Retention"
                stroke="#FFD700" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="w2Retention" 
                name="Week 2 Retention"
                stroke="#34d399" 
              />
              <Line 
                type="monotone" 
                dataKey="w3Retention" 
                name="Week 3 Retention"
                stroke="#60a5fa" 
              />
              <Line 
                type="monotone" 
                dataKey="w4Retention" 
                name="Week 4 Retention"
                stroke="#f472b6" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Analysis:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Week 1 retention is strong at 90%+ indicating good initial user experience</li>
            <li>• Significant drop observed between weeks 2-3 suggesting content engagement issues</li>
            <li>• Recent improvements in week 4 retention shows positive impact of new features</li>
          </ul>
          
          <div className="mt-4 p-3 bg-elec-yellow/10 rounded-md border border-elec-yellow/30">
            <h4 className="text-sm font-medium text-elec-yellow mb-1">Recommendation</h4>
            <p className="text-xs">Focus on improving the engagement between weeks 2-3 with more interactive content and personalized notifications.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRetentionChart;

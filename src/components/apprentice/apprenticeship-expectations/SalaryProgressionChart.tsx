
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { PoundSterling, TrendingUp } from "lucide-react";

const SalaryProgressionChart = () => {
  const salaryData = [
    { year: "Year 1", min: 15000, max: 20000, average: 17500 },
    { year: "Year 2", min: 20000, max: 25000, average: 22500 },
    { year: "Year 3", min: 26000, max: 32000, average: 29000 },
    { year: "Year 4", min: 30000, max: 38000, average: 34000 },
    { year: "Qualified", min: 34000, max: 50000, average: 42000 }
  ];

  const regionalData = [
    { region: "London", year1: 19000, year2: 24000, year3: 31000, year4: 38000, qualified: 46000 },
    { region: "Manchester", year1: 17000, year2: 21000, year3: 28000, year4: 33000, qualified: 40000 },
    { region: "Birmingham", year1: 17500, year2: 22000, year3: 29000, year4: 35000, qualified: 42000 },
    { region: "Scotland", year1: 16500, year2: 20500, year3: 27000, year4: 32000, qualified: 38000 }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Apprenticeship Salary Progression
          </CardTitle>
          <p className="text-sm text-muted-foreground">Expected salary ranges throughout your apprenticeship</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `£${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`£${value.toLocaleString()}`, '']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
                <Line type="monotone" dataKey="min" stroke="#EF4444" strokeWidth={2} name="Minimum" />
                <Line type="monotone" dataKey="average" stroke="#10B981" strokeWidth={3} name="Average" />
                <Line type="monotone" dataKey="max" stroke="#3B82F6" strokeWidth={2} name="Maximum" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-muted-foreground">Minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-muted-foreground">Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-muted-foreground">Maximum</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/30 bg-elec-gray/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Regional Salary Comparison
          </CardTitle>
          <p className="text-sm text-muted-foreground">How salaries vary across different UK regions</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="region" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `£${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`£${value.toLocaleString()}`, '']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                />
                <Bar dataKey="year1" fill="#EF4444" name="Year 1" />
                <Bar dataKey="year2" fill="#F59E0B" name="Year 2" />
                <Bar dataKey="year3" fill="#10B981" name="Year 3" />
                <Bar dataKey="year4" fill="#3B82F6" name="Year 4" />
                <Bar dataKey="qualified" fill="#8B5CF6" name="Qualified" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryProgressionChart;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from "recharts";
import {
  PoundSterling,
  TrendingUp,
  MapPin,
  Briefcase,
  Gift,
  Clock,
  Car,
  GraduationCap,
  CheckCircle,
  Info
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SalaryProgressionChart = () => {
  const isMobile = useIsMobile();

  const salaryData = [
    { year: "Year 1", min: 15000, max: 20000, average: 17500, label: "Y1" },
    { year: "Year 2", min: 20000, max: 25000, average: 22500, label: "Y2" },
    { year: "Year 3", min: 26000, max: 32000, average: 29000, label: "Y3" },
    { year: "Year 4", min: 30000, max: 38000, average: 34000, label: "Y4" },
    { year: "Qualified", min: 34000, max: 50000, average: 42000, label: "Qual" }
  ];

  const regionalData = [
    { region: "London", year1: 19000, year2: 24000, year3: 31000, year4: 38000, qualified: 46000 },
    { region: "Southeast", year1: 17500, year2: 22500, year3: 29500, year4: 36000, qualified: 44000 },
    { region: "Midlands", year1: 17000, year2: 21500, year3: 28500, year4: 35000, qualified: 42000 },
    { region: "North", year1: 16500, year2: 20500, year3: 27000, year4: 33000, qualified: 40000 },
    { region: "Scotland", year1: 16500, year2: 20500, year3: 27000, year4: 32000, qualified: 38000 }
  ];

  const careerEarnings = [
    { role: "Employed Electrician", salary: "£32k - £42k", growth: "Steady" },
    { role: "Self-Employed", salary: "£40k - £65k", growth: "Variable" },
    { role: "Industrial Specialist", salary: "£38k - £52k", growth: "Strong" },
    { role: "Renewables Specialist", salary: "£35k - £50k", growth: "Fast" },
    { role: "Electrical Supervisor", salary: "£42k - £55k", growth: "Good" },
    { role: "Project Manager", salary: "£50k - £70k", growth: "Excellent" }
  ];

  const benefitsData = [
    {
      icon: Car,
      title: "Company Van",
      description: "Many employers provide a van - worth £3-5k/year in personal use value",
      typical: "Common after Year 2"
    },
    {
      icon: Briefcase,
      title: "Tools Provided",
      description: "Power tools, test equipment, and specialist gear - £2-4k value",
      typical: "Usually from day one"
    },
    {
      icon: Gift,
      title: "Pension",
      description: "Employer contributions typically 3-5% of salary",
      typical: "Required by law"
    },
    {
      icon: Clock,
      title: "Overtime",
      description: "Time and a half to double time rates for extra hours",
      typical: "£5-15k extra possible"
    },
    {
      icon: GraduationCap,
      title: "Training",
      description: "Continued professional development and certifications paid",
      typical: "Worth £1-3k/year"
    }
  ];

  const overtimeExample = {
    baseSalary: 35000,
    weeklyHours: 40,
    overtimeHours: 8,
    overtimeRate: 1.5,
    weeklyOvertime: 8 * (35000 / 52 / 40) * 1.5,
    annualOvertime: 8 * (35000 / 52 / 40) * 1.5 * 48
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/5 border border-white/20 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/70">{entry.name}:</span>
              <span className="text-white font-medium">
                £{entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Main Salary Progression Chart */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Apprenticeship Salary Progression
          </CardTitle>
          <p className="text-sm text-white/70">
            Expected salary ranges throughout your 4-year apprenticeship
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salaryData}>
                <defs>
                  <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey={isMobile ? "label" : "year"}
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `£${value/1000}k`}
                  tick={{ fill: '#9CA3AF', fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 45 : 60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="max"
                  stroke="transparent"
                  fill="url(#colorRange)"
                  name="Maximum"
                />
                <Line
                  type="monotone"
                  dataKey="min"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Minimum"
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: isMobile ? 3 : 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Average"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: isMobile ? 4 : 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Maximum"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: isMobile ? 3 : 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 mt-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-white/70">Minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-white/70">Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-white/70">Maximum</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <p className="text-white/60 text-xs">Starting</p>
              <p className="text-lg font-bold text-white">£17.5k</p>
              <p className="text-white/60 text-xs">Year 1 avg</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <p className="text-white/60 text-xs">Qualified</p>
              <p className="text-lg font-bold text-green-400">£42k</p>
              <p className="text-white/60 text-xs">Average</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <p className="text-white/60 text-xs">4-Year Rise</p>
              <p className="text-lg font-bold text-elec-yellow">+140%</p>
              <p className="text-white/60 text-xs">Growth</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <p className="text-white/60 text-xs">Top Earners</p>
              <p className="text-lg font-bold text-purple-400">£50k+</p>
              <p className="text-white/60 text-xs">Specialists</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Comparison */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Salary Comparison
          </CardTitle>
          <p className="text-sm text-white/70">
            How salaries vary across different UK regions
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} barCategoryGap={isMobile ? "15%" : "20%"}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="region"
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: isMobile ? 9 : 12 }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `£${value/1000}k`}
                  tick={{ fill: '#9CA3AF', fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 45 : 60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="year1" fill="#EF4444" name="Year 1" radius={[2, 2, 0, 0]} />
                <Bar dataKey="year2" fill="#F59E0B" name="Year 2" radius={[2, 2, 0, 0]} />
                <Bar dataKey="year3" fill="#10B981" name="Year 3" radius={[2, 2, 0, 0]} />
                <Bar dataKey="year4" fill="#3B82F6" name="Year 4" radius={[2, 2, 0, 0]} />
                <Bar dataKey="qualified" fill="#8B5CF6" name="Qualified" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 text-xs flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded"></div>
              <span className="text-white/70">Y1</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded"></div>
              <span className="text-white/70">Y2</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded"></div>
              <span className="text-white/70">Y3</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded"></div>
              <span className="text-white/70">Y4</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded"></div>
              <span className="text-white/70">Qualified</span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-white/80 text-sm">
                London salaries are typically 10-15% higher due to cost of living, but other regions
                can offer better value when accounting for housing costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Path Earnings */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Career Path Earnings
          </CardTitle>
          <p className="text-sm text-white/70">
            What you could earn after qualifying
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {careerEarnings.map((career, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{career.role}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      career.growth === "Excellent" || career.growth === "Fast"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : career.growth === "Strong" || career.growth === "Good"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {career.growth}
                  </Badge>
                </div>
                <p className="text-green-400 text-lg font-bold">{career.salary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Beyond Salary */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Benefits Beyond Salary
          </CardTitle>
          <p className="text-sm text-white/70">
            Your total compensation package is more than just salary
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitsData.map((benefit, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <benefit.icon className="h-5 w-5 text-purple-400" />
                  <span className="font-medium text-white">{benefit.title}</span>
                </div>
                <p className="text-white/70 text-sm mb-2">{benefit.description}</p>
                <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
                  {benefit.typical}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overtime Calculator Example */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Overtime Impact Example
          </CardTitle>
          <p className="text-sm text-white/70">
            How overtime can significantly boost your earnings
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Scenario: Qualified Electrician</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70">Base Salary</span>
                  <span className="text-white font-medium">£35,000</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70">Standard Week</span>
                  <span className="text-white font-medium">40 hours</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70">Overtime Rate</span>
                  <span className="text-white font-medium">1.5x (time and a half)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70">Weekly Overtime</span>
                  <span className="text-white font-medium">8 hours average</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">Potential Total Earnings</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 rounded bg-white/5">
                  <span className="text-white/70">Base Salary</span>
                  <span className="text-white font-medium">£35,000</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-cyan-500/10">
                  <span className="text-cyan-400">Annual Overtime (8hrs/wk)</span>
                  <span className="text-cyan-400 font-medium">+£9,700</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-green-500/20 border border-green-500/30">
                  <span className="text-green-400 font-medium">Total Annual Earnings</span>
                  <span className="text-green-400 font-bold text-lg">£44,700</span>
                </div>
              </div>
              <p className="text-white/60 text-xs">
                * Calculation: (£35,000 ÷ 52 ÷ 40) × 1.5 × 8 hours × 48 weeks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-elec-yellow/10 border border-green-500/20">
        <h4 className="font-medium text-white mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          Key Salary Takeaways
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80 text-sm">
              Your salary more than doubles during your apprenticeship
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80 text-sm">
              Specialists and self-employed can earn £50-65k+
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80 text-sm">
              Benefits like van and tools add £5-10k+ in value
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80 text-sm">
              Overtime can add £5-15k to your annual earnings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryProgressionChart;

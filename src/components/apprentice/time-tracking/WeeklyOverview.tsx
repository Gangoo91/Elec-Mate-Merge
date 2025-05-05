
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WeeklyOverview = () => {
  const { entries } = useTimeEntries();
  const [chartData, setChartData] = useState<any[]>([]);
  const [weeks, setWeeks] = useState<string[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string>("current");

  // Process entries data for the chart
  useEffect(() => {
    // Get current date
    const currentDate = new Date();
    
    // Get an array of weeks
    const uniqueWeeks: string[] = [];
    const processedWeeks = new Set<string>();
    
    entries.forEach(entry => {
      const entryDate = new Date(entry.date);
      const weekStart = new Date(entryDate);
      weekStart.setDate(entryDate.getDate() - entryDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weekKey = `${weekStart.toISOString().split('T')[0]}_${weekEnd.toISOString().split('T')[0]}`;
      if (!processedWeeks.has(weekKey)) {
        processedWeeks.add(weekKey);
        uniqueWeeks.push(weekKey);
      }
    });
    
    // Sort weeks in descending order
    uniqueWeeks.sort((a, b) => {
      const dateA = new Date(a.split('_')[0]);
      const dateB = new Date(b.split('_')[0]);
      return dateB.getTime() - dateA.getTime();
    });
    
    setWeeks(uniqueWeeks);
    
    // Set default to current week
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const currentWeekKey = `${startOfWeek.toISOString().split('T')[0]}_${endOfWeek.toISOString().split('T')[0]}`;
    setSelectedWeek(uniqueWeeks.includes(currentWeekKey) ? currentWeekKey : uniqueWeeks[0] || "current");
    
    // Process chart data
    processChartData(selectedWeek);
  }, [entries, selectedWeek]);

  const processChartData = (weekKey: string) => {
    if (weekKey === "current" || !weekKey) {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      weekKey = `${startOfWeek.toISOString().split('T')[0]}_${endOfWeek.toISOString().split('T')[0]}`;
    }
    
    const [startDateStr, endDateStr] = weekKey.split('_');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    // Initialize data for each day of the week
    const weekData: any[] = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      const dayStr = currentDay.toISOString().split('T')[0];
      
      // Filter entries for this day
      const dayEntries = entries.filter(entry => entry.date === dayStr);
      
      // Calculate manual and automatic hours
      const manualMinutes = dayEntries
        .filter(entry => !entry.isAutomatic)
        .reduce((total, entry) => total + entry.duration, 0);
      
      const automaticMinutes = dayEntries
        .filter(entry => entry.isAutomatic)
        .reduce((total, entry) => total + entry.duration, 0);
      
      weekData.push({
        name: dayNames[i],
        date: dayStr,
        manual: Math.round(manualMinutes / 6) / 10, // Convert minutes to hours with 1 decimal place
        automatic: Math.round(automaticMinutes / 6) / 10,
      });
    }
    
    setChartData(weekData);
  };

  const handleWeekChange = (value: string) => {
    setSelectedWeek(value);
    processChartData(value);
  };

  // Format dates for display
  const formatDateRange = (weekKey: string) => {
    if (!weekKey || weekKey === "current") return "Current Week";
    
    const [startStr, endStr] = weekKey.split('_');
    const start = new Date(startStr);
    const end = new Date(endStr);
    
    return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-elec-gray p-3 border border-elec-yellow/20 rounded-md shadow-lg">
          <p className="font-medium">{`${label} (${payload[0]?.payload.date})`}</p>
          <p className="text-sm text-elec-yellow">{`Manual: ${payload[0]?.value} hrs`}</p>
          <p className="text-sm text-elec-yellow/70">{`Automatic: ${payload[1]?.value} hrs`}</p>
          <p className="text-sm font-medium mt-1">{`Total: ${(payload[0]?.value + payload[1]?.value).toFixed(1)} hrs`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Weekly Time Overview</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Select week:</span>
          <Select value={selectedWeek} onValueChange={handleWeekChange}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              {weeks.map((week) => (
                <SelectItem key={week} value={week}>
                  {formatDateRange(week)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis 
                  stroke="#888" 
                  label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { textFill: '#888' } }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="manual" name="Manual Entries" fill="#f7c948" />
                <Bar dataKey="automatic" name="Automatic Tracking" fill="#f7c94870" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Weekly summary for {formatDateRange(selectedWeek)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-elec-dark border-elec-yellow/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-bold text-elec-yellow">
              {chartData.reduce((sum, day) => sum + day.manual + day.automatic, 0).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total Hours This Week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border-elec-yellow/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-bold text-elec-yellow">
              {chartData.reduce((sum, day) => sum + day.manual, 0).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Manual Hours</p>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border-elec-yellow/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-bold text-elec-yellow">
              {chartData.reduce((sum, day) => sum + day.automatic, 0).toFixed(1)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Automatic Hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyOverview;

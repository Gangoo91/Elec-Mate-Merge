
import { useProjects } from "@/hooks/useProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, isThisMonth, parseISO } from "date-fns";
import { useMemo } from "react";
import { CircleDollarSign, Clipboard, ClipboardCheck, Clock, FileCheck } from "lucide-react";

export const ProjectAnalytics = () => {
  const { projects, loading } = useProjects();
  
  const analytics = useMemo(() => {
    if (loading || !projects.length) {
      return { 
        totalProjects: 0, 
        activeProjects: 0, 
        completedThisMonth: 0, 
        pendingInvoices: 0,
        totalBudget: 0,
        totalInvoiced: 0,
        totalPaid: 0,
        totalHours: 0,
        projectsByStatus: [],
        projectsByMonth: []
      };
    }
    
    // Calculate core metrics
    const activeProjects = projects.filter(p => p.status === "in-progress").length;
    const completedThisMonth = projects.filter(p => {
      return p.status === "completed" && isThisMonth(parseISO(p.updatedAt));
    }).length;
    const pendingInvoices = projects.filter(p => p.invoiceIssued && !p.invoicePaid).length;
    
    // Calculate financial metrics
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalInvoiced = projects.reduce((sum, p) => sum + (p.invoiceIssued && p.invoiceAmount ? p.invoiceAmount : 0), 0);
    const totalPaid = projects.reduce((sum, p) => sum + (p.invoicePaid && p.invoiceAmount ? p.invoiceAmount : 0), 0);
    
    // Calculate total hours worked
    const totalHours = projects.reduce((sum, p) => 
      sum + p.timeEntries.reduce((h, entry) => h + entry.hours, 0), 0);
    
    // Prepare data for charts
    const statusCounts = {
      "planning": 0,
      "in-progress": 0,
      "completed": 0,
      "on-hold": 0
    };
    
    projects.forEach(p => {
      if (p.status in statusCounts) {
        statusCounts[p.status]++;
      }
    });
    
    const projectsByStatus = [
      { name: "Planning", value: statusCounts.planning },
      { name: "In Progress", value: statusCounts["in-progress"] },
      { name: "Completed", value: statusCounts.completed },
      { name: "On Hold", value: statusCounts["on-hold"] }
    ];
    
    // Group projects by month created
    const monthData: Record<string, number> = {};
    projects.forEach(p => {
      const monthYear = format(parseISO(p.createdAt), "MMM yyyy");
      monthData[monthYear] = (monthData[monthYear] || 0) + 1;
    });
    
    const projectsByMonth = Object.keys(monthData).map(month => ({
      month,
      count: monthData[month]
    })).slice(-6); // Last 6 months
    
    return {
      totalProjects: projects.length,
      activeProjects,
      completedThisMonth,
      pendingInvoices,
      totalBudget,
      totalInvoiced,
      totalPaid,
      totalHours,
      projectsByStatus,
      projectsByMonth
    };
  }, [projects, loading]);
  
  if (loading) {
    return <div>Loading analytics...</div>;
  }
  
  // Get colors for status indicators
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Planning": return "#3B82F6"; // blue
      case "In Progress": return "#F59E0B"; // amber
      case "Completed": return "#10B981"; // green
      case "On Hold": return "#EF4444"; // red
      default: return "#6B7280"; // gray
    }
  };

  // Custom chart tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-elec-dark p-3 border border-elec-yellow/20 rounded shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-elec-yellow">{`Projects: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">All Projects</CardTitle>
            <Clipboard className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.activeProjects} currently active
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Budget Total</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{analytics.totalBudget.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-muted-foreground mt-1">
              across all projects
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Labour Hours</CardTitle>
            <Clock className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalHours.toLocaleString('en-GB', { maximumFractionDigits: 1 })}</div>
            <p className="text-xs text-muted-foreground mt-1">
              total tracked hours
            </p>
          </CardContent>
        </Card>
      </div>
      
      {analytics.totalProjects > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={analytics.projectsByMonth} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#999' }} 
                    axisLine={{ stroke: '#444' }}
                  />
                  <YAxis 
                    tick={{ fill: '#999' }} 
                    axisLine={{ stroke: '#444' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="count" 
                    name="Projects" 
                    fill="#FFC900" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


import { useProjects } from "@/hooks/useProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, isThisMonth, isThisWeek, parseISO } from "date-fns";
import { useMemo } from "react";
import { Project } from "@/types/project";

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
      projectsByStatus,
      projectsByMonth
    };
  }, [projects, loading]);
  
  if (loading) {
    return <div>Loading analytics...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.activeProjects} currently active
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completedThisMonth}</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{analytics.totalBudget.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pendingInvoices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              £{(analytics.totalInvoiced - analytics.totalPaid).toFixed(2)} outstanding
            </p>
          </CardContent>
        </Card>
      </div>
      
      {analytics.totalProjects > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Projects by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.projectsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FFD700" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

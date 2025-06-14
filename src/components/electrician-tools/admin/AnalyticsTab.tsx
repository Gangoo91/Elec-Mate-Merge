
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart4, TrendingUp, TrendingDown, DollarSign, Clock, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AnalyticsTab = () => {
  const businessMetrics = [
    {
      title: "Monthly Revenue",
      value: "£12,450",
      change: "+15.2%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5 text-green-400" />,
      period: "vs last month"
    },
    {
      title: "Active Projects",
      value: "23",
      change: "+3",
      trend: "up",
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      period: "this month"
    },
    {
      title: "Average Job Value",
      value: "£890",
      change: "-5.1%",
      trend: "down",
      icon: <BarChart4 className="h-5 w-5 text-yellow-400" />,
      period: "vs last month"
    },
    {
      title: "Team Utilisation",
      value: "87%",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      period: "this month"
    }
  ];

  const performanceAreas = [
    {
      area: "Project Completion Time",
      current: "8.2 days",
      target: "7 days",
      status: "improving",
      description: "Average time from start to completion"
    },
    {
      area: "Client Satisfaction",
      current: "4.7/5",
      target: "4.5/5",
      status: "excellent",
      description: "Based on client feedback surveys"
    },
    {
      area: "Profit Margin",
      current: "23%",
      target: "25%",
      status: "near-target",
      description: "Average profit margin on completed jobs"
    },
    {
      area: "Repeat Business",
      current: "68%",
      target: "70%",
      status: "near-target",
      description: "Percentage of returning clients"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-400 border-green-500/40";
      case "improving": return "text-blue-400 border-blue-500/40";
      case "near-target": return "text-yellow-400 border-yellow-500/40";
      default: return "text-gray-400 border-gray-500/40";
    }
  };

  const analyticsTools = [
    { name: "Business Analytics", description: "Comprehensive business performance dashboard", link: "/electrician-tools/business-analytics" },
    { name: "Financial Reports", description: "Detailed financial analysis and reports", link: "/electrician-tools/financial-tools" },
    { name: "Project Analytics", description: "Track project performance and profitability", link: "/electrician-tools/business-management" },
    { name: "Staff Performance", description: "Monitor team productivity and efficiency", link: "/electrician-tools/staff-management" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart4 className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Business Performance Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessMetrics.map((metric, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {metric.icon}
                    <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.period}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400">Performance Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceAreas.map((area, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{area.area}</h4>
                    <Badge variant="outline" className={getStatusColor(area.status)}>
                      {area.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Current: {area.current}</span>
                    <span>Target: {area.target}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{area.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-400">Analytics Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsTools.map((tool, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white text-sm">{tool.name}</h4>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                    <Link to={tool.link}>
                      <Button size="sm" variant="outline" className="border-purple-500/40 text-purple-400">
                        Open
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400">Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="border border-orange-500/20 rounded-lg p-4">
              <Clock className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Time Tracking</h4>
              <p className="text-xs text-muted-foreground">Monitor job duration and improve efficiency</p>
            </div>
            <div className="border border-orange-500/20 rounded-lg p-4">
              <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Growth Analysis</h4>
              <p className="text-xs text-muted-foreground">Track business growth and identify opportunities</p>
            </div>
            <div className="border border-orange-500/20 rounded-lg p-4">
              <BarChart4 className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Custom Reports</h4>
              <p className="text-xs text-muted-foreground">Generate detailed business reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;

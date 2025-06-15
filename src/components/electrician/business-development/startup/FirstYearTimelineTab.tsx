
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock, TrendingUp, Star } from "lucide-react";

const FirstYearTimelineTab = () => {
  const quarters = [
    {
      title: "Q1: Foundation & Setup",
      progress: 100,
      status: "complete",
      milestones: [
        { task: "Complete business registration", weeks: "1-2", priority: "high" },
        { task: "Obtain insurance and certifications", weeks: "2-4", priority: "high" },
        { task: "Set up business bank account", weeks: "2-3", priority: "high" },
        { task: "Purchase essential tools and equipment", weeks: "4-6", priority: "medium" },
        { task: "Create business plan and pricing strategy", weeks: "6-8", priority: "high" },
        { task: "Establish workspace/office", weeks: "8-10", priority: "medium" }
      ]
    },
    {
      title: "Q2: Market Entry & First Clients",
      progress: 75,
      status: "in-progress",
      milestones: [
        { task: "Launch marketing campaigns", weeks: "12-14", priority: "high" },
        { task: "Network with local builders and contractors", weeks: "14-16", priority: "high" },
        { task: "Complete first paid jobs", weeks: "16-20", priority: "high" },
        { task: "Establish supplier relationships", weeks: "18-22", priority: "medium" },
        { task: "Implement job tracking systems", weeks: "20-24", priority: "medium" }
      ]
    },
    {
      title: "Q3: Growth & Optimisation",
      progress: 30,
      status: "upcoming",
      milestones: [
        { task: "Hire first employee (if needed)", weeks: "26-28", priority: "medium" },
        { task: "Expand service offerings", weeks: "28-32", priority: "medium" },
        { task: "Implement customer feedback system", weeks: "30-34", priority: "low" },
        { task: "Review and adjust pricing", weeks: "32-36", priority: "high" },
        { task: "Explore commercial opportunities", weeks: "34-38", priority: "medium" }
      ]
    },
    {
      title: "Q4: Scaling & Planning",
      progress: 0,
      status: "planned",
      milestones: [
        { task: "Annual business review", weeks: "40-42", priority: "high" },
        { task: "Plan for year two expansion", weeks: "42-46", priority: "high" },
        { task: "Consider additional certifications", weeks: "44-48", priority: "medium" },
        { task: "Evaluate technology upgrades", weeks: "46-50", priority: "low" },
        { task: "Prepare tax returns and accounts", weeks: "48-52", priority: "high" }
      ]
    }
  ];

  const monthlyGoals = [
    { month: "Month 1", goal: "Legal setup complete", target: "100% compliance" },
    { month: "Month 2", goal: "First marketing push", target: "50 local contacts" },
    { month: "Month 3", goal: "First paid job", target: "£2,000+ revenue" },
    { month: "Month 6", goal: "Regular client base", target: "10+ repeat customers" },
    { month: "Month 9", goal: "Consistent workflow", target: "£10k+ monthly" },
    { month: "Month 12", goal: "Business sustainability", target: "£60k+ annual" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'upcoming': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            First Year Business Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">52</div>
              <div className="text-sm text-muted-foreground">Weeks to Success</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">25+</div>
              <div className="text-sm text-muted-foreground">Key Milestones</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-muted-foreground">Growth Phases</div>
            </div>
            <div className="bg-elec-yellow/10 rounded-lg p-4 border border-elec-yellow/20">
              <div className="text-2xl font-bold text-elec-yellow">£60K+</div>
              <div className="text-sm text-muted-foreground">Year 1 Target</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quarterly Breakdown</h3>
          {quarters.map((quarter, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{quarter.title}</CardTitle>
                  <Badge className={getStatusColor(quarter.status)}>
                    {quarter.status}
                  </Badge>
                </div>
                <Progress value={quarter.progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quarter.milestones.map((milestone, milestoneIndex) => (
                    <div key={milestoneIndex} className="flex items-center justify-between p-2 bg-elec-dark/30 rounded">
                      <div className="flex-1">
                        <span className="text-sm text-white">{milestone.task}</span>
                        <div className="text-xs text-muted-foreground">Weeks {milestone.weeks}</div>
                      </div>
                      <Badge className={getPriorityColor(milestone.priority)} variant="outline">
                        {milestone.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Monthly Revenue Goals</h3>
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-4">
              <div className="space-y-4">
                {monthlyGoals.map((goal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div>
                      <div className="font-medium text-green-200">{goal.month}</div>
                      <div className="text-sm text-muted-foreground">{goal.goal}</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300">{goal.target}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Success Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-200">Customer Satisfaction</span>
                  <span className="text-blue-300">95%+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-200">Repeat Business Rate</span>
                  <span className="text-blue-300">60%+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-200">Profit Margin</span>
                  <span className="text-blue-300">30%+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-200">Jobs Completed On Time</span>
                  <span className="text-blue-300">98%+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirstYearTimelineTab;

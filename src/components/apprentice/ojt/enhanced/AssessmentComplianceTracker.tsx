
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Target,
  BookOpen,
  FileText,
  TrendingUp,
  BarChart3
} from "lucide-react";

const AssessmentComplianceTracker = () => {
  // Mock assessment data
  const assessments = [
    {
      id: 1,
      title: "Unit 301 - Electrical Installation",
      type: "Practical Assessment",
      dueDate: "2024-02-15",
      status: "Completed",
      grade: "Merit",
      completedDate: "2024-01-20",
      feedback: "Good practical skills demonstrated"
    },
    {
      id: 2,
      title: "Unit 302 - Electrical Science",
      type: "Theory Exam",
      dueDate: "2024-02-20",
      status: "In Progress",
      grade: null,
      completedDate: null,
      feedback: null
    },
    {
      id: 3,
      title: "Health & Safety Assessment",
      type: "Written Assessment",
      dueDate: "2024-02-25",
      status: "Not Started",
      grade: null,
      completedDate: null,
      feedback: null
    }
  ];

  const complianceItems = [
    {
      id: 1,
      requirement: "Off-the-Job Training Hours",
      target: 832,
      current: 245,
      deadline: "2024-08-15",
      status: "On Track",
      type: "Training Hours"
    },
    {
      id: 2,
      requirement: "Portfolio Submissions",
      target: 20,
      current: 15,
      deadline: "2024-07-30",
      status: "Ahead",
      type: "Portfolio"
    },
    {
      id: 3,
      requirement: "Witness Testimonies",
      target: 5,
      current: 2,
      deadline: "2024-06-15",
      status: "Behind",
      type: "Documentation"
    }
  ];

  const milestones = [
    {
      id: 1,
      title: "First Year Review",
      date: "2024-03-01",
      status: "Upcoming",
      requirements: ["Complete 208 training hours", "Submit 5 portfolio items", "Pass health & safety assessment"]
    },
    {
      id: 2,
      title: "Mid-Point Assessment",
      date: "2024-06-01",
      status: "Planned",
      requirements: ["Complete 416 training hours", "Submit 10 portfolio items", "Complete all theory assessments"]
    },
    {
      id: 3,
      title: "Final Assessment",
      date: "2024-08-15",
      status: "Planned",
      requirements: ["Complete all 832 training hours", "Submit complete portfolio", "Pass final practical assessment"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "Not Started":
        return <Badge className="bg-gray-500">Not Started</Badge>;
      case "Overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "On Track":
        return <Badge className="bg-green-500">On Track</Badge>;
      case "Ahead":
        return <Badge className="bg-blue-500">Ahead</Badge>;
      case "Behind":
        return <Badge className="bg-orange-500">Behind</Badge>;
      case "At Risk":
        return <Badge className="bg-red-500">At Risk</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getMilestoneStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "Upcoming":
        return <Badge className="bg-orange-500">Upcoming</Badge>;
      case "Planned":
        return <Badge className="bg-blue-500">Planned</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const AssessmentOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">75%</div>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assessment & Compliance Tracker</h2>
          <p className="text-muted-foreground">Monitor your progress and compliance requirements</p>
        </div>
      </div>

      <AssessmentOverview />

      <Tabs defaultValue="assessments" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="assessments" className="flex-1">Assessments</TabsTrigger>
          <TabsTrigger value="compliance" className="flex-1">Compliance</TabsTrigger>
          <TabsTrigger value="milestones" className="flex-1">Milestones</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Assessment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{assessment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assessment.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(assessment.status)}
                        {assessment.grade && (
                          <Badge className="bg-purple-500">{assessment.grade}</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {assessment.dueDate}
                      </div>
                      {assessment.completedDate && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Completed: {assessment.completedDate}
                        </div>
                      )}
                      {assessment.feedback && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Feedback available
                        </div>
                      )}
                    </div>
                    
                    {assessment.feedback && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm">{assessment.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Compliance Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{item.requirement}</h3>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                      {getComplianceStatusBadge(item.status)}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{item.current} / {item.target}</span>
                        </div>
                        <Progress value={calculateProgress(item.current, item.target)} />
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Deadline: {item.deadline}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Key Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {milestone.date}
                        </div>
                      </div>
                      {getMilestoneStatusBadge(milestone.status)}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {milestone.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-muted-foreground">•</span>
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Grade</span>
                    <Badge className="bg-blue-500">Merit</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pass Rate</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>On-Time Submissions</span>
                    <span className="font-bold text-blue-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Compliance</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Training Hours</span>
                    <span className="font-bold text-orange-600">29%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Portfolio Items</span>
                    <span className="font-bold text-green-600">75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentComplianceTracker;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Target, BookOpen, FileCheck, Plus, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddGoalDialog from "./AddGoalDialog";

const ComplianceDashboardTab = () => {
  const { toast } = useToast();
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);
  
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete 20% Off-the-Job Training Hours",
      description: "Achieve minimum required training hours",
      targetValue: 832,
      currentValue: 245,
      unit: "hours",
      deadline: "2024-08-15",
      priority: "high",
      category: "training"
    },
    {
      id: 2,
      title: "Portfolio Evidence Collection",
      description: "Gather comprehensive portfolio evidence",
      targetValue: 20,
      currentValue: 15,
      unit: "items",
      deadline: "2024-06-30",
      priority: "medium",
      category: "portfolio"
    },
    {
      id: 3,
      title: "Assessment Completion",
      description: "Complete all required assessments",
      targetValue: 8,
      currentValue: 3,
      unit: "assessments",
      deadline: "2024-07-15",
      priority: "high",
      category: "assessment"
    }
  ]);

  const complianceData = {
    totalRequiredHours: 832,
    completedHours: 245,
    portfolioItems: 15,
    requiredPortfolioItems: 20,
    assessments: {
      completed: 3,
      total: 8
    },
    milestones: [
      {
        id: 1,
        title: "Health & Safety Foundation",
        status: "completed",
        dueDate: "2024-01-31",
        completedDate: "2024-01-15"
      },
      {
        id: 2,
        title: "Basic Electrical Theory",
        status: "completed",
        dueDate: "2024-02-28",
        completedDate: "2024-02-20"
      },
      {
        id: 3,
        title: "Practical Installation Skills",
        status: "in-progress",
        dueDate: "2024-03-31",
        completedDate: null
      },
      {
        id: 4,
        title: "Testing & Inspection",
        status: "pending",
        dueDate: "2024-04-30",
        completedDate: null
      }
    ]
  };

  const handleAddGoal = (newGoal) => {
    const goal = {
      id: goals.length + 1,
      ...newGoal,
      currentValue: 0
    };
    setGoals([...goals, goal]);
    setShowAddGoalDialog(false);
    toast({
      title: "Goal Added",
      description: "New goal has been added to your progress tracking.",
    });
  };

  const hoursProgress = (complianceData.completedHours / complianceData.totalRequiredHours) * 100;
  const portfolioProgress = (complianceData.portfolioItems / complianceData.requiredPortfolioItems) * 100;
  const assessmentProgress = (complianceData.assessments.completed / complianceData.assessments.total) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-700";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-700";
      case "pending":
        return "bg-orange-500/20 text-orange-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-700";
      case "medium":
        return "bg-yellow-500/20 text-yellow-700";
      case "low":
        return "bg-green-500/20 text-green-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Goals & Progress Hub</h2>
          <p className="text-sm text-muted-foreground">Track your apprenticeship goals and compliance requirements</p>
        </div>
        <Button onClick={() => setShowAddGoalDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceData.completedHours}h</div>
            <p className="text-xs text-muted-foreground mb-2">
              of {complianceData.totalRequiredHours}h required
            </p>
            <Progress value={hoursProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {hoursProgress.toFixed(1)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceData.portfolioItems}</div>
            <p className="text-xs text-muted-foreground mb-2">
              of {complianceData.requiredPortfolioItems} items required
            </p>
            <Progress value={portfolioProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {portfolioProgress.toFixed(1)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceData.assessments.completed}</div>
            <p className="text-xs text-muted-foreground mb-2">
              of {complianceData.assessments.total} assessments
            </p>
            <Progress value={assessmentProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {assessmentProgress.toFixed(1)}% complete
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Personal Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = (goal.currentValue / goal.targetValue) * 100;
                return (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{goal.title}</h4>
                      <Badge className={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{goal.currentValue}/{goal.targetValue} {goal.unit}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{progress.toFixed(1)}% complete</span>
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Compliance Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceData.milestones.map((milestone) => (
                <div key={milestone.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(milestone.status)}
                      <h4 className="font-medium">{milestone.title}</h4>
                    </div>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status.replace("-", " ")}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Due:</span> {new Date(milestone.dueDate).toLocaleDateString()}
                    </div>
                    {milestone.completedDate && (
                      <div>
                        <span className="font-medium">Completed:</span> {new Date(milestone.completedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(hoursProgress)}%</div>
              <p className="text-sm text-muted-foreground">Training Complete</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{goals.length}</div>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((hoursProgress + portfolioProgress + assessmentProgress) / 3)}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddGoalDialog 
        open={showAddGoalDialog} 
        onOpenChange={setShowAddGoalDialog}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
};

export default ComplianceDashboardTab;

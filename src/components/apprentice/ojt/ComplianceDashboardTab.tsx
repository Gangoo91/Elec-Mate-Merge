
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Target, BookOpen, FileCheck } from "lucide-react";

const ComplianceDashboardTab = () => {
  const complianceData = {
    totalRequiredHours: 832, // 20% of 4160 hours (typical apprenticeship)
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

  return (
    <div className="space-y-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Compliance Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">20% Off-the-Job Training</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Minimum 832 hours of structured learning away from normal work duties
                </p>
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span className="font-medium">{complianceData.completedHours}/832 hours</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Portfolio Evidence</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Document your learning journey with evidence of skills development
                </p>
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span className="font-medium">{complianceData.portfolioItems}/20 items</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Gateway Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• English & Maths at Level 2</li>
                  <li>• Complete all knowledge modules</li>
                  <li>• Achieve competency standards</li>
                  <li>• Employer sign-off</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceDashboardTab;

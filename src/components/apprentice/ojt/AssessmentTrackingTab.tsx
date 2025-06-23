
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Calendar, BookOpen, Award, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AddAssessmentDialog from "./AddAssessmentDialog";

const AssessmentTrackingTab = () => {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: "Electrical Safety Knowledge",
      type: "Written",
      status: "completed",
      score: 85,
      dueDate: "2024-01-15",
      completedDate: "2024-01-10"
    },
    {
      id: 2,
      title: "Practical Wiring Assessment",
      type: "Practical",
      status: "in-progress",
      score: null,
      dueDate: "2024-02-01",
      completedDate: null
    },
    {
      id: 3,
      title: "Testing & Inspection",
      type: "Practical",
      status: "pending",
      score: null,
      dueDate: "2024-02-15",
      completedDate: null
    },
    {
      id: 4,
      title: "Professional Discussion",
      type: "Oral",
      status: "scheduled",
      score: null,
      dueDate: "2024-03-01",
      completedDate: null
    }
  ]);

  const handleAddAssessment = (newAssessment) => {
    const assessment = {
      id: assessments.length + 1,
      ...newAssessment,
      status: "pending",
      score: null,
      completedDate: null
    };
    setAssessments([...assessments, assessment]);
    setShowAddDialog(false);
    toast({
      title: "Assessment Added",
      description: "New assessment has been added to your tracking list.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
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
      case "scheduled":
        return "bg-blue-500/20 text-blue-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };

  const completedAssessments = assessments.filter(a => a.status === "completed").length;
  const totalAssessments = assessments.length;
  const progress = (completedAssessments / totalAssessments) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Assessment Tracking</h2>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssessments}/{totalAssessments}</div>
            <p className="text-xs text-muted-foreground mb-2">
              Assessments completed
            </p>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              From completed assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 days</div>
            <p className="text-xs text-muted-foreground">
              Practical Wiring Assessment
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(assessment.status)}
                    <h4 className="font-medium">{assessment.title}</h4>
                  </div>
                  <Badge className={getStatusColor(assessment.status)}>
                    {assessment.status.replace("-", " ")}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Type:</span> {assessment.type}
                  </div>
                  <div>
                    <span className="font-medium">Due Date:</span> {new Date(assessment.dueDate).toLocaleDateString()}
                  </div>
                  <div>
                    {assessment.score ? (
                      <span><span className="font-medium">Score:</span> {assessment.score}%</span>
                    ) : (
                      <span><span className="font-medium">Status:</span> {assessment.status}</span>
                    )}
                  </div>
                </div>
                
                {assessment.completedDate && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Completed:</span> {new Date(assessment.completedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Preparation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Study Resources</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• BS 7671 Wiring Regulations</li>
                <li>• Electrical Installation Work guides</li>
                <li>• Health & Safety regulations</li>
                <li>• Practical demonstration videos</li>
              </ul>
              <Button variant="outline" className="mt-3 w-full">
                Access Study Materials
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Assessment Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review practical skills regularly</li>
                <li>• Practice safe working procedures</li>
                <li>• Know your testing equipment</li>
                <li>• Understand documentation requirements</li>
              </ul>
              <Button variant="outline" className="mt-3 w-full">
                View Preparation Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddAssessmentDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onAddAssessment={handleAddAssessment}
      />
    </div>
  );
};

export default AssessmentTrackingTab;

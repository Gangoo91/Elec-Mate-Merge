
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, Clock, CheckCircle, AlertCircle, BookOpen } from "lucide-react";

const AssessmentTrackingTab = () => {
  const upcomingAssessments = [
    {
      title: "Technical Skills Assessment",
      date: "2024-02-15",
      type: "Practical",
      status: "scheduled",
      preparation: 85
    },
    {
      title: "Health & Safety Knowledge Test",
      date: "2024-02-22",
      type: "Written",
      status: "scheduled",
      preparation: 60
    },
    {
      title: "Professional Discussion",
      date: "2024-03-01",
      type: "Interview",
      status: "pending",
      preparation: 25
    }
  ];

  const completedAssessments = [
    {
      title: "Electrical Installation Work",
      date: "2024-01-20",
      result: "Pass",
      score: "87%",
      feedback: "Excellent practical skills demonstrated"
    },
    {
      title: "Regulations & Standards",
      date: "2024-01-15",
      result: "Pass",
      score: "92%",
      feedback: "Strong understanding of BS 7671"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500/20 text-blue-400">Scheduled</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
    }
  };

  const getResultBadge = (result: string) => {
    return result === "Pass" 
      ? <Badge className="bg-green-500/20 text-green-400">Pass</Badge>
      : <Badge className="bg-red-500/20 text-red-400">Fail</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Assessment Overview */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Assessment Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Assessments */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Upcoming Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAssessments.map((assessment, index) => (
              <div key={index} className="p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{assessment.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {assessment.date}
                      </span>
                      <span>{assessment.type}</span>
                    </div>
                  </div>
                  {getStatusBadge(assessment.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preparation Progress</span>
                    <span>{assessment.preparation}%</span>
                  </div>
                  <Progress value={assessment.preparation} className="h-2" />
                </div>
                
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study Materials
                  </Button>
                  <Button size="sm" variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule Prep
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Assessments */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Completed Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedAssessments.map((assessment, index) => (
              <div key={index} className="p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{assessment.title}</h4>
                    <div className="text-sm text-muted-foreground">{assessment.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getResultBadge(assessment.result)}
                    <span className="text-sm font-medium">{assessment.score}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <strong>Feedback:</strong> {assessment.feedback}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Resources */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle>Assessment Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-medium mb-2">Study Materials</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Access revision guides, practice tests, and learning resources
              </p>
              <Button size="sm" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                View Materials
              </Button>
            </div>
            
            <div className="p-4 rounded-lg border border-elec-yellow/20">
              <h4 className="font-medium mb-2">Assessment Preparation</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Create study schedules and track your preparation progress
              </p>
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Plan Study
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentTrackingTab;

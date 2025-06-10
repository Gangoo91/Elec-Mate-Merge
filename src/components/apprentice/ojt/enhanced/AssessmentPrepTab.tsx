
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target, Clock, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { useState } from "react";

const AssessmentPrepTab = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  const assessments = [
    {
      id: "epa",
      title: "End Point Assessment (EPA)",
      type: "final",
      progress: 75,
      status: "on-track",
      dueDate: "6 months",
      priority: "high",
      aiRecommendations: [
        "Focus on practical demonstration skills",
        "Review fault finding procedures",
        "Practice professional discussion scenarios"
      ]
    },
    {
      id: "portfolio",
      title: "Portfolio Review",
      type: "ongoing",
      progress: 85,
      status: "ahead",
      dueDate: "3 months", 
      priority: "medium",
      aiRecommendations: [
        "Add more commercial installation evidence",
        "Include customer feedback examples",
        "Document CPD activities"
      ]
    },
    {
      id: "am2",
      title: "AM2 Assessment",
      type: "practical",
      progress: 60,
      status: "needs-attention",
      dueDate: "4 months",
      priority: "high",
      aiRecommendations: [
        "Practice time management in practical tasks",
        "Review testing and inspection procedures", 
        "Improve documentation speed"
      ]
    }
  ];

  const studyResources = [
    {
      category: "Practical Skills",
      items: ["Installation techniques", "Testing procedures", "Fault diagnosis"],
      progress: 80,
      aiInsight: "Strong foundation, focus on speed and accuracy"
    },
    {
      category: "Theory Knowledge", 
      items: ["BS 7671 regulations", "Design principles", "Safety procedures"],
      progress: 70,
      aiInsight: "Good understanding, review complex calculations"
    },
    {
      category: "Professional Skills",
      items: ["Communication", "Customer service", "Documentation"],
      progress: 65,
      aiInsight: "Developing well, practice scenario responses"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ahead":
        return <Badge className="bg-green-600 text-white">Ahead</Badge>;
      case "on-track":
        return <Badge className="bg-blue-600 text-white">On Track</Badge>;
      case "needs-attention":
        return <Badge className="bg-orange-600 text-white">Needs Focus</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      default:
        return "text-green-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">73%</div>
            <p className="text-xs text-muted-foreground">
              Assessment ready
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">156h</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mock Tests</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">12</div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">B+</div>
            <p className="text-xs text-muted-foreground">
              Predicted grade
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Assessment Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <div 
                  key={assessment.id}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedAssessment(assessment.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{assessment.title}</h4>
                      <p className="text-sm text-muted-foreground">Due in {assessment.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getPriorityColor(assessment.priority)}`}>
                        {assessment.priority.toUpperCase()}
                      </span>
                      {getStatusBadge(assessment.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {assessment.progress}%</span>
                      <span className="text-muted-foreground">{assessment.type}</span>
                    </div>
                    <Progress value={assessment.progress} className="h-2" />
                  </div>

                  {selectedAssessment === assessment.id && (
                    <div className="mt-4 pt-4 border-t">
                      <Label className="text-sm font-medium">AI Recommendations:</Label>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        {assessment.aiRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Brain className="h-3 w-3 mt-1 text-purple-500" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyResources.map((resource, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{resource.category}</h4>
                    <span className="text-sm text-muted-foreground">{resource.progress}%</span>
                  </div>
                  
                  <Progress value={resource.progress} className="h-2 mb-3" />
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {resource.items.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                      <Brain className="h-3 w-3 mt-1 text-purple-500" />
                      <span className="text-muted-foreground italic">{resource.aiInsight}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button className="w-full" variant="outline">
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Personalised Study Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Smart Assessment Preparation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your AI-powered assessment preparation system tracks your progress across all key assessments, 
            provides personalised study recommendations, and predicts your readiness. Stay ahead with 
            intelligent insights tailored to your learning patterns and apprenticeship requirements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentPrepTab;

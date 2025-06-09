
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target, Clock, CheckCircle, AlertCircle, Play, Pause } from "lucide-react";

const AssessmentPrepTab = () => {
  const [activeStudySession, setActiveStudySession] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  const assessmentAreas = [
    {
      area: "Electrical Theory",
      progress: 85,
      aiReadiness: "Ready for Assessment",
      weakPoints: ["Complex calculations", "Three-phase systems"],
      nextSession: "Advanced Circuit Analysis",
      timeRequired: "2h"
    },
    {
      area: "Practical Skills",
      progress: 78,
      aiReadiness: "Near Ready",
      weakPoints: ["Cable management", "Termination techniques"],
      nextSession: "Hands-on Practice",
      timeRequired: "3h"
    },
    {
      area: "Health & Safety",
      progress: 92,
      aiReadiness: "Assessment Ready",
      weakPoints: ["Risk assessment documentation"],
      nextSession: "Safety Scenarios",
      timeRequired: "1h"
    },
    {
      area: "Regulations & Standards",
      progress: 65,
      aiReadiness: "Needs Focus",
      weakPoints: ["BS 7671 amendments", "Part P requirements"],
      nextSession: "Regulations Deep Dive",
      timeRequired: "4h"
    }
  ];

  const practiceTests = [
    {
      title: "Level 3 Mock Exam A",
      difficulty: "Intermediate",
      duration: "2h 30m",
      aiPredictedScore: 78,
      topics: ["Theory", "Calculations", "Safety"],
      status: "recommended"
    },
    {
      title: "18th Edition Regulations",
      difficulty: "Advanced",
      duration: "1h 45m",
      aiPredictedScore: 65,
      topics: ["BS 7671", "Inspection", "Testing"],
      status: "critical"
    },
    {
      title: "Practical Assessment Sim",
      difficulty: "Intermediate",
      duration: "3h",
      aiPredictedScore: 82,
      topics: ["Installation", "Testing", "Documentation"],
      status: "ready"
    }
  ];

  const studyPlans = [
    {
      title: "Intensive Regulations Focus",
      duration: "2 weeks",
      aiOptimised: true,
      dailyTime: "2.5h",
      success: 94,
      description: "AI-curated study plan targeting your weak areas in regulations"
    },
    {
      title: "Balanced Assessment Prep",
      duration: "3 weeks",
      aiOptimised: true,
      dailyTime: "1.5h",
      success: 89,
      description: "Comprehensive preparation covering all assessment areas"
    }
  ];

  const getReadinessBadge = (readiness: string) => {
    switch (readiness) {
      case "Assessment Ready":
        return <Badge className="bg-green-600 text-white">Ready</Badge>;
      case "Ready for Assessment":
        return <Badge className="bg-green-600 text-white">Ready</Badge>;
      case "Near Ready":
        return <Badge className="bg-blue-600 text-white">Near Ready</Badge>;
      case "Needs Focus":
        return <Badge className="bg-orange-600 text-white">Needs Focus</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getTestStatusIcon = (status: string) => {
    switch (status) {
      case "recommended":
        return <Target className="h-4 w-4 text-blue-500" />;
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Readiness</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">80%</div>
            <p className="text-xs text-muted-foreground">
              AI Assessment Score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to Ready</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">3.2 weeks</div>
            <p className="text-xs text-muted-foreground">
              AI Prediction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Tests</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">7/12</div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">12 days</div>
            <p className="text-xs text-muted-foreground">
              Current streak
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Assessment Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessmentAreas.map((area, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{area.area}</h4>
                    {getReadinessBadge(area.aiReadiness)}
                  </div>
                  
                  <Progress value={area.progress} className="h-2 mb-3" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Focus:</span>
                      <span>{area.nextSession}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Needed:</span>
                      <span className="text-elec-yellow">{area.timeRequired}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weak Points: </span>
                      {area.weakPoints.map((point, pointIndex) => (
                        <Badge key={pointIndex} variant="outline" className="ml-1 text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI-Recommended Practice Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {practiceTests.map((test, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTestStatusIcon(test.status)}
                        <h4 className="font-medium">{test.title}</h4>
                      </div>
                      <Badge variant="outline">{test.difficulty}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        {test.duration}
                      </div>
                      <div>
                        <span className="text-muted-foreground">AI Score: </span>
                        <span className="font-medium">{test.aiPredictedScore}%</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {test.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button size="sm" className="w-full">
                      Start Practice Test
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                AI Study Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyPlans.map((plan, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{plan.title}</h4>
                      {plan.aiOptimised && (
                        <Badge className="bg-purple-600 text-white">AI Optimised</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{plan.duration}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Daily:</span>
                        <div className="font-medium">{plan.dailyTime}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success:</span>
                        <div className="font-medium text-green-500">{plan.success}%</div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      Start AI Study Plan
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPrepTab;

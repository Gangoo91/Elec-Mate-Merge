
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, Target, Clock, CheckCircle, AlertTriangle, Brain } from "lucide-react";
import { useState } from "react";

const AssessmentToolsTab = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  const assessmentTools = [
    {
      id: "safety-knowledge-quiz",
      title: "Safety Knowledge Assessment",
      type: "Quiz",
      duration: "15 minutes",
      questions: 25,
      difficulty: "Intermediate",
      description: "Comprehensive assessment covering electrical safety fundamentals, regulations, and best practices.",
      topics: ["Electrical hazards", "PPE requirements", "Safety regulations", "Emergency procedures"],
      completed: false,
      lastScore: null,
      attempts: 0
    },
    {
      id: "hazard-identification",
      title: "Workplace Hazard Identification",
      type: "Interactive",
      duration: "20 minutes", 
      questions: 15,
      difficulty: "Beginner",
      description: "Interactive assessment using workplace images to identify potential electrical safety hazards.",
      topics: ["Visual hazard recognition", "Risk assessment", "Control measures", "Reporting procedures"],
      completed: true,
      lastScore: 85,
      attempts: 2
    },
    {
      id: "emergency-response",
      title: "Emergency Response Scenarios",
      type: "Scenario-based",
      duration: "30 minutes",
      questions: 10,
      difficulty: "Advanced",
      description: "Complex scenario-based assessment testing emergency response knowledge and decision-making skills.",
      topics: ["Electric shock response", "Fire procedures", "Evacuation protocols", "First aid"],
      completed: false,
      lastScore: null,
      attempts: 0
    },
    {
      id: "ppe-selection",
      title: "PPE Selection & Usage",
      type: "Practical",
      duration: "25 minutes",
      questions: 20,
      difficulty: "Intermediate",
      description: "Assessment of personal protective equipment selection, usage, and maintenance knowledge.",
      topics: ["PPE categories", "Selection criteria", "Maintenance procedures", "Compliance standards"],
      completed: true,
      lastScore: 92,
      attempts: 1
    }
  ];

  const competencyAreas = [
    {
      area: "Hazard Recognition",
      progress: 85,
      status: "Proficient",
      description: "Ability to identify and assess electrical workplace hazards"
    },
    {
      area: "Safety Procedures",
      progress: 70,
      status: "Developing",
      description: "Knowledge of safety procedures and compliance requirements"
    },
    {
      area: "Emergency Response",
      progress: 45,
      status: "Needs Development",
      description: "Understanding of emergency response procedures and protocols"
    },
    {
      area: "PPE & Equipment",
      progress: 90,
      status: "Proficient",
      description: "Knowledge of PPE selection, usage, and maintenance"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Proficient": return "text-green-400";
      case "Developing": return "text-yellow-400";
      case "Needs Development": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Safety Assessment Centre</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Test and validate your electrical safety knowledge through comprehensive assessments. 
            Track your progress and identify areas for improvement across key safety competencies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {assessmentTools.filter(a => a.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">
                {assessmentTools.reduce((sum, a) => sum + a.attempts, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {Math.round(
                  assessmentTools
                    .filter(a => a.lastScore !== null)
                    .reduce((sum, a) => sum + (a.lastScore || 0), 0) /
                  assessmentTools.filter(a => a.lastScore !== null).length || 0
                )}%
              </div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Available Assessments</h3>
          {assessmentTools.map((assessment) => (
            <Card key={assessment.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-white text-lg">{assessment.title}</CardTitle>
                      {assessment.completed && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getDifficultyColor(assessment.difficulty)}>
                        {assessment.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        {assessment.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {assessment.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      {assessment.questions} questions
                    </div>
                  </div>
                  
                  {assessment.completed && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Score:</span>
                      <Badge className="bg-green-500/20 text-green-400">
                        {assessment.lastScore}%
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Attempts:</span>
                    <span className="text-white">{assessment.attempts}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {assessment.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => setSelectedAssessment(assessment.id)}
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  {assessment.completed ? "Retake Assessment" : "Start Assessment"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Competency Progress</h3>
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-elec-yellow" />
                Safety Competency Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competencyAreas.map((area, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{area.area}</h4>
                      <span className={`text-sm font-medium ${getStatusColor(area.status)}`}>
                        {area.status}
                      </span>
                    </div>
                    <Progress value={area.progress} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">{area.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Assessment Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Review relevant knowledge topics before starting</li>
                <li>• Take your time - accuracy is more important than speed</li>
                <li>• Use scenario-based thinking for practical questions</li>
                <li>• Review incorrect answers to learn from mistakes</li>
                <li>• Retake assessments to improve your competency scores</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievement Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border border-green-400/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-white">Safety Expert</div>
                  <div className="text-xs text-muted-foreground">90%+ on all assessments</div>
                </div>
                <div className="text-center p-3 border border-gray-400/20 rounded-lg opacity-50">
                  <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-white">Emergency Pro</div>
                  <div className="text-xs text-muted-foreground">Master emergency procedures</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentToolsTab;

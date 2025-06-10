
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Target, 
  Clock, 
  Award, 
  CheckSquare, 
  AlertTriangle,
  BookOpen,
  TrendingUp,
  BarChart3,
  FileText,
  Play,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

const AssessmentToolsTab = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [completedAssessments, setCompletedAssessments] = useState<Set<string>>(new Set());

  const assessmentTools = [
    {
      id: "safety-knowledge-quiz",
      title: "Safety Knowledge Assessment",
      description: "Comprehensive quiz covering all aspects of electrical safety knowledge",
      type: "Quiz",
      duration: "30 mins",
      questions: 50,
      passingScore: 80,
      difficulty: "Intermediate",
      category: "Knowledge",
      attempts: 3,
      lastScore: 0,
      bestScore: 0,
      timeLimit: true,
      certificate: true,
      topics: ["PPE", "Isolation", "Regulations", "Emergency Response"]
    },
    {
      id: "hazard-identification",
      title: "Hazard Identification Challenge",
      description: "Interactive scenarios to test your ability to identify electrical hazards",
      type: "Interactive",
      duration: "45 mins",
      questions: 25,
      passingScore: 75,
      difficulty: "Advanced",
      category: "Practical",
      attempts: 5,
      lastScore: 0,
      bestScore: 0,
      timeLimit: true,
      certificate: true,
      topics: ["Risk Assessment", "Hazard Types", "Control Measures", "Documentation"]
    },
    {
      id: "emergency-response",
      title: "Emergency Response Simulation",
      description: "Practice emergency response procedures in realistic scenarios",
      type: "Simulation",
      duration: "20 mins",
      questions: 15,
      passingScore: 85,
      difficulty: "Advanced",
      category: "Emergency",
      attempts: 2,
      lastScore: 0,
      bestScore: 0,
      timeLimit: false,
      certificate: true,
      topics: ["First Aid", "Emergency Procedures", "Incident Response", "Communication"]
    },
    {
      id: "regulation-compliance",
      title: "Regulation Compliance Check",
      description: "Test your understanding of UK electrical safety regulations",
      type: "Assessment",
      duration: "25 mins",
      questions: 30,
      passingScore: 80,
      difficulty: "Intermediate",
      category: "Regulations",
      attempts: 4,
      lastScore: 0,
      bestScore: 0,
      timeLimit: true,
      certificate: false,
      topics: ["EAWR 1989", "BS 7671", "CDM Regulations", "HASAWA 1974"]
    },
    {
      id: "case-study-analysis",
      title: "Case Study Analysis",
      description: "Analyse real incident case studies and identify key learning points",
      type: "Analysis",
      duration: "60 mins",
      questions: 10,
      passingScore: 70,
      difficulty: "Advanced",
      category: "Analysis",
      attempts: 1,
      lastScore: 0,
      bestScore: 0,
      timeLimit: false,
      certificate: true,
      topics: ["Root Cause Analysis", "Prevention Strategies", "Lesson Learning", "Risk Management"]
    },
    {
      id: "ppe-selection",
      title: "PPE Selection Workshop",
      description: "Interactive tool for selecting appropriate PPE for different electrical tasks",
      type: "Workshop",
      duration: "35 mins",
      questions: 20,
      passingScore: 85,
      difficulty: "Intermediate",
      category: "PPE",
      attempts: 3,
      lastScore: 0,
      bestScore: 0,
      timeLimit: false,
      certificate: false,
      topics: ["PPE Types", "Voltage Ratings", "Task Assessment", "Standards"]
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quiz": return "text-blue-400";
      case "Interactive": return "text-green-400";
      case "Simulation": return "text-purple-400";
      case "Assessment": return "text-orange-400";
      case "Analysis": return "text-red-400";
      case "Workshop": return "text-elec-yellow";
      default: return "text-gray-400";
    }
  };

  const handleStartAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    console.log(`Starting assessment: ${assessmentId}`);
  };

  const isAssessmentCompleted = (assessmentId: string) => completedAssessments.has(assessmentId);

  const completedCount = assessmentTools.filter(tool => isAssessmentCompleted(tool.id)).length;
  const averageScore = assessmentTools.reduce((acc, tool) => acc + tool.bestScore, 0) / assessmentTools.length;
  const certificatesEarned = assessmentTools.filter(tool => tool.certificate && isAssessmentCompleted(tool.id)).length;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Assessment Centre</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Test and validate your electrical safety knowledge through comprehensive assessments, 
            interactive simulations, and practical workshops. Track your progress and earn certificates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">{assessmentTools.length}</div>
              <div className="text-sm text-muted-foreground">Assessment Tools</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{Math.round(averageScore)}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{certificatesEarned}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assessmentTools.map((tool, index) => (
          <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2 flex items-center gap-2">
                    {tool.title}
                    {isAssessmentCompleted(tool.id) && (
                      <CheckSquare className="h-5 w-5 text-green-400" />
                    )}
                  </CardTitle>
                  <div className="flex gap-2 mb-3">
                    <Badge className={getDifficultyColor(tool.difficulty)}>
                      {tool.difficulty}
                    </Badge>
                    <Badge variant="outline" className={getTypeColor(tool.type)}>
                      {tool.type}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {tool.duration}
                    </Badge>
                    {tool.certificate && (
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        <Award className="h-3 w-3 mr-1" />
                        Certificate
                      </Badge>
                    )}
                  </div>
                </div>
                {tool.bestScore > 0 && (
                  <div className="text-right">
                    <div className="text-elec-yellow font-semibold">{tool.bestScore}%</div>
                    <div className="text-xs text-muted-foreground">Best Score</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {tool.description}
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-elec-dark/40 rounded">
                    <div className="text-blue-400 font-semibold">{tool.questions}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="p-2 bg-elec-dark/40 rounded">
                    <div className="text-green-400 font-semibold">{tool.passingScore}%</div>
                    <div className="text-xs text-muted-foreground">Pass Score</div>
                  </div>
                  <div className="p-2 bg-elec-dark/40 rounded">
                    <div className="text-orange-400 font-semibold">{tool.attempts}</div>
                    <div className="text-xs text-muted-foreground">Attempts</div>
                  </div>
                </div>

                {tool.bestScore > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Progress</span>
                      <span className="text-sm text-elec-yellow">{tool.bestScore}%</span>
                    </div>
                    <Progress value={tool.bestScore} className="h-2" />
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-elec-yellow" />
                    Topics Covered:
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {tool.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-green-400" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1" 
                  onClick={() => handleStartAssessment(tool.id)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {tool.bestScore > 0 ? "Retake Assessment" : "Start Assessment"}
                </Button>
                {tool.bestScore > 0 && (
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Assessment Performance & Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Track your assessment performance over time and identify areas for improvement. 
            Regular assessment helps reinforce learning and ensures knowledge retention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{Math.round((completedCount / assessmentTools.length) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
              <Progress value={(completedCount / assessmentTools.length) * 100} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{Math.round(averageScore)}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
              <Progress value={averageScore} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{certificatesEarned}/{assessmentTools.filter(t => t.certificate).length}</div>
              <div className="text-sm text-muted-foreground">Certificates Earned</div>
              <Progress value={(certificatesEarned / assessmentTools.filter(t => t.certificate).length) * 100} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentToolsTab;

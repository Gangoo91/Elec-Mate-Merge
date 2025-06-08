
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, CheckSquare, Award, Clock, Target, TrendingUp } from "lucide-react";

const AssessmentToolsTab = () => {
  const assessmentTools = [
    {
      title: "Safety Knowledge Quiz",
      description: "Test your understanding of electrical safety regulations and procedures",
      questions: 25,
      duration: "20 mins",
      difficulty: "Intermediate",
      lastScore: 84,
      attempts: 3,
      category: "Knowledge"
    },
    {
      title: "Risk Assessment Simulator",
      description: "Practice identifying and evaluating electrical hazards in various scenarios",
      questions: 15,
      duration: "30 mins",
      difficulty: "Advanced",
      lastScore: 76,
      attempts: 2,
      category: "Practical"
    },
    {
      title: "PPE Selection Test",
      description: "Demonstrate competency in selecting appropriate personal protective equipment",
      questions: 20,
      duration: "15 mins",
      difficulty: "Beginner",
      lastScore: 92,
      attempts: 4,
      category: "Equipment"
    },
    {
      title: "Emergency Response Assessment",
      description: "Evaluate your knowledge of emergency procedures and incident response",
      questions: 18,
      duration: "25 mins",
      difficulty: "Advanced",
      lastScore: null,
      attempts: 0,
      category: "Emergency"
    }
  ];

  const achievements = [
    { name: "Safety Scholar", description: "Scored 90%+ on 5 assessments", earned: true },
    { name: "Quick Learner", description: "Completed assessment in under 15 minutes", earned: true },
    { name: "Perfect Score", description: "Achieved 100% on any assessment", earned: false },
    { name: "Consistent Performer", description: "Scored 80%+ on 10 consecutive attempts", earned: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-muted-foreground";
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Assessment & Evaluation Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Test your knowledge and skills with our comprehensive assessment tools. Track your progress 
            and identify areas for improvement in electrical safety competency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">9</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">84%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">2</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">4</div>
              <div className="text-sm text-muted-foreground">Available Tests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assessmentTools.map((tool, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2">{tool.title}</CardTitle>
                  <div className="flex gap-2 mb-3">
                    <Badge className={getDifficultyColor(tool.difficulty)}>
                      {tool.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                {tool.lastScore && (
                  <div className={`text-2xl font-bold ${getScoreColor(tool.lastScore)}`}>
                    {tool.lastScore}%
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {tool.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    {tool.questions} Questions
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {tool.duration}
                  </span>
                </div>
                
                {tool.lastScore && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Best Score</span>
                      <span className={`text-sm ${getScoreColor(tool.lastScore)}`}>
                        {tool.lastScore}%
                      </span>
                    </div>
                    <Progress value={tool.lastScore} className="h-2" />
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  <strong>Attempts:</strong> {tool.attempts}
                </div>
              </div>
              
              <Button className="w-full mt-4">
                <Target className="mr-2 h-4 w-4" />
                {tool.attempts === 0 ? "Start Assessment" : "Retake Assessment"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'border-green-500/40 bg-green-500/10' 
                    : 'border-gray-500/20 bg-gray-500/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className={`h-6 w-6 ${
                    achievement.earned ? 'text-green-400' : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className={`font-semibold ${
                      achievement.earned ? 'text-green-300' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">84%</div>
              <div className="text-sm text-muted-foreground">Overall Average</div>
              <div className="text-xs text-blue-300 mt-1">+12% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
              <div className="text-sm text-muted-foreground">Best Performance</div>
              <div className="text-xs text-green-300 mt-1">PPE Selection Test</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">3.2</div>
              <div className="text-sm text-muted-foreground">Avg Attempts</div>
              <div className="text-xs text-yellow-300 mt-1">Before passing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentToolsTab;

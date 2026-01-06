
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Clock,
  Award,
  CheckSquare,
  BookOpen,
  TrendingUp,
  BarChart3,
  Play,
  CheckCircle,
  Zap
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
      topics: ["PPE", "Isolation", "Regulations", "Emergency Response"],
      color: "blue"
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
      topics: ["Risk Assessment", "Hazard Types", "Control Measures", "Documentation"],
      color: "green"
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
      topics: ["First Aid", "Emergency Procedures", "Incident Response", "Communication"],
      color: "purple"
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
      topics: ["EAWR 1989", "BS 7671", "CDM Regulations", "HASAWA 1974"],
      color: "orange"
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
      topics: ["Root Cause Analysis", "Prevention Strategies", "Lesson Learning", "Risk Management"],
      color: "red"
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
      topics: ["PPE Types", "Voltage Ratings", "Task Assessment", "Standards"],
      color: "yellow"
    }
  ];

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case "Intermediate": return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case "Advanced": return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      default: return { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', iconBg: 'from-blue-500/20 to-blue-500/5' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', iconBg: 'from-green-500/20 to-green-500/5' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', iconBg: 'from-purple-500/20 to-purple-500/5' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', iconBg: 'from-orange-500/20 to-orange-500/5' },
      red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', iconBg: 'from-red-500/20 to-red-500/5' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30', iconBg: 'from-elec-yellow/20 to-elec-yellow/5' }
    };
    return configs[color] || configs.blue;
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Target className="h-5 w-5 text-elec-yellow" />
            </div>
            Interactive Assessment Centre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <p className="text-white/70">
            Test and validate your electrical safety knowledge through comprehensive assessments,
            interactive simulations, and practical workshops. Track your progress and earn certificates.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-elec-yellow/20 inline-block mb-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="text-2xl font-bold text-elec-yellow">{assessmentTools.length}</div>
              <div className="text-xs text-white/60">Assessment Tools</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-green-500/20 inline-block mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">{completedCount}</div>
              <div className="text-xs text-white/60">Completed</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-blue-500/20 inline-block mb-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">{Math.round(averageScore)}%</div>
              <div className="text-xs text-white/60">Average Score</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-purple-500/20 inline-block mb-2">
                <Award className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-400">{certificatesEarned}</div>
              <div className="text-xs text-white/60">Certificates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {assessmentTools.map((tool) => {
          const colorConfig = getColorConfig(tool.color);
          const difficultyConfig = getDifficultyConfig(tool.difficulty);
          const isCompleted = isAssessmentCompleted(tool.id);

          return (
            <Card
              key={tool.id}
              className={`bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-white/20 transition-all overflow-hidden relative ${
                isCompleted ? 'ring-2 ring-green-500/30' : ''
              }`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${colorConfig.bg} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50`} />
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2 flex items-center gap-2">
                      {tool.title}
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={`${difficultyConfig.bg} ${difficultyConfig.text} border ${difficultyConfig.border}`}>
                        {tool.difficulty}
                      </Badge>
                      <Badge className={`${colorConfig.bg} ${colorConfig.text} border ${colorConfig.border}`}>
                        {tool.type}
                      </Badge>
                      <Badge className="bg-white/5 text-white/70 border border-white/10">
                        <Clock className="h-3 w-3 mr-1" />
                        {tool.duration}
                      </Badge>
                      {tool.certificate && (
                        <Badge className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                  </div>
                  {tool.bestScore > 0 && (
                    <div className="text-right p-3 rounded-lg bg-white/10 border border-white/10">
                      <div className="text-xl font-bold text-elec-yellow">{tool.bestScore}%</div>
                      <div className="text-xs text-white/80">Best Score</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <p className="text-white/70 text-sm">
                  {tool.description}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10 text-center">
                    <div className="text-lg font-bold text-blue-400">{tool.questions}</div>
                    <div className="text-xs text-white/80">Questions</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10 text-center">
                    <div className="text-lg font-bold text-green-400">{tool.passingScore}%</div>
                    <div className="text-xs text-white/80">Pass Score</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 border border-white/10 text-center">
                    <div className="text-lg font-bold text-orange-400">{tool.attempts}</div>
                    <div className="text-xs text-white/80">Attempts</div>
                  </div>
                </div>

                {/* Progress Bar */}
                {tool.bestScore > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">Progress</span>
                      <span className="text-sm text-elec-yellow">{tool.bestScore}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-elec-yellow/70 transition-all duration-500"
                        style={{ width: `${tool.bestScore}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                      <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
                    </div>
                    <h4 className="text-sm font-medium text-white">Topics Covered</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-1 ml-7">
                    {tool.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckSquare className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
                    onClick={() => handleStartAssessment(tool.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {tool.bestScore > 0 ? "Retake" : "Start"}
                  </Button>
                  {tool.bestScore > 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 border-white/20 hover:bg-white/10 touch-manipulation"
                    >
                      <BarChart3 className="h-4 w-4 text-white/70" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            Assessment Performance & Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <p className="text-white/70">
            Track your assessment performance over time and identify areas for improvement.
            Regular assessment helps reinforce learning and ensures knowledge retention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{Math.round((completedCount / assessmentTools.length) * 100)}%</div>
              <div className="text-sm text-white/60 mb-3">Completion Rate</div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                  style={{ width: `${(completedCount / assessmentTools.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{Math.round(averageScore)}%</div>
              <div className="text-sm text-white/60 mb-3">Average Score</div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                  style={{ width: `${averageScore}%` }}
                />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{certificatesEarned}/{assessmentTools.filter(t => t.certificate).length}</div>
              <div className="text-sm text-white/60 mb-3">Certificates Earned</div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                  style={{ width: `${(certificatesEarned / assessmentTools.filter(t => t.certificate).length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentToolsTab;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, MessageSquare, Users, Zap, PlayCircle, CheckSquare, Brain, Target } from "lucide-react";

const InteractiveToolsTab = () => {
  const interactiveTools = [
    {
      title: "Conversation Practice Simulator",
      description: "Practice difficult conversations with your supervisor in a safe environment",
      features: ["15+ realistic scenarios", "Multiple response options", "Expert feedback", "Confidence building"],
      difficulty: "Intermediate",
      duration: "10-20 mins per scenario",
      icon: MessageSquare,
      status: "Available",
      category: "Communication"
    },
    {
      title: "Technical Knowledge Quiz",
      description: "Test your technical knowledge and identify areas for improvement",
      features: ["100+ questions", "Adaptive difficulty", "Detailed explanations", "Progress tracking"],
      difficulty: "Beginner to Advanced",
      duration: "15-30 mins",
      icon: Brain,
      status: "Available",
      category: "Knowledge"
    },
    {
      title: "Site Scenario Trainer",
      description: "Navigate complex site situations and learn best practices",
      features: ["Real-world scenarios", "Decision trees", "Consequence learning", "Safety focus"],
      difficulty: "Intermediate",
      duration: "20-30 mins",
      icon: Users,
      status: "Available",
      category: "Practical"
    },
    {
      title: "Question Formulation Helper",
      description: "Learn how to ask better questions and get more helpful answers",
      features: ["Question templates", "Phrase suggestions", "Context guidance", "Example library"],
      difficulty: "Beginner",
      duration: "5-10 mins",
      icon: Target,
      status: "Available",
      category: "Communication"
    },
    {
      title: "Professional Language Builder",
      description: "Develop professional vocabulary and communication skills",
      features: ["Industry terminology", "Phrase bank", "Voice practice", "Confidence meter"],
      difficulty: "Beginner",
      duration: "Daily 5 mins",
      icon: Lightbulb,
      status: "Coming Soon",
      category: "Language"
    },
    {
      title: "Virtual Supervisor Meeting",
      description: "Experience realistic supervisor meetings with AI-powered responses",
      features: ["Voice interaction", "Real-time feedback", "Meeting scenarios", "Performance analytics"],
      difficulty: "Advanced",
      duration: "30-45 mins",
      icon: Zap,
      status: "Coming Soon",
      category: "Advanced"
    }
  ];

  const practiceScenarios = [
    {
      title: "Asking for Technical Help",
      situation: "You're struggling with a three-phase calculation and need guidance",
      learningOutcome: "Learn to ask specific technical questions with confidence",
      difficulty: "Beginner"
    },
    {
      title: "Reporting a Mistake",
      situation: "You've made an error that could delay the project",
      learningOutcome: "Practice owning mistakes and proposing solutions",
      difficulty: "Intermediate"
    },
    {
      title: "Disagreeing Respectfully",
      situation: "You think there's a better way to approach a task",
      learningOutcome: "Learn to express alternative views professionally",
      difficulty: "Advanced"
    },
    {
      title: "Requesting Additional Training",
      situation: "You need more skills to complete assigned work safely",
      learningOutcome: "Practice advocating for your development needs",
      difficulty: "Intermediate"
    },
    {
      title: "Handling Client Pressure",
      situation: "A client is pressuring you to rush work or skip procedures",
      learningOutcome: "Learn to maintain standards under pressure",
      difficulty: "Advanced"
    },
    {
      title: "Seeking Feedback",
      situation: "You want constructive feedback on your work quality",
      learningOutcome: "Practice asking for and receiving feedback",
      difficulty: "Beginner"
    }
  ];

  const quickTips = [
    {
      tip: "Always prepare questions in advance during quiet moments",
      category: "Preparation"
    },
    {
      tip: "Show what you've already tried before asking for help",
      category: "Problem Solving"
    },
    {
      tip: "Use 'Could you help me understand...' instead of 'I don't know'",
      category: "Language"
    },
    {
      tip: "Follow up complex verbal instructions with written confirmation",
      category: "Communication"
    },
    {
      tip: "Ask 'What would you do differently?' to learn from mistakes",
      category: "Learning"
    },
    {
      tip: "Document important answers and guidance for future reference",
      category: "Documentation"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes("Beginner")) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (difficulty.includes("Intermediate")) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (difficulty.includes("Advanced")) return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Coming Soon": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Communication": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Knowledge": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Practical": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Language": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Learning Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practice communication skills, test your knowledge, and build confidence through interactive simulations and assessments. 
            Learn by doing in a safe, supportive environment.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interactiveTools.map((tool, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-elec-yellow/10">
                    <tool.icon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      <Badge className={getDifficultyColor(tool.difficulty)} variant="outline">
                        {tool.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(tool.status)} variant="outline">
                        {tool.status}
                      </Badge>
                      <Badge className={getCategoryColor(tool.category)} variant="outline">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">{tool.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-2">Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-green-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-elec-yellow/20">
                  <span className="text-xs text-muted-foreground">{tool.duration}</span>
                  <Button 
                    size="sm" 
                    disabled={tool.status === "Coming Soon"}
                    className="h-8"
                  >
                    <PlayCircle className="mr-2 h-3 w-3" />
                    {tool.status === "Coming Soon" ? "Coming Soon" : "Start Tool"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Practice Scenarios Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceScenarios.map((scenario, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{scenario.title}</h4>
                  <Badge className={getDifficultyColor(scenario.difficulty)} variant="outline">
                    {scenario.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{scenario.situation}</p>
                <div className="bg-blue-500/10 rounded-lg p-2">
                  <p className="text-xs text-blue-200">
                    <strong>Learning Outcome:</strong> {scenario.learningOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Communication Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTips.map((tip, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckSquare className="h-4 w-4 text-green-400" />
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-sm text-green-300">{tip.tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;

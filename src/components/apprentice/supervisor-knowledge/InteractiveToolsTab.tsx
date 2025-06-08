
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, MessageSquare, Users, Zap, PlayCircle, CheckSquare, Brain, Target, Award, TrendingUp, BookOpen, Video } from "lucide-react";
import { useState } from "react";

const InteractiveToolsTab = () => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

  const interactiveTools = [
    {
      title: "Communication Scenario Simulator",
      description: "Practice difficult workplace conversations in a safe, controlled environment",
      features: [
        "25+ realistic scenarios",
        "Multiple response options with consequences", 
        "Expert feedback and scoring",
        "Progress tracking and improvement suggestions",
        "Industry-specific dialogue examples",
        "Stress-testing difficult situations"
      ],
      difficulty: "Intermediate",
      duration: "15-30 mins per scenario",
      icon: MessageSquare,
      status: "Available",
      completionRate: 78,
      userRating: 4.7,
      scenarios: [
        "Requesting help without appearing incompetent",
        "Reporting a serious mistake to your supervisor", 
        "Dealing with an aggressive client",
        "Asking for a pay rise or promotion",
        "Challenging unsafe working practices",
        "Managing conflict with team members"
      ]
    },
    {
      title: "Cultural Awareness Assessment",
      description: "Comprehensive evaluation of UK workplace culture and electrical industry norms",
      features: [
        "75 situational questions",
        "Instant detailed feedback",
        "Industry benchmark comparison",
        "Personalised improvement plan",
        "Regional variation awareness",
        "Retake unlimited times"
      ],
      difficulty: "Beginner",
      duration: "25 mins",
      icon: CheckSquare,
      status: "Available",
      completionRate: 92,
      userRating: 4.5,
      topics: [
        "Professional hierarchy understanding",
        "Communication etiquette",
        "Health & safety culture",
        "Work-life balance expectations",
        "Diversity and inclusion practices",
        "Industry traditions and customs"
      ]
    },
    {
      title: "Virtual Site Meeting Experience",
      description: "Immersive 3D site briefing simulation with real-time participation",
      features: [
        "Photorealistic 3D environment",
        "Voice recognition technology",
        "Multiple role perspectives",
        "Safety-focused scenarios",
        "Real-time decision making",
        "Performance analytics"
      ],
      difficulty: "Advanced",
      duration: "45 mins",
      icon: Users,
      status: "Beta Testing",
      completionRate: 45,
      userRating: 4.9,
      experiences: [
        "Morning site briefing participation",
        "Toolbox talk presentations",
        "Emergency response drills",
        "Client progress meetings",
        "Health & safety discussions",
        "Inter-trade coordination meetings"
      ]
    },
    {
      title: "Professional Language Builder",
      description: "Develop industry-specific vocabulary and communication confidence",
      features: [
        "500+ electrical industry terms",
        "Native speaker pronunciation",
        "Context-based examples",
        "Daily vocabulary challenges",
        "Spaced repetition learning",
        "Progress gamification"
      ],
      difficulty: "Beginner",
      duration: "10 mins daily",
      icon: Lightbulb,
      status: "Available",
      completionRate: 85,
      userRating: 4.3,
      modules: [
        "Technical terminology mastery",
        "Safety communication phrases",
        "Client interaction vocabulary",
        "Formal email writing",
        "Phone conversation skills",
        "Presentation language"
      ]
    },
    {
      title: "Confidence Building Simulator",
      description: "Build self-assurance through progressive challenge scenarios",
      features: [
        "Graduated difficulty levels",
        "Confidence metrics tracking",
        "Peer comparison analytics",
        "Achievement unlock system",
        "Mentor feedback integration",
        "Real-world application tips"
      ],
      difficulty: "All Levels",
      duration: "20 mins per session",
      icon: Target,
      status: "Coming Soon",
      completionRate: 0,
      userRating: 0,
      challenges: [
        "Speaking up in group meetings",
        "Asking questions confidently",
        "Presenting work to clients",
        "Leading small team tasks",
        "Handling criticism constructively",
        "Networking at industry events"
      ]
    },
    {
      title: "Emotional Intelligence Trainer",
      description: "Develop workplace emotional awareness and management skills",
      features: [
        "EQ assessment tools",
        "Emotion recognition exercises",
        "Stress management techniques",
        "Empathy building scenarios",
        "Conflict resolution practice",
        "Leadership preparation"
      ],
      difficulty: "Intermediate",
      duration: "30 mins per module",
      icon: Brain,
      status: "Coming Soon",
      completionRate: 0,
      userRating: 0,
      skills: [
        "Self-awareness development",
        "Emotional regulation techniques",
        "Social skills enhancement",
        "Empathy and understanding",
        "Motivation and drive",
        "Relationship management"
      ]
    }
  ];

  const practiceScenarios = [
    {
      title: "Asking for Help from a Senior Electrician",
      situation: "You're stuck on a complex three-phase installation and need guidance without appearing incompetent",
      learningOutcome: "Learn professional help-seeking language and timing",
      difficulty: "Common",
      timeEstimate: "8 minutes",
      keySkills: ["Professional questioning", "Active listening", "Follow-up communication"]
    },
    {
      title: "Dealing with an Impatient Client",
      situation: "A homeowner is frustrated about work taking longer than expected and becoming confrontational",
      learningOutcome: "Develop client management and de-escalation skills",
      difficulty: "Challenging",
      timeEstimate: "12 minutes",
      keySkills: ["Conflict resolution", "Expectation management", "Professional boundaries"]
    },
    {
      title: "Reporting a Safety Concern",
      situation: "You notice unsafe working conditions but need to speak up to senior staff or contractors",
      learningOutcome: "Practice assertive communication for safety-critical situations",
      difficulty: "Critical",
      timeEstimate: "10 minutes",
      keySkills: ["Assertive communication", "Safety advocacy", "Documentation skills"]
    },
    {
      title: "Team Meeting Participation",
      situation: "Weekly site meeting where you need to contribute meaningfully and ask relevant questions",
      learningOutcome: "Build confidence in group settings and professional meetings",
      difficulty: "Intermediate",
      timeEstimate: "15 minutes",
      keySkills: ["Group communication", "Professional presence", "Question formulation"]
    },
    {
      title: "Requesting Time Off or Schedule Changes",
      situation: "You need to ask for time off or schedule adjustments for personal reasons",
      learningOutcome: "Learn professional request protocols and negotiation",
      difficulty: "Common",
      timeEstimate: "6 minutes",
      keySkills: ["Professional requests", "Negotiation basics", "Planning ahead"]
    },
    {
      title: "Giving and Receiving Feedback",
      situation: "Your supervisor provides constructive criticism about your work quality",
      learningOutcome: "Develop skills for handling feedback professionally and constructively",
      difficulty: "Important",
      timeEstimate: "10 minutes",
      keySkills: ["Active listening", "Growth mindset", "Professional development"]
    }
  ];

  const learningPath = [
    {
      level: "Foundation",
      description: "Basic workplace communication and cultural awareness",
      tools: ["Cultural Awareness Assessment", "Professional Language Builder"],
      timeRequired: "2-3 weeks",
      outcomes: ["Understand workplace hierarchy", "Use professional language", "Navigate basic interactions"]
    },
    {
      level: "Development", 
      description: "Advanced communication skills and scenario practice",
      tools: ["Communication Scenario Simulator", "Confidence Building Simulator"],
      timeRequired: "4-6 weeks",
      outcomes: ["Handle difficult conversations", "Build confidence", "Manage workplace conflicts"]
    },
    {
      level: "Mastery",
      description: "Leadership preparation and emotional intelligence",
      tools: ["Virtual Site Meeting", "Emotional Intelligence Trainer"],
      timeRequired: "8-10 weeks", 
      outcomes: ["Lead team discussions", "Manage emotions effectively", "Mentor other apprentices"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "All Levels": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Beta Testing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Coming Soon": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getScenarioDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Common": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Challenging": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Important": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Learning & Practice Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Hands-on practice tools designed to build real workplace communication skills. Use simulations, 
            assessments, and interactive scenarios to develop confidence and competence in professional situations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">6</div>
              <div className="text-sm text-muted-foreground">Interactive Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Practice Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">1,200+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">4.6</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
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
                    <div className="flex gap-2 mt-1">
                      <Badge className={getDifficultyColor(tool.difficulty)} variant="outline">
                        {tool.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(tool.status)} variant="outline">
                        {tool.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">{tool.description}</p>
              
              <div className="space-y-4">
                {tool.status === "Available" && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-muted-foreground">{tool.completionRate}% completion</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-elec-yellow" />
                        <span className="text-muted-foreground">{tool.userRating}/5 rating</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-white mb-2">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {tool.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-green-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  {tool.features.length > 4 && (
                    <Button 
                      variant="link" 
                      className="text-xs text-elec-yellow p-0 h-auto mt-1"
                      onClick={() => setActiveSimulation(activeSimulation === tool.title ? null : tool.title)}
                    >
                      {activeSimulation === tool.title ? 'Show less' : `+${tool.features.length - 4} more features`}
                    </Button>
                  )}
                </div>

                {activeSimulation === tool.title && (
                  <div className="border-t border-elec-yellow/20 pt-3">
                    <div className="grid grid-cols-1 gap-1">
                      {tool.features.slice(4).map((feature, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckSquare className="h-3 w-3 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    {(tool.scenarios || tool.topics || tool.experiences || tool.modules || tool.challenges || tool.skills) && (
                      <div className="mt-3">
                        <h5 className="font-medium text-white mb-2 text-sm">
                          {tool.scenarios ? 'Available Scenarios:' : 
                           tool.topics ? 'Assessment Topics:' :
                           tool.experiences ? 'Virtual Experiences:' :
                           tool.modules ? 'Learning Modules:' :
                           tool.challenges ? 'Confidence Challenges:' :
                           'Skills Developed:'}
                        </h5>
                        <div className="grid grid-cols-1 gap-1">
                          {(tool.scenarios || tool.topics || tool.experiences || tool.modules || tool.challenges || tool.skills)?.map((item, idx) => (
                            <div key={idx} className="text-xs text-blue-300 flex items-center gap-2">
                              <Video className="h-3 w-3" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-elec-yellow/20">
                  <span className="text-xs text-muted-foreground">{tool.duration}</span>
                  <Button 
                    size="sm" 
                    disabled={tool.status === "Coming Soon"}
                    className="h-8"
                  >
                    <PlayCircle className="mr-2 h-3 w-3" />
                    {tool.status === "Coming Soon" ? "Coming Soon" : 
                     tool.status === "Beta Testing" ? "Join Beta" : "Start Tool"}
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
            <Zap className="h-5 w-5" />
            Featured Practice Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceScenarios.map((scenario, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{scenario.title}</h4>
                  <Badge className={getScenarioDifficultyColor(scenario.difficulty)} variant="outline">
                    {scenario.difficulty}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{scenario.situation}</p>
                
                <div className="space-y-2">
                  <div className="bg-blue-500/10 rounded-lg p-2">
                    <p className="text-xs text-blue-200">
                      <strong>Learning Outcome:</strong> {scenario.learningOutcome}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {scenario.timeEstimate}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Practice Now
                    </Button>
                  </div>
                  
                  <div>
                    <p className="text-xs text-blue-300 mb-1">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {scenario.keySkills.map((skill, idx) => (
                        <Badge key={idx} className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs" variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Structured Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200 mb-4 text-sm">
            Follow our recommended progression path to systematically develop your workplace communication skills.
          </p>
          
          <div className="space-y-4">
            {learningPath.map((level, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">Level {index + 1}: {level.level}</h3>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30" variant="outline">
                    {level.timeRequired}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-purple-300 mb-2 text-sm">Required Tools:</h4>
                    <div className="space-y-1">
                      {level.tools.map((tool, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckSquare className="h-3 w-3 text-purple-400" />
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-purple-300 mb-2 text-sm">Learning Outcomes:</h4>
                    <div className="space-y-1">
                      {level.outcomes.map((outcome, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Target className="h-3 w-3 text-purple-400" />
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Progress: Level {index + 1} of {learningPath.length}
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      {index === 0 ? 'Start Level' : index === 1 ? 'Continue' : 'Coming Soon'}
                    </Button>
                  </div>
                  <Progress value={(index + 1) * (100 / learningPath.length)} className="mt-2 h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;

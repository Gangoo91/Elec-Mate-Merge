
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Calendar, BarChart3, Clock, Trophy, CheckCircle, AlertCircle } from "lucide-react";

const ProgressTrackingTab = () => {
  const trackingMethods = [
    {
      method: "Study Time Logging",
      description: "Track daily and weekly study hours across different subjects",
      benefits: ["Identify peak productivity times", "Ensure balanced subject coverage", "Set realistic study goals"],
      tools: ["Digital calendars", "Study apps", "Time tracking software", "Simple logbooks"],
      metrics: ["Hours per subject", "Weekly totals", "Consistency streaks", "Goal achievement"]
    },
    {
      method: "Knowledge Assessment",
      description: "Regular testing to measure understanding and retention",
      benefits: ["Identify knowledge gaps", "Track improvement over time", "Build exam confidence"],
      tools: ["Practice tests", "Flashcard apps", "Quiz platforms", "Self-assessment sheets"],
      metrics: ["Test scores", "Question accuracy", "Speed improvements", "Concept mastery"]
    },
    {
      method: "Milestone Tracking",
      description: "Break down learning goals into achievable milestones",
      benefits: ["Maintain motivation", "Celebrate small wins", "Stay on track with deadlines"],
      tools: ["Goal-setting apps", "Progress charts", "Achievement badges", "Milestone calendars"],
      metrics: ["Milestones completed", "Target dates met", "Goal progression", "Completion rates"]
    },
    {
      method: "Skill Development",
      description: "Monitor practical and theoretical skill improvements",
      benefits: ["Focus on weak areas", "Track competency growth", "Prepare for assessments"],
      tools: ["Skill matrices", "Competency trackers", "Portfolio systems", "Progress journals"],
      metrics: ["Skill ratings", "Practical assessments", "Employer feedback", "Self-evaluations"]
    }
  ];

  const studyMetrics = [
    {
      category: "Time Management",
      icon: Clock,
      color: "text-blue-400",
      metrics: [
        { name: "Daily Study Time", target: "2 hours", current: "1.8 hours", progress: 90 },
        { name: "Weekly Goals", target: "14 hours", current: "12.6 hours", progress: 90 },
        { name: "Consistency Streak", target: "30 days", current: "18 days", progress: 60 }
      ]
    },
    {
      category: "Knowledge Retention",
      icon: BarChart3,
      color: "text-green-400",
      metrics: [
        { name: "18th Edition", target: "85%", current: "78%", progress: 78 },
        { name: "Level 3 Theory", target: "80%", current: "72%", progress: 72 },
        { name: "Practical Skills", target: "90%", current: "85%", progress: 85 }
      ]
    },
    {
      category: "Goal Achievement",
      icon: Target,
      color: "text-elec-yellow",
      metrics: [
        { name: "Monthly Targets", target: "100%", current: "85%", progress: 85 },
        { name: "Assessment Prep", target: "Ready", current: "75%", progress: 75 },
        { name: "Portfolio Progress", target: "Complete", current: "60%", progress: 60 }
      ]
    }
  ];

  const trackingTools = [
    {
      tool: "Digital Study Planners",
      description: "Comprehensive apps for tracking all aspects of your learning journey",
      features: ["Integrated calendars", "Progress analytics", "Goal setting", "Reminder systems"],
      examples: ["Notion", "Trello", "Microsoft OneNote", "Google Workspace"],
      bestFor: "Students who like detailed planning and analytics"
    },
    {
      tool: "Time Tracking Apps",
      description: "Specialised tools for monitoring study time and productivity",
      features: ["Automatic time tracking", "Category organisation", "Productivity insights", "Goal setting"],
      examples: ["Toggl", "RescueTime", "Forest", "Clockify"],
      bestFor: "Students wanting to optimise their study time"
    },
    {
      tool: "Flashcard Systems",
      description: "Spaced repetition systems for knowledge retention tracking",
      features: ["Adaptive algorithms", "Progress tracking", "Performance analytics", "Cross-device sync"],
      examples: ["Anki", "Quizlet", "Memrise", "Brainscape"],
      bestFor: "Memorisation and knowledge retention"
    },
    {
      tool: "Habit Trackers",
      description: "Simple tools for building and maintaining study habits",
      features: ["Streak tracking", "Visual progress", "Habit reminders", "Motivation systems"],
      examples: ["Habitica", "Streaks", "Way of Life", "Loop Habit Tracker"],
      bestFor: "Building consistent study routines"
    }
  ];

  const progressStrategies = [
    {
      strategy: "Weekly Reviews",
      description: "Regular assessment of progress and adjustment of study plans",
      implementation: [
        "Set aside 30 minutes every Sunday",
        "Review the previous week's achievements",
        "Identify areas that need more attention",
        "Adjust next week's goals accordingly"
      ]
    },
    {
      strategy: "Monthly Milestones",
      description: "Break annual goals into monthly checkpoints",
      implementation: [
        "Define 12 monthly learning objectives",
        "Create specific, measurable targets",
        "Celebrate milestone achievements",
        "Adjust timeline if needed"
      ]
    },
    {
      strategy: "Peer Accountability",
      description: "Share progress with study partners for motivation",
      implementation: [
        "Find an accountability partner",
        "Share weekly progress updates",
        "Discuss challenges and solutions",
        "Celebrate successes together"
      ]
    },
    {
      strategy: "Visual Progress Tracking",
      description: "Use charts and graphs to visualise improvement",
      implementation: [
        "Create progress charts for key subjects",
        "Use colour coding for different topics",
        "Update charts weekly",
        "Display prominently in study area"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Progress Tracking & Analytics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Monitor your learning journey with comprehensive tracking tools and analytics. Research shows that 
            students who track their progress are 42% more likely to achieve their study goals.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">+25%</p>
              <p className="text-xs text-muted-foreground">Retention Boost</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">42%</p>
              <p className="text-xs text-muted-foreground">Higher Success</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Clock className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <p className="text-lg font-bold text-white">30%</p>
              <p className="text-xs text-muted-foreground">Time Efficiency</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">90%</p>
              <p className="text-xs text-muted-foreground">Goal Achievement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Progress Dashboard */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Your Current Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {studyMetrics.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`h-6 w-6 ${category.color}`} />
                    <h4 className="font-semibold text-white text-lg">{category.category}</h4>
                  </div>
                  <div className="space-y-4">
                    {category.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">{metric.current}</span>
                            <span className="text-xs text-muted-foreground">/ {metric.target}</span>
                          </div>
                        </div>
                        <Progress value={metric.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tracking Methods */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Essential Tracking Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trackingMethods.map((method, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{method.method}</h4>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-300 text-sm mb-1">Key Benefits:</h5>
                    <ul className="space-y-1">
                      {method.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-300 text-sm mb-1">Recommended Tools:</h5>
                    <div className="flex flex-wrap gap-1">
                      {method.tools.map((tool, toolIndex) => (
                        <Badge key={toolIndex} variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                          {tool}
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

      {/* Tracking Tools */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Recommended Tracking Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingTools.map((tool, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{tool.tool}</h4>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
                    {tool.bestFor.split(' ')[0]}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-300 text-sm mb-2">Key Features:</h5>
                    <ul className="space-y-1">
                      {tool.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-300 text-sm mb-2">Popular Examples:</h5>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {tool.examples.map((example, exampleIndex) => (
                        <Badge key={exampleIndex} variant="outline" className="text-xs border-white/20">
                          {example}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-green-300">
                      <strong>Best for:</strong> {tool.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Strategies */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Effective Progress Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressStrategies.map((strategy, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{strategy.strategy}</h4>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <h5 className="font-medium text-purple-300 mb-2">Implementation Steps:</h5>
                  <ol className="space-y-1">
                    {strategy.implementation.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-purple-400 font-medium">{stepIndex + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Section */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Progress Tracking Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-white mb-2">Do's</h4>
              <ul className="space-y-1">
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Track consistently, even if just for 5 minutes daily
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Focus on trends rather than daily fluctuations
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Celebrate small wins and progress milestones
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Adjust goals based on realistic progress rates
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Don'ts</h4>
              <ul className="space-y-1">
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Don't obsess over perfect tracking - consistency matters more
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Don't compare your progress to others too closely
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Don't abandon tracking after a few missed days
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Don't set unrealistic or overwhelming goals
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-elec-yellow mb-2">Start Tracking Your Progress Today</h3>
          <p className="text-muted-foreground mb-4">
            Choose your preferred tracking method and begin monitoring your learning journey for better results.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Set Up Progress Dashboard
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              Download Templates
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              Join Tracking Group
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTrackingTab;

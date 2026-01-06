
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, ArrowRight, ArrowLeft, Clock, Star } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  category: "daily" | "weekly" | "monthly";
  difficulty: "beginner" | "intermediate" | "advanced";
  timeRequired: string;
  steps: string[];
  benefits: string[];
  tips: string[];
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Morning Check-in Routine",
    description: "Start each day by properly checking in with your supervisor and team members",
    category: "daily",
    difficulty: "beginner",
    timeRequired: "5-10 minutes",
    steps: [
      "Arrive a few minutes early to prepare for the day",
      "Greet your supervisor and team members professionally",
      "Ask about the day's priorities and any changes to plans",
      "Confirm your understanding of assigned tasks",
      "Ask if there are any safety considerations for the day"
    ],
    benefits: [
      "Shows reliability and professionalism",
      "Helps you stay aligned with daily goals",
      "Demonstrates that you value communication",
      "Gives opportunities to ask questions early"
    ],
    tips: [
      "Be consistent - do this every day",
      "Keep it brief but meaningful",
      "Listen actively to responses",
      "Take notes if needed"
    ]
  },
  {
    id: 2,
    title: "Skills Development Conversations",
    description: "Regular discussions about your learning progress and career development",
    category: "weekly",
    difficulty: "intermediate",
    timeRequired: "15-20 minutes",
    steps: [
      "Schedule a brief weekly catch-up with your supervisor",
      "Prepare by noting what you've learned and questions you have",
      "Discuss your progress on current skills",
      "Ask for feedback on areas to improve",
      "Set learning goals for the following week",
      "Request opportunities to practice new skills"
    ],
    benefits: [
      "Shows commitment to professional development",
      "Helps identify learning opportunities",
      "Builds trust through open communication",
      "Demonstrates initiative and motivation"
    ],
    tips: [
      "Come prepared with specific questions",
      "Be open to constructive feedback",
      "Follow through on discussed goals",
      "Keep a learning journal"
    ]
  },
  {
    id: 3,
    title: "Team Contribution Initiative",
    description: "Find ways to contribute positively to your team beyond your assigned tasks",
    category: "weekly",
    difficulty: "intermediate",
    timeRequired: "Ongoing",
    steps: [
      "Observe what additional help your team might need",
      "Offer to assist with tasks that match your skill level",
      "Keep common areas tidy and organised",
      "Share useful information or resources you discover",
      "Volunteer for appropriate additional responsibilities",
      "Help newer team members when possible"
    ],
    benefits: [
      "Shows teamwork and initiative",
      "Builds relationships with all team members",
      "Demonstrates reliability beyond basic requirements",
      "Creates opportunities for additional learning"
    ],
    tips: [
      "Don't overcommit - balance with your main duties",
      "Ask before taking on additional tasks",
      "Be genuine in your offers to help",
      "Celebrate team successes together"
    ]
  },
  {
    id: 4,
    title: "Professional Relationship Mapping",
    description: "Understand and build relationships with different people in your workplace",
    category: "monthly",
    difficulty: "advanced",
    timeRequired: "30 minutes planning + ongoing practice",
    steps: [
      "Identify key people you work with regularly",
      "Note their roles, responsibilities, and communication preferences",
      "Observe successful interactions others have with these people",
      "Plan approaches for building positive relationships with each",
      "Practice adapting your communication style appropriately",
      "Reflect on and improve your relationship-building efforts"
    ],
    benefits: [
      "Improves your professional network",
      "Helps you understand workplace dynamics",
      "Develops emotional intelligence skills",
      "Creates a more positive work environment"
    ],
    tips: [
      "Focus on quality relationships, not quantity",
      "Be authentic in your interactions",
      "Respect different personality types and work styles",
      "Remember that relationships take time to develop"
    ]
  }
];

const RelationshipActivities = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());

  const handleActivitySelect = (activityId: number) => {
    setSelectedActivity(activityId);
    setCompletedSteps(new Set());
  };

  const toggleStepCompletion = (stepIndex: number) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(stepIndex)) {
      newCompletedSteps.delete(stepIndex);
    } else {
      newCompletedSteps.add(stepIndex);
    }
    setCompletedSteps(newCompletedSteps);
  };

  const handleCompleteActivity = () => {
    if (selectedActivity) {
      setCompletedActivities(prev => new Set([...prev, selectedActivity]));
      setSelectedActivity(null);
      setCompletedSteps(new Set());
    }
  };

  const handleBackToActivities = () => {
    setSelectedActivity(null);
    setCompletedSteps(new Set());
  };

  const currentActivity = activities.find(a => a.id === selectedActivity);

  if (selectedActivity && currentActivity) {
    const allStepsCompleted = completedSteps.size === currentActivity.steps.length;

    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-white">{currentActivity.title}</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToActivities}
                className="h-10 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10 touch-manipulation active:scale-95 transition-all"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Activities
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                {currentActivity.category}
              </Badge>
              <Badge variant="outline" className={`${
                currentActivity.difficulty === 'beginner' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                currentActivity.difficulty === 'intermediate' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {currentActivity.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                <Clock className="h-3 w-3 mr-1" />
                {currentActivity.timeRequired}
              </Badge>
            </div>

            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <p className="text-sm text-white/70">{currentActivity.description}</p>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(completedSteps.size / currentActivity.steps.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-green-400">
                {completedSteps.size}/{currentActivity.steps.length}
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Activity Steps:</h4>
              <div className="space-y-2">
                {currentActivity.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      completedSteps.has(index)
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-white/10 border-white/10 hover:border-purple-500/30'
                    }`}
                    onClick={() => toggleStepCompletion(index)}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      completedSteps.has(index)
                        ? 'border-green-500 bg-green-500'
                        : 'border-white/30'
                    }`}>
                      {completedSteps.has(index) && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      completedSteps.has(index) ? 'line-through text-white/80' : 'text-white/80'
                    }`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Benefits:
                </h4>
                <ul className="text-sm text-white/60 space-y-2">
                  {currentActivity.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <h4 className="font-semibold text-blue-400 mb-3">Tips for Success:</h4>
                <ul className="text-sm text-white/60 space-y-2">
                  {currentActivity.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {allStepsCompleted && (
              <Button
                onClick={handleCompleteActivity}
                className="w-full h-11 bg-green-500 hover:bg-green-500/90 text-white touch-manipulation active:scale-95 transition-all"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Activity Complete
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-gray to-elec-card border border-white/10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Relationship Building Activities</h3>
          <p className="text-sm text-white/60">Strengthen your professional relationships at work</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${(completedActivities.size / activities.length) * 100}%` }}
            />
          </div>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
            {completedActivities.size} / {activities.length}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => {
          const isCompleted = completedActivities.has(activity.id);
          const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
            daily: { border: 'border-green-500/20', bg: 'bg-green-500/10', text: 'text-green-400' },
            weekly: { border: 'border-blue-500/20', bg: 'bg-blue-500/10', text: 'text-blue-400' },
            monthly: { border: 'border-purple-500/20', bg: 'bg-purple-500/10', text: 'text-purple-400' }
          };
          const colors = categoryColors[activity.category] || categoryColors.daily;

          return (
            <Card
              key={activity.id}
              className={`bg-gradient-to-br from-elec-gray to-elec-card ${isCompleted ? 'border-green-500/30' : colors.border} hover:border-white/30 cursor-pointer transition-all overflow-hidden relative group`}
              onClick={() => handleActivitySelect(activity.id)}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${isCompleted ? 'bg-green-500/5' : colors.bg.replace('/10', '/5')} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardContent className="p-5 relative">
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${isCompleted ? 'from-green-500/20 to-green-500/5 border-green-500/30' : `from-purple-500/20 to-purple-500/5 border-purple-500/30`} border flex-shrink-0`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Users className="h-5 w-5 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{activity.title}</h4>
                      {isCompleted && (
                        <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-3">{activity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={`${colors.bg} ${colors.text} ${colors.border} text-xs`}>
                        {activity.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${
                        activity.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                        activity.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        {activity.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-white/5 text-white/60 border-white/20 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.timeRequired}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RelationshipActivities;

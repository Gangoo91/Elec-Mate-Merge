
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, ArrowRight } from "lucide-react";

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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">{currentActivity.title}</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={handleBackToActivities}>
              Back to Activities
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
              {currentActivity.category}
            </Badge>
            <Badge variant="outline" className={`${
              currentActivity.difficulty === 'beginner' ? 'border-green-500 text-green-300' :
              currentActivity.difficulty === 'intermediate' ? 'border-yellow-500 text-yellow-300' :
              'border-red-500 text-red-300'
            }`}>
              {currentActivity.difficulty}
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-300">
              {currentActivity.timeRequired}
            </Badge>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{currentActivity.description}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Activity Steps:</h4>
            <div className="space-y-2">
              {currentActivity.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    completedSteps.has(index)
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-elec-gray/50 border-elec-gray/30 hover:border-elec-yellow/30'
                  }`}
                  onClick={() => toggleStepCompletion(index)}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    completedSteps.has(index)
                      ? 'border-green-500 bg-green-500'
                      : 'border-elec-yellow/50'
                  }`}>
                    {completedSteps.has(index) && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <p className={`text-sm ${
                    completedSteps.has(index) ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-2">Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentActivity.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">Tips for Success:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentActivity.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {allStepsCompleted && (
            <div className="flex justify-center">
              <Button 
                onClick={handleCompleteActivity}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Activity Complete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Relationship Building Activities</h3>
        <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
          {completedActivities.size} / {activities.length} completed
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => (
          <Card 
            key={activity.id}
            className={`border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors ${
              completedActivities.has(activity.id) ? 'border-green-500/50' : ''
            }`}
            onClick={() => handleActivitySelect(activity.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    {completedActivities.has(activity.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {activity.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {activity.timeRequired}
                    </Badge>
                  </div>
                </div>
                <Users className="h-4 w-4 text-elec-yellow flex-shrink-0 ml-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelationshipActivities;

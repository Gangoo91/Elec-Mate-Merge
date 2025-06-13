
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Zap, Clock, Target, TrendingUp } from "lucide-react";
import MoodTracker from "@/components/mental-health/interactive/MoodTracker";
import SelfCareReminders from "@/components/mental-health/interactive/SelfCareReminders";

const InteractiveToolsTab = () => {
  const toolCategories = [
    {
      title: "Mood & Wellness Tracking",
      icon: <Heart className="h-6 w-6 text-red-400" />,
      description: "Monitor your emotional wellbeing with daily check-ins and progress tracking",
      tools: ["Daily Mood Tracker", "Wellness Dashboard", "Progress Analytics"]
    },
    {
      title: "Stress Management",
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      description: "Interactive tools to help identify, understand, and manage stress levels",
      tools: ["Stress Assessment", "Coping Strategies", "Relaxation Exercises"]
    },
    {
      title: "Self-Care Planning",
      icon: <Clock className="h-6 w-6 text-green-400" />,
      description: "Create personalised self-care routines and receive helpful reminders",
      tools: ["Self-Care Planner", "Habit Tracker", "Reminder System"]
    },
    {
      title: "Goal Setting",
      icon: <Target className="h-6 w-6 text-purple-400" />,
      description: "Set and track mental health goals with guided planning tools",
      tools: ["Goal Setting Wizard", "Progress Tracker", "Achievement Badges"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Mental Health Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Engage with our interactive tools designed to help you understand, monitor, and improve your mental wellbeing. 
            These evidence-based tools provide personalised insights and practical support for your mental health journey.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Zap className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Interactive</div>
              <div className="text-xs text-muted-foreground">Real-time feedback</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Personalised</div>
              <div className="text-xs text-muted-foreground">Tailored to you</div>
            </div>
            <div className="text-center">
              <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Evidence-Based</div>
              <div className="text-xs text-muted-foreground">Clinically proven</div>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">24/7 Access</div>
              <div className="text-xs text-muted-foreground">Always available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodTracker />
        <SelfCareReminders />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                {category.icon}
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="flex items-center gap-2 text-sm border border-elec-yellow/20 rounded p-2">
                    <Zap className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveToolsTab;

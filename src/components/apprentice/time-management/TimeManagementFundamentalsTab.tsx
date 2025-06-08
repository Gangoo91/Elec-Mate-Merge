
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, AlertCircle, CheckCircle } from "lucide-react";

const TimeManagementFundamentalsTab = () => {
  const principles = [
    {
      title: "Priority Matrix (Eisenhower Method)",
      description: "Categorise tasks by urgency and importance",
      icon: Target,
      color: "border-blue-500/20 bg-blue-500/10",
      steps: [
        "Urgent & Important: Do immediately (safety issues, deadlines)",
        "Important, Not Urgent: Schedule (study time, skills development)",
        "Urgent, Not Important: Delegate or minimise (interruptions)",
        "Neither: Eliminate (time wasters, excessive social media)"
      ]
    },
    {
      title: "Time Blocking",
      description: "Allocate specific time slots for different activities",
      icon: Clock,
      color: "border-green-500/20 bg-green-500/10",
      steps: [
        "Block work hours (including travel time)",
        "Schedule study sessions with specific topics",
        "Reserve time for breaks and meals",
        "Plan personal time and relationships"
      ]
    },
    {
      title: "The 2-Minute Rule",
      description: "If it takes less than 2 minutes, do it now",
      icon: CheckCircle,
      color: "border-purple-500/20 bg-purple-500/10",
      steps: [
        "Reply to quick messages immediately",
        "File documents as you receive them",
        "Complete small administrative tasks",
        "Tidy workspace at end of each day"
      ]
    }
  ];

  const commonChallenges = [
    {
      challenge: "Irregular work hours",
      solution: "Create flexible routines that adapt to shift patterns",
      tip: "Use travel time for audio learning content"
    },
    {
      challenge: "Physical exhaustion",
      solution: "Schedule demanding study during peak energy hours",
      tip: "Take power naps (15-20 minutes) when possible"
    },
    {
      challenge: "Multiple deadlines",
      solution: "Break large tasks into smaller, manageable chunks",
      tip: "Use backwards planning from deadline dates"
    },
    {
      challenge: "Distractions at home",
      solution: "Create a dedicated study space and set boundaries",
      tip: "Use noise-cancelling headphones or white noise"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Time Management Principles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const IconComponent = principle.icon;
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${principle.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {principle.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Challenges & Solutions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonChallenges.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{item.challenge}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.solution}</p>
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                  💡 {item.tip}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Getting Started: Your First Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Day 1-2: Assessment</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Track your current time usage for 2 days</li>
                <li>• Identify your peak energy hours</li>
                <li>• Note major time wasters and distractions</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Day 3-4: Planning</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create your weekly template schedule</li>
                <li>• Set up your priority matrix system</li>
                <li>• Choose your planning tools and apps</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Day 5-7: Implementation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with one new habit (e.g., time blocking)</li>
                <li>• Practice the 2-minute rule consistently</li>
                <li>• Review and adjust your approach daily</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeManagementFundamentalsTab;

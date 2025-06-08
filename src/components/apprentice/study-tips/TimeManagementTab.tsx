
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Target, CheckCircle } from "lucide-react";

const TimeManagementTab = () => {
  const scheduleTemplates = [
    {
      title: "Daily Routine (30-45 minutes)",
      icon: Clock,
      color: "border-blue-500/20 bg-blue-500/10",
      activities: [
        { time: "10 mins", activity: "Review yesterday's notes", description: "Quick recap to refresh memory" },
        { time: "20 mins", activity: "New material or practice questions", description: "Main learning activity" },
        { time: "10 mins", activity: "Quick quiz or flashcards", description: "Test understanding" },
        { time: "5 mins", activity: "Plan tomorrow's session", description: "Set goals for next day" }
      ]
    },
    {
      title: "Weekly Goals",
      icon: Calendar,
      color: "border-green-500/20 bg-green-500/10",
      activities: [
        { time: "Monday", activity: "New regulations/theory", description: "Learn new concepts" },
        { time: "Tuesday", activity: "Calculations practice", description: "Apply formulas and methods" },
        { time: "Wednesday", activity: "Review and consolidate", description: "Connect concepts together" },
        { time: "Thursday", activity: "Mock exam questions", description: "Test exam readiness" },
        { time: "Friday", activity: "Weekend revision planning", description: "Organise weekend study" }
      ]
    }
  ];

  const timeManagementTips = [
    {
      category: "Planning",
      tips: [
        { tip: "Use a study calendar", explanation: "Mark exam dates, deadlines, and study sessions" },
        { tip: "Set SMART goals", explanation: "Specific, Measurable, Achievable, Relevant, Time-bound" },
        { tip: "Break large topics down", explanation: "Divide complex subjects into manageable chunks" },
        { tip: "Plan regular reviews", explanation: "Schedule time to revisit previous material" }
      ]
    },
    {
      category: "Execution",
      tips: [
        { tip: "Use the 2-minute rule", explanation: "If it takes less than 2 minutes, do it now" },
        { tip: "Eliminate distractions", explanation: "Put phone away, find quiet space, use website blockers" },
        { tip: "Study at your peak time", explanation: "Identify when you're most alert and focused" },
        { tip: "Take regular breaks", explanation: "Use Pomodoro technique or similar structured breaks" }
      ]
    },
    {
      category: "Tracking",
      tips: [
        { tip: "Log study hours", explanation: "Track actual time spent studying vs planned" },
        { tip: "Monitor progress", explanation: "Regular self-testing to measure improvement" },
        { tip: "Adjust as needed", explanation: "Modify schedule based on what's working" },
        { tip: "Celebrate milestones", explanation: "Reward yourself for achieving study goals" }
      ]
    }
  ];

  const studyEnvironment = [
    {
      aspect: "Physical Space",
      recommendations: [
        "Good lighting - preferably natural light",
        "Comfortable chair and desk height",
        "Minimal clutter and distractions",
        "All materials within reach",
        "Quiet environment or noise-cancelling headphones"
      ]
    },
    {
      aspect: "Digital Setup",
      recommendations: [
        "Multiple monitors if available",
        "Good internet connection for online resources",
        "PDF reader for regulations and guides",
        "Calculator app or physical calculator",
        "Note-taking app or traditional notebooks"
      ]
    },
    {
      aspect: "Study Materials",
      recommendations: [
        "BS 7671 18th Edition",
        "On-Site Guide",
        "Guidance Note 3",
        "Practice exam papers",
        "Coloured pens for highlighting and diagrams"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Study Schedule Templates</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scheduleTemplates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${template.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">{template.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {template.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="bg-black/20 rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-1">
                          <Badge variant="outline" className="text-xs border-white/20">
                            {activity.time}
                          </Badge>
                          <h4 className="font-medium text-white">{activity.activity}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Time Management Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {timeManagementTips.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.tips.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-medium text-white text-sm mb-1">{item.tip}</h4>
                      <p className="text-xs text-muted-foreground">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Optimal Study Environment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {studyEnvironment.map((env, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">{env.aspect}</h3>
                <ul className="space-y-2">
                  {env.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeManagementTab;

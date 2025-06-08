
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Clock, Brain, Target, ExternalLink } from "lucide-react";

const ProductivityToolsTab = () => {
  const mobileApps = [
    {
      name: "Forest",
      description: "Stay focused by growing virtual trees during study sessions",
      category: "Focus",
      price: "Free + Premium",
      features: ["Pomodoro timer", "Study statistics", "Focus challenges"],
      icon: "🌳"
    },
    {
      name: "Todoist",
      description: "Organise tasks and projects with natural language processing",
      category: "Task Management", 
      price: "Free + Premium",
      features: ["Project organisation", "Due date reminders", "Progress tracking"],
      icon: "✅"
    },
    {
      name: "RescueTime",
      description: "Automatically track how you spend time on devices",
      category: "Time Tracking",
      price: "Free + Premium",
      features: ["Automatic tracking", "Detailed reports", "Goal setting"],
      icon: "⏱️"
    },
    {
      name: "Headspace",
      description: "Guided meditation and mindfulness for stress management",
      category: "Wellbeing",
      price: "Free trial + Subscription",
      features: ["Guided meditations", "Sleep stories", "Focus music"],
      icon: "🧘"
    }
  ];

  const webTools = [
    {
      name: "Trello",
      description: "Visual project management using boards and cards",
      category: "Project Management",
      url: "https://trello.com",
      features: ["Kanban boards", "Team collaboration", "Due dates"],
      icon: "📋"
    },
    {
      name: "Google Calendar",
      description: "Schedule management with integration across devices",
      category: "Scheduling",
      url: "https://calendar.google.com",
      features: ["Multiple calendars", "Event reminders", "Mobile sync"],
      icon: "📅"
    },
    {
      name: "Notion",
      description: "All-in-one workspace for notes, tasks, and planning",
      category: "Note-taking",
      url: "https://notion.so",
      features: ["Database functionality", "Template gallery", "Team sharing"],
      icon: "📝"
    }
  ];

  const techniques = [
    {
      title: "Pomodoro Technique",
      description: "Work for 25 minutes, then take a 5-minute break",
      benefits: ["Maintains focus", "Prevents burnout", "Improves time awareness"],
      howTo: [
        "Choose a task to work on",
        "Set timer for 25 minutes",
        "Work until timer rings",
        "Take 5-minute break",
        "After 4 cycles, take longer 15-30 minute break"
      ]
    },
    {
      title: "Time Blocking",
      description: "Assign specific time slots to different activities",
      benefits: ["Reduces decision fatigue", "Ensures important tasks get time", "Creates routine"],
      howTo: [
        "List all regular activities (work, college, study, personal)",
        "Estimate time needed for each",
        "Block out fixed commitments first",
        "Assign remaining time to flexible tasks",
        "Include buffer time for unexpected issues"
      ]
    },
    {
      title: "Two-Minute Rule",
      description: "If a task takes less than 2 minutes, do it immediately",
      benefits: ["Prevents small task accumulation", "Maintains momentum", "Reduces mental load"],
      howTo: [
        "When you encounter a small task, assess if it takes under 2 minutes",
        "If yes, complete it immediately",
        "If no, add it to your task list or calendar",
        "Apply to emails, quick calls, filing, brief research"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            Recommended Mobile Apps
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Apps specifically useful for apprentices managing work and study
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mobileApps.map((app, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{app.name}</h4>
                      <Badge variant="outline" className="text-xs border-elec-yellow/30 mt-1">
                        {app.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{app.price}</div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-white">Key Features:</h5>
                  <ul className="space-y-1">
                    {app.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-elec-yellow" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            Web-Based Tools
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Browser-based tools for planning and organisation
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {webTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white">{tool.name}</h4>
                    <Badge variant="outline" className="text-xs border-elec-yellow/30 mt-1">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h5 className="text-xs font-medium text-white">Features:</h5>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-elec-yellow" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-elec-yellow/20 hover:bg-elec-yellow/10"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    Visit Site
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Proven Productivity Techniques
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Time-tested methods for maximising efficiency
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {techniques.map((technique, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{technique.title}</h3>
                    <p className="text-sm text-muted-foreground">{technique.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {technique.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">How to implement:</h4>
                      <ol className="space-y-1">
                        {technique.howTo.map((step, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-elec-yellow font-medium mt-0.5">{idx + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductivityToolsTab;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Smartphone, Calendar, Brain } from "lucide-react";

const ProductivityToolsTab = () => {
  const digitalTools = [
    {
      category: "Time Management Apps",
      icon: Calendar,
      color: "border-blue-500/20 bg-blue-500/10",
      tools: [
        {
          name: "Google Calendar",
          purpose: "Schedule management and reminders",
          features: ["Multiple calendars", "Mobile sync", "Reminder notifications"],
          cost: "Free",
          electricianTip: "Create separate calendars for work shifts, study time, and personal life"
        },
        {
          name: "Toggl Track",
          purpose: "Time tracking and analysis",
          features: ["Project tracking", "Detailed reports", "Mobile app"],
          cost: "Free tier available",
          electricianTip: "Track time spent on different study topics to identify focus areas"
        },
        {
          name: "Any.do",
          purpose: "Task management and to-do lists",
          features: ["Voice input", "Location reminders", "Calendar integration"],
          cost: "Free with premium options",
          electricianTip: "Use voice input for quick task capture whilst on site"
        }
      ]
    },
    {
      category: "Study & Learning Tools",
      icon: Brain,
      color: "border-green-500/20 bg-green-500/10",
      tools: [
        {
          name: "Anki",
          purpose: "Spaced repetition flashcards",
          features: ["Smart scheduling", "Image support", "Progress tracking"],
          cost: "Free (iOS app paid)",
          electricianTip: "Create flashcards for BS 7671 regulations and circuit calculations"
        },
        {
          name: "Forest",
          purpose: "Focus and concentration",
          features: ["Pomodoro timer", "Focus tracking", "Achievement system"],
          cost: "Small one-time fee",
          electricianTip: "Use during study sessions to avoid phone distractions"
        },
        {
          name: "Notion",
          purpose: "All-in-one workspace",
          features: ["Note-taking", "Project planning", "Knowledge base"],
          cost: "Free for personal use",
          electricianTip: "Build your electrical knowledge base with diagrams and notes"
        }
      ]
    },
    {
      category: "Communication & Coordination",
      icon: Smartphone,
      color: "border-purple-500/20 bg-purple-500/10",
      tools: [
        {
          name: "WhatsApp",
          purpose: "Quick communication with supervisors and colleagues",
          features: ["Voice messages", "Document sharing", "Group chats"],
          cost: "Free",
          electricianTip: "Create groups for different projects to keep communication organised"
        },
        {
          name: "Microsoft Teams",
          purpose: "Professional communication and file sharing",
          features: ["Video calls", "Document collaboration", "Calendar integration"],
          cost: "Free tier available",
          electricianTip: "Use for formal communication with training providers"
        },
        {
          name: "Slack",
          purpose: "Team communication and project coordination",
          features: ["Channels", "File sharing", "Integration with other tools"],
          cost: "Free for small teams",
          electricianTip: "Join electrical communities and apprentice support groups"
        }
      ]
    }
  ];

  const analogueTools = [
    {
      tool: "Physical Planner/Diary",
      benefits: [
        "No battery required",
        "Quick visual overview",
        "Satisfying to physically tick off tasks",
        "No digital distractions"
      ],
      bestFor: "Weekly planning and daily task lists",
      tip: "Use colour coding: blue for work, green for study, red for urgent"
    },
    {
      tool: "Wall Calendar",
      benefits: [
        "Visible to family/housemates",
        "Shows monthly overview",
        "Easy to mark important dates",
        "Physical presence creates accountability"
      ],
      bestFor: "Long-term planning and family coordination",
      tip: "Mark college days, work shifts, and important deadlines in different colours"
    },
    {
      tool: "Notebook for Ideas",
      benefits: [
        "Quick capture anywhere",
        "Sketches and diagrams",
        "No tech learning curve",
        "Personal and private"
      ],
      bestFor: "On-site learning notes and technical sketches",
      tip: "Keep a small notebook in your tool bag for quick electrical diagrams and notes"
    },
    {
      tool: "Sticky Note System",
      benefits: [
        "Visual reminders",
        "Moveable and flexible",
        "Colour coding possible",
        "Satisfying to remove when done"
      ],
      bestFor: "Immediate reminders and priority tasks",
      tip: "Use on your bedroom mirror or laptop for daily priorities"
    }
  ];

  const productivityHacks = [
    {
      hack: "The Two-Minute Rule",
      description: "If it takes less than 2 minutes, do it immediately",
      example: "Reply to text messages, file documents, update your logbook entry"
    },
    {
      hack: "Batch Similar Tasks",
      description: "Group similar activities together to reduce mental switching",
      example: "Do all your electrical calculations in one session, reply to all messages at once"
    },
    {
      hack: "Time Blocking",
      description: "Assign specific time blocks to different types of work",
      example: "7-8am: Study theory, 8am-5pm: Work, 6-7pm: Portfolio updates"
    },
    {
      hack: "The 80/20 Rule (Pareto Principle)",
      description: "Focus on the 20% of tasks that give 80% of results",
      example: "Master key electrical principles that appear in most situations"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Digital Productivity Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {digitalTools.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              
              return (
                <div key={categoryIndex} className={`border rounded-lg p-6 ${category.color}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="bg-black/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{tool.name}</h4>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                            {tool.cost}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{tool.purpose}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-white">Features:</p>
                            <ul className="text-xs text-muted-foreground">
                              {tool.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-3 p-2 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                            <p className="text-xs font-medium text-elec-yellow">💡 Electrician Tip:</p>
                            <p className="text-xs text-muted-foreground">{tool.electricianTip}</p>
                          </div>
                        </div>
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
          <CardTitle className="text-elec-yellow">Analogue Tools & Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analogueTools.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{item.tool}</h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Benefits:</p>
                    <ul className="space-y-1">
                      {item.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-white">Best for: <span className="font-normal text-muted-foreground">{item.bestFor}</span></p>
                  </div>
                  
                  <div className="p-2 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                    <p className="text-xs font-medium text-elec-yellow">💡 Pro Tip:</p>
                    <p className="text-xs text-muted-foreground">{item.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Productivity Hacks for Apprentices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productivityHacks.map((hack, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{hack.hack}</h4>
                <p className="text-sm text-muted-foreground mb-3">{hack.description}</p>
                
                <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                  <p className="text-xs font-medium text-blue-400">🔧 Electrical Example:</p>
                  <p className="text-xs text-muted-foreground">{hack.example}</p>
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


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, Smartphone, Laptop, Clock, Target, BookOpen } from "lucide-react";
import { useState } from "react";

const ProductivityToolsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("apps");

  const toolCategories = [
    { id: "apps", label: "Mobile Apps", icon: Smartphone },
    { id: "techniques", label: "Techniques", icon: Target },
    { id: "physical", label: "Physical Tools", icon: Wrench },
    { id: "study", label: "Study Tools", icon: BookOpen }
  ];

  const mobileApps = [
    {
      name: "Forest",
      category: "Focus & Time Management",
      description: "Plant virtual trees while staying focused. Perfect for study sessions.",
      features: ["Pomodoro timer", "Focus tracking", "Study statistics", "Gamification"],
      cost: "Free with premium features",
      bestFor: "Staying off your phone during study time"
    },
    {
      name: "Notion",
      category: "All-in-One Workspace",
      description: "Create study notes, track progress, and manage apprenticeship tasks.",
      features: ["Note-taking", "Task management", "Progress tracking", "Templates"],
      cost: "Free for personal use",
      bestFor: "Organising all apprenticeship materials in one place"
    },
    {
      name: "Google Calendar",
      category: "Scheduling",
      description: "Essential for managing work shifts, college, and study time.",
      features: ["Multi-calendar view", "Reminders", "Integration", "Sharing"],
      cost: "Free",
      bestFor: "Coordinating work and study schedules"
    },
    {
      name: "Todoist",
      category: "Task Management",
      description: "Powerful task management with natural language processing.",
      features: ["Natural language input", "Project organisation", "Due dates", "Labels"],
      cost: "Free with premium features",
      bestFor: "Managing daily tasks and college assignments"
    },
    {
      name: "Anki",
      category: "Learning",
      description: "Spaced repetition flashcards for electrical theory and regulations.",
      features: ["Spaced repetition", "Custom decks", "Multimedia cards", "Sync"],
      cost: "Free (iOS paid)",
      bestFor: "Memorising electrical codes and formulas"
    },
    {
      name: "RescueTime",
      category: "Time Tracking",
      description: "Automatic time tracking to understand how you spend your time.",
      features: ["Automatic tracking", "Detailed reports", "Goal setting", "Website blocking"],
      cost: "Free with premium features",
      bestFor: "Understanding and improving time usage patterns"
    }
  ];

  const productivityTechniques = [
    {
      name: "Pomodoro Technique",
      description: "25-minute focused work sessions with 5-minute breaks",
      implementation: [
        "Choose a task to work on",
        "Set timer for 25 minutes",
        "Work until timer rings",
        "Take a 5-minute break",
        "After 4 cycles, take a 15-30 minute break"
      ],
      bestFor: "Study sessions and coursework",
      tips: ["Use physical timer to avoid phone distractions", "Adjust timing if 25 minutes feels too long/short"]
    },
    {
      name: "Time Blocking",
      description: "Allocate specific time slots for different activities",
      implementation: [
        "List all your regular activities (work, study, meals, etc.)",
        "Estimate time needed for each",
        "Block out fixed commitments first (work, college)",
        "Schedule study time in your most productive hours",
        "Include buffer time for unexpected delays"
      ],
      bestFor: "Weekly and daily planning",
      tips: ["Colour-code different types of activities", "Review and adjust blocks weekly"]
    },
    {
      name: "Getting Things Done (GTD)",
      description: "Capture, clarify, organise, reflect, and engage with your tasks",
      implementation: [
        "Capture: Write down all tasks and ideas",
        "Clarify: Is it actionable? What's the next action?",
        "Organise: Put tasks in appropriate lists/contexts",
        "Reflect: Review your system regularly",
        "Engage: Choose actions based on context and energy"
      ],
      bestFor: "Managing multiple responsibilities",
      tips: ["Use a 'capture' notebook for quick task notes", "Weekly reviews are essential"]
    }
  ];

  const physicalTools = [
    {
      name: "Physical Planner",
      description: "Hands-on planning away from digital distractions",
      benefits: ["No digital distractions", "Better memory retention", "Tactile satisfaction"],
      features: ["Weekly/monthly views", "Goal tracking", "Habit tracking"],
      cost: "£10-30"
    },
    {
      name: "Whiteboard/Cork Board",
      description: "Visual task management and study aid",
      benefits: ["Visual organisation", "Easy to update", "Space for diagrams"],
      features: ["Magnetic surface", "Different coloured pens", "Removable sections"],
      cost: "£15-50"
    },
    {
      name: "Study Timer",
      description: "Dedicated timer for focused work sessions",
      benefits: ["No phone distractions", "Visual time remaining", "Multiple timing options"],
      features: ["Silent vibration", "Multiple presets", "Portable"],
      cost: "£10-25"
    },
    {
      name: "Filing System",
      description: "Organised storage for apprenticeship documents",
      benefits: ["Easy document retrieval", "Professional organisation", "Backup for digital files"],
      features: ["Labelled sections", "Portable folders", "Waterproof options"],
      cost: "£20-40"
    }
  ];

  const studyTools = [
    {
      name: "Mind Mapping Software",
      description: "Visual learning and concept connection",
      examples: ["XMind", "MindMeister", "SimpleMind"],
      benefits: ["Visual learning", "Concept connection", "Memory aid"],
      cost: "Free to £10/month"
    },
    {
      name: "Note-Taking Apps",
      description: "Digital note organisation with search and sync",
      examples: ["Obsidian", "OneNote", "Evernote"],
      benefits: ["Searchable notes", "Cross-device sync", "Rich formatting"],
      cost: "Free to £15/month"
    },
    {
      name: "Video Speed Controllers",
      description: "Watch training videos at optimal speed",
      examples: ["Video Speed Controller (Chrome)", "VLC Player"],
      benefits: ["Faster consumption", "Better retention", "Time saving"],
      cost: "Free"
    },
    {
      name: "PDF Annotation Tools",
      description: "Mark up regulations and technical documents",
      examples: ["Adobe Acrobat", "PDF Expert", "Xodo"],
      benefits: ["Active reading", "Easy review", "Searchable annotations"],
      cost: "Free to £20/month"
    }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case "apps":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mobileApps.map((app, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{app.name}</h4>
                    <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow mt-1">
                      {app.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
                    {app.cost}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white text-sm mb-2">Key Features:</h5>
                    <div className="flex flex-wrap gap-2">
                      {app.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs border-blue-400/30 text-blue-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white text-sm mb-1">Best For:</h5>
                    <p className="text-xs text-muted-foreground">{app.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "techniques":
        return (
          <div className="space-y-6">
            {productivityTechniques.map((technique, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">{technique.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{technique.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-white mb-2">Implementation Steps:</h5>
                    <ol className="space-y-1">
                      {technique.implementation.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-elec-yellow font-medium">{stepIndex + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <div className="mb-3">
                      <h5 className="font-medium text-white mb-1">Best For:</h5>
                      <p className="text-sm text-muted-foreground">{technique.bestFor}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-white mb-2">Pro Tips:</h5>
                      <ul className="space-y-1">
                        {technique.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "physical":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {physicalTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
                    {tool.cost}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white text-sm mb-2">Benefits:</h5>
                    <ul className="space-y-1">
                      {tool.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white text-sm mb-2">Key Features:</h5>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs border-blue-400/30 text-blue-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "study":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white">{tool.name}</h4>
                  <Badge variant="outline" className="text-xs border-green-400/30 text-green-400">
                    {tool.cost}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white text-sm mb-2">Examples:</h5>
                    <div className="flex flex-wrap gap-2">
                      {tool.examples.map((example, exampleIndex) => (
                        <Badge key={exampleIndex} variant="outline" className="text-xs border-blue-400/30 text-blue-400">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white text-sm mb-2">Benefits:</h5>
                    <ul className="space-y-1">
                      {tool.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Productivity Tools & Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {toolCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {renderContent()}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Tool Selection Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">🎯 Choosing the Right Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Start with free tools before investing in premium</li>
                <li>• Pick tools that integrate well together</li>
                <li>• Consider your learning style (visual, auditory, kinesthetic)</li>
                <li>• Test tools for 1-2 weeks before committing</li>
                <li>• Don't use too many tools - focus on 3-5 core ones</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">⚡ Electrical Apprentice Priorities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Calendar app (essential for work/study coordination)</li>
                <li>• Note-taking app (regulations and theory notes)</li>
                <li>• Timer/focus app (structured study sessions)</li>
                <li>• Flashcard app (electrical codes and formulas)</li>
                <li>• Task manager (assignments and deadlines)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductivityToolsTab;

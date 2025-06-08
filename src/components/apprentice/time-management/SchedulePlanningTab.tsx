
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckSquare, AlertCircle, Target } from "lucide-react";
import { useState } from "react";

const SchedulePlanningTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const scheduleTemplates = [
    {
      id: "early-bird",
      title: "Early Bird Schedule",
      description: "For apprentices who prefer starting early",
      icon: Clock,
      color: "border-blue-500/20 bg-blue-500/10",
      schedule: {
        "5:30": "Wake up, light breakfast",
        "6:00": "Travel to site",
        "7:00": "Work starts",
        "12:00": "Lunch break",
        "16:30": "Work ends, travel home",
        "17:30": "Study time (1.5 hours)",
        "19:00": "Dinner and family time",
        "21:00": "Personal time/relaxation",
        "22:00": "Prepare for next day",
        "22:30": "Bedtime"
      }
    },
    {
      id: "standard",
      title: "Standard Schedule",
      description: "Balanced approach for most apprentices",
      icon: Target,
      color: "border-green-500/20 bg-green-500/10",
      schedule: {
        "6:30": "Wake up, breakfast",
        "7:30": "Travel to site",
        "8:00": "Work starts",
        "12:30": "Lunch break",
        "17:00": "Work ends, travel home",
        "18:00": "Study time (2 hours)",
        "20:00": "Dinner",
        "21:00": "Personal time",
        "22:30": "Prepare for next day",
        "23:00": "Bedtime"
      }
    },
    {
      id: "flexible",
      title: "Flexible Schedule",
      description: "For apprentices with varying site times",
      icon: Calendar,
      color: "border-purple-500/20 bg-purple-500/10",
      schedule: {
        "Variable": "Adjust wake-up based on site start time",
        "Site-1h": "Travel buffer",
        "Site time": "Work hours (track actual times)",
        "Site+30min": "Travel home",
        "Evening": "2-3 hours study (flexible timing)",
        "Personal": "1-2 hours personal time",
        "Wind-down": "30 minutes preparation",
        "Sleep": "7-8 hours target"
      }
    }
  ];

  const planningTools = [
    {
      title: "Weekly Planning Session",
      description: "Sunday evening review and planning",
      steps: [
        "Review previous week's achievements",
        "Identify upcoming deadlines and priorities",
        "Plan study topics for each day",
        "Schedule important personal activities",
        "Set three main goals for the week"
      ],
      time: "30-45 minutes"
    },
    {
      title: "Daily Planning Routine",
      description: "Morning or evening preparation",
      steps: [
        "Check tomorrow's site location and start time",
        "Prepare work clothes and tools",
        "Review study materials for the day",
        "Set 1-2 priority tasks",
        "Plan meal preparation"
      ],
      time: "10-15 minutes"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Schedule Templates</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {scheduleTemplates.map((template) => {
              const IconComponent = template.icon;
              
              return (
                <div key={template.id} className={`border rounded-lg p-6 ${template.color} transition-all duration-200 hover:scale-102 cursor-pointer ${selectedTemplate === template.id ? 'ring-2 ring-elec-yellow' : ''}`}
                     onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTemplate(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? 'Hide Details' : 'View Schedule'}
                  </Button>
                </div>
              );
            })}
          </div>

          {selectedTemplate && (
            <div className="mt-6 border border-elec-yellow/20 rounded-lg p-6 bg-elec-gray">
              <h4 className="font-semibold text-elec-yellow mb-4">
                {scheduleTemplates.find(t => t.id === selectedTemplate)?.title} - Sample Day
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(scheduleTemplates.find(t => t.id === selectedTemplate)?.schedule || {}).map(([time, activity]) => (
                  <div key={time} className="flex items-center gap-3 p-3 border border-elec-yellow/10 rounded">
                    <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                      {time}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Planning Routines</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planningTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-white">{tool.title}</h4>
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                    {tool.time}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                
                <ul className="space-y-2">
                  {tool.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Site-Specific Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">🏠 Domestic Sites</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Usually 8:00-16:30 working hours</li>
                <li>• More predictable schedule</li>
                <li>• Plan study time for 17:30-19:30</li>
                <li>• Use travel time for audio learning</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">🏢 Commercial Sites</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• May require early starts (6:00-7:00)</li>
                <li>• Longer days possible</li>
                <li>• Plan study for evenings or early mornings</li>
                <li>• Consider batch cooking on weekends</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePlanningTab;

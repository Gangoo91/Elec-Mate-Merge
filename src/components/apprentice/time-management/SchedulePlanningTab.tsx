
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, Briefcase } from "lucide-react";
import { useState } from "react";

const SchedulePlanningTab = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const scheduleTemplates = [
    {
      id: "standard-week",
      title: "Standard Working Week",
      description: "Monday-Friday work schedule with evening study",
      schedule: {
        "Monday": [
          { time: "07:00-08:00", activity: "Morning routine & travel", type: "personal" },
          { time: "08:00-17:00", activity: "Work (with lunch break)", type: "work" },
          { time: "17:00-18:00", activity: "Travel & decompress", type: "personal" },
          { time: "18:00-19:00", activity: "Dinner & family time", type: "personal" },
          { time: "19:00-20:30", activity: "Study session", type: "study" },
          { time: "20:30-22:00", activity: "Personal time", type: "personal" }
        ],
        "Weekend": [
          { time: "09:00-11:00", activity: "Extended study session", type: "study" },
          { time: "11:00-12:00", activity: "Physical exercise", type: "personal" },
          { time: "Afternoon", activity: "Social activities & hobbies", type: "personal" },
          { time: "Evening", activity: "Meal prep for the week", type: "personal" }
        ]
      }
    },
    {
      id: "shift-work",
      title: "Shift Work Schedule",
      description: "Rotating shifts with flexible study times",
      schedule: {
        "Early Shift": [
          { time: "05:30-06:30", activity: "Morning routine & travel", type: "personal" },
          { time: "06:30-15:00", activity: "Work", type: "work" },
          { time: "15:00-16:00", activity: "Travel & decompress", type: "personal" },
          { time: "16:00-17:30", activity: "Study session (peak alertness)", type: "study" },
          { time: "17:30-19:00", activity: "Dinner & family time", type: "personal" },
          { time: "21:00", activity: "Early bedtime", type: "personal" }
        ],
        "Late Shift": [
          { time: "08:00-10:00", activity: "Study session (morning fresh)", type: "study" },
          { time: "10:00-12:00", activity: "Personal tasks & exercise", type: "personal" },
          { time: "13:00-14:00", activity: "Travel to work", type: "personal" },
          { time: "14:00-22:30", activity: "Work", type: "work" },
          { time: "23:30", activity: "Light meal & wind down", type: "personal" }
        ]
      }
    }
  ];

  const studyPlanningTips = [
    {
      title: "The 20% Rule",
      description: "Ensure you're meeting your off-the-job training requirements",
      details: [
        "Track study hours weekly (aim for 7-8 hours minimum)",
        "Include college attendance in your calculation",
        "Document learning activities for portfolio evidence",
        "Balance theoretical study with practical application"
      ]
    },
    {
      title: "Spaced Repetition",
      description: "Review material at increasing intervals for better retention",
      details: [
        "Review new concepts after 1 day, 3 days, 1 week, 2 weeks",
        "Use flashcards for electrical symbols and formulas",
        "Create summary notes after each study session",
        "Test yourself regularly on previous topics"
      ]
    },
    {
      title: "Energy Management",
      description: "Align study activities with your natural energy levels",
      details: [
        "Schedule complex topics during peak energy hours",
        "Use low-energy times for reviewing notes",
        "Take breaks every 45-60 minutes during study",
        "Avoid heavy study sessions immediately after physical work"
      ]
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'study': return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40';
      case 'personal': return 'bg-green-500/20 text-green-400 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Weekly Schedule Templates</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scheduleTemplates.map((template) => (
              <div key={template.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{template.title}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                  >
                    {selectedTemplate === template.id ? "Hide" : "View"}
                  </Button>
                </div>
                
                {selectedTemplate === template.id && (
                  <div className="space-y-3">
                    {Object.entries(template.schedule).map(([day, activities]) => (
                      <div key={day}>
                        <h4 className="font-medium text-white mb-2">{day}</h4>
                        <div className="space-y-1">
                          {activities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground w-20">{activity.time}</span>
                              <Badge className={`text-xs ${getActivityColor(activity.type)}`}>
                                {activity.activity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Study Planning Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {studyPlanningTips.map((tip, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                <ul className="space-y-1">
                  {tip.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {detail}
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
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Work-Study Integration</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Maximise Learning at Work</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Ask questions about unfamiliar procedures
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Take photos of installations for study reference
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Practice calculations during breaks
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  Connect practical work to theoretical knowledge
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Study-Work Preparation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  Research upcoming work topics in advance
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  Prepare questions for your supervisor
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  Review safety procedures before new tasks
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  Use commute time for audio learning
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePlanningTab;

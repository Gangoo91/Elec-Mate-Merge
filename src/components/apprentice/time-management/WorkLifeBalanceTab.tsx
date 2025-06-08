
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Clock, Users } from "lucide-react";

const WorkLifeBalanceTab = () => {
  const balanceStrategies = [
    {
      title: "Boundary Setting",
      description: "Create clear separation between work and personal time",
      icon: Target,
      color: "border-blue-500/20 bg-blue-500/10",
      strategies: [
        "Turn off work phone after hours unless emergency",
        "Designate specific study spaces at home",
        "Communicate your schedule clearly to family/friends",
        "Practice saying 'no' to non-essential commitments"
      ],
      tips: ["Set phone to 'Do Not Disturb'", "Use separate work/personal calendars", "Create evening wind-down routine"]
    },
    {
      title: "Physical Wellbeing",
      description: "Maintain your health throughout your apprenticeship",
      icon: Heart,
      color: "border-green-500/20 bg-green-500/10",
      strategies: [
        "Schedule regular exercise sessions (even 20 minutes counts)",
        "Pack healthy lunches and snacks for site work",
        "Stay hydrated throughout long working days",
        "Get adequate sleep (7-8 hours) for concentration"
      ],
      tips: ["Use fitness apps for quick workouts", "Meal prep on weekends", "Track sleep patterns"]
    },
    {
      title: "Social Connections",
      description: "Maintain relationships whilst managing demanding schedule",
      icon: Users,
      color: "border-purple-500/20 bg-purple-500/10",
      strategies: [
        "Schedule regular catch-ups with friends and family",
        "Be present during quality time (phones away)",
        "Include loved ones in your apprenticeship journey",
        "Join apprentice social groups or networks"
      ],
      tips: ["Weekly family dinners", "Monthly friend meetups", "Share your achievements"]
    }
  ];

  const warningSignsAndSolutions = [
    {
      warning: "Constantly thinking about work during personal time",
      solution: "Practice mindfulness techniques and create transition rituals",
      immediateAction: "Take 5 minutes to write down tomorrow's priorities, then close your notebook"
    },
    {
      warning: "Neglecting personal relationships",
      solution: "Schedule regular quality time and communicate your needs",
      immediateAction: "Text a friend or family member right now to arrange a catch-up"
    },
    {
      warning: "Chronic exhaustion or illness",
      solution: "Review your schedule and prioritise rest and recovery",
      immediateAction: "Book a full day off this weekend with no work or study"
    },
    {
      warning: "Loss of interest in hobbies or activities you once enjoyed",
      solution: "Gradually reintroduce enjoyable activities into your routine",
      immediateAction: "Spend 30 minutes today doing something you love"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Work-Life Balance Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {balanceStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${strategy.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{strategy.title}</h3>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-2">Key Strategies:</h4>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Quick Tips:</h4>
                      <div className="flex flex-wrap gap-2">
                        {strategy.tips.map((tip, tipIndex) => (
                          <Badge key={tipIndex} variant="outline" className="text-xs border-white/20">
                            {tip}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Warning Signs & Solutions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {warningSignsAndSolutions.map((item, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">⚠️ Warning Sign</h4>
                    <p className="text-sm text-muted-foreground">{item.warning}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">💡 Solution</h4>
                    <p className="text-sm text-muted-foreground">{item.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">🎯 Take Action Now</h4>
                    <p className="text-sm text-muted-foreground">{item.immediateAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Weekly Balance Check-In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">This Week I Will...</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow/40 rounded"></div>
                  <span className="text-sm text-muted-foreground">Spend quality time with family/friends</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow/40 rounded"></div>
                  <span className="text-sm text-muted-foreground">Take at least one complete evening off</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow/40 rounded"></div>
                  <span className="text-sm text-muted-foreground">Do something I enjoy for at least 1 hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow/40 rounded"></div>
                  <span className="text-sm text-muted-foreground">Get adequate sleep (aim for 7-8 hours)</span>
                </div>
              </div>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Balance Reflection</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Energy levels (1-10):</p>
                  <div className="flex gap-1">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <div key={num} className="w-6 h-6 border border-elec-yellow/40 rounded text-xs flex items-center justify-center text-muted-foreground">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Relationship satisfaction (1-10):</p>
                  <div className="flex gap-1">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <div key={num} className="w-6 h-6 border border-elec-yellow/40 rounded text-xs flex items-center justify-center text-muted-foreground">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkLifeBalanceTab;

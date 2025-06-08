
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wrench, Shield, Clock } from "lucide-react";

const WorkplaceCommunicationTab = () => {
  const communicationTypes = [
    {
      title: "With Your Supervisor",
      icon: Users,
      color: "border-blue-500/20 bg-blue-500/10",
      iconColor: "text-blue-400",
      scenarios: [
        {
          situation: "Daily Check-ins",
          good: "Morning, I've checked the schedule and I'm ready to start on the kitchen circuits. Should I begin with the ring main or the lighting circuit first?",
          tips: ["Be proactive", "Show you've prepared", "Ask specific questions"]
        },
        {
          situation: "Reporting Problems",
          good: "I've found an issue with the cable run behind the kitchen units. There's a gas pipe in the way. I've stopped work and marked the area. What's the best alternative route?",
          tips: ["Stop work immediately", "Be specific about the problem", "Suggest solutions if possible"]
        },
        {
          situation: "Asking for Help",
          good: "I want to make sure I terminate this DB correctly. Could you check my work before I energise the circuit?",
          tips: ["Ask before making mistakes", "Show initiative", "Be specific about what you need"]
        }
      ]
    },
    {
      title: "With Experienced Colleagues",
      icon: Wrench,
      color: "border-yellow-500/20 bg-yellow-500/10",
      iconColor: "text-yellow-400",
      scenarios: [
        {
          situation: "Learning Techniques",
          good: "I've seen you do that cable termination really quickly. Could you show me your technique when you have a spare minute?",
          tips: ["Show respect for their experience", "Don't interrupt their work", "Be specific about what you want to learn"]
        },
        {
          situation: "Working as a Team",
          good: "I'll start pulling the cables while you mark up the DB. Shall we meet back here in an hour to connect everything up?",
          tips: ["Coordinate your work", "Be clear about timing", "Confirm the plan"]
        },
        {
          situation: "Sharing Information",
          good: "Just so you know, the client mentioned they want an extra socket in the study. I've told them we'll discuss it with you first.",
          tips: ["Keep everyone informed", "Don't make promises you can't keep", "Be clear about what was said"]
        }
      ]
    },
    {
      title: "With Clients/Customers",
      icon: Shield,
      color: "border-green-500/20 bg-green-500/10",
      iconColor: "text-green-400",
      scenarios: [
        {
          situation: "Explaining Work",
          good: "We're installing a new consumer unit today, which is like the main control box for your electricity. It'll take about 4 hours and you'll be without power for 2 hours while we make the connections.",
          tips: ["Use simple language", "Explain the impact on them", "Give realistic timeframes"]
        },
        {
          situation: "Dealing with Concerns",
          good: "I understand you're worried about the dust. We'll lay dust sheets and use a vacuum as we work. Is there anything specific you'd like us to be extra careful with?",
          tips: ["Listen to their concerns", "Explain your precautions", "Ask about their priorities"]
        },
        {
          situation: "Changes to Work",
          good: "We've found some old wiring that needs updating for safety. I'll need to discuss this with my supervisor and get back to you with options and costs.",
          tips: ["Don't make decisions beyond your authority", "Explain the safety implications", "Be clear about next steps"]
        }
      ]
    }
  ];

  const communicationChannels = [
    { method: "Face-to-face", when: "Complex instructions, safety issues, learning new skills", pros: ["Clear understanding", "Immediate feedback", "Shows respect"] },
    { method: "Radio/Phone", when: "Quick updates, coordination between areas", pros: ["Immediate contact", "Efficient for simple messages"] },
    { method: "Text/WhatsApp", when: "Non-urgent updates, sharing photos of work", pros: ["Record of communication", "Can include images", "No interruption"] },
    { method: "Written notes", when: "Handovers, detailed instructions, material lists", pros: ["Permanent record", "Can be referenced later", "Reduces errors"] }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Workplace Relationships</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {communicationTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${type.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`h-6 w-6 ${type.iconColor}`} />
                    <h3 className="text-xl font-semibold text-white">{type.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {type.scenarios.map((scenario, scenarioIndex) => (
                      <div key={scenarioIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{scenario.situation}</h4>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-3">
                          <p className="text-sm text-muted-foreground italic">"{scenario.good}"</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {scenario.tips.map((tip, tipIndex) => (
                            <Badge key={tipIndex} variant="outline" className="text-xs border-white/20">
                              {tip}
                            </Badge>
                          ))}
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
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Methods & When to Use Them</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communicationChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{channel.method}</h4>
                <p className="text-sm text-muted-foreground mb-3">{channel.when}</p>
                <div className="space-y-1">
                  {channel.pros.map((pro, proIndex) => (
                    <div key={proIndex} className="text-xs text-green-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      {pro}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkplaceCommunicationTab;

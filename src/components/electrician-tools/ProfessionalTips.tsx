import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Shield, Wrench, Clock, Star, Zap } from "lucide-react";

const ProfessionalTips = () => {
  const tips = [
    {
      icon: Wrench,
      category: "Tool Care",
      title: "Keep Your Tools Sharp",
      content: "Regularly sharpen wire strippers and cutters. Dull tools require more force and can damage cables or cause injury.",
      difficulty: "Basic",
      timeToRead: "2 min",
      rating: 4.8
    },
    {
      icon: Shield,
      category: "Safety",
      title: "Insulated Tools for Live Work",
      content: "Always use VDE-tested insulated tools when working on live circuits. Standard tools can conduct electricity and cause serious injury.",
      difficulty: "Critical",
      timeToRead: "3 min",
      rating: 5.0
    },
    {
      icon: Zap,
      category: "Technique",
      title: "Proper Torque Settings",
      content: "Use a torque screwdriver for terminals. Over-tightening can damage connections, while under-tightening creates loose connections and fire hazards.",
      difficulty: "Intermediate",
      timeToRead: "4 min",
      rating: 4.9
    },
    {
      icon: Clock,
      category: "Efficiency",
      title: "Tool Organisation",
      content: "Keep frequently used tools in easily accessible pockets. Arrange tools by job type rather than size for faster access during installations.",
      difficulty: "Basic",
      timeToRead: "2 min",
      rating: 4.6
    },
    {
      icon: Lightbulb,
      category: "Pro Tip",
      title: "Quality vs. Cost",
      content: "Invest in quality hand tools that you'll use daily. Cheap screwdrivers and pliers will fail when you need them most and can damage expensive components.",
      difficulty: "Basic",
      timeToRead: "3 min",
      rating: 4.7
    },
    {
      icon: Shield,
      category: "Compliance",
      title: "BS7671 Requirements",
      content: "Ensure your testing equipment meets current BS7671 standards. Non-compliant testers can give false readings and put you at legal risk.",
      difficulty: "Important",
      timeToRead: "5 min",
      rating: 5.0
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Critical": return "bg-red-600/90 text-white border-red-400";
      case "Important": return "bg-orange-600/90 text-white border-orange-400";
      case "Intermediate": return "bg-yellow-600/90 text-white border-yellow-400";
      case "Basic": return "bg-green-600/90 text-white border-green-400";
      default: return "bg-blue-600/90 text-white border-blue-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 border-blue-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-white">Professional Tips</CardTitle>
            <p className="text-white/80 text-sm">Expert advice from experienced electricians</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <Card key={index} className="bg-elec-card/50 border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <tip.icon className="h-5 w-5 text-blue-400" />
                    <span className="text-xs text-blue-400 font-medium">{tip.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white/80">{tip.rating}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-white leading-tight">{tip.title}</h4>
                
                <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                  {tip.content}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <Badge className={getDifficultyColor(tip.difficulty)}>
                    {tip.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Clock className="h-3 w-3" />
                    {tip.timeToRead}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-blue-600/10 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h5 className="font-medium text-white mb-1">Safety Reminder</h5>
              <p className="text-sm text-white/80">
                Always follow proper safety procedures and consult BS7671 regulations. 
                When in doubt, consult with a qualified supervisor or seek additional training.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalTips;
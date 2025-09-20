import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  Cable, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Star, 
  BookOpen,
  Wrench,
  Battery
} from "lucide-react";

const MaterialTips = () => {
  const tips = [
    {
      id: "cable-selection",
      category: "Cable Selection",
      title: "Twin & Earth Cable Sizing",
      content: "For domestic installations, 2.5mm² T&E is standard for ring mains (32A MCB), 1.5mm² for lighting circuits (6A MCB), and 6mm² for cooker circuits (32A MCB). Always check voltage drop calculations for longer runs.",
      icon: Cable,
      difficulty: "Intermediate",
      timeToRead: "3 min",
      rating: 5,
      highlights: ["BS 7671 Compliant", "Voltage Drop", "Circuit Protection"]
    },
    {
      id: "earthing-systems",
      category: "Earthing & Bonding",
      title: "Main Equipotential Bonding",
      content: "Use 10mm² earth cable for main bonding to gas and water services within 600mm of entry point. Supplementary bonding with 4mm² may be required in special locations like bathrooms.",
      icon: Shield,
      difficulty: "Advanced",
      timeToRead: "4 min",
      rating: 5,
      highlights: ["Safety Critical", "18th Edition", "Special Locations"]
    },
    {
      id: "consumer-units",
      category: "Protection Devices",
      title: "RCD Selection Guidelines",
      content: "30mA RCDs protect against earth leakage. Use RCBO for individual circuit protection. Type AC for general loads, Type A for electronic equipment. Consider surge protection devices (SPDs) for enhanced protection.",
      icon: Zap,
      difficulty: "Intermediate", 
      timeToRead: "3 min",
      rating: 4,
      highlights: ["Circuit Protection", "Earth Leakage", "Electronic Loads"]
    },
    {
      id: "led-compatibility",
      category: "LED Installation",
      title: "Dimmer Compatibility",
      content: "Not all LED lamps are dimmable. Check lamp specifications and use LED-compatible dimmers (trailing edge). Consider minimum load requirements - some dimmers need 10W minimum load to function properly.",
      icon: Battery,
      difficulty: "Beginner",
      timeToRead: "2 min", 
      rating: 4,
      highlights: ["LED Technology", "Dimming Control", "Load Requirements"]
    },
    {
      id: "fault-protection",
      category: "Fault Protection",
      title: "Discrimination in Protection",
      content: "Ensure proper discrimination between protective devices. Upstream devices should have higher ratings and time delays. Use Type B MCBs for general circuits, Type C for motors, Type D for high inrush loads.",
      icon: AlertTriangle,
      difficulty: "Advanced",
      timeToRead: "4 min",
      rating: 5,
      highlights: ["Selectivity", "MCB Types", "Motor Circuits"]
    },
    {
      id: "ip-ratings",
      category: "Environmental Protection",
      title: "IP Rating Selection",
      content: "IP65 minimum for outdoor use, IP44 for bathroom zones 1&2, IP20 for general indoor use. First digit = solid protection, second = liquid protection. Consider UV resistance for outdoor installations.",
      icon: Shield,
      difficulty: "Beginner",
      timeToRead: "2 min",
      rating: 4,
      highlights: ["Outdoor Use", "Bathroom Zones", "Environmental"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-600/90 text-white border-green-400";
      case "Intermediate": return "bg-orange-600/90 text-white border-orange-400";
      case "Advanced": return "bg-red-600/90 text-white border-red-400";
      default: return "bg-blue-600/90 text-white border-blue-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-white">Professional Material Tips</CardTitle>
              <p className="text-white/80 text-sm">Essential guidance for material selection and installation practices</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <Card key={tip.id} className="bg-elec-card/30 border-white/10 hover:border-blue-500/30 transition-colors">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{tip.title}</h4>
                        <p className="text-xs text-blue-400">{tip.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < tip.rating ? 'fill-elec-yellow text-elec-yellow' : 'text-white/30'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed">{tip.content}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tip.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-white/60">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{tip.timeToRead}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Safety Reminder */}
      <Card className="bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 border-red-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Safety Reminder</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Always ensure materials meet BS 7671 18th Edition requirements. When in doubt, consult the IET Wiring Regulations 
                or seek advice from a qualified electrical engineer. Safety is paramount in all electrical installations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialTips;
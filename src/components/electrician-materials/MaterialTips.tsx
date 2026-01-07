import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Cable,
  AlertTriangle,
  Clock,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";

const MaterialTips = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    {
      id: "cable-selection",
      category: "Cable Selection",
      title: "Twin & Earth Cable Sizing",
      content:
        "For domestic installations, 2.5mm² T&E is standard for ring mains (32A MCB), 1.5mm² for lighting circuits (6A MCB), and 6mm² for cooker circuits (32A MCB). Always check voltage drop calculations for longer runs.",
      icon: Cable,
      difficulty: "Intermediate",
      timeToRead: "3 min",
      rating: 5,
    },
    {
      id: "earthing-systems",
      category: "Earthing & Bonding",
      title: "Main Equipotential Bonding",
      content:
        "Use 10mm² earth cable for main bonding to gas and water services within 600mm of entry point. Supplementary bonding with 4mm² may be required in special locations like bathrooms.",
      icon: Shield,
      difficulty: "Advanced",
      timeToRead: "4 min",
      rating: 5,
    },
    {
      id: "consumer-units",
      category: "Protection Devices",
      title: "RCD Selection Guidelines",
      content:
        "30mA RCDs protect against earth leakage. Use RCBO for individual circuit protection. Type AC for general loads, Type A for electronic equipment. Consider surge protection devices (SPDs) for enhanced protection.",
      icon: Zap,
      difficulty: "Intermediate",
      timeToRead: "3 min",
      rating: 4,
    },
    {
      id: "led-compatibility",
      category: "LED Installation",
      title: "Dimmer Compatibility",
      content:
        "Not all LED lamps are dimmable. Check lamp specifications and use LED-compatible dimmers (trailing edge). Consider minimum load requirements - some dimmers need 10W minimum load to function properly.",
      icon: Lightbulb,
      difficulty: "Beginner",
      timeToRead: "2 min",
      rating: 4,
    },
    {
      id: "fault-protection",
      category: "Fault Protection",
      title: "Discrimination in Protection",
      content:
        "Ensure proper discrimination between protective devices. Upstream devices should have higher ratings and time delays. Use Type B MCBs for general circuits, Type C for motors, Type D for high inrush loads.",
      icon: AlertTriangle,
      difficulty: "Advanced",
      timeToRead: "4 min",
      rating: 5,
    },
    {
      id: "ip-ratings",
      category: "Environmental Protection",
      title: "IP Rating Selection",
      content:
        "IP65 minimum for outdoor use, IP44 for bathroom zones 1&2, IP20 for general indoor use. First digit = solid protection, second = liquid protection. Consider UV resistance for outdoor installations.",
      icon: Shield,
      difficulty: "Beginner",
      timeToRead: "2 min",
      rating: 4,
    },
  ];

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Advanced":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl
                   bg-gradient-to-r from-blue-500/10 to-indigo-500/5
                   border border-blue-500/20 hover:border-blue-500/40
                   transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Professional Material Tips
              <Lightbulb className="h-4 w-4 text-amber-400" />
            </h2>
            <p className="text-sm text-muted-foreground">
              Essential guidance for material selection and installation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-400 border-blue-500/30"
          >
            {tips.length} tips
          </Badge>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          )}
        </div>
      </button>

      {/* Collapsed Preview */}
      {!isExpanded && (
        <div className="flex flex-wrap gap-2 px-2">
          {tips.slice(0, 3).map((tip) => (
            <Badge
              key={tip.id}
              variant="outline"
              className="bg-white/5 border-white/10 text-xs text-muted-foreground"
            >
              <tip.icon className="h-3 w-3 mr-1 text-blue-400" />
              {tip.title}
            </Badge>
          ))}
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip) => {
              const IconComponent = tip.icon;
              return (
                <div
                  key={tip.id}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10
                             hover:border-blue-500/30 hover:bg-white/[0.07]
                             transition-all duration-300 space-y-3"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <IconComponent className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {tip.title}
                        </h4>
                        <p className="text-xs text-blue-400">{tip.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < tip.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.content}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <Badge
                      variant="outline"
                      className={getDifficultyStyles(tip.difficulty)}
                    >
                      {tip.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {tip.timeToRead}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety Reminder */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1">
                  Safety Reminder
                </h5>
                <p className="text-sm text-muted-foreground">
                  Always ensure materials meet BS 7671 18th Edition requirements.
                  When in doubt, consult the IET Wiring Regulations or seek advice
                  from a qualified electrical engineer.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MaterialTips;

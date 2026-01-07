import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Shield,
  Wrench,
  Clock,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";

const ProfessionalTips = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    {
      icon: Wrench,
      category: "Tool Care",
      title: "Keep Your Tools Sharp",
      content:
        "Regularly sharpen wire strippers and cutters. Dull tools require more force and can damage cables or cause injury.",
      difficulty: "Basic",
      timeToRead: "2 min",
      rating: 4.8,
    },
    {
      icon: Shield,
      category: "Safety",
      title: "Insulated Tools for Live Work",
      content:
        "Always use VDE-tested insulated tools when working on live circuits. Standard tools can conduct electricity and cause serious injury.",
      difficulty: "Critical",
      timeToRead: "3 min",
      rating: 5.0,
    },
    {
      icon: Zap,
      category: "Technique",
      title: "Proper Torque Settings",
      content:
        "Use a torque screwdriver for terminals. Over-tightening can damage connections, while under-tightening creates loose connections and fire hazards.",
      difficulty: "Intermediate",
      timeToRead: "4 min",
      rating: 4.9,
    },
    {
      icon: Clock,
      category: "Efficiency",
      title: "Tool Organisation",
      content:
        "Keep frequently used tools in easily accessible pockets. Arrange tools by job type rather than size for faster access during installations.",
      difficulty: "Basic",
      timeToRead: "2 min",
      rating: 4.6,
    },
    {
      icon: Lightbulb,
      category: "Pro Tip",
      title: "Quality vs. Cost",
      content:
        "Invest in quality hand tools that you'll use daily. Cheap screwdrivers and pliers will fail when you need them most and can damage expensive components.",
      difficulty: "Basic",
      timeToRead: "3 min",
      rating: 4.7,
    },
    {
      icon: Shield,
      category: "Compliance",
      title: "BS7671 Requirements",
      content:
        "Ensure your testing equipment meets current BS7671 standards. Non-compliant testers can give false readings and put you at legal risk.",
      difficulty: "Important",
      timeToRead: "5 min",
      rating: 5.0,
    },
  ];

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Critical":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "Important":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      case "Intermediate":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Basic":
        return "bg-green-500/10 text-green-400 border-green-500/30";
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
                   bg-gradient-to-r from-blue-500/10 to-cyan-500/5
                   border border-blue-500/20 hover:border-blue-500/40
                   transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Professional Tips
              <Lightbulb className="h-4 w-4 text-amber-400" />
            </h2>
            <p className="text-sm text-muted-foreground">
              Expert advice from experienced electricians
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
          {tips.slice(0, 3).map((tip, i) => (
            <Badge
              key={i}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl bg-white/5 border border-white/10
                           hover:border-blue-500/30 hover:bg-white/[0.07]
                           transition-all duration-300 space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/10">
                      <tip.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-xs text-blue-400 font-medium">
                      {tip.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-muted-foreground">
                      {tip.rating}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-white leading-tight">
                  {tip.title}
                </h4>

                {/* Content */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
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
            ))}
          </div>

          {/* Safety Reminder */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 shrink-0">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h5 className="font-semibold text-white mb-1">
                  Safety Reminder
                </h5>
                <p className="text-sm text-muted-foreground">
                  Always follow proper safety procedures and consult BS7671
                  regulations. When in doubt, consult with a qualified
                  supervisor or seek additional training.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalTips;

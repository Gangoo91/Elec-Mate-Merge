
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb, Clock, Brain, Target, RotateCcw, CheckCircle,
  Sparkles, Calendar, Coffee, Headphones, BookOpen, Zap
} from "lucide-react";

const StudyTipsCard = () => {
  const tips = [
    {
      icon: Clock,
      title: "Little and Often",
      description: "Study for 10-15 minutes daily rather than long cramming sessions. Consistency beats intensity.",
      color: "blue",
      effectiveness: "Very High"
    },
    {
      icon: Brain,
      title: "Use Spaced Repetition",
      description: "Review difficult cards more frequently to improve retention. This is scientifically proven to boost memory.",
      color: "purple",
      effectiveness: "Very High"
    },
    {
      icon: Target,
      title: "Focus on Weak Areas",
      description: "Spend extra time on cards you find challenging. Mastering difficult content accelerates overall learning.",
      color: "red",
      effectiveness: "High"
    },
    {
      icon: RotateCcw,
      title: "Mix Up Your Study",
      description: "Alternate between different flashcard sets for better learning. Interleaving topics improves recall.",
      color: "green",
      effectiveness: "High"
    },
    {
      icon: CheckCircle,
      title: "Active Recall",
      description: "Try to recall the answer before flipping the card. This strengthens neural pathways.",
      color: "yellow",
      effectiveness: "Very High"
    },
    {
      icon: Coffee,
      title: "Take Strategic Breaks",
      description: "Use the Pomodoro technique: 25 mins study, 5 mins break. Your brain consolidates learning during rest.",
      color: "orange",
      effectiveness: "Medium"
    },
    {
      icon: Headphones,
      title: "Minimize Distractions",
      description: "Find a quiet space and put your phone on silent. Deep focus dramatically improves retention.",
      color: "blue",
      effectiveness: "High"
    },
    {
      icon: BookOpen,
      title: "Connect to Real Work",
      description: "Link flashcard content to your on-site experience. Practical application cements theoretical knowledge.",
      color: "green",
      effectiveness: "Very High"
    },
    {
      icon: Calendar,
      title: "Build a Streak",
      description: "Study at the same time each day to build a habit. Routines reduce the mental effort of getting started.",
      color: "purple",
      effectiveness: "Medium"
    }
  ];

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', iconBg: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', iconBg: 'from-green-500/20 to-green-500/5', border: 'border-green-500/30' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', iconBg: 'from-elec-yellow/20 to-elec-yellow/5', border: 'border-elec-yellow/30' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', iconBg: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', iconBg: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30' },
      red: { bg: 'bg-red-500/10', text: 'text-red-400', iconBg: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30' }
    };
    return configs[color] || configs.blue;
  };

  const getEffectivenessConfig = (effectiveness: string) => {
    switch (effectiveness) {
      case 'Very High':
        return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case 'High':
        return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 'Medium':
        return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      default:
        return { bg: 'bg-white/5', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <span className="text-white text-xl">Study Tips for </span>
            <span className="text-elec-yellow text-xl">Better Results</span>
            <p className="text-sm text-white/60 font-normal mt-1">
              Proven techniques to maximize your learning
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <div className="text-2xl font-bold text-elec-yellow">9</div>
            <div className="text-xs text-white/60">Pro Tips</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <div className="text-2xl font-bold text-green-400">5</div>
            <div className="text-xs text-white/60">Very High</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <div className="flex items-center justify-center gap-1">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-xs text-white/60">Evidence-based</div>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => {
            const colorConfig = getColorConfig(tip.color);
            const effectivenessConfig = getEffectivenessConfig(tip.effectiveness);
            const TipIcon = tip.icon;
            return (
              <div
                key={index}
                className="group p-4 rounded-xl bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border} flex-shrink-0 transition-all duration-300 group-hover:shadow-lg`}>
                    <TipIcon className={`h-5 w-5 ${colorConfig.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
                      {tip.title}
                    </h4>
                    <Badge className={`${effectivenessConfig.bg} ${effectivenessConfig.text} border ${effectivenessConfig.border} text-xs`}>
                      {tip.effectiveness}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{tip.description}</p>
              </div>
            );
          })}
        </div>

        {/* Pro Tip Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 flex-shrink-0">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-1">The Science of Learning</h4>
              <p className="text-sm text-white/80">
                Research shows that <span className="font-medium text-purple-300">active recall</span> combined with{" "}
                <span className="font-medium text-purple-300">spaced repetition</span> is the most effective way to learn.
                This is exactly how our flashcard system is designed - you're already using proven techniques!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTipsCard;

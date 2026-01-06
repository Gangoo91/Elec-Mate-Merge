
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Zap,
  Brain,
  Target,
  Bell,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import MoodTracker from "@/components/mental-health/interactive/MoodTracker";
import SelfCareReminders from "@/components/mental-health/interactive/SelfCareReminders";
import StressManagementTools from "@/components/mental-health/interactive/StressManagementTools";
import GoalSettingTracker from "@/components/mental-health/interactive/GoalSettingTracker";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

const InteractiveToolsTab = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("mood");
  const { moodHistory } = useMentalHealth();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Check if user has logged mood today
  const today = new Date().toISOString().split('T')[0];
  const hasMoodToday = moodHistory.some(entry => entry.date === today);

  const sections = [
    {
      id: "mood",
      title: "Mood Tracker",
      description: hasMoodToday ? "Today's mood logged" : "Log how you're feeling",
      icon: Heart,
      color: "pink",
      badge: hasMoodToday ? null : "Check in",
      component: <MoodTracker />
    },
    {
      id: "stress",
      title: "Stress Relief",
      description: "Breathing & relaxation exercises",
      icon: Brain,
      color: "blue",
      badge: "3 exercises",
      component: <StressManagementTools />
    },
    {
      id: "goals",
      title: "Goal Setting",
      description: "Track your wellbeing goals",
      icon: Target,
      color: "green",
      badge: null,
      component: <GoalSettingTracker />
    },
    {
      id: "selfcare",
      title: "Self-Care Reminders",
      description: "Daily wellness prompts",
      icon: Bell,
      color: "amber",
      badge: null,
      component: <SelfCareReminders />
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; icon: string; iconBg: string }> = {
      pink: {
        border: "border-pink-500/20",
        bg: "from-pink-500/10 to-transparent",
        icon: "text-pink-400",
        iconBg: "bg-pink-500/20"
      },
      blue: {
        border: "border-blue-500/20",
        bg: "from-blue-500/10 to-transparent",
        icon: "text-blue-400",
        iconBg: "bg-blue-500/20"
      },
      green: {
        border: "border-green-500/20",
        bg: "from-green-500/10 to-transparent",
        icon: "text-green-400",
        iconBg: "bg-green-500/20"
      },
      amber: {
        border: "border-amber-500/20",
        bg: "from-amber-500/10 to-transparent",
        icon: "text-amber-400",
        iconBg: "bg-amber-500/20"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 mb-3">
          <Zap className="h-6 w-6 text-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Interactive Tools</h2>
        <p className="text-sm text-white/80">
          Track, manage, and improve your wellbeing
        </p>
      </div>

      {/* Quick Stats */}
      {moodHistory.length > 0 && (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">{moodHistory.length}</div>
                <div className="text-xs text-white/80">Days Tracked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {(moodHistory.reduce((sum, e) => sum + e.mood, 0) / moodHistory.length).toFixed(1)}
                </div>
                <div className="text-xs text-white/80">Avg Mood</div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  {hasMoodToday ? (
                    <span className="text-green-400 text-lg">
                      {['', '😢', '😔', '😐', '🙂', '😊'][moodHistory.find(e => e.date === today)?.mood || 0]}
                    </span>
                  ) : (
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  )}
                </div>
                <div className="text-xs text-white/80">
                  {hasMoodToday ? "Today" : "Log today"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expandable Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const colors = getColorClasses(section.color);
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <Card key={section.id} className={`${colors.border} overflow-hidden`}>
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${colors.bg}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{section.title}</h3>
                      {section.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.iconBg} ${colors.icon}`}>
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/80">{section.description}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-white/80" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white/80" />
                )}
              </button>

              {isExpanded && (
                <CardContent className="p-4 pt-0">
                  {section.component}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Tips Card */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-purple-400 text-sm mb-1">Pro Tip</h4>
              <p className="text-sm text-white/80">
                Tracking your mood daily helps identify patterns. Even on tough days,
                a quick check-in takes less than 30 seconds and provides valuable insights over time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;

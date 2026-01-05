
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  BookOpen,
  Zap,
  Users,
  Shield,
  Phone,
  Brain,
  Wind,
  BookHeart,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  MessageCircle
} from "lucide-react";
import ResourcesLibraryTab from "@/components/mental-health/tabs/ResourcesLibraryTab";
import InteractiveToolsTab from "@/components/mental-health/tabs/InteractiveToolsTab";
import SupportNetworkTab from "@/components/mental-health/tabs/SupportNetworkTab";
import CrisisResourcesTab from "@/components/mental-health/tabs/CrisisResourcesTab";
import MentalHealthMate from "@/components/mental-health/MentalHealthMate";
import { MentalHealthProvider } from "@/contexts/MentalHealthContext";
import QuickMoodCheck from "@/components/mental-health/QuickMoodCheck";
import BreathingExercise from "@/components/mental-health/BreathingExercise";
import GratitudeJournal from "@/components/mental-health/GratitudeJournal";
import DailyAffirmation from "@/components/mental-health/DailyAffirmation";

const ElectricianMentalHealth = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const quickActions = [
    {
      id: "breathing",
      title: "Calm Breathing",
      description: "2-min guided exercise",
      icon: Wind,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      id: "mood",
      title: "Check In",
      description: "How are you feeling?",
      icon: Heart,
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      iconColor: "text-pink-400"
    },
    {
      id: "gratitude",
      title: "Gratitude",
      description: "What's good today?",
      icon: Sparkles,
      color: "from-amber-500/20 to-yellow-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400"
    },
    {
      id: "talk",
      title: "Talk to Someone",
      description: "AI or peer support",
      icon: MessageCircle,
      color: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    }
  ];

  const mainSections = [
    {
      id: "tools",
      title: "Interactive Tools",
      description: "Mood tracking, stress relief, goal setting",
      icon: Zap,
      color: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400"
    },
    {
      id: "resources",
      title: "Resources Library",
      description: "Guides, videos, and self-help materials",
      icon: BookOpen,
      color: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400"
    },
    {
      id: "support",
      title: "Support Network",
      description: "Connect with peers and professionals",
      icon: Users,
      color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400"
    },
    {
      id: "crisis",
      title: "Crisis Support",
      description: "24/7 helplines and emergency resources",
      icon: Shield,
      color: "bg-gradient-to-br from-red-500/10 to-rose-500/10",
      borderColor: "border-red-500/20",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400"
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "breathing":
        return <BreathingExercise onClose={() => setActiveSection(null)} />;
      case "mood":
        return <QuickMoodCheck onClose={() => setActiveSection(null)} />;
      case "gratitude":
        return <GratitudeJournal onClose={() => setActiveSection(null)} />;
      case "talk":
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="mb-2"
            >
              ← Back
            </Button>
            <MentalHealthMate />
          </div>
        );
      case "tools":
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="mb-2"
            >
              ← Back to Hub
            </Button>
            <InteractiveToolsTab />
          </div>
        );
      case "resources":
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="mb-2"
            >
              ← Back to Hub
            </Button>
            <ResourcesLibraryTab />
          </div>
        );
      case "support":
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="mb-2"
            >
              ← Back to Hub
            </Button>
            <SupportNetworkTab />
          </div>
        );
      case "crisis":
        return (
          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setActiveSection(null)}
              className="mb-2"
            >
              ← Back to Hub
            </Button>
            <CrisisResourcesTab />
          </div>
        );
      default:
        return null;
    }
  };

  if (activeSection) {
    return (
      <MentalHealthProvider>
        <div className="max-w-4xl mx-auto px-4 pb-8 animate-fade-in">
          {renderActiveSection()}
        </div>
      </MentalHealthProvider>
    );
  }

  return (
    <MentalHealthProvider>
      <div className="max-w-4xl mx-auto px-4 pb-8 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center pt-2 pb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 mb-4">
            <Heart className="h-8 w-8 text-pink-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Mental Health Hub
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Your wellbeing matters. Take a moment for yourself.
          </p>
          <div className="mt-4">
            <BackButton customUrl="/electrician" label="Back to Dashboard" />
          </div>
        </div>

        {/* Emergency Banner - Always Visible */}
        <Card className="border-red-500/40 bg-gradient-to-r from-red-500/10 to-red-600/5 shadow-lg shadow-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Phone className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-red-400 text-sm sm:text-base">
                  Need immediate help?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Call <a href="tel:116123" className="font-bold text-red-400 hover:underline">116 123</a> (Samaritans, free 24/7) or text SHOUT to <span className="font-bold">85258</span>
                </p>
              </div>
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white flex-shrink-0"
                onClick={() => setActiveSection("crisis")}
              >
                <Shield className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Help</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Affirmation */}
        <DailyAffirmation />

        {/* Quick Actions - Mobile Optimized Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setActiveSection(action.id)}
                className={`p-4 rounded-xl border ${action.borderColor} bg-gradient-to-br ${action.color}
                  hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary`}
              >
                <action.icon className={`h-8 w-8 ${action.iconColor} mb-2`} />
                <h3 className="font-semibold text-sm text-white">{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Sections */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            Explore
          </h2>
          <div className="space-y-3">
            {mainSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full p-4 rounded-xl border ${section.borderColor} ${section.color}
                  hover:scale-[1.01] active:scale-[0.99] transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                    <section.icon className={`h-6 w-6 ${section.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-white text-base">{section.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{section.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Wellbeing Tips */}
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <BookHeart className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-400 text-sm mb-1">Daily Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Taking just 5 minutes for yourself each day can significantly reduce stress.
                  Your mental health is just as important as physical safety on site.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry-Specific Support */}
        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-400 text-sm mb-1">For Electrical Professionals</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Construction and electrical workers face unique pressures. The <strong>Electrical Industries Charity</strong> and <strong>Mates in Mind</strong> offer industry-specific support.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:08003032200"
                    className="inline-flex items-center text-xs bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full hover:bg-amber-500/30 transition-colors"
                  >
                    <Phone className="h-3 w-3 mr-1.5" />
                    0800 303 2200
                  </a>
                  <a
                    href="https://www.electricalcharity.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full hover:bg-amber-500/30 transition-colors"
                  >
                    electricalcharity.org
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MentalHealthProvider>
  );
};

export default ElectricianMentalHealth;

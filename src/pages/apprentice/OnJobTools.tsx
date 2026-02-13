import { SmartBackButton } from "@/components/ui/smart-back-button";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
  HardHat, MessageSquare, HelpCircle, BookOpen, Wrench, Zap, Calculator,
  ClipboardCheck, Lightbulb, Shield, Sparkles,
  AlertTriangle, FileCheck, GraduationCap, Flame
} from "lucide-react";

const dailyTips = [
  {
    tip: "Always prove dead with a voltage indicator, not a multimeter alone. A multimeter can give false readings on inductively coupled circuits.",
    category: "Safe Isolation",
  },
  {
    tip: "Label every circuit as you go — future you (and the next sparky) will thank you. It's a BS7671 requirement too.",
    category: "Best Practice",
  },
  {
    tip: "Before drilling into any wall, use a cable detector AND check the other side. Services can run in unexpected places.",
    category: "Site Safety",
  },
  {
    tip: "Take a photo of the distribution board before you start any work. It's your evidence if anything is disputed later.",
    category: "Documentation",
  },
  {
    tip: "GN3 voltage indicator — prove, test, prove. Never skip the second prove. Your life depends on it.",
    category: "Safe Isolation",
  },
  {
    tip: "Ring circuit continuity: R1+R2 at each point should be roughly equal. If one spikes, you've found a break or spur.",
    category: "Testing",
  },
  {
    tip: "On site, if you're not sure — stop and ask. No one ever got sacked for checking, but plenty have been hurt for guessing.",
    category: "Professionalism",
  },
];

const OnJobTools = () => {
  const todaysTip = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return dailyTips[dayOfYear % dailyTips.length];
  }, []);

  const quickAccessTools = [
    { title: "Calculators", icon: Calculator, link: "/apprentice/on-job-tools/calculations", color: "green" },
    { title: "Flashcards", icon: Lightbulb, link: "/apprentice/on-job-tools/flashcards", color: "orange" },
    { title: "Site Assessment", icon: ClipboardCheck, link: "/apprentice/on-job-tools/assessment", color: "blue" },
  ];

  const safetyTools = [
    {
      id: 4,
      title: "Safety Case Studies",
      icon: HardHat,
      description: "Learn from real electrical incidents — make decisions in realistic scenarios and see consequences",
      link: "/apprentice/on-job-tools/safety-cases",
      badge: "Interactive",
      color: "red"
    },
    {
      id: 3,
      title: "Site Assessment",
      icon: ClipboardCheck,
      description: "Pre-job safety checklists, site condition assessments, risk analysis templates & installation checks",
      link: "/apprentice/on-job-tools/assessment",
      badge: "15+ Checklists",
      color: "green"
    },
    {
      id: 8,
      title: "BS7671 Run-Through",
      icon: Zap,
      description: "Complete 18th Edition inspection & testing procedures with step-by-step documentation guides",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Full Guide"
    },
  ];

  const guideTools = [
    {
      id: 1,
      title: "Tools & Materials Guide",
      icon: Wrench,
      description: "Complete guide to professional electrician tools — from hand tools to test equipment, with UK supplier recommendations",
      link: "/apprentice/on-job-tools/tools-guide",
      badge: "Essential",
      color: "yellow"
    },
    {
      id: 2,
      title: "Installation Guides",
      icon: BookOpen,
      description: "Step-by-step guides for domestic, commercial, industrial & outdoor installations with BS7671 compliance",
      link: "/apprentice/on-job-tools/electrical-installation-guides",
      badge: "4 Sectors",
      color: "blue"
    },
    {
      id: 6,
      title: "Ask a Supervisor",
      icon: HelpCircle,
      description: "Knowledge bank with common site questions, when to ask for help & professional communication tips",
      link: "/apprentice/on-job-tools/supervisor-knowledge",
      badge: "FAQ Bank",
      color: "purple"
    },
  ];

  const practiceTools = [
    {
      id: 7,
      title: "Flashcards",
      icon: Lightbulb,
      description: "Quick revision for cable colours, BS7671 regulations, EICR codes, safe isolation & fault finding",
      link: "/apprentice/on-job-tools/flashcards",
      badge: "100+ Cards",
      color: "orange"
    },
    {
      id: 9,
      title: "Calculators",
      icon: Calculator,
      description: "On-site tools for cable sizing, volt drop, maximum demand, protective device selection & more",
      link: "/apprentice/on-job-tools/calculations",
      badge: "20+ Tools",
      color: "green"
    },
    {
      id: 5,
      title: "Workplace Culture",
      icon: MessageSquare,
      description: "Master site communication, UK trade culture, regional terminology & professional relationships",
      link: "/apprentice/on-job-tools/workplace-culture",
      badge: "6 Modules",
      color: "blue"
    },
  ];

  const getQuickAccessColor = (color: string) => {
    switch (color) {
      case "green": return { bg: "bg-green-500/15 hover:bg-green-500/25", text: "text-green-400", icon: "text-green-400", ring: "ring-green-500/30" };
      case "orange": return { bg: "bg-orange-500/15 hover:bg-orange-500/25", text: "text-orange-400", icon: "text-orange-400", ring: "ring-orange-500/30" };
      case "blue": return { bg: "bg-blue-500/15 hover:bg-blue-500/25", text: "text-blue-400", icon: "text-blue-400", ring: "ring-blue-500/30" };
      default: return { bg: "bg-elec-yellow/15 hover:bg-elec-yellow/25", text: "text-elec-yellow", icon: "text-elec-yellow", ring: "ring-elec-yellow/30" };
    }
  };

  return (
    <div className="bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-elec-yellow/20 p-5 sm:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Sparkles className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                  On the Job <span className="text-elec-yellow">Tools</span>
                </h1>
              </div>
              <p className="hidden sm:block text-white max-w-xl text-sm">
                Everything you need on site — from safety checklists to quick-reference guides.
                Built by electricians, for apprentices.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Access Row */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white px-1">
            Quick Access
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {quickAccessTools.map((tool) => {
              const colors = getQuickAccessColor(tool.color);
              return (
                <Link
                  key={tool.title}
                  to={tool.link}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3.5 sm:p-4 rounded-xl ring-1 transition-all duration-200 touch-manipulation",
                    "active:scale-[0.96] active:duration-100",
                    colors.bg,
                    colors.ring
                  )}
                >
                  <tool.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", colors.icon)} />
                  <span className={cn("text-xs sm:text-sm font-medium", colors.text)}>
                    {tool.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Safety Banner */}
        <Card className="border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                <Shield className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-300 text-sm mb-0.5">Safety First</h3>
                <p className="text-[13px] text-white leading-relaxed">
                  These tools help you prepare properly, but never substitute them for training or supervision.
                  When in doubt, <span className="font-medium text-amber-200">stop and ask</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tip of the Day */}
        <Card className="border-elec-yellow/15 bg-gradient-to-br from-elec-yellow/[0.06] via-transparent to-transparent overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/15 flex-shrink-0">
                <Flame className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-elec-yellow text-sm">Tip of the Day</h3>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white bg-white/[0.08] px-2 py-0.5 rounded-full">
                    {todaysTip.category}
                  </span>
                </div>
                <p className="text-[13px] text-white leading-relaxed">
                  {todaysTip.tip}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category: Safety & Compliance */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 px-1">
            <div className="p-1.5 rounded-lg bg-red-500/15">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-white">
              Safety & Compliance
            </h2>
          </div>
          <OnTheJobToolsBox tools={safetyTools} />
        </div>

        {/* Category: Guides & Reference */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 px-1">
            <div className="p-1.5 rounded-lg bg-blue-500/15">
              <FileCheck className="h-4 w-4 text-blue-400" />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-white">
              Guides & Reference
            </h2>
          </div>
          <OnTheJobToolsBox tools={guideTools} />
        </div>

        {/* Category: Practice & Quick Ref */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 px-1">
            <div className="p-1.5 rounded-lg bg-orange-500/15">
              <GraduationCap className="h-4 w-4 text-orange-400" />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-white">
              Practice & Quick Reference
            </h2>
          </div>
          <OnTheJobToolsBox tools={practiceTools} />
        </div>

      </div>
    </div>
  );
};

export default OnJobTools;

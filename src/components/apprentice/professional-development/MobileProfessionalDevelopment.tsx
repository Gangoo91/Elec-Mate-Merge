
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Target,
  Lightbulb,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Briefcase,
  PoundSterling,
  Zap
} from "lucide-react";
import CareerPathwaysTab from "./CareerPathwaysTab";
import CertificationsTab from "./CertificationsTab";
import ContinuingEducationTab from "./ContinuingEducationTab";
import IndustryNetworkingTab from "./IndustryNetworkingTab";
import ProfessionalSkillsTab from "./ProfessionalSkillsTab";

const MobileProfessionalDevelopment = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "pathways",
      title: "Career Paths",
      description: "Explore different career trajectories in the electrical industry",
      icon: TrendingUp,
      color: "blue",
      stats: { label: "12+ Paths", value: "£25k-80k+" }
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Required qualifications and professional certifications",
      icon: Award,
      color: "yellow",
      stats: { label: "Essential", value: "AM2, 18th Ed" }
    },
    {
      id: "education",
      title: "Education",
      description: "Further education opportunities and funded courses",
      icon: BookOpen,
      color: "green",
      stats: { label: "HNC/HND", value: "£0-£9k" }
    },
    {
      id: "skills",
      title: "Skills",
      description: "Professional skills development and training",
      icon: Lightbulb,
      color: "purple",
      stats: { label: "6 Categories", value: "Soft Skills" }
    },
    {
      id: "networking",
      title: "Networking",
      description: "Industry connections and professional relationships",
      icon: Users,
      color: "pink",
      stats: { label: "IET, NICEIC", value: "Events" }
    }
  ];

  const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string; badge: string }> = {
    blue: {
      border: "border-blue-500/30 hover:border-blue-500/50",
      bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
      icon: "text-blue-400",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    },
    yellow: {
      border: "border-elec-yellow/30 hover:border-elec-yellow/50",
      bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
      icon: "text-elec-yellow",
      iconBg: "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30",
      badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
    },
    green: {
      border: "border-green-500/30 hover:border-green-500/50",
      bg: "bg-gradient-to-br from-white/5 to-green-950/20",
      icon: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
      badge: "bg-green-500/10 text-green-400 border-green-500/30"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/50",
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      icon: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    pink: {
      border: "border-pink-500/30 hover:border-pink-500/50",
      bg: "bg-gradient-to-br from-white/5 to-pink-950/20",
      icon: "text-pink-400",
      iconBg: "bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/30",
      badge: "bg-pink-500/10 text-pink-400 border-pink-500/30"
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return <CareerPathwaysTab />;
      case "certifications":
        return <CertificationsTab />;
      case "education":
        return <ContinuingEducationTab />;
      case "skills":
        return <ProfessionalSkillsTab />;
      case "networking":
        return <IndustryNetworkingTab />;
      default:
        return null;
    }
  };

  if (activeSection) {
    const currentSection = sections.find(s => s.id === activeSection);
    const colors = currentSection ? colorMap[currentSection.color] : colorMap.blue;

    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection(null)}
            className="h-11 flex items-center gap-2 border-white/20 hover:border-elec-yellow/50 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1 flex items-center gap-2">
            {currentSection && (
              <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                <currentSection.icon className={`h-5 w-5 ${colors.icon}`} />
              </div>
            )}
            <h2 className="text-lg font-semibold text-white">
              {currentSection?.title}
            </h2>
          </div>
        </div>
        {renderSectionContent()}
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero Welcome Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <GraduationCap className="h-6 w-6 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs font-medium text-elec-yellow uppercase tracking-wider">2026 UK Industry</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Professional Development Hub
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Build your career with certifications, skills, and industry connections.
              The UK needs <span className="text-elec-yellow font-medium">18,000+ electricians</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Industry Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-white/5 to-green-950/20 border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <PoundSterling className="h-4 w-4 text-green-400" />
              <span className="text-xs text-white/70">Avg Salary</span>
            </div>
            <div className="text-xl font-bold text-green-400">£38,500</div>
            <div className="text-[10px] text-white/60">Up 8% from 2025</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-blue-950/20 border-blue-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-white/70">EV Growth</span>
            </div>
            <div className="text-xl font-bold text-blue-400">+45%</div>
            <div className="text-[10px] text-white/60">Specialist demand</div>
          </CardContent>
        </Card>
      </div>

      {/* Section Cards */}
      <div className="space-y-3">
        {sections.map((section) => {
          const colors = colorMap[section.color];
          return (
            <Card
              key={section.id}
              className={`${colors.bg} ${colors.border} cursor-pointer transition-all overflow-hidden relative group`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                      <section.icon className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-white">
                          {section.title}
                        </h3>
                        <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                          {section.stats.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 line-clamp-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/50 flex-shrink-0 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Career Journey Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="pb-2 relative">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Target className="h-4 w-4 text-elec-yellow" />
            </div>
            Your Development Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 relative">
          <p className="text-sm text-white/70 mb-4">
            Professional development is a continuous process. Start with core certifications,
            then specialise based on market demand and your interests.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30 text-xs">
              <Award className="h-3 w-3 mr-1" />
              18th Edition
            </Badge>
            <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs">
              <Briefcase className="h-3 w-3 mr-1" />
              AM2 Assessment
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              EV Charging
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Lightbulb className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-purple-400 mb-1">Pro Tip</p>
            <p className="text-sm text-white/70">
              Focus on high-growth areas like EV charging (+45%), battery storage (+42%),
              and heat pumps (+38%) to maximise your earning potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProfessionalDevelopment;

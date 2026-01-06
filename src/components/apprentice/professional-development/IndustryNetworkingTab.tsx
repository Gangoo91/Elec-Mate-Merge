
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  MapPin,
  Globe,
  Building,
  Award,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Linkedin,
  ExternalLink,
  CheckCircle,
  Lightbulb,
  Target,
  Star
} from "lucide-react";

const IndustryNetworkingTab = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("bodies");

  const professionalBodies = [
    {
      name: "IET",
      fullName: "Institution of Engineering and Technology",
      type: "Professional Institution",
      description: "The world's largest engineering institution for electrical professionals.",
      benefits: ["Professional registration (EngTech, IEng, CEng)", "Technical resources & standards", "Career guidance & mentoring", "Global network of 150k+ members"],
      membership: "£200-400/year",
      website: "theiet.org",
      color: "blue",
      recommended: true
    },
    {
      name: "ECA",
      fullName: "Electrical Contractors' Association",
      type: "Trade Association",
      description: "UK's leading trade association for electrical contractors.",
      benefits: ["Industry representation", "Business & legal support", "Training courses", "Regional networking events"],
      membership: "£300-800/year",
      website: "eca.co.uk",
      color: "yellow"
    },
    {
      name: "NICEIC",
      fullName: "National Inspection Council for Electrical Installation Contracting",
      type: "Certification Body",
      description: "Leading certification body for electrical contractors.",
      benefits: ["Industry recognition", "Customer trust & credibility", "Technical support helpline", "Business development tools"],
      membership: "£500-1500/year",
      website: "niceic.com",
      color: "green",
      recommended: true
    },
    {
      name: "NAPIT",
      fullName: "National Association of Professional Inspectors and Testers",
      type: "Certification Body",
      description: "Competent person scheme operator for electrical work.",
      benefits: ["Certification schemes", "Training courses", "Technical helpline", "Member networking"],
      membership: "£400-1200/year",
      website: "napit.org.uk",
      color: "purple"
    },
    {
      name: "REA",
      fullName: "Renewable Energy Association",
      type: "Trade Association",
      description: "UK's largest trade association for renewable energy.",
      benefits: ["Green energy insights", "Policy & regulation updates", "Business opportunities", "Sustainability focus"],
      membership: "£500-2000/year",
      website: "r-e-a.net",
      color: "emerald"
    }
  ];

  const keyEvents = [
    {
      name: "Electrical Industry Awards",
      type: "Annual Awards",
      frequency: "Annual",
      location: "London",
      cost: "£100-500",
      description: "Premier awards celebrating excellence in the electrical industry.",
      color: "yellow"
    },
    {
      name: "IET Local Networks",
      type: "Regional Meetings",
      frequency: "Monthly",
      location: "UK-wide",
      cost: "Free for members",
      description: "Regular local meetings and technical presentations.",
      color: "blue"
    },
    {
      name: "ElecTech Live",
      type: "Trade Exhibition",
      frequency: "Annual",
      location: "Various",
      cost: "£200-800",
      description: "Technology showcase and learning event for electrical professionals.",
      color: "purple"
    },
    {
      name: "Renewable Energy World",
      type: "Industry Conference",
      frequency: "Annual",
      location: "Birmingham",
      cost: "£500-1500",
      description: "Leading renewable energy conference and exhibition.",
      color: "green"
    }
  ];

  const onlinePlatforms = [
    {
      name: "LinkedIn",
      type: "Professional Network",
      members: "150k+ UK electricians",
      cost: "Free",
      tip: "Join groups like 'UK Electrical Engineers' and 'Electrical Contractors Network'",
      color: "blue"
    },
    {
      name: "ElectriciansForums.net",
      type: "Industry Forum",
      members: "100k+ members",
      cost: "Free",
      tip: "Great for technical advice and peer support",
      color: "green"
    },
    {
      name: "IET Communities",
      type: "Professional Platform",
      members: "20k+ members",
      cost: "IET membership required",
      tip: "Expert knowledge sharing and standards discussions",
      color: "purple"
    },
    {
      name: "Facebook Trade Groups",
      type: "Social Network",
      members: "Variable",
      cost: "Free",
      tip: "Search for regional groups like 'London Sparkies' for local connections",
      color: "cyan"
    }
  ];

  const linkedInTips = [
    {
      tip: "Professional Headline",
      description: "Use a specific headline like 'NICEIC Registered Electrician | EV Charging Specialist | BS7671' rather than just 'Electrician'",
      impact: "3x more profile views"
    },
    {
      tip: "Complete Profile",
      description: "Add certifications, skills, and a professional photo. Include keywords like '18th Edition', 'Part P', 'EV Installation'",
      impact: "40x more opportunities"
    },
    {
      tip: "Share Work Photos",
      description: "Post before/after photos of complex installations. Technical posts get high engagement in trade groups",
      impact: "10x more connections"
    },
    {
      tip: "Engage Daily",
      description: "Like and comment on industry posts for 10 mins daily. This builds visibility without creating content",
      impact: "5x network growth"
    }
  ];

  const mentorshipPrograms = [
    {
      program: "IET Mentor Scheme",
      provider: "IET",
      duration: "12 months",
      cost: "Free for members",
      description: "Structured mentoring for professional registration",
      color: "blue"
    },
    {
      program: "ECA Apprentice Mentoring",
      provider: "ECA",
      duration: "Flexible",
      cost: "Free",
      description: "Support for apprentices and new industry entrants",
      color: "yellow"
    },
    {
      program: "Women in Engineering",
      provider: "Various",
      duration: "6-12 months",
      cost: "Usually free",
      description: "Supporting women in electrical engineering careers",
      color: "pink"
    }
  ];

  const colorMap: Record<string, {
    border: string;
    bg: string;
    icon: string;
    iconBg: string;
    badge: string;
    glow: string;
  }> = {
    blue: {
      border: "border-blue-500/30 hover:border-blue-500/50",
      bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
      icon: "text-blue-400",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      glow: "bg-blue-500/5"
    },
    green: {
      border: "border-green-500/30 hover:border-green-500/50",
      bg: "bg-gradient-to-br from-white/5 to-green-950/20",
      icon: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
      badge: "bg-green-500/10 text-green-400 border-green-500/30",
      glow: "bg-green-500/5"
    },
    yellow: {
      border: "border-elec-yellow/30 hover:border-elec-yellow/50",
      bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
      icon: "text-elec-yellow",
      iconBg: "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30",
      badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30",
      glow: "bg-elec-yellow/5"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/50",
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      icon: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      glow: "bg-purple-500/5"
    },
    emerald: {
      border: "border-emerald-500/30 hover:border-emerald-500/50",
      bg: "bg-gradient-to-br from-white/5 to-emerald-950/20",
      icon: "text-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      glow: "bg-emerald-500/5"
    },
    cyan: {
      border: "border-cyan-500/30 hover:border-cyan-500/50",
      bg: "bg-gradient-to-br from-white/5 to-cyan-950/20",
      icon: "text-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      glow: "bg-cyan-500/5"
    },
    pink: {
      border: "border-pink-500/30 hover:border-pink-500/50",
      bg: "bg-gradient-to-br from-white/5 to-pink-950/20",
      icon: "text-pink-400",
      iconBg: "bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/30",
      badge: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      glow: "bg-pink-500/5"
    },
    orange: {
      border: "border-orange-500/30 hover:border-orange-500/50",
      bg: "bg-gradient-to-br from-white/5 to-orange-950/20",
      icon: "text-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      glow: "bg-orange-500/5"
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    { id: "bodies", title: "Professional Bodies", icon: Building, color: "yellow" },
    { id: "events", title: "Industry Events", icon: Calendar, color: "blue" },
    { id: "online", title: "Online Communities", icon: MessageCircle, color: "green" },
    { id: "linkedin", title: "LinkedIn Strategy", icon: Linkedin, color: "blue" },
    { id: "mentorship", title: "Mentorship Programs", icon: Users, color: "purple" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Build Your Network</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Industry Networking
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Your network is your net worth. <span className="text-blue-400 font-medium">70% of jobs</span> in the electrical industry
              come through personal connections and referrals.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-white/5 to-blue-950/20 border-blue-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <Building className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-blue-400">5+</div>
            <div className="text-[10px] text-white/60">Key Bodies</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-green-950/20 border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="h-4 w-4 text-green-400" />
            </div>
            <div className="text-lg font-bold text-green-400">300k+</div>
            <div className="text-[10px] text-white/60">Online Members</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-purple-950/20 border-purple-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-400">50+</div>
            <div className="text-[10px] text-white/60">Events/Year</div>
          </CardContent>
        </Card>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const colors = colorMap[section.color];
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <Card
              key={section.id}
              className={`${colors.bg} ${colors.border} transition-all overflow-hidden relative`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${colors.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

              <CardHeader className="relative pb-0">
                <Button
                  variant="ghost"
                  className="w-full p-0 h-auto hover:bg-transparent justify-between"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <CardTitle className="text-base text-white">{section.title}</CardTitle>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className={`h-5 w-5 ${colors.icon}`} />
                  ) : (
                    <ChevronDown className={`h-5 w-5 ${colors.icon}`} />
                  )}
                </Button>
              </CardHeader>

              {isExpanded && (
                <CardContent className="relative pt-4 animate-fade-in">
                  {section.id === "bodies" && (
                    <div className="space-y-3">
                      {professionalBodies.map((body, index) => {
                        const bodyColors = colorMap[body.color];
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-xl ${bodyColors.bg} ${bodyColors.border} transition-all`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${bodyColors.iconBg}`}>
                                  <Award className={`h-4 w-4 ${bodyColors.icon}`} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className={`font-semibold ${bodyColors.icon}`}>{body.name}</h3>
                                    {body.recommended && (
                                      <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/30">
                                        Recommended
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-white/60">{body.fullName}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className={`text-[10px] ${bodyColors.badge}`}>
                                {body.membership}
                              </Badge>
                            </div>
                            <p className="text-sm text-white/70 mb-3">{body.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {body.benefits.slice(0, 2).map((benefit, idx) => (
                                <Badge key={idx} variant="outline" className="text-[10px] bg-white/5 text-white/60 border-white/20">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
                              <Globe className="h-3 w-3" />
                              {body.website}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {section.id === "events" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {keyEvents.map((event, index) => {
                        const eventColors = colorMap[event.color];
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-xl ${eventColors.bg} ${eventColors.border} transition-all`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-semibold text-sm ${eventColors.icon}`}>{event.name}</h3>
                              <Badge variant="outline" className={`text-[10px] ${eventColors.badge}`}>
                                {event.frequency}
                              </Badge>
                            </div>
                            <p className="text-xs text-white/70 mb-3">{event.description}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1 text-white/50">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </span>
                              <span className="text-green-400 font-medium">{event.cost}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {section.id === "online" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {onlinePlatforms.map((platform, index) => {
                        const platColors = colorMap[platform.color];
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-xl ${platColors.bg} ${platColors.border} transition-all`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-semibold text-sm ${platColors.icon}`}>{platform.name}</h3>
                              <Badge variant="outline" className={`text-[10px] ${platColors.badge}`}>
                                {platform.cost}
                              </Badge>
                            </div>
                            <Badge variant="outline" className="text-[10px] bg-white/5 text-white/60 border-white/20 mb-2">
                              {platform.members}
                            </Badge>
                            <p className="text-xs text-white/60 flex items-start gap-1.5 mt-2">
                              <Lightbulb className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                              {platform.tip}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {section.id === "linkedin" && (
                    <div className="space-y-3">
                      <p className="text-sm text-white/70 mb-4">
                        LinkedIn is essential for modern electricians. Here's how to optimise your presence:
                      </p>
                      {linkedInTips.map((tip, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-blue-400" />
                              <h3 className="font-semibold text-sm text-blue-400">{tip.tip}</h3>
                            </div>
                            <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-400 border-green-500/30">
                              {tip.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-white/70">{tip.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.id === "mentorship" && (
                    <div className="space-y-3">
                      {mentorshipPrograms.map((program, index) => {
                        const progColors = colorMap[program.color];
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-xl ${progColors.bg} ${progColors.border} transition-all`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className={`font-semibold text-sm ${progColors.icon}`}>{program.program}</h3>
                                <p className="text-xs text-white/60">{program.provider}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className={`text-[10px] ${progColors.badge}`}>
                                  {program.duration}
                                </Badge>
                                <div className="text-xs text-green-400 mt-1">{program.cost}</div>
                              </div>
                            </div>
                            <p className="text-xs text-white/70">{program.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Networking Action Plan */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <Target className="h-5 w-5 text-orange-400" />
            </div>
            Your Networking Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-blue-400 mb-2">Start Local</h3>
              <p className="text-xs text-white/70">
                Join IET local networks and ECA regional groups to build connections in your area first.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-green-400">2</span>
              </div>
              <h3 className="font-semibold text-green-400 mb-2">Go Digital</h3>
              <p className="text-xs text-white/70">
                Optimise LinkedIn and join online forums to expand your network beyond geographical limits.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-purple-400">3</span>
              </div>
              <h3 className="font-semibold text-purple-400 mb-2">Attend Events</h3>
              <p className="text-xs text-white/70">
                Aim for 2-3 industry events per year to meet contacts and learn about market trends.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-500/20">
            <Star className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-green-400 mb-1">Networking ROI</p>
            <p className="text-sm text-white/70">
              Invest <span className="text-green-400 font-medium">£500-800 per year</span> in professional memberships and events.
              This typically returns £5,000-£15,000 in new business opportunities, better job offers, and career advancement.
              The connections you make early in your career will pay dividends for decades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryNetworkingTab;

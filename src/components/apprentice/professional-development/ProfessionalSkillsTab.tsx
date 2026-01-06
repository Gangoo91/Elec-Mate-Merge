
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Clock,
  Target,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Shield,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Monitor,
  Leaf,
  Cpu,
  Brain,
  Rocket,
  Star,
  Award,
  Zap
} from "lucide-react";

const ProfessionalSkillsTab = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      id: "communication",
      title: "Communication Skills",
      icon: MessageSquare,
      description: "Essential skills for effective workplace communication",
      skills: [
        { name: "Client consultation and needs assessment", tip: "Always ask open questions to understand full requirements" },
        { name: "Clear technical explanations to non-technical clients", tip: "Use analogies - compare circuits to water flow" },
        { name: "Written communication for quotes and reports", tip: "Use templates for consistency and professionalism" },
        { name: "Active listening and questioning techniques", tip: "Summarise back what clients say to confirm understanding" },
        { name: "Handling difficult conversations and complaints", tip: "Stay calm, acknowledge concerns, focus on solutions" },
        { name: "Digital communication etiquette", tip: "Respond to emails within 24 hours, keep messages professional" }
      ],
      importance: "Critical",
      color: "blue",
      marketValue: "+15% earning potential",
      developmentTime: "Ongoing"
    },
    {
      id: "time",
      title: "Time Management",
      icon: Clock,
      description: "Managing time effectively across multiple projects",
      skills: [
        { name: "Project planning and scheduling", tip: "Use digital calendars and job management apps" },
        { name: "Prioritising urgent vs important tasks", tip: "Use the Eisenhower Matrix for decision making" },
        { name: "Managing multiple client expectations", tip: "Communicate realistic timelines upfront" },
        { name: "Efficient job sequencing and routing", tip: "Group nearby jobs together to reduce travel time" },
        { name: "Buffer time for unexpected complications", tip: "Add 20% buffer to quoted job times" },
        { name: "Work-life balance management", tip: "Set clear boundaries for working hours" }
      ],
      importance: "High",
      color: "green",
      marketValue: "+10% productivity",
      developmentTime: "3-6 months"
    },
    {
      id: "problem",
      title: "Problem Solving",
      icon: Lightbulb,
      description: "Analytical thinking and creative solutions",
      skills: [
        { name: "Systematic fault diagnosis approaches", tip: "Half-split method: test middle of circuit first" },
        { name: "Creative solutions within budget constraints", tip: "Present options with cost-benefit analysis" },
        { name: "Risk assessment and mitigation planning", tip: "Consider 'what could go wrong' for every job" },
        { name: "Learning from mistakes and near-misses", tip: "Keep a personal incident log for continuous improvement" },
        { name: "Adapting to unexpected site conditions", tip: "Always do a site survey before quoting major works" },
        { name: "Root cause analysis techniques", tip: "Ask 'why' five times to find the real issue" }
      ],
      importance: "Critical",
      color: "amber",
      marketValue: "+20% client satisfaction",
      developmentTime: "1-2 years"
    },
    {
      id: "leadership",
      title: "Leadership & Teamwork",
      icon: Users,
      description: "Working effectively with others and leading projects",
      skills: [
        { name: "Mentoring junior colleagues and apprentices", tip: "Share your mistakes as well as successes" },
        { name: "Coordinating with other trades on site", tip: "Establish clear communication protocols early" },
        { name: "Leading small project teams", tip: "Daily briefings prevent confusion and rework" },
        { name: "Conflict resolution between team members", tip: "Address issues privately, focus on behaviours not personalities" },
        { name: "Building positive working relationships", tip: "Remember names and take genuine interest in colleagues" },
        { name: "Delegation and task assignment", tip: "Match tasks to skill levels, provide support not just instructions" }
      ],
      importance: "High",
      color: "purple",
      marketValue: "Essential for management",
      developmentTime: "2-5 years"
    },
    {
      id: "business",
      title: "Business Acumen",
      icon: TrendingUp,
      description: "Understanding the commercial side of electrical work",
      skills: [
        { name: "Accurate job costing and pricing", tip: "Track time on jobs to improve future estimates" },
        { name: "Understanding profit margins and overheads", tip: "Aim for 40-50% gross margin on labour" },
        { name: "Customer service excellence", tip: "Follow up after jobs to ensure satisfaction" },
        { name: "Building long-term client relationships", tip: "Annual safety check reminders show you care" },
        { name: "Basic financial management", tip: "Use accounting software from day one" },
        { name: "Marketing and personal branding", tip: "Consistent online presence builds trust" }
      ],
      importance: "Medium",
      color: "yellow",
      marketValue: "Required for self-employment",
      developmentTime: "1-3 years"
    },
    {
      id: "safety",
      title: "Safety Leadership",
      icon: Shield,
      description: "Promoting and maintaining safe working practices",
      skills: [
        { name: "Risk assessment and method statements", tip: "Complete before every job, even small ones" },
        { name: "Safety briefings and toolbox talks", tip: "Keep them short, relevant, and engaging" },
        { name: "Challenging unsafe practices confidently", tip: "Frame as concern for colleague welfare" },
        { name: "Incident investigation and reporting", tip: "Focus on system failures, not blame" },
        { name: "Continuous safety improvement mindset", tip: "Regular review of near-misses for trends" },
        { name: "Mental health awareness", tip: "Construction has high rates - know the signs" }
      ],
      importance: "Critical",
      color: "red",
      marketValue: "Legal requirement",
      developmentTime: "Ongoing"
    },
    {
      id: "digital",
      title: "Digital Skills",
      icon: Monitor,
      description: "Technology proficiency for the modern electrician",
      skills: [
        { name: "Job management software (Tradify, ServiceM8)", tip: "Automates invoicing and saves hours weekly" },
        { name: "Digital certification and reporting", tip: "Certs On The Go, iCertifi are industry standards" },
        { name: "Basic CAD and design software", tip: "AutoCAD LT or free alternatives like LibreCAD" },
        { name: "Social media for business", tip: "Before/after photos on Instagram generate leads" },
        { name: "Cloud storage and data backup", tip: "Google Drive or OneDrive for automatic backup" },
        { name: "Smart home system configuration", tip: "Growing demand - manufacturers offer free training" }
      ],
      importance: "High",
      color: "cyan",
      marketValue: "+25% efficiency",
      developmentTime: "6-12 months"
    },
    {
      id: "sustainability",
      title: "Sustainability Knowledge",
      icon: Leaf,
      description: "Green technology and environmental awareness",
      skills: [
        { name: "Energy efficiency assessment", tip: "Understanding kWh costs helps client discussions" },
        { name: "Renewable energy systems (Solar PV, Battery)", tip: "MCS certification opens premium market" },
        { name: "Heat pump electrical requirements", tip: "Fastest growing specialist area in UK" },
        { name: "EV charging infrastructure", tip: "IMI certification essential for this market" },
        { name: "Building regulations Part L compliance", tip: "Energy efficiency is now legally required" },
        { name: "Circular economy principles", tip: "Proper disposal and recycling gains client respect" }
      ],
      importance: "Critical",
      color: "emerald",
      marketValue: "+40% market access",
      developmentTime: "6-18 months"
    },
    {
      id: "ai",
      title: "AI & Automation Awareness",
      icon: Cpu,
      description: "Understanding emerging technologies in electrical work",
      skills: [
        { name: "Building Management Systems (BMS)", tip: "Growing demand in commercial sector" },
        { name: "AI-assisted fault diagnosis tools", tip: "Apps that analyse thermal images for issues" },
        { name: "Automated testing equipment", tip: "Modern MFTs have automated test sequences" },
        { name: "Voice-controlled systems (Alexa, Google)", tip: "Integration skills increasingly requested" },
        { name: "Industrial automation basics (PLCs)", tip: "Foundation for industrial electrician path" },
        { name: "Predictive maintenance concepts", tip: "IoT sensors that predict failures before they happen" }
      ],
      importance: "Medium",
      color: "violet",
      marketValue: "Future-proofing",
      developmentTime: "1-2 years"
    }
  ];

  const developmentActivities = [
    {
      activity: "Professional Body Membership",
      description: "Join IET, NICEIC, or other professional organisations",
      benefit: "Access to resources, networking, and CPD opportunities",
      icon: Award,
      color: "blue"
    },
    {
      activity: "Industry Events & Exhibitions",
      description: "Attend trade shows, seminars, and networking events",
      benefit: "Stay current with technology and build professional network",
      icon: Users,
      color: "purple"
    },
    {
      activity: "Mentoring Others",
      description: "Guide apprentices or junior colleagues",
      benefit: "Develops leadership skills and reinforces your own knowledge",
      icon: Star,
      color: "yellow"
    },
    {
      activity: "Cross-Trade Collaboration",
      description: "Work with plumbers, builders, and other trades",
      benefit: "Improves communication and project management skills",
      icon: Users,
      color: "green"
    },
    {
      activity: "Online Learning Platforms",
      description: "LinkedIn Learning, Coursera, and industry-specific platforms",
      benefit: "Flexible learning that fits around work schedule",
      icon: Monitor,
      color: "cyan"
    },
    {
      activity: "Soft Skills Workshops",
      description: "Formal training in customer service, communication, leadership",
      benefit: "Structured development with feedback and certification",
      icon: Brain,
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
    amber: {
      border: "border-amber-500/30 hover:border-amber-500/50",
      bg: "bg-gradient-to-br from-white/5 to-amber-950/20",
      icon: "text-amber-400",
      iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      glow: "bg-amber-500/5"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/50",
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      icon: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      glow: "bg-purple-500/5"
    },
    yellow: {
      border: "border-elec-yellow/30 hover:border-elec-yellow/50",
      bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
      icon: "text-elec-yellow",
      iconBg: "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30",
      badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30",
      glow: "bg-elec-yellow/5"
    },
    red: {
      border: "border-red-500/30 hover:border-red-500/50",
      bg: "bg-gradient-to-br from-white/5 to-red-950/20",
      icon: "text-red-400",
      iconBg: "bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30",
      badge: "bg-red-500/10 text-red-400 border-red-500/30",
      glow: "bg-red-500/5"
    },
    cyan: {
      border: "border-cyan-500/30 hover:border-cyan-500/50",
      bg: "bg-gradient-to-br from-white/5 to-cyan-950/20",
      icon: "text-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      glow: "bg-cyan-500/5"
    },
    emerald: {
      border: "border-emerald-500/30 hover:border-emerald-500/50",
      bg: "bg-gradient-to-br from-white/5 to-emerald-950/20",
      icon: "text-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      glow: "bg-emerald-500/5"
    },
    violet: {
      border: "border-violet-500/30 hover:border-violet-500/50",
      bg: "bg-gradient-to-br from-white/5 to-violet-950/20",
      icon: "text-violet-400",
      iconBg: "bg-gradient-to-br from-violet-500/20 to-violet-500/5 border border-violet-500/30",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
      glow: "bg-violet-500/5"
    },
    pink: {
      border: "border-pink-500/30 hover:border-pink-500/50",
      bg: "bg-gradient-to-br from-white/5 to-pink-950/20",
      icon: "text-pink-400",
      iconBg: "bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/30",
      badge: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      glow: "bg-pink-500/5"
    }
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Sparkles className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-elec-yellow uppercase tracking-wider">2026 Career Success</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Professional Skills Development
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Technical skills get you the job, but professional skills help you excel.
              <span className="text-elec-yellow font-medium"> 85% of career success</span> comes from soft skills and professional competencies.
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
              <Brain className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-blue-400">9</div>
            <div className="text-[10px] text-white/60">Skill Areas</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-green-950/20 border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <div className="text-lg font-bold text-green-400">+35%</div>
            <div className="text-[10px] text-white/60">Career Growth</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white/5 to-purple-950/20 border-purple-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <Rocket className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-400">6</div>
            <div className="text-[10px] text-white/60">Activities</div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Core Competency Areas
        </h3>

        {skillCategories.map((category) => {
          const colors = colorMap[category.color];
          const Icon = category.icon;
          const isExpanded = expandedCategory === category.id;

          return (
            <Card
              key={category.id}
              className={`${colors.bg} ${colors.border} transition-all overflow-hidden relative`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${colors.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

              <CardHeader className="relative pb-0">
                <Button
                  variant="ghost"
                  className="w-full p-0 h-auto hover:bg-transparent justify-between"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-base text-white">{category.title}</CardTitle>
                        <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                          {category.importance}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/60 mt-0.5">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] ${colors.badge} hidden sm:flex`}>
                      {category.marketValue}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className={`h-5 w-5 ${colors.icon}`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${colors.icon}`} />
                    )}
                  </div>
                </Button>
              </CardHeader>

              {isExpanded && (
                <CardContent className="relative pt-4 animate-fade-in">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                      {category.marketValue}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] bg-white/5 text-white/70 border-white/20">
                      {category.developmentTime} to develop
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start gap-2">
                          <CheckCircle className={`h-4 w-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                          <div className="flex-1">
                            <p className="text-sm text-white font-medium">{skill.name}</p>
                            <p className="text-xs text-white/60 mt-1 flex items-start gap-1.5">
                              <Lightbulb className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span>{skill.tip}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Development Activities */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Rocket className="h-5 w-5 text-blue-400" />
            </div>
            Development Activities
          </CardTitle>
          <p className="text-sm text-white/60">
            Practical ways to develop your professional skills
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {developmentActivities.map((activity, index) => {
              const colors = colorMap[activity.color];
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${colors.bg} ${colors.border} transition-all`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                      <Icon className={`h-4 w-4 ${colors.icon}`} />
                    </div>
                    <h4 className="font-medium text-white text-sm">{activity.activity}</h4>
                  </div>
                  <p className="text-xs text-white/60 mb-3">{activity.description}</p>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <TrendingUp className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-green-400">{activity.benefit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Why Skills Matter */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Zap className="h-5 w-5 text-elec-yellow" />
            </div>
            Why Professional Skills Matter
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-blue-400">Career Advancement</h3>
              </div>
              <p className="text-sm text-white/70">
                Leadership and communication skills are essential for supervisory and management roles. Most project managers started as skilled tradespeople.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-green-400">Client Relationships</h3>
              </div>
              <p className="text-sm text-white/70">
                Strong interpersonal skills lead to repeat business and positive referrals. Word-of-mouth recommendations drive 70%+ of new work.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-purple-400">Professional Recognition</h3>
              </div>
              <p className="text-sm text-white/70">
                Well-rounded professionals are more respected and trusted in the industry. This translates to premium rates and better opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <Lightbulb className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-emerald-400 mb-1">Development Strategy</p>
            <p className="text-sm text-white/70">
              Focus on developing <span className="text-emerald-400 font-medium">one skill category every quarter</span>.
              Start with communication and problem-solving as these underpin all other areas.
              Track your progress and seek feedback from colleagues and clients regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSkillsTab;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, TrendingUp, Award, Clock, PoundSterling, Users, Search, Calculator, Shield, Sparkles, CheckCircle } from "lucide-react";

const CourseSelectionTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Align with Career Goals",
      description: "Choose courses that directly support your career progression plans. Consider specialist areas like industrial, commercial, or domestic work. Research salary expectations for each path and match courses to desired outcomes.",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "Future-Proof Your Skills",
      description: "Prioritise emerging technologies like EV charging (£35-50k annually), smart home systems, renewable energy, and energy storage. These sectors are experiencing 40%+ growth annually.",
      color: "green"
    },
    {
      icon: Award,
      title: "Check Accreditations",
      description: "Ensure courses are recognised by NICEIC, ECA, SELECT, City & Guilds, EAL, or JIB. Verify if the qualification counts towards your JIB grading. Look for courses that include competency assessments.",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Consider Timing & Format",
      description: "Balance course duration with work commitments. Evening classes (6-9pm), weekend intensive courses, or online hybrid learning are available. Block release courses may suit some employers.",
      color: "orange"
    },
    {
      icon: PoundSterling,
      title: "Funding & Employer Support",
      description: "Many employers offer funding through apprenticeship levy (£15k+ available). Check for government grants, skills bootcamps, or sector-specific funding. Some courses qualify for career development loans.",
      color: "emerald"
    },
    {
      icon: Search,
      title: "Research Training Providers",
      description: "Compare course quality, pass rates, and industry connections. Read reviews from recent students and check employment outcomes. Visit facilities to assess equipment quality.",
      color: "cyan"
    },
    {
      icon: Calculator,
      title: "Calculate Return on Investment",
      description: "Compare course costs against potential salary increases. Entry-level courses (£500-2000) can lead to £3-5k salary jumps. Specialist qualifications (£2-5k) often result in £8-15k increases.",
      color: "amber"
    },
    {
      icon: Users,
      title: "Network & Learn from Peers",
      description: "Join course-related forums, LinkedIn groups, and professional associations. Connect with fellow students for study groups and future job opportunities. Build relationships with instructors.",
      color: "pink"
    }
  ];

  const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string }> = {
    blue: { border: "border-blue-500/20", bg: "bg-blue-500/5", icon: "text-blue-400", iconBg: "bg-blue-500/20" },
    green: { border: "border-green-500/20", bg: "bg-green-500/5", icon: "text-green-400", iconBg: "bg-green-500/20" },
    purple: { border: "border-purple-500/20", bg: "bg-purple-500/5", icon: "text-purple-400", iconBg: "bg-purple-500/20" },
    orange: { border: "border-orange-500/20", bg: "bg-orange-500/5", icon: "text-orange-400", iconBg: "bg-orange-500/20" },
    emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", icon: "text-emerald-400", iconBg: "bg-emerald-500/20" },
    cyan: { border: "border-cyan-500/20", bg: "bg-cyan-500/5", icon: "text-cyan-400", iconBg: "bg-cyan-500/20" },
    amber: { border: "border-amber-500/20", bg: "bg-amber-500/5", icon: "text-amber-400", iconBg: "bg-amber-500/20" },
    pink: { border: "border-pink-500/20", bg: "bg-pink-500/5", icon: "text-pink-400", iconBg: "bg-pink-500/20" }
  };

  const costGuidance = [
    {
      category: "Entry Level (Level 2)",
      cost: "£500 - £2,000",
      duration: "6-12 months",
      outcome: "Start as trainee, £18-22k salary",
      color: "blue"
    },
    {
      category: "Intermediate (Level 3)",
      cost: "£1,500 - £4,000",
      duration: "12-24 months",
      outcome: "Qualified electrician, £25-35k salary",
      color: "green"
    },
    {
      category: "Specialist Courses",
      cost: "£800 - £3,000 per course",
      duration: "1-6 months",
      outcome: "£3-8k salary increase per specialism",
      color: "purple"
    }
  ];

  const qualityIndicators = [
    "Industry-standard equipment and facilities",
    "Qualified instructors with recent industry experience",
    "High pass rates (80%+ for practical assessments)",
    "Strong employer links and job placement support",
    "Up-to-date curriculum reflecting current regulations",
    "Good student reviews and graduate employment rates"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tips Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
            </div>
            Course Selection Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip, idx) => {
              const colors = colorMap[tip.color];
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl ${colors.bg} border ${colors.border} hover:border-opacity-50 transition-all`}
                >
                  <div className={`p-2 rounded-lg ${colors.iconBg} w-fit mb-3`}>
                    <tip.icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <h4 className="font-semibold text-sm text-white mb-2">{tip.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cost Guidance Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <Calculator className="h-5 w-5 text-green-400" />
            </div>
            Course Cost Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {costGuidance.map((item, idx) => {
              const colors = colorMap[item.color];
              return (
                <div key={idx} className={`p-4 rounded-xl ${colors.bg} border ${colors.border}`}>
                  <h4 className={`font-semibold text-sm ${colors.icon} mb-3`}>{item.category}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Cost:</span>
                      <span className="text-xs text-white font-medium">{item.cost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/60">Duration:</span>
                      <span className="text-xs text-white font-medium">{item.duration}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-xs text-green-400">{item.outcome}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quality Indicators Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            Quality Indicators to Look For
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {qualityIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20">
                <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/80">{indicator}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Insight Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
            Industry Insight & Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
            <h4 className="font-semibold text-sm text-elec-yellow mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              High-Growth Sectors (2026)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5">
                <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-[10px] mb-2">+65% Growth</Badge>
                <p className="text-xs text-white font-medium">EV Charging Infrastructure</p>
                <p className="text-[10px] text-white/60 mt-1">£35-55k for specialists</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] mb-2">+45% Growth</Badge>
                <p className="text-xs text-white font-medium">Renewable Energy Systems</p>
                <p className="text-[10px] text-white/60 mt-1">Solar and battery storage</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px] mb-2">+40% Growth</Badge>
                <p className="text-xs text-white font-medium">Smart Building Technology</p>
                <p className="text-[10px] text-white/60 mt-1">Commercial and residential</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] mb-2">Critical Shortage</Badge>
                <p className="text-xs text-white font-medium">Data Centre Infrastructure</p>
                <p className="text-[10px] text-white/60 mt-1">£40-65k for qualified engineers</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-semibold text-sm text-white mb-3">Regional Considerations</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-[10px]">London</Badge>
                <span className="text-white/70">Highest salaries but intense competition and higher course costs</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-[10px]">North</Badge>
                <span className="text-white/70">Strong demand for manufacturing and renewable energy skills</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-[10px]">Scotland</Badge>
                <span className="text-white/70">Offshore wind and renewable energy opportunities, government funding</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]">Wales</Badge>
                <span className="text-white/70">Growing green energy sector with apprenticeship support</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSelectionTips;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Clock,
  PoundSterling,
  GraduationCap,
  Award,
  Building,
  Zap,
  Wrench,
  Shield,
  Target,
  CheckCircle,
  Sparkles,
  MapPin,
  Battery,
  Flame
} from "lucide-react";

const CareerPathwaysTab = () => {
  const careerPaths = [
    {
      title: "Domestic Electrician",
      icon: Building,
      timeframe: "0-2 years post-qualification",
      salaryRange: "£28,000 - £38,000",
      description: "Residential electrical installations, maintenance, and repairs",
      requirements: [
        "Level 3 Electrical Installation qualification",
        "AM2 practical assessment",
        "18th Edition BS 7671",
        "Part P Building Regulations"
      ],
      progression: "Commercial Work → Specialist Areas → Self-Employment",
      color: "blue",
      demand: "High"
    },
    {
      title: "Commercial Electrician",
      icon: Building,
      timeframe: "2-5 years experience",
      salaryRange: "£35,000 - £48,000",
      description: "Office buildings, shops, and commercial installations",
      requirements: [
        "Domestic experience foundation",
        "Commercial wiring methods",
        "Fire alarm systems knowledge",
        "Emergency lighting understanding"
      ],
      progression: "Industrial Work → Project Management → Contracting",
      color: "green",
      demand: "High"
    },
    {
      title: "Industrial Electrician",
      icon: Wrench,
      timeframe: "3-7 years experience",
      salaryRange: "£40,000 - £58,000",
      description: "Manufacturing plants, heavy machinery, and process control",
      requirements: [
        "Motor control systems",
        "PLC programming basics",
        "High voltage awareness",
        "Instrumentation knowledge"
      ],
      progression: "Maintenance Engineering → Control Systems → Plant Management",
      color: "amber",
      demand: "Medium"
    },
    {
      title: "EV Charging Specialist",
      icon: Zap,
      timeframe: "1-3 years + certification",
      salaryRange: "£38,000 - £55,000",
      description: "Electric vehicle charging infrastructure installation",
      requirements: [
        "EV charging installation certification",
        "Smart charging systems",
        "Load management knowledge",
        "OZEV scheme understanding"
      ],
      progression: "Lead Installer → Fleet Specialist → EV Business Owner",
      color: "emerald",
      demand: "Very High"
    },
    {
      title: "Battery Storage Specialist",
      icon: Battery,
      timeframe: "2-4 years + specialisation",
      salaryRange: "£42,000 - £60,000",
      description: "BESS installation, grid connections, and energy management",
      requirements: [
        "Battery storage certification",
        "Grid connection knowledge",
        "Energy management systems",
        "G99/G100 compliance"
      ],
      progression: "Senior Installer → System Designer → Energy Consultant",
      color: "cyan",
      demand: "Very High"
    },
    {
      title: "Heat Pump Electrician",
      icon: Flame,
      timeframe: "2-4 years + certification",
      salaryRange: "£40,000 - £55,000",
      description: "Heat pump electrical systems and controls",
      requirements: [
        "Heat pump electrical certification",
        "MCS accreditation pathway",
        "Control systems knowledge",
        "F-Gas awareness"
      ],
      progression: "Lead Installer → Commissioning Expert → Renewable Consultant",
      color: "orange",
      demand: "Very High"
    },
    {
      title: "Electrical Designer",
      icon: GraduationCap,
      timeframe: "5+ years + education",
      salaryRange: "£45,000 - £70,000",
      description: "Electrical system design and engineering drawings",
      requirements: [
        "HNC/HND Electrical Engineering",
        "CAD software proficiency",
        "Design standards knowledge",
        "Load calculation expertise"
      ],
      progression: "Senior Designer → Principal Engineer → Chartered Engineer",
      color: "purple",
      demand: "Medium"
    },
    {
      title: "Inspection & Testing Specialist",
      icon: Shield,
      timeframe: "3-5 years + certification",
      salaryRange: "£38,000 - £55,000",
      description: "Electrical installation testing and certification",
      requirements: [
        "2391 Inspection & Testing",
        "Extensive testing experience",
        "Fault finding expertise",
        "Regulatory knowledge"
      ],
      progression: "Lead Inspector → Training Provider → Compliance Manager",
      color: "red",
      demand: "High"
    }
  ];

  const progressionStages = [
    {
      stage: "Apprentice",
      duration: "3-4 years",
      focus: "Learning fundamentals, gaining experience, completing qualification",
      salary: "£16,000 - £22,000"
    },
    {
      stage: "Newly Qualified",
      duration: "0-2 years",
      focus: "Building confidence, developing speed, learning business practices",
      salary: "£28,000 - £35,000"
    },
    {
      stage: "Experienced Electrician",
      duration: "2-7 years",
      focus: "Specialisation, leadership skills, advanced qualifications",
      salary: "£35,000 - £50,000"
    },
    {
      stage: "Senior/Specialist",
      duration: "7+ years",
      focus: "Expert knowledge, mentoring others, business development",
      salary: "£45,000 - £80,000+"
    }
  ];

  const factorsAffectingSalary = [
    {
      factor: "Location",
      impact: "High",
      description: "London and South East typically 20-30% higher than national average"
    },
    {
      factor: "Specialisation",
      impact: "High",
      description: "EV, battery storage, and automation command premium rates"
    },
    {
      factor: "Employment Type",
      impact: "Medium",
      description: "Self-employed often earn more but have additional responsibilities"
    },
    {
      factor: "Industry Sector",
      impact: "Medium",
      description: "Oil & gas, nuclear, and aerospace typically pay more than domestic"
    },
    {
      factor: "Qualifications",
      impact: "Medium",
      description: "Advanced certifications and degrees increase earning potential"
    }
  ];

  const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string; badge: string }> = {
    blue: {
      border: "border-blue-500/20 hover:border-blue-500/40",
      bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
      icon: "text-blue-400",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    },
    green: {
      border: "border-green-500/20 hover:border-green-500/40",
      bg: "bg-gradient-to-br from-white/5 to-green-950/20",
      icon: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
      badge: "bg-green-500/10 text-green-400 border-green-500/30"
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/40",
      bg: "bg-gradient-to-br from-white/5 to-amber-950/20",
      icon: "text-amber-400",
      iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30"
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "bg-gradient-to-br from-white/5 to-emerald-950/20",
      icon: "text-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    },
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      bg: "bg-gradient-to-br from-white/5 to-cyan-950/20",
      icon: "text-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
    },
    orange: {
      border: "border-orange-500/20 hover:border-orange-500/40",
      bg: "bg-gradient-to-br from-white/5 to-orange-950/20",
      icon: "text-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/30"
    },
    purple: {
      border: "border-purple-500/20 hover:border-purple-500/40",
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      icon: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    red: {
      border: "border-red-500/20 hover:border-red-500/40",
      bg: "bg-gradient-to-br from-white/5 to-red-950/20",
      icon: "text-red-400",
      iconBg: "bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30",
      badge: "bg-red-500/10 text-red-400 border-red-500/30"
    }
  };

  const getDemandBadge = (demand: string) => {
    const demandColors: Record<string, string> = {
      "Very High": "bg-green-500/10 text-green-400 border-green-500/30",
      "High": "bg-blue-500/10 text-blue-400 border-blue-500/30",
      "Medium": "bg-amber-500/10 text-amber-400 border-amber-500/30"
    };
    return demandColors[demand] || demandColors["Medium"];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">2026 UK Market</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">
              UK Electrical Career Pathways
            </h2>
            <p className="text-sm text-white/70">
              Explore diverse career opportunities in the UK electrical industry.
              Green technology roles are seeing <span className="text-green-400 font-medium">40%+ growth</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Career Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerPaths.map((path, index) => {
          const colors = colorMap[path.color];
          const IconComponent = path.icon;
          return (
            <Card key={index} className={`${colors.bg} ${colors.border} transition-all overflow-hidden relative group`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative pb-3">
                <div className="flex items-start gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                    <IconComponent className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base text-white">{path.title}</CardTitle>
                    <p className="text-sm text-white/70 mt-0.5">{path.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                    <Clock className="h-3 w-3 mr-1" />
                    {path.timeframe}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                    <PoundSterling className="h-3 w-3 mr-1" />
                    {path.salaryRange}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getDemandBadge(path.demand)}`}>
                    {path.demand} Demand
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4 pt-0">
                <div>
                  <h4 className="font-medium text-white/90 mb-2 text-sm">Requirements</h4>
                  <ul className="space-y-1.5">
                    {path.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="text-sm text-white/70 flex items-start gap-2">
                        <CheckCircle className={`h-3.5 w-3.5 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <h4 className="font-medium text-white/90 mb-1 text-sm">Career Progression</h4>
                  <p className="text-sm text-green-400">{path.progression}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progression Timeline */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
            </div>
            Career Progression Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressionStages.map((stage, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10/50 to-elec-dark/30 p-4 rounded-xl border border-elec-yellow/10 hover:border-elec-yellow/30 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center border border-elec-yellow/30">
                    <span className="text-elec-yellow font-bold text-sm">{index + 1}</span>
                  </div>
                  <h4 className="font-medium text-white">{stage.stage}</h4>
                </div>
                <p className="text-xs text-elec-yellow mb-2">{stage.duration}</p>
                <p className="text-sm text-white/70 mb-3">{stage.focus}</p>
                <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs">
                  {stage.salary}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Factors */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <PoundSterling className="h-5 w-5 text-green-400" />
            </div>
            Factors Affecting Salary
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {factorsAffectingSalary.map((factor, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10/50 to-elec-dark/30 p-4 rounded-xl border border-green-500/10 hover:border-green-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{factor.factor}</h4>
                  <Badge
                    className={`text-xs ${
                      factor.impact === 'High'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {factor.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-white/70">{factor.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planning Your Career */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-elec-yellow flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Target className="h-5 w-5 text-elec-yellow" />
            </div>
            Planning Your Career Path
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow text-sm">Key Considerations</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Consider your interests and strengths when choosing specialisations
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Research local job markets and growth sectors in your area
                </li>
                <li className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Plan qualifications and training well in advance
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Build a network of professional contacts early in your career
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow text-sm">Next Steps</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Identify 2-3 career paths that interest you most
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Research the specific qualifications and experience needed
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Speak to professionals already working in those areas
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Create a 5-year development plan with clear milestones
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathwaysTab;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, TrendingUp, ChevronDown, ChevronUp, Sparkles, PoundSterling, MapPin, CheckCircle } from "lucide-react";

const educationPathways = [
  {
    id: 1,
    title: "HNC Electrical Engineering",
    level: "Level 4",
    duration: "1-2 years",
    studyMode: ["Part-time", "Evening", "Distance Learning"],
    cost: "£3,000 - £6,000",
    fundingAvailable: true,
    description: "Build advanced technical knowledge in electrical engineering principles, digital electronics, and project management.",
    keyModules: [
      "Electrical Principles & Applications",
      "Engineering Mathematics",
      "Digital Electronics",
      "Health & Safety Management",
      "Project Planning & Management"
    ],
    careerProgression: [
      "Senior Electrician",
      "Electrical Supervisor",
      "Technical Specialist",
      "Progress to HND"
    ],
    entryRequirements: "Level 3 qualification or relevant work experience",
    providers: ["Local colleges", "Distance learning providers"],
    averageSalaryIncrease: "£3,000 - £5,000",
    color: "blue",
    demand: "High"
  },
  {
    id: 2,
    title: "HND Electrical Engineering",
    level: "Level 5",
    duration: "2-3 years",
    studyMode: ["Part-time", "Evening", "Block release"],
    cost: "£6,000 - £12,000",
    fundingAvailable: true,
    description: "Comprehensive higher education qualification covering advanced electrical systems, power engineering, and management skills.",
    keyModules: [
      "Power Systems Analysis",
      "Electronic Circuit Design",
      "Industrial Control Systems",
      "Renewable Energy Systems",
      "Business Management",
      "Research Project"
    ],
    careerProgression: [
      "Electrical Design Engineer",
      "Project Manager",
      "Technical Manager",
      "Final year degree entry"
    ],
    entryRequirements: "HNC or equivalent Level 4 qualification",
    providers: ["Universities", "Technical colleges"],
    averageSalaryIncrease: "£5,000 - £8,000",
    color: "purple",
    demand: "High"
  },
  {
    id: 3,
    title: "Degree Top-Up (BEng/BSc)",
    level: "Level 6",
    duration: "1 year",
    studyMode: ["Full-time", "Part-time"],
    cost: "£9,250 (full-time) / £4,625 (part-time)",
    fundingAvailable: true,
    description: "Complete your bachelor's degree with one additional year of study after completing an HND.",
    keyModules: [
      "Advanced Power Systems",
      "Sustainable Energy Technologies",
      "Engineering Management",
      "Individual Project",
      "Professional Practice"
    ],
    careerProgression: [
      "Graduate Engineer",
      "Design Engineer",
      "Technical Consultant",
      "Master's degree entry"
    ],
    entryRequirements: "HND in relevant subject with good grades",
    providers: ["Universities nationwide"],
    averageSalaryIncrease: "£7,000 - £12,000",
    color: "green",
    demand: "Very High"
  },
  {
    id: 4,
    title: "Renewable Energy Courses",
    level: "Specialist",
    duration: "1-5 days",
    studyMode: ["Intensive courses", "Online"],
    cost: "£300 - £1,500",
    fundingAvailable: true,
    description: "Specialise in the growing renewable energy sector with solar PV, heat pump, and energy storage training.",
    keyModules: [
      "Solar PV Installation & Maintenance",
      "Heat Pump Systems",
      "Battery Storage Systems",
      "Grid Connection Requirements",
      "MCS Certification Preparation"
    ],
    careerProgression: [
      "Renewable Energy Specialist",
      "Green Technology Installer",
      "Energy Consultant",
      "Business opportunities"
    ],
    entryRequirements: "Qualified electrician status",
    providers: ["NICEIC", "NAPIT", "Specialist training centres"],
    averageSalaryIncrease: "£2,000 - £4,000",
    color: "emerald",
    demand: "Very High"
  },
  {
    id: 5,
    title: "Electric Vehicle Charging",
    level: "Specialist",
    duration: "1-3 days",
    studyMode: ["Practical workshops"],
    cost: "£400 - £800",
    fundingAvailable: true,
    description: "Enter the rapidly expanding EV charging market with comprehensive installation and maintenance training.",
    keyModules: [
      "EV Charging Technologies",
      "Installation Requirements",
      "Safety Procedures",
      "Testing & Commissioning",
      "Business Development"
    ],
    careerProgression: [
      "EV Charging Specialist",
      "Commercial EV Installer",
      "Charging Network Technician",
      "Independent contractor"
    ],
    entryRequirements: "18th Edition, AM2, or equivalent",
    providers: ["Industry training providers", "Manufacturer courses"],
    averageSalaryIncrease: "£3,000 - £6,000",
    color: "cyan",
    demand: "Explosive Growth"
  },
  {
    id: 6,
    title: "Smart Home Technology",
    level: "Emerging",
    duration: "2-5 days",
    studyMode: ["Hands-on training"],
    cost: "£500 - £1,200",
    fundingAvailable: false,
    description: "Master home automation, IoT systems, and smart electrical installations for the connected home market.",
    keyModules: [
      "Home Automation Systems",
      "IoT Device Integration",
      "Smart Lighting Controls",
      "Security System Integration",
      "Troubleshooting Connected Systems"
    ],
    careerProgression: [
      "Smart Home Specialist",
      "Home Automation Consultant",
      "Technology Integration Expert",
      "Premium service provider"
    ],
    entryRequirements: "Electrical qualification + IT literacy",
    providers: ["Technology companies", "Specialist academies"],
    averageSalaryIncrease: "£4,000 - £7,000",
    color: "orange",
    demand: "High Growth"
  }
];

const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string; badge: string; glow: string }> = {
  blue: {
    border: "border-blue-500/30 hover:border-blue-500/50",
    bg: "bg-gradient-to-br from-elec-gray to-blue-950/20",
    icon: "text-blue-400",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    glow: "bg-blue-500/5"
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-500/50",
    bg: "bg-gradient-to-br from-elec-gray to-purple-950/20",
    icon: "text-purple-400",
    iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    glow: "bg-purple-500/5"
  },
  green: {
    border: "border-green-500/30 hover:border-green-500/50",
    bg: "bg-gradient-to-br from-elec-gray to-green-950/20",
    icon: "text-green-400",
    iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
    badge: "bg-green-500/10 text-green-400 border-green-500/30",
    glow: "bg-green-500/5"
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    bg: "bg-gradient-to-br from-elec-gray to-emerald-950/20",
    icon: "text-emerald-400",
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    glow: "bg-emerald-500/5"
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    bg: "bg-gradient-to-br from-elec-gray to-cyan-950/20",
    icon: "text-cyan-400",
    iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    glow: "bg-cyan-500/5"
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-500/50",
    bg: "bg-gradient-to-br from-elec-gray to-orange-950/20",
    icon: "text-orange-400",
    iconBg: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    glow: "bg-orange-500/5"
  }
};

const EducationPathways = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Education Pathways</h3>
            <p className="text-sm text-white/70">
              Explore qualifications from HNC to specialist certifications. Each pathway offers funding options and clear career progression.
            </p>
          </div>
        </div>
      </div>

      {/* Pathways Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {educationPathways.map((pathway) => {
          const colors = colorMap[pathway.color];
          const isExpanded = expandedId === pathway.id;

          return (
            <Card
              key={pathway.id}
              className={`${colors.bg} ${colors.border} border overflow-hidden relative transition-all`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${colors.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
              <CardHeader className="relative pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                      <GraduationCap className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{pathway.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                          {pathway.level}
                        </Badge>
                        {pathway.fundingAvailable && (
                          <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-[10px]">
                            Funding Available
                          </Badge>
                        )}
                        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">
                          {pathway.demand}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">+{pathway.averageSalaryIncrease}</div>
                    <div className="text-[10px] text-white/60">salary increase</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <p className="text-sm text-white/70">{pathway.description}</p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    <Clock className={`h-4 w-4 ${colors.icon}`} />
                    <span className="text-sm text-white/70">{pathway.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                    <PoundSterling className={`h-4 w-4 ${colors.icon}`} />
                    <span className="text-sm text-white/70">{pathway.cost}</span>
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="space-y-4 pt-2 animate-fade-in">
                    {/* Key Modules */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${colors.icon}`}>Key Modules:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {pathway.keyModules.map((module, idx) => (
                          <Badge key={idx} variant="outline" className="text-[10px] bg-white/5 text-white/70 border-white/20">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Career Progression */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${colors.icon}`}>Career Progression:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {pathway.careerProgression.map((career, idx) => (
                          <Badge key={idx} className={`text-[10px] ${colors.badge}`}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Entry Requirements */}
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start gap-2">
                        <CheckCircle className={`h-4 w-4 ${colors.icon} mt-0.5`} />
                        <div>
                          <span className="text-xs font-semibold text-white">Entry Requirements:</span>
                          <p className="text-xs text-white/70 mt-0.5">{pathway.entryRequirements}</p>
                        </div>
                      </div>
                    </div>

                    {/* Providers */}
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <MapPin className="h-3 w-3" />
                      <span>Providers: {pathway.providers.join(", ")}</span>
                    </div>
                  </div>
                )}

                {/* Toggle Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(isExpanded ? null : pathway.id)}
                  className={`w-full h-10 ${colors.icon} hover:bg-white/5 touch-manipulation active:scale-95 transition-all`}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      View Details
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Why Invest Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
            </div>
            Why Invest in Further Education?
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 text-center">
              <div className="text-2xl font-bold text-elec-yellow">£5,000+</div>
              <div className="text-xs text-white/70 mt-1">Average salary increase</div>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <div className="text-2xl font-bold text-green-400">90%+</div>
              <div className="text-xs text-white/70 mt-1">Employment rate</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <div className="text-2xl font-bold text-blue-400">18,000+</div>
              <div className="text-xs text-white/70 mt-1">UK job openings</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
              <div className="text-2xl font-bold text-purple-400">Future</div>
              <div className="text-xs text-white/70 mt-1">Career security</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Sparkles className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <p className="font-medium text-cyan-400 mb-1">2026 Market Insight</p>
            <p className="text-sm text-white/70">
              EV charging (+45%), battery storage (+42%), and heat pump specialists (+38%) are seeing the highest salary growth. Consider combining qualifications for maximum earning potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPathways;

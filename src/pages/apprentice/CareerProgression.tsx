
import { useState } from "react";
import {
  GraduationCap,
  ArrowLeft,
  TrendingUp,
  PoundSterling,
  Users,
  Zap,
  Calendar,
  Award,
  ChevronRight,
  Sparkles,
  Info,
  Rocket,
  Target,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SimpleCareerCard from "@/components/apprentice/career/SimpleCareerCard";
import CareerPathways from "@/components/apprentice/career/CareerPathways";
import CareerCourses from "@/components/apprentice/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/apprentice/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/apprentice/career/ProfessionalAccreditation";
import CPDTracker from "@/components/apprentice/career/cpd/CPDTracker";
import BusinessBuilder from "@/components/electrician/business/BusinessBuilder";
import { careerSections, quickFacts, industryStats } from "@/components/apprentice/career/SectionData";

const CareerProgression = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleBackToSections = () => {
    setActiveSection(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return <CareerPathways />;
      case "courses":
        return <CareerCourses />;
      case "education":
        return <EnhancedFurtherEducation />;
      case "accreditation":
        return <ProfessionalAccreditation />;
      case "cpd":
        return <CPDTracker />;
      case "business":
        return <BusinessBuilder />;
      default:
        return null;
    }
  };

  const salaryData = [
    { role: "Apprentice (Year 1)", salary: "£16,000 - £20,000", color: "yellow" },
    { role: "Qualified Electrician", salary: "£32,000 - £42,000", color: "blue" },
    { role: "Approved Electrician", salary: "£38,000 - £52,000", color: "purple" },
    { role: "Supervisor / Manager", salary: "£48,000 - £68,000", color: "green" },
    { role: "Contractor (Self-employed)", salary: "£50,000 - £95,000+", color: "emerald" }
  ];

  const growthSectors = [
    { sector: "Electric Vehicle Charging", growth: "+45%", demand: "Very High", color: "green" },
    { sector: "Battery Storage (BESS)", growth: "+42%", demand: "Very High", color: "blue" },
    { sector: "Heat Pump Installation", growth: "+38%", demand: "High", color: "purple" },
    { sector: "Solar PV Systems", growth: "+35%", demand: "High", color: "yellow" },
    { sector: "Smart Building Systems", growth: "+28%", demand: "Growing", color: "cyan" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                Career Progression
              </h1>
              <p className="text-sm text-white/70 mt-0.5 hidden sm:block">
                Your pathway to success in the electrical industry
              </p>
            </div>
          </div>
          <p className="hidden sm:block text-base text-white/70 sm:ml-[76px]">
            Explore career paths, find courses, track your CPD and build your professional future
          </p>
        </div>
        {activeSection && (
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto h-11 border-elec-yellow/30 hover:border-elec-yellow/50 touch-manipulation active:scale-95 transition-all"
            onClick={handleBackToSections}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Career Hub
          </Button>
        )}
      </div>

      {activeSection === null ? (
        <>
          {/* Industry Stats Banner - Hidden on mobile */}
          <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickFacts.map((fact, index) => {
              const colors = [
                { bg: "bg-gradient-to-br from-elec-gray to-yellow-950/20", border: "border-elec-yellow/20", icon: "text-elec-yellow", glow: "bg-elec-yellow/10" },
                { bg: "bg-gradient-to-br from-elec-gray to-green-950/20", border: "border-green-500/20", icon: "text-green-400", glow: "bg-green-500/10" },
                { bg: "bg-gradient-to-br from-elec-gray to-blue-950/20", border: "border-blue-500/20", icon: "text-blue-400", glow: "bg-blue-500/10" },
                { bg: "bg-gradient-to-br from-elec-gray to-purple-950/20", border: "border-purple-500/20", icon: "text-purple-400", glow: "bg-purple-500/10" }
              ][index];

              return (
                <Card
                  key={index}
                  className={`${colors.bg} ${colors.border} overflow-hidden relative`}
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 ${colors.glow} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                  <CardContent className="p-3 sm:p-4 relative">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-lg ${colors.bg} border ${colors.border} flex-shrink-0`}>
                        <div className={colors.icon}>
                          {fact.icon}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className={`text-lg sm:text-xl font-bold ${colors.icon} truncate`}>
                          {fact.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-white/70 truncate">
                          {fact.label}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Hero Welcome Section - Hidden on mobile */}
          <Card className="hidden sm:block bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-4 sm:p-6 relative">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                      <Sparkles className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <span className="text-xs font-medium text-elec-yellow uppercase tracking-wider">
                      2026 UK Electrical Industry
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    Your Career Development Hub
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The UK electrical industry is booming with a <span className="text-elec-yellow font-medium">skills shortage of 18,000 electricians</span>.
                    Average salaries have risen to <span className="text-elec-yellow font-medium">£38,500</span> with contractors earning
                    <span className="text-elec-yellow font-medium"> £220+/day</span>. Green technologies like EV charging and solar
                    are driving <span className="text-green-400 font-medium">40%+ growth</span> in specialist roles.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                      <div className="text-2xl font-bold text-elec-yellow">{industryStats.averageSalary}</div>
                      <div className="text-[10px] text-white/60">Avg Salary</div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="text-2xl font-bold text-green-400">{industryStats.jobGrowth}</div>
                      <div className="text-[10px] text-white/60">Job Growth</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-400">{industryStats.activeElectricians}</div>
                      <div className="text-[10px] text-white/60">UK Electricians</div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="text-2xl font-bold text-purple-400">{industryStats.evGrowth}</div>
                      <div className="text-[10px] text-white/60">EV Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
              </div>
              Career Development Areas
            </h3>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs bg-elec-yellow/10">
              6 Sections
            </Badge>
          </div>

          {/* Career Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {careerSections.map((section) => (
              <SimpleCareerCard
                key={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                onClick={() => setActiveSection(section.id)}
                showComingSoon={section.id === "cpd"}
                stats={section.stats}
                badge={section.badge}
                accentColor={section.accentColor}
              />
            ))}
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Salary Expectations */}
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-base flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                    <PoundSterling className="h-4 w-4 text-green-400" />
                  </div>
                  2026 Salary Expectations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <div className="space-y-2">
                  {salaryData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-2 px-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/70">{item.role}</span>
                      <span className="text-green-400 font-medium">{item.salary}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/70">
                    Salaries vary by region. London rates typically 15-25% higher.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* High-Growth Sectors */}
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-base flex items-center gap-3 text-white">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                    <Zap className="h-4 w-4 text-blue-400" />
                  </div>
                  High-Growth Sectors 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <div className="space-y-2">
                  {growthSectors.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-2 px-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/70">{item.sector}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] ${
                          item.demand === "Very High" ? "bg-green-500/10 border-green-500/30 text-green-400" :
                          item.demand === "High" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                          "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        }`}>
                          {item.demand}
                        </Badge>
                        <span className="text-green-400 font-medium w-12 text-right">{item.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Rocket className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-white/70">
                    Net Zero targets driving massive investment in green technology skills.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Footer */}
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-4 relative">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex-shrink-0">
                    <Award className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Ready to advance your career?</h4>
                    <p className="text-xs text-white/60">Explore pathways, find courses, or track your professional development</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-initial h-10 border-elec-yellow/30 hover:border-elec-yellow/50 touch-manipulation active:scale-95 transition-all"
                    onClick={() => setActiveSection("pathways")}
                  >
                    Career Paths
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="accent"
                    className="flex-1 sm:flex-initial h-10 touch-manipulation active:scale-95 transition-all"
                    onClick={() => setActiveSection("courses")}
                  >
                    Find Courses
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-4">
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default CareerProgression;

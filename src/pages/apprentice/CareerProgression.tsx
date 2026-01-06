
import { useState } from "react";
import { GraduationCap, ArrowLeft, TrendingUp, PoundSterling, Users, Zap, Calendar, Award, ChevronRight, Sparkles, Info } from "lucide-react";
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

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 sm:p-3 bg-elec-yellow/10 rounded-xl border border-elec-yellow/20">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Career Progression
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">
                Your pathway to success in the electrical industry
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-0 sm:ml-[72px]">
            Explore career paths, find courses, track your CPD and build your professional future
          </p>
        </div>
        {activeSection && (
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto border-elec-yellow/30 hover:border-elec-yellow/50"
            onClick={handleBackToSections}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Career Hub
          </Button>
        )}
      </div>

      {activeSection === null ? (
        <>
          {/* Industry Stats Banner - Mobile Optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {quickFacts.map((fact, index) => (
              <Card
                key={index}
                className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-dark/50 overflow-hidden"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-elec-yellow/10 rounded-lg flex-shrink-0">
                      <div className="text-elec-yellow">
                        {fact.icon}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-bold text-elec-yellow truncate">
                        {fact.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground truncate">
                        {fact.label}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Welcome Section - Enhanced */}
          <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray via-elec-gray to-elec-dark/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-3xl" />
            <CardContent className="p-4 sm:p-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-elec-yellow" />
                    <span className="text-xs font-medium text-elec-yellow uppercase tracking-wider">
                      2026 UK Electrical Industry
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    Your Career Development Hub
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The UK electrical industry is booming with a <span className="text-elec-yellow font-medium">skills shortage of 18,000 electricians</span>.
                    Average salaries have risen to <span className="text-elec-yellow font-medium">£38,500</span> with contractors earning
                    <span className="text-elec-yellow font-medium"> £220+/day</span>. Green technologies like EV charging and solar
                    are driving <span className="text-green-400 font-medium">40%+ growth</span> in specialist roles.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-elec-dark/50 rounded-lg p-3 border border-elec-yellow/10">
                      <div className="text-2xl font-bold text-elec-yellow">{industryStats.averageSalary}</div>
                      <div className="text-[10px] text-muted-foreground">Avg Salary</div>
                    </div>
                    <div className="bg-elec-dark/50 rounded-lg p-3 border border-elec-yellow/10">
                      <div className="text-2xl font-bold text-green-400">{industryStats.jobGrowth}</div>
                      <div className="text-[10px] text-muted-foreground">Job Growth</div>
                    </div>
                    <div className="bg-elec-dark/50 rounded-lg p-3 border border-elec-yellow/10">
                      <div className="text-2xl font-bold text-blue-400">{industryStats.activeElectricians}</div>
                      <div className="text-[10px] text-muted-foreground">UK Electricians</div>
                    </div>
                    <div className="bg-elec-dark/50 rounded-lg p-3 border border-elec-yellow/10">
                      <div className="text-2xl font-bold text-purple-400">{industryStats.evGrowth}</div>
                      <div className="text-[10px] text-muted-foreground">EV Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Career Development Areas
            </h3>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
              6 Sections
            </Badge>
          </div>

          {/* Career Sections Grid - Enhanced Cards */}
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
            <Card className="border-green-500/20 bg-gradient-to-br from-elec-gray to-green-950/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-400">
                  <PoundSterling className="h-5 w-5" />
                  2026 Salary Expectations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {[
                    { role: "Apprentice (Year 1)", salary: "£16,000 - £20,000" },
                    { role: "Qualified Electrician", salary: "£32,000 - £42,000" },
                    { role: "Approved Electrician", salary: "£38,000 - £52,000" },
                    { role: "Supervisor / Manager", salary: "£48,000 - £68,000" },
                    { role: "Contractor (Self-employed)", salary: "£50,000 - £95,000+" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-1.5 border-b border-green-500/10 last:border-0">
                      <span className="text-muted-foreground">{item.role}</span>
                      <span className="text-green-400 font-medium">{item.salary}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  Salaries vary by region. London rates typically 15-25% higher.
                </p>
              </CardContent>
            </Card>

            {/* High-Growth Sectors */}
            <Card className="border-blue-500/20 bg-gradient-to-br from-elec-gray to-blue-950/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-blue-400">
                  <Zap className="h-5 w-5" />
                  High-Growth Sectors 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {[
                    { sector: "Electric Vehicle Charging", growth: "+45%", demand: "Very High" },
                    { sector: "Battery Storage (BESS)", growth: "+42%", demand: "Very High" },
                    { sector: "Heat Pump Installation", growth: "+38%", demand: "High" },
                    { sector: "Solar PV Systems", growth: "+35%", demand: "High" },
                    { sector: "Smart Building Systems", growth: "+28%", demand: "Growing" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-1.5 border-b border-blue-500/10 last:border-0">
                      <span className="text-muted-foreground">{item.sector}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] ${
                          item.demand === "Very High" ? "border-green-500/50 text-green-400" :
                          item.demand === "High" ? "border-blue-500/50 text-blue-400" :
                          "border-yellow-500/50 text-yellow-400"
                        }`}>
                          {item.demand}
                        </Badge>
                        <span className="text-green-400 font-medium w-12 text-right">{item.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  Net Zero targets driving massive investment in green technology skills.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Footer */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Award className="h-8 w-8 text-elec-yellow flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Ready to advance your career?</h4>
                    <p className="text-xs text-muted-foreground">Explore pathways, find courses, or track your professional development</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-initial border-elec-yellow/30 hover:border-elec-yellow/50"
                    onClick={() => setActiveSection("pathways")}
                  >
                    Career Paths
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="accent"
                    className="flex-1 sm:flex-initial"
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

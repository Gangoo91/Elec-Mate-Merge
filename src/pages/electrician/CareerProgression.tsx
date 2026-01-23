import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Compass,
  BookOpen,
  Award,
  ClipboardCheck,
  Briefcase,
  TrendingUp,
  MapPin,
  Zap,
  Battery,
  Sun,
  Building2,
  Cpu,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CareerPathways from "@/components/electrician/career/CareerPathways";
import CareerCourses from "@/components/electrician/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/electrician/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/electrician/career/ProfessionalAccreditation";
import CPDTracker from "@/components/electrician/career/CPDTracker";
import JobVacancies from "@/pages/electrician/JobVacancies";
import { CareerSectionList } from "@/components/electrician/career/CareerSectionList";
import { CareerListItem } from "@/components/electrician/career/CareerListItem";
import { OpportunityStack } from "@/components/electrician/career/OpportunityStack";
import { RoadmapTimeline } from "@/components/electrician/career/RoadmapTimeline";
import { cn } from "@/lib/utils";

// Section data
const careerSections = [
  {
    id: "pathways",
    title: "Career Pathways",
    subtitle: "Explore 6 specialist career routes",
    icon: Compass,
    color: "yellow" as const,
  },
  {
    id: "courses",
    title: "Training Courses",
    subtitle: "Professional qualifications & certifications",
    icon: BookOpen,
    color: "blue" as const,
  },
  {
    id: "accreditation",
    title: "Professional Bodies",
    subtitle: "IET, ECA, NAPIT membership",
    icon: Award,
    color: "green" as const,
  },
  {
    id: "education",
    title: "Further Education",
    subtitle: "HNC, HND & degree pathways",
    icon: GraduationCap,
    color: "purple" as const,
  },
  {
    id: "cpd",
    title: "CPD Tracker",
    subtitle: "Track your development hours",
    icon: ClipboardCheck,
    color: "orange" as const,
    comingSoon: true,
  },
  {
    id: "job-vacancies",
    title: "Job Vacancies",
    subtitle: "Browse live opportunities",
    icon: Briefcase,
    color: "green" as const,
    badge: "247",
  },
];

const opportunities = [
  {
    title: "EV Charging Specialist",
    description: "Install and maintain EV charging infrastructure",
    icon: Battery,
    color: "green",
    rate: "£280-420/day",
    requirement: "2919 + 3 years experience",
    growth: "+300% demand",
  },
  {
    title: "Data Centre Technician",
    description: "Support critical AI infrastructure systems",
    icon: Cpu,
    color: "blue",
    rate: "£320-480/day",
    requirement: "HV competence + cooling knowledge",
    growth: "AI boom driving expansion",
  },
  {
    title: "Heat Pump Engineer",
    description: "Install renewable heating systems",
    icon: Zap,
    color: "purple",
    rate: "£250-380/day",
    requirement: "MCS certification",
    growth: "Net Zero targets",
  },
  {
    title: "Solar PV Installer",
    description: "Design solar systems with battery storage",
    icon: Sun,
    color: "orange",
    rate: "£240-350/day",
    requirement: "2399 + MCS accreditation",
    growth: "Record installations",
  },
  {
    title: "Smart Building Engineer",
    description: "Integrate IoT and building automation",
    icon: Building2,
    color: "red",
    rate: "£300-450/day",
    requirement: "BMS knowledge",
    growth: "Smart city initiatives",
  },
  {
    title: "Project Manager",
    description: "Lead complex electrical projects",
    icon: Users,
    color: "cyan",
    rate: "£400-600/day",
    requirement: "Degree/HNC + 5+ years",
    growth: "Infrastructure investment",
  },
];

const marketTrends = [
  { label: "Net Zero Premium", value: "+25%", color: "green" },
  { label: "EV Infrastructure", value: "+300%", color: "green" },
  { label: "Smart Home", value: "+180%", color: "blue" },
  { label: "Data Centres", value: "+220%", color: "purple" },
];

const regionalRates = [
  { region: "London & SE", rate: "£350-500/day" },
  { region: "Manchester & NW", rate: "£280-400/day" },
  { region: "Scotland", rate: "£300-420/day" },
  { region: "Wales & SW", rate: "£260-380/day" },
];

const CareerProgression = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get("section") || null;

  const setActiveSection = (section: string | null) => {
    if (section) {
      setSearchParams({ section }, { replace: false });
    } else {
      searchParams.delete("section");
      setSearchParams(searchParams, { replace: false });
    }
  };

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
      case "job-vacancies":
        return <JobVacancies onBack={handleBackToSections} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen animate-fade-in">
      <Helmet>
        <title>Electrician Career Progression UK | JIB Timeline & CPD</title>
        <meta
          name="description"
          content="Explore UK electrician career progression: JIB grades, timelines, prerequisites, day rates, CPD, and pathways. BS 7671 18th Edition compliant."
        />
        <link rel="canonical" href="/electrician/career-progression" />
      </Helmet>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => activeSection ? handleBackToSections() : navigate("/electrician")}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl mr-3 h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                {activeSection ? "Career Progression" : "Career Progression"}
              </h1>
              {activeSection && (
                <p className="text-xs text-white/50 hidden sm:block">
                  {careerSections.find(s => s.id === activeSection)?.title}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {activeSection === null ? (
        <>
          {/* Hero Section */}
          <section className="border-b border-white/10 bg-gradient-to-b from-purple-500/10 to-[#1a1a1a]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="p-4 bg-purple-500/20 rounded-2xl border border-purple-500/20">
                  <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                    Plan your electrical career journey from apprentice to specialist. Explore JIB grades, qualifications, and high-demand roles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
            {/* Career Sections - 2 columns on desktop */}
            <div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 px-1">
                Explore
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CareerSectionList>
                  {careerSections.slice(0, 3).map((section) => (
                    <CareerListItem
                      key={section.id}
                      title={section.title}
                      subtitle={section.subtitle}
                      icon={section.icon}
                      color={section.color}
                      badge={section.badge}
                      comingSoon={section.comingSoon}
                      onClick={() => setActiveSection(section.id)}
                    />
                  ))}
                </CareerSectionList>
                <CareerSectionList>
                  {careerSections.slice(3).map((section) => (
                    <CareerListItem
                      key={section.id}
                      title={section.title}
                      subtitle={section.subtitle}
                      icon={section.icon}
                      color={section.color}
                      badge={section.badge}
                      comingSoon={section.comingSoon}
                      onClick={() => setActiveSection(section.id)}
                    />
                  ))}
                </CareerSectionList>
              </div>
            </div>

            {/* High-Demand Roles - 2 columns on desktop */}
            <div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 px-1">
                High-Demand Roles
              </p>
              <div className="hidden lg:grid lg:grid-cols-2 gap-4">
                <OpportunityStack opportunities={opportunities.slice(0, 3)} initialCount={3} />
                <OpportunityStack opportunities={opportunities.slice(3)} initialCount={3} />
              </div>
              <div className="lg:hidden">
                <OpportunityStack opportunities={opportunities} initialCount={3} />
              </div>
            </div>

            {/* Roadmap + Market Insights - Side by side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Development Roadmap */}
              <div>
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 px-1">
                  Your Roadmap
                </p>
                <RoadmapTimeline />
              </div>

              {/* Market Insights */}
              <div>
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3 px-1">
                  Market Insights
                </p>
                <div className="space-y-3">
                  {/* Trends */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-white">
                        Growth Sectors
                      </span>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                      {marketTrends.map((trend, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center px-4 py-3"
                        >
                          <span className="text-sm text-white/70">
                            {trend.label}
                          </span>
                          <span
                            className={cn(
                              "font-semibold text-sm",
                              trend.color === "green" && "text-green-400",
                              trend.color === "blue" && "text-blue-400",
                              trend.color === "purple" && "text-purple-400"
                            )}
                          >
                            {trend.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Regional Rates */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                      <MapPin className="h-4 w-4 text-elec-yellow" />
                      <span className="text-sm font-medium text-white">
                        Regional Day Rates
                      </span>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                      {regionalRates.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center px-4 py-3"
                        >
                          <span className="text-sm text-white/70">
                            {item.region}
                          </span>
                          <span className="font-semibold text-sm text-elec-yellow">
                            {item.rate}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Spacing */}
            <div className="h-4" />
          </main>
        </>
      ) : (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderSectionContent()}
          </motion.div>
        </main>
      )}
    </div>
  );
};

export default CareerProgression;

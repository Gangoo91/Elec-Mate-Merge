import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Compass,
  BookOpen,
  Award,
  ClipboardCheck,
  Briefcase,
  ChevronRight,
  TrendingUp,
  MapPin,
  Zap,
  Battery,
  Sun,
  Building2,
  Cpu,
  Users,
  Target,
  Calendar,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CareerPathways from "@/components/electrician/career/CareerPathways";
import CareerCourses from "@/components/electrician/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/electrician/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/electrician/career/ProfessionalAccreditation";
import CPDTracker from "@/components/electrician/career/CPDTracker";
import JobVacancies from "@/pages/electrician/JobVacancies";
import { useLiveMarketData } from "@/hooks/useLiveMarketData";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";

// Animation variants - Smooth, fast entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Career Section Card Component
interface CareerCardProps {
  id: string;
  title: string;
  description: string;
  icon: typeof GraduationCap;
  color: string;
  badge?: string;
  comingSoon?: boolean;
  onClick: () => void;
}

function CareerCard({ title, description, icon: Icon, color, badge, comingSoon, onClick }: CareerCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={!comingSoon ? { y: -2, scale: 1.01 } : {}}
      whileTap={!comingSoon ? { scale: 0.98 } : {}}
      onClick={!comingSoon ? onClick : undefined}
      className={cn(
        "relative glass-premium rounded-xl h-full min-h-[160px] cursor-pointer group overflow-hidden touch-manipulation",
        comingSoon && "opacity-70 cursor-not-allowed"
      )}
    >
      {/* Coming Soon Ribbon */}
      {comingSoon && (
        <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none z-10">
          <div className="absolute top-5 right-[-28px] w-36 bg-gradient-to-br from-amber-500 to-yellow-600 text-black text-xs font-bold py-1 text-center transform rotate-45 shadow-lg">
            Coming Soon
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && !comingSoon && (
        <div className="absolute top-3 right-3 z-10">
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            color === "purple" && "bg-purple-500/20 text-purple-300",
            color === "blue" && "bg-blue-500/20 text-blue-300",
            color === "green" && "bg-green-500/20 text-green-300",
            color === "yellow" && "bg-elec-yellow/20 text-elec-yellow",
            color === "orange" && "bg-orange-500/20 text-orange-300",
          )}>
            {badge}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col h-full">
        <div className={cn(
          "p-2.5 rounded-lg w-fit mb-4 transition-colors",
          color === "purple" && "bg-purple-500/10 group-hover:bg-purple-500/20 group-active:bg-purple-500/25",
          color === "blue" && "bg-blue-500/10 group-hover:bg-blue-500/20 group-active:bg-blue-500/25",
          color === "green" && "bg-green-500/10 group-hover:bg-green-500/20 group-active:bg-green-500/25",
          color === "yellow" && "bg-elec-yellow/10 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25",
          color === "orange" && "bg-orange-500/10 group-hover:bg-orange-500/20 group-active:bg-orange-500/25",
        )}>
          <Icon className={cn(
            "h-6 w-6",
            color === "purple" && "text-purple-400",
            color === "blue" && "text-blue-400",
            color === "green" && "text-green-400",
            color === "yellow" && "text-elec-yellow",
            color === "orange" && "text-orange-400",
          )} />
        </div>

        <h3 className={cn(
          "text-base font-semibold text-white mb-2 transition-colors",
          !comingSoon && color === "purple" && "group-hover:text-purple-400 group-active:text-purple-400",
          !comingSoon && color === "blue" && "group-hover:text-blue-400 group-active:text-blue-400",
          !comingSoon && color === "green" && "group-hover:text-green-400 group-active:text-green-400",
          !comingSoon && color === "yellow" && "group-hover:text-elec-yellow group-active:text-elec-yellow",
          !comingSoon && color === "orange" && "group-hover:text-orange-400 group-active:text-orange-400",
        )}>
          {title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed flex-1">
          {description}
        </p>

        {!comingSoon && (
          <div className="flex items-center gap-1 mt-3 text-white/40 group-hover:text-white/70 group-active:text-white/80 transition-colors">
            <span className="text-xs font-medium">Explore</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Opportunity Card Component
interface OpportunityCardProps {
  title: string;
  description: string;
  icon: typeof Zap;
  color: string;
  rate: string;
  requirement: string;
  growth: string;
}

function OpportunityCard({ title, description, icon: Icon, color, rate, requirement, growth }: OpportunityCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className="glass-premium rounded-xl p-5 h-full"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={cn(
          "p-2 rounded-lg",
          color === "green" && "bg-green-500/10",
          color === "blue" && "bg-blue-500/10",
          color === "purple" && "bg-purple-500/10",
          color === "orange" && "bg-orange-500/10",
          color === "red" && "bg-red-500/10",
          color === "cyan" && "bg-cyan-500/10",
        )}>
          <Icon className={cn(
            "h-5 w-5",
            color === "green" && "text-green-400",
            color === "blue" && "text-blue-400",
            color === "purple" && "text-purple-400",
            color === "orange" && "text-orange-400",
            color === "red" && "text-red-400",
            color === "cyan" && "text-cyan-400",
          )} />
        </div>
        <div className="flex-1">
          <h4 className={cn(
            "font-semibold text-base",
            color === "green" && "text-green-400",
            color === "blue" && "text-blue-400",
            color === "purple" && "text-purple-400",
            color === "orange" && "text-orange-400",
            color === "red" && "text-red-400",
            color === "cyan" && "text-cyan-400",
          )}>
            {title}
          </h4>
        </div>
      </div>

      <p className="text-sm text-white/70 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="space-y-2 text-sm">
        <div className={cn(
          "font-medium",
          color === "green" && "text-green-300",
          color === "blue" && "text-blue-300",
          color === "purple" && "text-purple-300",
          color === "orange" && "text-orange-300",
          color === "red" && "text-red-300",
          color === "cyan" && "text-cyan-300",
        )}>
          {rate}
        </div>
        <div className="text-white/60 text-xs">{requirement}</div>
        <div className="text-white/40 text-[11px]">{growth}</div>
      </div>
    </motion.div>
  );
}

// Stats Card Component
function StatsCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: typeof Zap; color: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="glass-premium rounded-xl p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className={cn(
          "p-2 rounded-lg",
          color === "yellow" && "bg-elec-yellow/10",
          color === "blue" && "bg-blue-500/10",
          color === "green" && "bg-green-500/10",
          color === "purple" && "bg-purple-500/10",
        )}>
          <Icon className={cn(
            "h-4 w-4",
            color === "yellow" && "text-elec-yellow",
            color === "blue" && "text-blue-400",
            color === "green" && "text-green-400",
            color === "purple" && "text-purple-400",
          )} />
        </div>
        <div className="text-right">
          <div className={cn(
            "text-xl font-bold",
            color === "yellow" && "text-elec-yellow",
            color === "blue" && "text-blue-400",
            color === "green" && "text-green-400",
            color === "purple" && "text-purple-400",
          )}>
            {value}
          </div>
          <p className="text-xs text-white/60 mt-0.5">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Section data
const careerSections = [
  {
    id: "pathways",
    title: "Career Pathways",
    description: "Explore specialisations from EV charging to data centres",
    icon: Compass,
    color: "yellow",
    badge: "Most Popular",
  },
  {
    id: "courses",
    title: "Training Courses",
    description: "Professional qualifications and certifications",
    icon: BookOpen,
    color: "blue",
    badge: "350+ Courses",
  },
  {
    id: "accreditation",
    title: "Professional Bodies",
    description: "IET, ECA, NAPIT membership and accreditation",
    icon: Award,
    color: "green",
  },
  {
    id: "education",
    title: "Further Education",
    description: "HNC, HND, degree pathways and apprenticeships",
    icon: GraduationCap,
    color: "purple",
  },
  {
    id: "cpd",
    title: "CPD Tracker",
    description: "Track continuing professional development hours",
    icon: ClipboardCheck,
    color: "orange",
    comingSoon: true,
  },
  {
    id: "job-vacancies",
    title: "Job Vacancies",
    description: "Browse current electrical opportunities",
    icon: Briefcase,
    color: "green",
  },
];

const opportunities = [
  {
    title: "EV Charging Specialist",
    description: "Design, install and maintain electric vehicle charging infrastructure",
    icon: Battery,
    color: "green",
    rate: "£280-420/day",
    requirement: "Required: 2919 + 3 years experience",
    growth: "Growth: 300% increase over 3 years",
  },
  {
    title: "Data Centre Technician",
    description: "Support critical AI infrastructure with advanced electrical systems",
    icon: Cpu,
    color: "blue",
    rate: "£320-480/day",
    requirement: "Required: HV competence + cooling knowledge",
    growth: "Growth: AI boom driving expansion",
  },
  {
    title: "Heat Pump Engineer",
    description: "Install renewable heating systems and heat pump technology",
    icon: Zap,
    color: "purple",
    rate: "£250-380/day",
    requirement: "Required: MCS certification",
    growth: "Growth: Net Zero targets driving demand",
  },
  {
    title: "Solar PV Installer",
    description: "Design and install solar systems with battery storage",
    icon: Sun,
    color: "orange",
    rate: "£240-350/day",
    requirement: "Required: 2399 + MCS accreditation",
    growth: "Growth: Record installations year on year",
  },
  {
    title: "Smart Building Engineer",
    description: "Integrate IoT systems and intelligent building automation",
    icon: Building2,
    color: "red",
    rate: "£300-450/day",
    requirement: "Required: BMS knowledge",
    growth: "Growth: Smart city initiatives accelerating",
  },
  {
    title: "Project Manager",
    description: "Lead complex electrical projects from design to commissioning",
    icon: Users,
    color: "cyan",
    rate: "£400-600/day",
    requirement: "Required: Degree/HNC + 5+ years",
    growth: "Growth: Infrastructure investment boom",
  },
];

const CareerProgression = () => {
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
  const { marketData } = useLiveMarketData();

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
    <div className="bg-gradient-to-b from-elec-dark via-elec-dark to-elec-dark/95  ">
      <Helmet>
        <title>Electrician Career Progression UK | JIB Timeline & CPD</title>
        <meta name="description" content="Explore UK electrician career progression: JIB grades, timelines, prerequisites, day rates, CPD, and pathways. BS 7671 18th Edition compliant." />
        <link rel="canonical" href="/electrician/career-progression" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8  ">
        {/* Back Button Header */}
        <div className="flex items-center justify-between">
          {!activeSection ? (
            <Link to="/electrician">
              <Button variant="ghost" className="gap-2 text-white/60 hover:text-white hover:bg-white/10 h-11 touch-manipulation active:scale-[0.98] -ml-2 px-3">
                <ArrowLeft className="h-5 w-5" />
                Back
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              onClick={handleBackToSections}
              className="gap-2 text-white/60 hover:text-white hover:bg-white/10 h-11 touch-manipulation active:scale-[0.98] -ml-2 px-3"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Sections
            </Button>
          )}
        </div>

        {activeSection === null ? (
          <>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden bg-elec-gray/50 border border-purple-500/20 rounded-2xl"
            >
              {/* Gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500" />

              <div className="relative z-10 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <GraduationCap className="h-8 w-8 text-purple-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                      Career <span className="text-purple-400">Progression</span>
                    </h1>

                    <p className="text-sm text-white/60 mt-1">
                      JIB grades, professional training & specialist pathways
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              <StatsCard
                label="Specialist Pathways"
                value={marketData?.careerpathways || "15+"}
                icon={Compass}
                color="yellow"
              />
              <StatsCard
                label="Training Courses"
                value={marketData?.totalCourses || "350+"}
                icon={BookOpen}
                color="blue"
              />
              <StatsCard
                label="Salary Range"
                value={marketData?.professionalRange || "£30k-£85k+"}
                icon={TrendingUp}
                color="green"
              />
              <StatsCard
                label="Growth Forecast"
                value="18%"
                icon={Rocket}
                color="purple"
              />
            </motion.div>

            {/* Career Sections Grid */}
            <div>
              <div className="flex items-center gap-2 px-1 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <h2 className="text-lg font-semibold text-white">Explore Career Options</h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {careerSections.map((section) => (
                  <CareerCard
                    key={section.id}
                    {...section}
                    onClick={() => setActiveSection(section.id)}
                  />
                ))}
              </motion.div>
            </div>

            {/* High-Demand Opportunities */}
            <div>
              <div className="flex items-center gap-2 px-1 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <h2 className="text-lg font-semibold text-white">High-Demand Opportunities</h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {opportunities.map((opp, index) => (
                  <OpportunityCard key={index} {...opp} />
                ))}
              </motion.div>
            </div>

            {/* Development Roadmap */}
            <div>
              <div className="flex items-center gap-2 px-1 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <h2 className="text-lg font-semibold text-white">Development Roadmap</h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Immediate Actions */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <Target className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <h3 className="font-semibold text-white">Immediate Actions</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      "Update CV with latest certifications",
                      "Research emerging technology training",
                      "Join professional networking groups",
                      "Review JIB grade requirements",
                      "Set up job alerts for specialist roles",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 3-Month Goals */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white">3-Month Goals</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      "Book specialist training courses",
                      "Attend industry trade shows",
                      "Research day rates vs salary",
                      "Apply for professional membership",
                      "Build portfolio of specialist work",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Long-term Strategy */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Rocket className="h-4 w-4 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white">Long-term Strategy</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      "Complete advanced qualifications",
                      "Build subject matter expertise",
                      "Consider HNC/HND/Degree pathway",
                      "Evaluate contracting vs employment",
                      "Explore business ownership",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            {/* Industry Insights */}
            <div>
              <div className="flex items-center gap-2 px-1 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                <h2 className="text-lg font-semibold text-white">Industry Insights</h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Market Trends */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <h3 className="font-semibold text-white">Market Trends</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Net Zero Skills Premium", value: "+25%", color: "green" },
                      { label: "EV Infrastructure Demand", value: "+300%", color: "green" },
                      { label: "Smart Home Integration", value: "+180%", color: "blue" },
                      { label: "Data Centre Growth", value: "+220%", color: "purple" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-white/80">{item.label}</span>
                        <span className={cn(
                          "font-semibold text-sm",
                          item.color === "green" && "text-green-400",
                          item.color === "blue" && "text-blue-400",
                          item.color === "purple" && "text-purple-400",
                        )}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Regional Rates */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-elec-yellow" />
                    <h3 className="font-semibold text-white">Regional Day Rates</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { region: "London & South East", rate: "£350-500/day" },
                      { region: "Manchester & North West", rate: "£280-400/day" },
                      { region: "Scotland", rate: "£300-420/day" },
                      { region: "Wales & South West", rate: "£260-380/day" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-white/80">{item.region}</span>
                        <span className="font-semibold text-sm text-elec-yellow">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSectionContent()}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CareerProgression;

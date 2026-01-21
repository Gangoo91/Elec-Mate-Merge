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
  comingSoon?: boolean;
  onClick: () => void;
}

function CareerCard({ title, description, icon: Icon, color, comingSoon, onClick }: CareerCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={!comingSoon ? { y: -2, scale: 1.01 } : {}}
      whileTap={!comingSoon ? { scale: 0.98 } : {}}
      onClick={!comingSoon ? onClick : undefined}
      className={cn(
        "relative glass-premium rounded-xl h-full cursor-pointer group overflow-hidden touch-manipulation",
        comingSoon && "opacity-60 cursor-not-allowed"
      )}
    >
      {/* Card Content - Horizontal layout with icon and content side by side */}
      <div className="p-4 sm:p-5 flex flex-col h-full">
        {/* Icon + Title Row */}
        <div className="flex items-start gap-3 mb-3">
          <div className={cn(
            "p-2.5 rounded-xl flex-shrink-0 transition-colors",
            color === "purple" && "bg-purple-500/10 group-hover:bg-purple-500/20 group-active:bg-purple-500/25",
            color === "blue" && "bg-blue-500/10 group-hover:bg-blue-500/20 group-active:bg-blue-500/25",
            color === "green" && "bg-green-500/10 group-hover:bg-green-500/20 group-active:bg-green-500/25",
            color === "yellow" && "bg-elec-yellow/10 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/25",
            color === "orange" && "bg-orange-500/10 group-hover:bg-orange-500/20 group-active:bg-orange-500/25",
          )}>
            <Icon className={cn(
              "h-5 w-5 sm:h-6 sm:w-6",
              color === "purple" && "text-purple-400",
              color === "blue" && "text-blue-400",
              color === "green" && "text-green-400",
              color === "yellow" && "text-elec-yellow",
              color === "orange" && "text-orange-400",
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-base sm:text-lg font-semibold text-white transition-colors leading-tight",
              !comingSoon && color === "purple" && "group-hover:text-purple-400 group-active:text-purple-400",
              !comingSoon && color === "blue" && "group-hover:text-blue-400 group-active:text-blue-400",
              !comingSoon && color === "green" && "group-hover:text-green-400 group-active:text-green-400",
              !comingSoon && color === "yellow" && "group-hover:text-elec-yellow group-active:text-elec-yellow",
              !comingSoon && color === "orange" && "group-hover:text-orange-400 group-active:text-orange-400",
            )}>
              {title}
            </h3>
            {/* Subtle Coming Soon text below title */}
            {comingSoon && (
              <p className="text-xs text-amber-400/80 mt-1">Coming Soon</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed flex-1">
          {description}
        </p>

        {/* Explore CTA */}
        {!comingSoon && (
          <div className="flex items-center gap-1.5 mt-4 text-white/50 group-hover:text-white/80 group-active:text-white/80 transition-colors">
            <span className="text-sm font-medium">Explore</span>
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
      className="glass-premium rounded-xl p-3 sm:p-5 h-full flex-shrink-0 w-[280px] sm:w-auto"
    >
      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className={cn(
          "p-1.5 sm:p-2 rounded-lg flex-shrink-0",
          color === "green" && "bg-green-500/10",
          color === "blue" && "bg-blue-500/10",
          color === "purple" && "bg-purple-500/10",
          color === "orange" && "bg-orange-500/10",
          color === "red" && "bg-red-500/10",
          color === "cyan" && "bg-cyan-500/10",
        )}>
          <Icon className={cn(
            "h-4 w-4 sm:h-5 sm:w-5",
            color === "green" && "text-green-400",
            color === "blue" && "text-blue-400",
            color === "purple" && "text-purple-400",
            color === "orange" && "text-orange-400",
            color === "red" && "text-red-400",
            color === "cyan" && "text-cyan-400",
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-semibold text-sm sm:text-base leading-tight",
            color === "green" && "text-green-400",
            color === "blue" && "text-blue-400",
            color === "purple" && "text-purple-400",
            color === "orange" && "text-orange-400",
            color === "red" && "text-red-400",
            color === "cyan" && "text-cyan-400",
          )}>
            {title}
          </h4>
          {/* Rate shown inline on mobile */}
          <div className={cn(
            "sm:hidden font-medium text-xs mt-0.5",
            color === "green" && "text-green-300",
            color === "blue" && "text-blue-300",
            color === "purple" && "text-purple-300",
            color === "orange" && "text-orange-300",
            color === "red" && "text-red-300",
            color === "cyan" && "text-cyan-300",
          )}>
            {rate}
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-4 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
        {description}
      </p>

      <div className="space-y-1 sm:space-y-2 text-sm">
        {/* Rate hidden on mobile (shown above) */}
        <div className={cn(
          "hidden sm:block font-medium",
          color === "green" && "text-green-300",
          color === "blue" && "text-blue-300",
          color === "purple" && "text-purple-300",
          color === "orange" && "text-orange-300",
          color === "red" && "text-red-300",
          color === "cyan" && "text-cyan-300",
        )}>
          {rate}
        </div>
        <div className="text-white/60 text-[11px] sm:text-xs line-clamp-1">{requirement}</div>
        <div className="text-white/40 text-[10px] sm:text-[11px] line-clamp-1">{growth}</div>
      </div>
    </motion.div>
  );
}

// Stats Card Component - Mobile optimized
function StatsCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: typeof Zap; color: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="glass-premium rounded-xl p-3 sm:p-4 flex-shrink-0 min-w-[140px] sm:min-w-0"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={cn(
          "p-1.5 sm:p-2 rounded-lg",
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
        <div>
          <div className={cn(
            "text-base sm:text-xl font-bold leading-tight",
            color === "yellow" && "text-elec-yellow",
            color === "blue" && "text-blue-400",
            color === "green" && "text-green-400",
            color === "purple" && "text-purple-400",
          )}>
            {value}
          </div>
          <p className="text-[10px] sm:text-xs text-white/60">{label}</p>
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
  },
  {
    id: "courses",
    title: "Training Courses",
    description: "Professional qualifications and certifications",
    icon: BookOpen,
    color: "blue",
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
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
            {/* Hero Section - Compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden bg-elec-gray/50 border border-purple-500/20 rounded-xl sm:rounded-2xl"
            >
              {/* Gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500" />

              <div className="relative z-10 p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Hide icon on mobile, show on sm+ */}
                  <div className="hidden sm:flex flex-shrink-0 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <GraduationCap className="h-8 w-8 text-purple-400" />
                  </div>
                  {/* Small icon on mobile only */}
                  <div className="sm:hidden flex-shrink-0 p-2 rounded-lg bg-purple-500/10">
                    <GraduationCap className="h-5 w-5 text-purple-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-lg sm:text-2xl font-semibold text-white leading-tight">
                      Career <span className="text-purple-400">Progression</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-white/60 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
                      JIB grades & specialist pathways
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Bar - Horizontal scroll on mobile */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex sm:grid sm:grid-cols-4 gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
            >
              <StatsCard
                label="Pathways"
                value={marketData?.careerpathways || "15+"}
                icon={Compass}
                color="yellow"
              />
              <StatsCard
                label="Courses"
                value={marketData?.totalCourses || "350+"}
                icon={BookOpen}
                color="blue"
              />
              <StatsCard
                label="Salary"
                value={marketData?.professionalRange || "£30-85k"}
                icon={TrendingUp}
                color="green"
              />
              <StatsCard
                label="Growth"
                value="18%"
                icon={Rocket}
                color="purple"
              />
            </motion.div>

            {/* Career Sections Grid */}
            <div>
              <div className="flex items-center gap-2 px-1 mb-3 sm:mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <h2 className="text-base sm:text-lg font-semibold text-white">Explore Career Options</h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
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
              <div className="flex items-center gap-2 px-1 mb-3 sm:mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <h2 className="text-base sm:text-lg font-semibold text-white">High-Demand Opportunities</h2>
              </div>

              {/* Horizontal scroll on mobile, grid on desktop */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
              >
                {opportunities.map((opp, index) => (
                  <OpportunityCard key={index} {...opp} />
                ))}
              </motion.div>
            </div>

            {/* Development Roadmap */}
            <div>
              <div className="flex items-center gap-2 px-1 mb-3 sm:mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <h2 className="text-base sm:text-lg font-semibold text-white">Development Roadmap</h2>
              </div>

              {/* Horizontal scroll on mobile, grid on desktop */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex md:grid md:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
              >
                {/* Immediate Actions */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-3 sm:p-5 flex-shrink-0 w-[260px] sm:w-[280px] md:w-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow" />
                    </div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">Immediate</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {[
                      "Update CV with certifications",
                      "Research tech training",
                      "Join networking groups",
                      "Review JIB requirements",
                      "Set up job alerts",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 3-Month Goals */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-3 sm:p-5 flex-shrink-0 w-[260px] sm:w-[280px] md:w-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">3-Month</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {[
                      "Book specialist courses",
                      "Attend trade shows",
                      "Research rates vs salary",
                      "Apply for membership",
                      "Build specialist portfolio",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Long-term Strategy */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-3 sm:p-5 flex-shrink-0 w-[260px] sm:w-[280px] md:w-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">Long-term</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {[
                      "Complete qualifications",
                      "Build expertise",
                      "HNC/HND/Degree pathway",
                      "Contracting vs employment",
                      "Explore business ownership",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
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
              <div className="flex items-center gap-2 px-1 mb-3 sm:mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                <h2 className="text-base sm:text-lg font-semibold text-white">Industry Insights</h2>
              </div>

              {/* Horizontal scroll on mobile, grid on desktop */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex md:grid md:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
              >
                {/* Market Trends */}
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-3 sm:p-5 flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                    <h3 className="font-semibold text-white text-sm sm:text-base">Market Trends</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { label: "Net Zero Premium", value: "+25%", color: "green" },
                      { label: "EV Infrastructure", value: "+300%", color: "green" },
                      { label: "Smart Home", value: "+180%", color: "blue" },
                      { label: "Data Centres", value: "+220%", color: "purple" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 sm:p-3 bg-white/5 rounded-lg">
                        <span className="text-xs sm:text-sm text-white/80">{item.label}</span>
                        <span className={cn(
                          "font-semibold text-xs sm:text-sm",
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
                <motion.div variants={itemVariants} className="glass-premium rounded-xl p-3 sm:p-5 flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                    <h3 className="font-semibold text-white text-sm sm:text-base">Regional Rates</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { region: "London & SE", rate: "£350-500/day" },
                      { region: "Manchester & NW", rate: "£280-400/day" },
                      { region: "Scotland", rate: "£300-420/day" },
                      { region: "Wales & SW", rate: "£260-380/day" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 sm:p-3 bg-white/5 rounded-lg">
                        <span className="text-xs sm:text-sm text-white/80">{item.region}</span>
                        <span className="font-semibold text-xs sm:text-sm text-elec-yellow">{item.rate}</span>
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

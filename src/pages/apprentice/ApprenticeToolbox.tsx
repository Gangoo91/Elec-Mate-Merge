import {
  MessageCircle,
  FileText,
  PoundSterling,
  Users,
  Clock,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Award,
  Banknote,
  ChevronRight,
  Wrench,
  GraduationCap,
  Target,
  ArrowLeft,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import ActiveToolContent from '@/components/apprentice/toolbox/ActiveToolContent';
import useSEO from '@/hooks/useSEO';

interface ToolboxItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  link: string;
  description: string;
  category: 'essential' | 'skills' | 'wellbeing';
  badge?: string;
}

const toolboxItems: ToolboxItem[] = [
  {
    id: 'apprenticeship-expectations',
    title: 'Apprenticeship Expectations',
    icon: CheckCircle,
    link: '/apprentice/toolbox/apprenticeship-expectations',
    description:
      'What to expect during your electrical apprenticeship journey - roles, responsibilities and milestones',
    category: 'essential',
    badge: 'Start Here',
  },
  {
    id: 'off-job-training',
    title: 'Off-the-Job Training',
    icon: Clock,
    link: '/apprentice/toolbox/off-job-training-guide',
    description: 'Understanding your 20% off-the-job training requirements and what counts',
    category: 'essential',
  },
  {
    id: 'apprenticeship-funding',
    title: 'Apprenticeship Funding',
    icon: Banknote,
    link: '/apprentice/toolbox/apprenticeship-funding',
    description: 'How apprenticeship funding works - levy, co-investment and CITB grants explained',
    category: 'essential',
    badge: '2026 Updated',
  },
  {
    id: 'end-point-assessment',
    title: 'End Point Assessment (EPA)',
    icon: Award,
    link: '/apprentice/toolbox/end-point-assessment',
    description: 'Everything about your final EPA - components, grades and preparation tips',
    category: 'essential',
  },
  {
    id: 'rights-and-pay',
    title: 'Apprentice Rights & Pay',
    icon: PoundSterling,
    link: '/apprentice/rights-and-pay',
    description: 'National wage tiers, your rights on site, and support when things go wrong',
    category: 'essential',
    badge: 'April 2026',
  },
  {
    id: 'site-jargon',
    title: 'Site Jargon & Terminology',
    icon: MessageCircle,
    link: '/apprentice/toolbox/site-jargon',
    description:
      "Common electrical and construction terms you'll hear on site - don't get caught out!",
    category: 'skills',
  },
  {
    id: 'portfolio-building',
    title: 'Portfolio Building',
    icon: FileText,
    link: '/apprentice/toolbox/portfolio-building',
    description: 'How to document your work and build a professional portfolio for EPA',
    category: 'skills',
  },
  {
    id: 'communication-skills',
    title: 'Communication Skills',
    icon: Users,
    link: '/apprentice/toolbox/communication-skills',
    description: 'How to speak with supervisors, report problems, and take feedback professionally',
    category: 'skills',
  },
  {
    id: 'study-tips',
    title: 'Study Tips & Techniques',
    icon: BookOpen,
    link: '/apprentice/toolbox/study-tips',
    description: 'Effective learning strategies for electrical theory and practical skills',
    category: 'skills',
  },
  {
    id: 'learning-from-mistakes',
    title: 'Learning from Mistakes',
    icon: AlertTriangle,
    link: '/apprentice/toolbox/learning-from-mistakes',
    description: 'How to handle errors professionally and turn them into learning opportunities',
    category: 'wellbeing',
  },
  {
    id: 'time-management',
    title: 'Time Management & Balance',
    icon: Calendar,
    link: '/apprentice/toolbox/time-management',
    description:
      'Manage your apprenticeship workload whilst maintaining a healthy work-life balance',
    category: 'wellbeing',
  },
];

const categories = [
  { id: 'essential', label: 'Essential Knowledge', count: 5 },
  { id: 'skills', label: 'Skills Development', count: 4 },
  { id: 'wellbeing', label: 'Wellbeing & Growth', count: 2 },
];

const ApprenticeToolbox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTool = searchParams.get('tool') || null;
  const setActiveTool = (tool: string | null) => {
    if (tool) {
      setSearchParams({ tool }, { replace: false });
    } else {
      searchParams.delete('tool');
      setSearchParams(searchParams, { replace: false });
    }
  };

  useSEO({
    title: 'Apprentice Guidance Area | Elec-Mate',
    description:
      'Essential resources, skills development, and support for UK electrical apprentices. 11 guidance topics covering funding, EPA, rights, and more.',
  });

  if (activeTool) {
    return <ActiveToolContent activeTool={activeTool} onClose={() => setActiveTool(null)} />;
  }

  let globalIndex = 0;

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
          <Link to="/apprentice">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Apprentice Hub
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 border border-elec-yellow/20">
                    <Wrench className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-elec-yellow/30 to-transparent" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                  Apprentice Guidance Area
                </h1>
                <p className="text-base sm:text-lg text-white leading-relaxed">
                  Essential resources, skills development, and support for UK electrical apprentices
                </p>
              </div>

              {/* Stats pills - desktop only */}
              <div className="hidden lg:flex items-center gap-3 pb-1">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white">
                    <span className="font-semibold text-white">11</span> topics
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-sm text-white">
                    <span className="font-semibold text-white">3</span> categories
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Visible on ALL devices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-10">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1.5 sm:gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] py-3 px-2 sm:p-4">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-bold text-foreground leading-tight">11</p>
                <p className="text-[10px] sm:text-xs text-white">Guidance Topics</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1.5 sm:gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] py-3 px-2 sm:p-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                  3-4 yrs
                </p>
                <p className="text-[10px] sm:text-xs text-white">Duration</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1.5 sm:gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] py-3 px-2 sm:p-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-bold text-foreground leading-tight">20%</p>
                <p className="text-[10px] sm:text-xs text-white">Off-Job Training</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1.5 sm:gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] py-3 px-2 sm:p-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                  Level 3
                </p>
                <p className="text-[10px] sm:text-xs text-white">NVQ Qualification</p>
              </div>
            </div>
          </div>

          {/* Category Sections */}
          {categories.map((category) => {
            const categoryItems = toolboxItems.filter((item) => item.category === category.id);
            if (categoryItems.length === 0) return null;

            return (
              <section key={category.id} className="mb-12">
                {/* Dot + Line Divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">{category.label}</h2>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <span className="text-xs text-white uppercase tracking-wider font-medium hidden sm:block">
                    {category.count} topics
                  </span>
                </div>

                {/* Cards Grid — matches CourseCard pattern */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {categoryItems.map((item) => {
                    const IconComponent = item.icon;
                    const cardIndex = globalIndex++;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: cardIndex * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={item.link}
                          className="block h-full"
                          aria-label={`View ${item.title}`}
                        >
                          <div
                            className="
                              group relative overflow-hidden h-full min-h-[140px] sm:min-h-[180px]
                              bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                              backdrop-blur-xl
                              border border-white/10
                              rounded-xl sm:rounded-2xl
                              p-3 sm:p-5
                              transition-all duration-300 ease-out
                              touch-manipulation
                              hover:border-elec-yellow/40
                              hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]
                              hover:translate-y-[-2px]
                              active:scale-[0.98] active:translate-y-0
                            "
                          >
                            {/* Top accent line */}
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-elec-yellow sm:bg-gradient-to-r sm:from-transparent sm:via-elec-yellow/60 sm:to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                            {/* Content */}
                            <div className="relative flex flex-col h-full">
                              {/* Top row: Icon + Badge */}
                              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10 flex-shrink-0">
                                  <IconComponent
                                    className="h-4 w-4 sm:h-6 sm:w-6 text-elec-yellow"
                                    strokeWidth={1.8}
                                  />
                                </div>

                                {item.badge && (
                                  <div className="inline-flex px-2 py-0.5 rounded-full flex-shrink-0 bg-elec-yellow/15 border border-elec-yellow/25">
                                    <span className="text-[10px] sm:text-xs font-bold text-elec-yellow uppercase tracking-wide whitespace-nowrap">
                                      {item.badge}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Title */}
                              <h3 className="text-[13px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-elec-yellow transition-colors duration-200">
                                {item.title}
                              </h3>

                              {/* Description - hidden on mobile */}
                              <p className="text-xs text-white line-clamp-2 mb-auto leading-relaxed hidden sm:block">
                                {item.description}
                              </p>

                              {/* Bottom row: spacer + Arrow */}
                              <div className="flex items-center justify-end mt-auto pt-2 sm:pt-3">
                                <ChevronRight className="w-4 h-4 text-white group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-200" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Need More Help */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-elec-yellow" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Need More Help?</h2>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Mental Health CTA */}
              <Link to="/apprentice/mental-health" className="block h-full">
                <div
                  className="
                    group relative overflow-hidden h-full min-h-[140px] sm:min-h-[180px]
                    bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                    backdrop-blur-xl
                    border border-white/10
                    rounded-xl sm:rounded-2xl
                    p-3 sm:p-5
                    transition-all duration-300 ease-out
                    touch-manipulation
                    hover:border-elec-yellow/40
                    hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]
                    hover:translate-y-[-2px]
                    active:scale-[0.98] active:translate-y-0
                  "
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-elec-yellow sm:bg-gradient-to-r sm:from-transparent sm:via-elec-yellow/60 sm:to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col h-full">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10 flex-shrink-0 w-fit mb-2 sm:mb-3">
                      <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-elec-yellow" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[13px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug mb-1 sm:mb-1.5 group-hover:text-elec-yellow transition-colors duration-200">
                      Mental Health Support
                    </h3>
                    <p className="text-xs text-white line-clamp-2 mb-auto leading-relaxed hidden sm:block">
                      Resources, crisis support, and wellbeing tools for apprentices
                    </p>
                    <div className="flex items-center justify-end mt-auto pt-2 sm:pt-3">
                      <ChevronRight className="w-4 h-4 text-white group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Career Paths CTA */}
              <Link to="/apprentice/professional-development" className="block h-full">
                <div
                  className="
                    group relative overflow-hidden h-full min-h-[140px] sm:min-h-[180px]
                    bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                    backdrop-blur-xl
                    border border-white/10
                    rounded-xl sm:rounded-2xl
                    p-3 sm:p-5
                    transition-all duration-300 ease-out
                    touch-manipulation
                    hover:border-elec-yellow/40
                    hover:shadow-[0_8px_32px_rgba(250,204,21,0.15)]
                    hover:translate-y-[-2px]
                    active:scale-[0.98] active:translate-y-0
                  "
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-elec-yellow sm:bg-gradient-to-r sm:from-transparent sm:via-elec-yellow/60 sm:to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col h-full">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10 flex-shrink-0 w-fit mb-2 sm:mb-3">
                      <TrendingUp
                        className="h-4 w-4 sm:h-6 sm:w-6 text-elec-yellow"
                        strokeWidth={1.8}
                      />
                    </div>
                    <h3 className="text-[13px] sm:text-[15px] font-semibold text-white leading-tight sm:leading-snug mb-1 sm:mb-1.5 group-hover:text-elec-yellow transition-colors duration-200">
                      Career Paths
                    </h3>
                    <p className="text-xs text-white line-clamp-2 mb-auto leading-relaxed hidden sm:block">
                      Explore career pathways, certifications, and professional development
                    </p>
                    <div className="flex items-center justify-end mt-auto pt-2 sm:pt-3">
                      <ChevronRight className="w-4 h-4 text-white group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ApprenticeToolbox;

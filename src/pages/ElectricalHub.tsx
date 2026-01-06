/**
 * ElectricalHub
 *
 * Premium electrician command center with glass morphism styling,
 * real-time business stats, and best-in-class mobile experience.
 * Yellow/gold theme throughout.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Brain,
  Shield,
  Calculator,
  FileText,
  PoundSterling,
  Briefcase,
  Wrench,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDashboardData } from '@/hooks/useDashboardData';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { useAuth } from '@/contexts/AuthContext';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// Premium Hero Component
function ElectricalHero() {
  const { profile } = useAuth();
  const { business } = useDashboardData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'Electrician';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden glass-premium rounded-2xl glow-yellow"
    >
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Zap className="h-8 w-8 text-elec-yellow" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-elec-yellow mb-1">
              <Sparkles className="h-3 w-3" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                Electrical Hub
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
              {getGreeting()}, <span className="text-elec-yellow">{firstName}</span>
            </h1>

            <p className="text-sm text-white/70 mt-1">
              Professional tools for qualified electricians
            </p>

            {/* Status badges */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {business.activeQuotes > 0 && (
                <Badge
                  variant="outline"
                  className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[10px] sm:text-xs"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  {business.activeQuotes} active quotes
                </Badge>
              )}
              {business.overdueInvoices > 0 ? (
                <Badge
                  variant="outline"
                  className="bg-red-500/10 border-red-500/30 text-red-400 text-[10px] sm:text-xs"
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {business.overdueInvoices} overdue
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-500/10 border-green-500/30 text-green-400 text-[10px] sm:text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  All paid
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Bar Component
function ElectricalStatsBar() {
  const { business, certificates, isLoading } = useDashboardData();

  const statItems = [
    {
      label: 'Active Quotes',
      value: business.activeQuotes,
      icon: FileText,
    },
    {
      label: 'Quote Value',
      value: business.quoteValue,
      prefix: '£',
      formatAsCurrency: true,
      icon: PoundSterling,
    },
    {
      label: 'Certificates',
      value: certificates.total,
      icon: Zap,
    },
    {
      label: 'Overdue',
      value: business.overdueInvoices,
      icon: business.overdueInvoices === 0 ? CheckCircle : AlertCircle,
      variant: business.overdueInvoices === 0 ? 'success' : 'danger',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[100px] rounded-xl glass-premium animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-4 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0"
    >
      {statItems.map((stat) => {
        const Icon = stat.icon;
        const isSuccess = stat.variant === 'success';
        const isDanger = stat.variant === 'danger';

        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="flex-shrink-0 w-[140px] snap-start sm:w-full"
          >
            <div className="glass-premium rounded-xl p-4 h-[100px]">
              <div className="flex items-start justify-between gap-2">
                <div className={cn(
                  'p-2 rounded-lg',
                  isSuccess ? 'bg-green-500/10' : isDanger ? 'bg-red-500/10' : 'bg-elec-yellow/10'
                )}>
                  <Icon className={cn(
                    'h-4 w-4',
                    isSuccess ? 'text-green-500' : isDanger ? 'text-red-500' : 'text-elec-yellow'
                  )} />
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    {stat.formatAsCurrency ? (
                      <span className="text-xl font-bold text-elec-yellow">
                        {business.formattedQuoteValue}
                      </span>
                    ) : (
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        className={cn(
                          'text-xl font-bold',
                          isSuccess ? 'text-green-500' : isDanger ? 'text-red-500' : 'text-elec-yellow'
                        )}
                      />
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Featured Card Component
function FeaturedCard() {
  return (
    <Link to="/electrician/agent-selector" className="block group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden glass-premium rounded-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-elec-yellow/[0.08] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-elec-yellow/10 mb-4 group-hover:bg-elec-yellow/20 transition-colors">
            <Sparkles className="h-8 w-8 text-elec-yellow" />
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            AI Design Consultation
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto mb-4">
            8 specialist agents for circuit design, costing, installation, safety, testing & project management
          </p>

          <div className="inline-flex items-center gap-2 text-elec-yellow font-medium text-sm group-hover:gap-3 transition-all">
            <span>Choose Agent</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Tool Card Component
interface ToolCardProps {
  title: string;
  description: string;
  icon: typeof Zap;
  link: string;
}

function ToolCard({ title, description, icon: Icon, link }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="glass-premium rounded-xl h-full min-h-[140px]"
      >
        <div className="p-4 sm:p-5 flex items-start gap-4">
          <div className="flex-shrink-0 p-2.5 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
              {title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </motion.div>
    </Link>
  );
}

// Compact Tool Card
function CompactToolCard({ title, description, icon: Icon, link }: ToolCardProps) {
  return (
    <Link to={link} className="block group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-premium rounded-xl h-full min-h-[120px] sm:min-h-[130px]"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center h-full">
          <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-6 w-6 text-elec-yellow" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 hidden sm:block">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

// Section Header
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
      <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
    </div>
  );
}

// Main resources
const mainResources: ToolCardProps[] = [
  {
    title: 'Inspection & Testing',
    description: 'EICR, EIC & Minor Works certificates',
    icon: Zap,
    link: '/electrician/inspection-testing',
  },
  {
    title: 'AI Tooling',
    description: 'Smart analysis and design tools',
    icon: Brain,
    link: '/electrician-tools/ai-tooling',
  },
  {
    title: 'Site Safety & RAMS',
    description: 'Risk assessments and method statements',
    icon: Shield,
    link: '/electrician/site-safety',
  },
  {
    title: 'Electrical Calculations',
    description: 'Cable sizing, voltage drop and more',
    icon: Calculator,
    link: '/electrician/calculations',
  },
];

// Additional resources
const additionalResources: ToolCardProps[] = [
  {
    title: 'Quote Builder',
    description: 'Create professional quotes',
    icon: FileText,
    link: '/electrician/quote-builder',
  },
  {
    title: 'Invoices',
    description: 'Manage billing',
    icon: PoundSterling,
    link: '/electrician/invoices',
  },
  {
    title: 'Business Hub',
    description: 'Business management',
    icon: Briefcase,
    link: '/electrician/business',
  },
  {
    title: 'Live Pricing',
    description: 'Market rates',
    icon: PoundSterling,
    link: '/electrician/live-pricing',
  },
  {
    title: 'Industry Updates',
    description: 'News and changes',
    icon: Wrench,
    link: '/electrician/safety-shares/news',
  },
  {
    title: 'Career Progression',
    description: 'Plan your pathway',
    icon: GraduationCap,
    link: '/electrician/career-progression',
  },
];

const ElectricalHub = () => {
  return (
    <div className="min-h-screen bg-[hsl(240,5.9%,10%)]">
      <div className="mx-auto max-w-6xl py-4 md:py-6 lg:py-8 pb-safe">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 sm:space-y-8"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants} className="px-4 sm:px-0">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/[0.05] -ml-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.section variants={itemVariants} className="px-4 sm:px-0">
            <ElectricalHero />
          </motion.section>

          {/* Stats Bar */}
          <motion.section variants={itemVariants} className="sm:px-0">
            <ElectricalStatsBar />
          </motion.section>

          {/* Featured AI Card */}
          <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
            <SectionHeader title="AI-Powered Tools" />
            <FeaturedCard />
          </motion.section>

          {/* Core Daily Tools */}
          <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
            <SectionHeader title="Core Daily Tools" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {mainResources.map((resource) => (
                <ToolCard key={resource.link} {...resource} />
              ))}
            </div>
          </motion.section>

          {/* Business & Development */}
          <motion.section variants={itemVariants} className="space-y-4 px-4 sm:px-0">
            <SectionHeader title="Business & Development" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {additionalResources.map((resource) => (
                <CompactToolCard key={resource.link} {...resource} />
              ))}
            </div>
          </motion.section>

          {/* Footer spacing */}
          <div className="h-4 sm:h-6" />
        </motion.div>
      </div>
    </div>
  );
};

export default ElectricalHub;

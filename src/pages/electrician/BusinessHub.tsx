import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calculator,
  FileText,
  Package,
  PoundSterling,
  TrendingUp,
  Users,
  Wrench,
  Receipt,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Briefcase,
  ClipboardList,
  ClipboardCheck,
  Camera,
  CalendarDays,
  FolderKanban,
  AlertTriangle,
  Share2,
  Timer,
  PenTool,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard, BusinessKPIStrip } from '@/components/business-hub';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics/QuoteInvoiceAnalytics';
import { useBusinessHubData } from '@/hooks/useBusinessHubData';
import { useSparkTaskOverdueCount } from '@/hooks/useSparkTaskOverdueCount';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { useSnags } from '@/hooks/useSnags';
import { useTimeTracker, formatDuration } from '@/hooks/useTimeTracker';
import { shareContent } from '@/utils/share';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const BusinessHub = () => {
  const navigate = useNavigate();
  const [insightsOpen, setInsightsOpen] = useState(false);

  const {
    revenue,
    paidThisMonth,
    outstanding,
    overdueAmount,
    winRate,
    quotes,
    invoices,
    isLoading,
    lastUpdated,
    refresh,
    formatCurrency,
  } = useBusinessHubData();
  const overdueCount = useSparkTaskOverdueCount();
  const { counts: projectCounts } = useSparkProjects('active');
  const { counts: snagCounts } = useSnags();
  const { activeSession, elapsedSeconds } = useTimeTracker();

  const timeTrackerSubtitle = activeSession
    ? `\u23F1 Running \u00B7 ${formatDuration(elapsedSeconds)}`
    : 'Log hours';

  const handleShareBookingLink = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;
    const url = `https://www.elec-mate.com/book/${session.user.id}`;
    await shareContent({
      title: 'Book an Appointment',
      text: 'Book a time slot with me:',
      url,
      onFallback: () => {
        toast({ title: 'Share this link', description: url });
      },
    });
  };

  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <Helmet>
        <title>Business Hub for Electricians | Quotes, Invoices & More</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — quotes, invoices, customers, expenses, live pricing and growth tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician')}
              className="text-foreground hover:bg-accent rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Briefcase className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-base font-semibold text-foreground">Business Hub</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* KPI Strip */}
        <motion.div variants={itemVariants}>
          <BusinessKPIStrip
            paidThisMonth={paidThisMonth}
            outstanding={outstanding}
            overdueAmount={overdueAmount}
            winRate={winRate}
            isLoading={isLoading}
            formatCurrency={formatCurrency}
          />
        </motion.div>

        {/* YOUR DAY */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-0.5">
            Your Day
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <BusinessCard
              title="Tasks"
              description="To-dos & reminders"
              icon={ClipboardCheck}
              href="/electrician/tasks"
              variant="compact"
              accentColor="from-elec-yellow via-amber-400 to-orange-400"
              iconColor="text-elec-yellow"
              iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            />
            <BusinessCard
              title="Calendar"
              description="Jobs & appointments"
              icon={CalendarDays}
              href="/electrician/business/calendar"
              variant="compact"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
              liveSubtitle={todayFormatted}
            />
            <BusinessCard
              title="Time Tracker"
              description="Log hours on site"
              icon={Timer}
              href="/electrician/time-tracker"
              variant="compact"
              accentColor="from-amber-500 via-orange-400 to-orange-500"
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10 border border-amber-500/20"
              liveSubtitle={timeTrackerSubtitle}
            />
          </div>
        </motion.section>

        {/* FINANCIALS */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-0.5">
            Financials
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Quotes"
              description="Create & manage"
              icon={FileText}
              href="/electrician/quotes"
              accentColor="from-emerald-500 via-emerald-400 to-green-400"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border border-emerald-500/20"
            />
            <BusinessCard
              title="Invoices"
              description="Billing & payments"
              icon={PoundSterling}
              href="/electrician/invoices"
              accentColor="from-emerald-500 via-teal-400 to-cyan-400"
              iconColor="text-teal-400"
              iconBg="bg-teal-500/10 border border-teal-500/20"
            />
            <BusinessCard
              title="Customers"
              description="Clients & history"
              icon={Users}
              href="/customers"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
            />
            <BusinessCard
              title="Booking Link"
              description="Share with clients"
              icon={Share2}
              onClick={handleShareBookingLink}
              accentColor="from-violet-500 via-purple-400 to-indigo-400"
              iconColor="text-violet-400"
              iconBg="bg-violet-500/10 border border-violet-500/20"
            />
            <BusinessCard
              title="Projects"
              description={
                projectCounts.active > 0 ? `${projectCounts.active} active` : 'Group jobs & tasks'
              }
              icon={FolderKanban}
              href="/electrician/projects"
              accentColor="from-elec-yellow via-amber-400 to-orange-400"
              iconColor="text-elec-yellow"
              iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            />
          </div>
        </motion.section>

        {/* ON THE JOB */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-0.5">
            On the Job
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Site Visits"
              description="Pre & post-site"
              icon={ClipboardList}
              href="/electrician/site-visits"
              accentColor="from-emerald-500 via-emerald-400 to-green-400"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border border-emerald-500/20"
            />
            <BusinessCard
              title="Photo Docs"
              description="Project photos"
              icon={Camera}
              href="/electrician/photo-docs"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
            />
            <BusinessCard
              title="Snagging"
              description="Track & resolve"
              icon={AlertTriangle}
              href="/electrician/snagging"
              accentColor="from-orange-500 via-amber-400 to-yellow-400"
              iconColor="text-orange-400"
              iconBg="bg-orange-500/10 border border-orange-500/20"
              liveSubtitle={snagCounts.open > 0 ? `${snagCounts.open} open` : 'All clear'}
            />
            <BusinessCard
              title="Room Planner"
              description="Electrical floor plans"
              icon={PenTool}
              href="/electrician/business/room-planner"
              accentColor="from-indigo-500 via-violet-400 to-purple-400"
              iconColor="text-indigo-400"
              iconBg="bg-indigo-500/10 border border-indigo-500/20"
            />
          </div>
        </motion.section>

        {/* MONEY & STOCK */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-0.5">
            Money & Stock
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Expenses"
              description="Receipts & mileage"
              icon={Receipt}
              href="/electrician/expenses"
              variant="compact"
              accentColor="from-rose-500 via-pink-400 to-red-400"
              iconColor="text-rose-400"
              iconBg="bg-rose-500/10 border border-rose-500/20"
            />
            <BusinessCard
              title="Materials"
              description="Stock & inventory"
              icon={Package}
              href="/electrician/materials"
              variant="compact"
              accentColor="from-amber-500 via-orange-400 to-red-400"
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10 border border-amber-500/20"
            />
            <BusinessCard
              title="Tools"
              description="Equipment tracking"
              icon={Wrench}
              href="/electrician/tools"
              variant="compact"
              accentColor="from-elec-yellow via-amber-400 to-orange-400"
              iconColor="text-elec-yellow"
              iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            />
            <BusinessCard
              title="Live Pricing"
              description="Market rates"
              icon={PoundSterling}
              href="/electrician/live-pricing"
              variant="compact"
              accentColor="from-emerald-500 via-teal-400 to-cyan-400"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border border-emerald-500/20"
            />
            <BusinessCard
              title="Price Book"
              description="Materials & markup"
              icon={BookOpen}
              href="/electrician/price-book"
              variant="compact"
              accentColor="from-violet-500 via-purple-400 to-indigo-400"
              iconColor="text-violet-400"
              iconBg="bg-violet-500/10 border border-violet-500/20"
            />
            <BusinessCard
              title="Stock Tracker"
              description="Van & garage stock"
              icon={ClipboardList}
              href="/electrician/inventory"
              variant="compact"
              accentColor="from-teal-500 via-cyan-400 to-blue-400"
              iconColor="text-teal-400"
              iconBg="bg-teal-500/10 border border-teal-500/20"
            />
          </div>
        </motion.section>

        {/* GROW YOUR BUSINESS */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-0.5">
            Grow Your Business
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Start & Grow"
              description="Business guides"
              icon={TrendingUp}
              href="/electrician/business-development"
              variant="compact"
              accentColor="from-elec-yellow via-amber-400 to-orange-400"
              iconColor="text-elec-yellow"
              iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            />
            <BusinessCard
              title="Calculators"
              description="Financial planning"
              icon={Calculator}
              href="/electrician/business-development/tools"
              variant="compact"
              accentColor="from-violet-500 via-purple-400 to-indigo-400"
              iconColor="text-violet-400"
              iconBg="bg-violet-500/10 border border-violet-500/20"
            />
          </div>
        </motion.section>

        {/* Business Insights — collapsed by default */}
        <motion.div variants={itemVariants}>
          <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between card-surface-interactive p-4 touch-manipulation h-14 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-semibold text-white">Business Insights</p>
                    <p className="text-[13px] text-white">{formatCurrency(revenue)} revenue</p>
                  </div>
                </div>
                {insightsOpen ? (
                  <ChevronUp className="h-5 w-5 text-white" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-white" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <QuoteInvoiceAnalytics
                quotes={quotes}
                invoices={invoices}
                formatCurrency={formatCurrency}
                lastUpdated={lastUpdated}
                onRefresh={refresh}
                isLoading={isLoading}
              />
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={itemVariants} className="card-surface p-4">
          <p className="text-xs text-white leading-relaxed">
            The information provided is for general guidance only and does not constitute financial,
            legal, or business advice. Always consult with qualified professionals regarding your
            specific business circumstances.
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default BusinessHub;

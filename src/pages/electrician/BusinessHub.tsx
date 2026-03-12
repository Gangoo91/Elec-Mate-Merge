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
  Settings as Cog,
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard, BusinessKPIStrip } from '@/components/business-hub';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics/QuoteInvoiceAnalytics';
import { useBusinessHubData } from '@/hooks/useBusinessHubData';
import { useSparkTaskOverdueCount } from '@/hooks/useSparkTaskOverdueCount';
import { useSparkProjects } from '@/hooks/useSparkProjects';

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
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <div className="flex items-center h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician')}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
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
        {/* Compact Title */}
        <motion.div variants={itemVariants} className="flex items-center gap-2.5 pt-2">
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <Briefcase className="h-5 w-5 text-elec-yellow" />
          </div>
          <h1 className="text-lg font-bold text-white">Business Hub</h1>
        </motion.div>

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

        {/* YOUR DAY — Hero Cards */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">Your Day</h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Tasks"
              description="To-dos, reminders & follow-ups"
              icon={ClipboardCheck}
              href="/electrician/tasks"
              gradient="from-purple-500 to-fuchsia-500"
              variant="hero"
              liveSubtitle={overdueCount > 0 ? `${overdueCount} overdue` : 'All clear'}
            />
            <BusinessCard
              title="Calendar"
              description="Jobs, meetings & appointments"
              icon={CalendarDays}
              href="/electrician/business/calendar"
              gradient="from-blue-500 to-indigo-500"
              variant="hero"
              liveSubtitle={todayFormatted}
            />
          </div>
        </motion.section>

        {/* FINANCIALS — Standard Cards */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">Financials</h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Quotes"
              description="Create & manage"
              icon={FileText}
              href="/electrician/quotes"
              gradient="from-emerald-400 to-green-500"
              variant="standard"
            />
            <BusinessCard
              title="Invoices"
              description="Billing & payments"
              icon={PoundSterling}
              href="/electrician/invoices"
              gradient="from-emerald-400 to-teal-500"
              variant="standard"
            />
            <BusinessCard
              title="Customers"
              description="Clients & history"
              icon={Users}
              href="/customers"
              gradient="from-blue-400 to-cyan-500"
              variant="standard"
            />
            <BusinessCard
              title="Projects"
              description={
                projectCounts.active > 0 ? `${projectCounts.active} active` : 'Group jobs & tasks'
              }
              icon={FolderKanban}
              href="/electrician/projects"
              gradient="from-amber-400 to-orange-500"
              variant="standard"
            />
          </div>
        </motion.section>

        {/* ON THE JOB — Standard Cards */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">On the Job</h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Site Visits"
              description="Pre & post-site"
              icon={ClipboardList}
              href="/electrician/site-visits"
              gradient="from-emerald-400 to-green-500"
              variant="standard"
            />
            <BusinessCard
              title="Photo Docs"
              description="Project photos"
              icon={Camera}
              href="/electrician/photo-docs"
              gradient="from-blue-400 to-cyan-500"
              variant="standard"
            />
          </div>
        </motion.section>

        {/* MONEY & STOCK — Compact Cards */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">
            Money & Stock
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Expenses"
              description="Receipts & mileage"
              icon={Receipt}
              href="/electrician/expenses"
              gradient="from-red-400 to-rose-500"
              variant="compact"
            />
            <BusinessCard
              title="Materials"
              description="Stock & inventory"
              icon={Package}
              href="/electrician/materials"
              gradient="from-red-400 to-orange-500"
              variant="compact"
            />
            <BusinessCard
              title="Tools"
              description="Equipment tracking"
              icon={Wrench}
              href="/electrician/tools"
              gradient="from-red-400 to-amber-500"
              variant="compact"
            />
            <BusinessCard
              title="Live Pricing"
              description="Market rates"
              icon={PoundSterling}
              href="/electrician/live-pricing"
              gradient="from-emerald-400 to-cyan-500"
              variant="compact"
            />
          </div>
        </motion.section>

        {/* GROW YOUR BUSINESS — Compact Cards */}
        <motion.section variants={itemVariants} className="space-y-2.5">
          <h2 className="text-[11px] font-bold text-white uppercase tracking-widest">
            Grow Your Business
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <BusinessCard
              title="Start & Grow"
              description="Business development"
              icon={TrendingUp}
              href="/electrician/business-development"
              gradient="from-yellow-400 to-amber-500"
              variant="compact"
            />
            <BusinessCard
              title="Calculators"
              description="Financial planning"
              icon={Calculator}
              href="/electrician/business-development/tools"
              gradient="from-yellow-400 to-orange-500"
              variant="compact"
            />
            <BusinessCard
              title="Business Admin"
              description="Documents, staff & analytics"
              icon={Cog}
              href="/electrician/business-admin"
              gradient="from-yellow-400 to-amber-500"
              variant="compact"
              className="col-span-2"
            />
          </div>
        </motion.section>

        {/* Business Insights — collapsed by default */}
        <motion.div variants={itemVariants}>
          <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-bold text-white">Business Insights</p>
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
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
        >
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

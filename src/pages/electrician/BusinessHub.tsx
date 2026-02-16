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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessCard, BusinessKPIStrip } from '@/components/business-hub';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { QuoteInvoiceAnalytics } from '@/components/electrician/analytics/QuoteInvoiceAnalytics';
import { useBusinessHubData } from '@/hooks/useBusinessHubData';

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

  // Money In
  const moneyInTools = [
    {
      id: 1,
      title: 'Quotes',
      description: 'Create & manage quotes',
      icon: FileText,
      link: '/electrician/quotes',
      gradient: 'from-emerald-400 to-green-500',
    },
    {
      id: 2,
      title: 'Invoices',
      description: 'Billing & payments',
      icon: PoundSterling,
      link: '/electrician/invoices',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      id: 3,
      title: 'Live Pricing',
      description: 'Market rates & pricing',
      icon: PoundSterling,
      link: '/electrician/live-pricing',
      gradient: 'from-emerald-400 to-cyan-500',
    },
  ];

  // Money Out
  const moneyOutTools = [
    {
      id: 4,
      title: 'Expenses',
      description: 'Receipts & mileage',
      icon: Receipt,
      link: '/electrician/expenses',
      gradient: 'from-red-400 to-rose-500',
    },
    {
      id: 5,
      title: 'Materials',
      description: 'Stock and inventory management',
      icon: Package,
      link: '/electrician/materials',
      gradient: 'from-red-400 to-orange-500',
    },
  ];

  // Customers
  const customerTools = [
    {
      id: 6,
      title: 'Customers',
      description: 'Client management',
      icon: Users,
      link: '/customers',
      gradient: 'from-blue-400 to-cyan-500',
    },
  ];

  // Growth
  const growthTools = [
    {
      id: 7,
      title: 'Start & Grow',
      description: 'Business development guides and strategies',
      icon: TrendingUp,
      link: '/electrician/business-development',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      id: 8,
      title: 'Business Calculators',
      description: 'Financial planning and costing tools',
      icon: Calculator,
      link: '/electrician/business-development/tools',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      id: 9,
      title: 'Tools',
      description: 'Equipment tracking and management',
      icon: Wrench,
      link: '/electrician/tools',
      gradient: 'from-yellow-400 to-lime-500',
    },
    {
      id: 10,
      title: 'Business Admin',
      description: 'Documents, staff and analytics',
      icon: Cog,
      link: '/electrician/business-admin',
      gradient: 'from-yellow-400 to-amber-500',
      comingSoon: true,
    },
  ];

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
        className="px-4 py-4 space-y-6"
      >
        {/* Hero — Centred Title */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center pt-2 pb-1">
          <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <Briefcase className="h-7 w-7 text-elec-yellow" />
          </div>
          <h1 className="text-xl font-bold text-white">Business Hub</h1>
          <p className="text-sm text-white mt-1">Quotes, invoices & business tools</p>
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

        {/* Money In */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <h2 className="text-base font-bold text-white">Money In</h2>
          </div>
          <div className="space-y-2">
            {moneyInTools.map((card) => (
              <BusinessCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.link}
                gradient={card.gradient}
              />
            ))}
          </div>
        </motion.section>

        {/* Money Out */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <h2 className="text-base font-bold text-white">Money Out</h2>
          </div>
          <div className="space-y-2">
            {moneyOutTools.map((card) => (
              <BusinessCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.link}
                gradient={card.gradient}
              />
            ))}
          </div>
        </motion.section>

        {/* Customers */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <h2 className="text-base font-bold text-white">Customers</h2>
          </div>
          <div className="space-y-2">
            {customerTools.map((card) => (
              <BusinessCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.link}
                gradient={card.gradient}
              />
            ))}
          </div>
        </motion.section>

        {/* Grow Your Business */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-base font-bold text-white">Grow Your Business</h2>
          </div>
          <div className="space-y-2">
            {growthTools.map((card) => (
              <BusinessCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.link}
                gradient={card.gradient}
                comingSoon={card.comingSoon}
              />
            ))}
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
                    <p className="text-[13px] text-white">
                      {formatCurrency(revenue)} revenue
                    </p>
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
        <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
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

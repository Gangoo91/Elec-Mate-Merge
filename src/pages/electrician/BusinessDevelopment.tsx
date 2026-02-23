import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft,
  TrendingUp,
  Briefcase,
  GraduationCap,
  UserCheck,
  HandHelping,
  Calculator,
  CreditCard,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BusinessCard } from '@/components/business-hub';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const BusinessDevelopment = () => {
  const navigate = useNavigate();

  const businessSections = [
    {
      id: 1,
      title: 'Starting a Business',
      description: 'Essential guidance for establishing your electrical contracting business',
      icon: Briefcase,
      link: '/electrician/business-development/startup',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      id: 2,
      title: 'Onboarding Apprentices',
      description: 'Best practices for recruiting, mentoring and developing apprentices',
      icon: GraduationCap,
      link: '/electrician/business-development/apprentices',
      gradient: 'from-rose-400 to-pink-500',
    },
    {
      id: 3,
      title: 'Onboarding Electricians',
      description: 'Strategies for recruiting, integrating and retaining qualified electricians',
      icon: UserCheck,
      link: '/electrician/business-development/electricians',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      id: 4,
      title: 'Growing Your Business',
      description: 'Strategies for expanding, from marketing to diversifying services',
      icon: TrendingUp,
      link: '/electrician/business-development/growth',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      id: 5,
      title: 'Customer Acquisition',
      description: 'Effective methods to attract and retain clients for your services',
      icon: HandHelping,
      link: '/electrician/business-development/customers',
      gradient: 'from-purple-400 to-violet-500',
    },
    {
      id: 6,
      title: 'Tax & Finances',
      description: 'Financial management, tax obligations, and accounting best practices',
      icon: Calculator,
      link: '/electrician/business-development/tax-finances',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      id: 7,
      title: 'Debt Recovery',
      description: 'Strategies for managing late payments and protecting your cash flow',
      icon: CreditCard,
      link: '/electrician/business-development/debt-recovery',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      id: 8,
      title: 'Business Documents',
      description:
        'Guidance on professional quotes, invoices, contracts, and health & safety documents',
      icon: FileText,
      link: '/electrician/business-development/templates',
      gradient: 'from-cyan-400 to-blue-500',
    },
  ];

  const canonical = `${window.location.origin}/electrician/business-development`;

  return (
    <motion.div
      className="bg-[#1a1a1a] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Business Development for Electricians | Elec-Mate</title>
        <meta
          name="description"
          content="Comprehensive business development resources for UK electricians. Learn to start, grow and manage your electrical contracting business."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <button
              type="button"
              onClick={() => navigate('/electrician/business')}
              className="flex items-center justify-center h-11 w-11 rounded-xl text-white hover:bg-white/10 mr-3 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-white">Start & Grow</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="border-b border-white/10 bg-gradient-to-b from-yellow-500/5 to-[#1a1a1a]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
              <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Business Development
              </h2>
              <p className="mt-2 text-base sm:text-lg text-white">
                Resources and guidance to establish and grow your electrical contracting business
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Cards Grid */}
      <main className="px-4 sm:px-6 py-6 sm:py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {businessSections.map((section) => (
            <BusinessCard
              key={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.link}
              gradient={section.gradient}
            />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-white leading-relaxed">
            The information provided is for general guidance only and does not constitute financial,
            legal, or business advice. Always consult with qualified professionals regarding your
            specific business circumstances.
          </p>
        </div>
      </main>
    </motion.div>
  );
};

export default BusinessDevelopment;

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

interface SectionRow {
  title: string;
  description: string;
  link: string;
}

interface SectionGroup {
  eyebrow: string;
  title: string;
  rows: SectionRow[];
}

const GROUPS: SectionGroup[] = [
  {
    eyebrow: '01',
    title: 'Foundations',
    rows: [
      {
        title: 'Starting a Business',
        description: 'Structure, registration, insurance and scheme membership — the right way round',
        link: '/electrician/business-development/startup',
      },
      {
        title: 'Tax & Finances',
        description: 'What you owe, when you owe it, and what you can claim back',
        link: '/electrician/business-development/tax-finances',
      },
      {
        title: 'Business Documents',
        description: 'Quotes, invoices, contracts and the paperwork that protects you',
        link: '/electrician/business-development/templates',
      },
    ],
  },
  {
    eyebrow: '02',
    title: 'Building the Team',
    rows: [
      {
        title: 'Onboarding Apprentices',
        description: 'Recruiting, funding, wage rules and turning first-years into assets',
        link: '/electrician/business-development/apprentices',
      },
      {
        title: 'Onboarding Electricians',
        description: 'Hiring qualified sparks — and keeping them',
        link: '/electrician/business-development/electricians',
      },
    ],
  },
  {
    eyebrow: '03',
    title: 'Winning Work',
    rows: [
      {
        title: 'Customer Acquisition',
        description: 'Where the good clients come from, and how to keep them coming',
        link: '/electrician/business-development/customers',
      },
      {
        title: 'Growing Your Business',
        description: 'Pricing, new services and scaling without losing your margin',
        link: '/electrician/business-development/growth',
      },
    ],
  },
  {
    eyebrow: '04',
    title: 'Getting Paid',
    rows: [
      {
        title: 'Debt Recovery',
        description: 'Prevention, chasing letters and the legal route — in the right order',
        link: '/electrician/business-development/debt-recovery',
      },
    ],
  },
];

const BusinessDevelopment = () => {
  const navigate = useNavigate();
  const canonical = `${window.location.origin}/electrician/business-development`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Business Development for Electricians | Elec-Mate</title>
        <meta
          name="description"
          content="Comprehensive business development resources for UK electricians. Learn to start, grow and manage your electrical contracting business."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <button
              type="button"
              onClick={() => navigate('/electrician/business')}
              className="flex items-center justify-center h-11 w-11 rounded-xl text-white hover:bg-white/10 mr-3 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-[15px] font-semibold text-white tracking-tight">Start & Grow</h1>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto">
        {/* Hero */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
            Business Hub
          </p>
          <h2 className="mt-1.5 text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em] leading-[1.05]">
            Start & Grow
          </h2>
          <p className="mt-3 text-[13.5px] text-white/60 max-w-lg leading-relaxed">
            The business side of the trade — from first registration to a firm that runs without
            you on the tools every day.
          </p>
        </div>

        {/* Section groups */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6"
        >
          {GROUPS.map((group) => (
            <motion.section key={group.eyebrow} variants={itemVariants} className="h-full">
              <div className="h-full flex flex-col rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden">
                <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.06]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
                    {group.eyebrow}
                  </div>
                  <h3 className="mt-1 text-[17px] font-semibold text-white tracking-tight">
                    {group.title}
                  </h3>
                </div>
                <div className="flex-1 divide-y divide-white/[0.06]">
                  {group.rows.map((row) => (
                    <button
                      key={row.link}
                      onClick={() => navigate(row.link)}
                      className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left hover:bg-white/[0.03] transition-colors touch-manipulation min-h-[44px]"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[14.5px] font-medium text-white group-hover:text-elec-yellow transition-colors">
                          {row.title}
                        </div>
                        <div className="mt-0.5 text-[12px] text-white/60 leading-snug">
                          {row.description}
                        </div>
                      </div>
                      <span
                        aria-hidden
                        className="text-[13px] font-medium text-elec-yellow/70 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0"
                      >
                        {'→'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-8 px-1 text-[11px] text-white/45 leading-relaxed">
          General guidance, not financial or legal advice — always confirm your specific
          circumstances with a qualified professional.
        </p>
      </main>
    </div>
  );
};

export default BusinessDevelopment;

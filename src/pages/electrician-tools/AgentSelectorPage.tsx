import { useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SavedResultsCard } from '@/components/electrician-tools/saved-results';
import { useSavedAgentResults } from '@/hooks/useSavedAgentResults';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  expertise: string[];
  route: string;
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    eyebrow: 'Design & sizing',
    name: 'Circuit Designer',
    description: 'BS 7671 compliant circuit design, cable sizing, voltage drop and CU layouts.',
    expertise: ['Circuit calculations', 'Cable sizing', 'CU layouts', 'Voltage drop'],
    route: '/electrician/circuit-designer',
  },
  {
    id: 'cost-engineer',
    eyebrow: 'Pricing & quotes',
    name: 'Cost Engineer',
    description: 'Full project quotes with materials, labour and realistic timescales.',
    expertise: ['Material pricing', 'Labour estimates', 'Timescales', 'Quotes'],
    route: '/electrician/cost-engineer',
  },
  {
    id: 'installer',
    eyebrow: 'On-site method',
    name: 'Installation Specialist',
    description: 'Step-by-step installation methods and practical guidance for the job.',
    expertise: ['Methods', 'Practical tips', 'Tool selection', 'Best practices'],
    route: '/electrician/installation-specialist',
  },
  {
    id: 'maintenance',
    eyebrow: 'Service & faults',
    name: 'Maintenance Specialist',
    description: 'Periodic inspections, preventive maintenance and fault diagnosis.',
    expertise: ['Inspections', 'Fault diagnosis', 'Servicing', 'Preventive'],
    route: '/electrician/maintenance',
  },
  {
    id: 'health-safety',
    eyebrow: 'RAMS & PPE',
    name: 'Health & Safety',
    description: 'Risk assessments, method statements, PPE and emergency procedures.',
    expertise: ['RAMS', 'Risk assessments', 'PPE', 'Emergency procedures'],
    route: '/electrician/health-safety',
  },
];

const AGENT_COUNT_KEY: Record<string, keyof ReturnType<typeof useSavedAgentResults>['counts']> = {
  designer: 'circuit-designer',
  'cost-engineer': 'cost-engineer',
  installer: 'installer',
  maintenance: 'maintenance',
  'health-safety': 'health-safety',
};

function partOfDay(): 'MORNING' | 'AFTERNOON' | 'EVENING' {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
}

function dateEyebrow(): string {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
}

const AgentSelectorPage = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { counts, totalCount, results } = useSavedAgentResults();

  const firstName = useMemo(() => {
    const full = profile?.full_name?.trim();
    if (!full) return null;
    return full.split(/\s+/)[0]?.toUpperCase() ?? null;
  }, [profile?.full_name]);

  // Stats: rolling 7-day completions and most-active specialist
  const lastSevenDays = useMemo(() => {
    const since = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return results.filter((r) => new Date(r.completedAt).getTime() >= since).length;
  }, [results]);

  const topSpecialist = useMemo(() => {
    const entries = Object.entries(counts) as [keyof typeof counts, number][];
    const top = entries.reduce(
      (best, [k, v]) => (v > best.value ? { key: k, value: v } : best),
      { key: '' as keyof typeof counts | '', value: 0 }
    );
    if (!top.key || top.value === 0) return null;
    const labelMap: Record<string, string> = {
      'circuit-designer': 'Designer',
      'cost-engineer': 'Cost',
      'health-safety': 'H&S',
      installer: 'Installer',
      maintenance: 'Maintenance',
    };
    return labelMap[top.key as string] ?? null;
  }, [counts]);

  // Verdict line — adapts to recent activity
  const verdict = useMemo(() => {
    if (totalCount === 0) {
      return 'Five specialists on call. Brief one with the job details and get a designer-grade output back in minutes.';
    }
    if (lastSevenDays > 0) {
      return `${lastSevenDays} consultation${lastSevenDays === 1 ? '' : 's'} this week — your team's been busy. Pick a specialist below to start a new one.`;
    }
    return `${totalCount} consultation${totalCount === 1 ? '' : 's'} on file. Open a specialist to brief a new job.`;
  }, [totalCount, lastSevenDays]);

  const scrollToTeam = () => {
    document.getElementById('your-ai-team')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToRecent = () => {
    document
      .getElementById('recent-work')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  type Stat = {
    label: string;
    value: string | number;
    sub: string;
    accent?: boolean;
    onClick: () => void;
  };
  const stats: Stat[] = [
    {
      label: 'Specialists',
      value: AGENTS.length,
      sub: 'On the team',
      accent: true,
      onClick: scrollToTeam,
    },
    {
      label: 'Completed',
      value: totalCount,
      sub: totalCount > 0 ? 'Saved consultations' : 'No jobs yet',
      onClick: scrollToRecent,
    },
    {
      label: 'This week',
      value: lastSevenDays,
      sub: lastSevenDays > 0 ? 'In the last 7 days' : 'Nothing logged',
      onClick: scrollToRecent,
    },
    {
      label: 'Most used',
      value: topSpecialist ?? '—',
      sub: topSpecialist ? 'Top specialist' : 'Brief one to start',
      onClick: scrollToTeam,
    },
  ];

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate('/electrician')}
              aria-label="Back to Electrician Hub"
              className="flex items-center gap-2 text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Electrician Hub</span>
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 hidden sm:inline">
                Electrician
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                AI Design Consultation
              </h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-4 space-y-7 sm:space-y-12 lg:space-y-16"
      >
        {/* HERO */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative pt-2 sm:pt-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>{dateEyebrow()}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            <span className="text-elec-yellow">AI</span>{' '}
            <span className="text-white">Design Consultation.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
          >
            {verdict}
          </motion.p>

          {firstName && (
            <motion.p
              variants={itemVariants}
              className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/60"
            >
              Logged in as {firstName}
            </motion.p>
          )}
        </motion.section>

        {/* 01 · THIS MONTH */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>01 · THIS MONTH</Eyebrow>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-black sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]"
          >
            <div className="hidden sm:block absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
            {stats.map((s) => {
              const v = String(s.value);
              const sizeClass =
                v.length <= 4
                  ? 'text-4xl sm:text-5xl lg:text-[56px]'
                  : v.length <= 8
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-2xl sm:text-3xl lg:text-4xl';
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={s.onClick}
                  className={cn(
                    'group relative bg-[hsl(0_0%_10%)] px-4 py-5 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation active:scale-[0.99] hover:bg-elec-yellow/[0.04] transition-all',
                    s.accent &&
                      'bg-gradient-to-br from-elec-yellow/[0.08] via-amber-500/[0.03] to-transparent hover:from-elec-yellow/[0.14]'
                  )}
                >
                  <div
                    className={cn(
                      'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                      s.accent ? 'text-elec-yellow' : 'text-white/75'
                    )}
                  >
                    {s.label}
                  </div>
                  <span
                    className={cn(
                      'mt-2.5 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                      sizeClass,
                      s.accent ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {s.value}
                  </span>
                  <span className="mt-2.5 text-[11.5px] text-white/80 group-hover:text-white transition-colors leading-snug">
                    {s.sub}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.section>

        {/* 02 · YOUR AI TEAM */}
        <motion.section
          id="your-ai-team"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="flex items-baseline justify-between gap-3">
            <Eyebrow>02 · YOUR AI TEAM</Eyebrow>
            <span className="text-[11px] text-white/50 tabular-nums">
              {AGENTS.length} specialists
            </span>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative grid gap-px bg-black grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:border sm:border-white/[0.08] sm:rounded-2xl sm:overflow-hidden border-y border-white/[0.06]"
          >
            <div className="hidden sm:block absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
            {AGENTS.map((agent, i) => {
              const countKey = AGENT_COUNT_KEY[agent.id];
              const completed = countKey ? counts[countKey] : 0;
              const meta =
                completed > 0
                  ? `${completed} consultation${completed === 1 ? '' : 's'}`
                  : 'No jobs yet';
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => navigate(agent.route, { state: { fromAgentSelector: true } })}
                  className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] active:scale-[0.99] transition-all p-5 sm:p-7 lg:p-8 text-left touch-manipulation flex flex-col min-h-[200px] sm:min-h-[260px]"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/75 truncate">
                      · {agent.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-3 sm:mt-5 text-[22px] sm:text-[26px] lg:text-[30px] font-semibold tracking-tight leading-[1.1] text-white group-hover:text-elec-yellow transition-colors">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-[34ch]">
                    {agent.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {agent.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.05] text-white/80 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex-grow" />
                  <div className="mt-4 sm:mt-6 flex items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/[0.08]">
                    <span className="text-[11.5px] text-white/85 truncate tabular-nums">
                      {meta}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-elec-yellow shrink-0">
                      Open
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </button>
              );
            })}
            {/* Tease cell — fills the 6th slot from sm upward (mobile is single-column so no gap) */}
            <div className="hidden sm:flex bg-[hsl(0_0%_10%)] p-5 sm:p-7 lg:p-8 flex-col min-h-[200px] sm:min-h-[260px]">
              <div className="flex items-baseline gap-2">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/40 tabular-nums">
                  06
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  · Coming soon
                </span>
              </div>
              <h3 className="mt-3 sm:mt-5 text-[22px] sm:text-[26px] lg:text-[30px] font-semibold tracking-tight leading-[1.1] text-white/40">
                More specialists.
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/40 max-w-[34ch]">
                Commissioning, Project Manager and Tutor agents are in development.
              </p>
              <div className="flex-grow" />
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/[0.06]">
                <span className="text-[11.5px] text-white/40 tabular-nums">In development</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* 03 · RECENT WORK */}
        <motion.section
          id="recent-work"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>03 · RECENT WORK</Eyebrow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SavedResultsCard />
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default AgentSelectorPage;

/**
 * AM2ReadinessDashboard
 *
 * Hero gauge, 4 component score cards (stacked), risk banner, gap analysis, and CTAs.
 * Mirrors EPA dashboard pattern with AM2-specific scoring and cyan theme.
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  TestTube2,
  Search,
  BookOpen,
  AlertTriangle,
  Loader2,
  RefreshCw,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { AM2ReadinessGauge } from './AM2ReadinessGauge';
import {
  useAM2Readiness,
  type AM2ReadinessStatus,
  type AM2Component,
} from '@/hooks/am2/useAM2Readiness';

interface AM2ReadinessDashboardProps {
  onNavigateToTab: (tab: string) => void;
}

const STATUS_COLOURS: Record<AM2ReadinessStatus, { bg: string; text: string; border: string }> = {
  ready: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  nearly_ready: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  needs_work: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  not_ready: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

const RISK_CONFIG = {
  high: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    label: 'High Risk of Underperforming',
    description: 'Significant gaps in key assessment areas — focus on the priorities below',
    icon: ShieldAlert,
  },
  moderate: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    label: 'Moderate Risk',
    description: 'Some areas need attention before you book your AM2',
    icon: AlertTriangle,
  },
  low: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    label: 'Likely Competent',
    description: "All sections at 70%+ — you're showing competence across AM2 areas",
    icon: ShieldCheck,
  },
};

const COMPONENT_ICONS: Record<string, typeof Lock> = {
  safeIsolation: Lock,
  testingSequence: TestTube2,
  faultDiagnosis: Search,
  knowledgeAssessment: BookOpen,
};

const COMPONENT_ACCENT: Record<string, string> = {
  testingSequence: 'border-l-blue-500',
  faultDiagnosis: 'border-l-orange-500',
  safeIsolation: 'border-l-cyan-500',
  knowledgeAssessment: 'border-l-purple-500',
};

const COMPONENT_TAB: Record<string, string> = {
  testingSequence: 'testing',
  faultDiagnosis: 'faults',
  safeIsolation: 'safe-isolation',
  knowledgeAssessment: 'knowledge',
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export function AM2ReadinessDashboard({ onNavigateToTab }: AM2ReadinessDashboardProps) {
  const { data, isLoading, recalculate } = useAM2Readiness();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 py-16 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400 shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">Calculating readiness...</p>
          <p className="text-xs text-white mt-1">Analysing simulation results</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-12 px-4 space-y-5">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-cyan-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">AM2 Readiness Score</p>
            <p className="text-sm text-white mt-1 max-w-xs">
              Complete simulations to build your readiness score and identify practical gaps before
              you book.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('safe-isolation')}
            className="h-12 px-8 rounded-xl bg-cyan-500 text-black font-semibold text-sm touch-manipulation active:scale-95 transition-transform"
          >
            Start Safe Isolation
          </button>
        </div>
      </div>
    );
  }

  const riskConfig = RISK_CONFIG[data.riskLevel];
  const RiskIcon = riskConfig.icon;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5 px-4 py-5"
    >
      {/* Hero Gauge */}
      <motion.div variants={fadeUp} className="flex flex-col items-center py-4">
        <AM2ReadinessGauge score={data.overallScore} status={data.overallStatus} size={200} />

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={recalculate}
            className="flex items-center gap-1 text-xs text-white touch-manipulation h-8 px-2"
          >
            <RefreshCw className="h-3 w-3" />
            Recalculate
          </button>
        </div>
      </motion.div>

      {/* Risk Banner */}
      <motion.div
        variants={fadeUp}
        className={cn(
          'p-4 rounded-xl border flex items-center gap-3',
          riskConfig.bg,
          riskConfig.border
        )}
      >
        <RiskIcon className={cn('h-6 w-6 shrink-0', riskConfig.text)} />
        <div>
          <p className={cn('text-sm font-semibold', riskConfig.text)}>{riskConfig.label}</p>
          <p className="text-xs text-white">{riskConfig.description}</p>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.p variants={fadeUp} className="text-[10px] text-white text-center px-2">
        AM2-style simulation to identify practical gaps. Not affiliated with or endorsed by any
        awarding organisation.
      </motion.p>

      {/* Component Score Cards — stacked full-width with left accent */}
      <motion.div variants={fadeUp} className="space-y-2">
        {Object.entries(data.components).map(([key, comp]) => (
          <ComponentScoreCard
            key={key}
            componentKey={key}
            component={comp}
            onTap={() => onNavigateToTab(COMPONENT_TAB[key] || 'readiness')}
          />
        ))}
      </motion.div>

      {/* Gaps to Address */}
      {data.gaps.length > 0 && (
        <motion.div variants={fadeUp} className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Priority Areas
          </h3>
          {data.gaps.slice(0, 4).map((gap, i) => {
            const priorityColour =
              gap.priority === 'high'
                ? 'border-red-500/30 bg-red-500/10'
                : gap.priority === 'medium'
                  ? 'border-amber-500/30 bg-amber-500/10'
                  : 'border-blue-500/30 bg-blue-500/10';
            const priorityText =
              gap.priority === 'high'
                ? 'text-red-400'
                : gap.priority === 'medium'
                  ? 'text-amber-400'
                  : 'text-blue-400';

            return (
              <div
                key={i}
                className={cn('flex items-start gap-3 p-3 rounded-xl border bg-elec-gray', priorityColour)}
              >
                <span
                  className={cn(
                    'flex items-center justify-center h-5 w-5 rounded-full bg-white/15 text-[10px] font-bold shrink-0 mt-0.5',
                    priorityText
                  )}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{gap.area}</p>
                  <p className="text-xs text-white mt-0.5">{gap.description}</p>
                  <p className="text-xs text-white mt-1 font-medium">{gap.action}</p>
                </div>
                <Badge variant="outline" className={cn('text-[10px] shrink-0', priorityText)}>
                  {gap.priority}
                </Badge>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* CTA Buttons */}
      <motion.div variants={fadeUp} className="space-y-2">
        <button
          onClick={() => onNavigateToTab('safe-isolation')}
          className="w-full h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-medium text-sm touch-manipulation active:scale-[0.98] transition-transform flex items-center gap-3 px-4"
        >
          <Lock className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Practise Safe Isolation</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
        <button
          onClick={() => onNavigateToTab('knowledge')}
          className="w-full h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-medium text-sm touch-manipulation active:scale-[0.98] transition-transform flex items-center gap-3 px-4"
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Take Knowledge Test</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      </motion.div>

      <motion.p variants={fadeUp} className="text-[10px] text-white">
        Last calculated{' '}
        {data.calculatedAt.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </motion.p>
    </motion.div>
  );
}

// --- Component Score Card ---

function ComponentScoreCard({
  componentKey,
  component,
  onTap,
}: {
  componentKey: string;
  component: AM2Component;
  onTap: () => void;
}) {
  const Icon = COMPONENT_ICONS[componentKey] || Lock;
  const statusColour = STATUS_COLOURS[component.status];
  const accent = COMPONENT_ACCENT[componentKey] || 'border-l-cyan-500';

  return (
    <button
      onClick={onTap}
      className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
    >
      <Card className={cn('border-l-4 bg-elec-gray', accent, statusColour.border)}>
        <CardContent className="p-3.5 flex items-center gap-3">
          <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-white/5')}>
            <Icon className={cn('h-5 w-5', statusColour.text)} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{component.label}</span>
              {component.score === 0 && component.attempts === 0 ? (
                <span className="text-xs text-white italic">Not Started</span>
              ) : (
                <span className={cn('text-lg font-bold', statusColour.text)}>
                  {component.score}%
                </span>
              )}
            </div>

            {/* Score bar */}
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mt-1.5">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  component.score >= 70
                    ? 'bg-emerald-500'
                    : component.score >= 40
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${component.score}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              />
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-white">{component.detail}</span>
              <span className="text-[10px] text-white">{Math.round(component.weight * 100)}% weight</span>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-white shrink-0" />
        </CardContent>
      </Card>
    </button>
  );
}

export default AM2ReadinessDashboard;

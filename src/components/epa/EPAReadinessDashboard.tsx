/**
 * EPAReadinessDashboard
 *
 * Hero progress ring, 4 component cards, gate banner, gap list, and CTAs.
 */

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Target,
  Sparkles,
  MessageSquare,
  FileText,
  AlertTriangle,
  Loader2,
  RefreshCw,
  ChevronRight,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import {
  useEPAReadiness,
  type ReadinessComponent,
  type ReadinessStatus,
} from '@/hooks/epa/useEPAReadiness';

interface EPAReadinessDashboardProps {
  qualificationCode: string;
  qualificationId?: string | null;
  onStartDiscussion: () => void;
  onStartKnowledgeTest: () => void;
}

const STATUS_COLOURS: Record<
  ReadinessStatus,
  { bg: string; text: string; border: string; ring: string }
> = {
  ready: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    ring: 'stroke-emerald-500',
  },
  nearly_ready: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    ring: 'stroke-blue-500',
  },
  needs_work: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    ring: 'stroke-amber-500',
  },
  not_ready: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    ring: 'stroke-red-500',
  },
};

const STATUS_LABELS: Record<ReadinessStatus, string> = {
  ready: 'Ready for EPA',
  nearly_ready: 'Nearly Ready',
  needs_work: 'Needs Work',
  not_ready: 'Not Ready',
};

const COMPONENT_ICONS: Record<string, typeof Target> = {
  portfolio: FileText,
  evidenceQuality: Sparkles,
  mockDiscussion: MessageSquare,
  mockKnowledge: FileText,
};

const COMPONENT_ACCENT: Record<string, string> = {
  portfolio: 'border-l-blue-500 bg-blue-500/10 text-blue-400',
  evidenceQuality: 'border-l-amber-500 bg-amber-500/10 text-amber-400',
  mockDiscussion: 'border-l-pink-500 bg-pink-500/10 text-pink-400',
  mockKnowledge: 'border-l-cyan-500 bg-cyan-500/10 text-cyan-400',
};

/** Radial SVG progress ring */
function RadialRing({
  score,
  size = 140,
  strokeWidth = 10,
  className,
  ringClass,
  children,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  ringClass?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn('transition-all duration-1000 ease-out', ringClass)}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function EPAReadinessDashboard({
  qualificationCode,
  qualificationId,
  onStartDiscussion,
  onStartKnowledgeTest,
}: EPAReadinessDashboardProps) {
  const { data, isLoading, recalculate } = useEPAReadiness(qualificationCode, qualificationId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 py-16 px-4">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow shrink-0" />
        <div>
          <p className="text-sm font-medium text-white">Calculating readiness...</p>
          <p className="text-xs text-white mt-1">
            Analysing portfolio, evidence quality, and mock results
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-12 px-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center shrink-0">
            <Target className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">EPA Readiness Score</p>
            <p className="text-xs text-white mt-1">
              Start building your portfolio and taking mock assessments to see your readiness score.
            </p>
          </div>
        </div>
        <button
          onClick={recalculate}
          className="h-11 px-6 rounded-xl bg-elec-yellow text-black font-medium text-sm touch-manipulation active:scale-95"
        >
          Calculate Readiness
        </button>
      </div>
    );
  }

  const statusColour = STATUS_COLOURS[data.overallStatus];
  const allGood = Object.values(data.components).every((c) => c.score >= 70);

  return (
    <div className="space-y-5 px-4 py-5">
      {/* Score Hero — Radial Ring */}
      <div className="p-5 rounded-xl bg-elec-gray border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-white">EPA Readiness Score</p>
          <button
            onClick={recalculate}
            className="flex items-center gap-1 text-xs text-white touch-manipulation h-11"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Recalculate
          </button>
        </div>

        <div className="flex items-center gap-5">
          <RadialRing
            score={data.overallScore}
            size={130}
            strokeWidth={10}
            ringClass={statusColour.ring}
          >
            <span className={cn('text-4xl font-bold', statusColour.text)}>{data.overallScore}</span>
            <span className="text-xs text-white">/100</span>
          </RadialRing>

          <div className="flex-1 space-y-2">
            <Badge
              className={cn('text-xs', statusColour.bg, statusColour.text, statusColour.border)}
            >
              {STATUS_LABELS[data.overallStatus]}
            </Badge>
            <p className="text-sm text-white">
              {data.overallScore >= 70
                ? 'You are on track for your EPA gateway'
                : 'Keep working on the areas below to hit gateway readiness'}
            </p>
          </div>
        </div>
      </div>

      {/* Gate Banner */}
      {allGood ? (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-emerald-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-400">EPA Gateway Ready</p>
            <p className="text-xs text-white">
              All components at 70%+ — you meet the gateway threshold
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/30 flex items-center gap-3">
          <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-400">Not Gateway Ready Yet</p>
            <p className="text-xs text-white">
              Some components are below the 70% threshold — see gaps below
            </p>
          </div>
        </div>
      )}

      {/* Component Cards — Full-width stacked */}
      <div className="space-y-2">
        {Object.entries(data.components).map(([key, comp]) => (
          <ComponentCard key={key} componentKey={key} component={comp} />
        ))}
      </div>

      {/* Gaps */}
      {data.gaps.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Gaps to Address
          </h3>
          {data.gaps.map((gap, i) => {
            const priorityColour =
              gap.priority === 'high'
                ? 'border-l-red-500 bg-red-500/5'
                : gap.priority === 'medium'
                  ? 'border-l-amber-500 bg-amber-500/5'
                  : 'border-l-blue-500 bg-blue-500/5';
            const priorityText =
              gap.priority === 'high'
                ? 'text-red-400'
                : gap.priority === 'medium'
                  ? 'text-amber-400'
                  : 'text-blue-400';

            return (
              <div
                key={i}
                className={cn('p-3.5 rounded-xl border border-white/10 border-l-4', priorityColour)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-xs font-bold shrink-0',
                      priorityText
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white">{gap.area}</p>
                      <Badge variant="outline" className={cn('text-[10px] shrink-0', priorityText)}>
                        {gap.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-white mt-1">{gap.description}</p>
                    <p className="text-xs text-white mt-1 font-medium">{gap.action}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA Buttons */}
      <div className="space-y-2">
        <button
          onClick={onStartDiscussion}
          className="w-full h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-medium text-sm touch-manipulation active:scale-[0.98] flex items-center gap-3 px-4"
        >
          <MessageSquare className="h-5 w-5 shrink-0" />
          <span className="flex-1 text-left">Start Mock Discussion</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
        <button
          onClick={onStartKnowledgeTest}
          className="w-full h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-medium text-sm touch-manipulation active:scale-[0.98] flex items-center gap-3 px-4"
        >
          <Zap className="h-5 w-5 shrink-0" />
          <span className="flex-1 text-left">Take Knowledge Test</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      </div>

      <p className="text-[10px] text-white">
        Last calculated{' '}
        {data.calculatedAt.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}

// Full-width Component Card with accent border
function ComponentCard({
  componentKey,
  component,
}: {
  componentKey: string;
  component: ReadinessComponent;
}) {
  // Show claimed vs validated warning for portfolio when they differ
  const showValidationSplit =
    componentKey === 'portfolio' &&
    component.claimedCount !== undefined &&
    component.validatedCount !== undefined &&
    component.claimedCount !== component.validatedCount;
  const Icon = COMPONENT_ICONS[componentKey] || Target;
  const accent = COMPONENT_ACCENT[componentKey] || 'border-l-white/30 bg-white/5 text-white';
  const accentParts = accent.split(' ');
  const iconColour = accentParts[2] || 'text-white';
  const bgColour = accentParts[1] || 'bg-white/5';
  const borderColour = accentParts[0] || 'border-l-white/30';

  const barColour =
    component.score >= 70
      ? 'bg-emerald-500'
      : component.score >= 40
        ? 'bg-amber-500'
        : 'bg-red-500';

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3.5 rounded-xl bg-elec-gray border border-white/10 border-l-4',
        borderColour
      )}
    >
      {/* Icon */}
      <div
        className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', bgColour)}
      >
        <Icon className={cn('h-5 w-5', iconColour)} />
      </div>

      {/* Label + detail */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{component.label}</p>
        {component.detail && <p className="text-xs text-white truncate">{component.detail}</p>}
        {showValidationSplit && (
          <p className="text-[10px] text-amber-400 mt-0.5">
            {component.claimedCount! - component.validatedCount!} ACs claimed without evidence
          </p>
        )}
        <p className="text-xs text-white">{Math.round(component.weight * 100)}% weight</p>
      </div>

      {/* Score + mini bar */}
      <div className="shrink-0 w-16 text-right">
        {component.score === 0 ? (
          <p className="text-sm text-white italic">N/A</p>
        ) : (
          <>
            <p className="text-xl font-bold text-white">{component.score}</p>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mt-1">
              <div
                className={cn('h-full rounded-full transition-all duration-500', barColour)}
                style={{ width: `${component.score}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EPAReadinessDashboard;

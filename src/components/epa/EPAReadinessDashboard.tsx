/**
 * EPAReadinessDashboard
 *
 * Hero progress ring, 5 component cards, gate banner, gap list, and CTAs.
 */

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Target,
  BookOpen,
  Sparkles,
  MessageSquare,
  FileText,
  AlertTriangle,
  CheckCircle2,
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

const STATUS_COLOURS: Record<ReadinessStatus, { bg: string; text: string; border: string }> = {
  ready: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  nearly_ready: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  needs_work: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  not_ready: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

const STATUS_LABELS: Record<ReadinessStatus, string> = {
  ready: 'Ready for EPA',
  nearly_ready: 'Nearly Ready',
  needs_work: 'Needs Work',
  not_ready: 'Not Ready',
};

const COMPONENT_ICONS: Record<string, typeof Target> = {
  portfolio: FileText,
  ksb: BookOpen,
  evidenceQuality: Sparkles,
  mockDiscussion: MessageSquare,
  mockKnowledge: FileText,
};

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
          <p className="text-sm font-medium text-foreground">
            Calculating readiness...
          </p>
          <p className="text-xs text-white/90 mt-1">
            Analysing portfolio, KSBs, and mock results
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
            <p className="text-sm font-medium text-foreground">
              EPA Readiness Score
            </p>
            <p className="text-xs text-white/90 mt-1">
              Start building your portfolio and taking mock assessments to see
              your readiness score.
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
  const allGood = Object.values(data.components).every(
    (c) => c.score >= 70
  );

  return (
    <div className="space-y-5 px-4 py-5">
      {/* Readiness Score — left-aligned */}
      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/90">EPA Readiness Score</p>
          <button
            onClick={recalculate}
            className="flex items-center gap-1 text-xs text-white/70 touch-manipulation h-8"
          >
            <RefreshCw className="h-3 w-3" />
            Recalculate
          </button>
        </div>

        <div className="flex items-end gap-2">
          <span className={cn('text-4xl font-bold', statusColour.text)}>
            {data.overallScore}
          </span>
          <span className="text-sm text-white/70 mb-1">/100</span>
          <Badge
            className={cn(
              'text-xs ml-2 mb-1',
              statusColour.bg,
              statusColour.text,
              statusColour.border
            )}
          >
            {STATUS_LABELS[data.overallStatus]}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700',
              data.overallScore >= 70
                ? 'bg-emerald-500'
                : data.overallScore >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500'
            )}
            style={{ width: `${data.overallScore}%` }}
          />
        </div>
      </div>

      {/* Gate Banner */}
      {allGood ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-400">
              EPA Gateway Ready
            </p>
            <p className="text-xs text-white/90">
              All components at 70%+ — you meet the gateway threshold
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-400">
              Not Gateway Ready Yet
            </p>
            <p className="text-xs text-white/90">
              Some components are below the 70% threshold — see gaps below
            </p>
          </div>
        </div>
      )}

      {/* Component Cards (2-col grid) */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(data.components).map(([key, comp]) => (
          <ComponentCard key={key} componentKey={key} component={comp} />
        ))}
      </div>

      {/* Gaps */}
      {data.gaps.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
            Gaps to Address
          </h3>
          {data.gaps.map((gap, i) => {
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
                className={cn(
                  'flex items-start gap-3 p-3 rounded-xl border',
                  priorityColour
                )}
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
                  <p className="text-sm font-medium text-foreground">
                    {gap.area}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    {gap.description}
                  </p>
                  <p className="text-xs text-white/90 mt-1">{gap.action}</p>
                </div>
                <Badge
                  variant="outline"
                  className={cn('text-[10px] shrink-0', priorityText)}
                >
                  {gap.priority}
                </Badge>
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
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Start Mock Discussion</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
        <button
          onClick={onStartKnowledgeTest}
          className="w-full h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-medium text-sm touch-manipulation active:scale-[0.98] flex items-center gap-3 px-4"
        >
          <Zap className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Take Knowledge Test</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      </div>

      <p className="text-[10px] text-white/60">
        Last calculated{' '}
        {data.calculatedAt.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}

// Component Card
function ComponentCard({
  componentKey,
  component,
}: {
  componentKey: string;
  component: ReadinessComponent;
}) {
  const Icon = COMPONENT_ICONS[componentKey] || Target;
  const statusColour = STATUS_COLOURS[component.status];

  return (
    <Card className={cn('border', statusColour.border)}>
      <CardContent className="p-3.5 space-y-2">
        <div className="flex items-center gap-2">
          <Icon className={cn('h-4 w-4', statusColour.text)} />
          <span className="text-xs text-white/90 truncate">
            {component.label}
          </span>
        </div>

        {component.score === 0 ? (
          <p className="text-sm text-white/60 italic">Not Started</p>
        ) : (
          <div className="flex items-end gap-1">
            <span className={cn('text-2xl font-bold', statusColour.text)}>
              {component.score}
            </span>
            <span className="text-xs text-white/70 mb-1">/100</span>
          </div>
        )}

        {/* Score bar */}
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              component.score >= 70
                ? 'bg-emerald-500'
                : component.score >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500'
            )}
            style={{ width: `${component.score}%` }}
          />
        </div>

        {component.detail && (
          <p className="text-[10px] text-white/80 truncate">
            {component.detail}
          </p>
        )}

        <p className="text-[10px] text-white/70">
          {Math.round(component.weight * 100)}% weight
        </p>
      </CardContent>
    </Card>
  );
}

export default EPAReadinessDashboard;

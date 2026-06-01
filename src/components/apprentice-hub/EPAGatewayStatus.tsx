/**
 * EPAGatewayStatus
 *
 * End-Point Assessment gateway readiness — bottom sheet.
 *
 * Single source of truth: `useEPAReadiness` (the same engine the home-tab
 * EPAGatewayPulse uses), so the apprentice never sees two different "ready?"
 * numbers. Shows the overall score, the four weighted components, and the
 * prioritised gaps to close next.
 */

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import {
  useEPAReadiness,
  type ReadinessStatus,
  type ReadinessComponent,
} from '@/hooks/epa/useEPAReadiness';

interface EPAGatewayStatusProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_META: Record<ReadinessStatus, { label: string; cls: string }> = {
  ready: { label: 'Gateway ready', cls: 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]' },
  nearly_ready: {
    label: 'Nearly ready',
    cls: 'text-elec-yellow/85 border-elec-yellow/30 bg-elec-yellow/[0.05]',
  },
  needs_work: {
    label: 'Needs work',
    cls: 'text-orange-200 border-orange-400/40 bg-orange-400/[0.08]',
  },
  not_ready: { label: 'Not ready yet', cls: 'text-red-200 border-red-400/40 bg-red-500/[0.08]' },
};

const PRIORITY_CLS: Record<'high' | 'medium' | 'low', string> = {
  high: 'border-l-red-500',
  medium: 'border-l-orange-400',
  low: 'border-l-white/30',
};

export function EPAGatewayStatus({ open, onOpenChange }: EPAGatewayStatusProps) {
  const { qualificationCode, qualificationId } = useStudentQualification();
  // Only calculate while the sheet is open (avoids redundant snapshot writes).
  const { data, isLoading } = useEPAReadiness(
    open ? (qualificationCode ?? undefined) : undefined,
    qualificationId
  );

  const components: ReadinessComponent[] = data
    ? [
        data.components.portfolio,
        data.components.evidenceQuality,
        data.components.mockDiscussion,
        data.components.mockKnowledge,
      ]
    : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <SheetHeader className="px-4 pb-4">
          <SheetTitle className="text-white">EPA gateway readiness</SheetTitle>
          <SheetDescription>
            Your live End-Point Assessment readiness — the same engine as your dashboard.
          </SheetDescription>
        </SheetHeader>

        {isLoading || !data ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white/70" />
            <p className="text-sm text-white/70 mt-2">Checking readiness…</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(85vh-8rem)] px-4 pb-8">
            {/* Overall */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">Gateway readiness</p>
                  <span
                    className={cn(
                      'inline-block mt-1.5 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border',
                      STATUS_META[data.overallStatus].cls
                    )}
                  >
                    {STATUS_META[data.overallStatus].label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white tabular-nums leading-none">
                    {data.overallScore}%
                  </p>
                  <p className="text-xs text-white/55 mt-1">overall</p>
                </div>
              </div>
              <Progress value={data.overallScore} className="h-2" />
              <p className="mt-2 text-[11px] text-white/45 leading-snug">
                70%+ across the weighted components is the typical gateway bar.
              </p>
            </div>

            {/* Components */}
            <div className="space-y-2.5 mb-6">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                Components
              </h3>
              {components.map((c) => (
                <div
                  key={c.label}
                  className="p-3.5 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13.5px] font-medium text-white">{c.label}</span>
                    <span className="text-[12px] font-mono tabular-nums text-white/90">
                      {c.score}%<span className="text-white/40"> · {Math.round(c.weight * 100)}%</span>
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                  {c.detail && (
                    <p className="mt-1.5 text-[11.5px] text-white/55 leading-snug">{c.detail}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Gaps */}
            {data.gaps.length > 0 && (
              <div className="space-y-2.5 mb-6">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Close these next
                </h3>
                {data.gaps.map((g, i) => (
                  <div
                    key={`${g.area}-${i}`}
                    className={cn(
                      'rounded-xl border border-l-[3px] border-white/[0.06] bg-white/[0.02] p-3.5 space-y-1',
                      PRIORITY_CLS[g.priority]
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold text-white">{g.area}</span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">
                        {g.priority}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/70 leading-relaxed">{g.description}</p>
                    <p className="text-[12px] text-elec-yellow/90 leading-relaxed">{g.action}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Info note */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-[12px] font-medium text-white mb-1">About the gateway</p>
              <p className="text-[11.5px] text-white/55 leading-relaxed">
                The gateway is the formal check before your End-Point Assessment. Your employer and
                training provider confirm you've met the requirements before you proceed to the EPA.
              </p>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default EPAGatewayStatus;

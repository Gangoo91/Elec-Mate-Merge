/**
 * OnJobAssessment — editorial pre-job site assessment landing.
 *
 * Three tools: site checklist wizard, risk assessment flow, quick-reference
 * cards. Drops the green/red/blue coloured tool cards for editorial tone
 * with single yellow accent.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ClipboardCheck,
  AlertTriangle,
  BookOpen,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { useAssessmentProgress } from '@/components/apprentice/assessment/hooks/useAssessmentProgress';
import { getTotalItemCount } from '@/components/apprentice/assessment/data/siteAssessmentChecklist';
import SiteAssessmentWizard from '@/components/apprentice/assessment/SiteAssessmentWizard';
import RiskAssessmentFlow from '@/components/apprentice/assessment/RiskAssessmentFlow';
import QuickReferenceCards from '@/components/apprentice/assessment/QuickReferenceCards';
import { cn } from '@/lib/utils';

type ActiveTool = 'checklist' | 'risk' | 'reference' | null;

const OnJobAssessment = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const progress = useAssessmentProgress();
  const totalCount = getTotalItemCount();
  const navigate = useNavigate();

  const toggleTool = (tool: ActiveTool) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  };

  const toolCards: {
    id: ActiveTool;
    label: string;
    icon: LucideIcon;
    description: string;
  }[] = [
    {
      id: 'checklist',
      label: 'Site checklist',
      icon: ClipboardCheck,
      description: `${progress.completedCount}/${totalCount} checks`,
    },
    {
      id: 'risk',
      label: 'Risk assessment',
      icon: AlertTriangle,
      description: `${progress.riskAssessments.length} saved`,
    },
    {
      id: 'reference',
      label: 'Quick reference',
      icon: BookOpen,
      description: '9 reference cards',
    },
  ];

  const pct = totalCount > 0 ? (progress.completedCount / totalCount) * 100 : 0;
  const allDone = progress.completedCount === totalCount && totalCount > 0;

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/on-job-tools')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Site assessment"
          title="Pre-job site assessment"
          description="Site checklist, risk assessment flow, and a quick-reference card stack — pre-job prep that catches the things you'd otherwise notice halfway up the ladder."
          tone="yellow"
        />
      </motion.div>

      {/* ── Progress strip ────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {allDone ? (
                <CheckCircle2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              ) : (
                <ClipboardCheck className="h-4 w-4 text-white/55 flex-shrink-0" />
              )}
              <span className="text-[13px] font-mono tabular-nums text-white">
                {progress.completedCount} / {totalCount} checks
              </span>
              <span className="text-[11px] text-white/55">·</span>
              <AlertTriangle className="h-3.5 w-3.5 text-white/55" />
              <span className="text-[13px] font-mono tabular-nums text-white">
                {progress.riskAssessments.length} risk assessment
                {progress.riskAssessments.length === 1 ? '' : 's'}
              </span>
            </div>
            <span
              className={cn(
                'text-[12px] font-mono tabular-nums',
                allDone ? 'text-elec-yellow' : 'text-white/55'
              )}
            >
              {Math.round(pct)}%
            </span>
          </div>
          <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                allDone ? 'bg-elec-yellow' : 'bg-white/55'
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Tool cards ────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-3">
        {toolCards.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => toggleTool(tool.id)}
              className={cn(
                'p-3.5 sm:p-5 rounded-xl border transition-all touch-manipulation text-left space-y-2',
                isActive
                  ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
                  : 'border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04]'
              )}
            >
              <div className="flex items-center gap-1.5">
                <Icon
                  className={cn(
                    'h-3.5 w-3.5',
                    isActive ? 'text-elec-yellow' : 'text-white/40'
                  )}
                />
                <Eyebrow
                  className={cn(
                    'text-[9.5px]',
                    isActive && 'text-elec-yellow/85'
                  )}
                >
                  {tool.label}
                </Eyebrow>
              </div>
              <div
                className={cn(
                  'text-[14px] font-semibold leading-snug',
                  isActive ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {tool.description}
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* ── Active tool content ───────────────────────────────────── */}
      {activeTool === 'checklist' && <SiteAssessmentWizard progress={progress} />}
      {activeTool === 'risk' && <RiskAssessmentFlow progress={progress} />}
      {activeTool === 'reference' && <QuickReferenceCards />}

      {/* ── Safety footnote ───────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5">
          <div className="flex items-start gap-2.5">
            <Shield className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-white/85 leading-relaxed">
              Always complete a thorough site assessment before beginning any
              electrical work. When in doubt,{' '}
              <span className="font-semibold text-elec-yellow">
                stop work and consult your supervisor
              </span>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </PageFrame>
  );
};

export default OnJobAssessment;

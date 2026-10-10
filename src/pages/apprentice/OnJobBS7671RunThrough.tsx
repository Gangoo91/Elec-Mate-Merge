import { useState } from 'react';
import { Zap, FileText, BookOpen, type LucideIcon } from 'lucide-react';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { useBS7671Progress } from '@/components/apprentice/bs7671/hooks/useBS7671Progress';
import { allBS7671Tests } from '@/data/bs7671-testing/allBS7671Tests';
import TestingProceduresPanel from '@/components/apprentice/bs7671/TestingProceduresPanel';
import CertificateGuidePanel from '@/components/apprentice/bs7671/CertificateGuidePanel';
import BS7671QuickReferencePanel from '@/components/apprentice/bs7671/BS7671QuickReferencePanel';
import { LEARN_INSET, LEARN_LABEL, LearnLinkList } from '@/components/apprentice/learn-ui/learnUi';

type ActiveTool = 'testing' | 'certificates' | 'reference' | null;

const TOTAL_TESTS = allBS7671Tests.length;

const OnJobBS7671RunThrough = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const progress = useBS7671Progress();

  const toggleTool = (tool: ActiveTool) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  };

  const toolCards: {
    id: ActiveTool;
    label: string;
    icon: LucideIcon;
    color: string;
    borderColor: string;
    bgColor: string;
    description: string;
  }[] = [
    {
      id: 'testing',
      label: 'Testing Procedures',
      icon: Zap,
      color: 'text-elec-yellow',
      borderColor: 'border-white/[0.14]',
      bgColor: 'bg-white/[0.04]',
      description: `${progress.completedTestCount}/${TOTAL_TESTS} tests`,
    },
    {
      id: 'certificates',
      label: 'Certificate Guide',
      icon: FileText,
      color: 'text-elec-yellow',
      borderColor: 'border-white/[0.14]',
      bgColor: 'bg-white/[0.04]',
      description: '5 certificate types',
    },
    {
      id: 'reference',
      label: 'Quick Reference',
      icon: BookOpen,
      color: 'text-elec-yellow',
      borderColor: 'border-white/[0.14]',
      bgColor: 'bg-white/[0.04]',
      description: '9 reference cards',
    },
  ];

  return (
    <GuidePage
      section="Apprentice · BS 7671"
      area="On-the-job tools"
      title="Inspection & testing"
      backTo="/apprentice/on-job-tools"
    >
      <p className="max-w-3xl text-[14px] leading-relaxed text-white">
        Reflects BS 7671:2018+A4:2026. Walk through the testing procedures, certificate types and
        quick reference for AM2E and on-site work.
      </p>

      {/* Status line — bold figures, plain words, a hairline between. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-[14px] text-white">
          <span className="font-semibold tabular-nums">
            {progress.completedTestCount}/{TOTAL_TESTS}
          </span>{' '}
          tests completed
        </p>
        <span className="h-4 w-px bg-white/15" aria-hidden />
        <p className="text-[14px] text-white">
          <span className="font-semibold tabular-nums">{progress.totalStepsCompleted}</span> steps
          done
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08] sm:w-40">
          <div
            className="h-full rounded-full bg-elec-yellow transition-all duration-500"
            style={{
              width: `${TOTAL_TESTS > 0 ? (progress.completedTestCount / TOTAL_TESTS) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* The three tools as rows (one column on a phone, three equal cards
            from lg:). They were three squeezed tiles side by side at 360px. */}
      <LearnLinkList
        columns={3}
        items={toolCards.map((tool) => ({
          id: tool.id as string,
          icon: tool.icon,
          title: tool.label,
          detail: tool.description,
          active: activeTool === tool.id,
          onClick: () => toggleTool(tool.id),
        }))}
      />

      {/* Active Tool Content */}
      {activeTool === 'testing' && <TestingProceduresPanel progress={progress} />}

      {activeTool === 'certificates' && <CertificateGuidePanel />}

      {activeTool === 'reference' && <BS7671QuickReferencePanel />}

      <div className={LEARN_INSET}>
        <p className={LEARN_LABEL}>Compliance</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-white">
          All electrical installation work must comply with BS 7671:2018+A4:2026 (18th Edition,
          Amendment 4). Follow the correct testing sequence, document every result accurately, and
          keep to safe isolation procedures at all times.
        </p>
      </div>
    </GuidePage>
  );
};

export default OnJobBS7671RunThrough;

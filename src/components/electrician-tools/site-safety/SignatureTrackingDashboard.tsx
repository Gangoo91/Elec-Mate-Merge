/**
 * SignatureTrackingDashboard — at-a-glance sign-off coverage across every
 * Site Safety record type (permits, isolations, COSHH, accidents, near-miss,
 * inspections, diary, observations, pre-use checks, fire watch).
 *
 * Editorial standard: SafetyMasthead + PageHero + StatStrip headline metrics +
 * a hairline SafetyListCard breakdown by document type. One colour dimension only —
 * a thin status accent bar (green when fully signed, orange when outstanding)
 * plus a small uppercase status pill. No decorative icons.
 */

import { cn } from '@/lib/utils';
import {
  useSafetySignatureOverview,
  SignatureDocSummary,
} from '@/hooks/useSafetySignatureOverview';

import { SafetyModuleShell } from './common/SafetyModuleShell';
import { EmptyState, LoadingState, type Tone } from '@/components/college/primitives';
import { SafetyListCard, SafetyListRow } from './common/SafetyList';
import { SafetyPageHeader, SafetyStatStrip } from './common/SafetyPageHeader';

interface SignatureTrackingDashboardProps {
  /** Returns to the Site Safety hub (rendered via SafetyMasthead). */
  onBack?: () => void;
  /** Tap a document-type row — typically deep-links into that module. */
  onTap?: (docType: string) => void;
}

const STATUS_PILL: Record<'green' | 'orange', string> = {
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  orange: 'bg-white/[0.05] text-orange-400 border-white/10',
};

function StatusPill({ allSigned }: { allSigned: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        allSigned ? STATUS_PILL.green : STATUS_PILL.orange
      )}
    >
      {allSigned ? 'Signed' : 'Outstanding'}
    </span>
  );
}

export function SignatureTrackingDashboard({ onBack, onTap }: SignatureTrackingDashboardProps) {
  const { data, isLoading } = useSafetySignatureOverview();

  const hasUnsigned = (data?.totalUnsigned ?? 0) > 0;
  const headlineTone: Tone = hasUnsigned ? 'orange' : 'green';

  // Active/urgent first: outstanding types to the top, ordered by most unsigned.
  const rows = (data?.byType ?? [])
    .filter((t) => t.total > 0)
    .slice()
    .sort((a, b) => b.unsigned - a.unsigned);

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Signature Tracking"
      trailing={
        hasUnsigned ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-white/[0.05] text-orange-400 border-white/10 whitespace-nowrap">
            {data?.totalUnsigned} outstanding
          </span>
        ) : undefined
      }
      hero={
        <SafetyPageHeader
          eyebrow="Site Safety · sign-off coverage"
          title="Signature tracking"
          description="Every safety record that needs a signature, in one place. Chase down anything still outstanding before it leaves site."
          tone={headlineTone}
        />
      }
      stats={
        data && data.totalDocuments > 0 ? (
          <SafetyStatStrip
            stats={[
              {
                value: `${data.signedPercent}%`,
                label: 'Signed off',
                tone: headlineTone,
              },
              { value: data.totalSigned, label: 'Fully signed', tone: 'green' },
              {
                value: data.totalUnsigned,
                label: 'Outstanding',
                ...(hasUnsigned ? { tone: 'orange' as Tone } : {}),
              },
              { value: data.totalDocuments, label: 'Records' },
            ]}
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : !data || data.totalDocuments === 0 ? (
        <EmptyState
          title="No safety records yet"
          description="Once you raise permits, isolations, COSHH assessments and other records, their sign-off status appears here."
        />
      ) : (
        <SafetyListCard>
          {rows.map((item) => (
            <SignatureRow key={item.type} item={item} onTap={onTap} />
          ))}
        </SafetyListCard>
      )}
    </SafetyModuleShell>
  );
}

function SignatureRow({
  item,
  onTap,
}: {
  item: SignatureDocSummary;
  onTap?: (docType: string) => void;
}) {
  const allSigned = item.unsigned === 0;
  const accent: Tone = allSigned ? 'green' : 'orange';

  return (
    <SafetyListRow
      onClick={onTap ? () => onTap(item.type) : undefined}
      accent={accent}
      title={item.label}
      subtitle={
        allSigned ? `All ${item.total} signed` : `${item.unsigned} of ${item.total} outstanding`
      }
      trailing={
        <div className="flex flex-col items-end gap-1">
          <StatusPill allSigned={allSigned} />
          <span className="text-[11px] tabular-nums text-white">
            <span className="text-green-400">{item.signed}</span>
            {' / '}
            {item.total}
          </span>
        </div>
      }
    />
  );
}

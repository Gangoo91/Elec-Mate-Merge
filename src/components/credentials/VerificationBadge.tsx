/**
 * VerificationBadge — the only way a credential's checked-ness is shown
 * (ELE-1950). Never says "Verified" unless someone verified the item at source.
 */
import { Pill } from '@/components/employer/editorial';
import { StatusPill } from '@/components/employer/pageParts/PageParts';
import {
  verificationLabel,
  verificationShortLabel,
  verificationTone,
  type VerificationLevel,
} from '@/services/credentialsService';

export function VerificationBadge({
  level,
  short = false,
  prefix,
  className,
}: {
  level: VerificationLevel | null | undefined;
  /** Compact wording for dense grids ("Self" / "Doc seen" / "Source"). */
  short?: boolean;
  /** e.g. "ECS" → "ECS: Document seen" */
  prefix?: string;
  className?: string;
}) {
  const text = short ? verificationShortLabel(level) : verificationLabel(level);
  return (
    <Pill tone={verificationTone(level)} className={className}>
      {prefix ? `${prefix}: ${text}` : text}
    </Pill>
  );
}

/** Profile-level flag: an Elec-Mate admin reviewed the profile (not a card check). */
export function ElecMateApprovalBadge({ className }: { className?: string }) {
  return (
    <StatusPill tone="neutral" className={className}>
      Approved by Elec-Mate
    </StatusPill>
  );
}

/** A worker added this to their own Elec-ID and nobody has checked it (ELE-2006). */
export function AddedByThemPill({ className }: { className?: string }) {
  return (
    <Pill tone="purple" className={className}>
      Added by them
    </Pill>
  );
}

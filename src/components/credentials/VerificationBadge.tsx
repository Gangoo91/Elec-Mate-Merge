/**
 * VerificationBadge — the only way a credential's checked-ness is shown
 * (ELE-1950). Never says "Verified" unless someone verified the item at source.
 */
import { Pill } from '@/components/employer/editorial';
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
    <Pill tone="blue" className={className}>
      Approved by Elec-Mate
    </Pill>
  );
}

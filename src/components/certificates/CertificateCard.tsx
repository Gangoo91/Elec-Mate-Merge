import React from 'react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface CertificateData {
  id: string;
  reportType: string;
  clientName?: string;
  installationAddress?: string;
  inspectionDate?: string;
  status: string;
  /** Set when the cert has been issued & locked (signed off). Null/undefined = unlocked. */
  lockedAt?: string;
  lastModified: number;
  customerId?: string;
  canExportToEICR?: boolean;
  canExportToEIC?: boolean;
  /** Latest Qualifying Supervisor review state, when the user is on a company team. */
  qsReviewStatus?: 'pending' | 'approved' | 'returned' | 'cancelled';
  /** Name of the QS who approved/returned the latest review, when present. */
  qsReviewerName?: string | null;
  /**
   * ELE-1421 — set only when the cert belongs to a TEAM MEMBER rather than the
   * signed-in user. Presence is what marks a card as someone else's work, so it
   * also drives the read-only treatment (no bulk checkbox).
   */
  ownerName?: string;
}

const QS_CHIP: Record<string, { label: string; className: string }> = {
  pending: { label: 'QS review', className: 'border-amber-400/40 text-amber-300 bg-amber-400/[0.06]' },
  returned: { label: 'Returned', className: 'border-red-400/40 text-red-300 bg-red-400/[0.06]' },
  approved: { label: 'QS approved', className: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/[0.06]' },
};

interface CertificateCardProps {
  certificate: CertificateData;
  onTap: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onConvert?: () => void;
  isBulkMode?: boolean;
  isSelected?: boolean;
  onSelectToggle?: () => void;
  /**
   * ELE-1458 — the library is filtered to one status, so repeating that status
   * on every card is noise. Drops the state word from the top row.
   */
  hideStatus?: boolean;
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    eicr: 'EICR',
    eic: 'EIC',
    'minor-works': 'MW',
    'ev-charging': 'EV',
    'fire-alarm': 'FA G1',
    'fire-alarm-commissioning': 'FA G2',
    'fire-alarm-inspection': 'FA G7',
    'fire-alarm-modification': 'FA G4',
    'emergency-lighting': 'EM LTG',
    'pat-testing': 'PAT',
    'solar-pv': 'SOLAR PV',
    bess: 'BESS',
    'lightning-protection': 'LPS',
    'g98-commissioning': 'G98',
    'g99-commissioning': 'G99',
    'smoke-co-alarm': 'SMOKE/CO',
    'danger-notice': 'DANGER',
    'isolation-cert': 'ISOLATION',
    'permit-to-work': 'PERMIT',
    'safe-isolation': 'SAFE ISO',
    'limitation-notice': 'LIMITATION',
    'non-compliance-notice': 'NON-COMP',
    'completion-notice': 'COMPLETION',
    disconnection: 'DISCONN',
    'board-schedule': 'BOARD SCH',
  };
  return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 8);
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Issued';
    case 'in-progress':
      return 'In progress';
    case 'draft':
      return 'Draft';
    case 'auto-draft':
      return 'Auto-saved';
    default:
      return status;
  }
};

// Status text colour — the state reads as a coloured word, not a mute dot.
const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-emerald-300';
    case 'in-progress':
      return 'text-amber-300';
    // Draft and auto-draft are neutral states, not warnings — plain white.
    // Low-opacity white reads as grey on this ground, which is banned.
    default:
      return 'text-white';
  }
};

// Human relative date for recent items, falling back to a short date.
const formatDate = (timestamp: number | string) => {
  const date = new Date(timestamp);
  const diff = Date.now() - date.getTime();
  const day = 86_400_000;
  if (diff < day && new Date().getDate() === date.getDate()) return 'Today';
  if (diff < 2 * day) return 'Yesterday';
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

/**
 * Certificate card — premium self-contained tile for the 2-up grid on My
 * Certificates. Uniform height (h-full flex column with a spacer), rounded
 * bordered surface, a plain type eyebrow up top, the title as the one large
 * element, address beneath, and a quiet state · date meta line at the foot.
 * Tap opens the action sheet (Edit / Download / Delete etc.).
 */
export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onTap,
  isBulkMode = false,
  isSelected = false,
  onSelectToggle,
  hideStatus = false,
}) => {
  // ELE-1421 — a team member's cert is someone else's record. Bulk status change
  // and bulk delete both end in `.eq('user_id', <me>)`, which matches zero rows
  // yet still returns success: the UI would report "12 updated" having changed
  // nothing. Team cards are therefore excluded from selection outright.
  const isTeamCert = !!certificate.ownerName;
  const selectable = !isTeamCert;

  const handleCardTap = () => {
    if (isBulkMode) {
      if (!selectable) return;
      navigator.vibrate?.(10);
      onSelectToggle?.();
    } else {
      onTap();
    }
  };

  const statusLabel = getStatusLabel(certificate.status);
  const statusColor = getStatusText(certificate.status);
  const typeLabel = getTypeLabel(certificate.reportType);
  const title = certificate.clientName || `Untitled ${typeLabel}`;
  // Version number lives in the report-id suffix (…-V2, …-V3) from an Amend —
  // NOT edit_version, which is the autosave concurrency counter (resets to 1
  // on each new version).
  const versionMatch = certificate.id.match(/-V(\d+)$/);
  const version = versionMatch ? parseInt(versionMatch[1], 10) : 1;
  const qs = certificate.qsReviewStatus && QS_CHIP[certificate.qsReviewStatus];
  // First name only — the card is 2-up on a phone and a full name eats the row.
  // The title attribute keeps the full name reachable.
  const ownerFirstName = certificate.ownerName?.trim().split(/\s+/)[0] ?? '';
  const ownerInitial = ownerFirstName.charAt(0).toUpperCase();

  return (
    <button
      type="button"
      onClick={handleCardTap}
      aria-disabled={isBulkMode && !selectable}
      className={cn(
        'group relative flex h-full w-full flex-col text-left rounded-2xl border p-3.5 sm:p-4 transition-all touch-manipulation',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50 active:scale-[0.99]',
        // Slightly brighter surface and border than before: with the volt
        // "Open" gone the tile has to hold its own edge, and volt is now
        // reserved for the hover/press state so it still means something.
        // Selected = a SOLID volt border on a brighter neutral fill. A
        // translucent volt wash (bg-elec-yellow/[0.07]) reads muddy brown on
        // this ground, and hover:from-elec-yellow/[0.07] did the same on every
        // hover. Volt is only ever solid-with-black-text, or plain text.
        isSelected
          ? 'border-elec-yellow bg-gradient-to-b from-white/[0.16] to-white/[0.08]'
          : cn('border-white/[0.18] hover:border-elec-yellow/50 hover:from-white/[0.19]', CARD_SURFACE),
        // Not yours to bulk-edit — say so visually instead of failing silently.
        isBulkMode && !selectable && 'opacity-40 active:scale-100 cursor-not-allowed'
      )}
    >
      {/* Top line — the type as a plain eyebrow, not a bordered chip. A boxed
          badge is furniture: it draws as much ink as the title it sits above,
          and twenty of them turn a library into a grid of buttons. Uppercase
          tracking alone reads as a label. Only the genuinely exceptional
          markers (amended, locked) earn a bordered chip opposite it. */}
      <div className="flex items-start justify-between gap-2">
        {isBulkMode && selectable ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                navigator.vibrate?.(10);
                onSelectToggle?.();
              }}
              className="h-5 w-5 flex-shrink-0 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
          </div>
        ) : (
          <span className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            {typeLabel}
          </span>
        )}
        {(version > 1 || certificate.lockedAt) && (
          <span className="flex items-center gap-1 shrink-0">
            {version > 1 && (
              <span
                className="text-[9px] font-bold uppercase tracking-[0.1em] text-white border border-white/[0.16] bg-white/[0.06] rounded px-1.5 py-0.5"
                title={`Amended — version ${version}`}
              >
                V{version}
              </span>
            )}
            {certificate.lockedAt && (
              <span
                className="text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-300 border border-emerald-400/40 bg-emerald-400/[0.06] rounded px-1.5 py-0.5"
                title="Issued & locked — signed off"
              >
                Locked
              </span>
            )}
          </span>
        )}
      </div>

      {/* Title — the one thing anyone scans for, so it gets the size. Every
          other line on the card is deliberately smaller; that difference is
          the whole hierarchy, since low-opacity white reads grey here and is
          not available as a way to push things back. */}
      <h3
        title={title}
        className="mt-2 text-[16px] sm:text-[17px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors line-clamp-2"
      >
        {title}
      </h3>

      {/* Address — clean text, no inline icon (the pin threw the wrap).
          Absent addresses render nothing at all: a grid of drafts each saying
          "No address" in grey italics read as a broken screen, and the spacer
          below already keeps the row heights equal without a filler line. */}
      {certificate.installationAddress && (
        <p
          title={certificate.installationAddress}
          className="mt-1.5 text-[12.5px] leading-snug text-white line-clamp-2"
        >
          {certificate.installationAddress}
        </p>
      )}

      {/* Attribution + review state. One wrapping row so a team cert carrying
          both chips never pushes the footer out of alignment with its neighbour. */}
      {(certificate.ownerName || qs) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {/* ELE-1421 — whose work this is. Only ever rendered for a team
              member's cert, so its presence alone reads as "not mine". */}
          {certificate.ownerName && (
            <span
              title={certificate.ownerName}
              className="inline-flex max-w-full items-center gap-1 rounded border border-white/[0.14] bg-white/[0.06] py-0.5 pl-0.5 pr-1.5"
            >
              <span
                className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-[3px] bg-elec-yellow text-[8px] font-bold leading-none text-black"
                aria-hidden
              >
                {ownerInitial}
              </span>
              <span className="truncate text-[9.5px] font-semibold text-white">
                {ownerFirstName}
              </span>
            </span>
          )}
          {qs && (
            <span
              className={cn(
                'inline-flex w-fit items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] border rounded px-1.5 py-0.5',
                qs.className
              )}
              title={
                certificate.qsReviewerName ? `${qs.label} — ${certificate.qsReviewerName}` : undefined
              }
            >
              {qs.label}
            </span>
          )}
        </div>
      )}

      {/* Spacer keeps every card in a row the same height. No min-height — a
          card with no address should be short, and the grid's items-stretch
          already levels it against its neighbours. */}
      <div className="flex-1" />

      {/*
        Meta line — state and date together, because they answer the same
        question: how far along is this and when did I last touch it.

        Three deliberate removals here:
        · the "Open" label, which was volt on every single card. An accent
          repeated twenty times stops being an accent, and the whole tile is
          already a button — the affordance was decoration, not information.
          Volt now appears on hover/press only, where it means something.
        · the divider rule, which separated a meta line from empty space.
        · the state's bold weight. It was reading as loud as the title it sat
          above; state is context, not the headline.
      */}
      <div className="mt-3 flex items-baseline gap-1.5 text-[11.5px] leading-none">
        {!hideStatus && (
          <>
            <span className={cn('shrink-0 truncate', statusColor)}>{statusLabel}</span>
            <span className="shrink-0 text-white" aria-hidden>
              ·
            </span>
          </>
        )}
        <span className="min-w-0 truncate tabular-nums text-white">
          {formatDate(certificate.lastModified)}
        </span>
      </div>
    </button>
  );
};

export default CertificateCard;

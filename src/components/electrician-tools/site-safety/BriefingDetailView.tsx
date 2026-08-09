/**
 * BriefingDetailView — the completed briefing, read back.
 *
 * This screen had an icon on every heading, every heading in ALL CAPS with
 * `tracking-wider`, four grey icon tiles restating their own labels, twelve
 * different hazard colours, a blue status pill, a red risk pill with a warning
 * triangle, and five nested bordered cards. Set beside an EV charging
 * certificate it read as a different product.
 *
 * It now uses the certificate language: typographic headings in sentence case,
 * a definition list for the facts, edge-to-edge cards on mobile, and hairline
 * rules instead of boxes.
 *
 * On colour, the line drawn is **colour that carries meaning stays; colour that
 * decorates goes.** Risk level keeps its amber/red because a high-risk briefing
 * genuinely must not look like a low-risk one, and an electrician scanning the
 * screen is entitled to that signal. The twelve hazard colours and the blue
 * "Scheduled" pill were decoration — asbestos being rose and noise being orange
 * encodes nothing, it just made the screen loud — so those are now one uniform
 * treatment and plain type respectively.
 *
 * Also fixed: `briefing_time` was printed raw, so a 9am briefing displayed as
 * "09:00:00". Nobody writes seconds on a briefing sheet.
 */

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useStorageUrls } from '@/utils/storageUrls';
import { BriefingShareSheet } from './briefings';
import { BriefingPDFActions } from './BriefingPDFActions';
import { SignaturePad } from './common/SignaturePad';
import { useBriefingAttendees, useSignOffAttendee } from '@/hooks/useBriefingSignatures';

const HAZARD_LABELS: Record<string, string> = {
  electrical: 'Electrical',
  fire: 'Fire',
  heights: 'Heights',
  'falling-objects': 'Falling objects',
  'confined-space': 'Confined space',
  'manual-handling': 'Manual handling',
  'hazardous-substances': 'Hazardous substances',
  noise: 'Noise',
  'wet-slippery': 'Wet / slippery',
  vehicles: 'Vehicles',
  machinery: 'Machinery',
  asbestos: 'Asbestos',
};

/**
 * Risk keeps colour — it is the one value on this screen where the colour is
 * the information. Text only: the bordered, filled pill it used to sit in was
 * doing the shouting rather than the word.
 */
const RISK_TEXT: Record<string, string> = {
  low: 'text-white',
  medium: 'text-amber-400',
  high: 'text-red-400',
};

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Scheduled',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  draft: 'Draft',
};

const BRIEFING_TYPE_LABELS: Record<string, string> = {
  'site-work': 'Site work',
  lfe: 'LFE report',
  'hse-update': 'HSE update',
  'business-update': 'Business update',
  'safety-alert': 'Safety alert',
  regulatory: 'Regulatory',
  general: 'General',
  'site-induction': 'Site induction',
  'toolbox-talk': 'Toolbox talk',
  'electrical-safety': 'Electrical safety',
  'hot-works': 'Hot works',
  'near-miss-review': 'Near miss review',
};

/** `09:00:00` → `09:00`. Stored as a Postgres `time`, shown as people write it. */
const formatTime = (t?: string | null): string | null => {
  if (!t) return null;
  const m = /^(\d{2}):(\d{2})/.exec(t);
  return m ? `${m[1]}:${m[2]}` : t;
};

const formatDate = (d?: string | null): string | null => {
  if (!d) return null;
  const parsed = new Date(`${d}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/** Edge-to-edge on mobile, inset from `sm:` — the certificate card. */
const cardCn =
  '-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] ' +
  'p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{children}</h2>
);

interface BriefingDetailViewProps {
  briefing: any;
  companyProfile?: any;
  onClose: () => void;
  onEdit: () => void;
}

export function BriefingDetailView({
  briefing,
  companyProfile,
  onClose,
  onEdit,
}: BriefingDetailViewProps) {
  const [showShare, setShowShare] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Sign-off state
  const [signingAttendee, setSigningAttendee] = useState<any>(null);
  const [signOffName, setSignOffName] = useState('');
  const [signOffDate, setSignOffDate] = useState('');
  const [signOffDataUrl, setSignOffDataUrl] = useState('');

  const { data: dbAttendees } = useBriefingAttendees(briefing.id);
  const signOffMutation = useSignOffAttendee();

  // Merge: prefer DB attendees when available, fall back to briefing.attendees
  const embeddedAttendees = Array.isArray(briefing.attendees) ? briefing.attendees : [];
  const attendees =
    dbAttendees && dbAttendees.length > 0
      ? dbAttendees.map((a: any) => ({
          ...a,
          name: a.employee?.name || a.guest_name || 'Unknown',
          role: a.guest_company || '',
          signature: a.signature_url || a.acknowledged,
          _dbId: a.id,
        }))
      : embeddedAttendees;
  const signedCount = attendees.filter(
    (a: any) => !!a.signature || !!a.signature_url || !!a.acknowledged
  ).length;
  const totalAttendees = attendees.length;
  const progressPercent = totalAttendees > 0 ? (signedCount / totalAttendees) * 100 : 0;
  const allSigned = totalAttendees > 0 && signedCount === totalAttendees;

  const riskLevel: string | undefined = briefing.risk_level;
  const statusLabel = STATUS_LABELS[briefing.status || 'scheduled'] || 'Scheduled';
  const hazards: string[] = briefing.identified_hazards || [];
  const photos: any[] = briefing.photos || [];
  // Resolve stored photo references — new uploads store bare storage paths
  // (privacy-ready); legacy entries hold full URLs (pass-through).
  const { urls: photoSrcs } = useStorageUrls(
    'briefing-photos',
    photos.map((p: { url?: string }) => p.url)
  );
  const description = briefing.briefing_description || briefing.work_scope || '';
  const typeLabel =
    BRIEFING_TYPE_LABELS[briefing.briefing_type] ||
    briefing.briefing_type?.replace(/-/g, ' ') ||
    'General';
  const title = briefing.briefing_name || briefing.job_name;
  const conductor = briefing.created_by_name || briefing.conductor_name;

  const facts: { term: string; value: string | null; className?: string }[] = [
    { term: 'Type', value: typeLabel },
    { term: 'Site', value: briefing.location || null },
    {
      term: 'Date',
      value: (() => {
        const d = formatDate(briefing.briefing_date);
        const t = formatTime(briefing.briefing_time);
        if (!d) return null;
        return t ? `${d} at ${t}` : d;
      })(),
    },
    {
      term: 'Risk level',
      value: riskLevel ? riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) : null,
      className: riskLevel ? RISK_TEXT[riskLevel] : undefined,
    },
    { term: 'Briefed by', value: conductor || null },
  ];

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header — "Back" as a word rather than a bare arrow, and the status as
          type rather than a coloured pill. The certificates read the same way. */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-elec-dark/95 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="-ml-1 flex h-11 shrink-0 touch-manipulation items-center text-[15px] font-medium text-white"
          >
            Back
          </button>
          <p className="min-w-0 flex-1 truncate text-center text-[15px] font-semibold text-white">
            {title}
          </p>
          <span className="shrink-0 text-[13px] font-medium text-white">{statusLabel}</span>
        </div>
      </div>

      <div className="space-y-6 px-4 pb-32 pt-5">
        {/* Title block — the document announces itself in type, not in a badge. */}
        <div>
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-white">{title}</h1>
          <p className="mt-1 text-[13px] text-white">{typeLabel} briefing · HSG250</p>
        </div>

        {/* Facts */}
        <div className={cardCn}>
          <dl className="divide-y divide-white/[0.08]">
            {facts.map(({ term, value, className }) => (
              <div key={term} className="flex items-baseline gap-4 py-2.5 first:pt-0 last:pb-0">
                <dt className="w-24 shrink-0 text-[13px] text-white">{term}</dt>
                <dd className={cn('min-w-0 flex-1 text-[14px] font-medium text-white', className)}>
                  {value ?? <span className="font-normal text-white">Not recorded</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* What was briefed */}
        {description && (
          <section>
            <SectionHeading>What was briefed</SectionHeading>
            <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">
              {description}
            </p>
          </section>
        )}

        {/* Hazards — one treatment for all twelve. The rainbow encoded nothing. */}
        {hazards.length > 0 && (
          <section>
            <SectionHeading>Hazards identified</SectionHeading>
            <div className="flex flex-wrap gap-2">
              {hazards.map((h: string) => (
                <span
                  key={h}
                  className="rounded-full border border-white/[0.14] bg-white/[0.06] px-3 py-1.5 text-[13px] font-medium text-white"
                >
                  {HAZARD_LABELS[h] || h.replace(/^custom-/, '').replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Photos */}
        {photos.length > 0 && (
          <section>
            <SectionHeading>
              Site photos <span className="font-normal tabular-nums">({photos.length})</span>
            </SectionHeading>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo: any, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewPhoto(photo.url)}
                  className="aspect-square touch-manipulation overflow-hidden rounded-xl border border-white/10"
                >
                  <img
                    src={photoSrcs[photo.url] ?? photo.url}
                    alt={`Site photo ${idx + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Sign-off register — a ruled signing sheet. Each attendee used to sit
            in their own bordered pill with a numbered tile inside it; a register
            is a list, so it is ruled like one. */}
        <section>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              Sign-off register
            </h2>
            <span
              className={cn(
                'shrink-0 text-[13px] font-semibold tabular-nums',
                allSigned ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {signedCount} of {totalAttendees} signed
            </span>
          </div>

          {totalAttendees > 0 && (
            <div className="mb-1 h-0.5 overflow-hidden bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="h-full bg-elec-yellow"
              />
            </div>
          )}

          {attendees.length > 0 ? (
            <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
              {attendees.map((attendee: any, idx: number) => {
                const isSigned =
                  !!attendee.signature || !!attendee.signature_url || !!attendee.acknowledged;
                const canSign = !isSigned && !!attendee._dbId;
                return (
                  <button
                    key={attendee._dbId || idx}
                    type="button"
                    disabled={!canSign}
                    onClick={() => {
                      if (canSign) {
                        setSigningAttendee(attendee);
                        setSignOffName(attendee.name || '');
                        setSignOffDate(new Date().toISOString().split('T')[0]);
                        setSignOffDataUrl('');
                      }
                    }}
                    className={cn(
                      'flex w-full touch-manipulation items-center gap-3 py-3 text-left transition-colors',
                      canSign && 'active:bg-white/[0.04]'
                    )}
                  >
                    <span className="w-5 shrink-0 text-[13px] font-semibold tabular-nums text-white">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-white">{attendee.name}</p>
                      {attendee.role && (
                        <p className="truncate text-[12px] text-white">{attendee.role}</p>
                      )}
                    </div>
                    <span
                      className={cn(
                        'shrink-0 text-[13px] font-medium',
                        canSign ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {isSigned ? 'Signed' : canSign ? 'Tap to sign' : 'Pending'}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="py-6 text-center text-[13px] text-white">
              No one on the register. Nobody has been recorded as attending this briefing.
            </p>
          )}

          {signedCount < totalAttendees && totalAttendees > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowShare(true)}
              className="mt-4 h-11 w-full touch-manipulation border border-elec-yellow/35 font-semibold text-elec-yellow hover:border-elec-yellow/60"
            >
              Share for signing
            </Button>
          )}
        </section>
      </div>

      {/* Sticky bottom bar — three equal actions, labelled. */}
      <div className="safe-area-pb fixed bottom-0 left-0 right-0 border-t border-white/10 bg-elec-dark/95 p-4 backdrop-blur">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onEdit}
            className="h-12 flex-1 touch-manipulation border-white/20 font-medium text-white"
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowShare(true)}
            className="h-12 flex-1 touch-manipulation border-white/20 font-medium text-white"
          >
            Share
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPDF(!showPDF)}
            className="h-12 flex-1 touch-manipulation border-white/20 font-medium text-white"
          >
            PDF
          </Button>
        </div>
      </div>

      {/* PDF Actions (inline above bottom bar) */}
      <AnimatePresence>
        {showPDF && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 z-40 rounded-2xl border border-white/10 bg-[#1e1e1e] p-4 shadow-xl"
          >
            <BriefingPDFActions briefing={briefing} companyProfile={companyProfile} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Sheet */}
      <AnimatePresence>
        {showShare && (
          <BriefingShareSheet
            briefingId={briefing.id}
            briefingName={title}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>

      {/* Sign-off Sheet */}
      <Sheet
        open={!!signingAttendee}
        onOpenChange={(open) => {
          if (!open) setSigningAttendee(null);
        }}
      >
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/10 px-4 py-3">
              <h2 className="text-[17px] font-semibold tracking-tight text-white">
                Sign off: {signingAttendee?.name}
              </h2>
              <p className="mt-0.5 text-[13px] text-white">
                Capture a signature to confirm attendance
              </p>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <SignaturePad
                label="Attendee signature"
                name={signOffName}
                date={signOffDate}
                signatureDataUrl={signOffDataUrl}
                onSignatureChange={setSignOffDataUrl}
                onNameChange={setSignOffName}
                onDateChange={setSignOffDate}
              />
            </div>
            <div className="border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Button
                onClick={async () => {
                  if (!signingAttendee?._dbId || !signOffDataUrl) return;
                  await signOffMutation.mutateAsync({
                    id: signingAttendee._dbId,
                    signature_url: signOffDataUrl,
                    signed_via: 'manual',
                  });
                  setSigningAttendee(null);
                  setSignOffDataUrl('');
                }}
                disabled={!signOffDataUrl || signOffMutation.isPending}
                className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow font-bold text-black active:scale-[0.98] disabled:opacity-50"
              >
                {signOffMutation.isPending ? 'Saving…' : 'Confirm sign-off'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Full-screen photo preview */}
      <AnimatePresence>
        {previewPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setPreviewPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Close photo"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={photoSrcs[previewPhoto] ?? previewPhoto}
              alt="Site photo"
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

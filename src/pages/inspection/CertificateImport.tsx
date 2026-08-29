/**
 * CertificateImport.tsx — ELE-1368
 *
 * "Is there a way you can scan paper certs into the digital?"
 *
 * Photograph or upload a paper / PDF certificate, have it read, review every
 * field, then land it as a DRAFT. Three steps, in the order the job happens:
 * say what it is → give us the document → check what we read.
 *
 * 🔴 NOTHING IS EVER AUTO-SIGNED, and nothing is written until the user presses
 * the button on the review step. The parser returns a proposal; the electrician
 * decides. Their name goes on the certificate, so they get the last word on
 * every value that reaches it.
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CalendarClock,
  Check,
  ChevronLeft,
  FileUp,
  Info,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormCard, FieldLabel, SectionHeading } from '@/components/forms';
import { inputCn, textareaCn, grid2Cn } from '@/components/forms/fieldStyles';
import { reportCloud } from '@/utils/reportCloud';
import { generateCertificateNumber } from '@/utils/certificateNumbering';
import { isPdf, pdfToPageImages } from '@/utils/pdf-to-pages';
import {
  CERT_IMPORT_OPTIONS,
  IMPORT_FIELD_LABEL,
  type CertImportType,
} from '@/data/certImportFields';

type Step = 'type' | 'upload' | 'review';

interface ParseResult {
  fields: Record<string, string>;
  fieldConfidence: Record<string, number>;
  /** Deterministic checks — impossible dates, non-numeric measurements, bad enums. */
  fieldWarnings: Record<string, string>;
  /** The schedule of test results, read one page at a time. */
  schedule?: {
    found: boolean;
    circuits: Record<string, string>[];
    count: number;
    rowsSeen: number;
    truncated: boolean;
  };
  /** Second pass: each value re-checked against the document itself. */
  verified: boolean;
  verification: Record<string, { status: string; suggested?: string }>;
  confirmedCount: number;
  pageCount: number;
  /** Set when the imported certificate is already past its next-inspection date. */
  overdue: { is: boolean; date: string; years: number } | null;
  unreadableFields: string[];
  notes: string;
  detected: { type: string; confidence: number; mismatch: boolean; reason: string };
}

/*
 * Below this, the field is surfaced as "worth checking". 0.85 rather than
 * something lower because printed text comes back at 1.0 and handwriting is
 * told to stay under 0.8 — so the band between them is where genuine doubt
 * lives, and flagging everything would be the same as flagging nothing.
 */
const CHECK_BELOW = 0.85;

/** The three steps, in order. `n` is shown in the pip when not yet done. */
const STEPS: { id: Step; n: number; label: string }[] = [
  { id: 'type', n: 1, label: 'Type' },
  { id: 'upload', n: 2, label: 'Document' },
  { id: 'review', n: 3, label: 'Check' },
];

export default function CertificateImport() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('type');
  const [certType, setCertType] = useState<CertImportType | null>(null);
  const [fileName, setFileName] = useState('');
  /** Page order actually sent, shown back so the user can catch a bad sort. */
  const [pageNames, setPageNames] = useState<string[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setResult(null);
    setValues({});
    setError(null);
    setFileName('');
    setPageNames([]);
  };

  /* ── Upload, then parse ───────────────────────────────────────────── */
  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
     * 🔴 SORT BY FILENAME — the picker's order is NOT page order.
     *
     * `e.target.files` comes back in whatever order the platform's picker used,
     * which on a mobile multi-select is usually the order the user tapped them,
     * not the order the pages go in. Handing the model page 3, then 1, then 2
     * and telling it they are consecutive is worse than not saying so at all.
     *
     * Camera-roll names sort correctly (IMG_0101, IMG_0102 …), and `numeric`
     * stops IMG_10 sorting before IMG_9. It is a heuristic, not a guarantee —
     * which is why the picked order is shown back to the user below rather than
     * assumed to be right.
     */
    const picked = Array.from(e.target.files ?? []).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );
    e.target.value = '';
    if (!picked.length || !certType) return;

    setIsWorking(true);
    setError(null);
    setFileName(picked.length === 1 ? picked[0].name : `${picked.length} pages`);
    setPageNames(picked.map((f) => f.name));
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      /*
       * 🔴 EVERY PAGE GOES UP, and they are read together as ONE document.
       *
       * A paper EICR runs to several sheets and a phone photographs one at a
       * time. Reading a single page returned only the fields that happened to
       * be on it — the supply particulars live on a later sheet — which looked
       * like the reader had failed rather than been handed a third of the cert.
       *
       * The originals are kept, not discarded: a transcription can only be
       * settled against the paper it came from.
       *
       * 🔴 Bucket is `cert-imports`, NOT `inspection-photos`. That one permits
       * only jpeg/png/webp/gif and caps at 5MB, so it rejects both likely
       * inputs — a PDF, and an iPhone photo, which is HEIC — with a mime error
       * that explains neither.
       */
      /*
       * 🔴 A PDF IS SPLIT INTO PAGES BEFORE IT GOES UP.
       *
       * The schedule of test results can only be read a page at a time — the
       * whole document in one call returned 1 row of 5 on a real EICR, the
       * single page returned 5 of 5. Photographs are already one image per
       * page; this puts PDFs on the same footing.
       *
       * Falls back to the original file if the split fails: a whole-document
       * read is worse, but it is not an error.
       */
      const toUpload: File[] = [];
      for (const f of picked) {
        if (isPdf(f)) {
          const pages = await pdfToPageImages(f);
          if (pages?.length) {
            toUpload.push(...pages.map((pg) => pg.file));
            continue;
          }
        }
        toUpload.push(f);
      }
      if (toUpload.length > picked.length) {
        setFileName(`${toUpload.length} pages`);
        setPageNames(toUpload.map((f) => f.name));
      }

      const fileUrls: string[] = [];
      for (const file of toUpload) {
        const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('cert-imports')
          .upload(path, file, { contentType: file.type || undefined, upsert: false });
        if (upErr) throw new Error(`Upload failed: ${upErr.message}`);

        const {
          data: { publicUrl },
        } = supabase.storage.from('cert-imports').getPublicUrl(path);
        fileUrls.push(publicUrl);
      }

      /*
       * Two requests at once, not one that does both.
       *
       * The header read plus verification is ~35s; the schedule is a grid
       * across every page and takes longer. Sequentially that is over a minute
       * of spinner, and it breached the function's own timeout — the schedule
       * came back silently empty on exactly the long documents this exists for.
       * Run together, the wait is the slower of the two.
       */
      const [headerRes, scheduleRes] = await Promise.all([
        supabase.functions.invoke('parse-certificate-import', { body: { fileUrls, certType } }),
        certType === 'minor-works'
          ? Promise.resolve(null)
          : supabase.functions
              .invoke('parse-certificate-import', {
                body: { fileUrls, certType, scheduleOnly: true },
              })
              /* Never let a failed schedule lose a good header read. */
              .catch(() => null),
      ]);

      const { data, error: fnErr } = headerRes;
      if (fnErr) throw new Error(fnErr.message || 'Could not read the document');
      if (!data?.success) throw new Error(data?.error || 'Could not read the document');

      const sched = (scheduleRes as { data?: { schedule?: ParseResult['schedule'] } } | null)?.data
        ?.schedule;
      setResult({ ...(data as ParseResult), schedule: sched });
      setValues({ ...(data.fields ?? {}) });
      setStep('review');
      const n = Object.keys(data.fields ?? {}).length;
      toast.success(`Read ${n} field${n === 1 ? '' : 's'}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not read the document';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsWorking(false);
    }
  };

  /* ── Create the draft ─────────────────────────────────────────────── */
  const createDraft = async () => {
    if (!certType) return;
    setIsWorking(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      /*
       * A NEW number is minted rather than reusing the one on the paper. The
       * original reference is carried across as `importedFromReference` so the
       * link back is not lost — but two certificates sharing a number, one on
       * paper and one in the system, is a filing problem nobody wants and the
       * numbering sequence is scoped to the business.
       */
      const certificateNumber = await generateCertificateNumber(certType);
      const reportId = `${certType.toUpperCase()}-${crypto.randomUUID()}`;

      const data: Record<string, unknown> = {
        ...values,
        /*
         * 🔴 `scheduleOfTests` is the field the EICR schedule actually reads —
         * verified against 5,128 live circuit rows, not guessed. `circuits`
         * exists on 736 reports and is empty on every one of them, so writing
         * there would have looked right and shown nothing.
         *
         * Each row gets an `id` because the schedule keys its React rows on it
         * and dedupes by it; rows arriving without one collapse into each other.
         */
        ...(result?.schedule?.circuits?.length
          ? {
              scheduleOfTests: result.schedule.circuits.map((c) => ({
                id: crypto.randomUUID(),
                ...c,
              })),
            }
          : {}),
        _clientCertId: crypto.randomUUID(),
        /*
         * The paper's own reference is kept as provenance, but this report gets
         * a NEW number. Two certificates sharing one reference — one on paper,
         * one in the system — is a filing problem nobody wants, and the
         * sequence is scoped to the business.
         */
        certificateNumber,
        importedFromReference: result?.fields.certificateNumber ?? '',
        importedAt: new Date().toISOString(),
      };

      const created = await reportCloud.createReport(
        user.id,
        certType,
        data,
        undefined,
        false,
        reportId
      );
      if (!created?.success) throw new Error('The draft could not be saved');

      toast.success('Draft created — check it before issuing');
      navigate(
        `/electrician/inspection-testing?section=${certType}&reportId=${encodeURIComponent(
          created.reportId ?? reportId
        )}`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not create the draft';
      toast.error(msg);
      setIsWorking(false);
    }
  };

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const lowConfidence = result
    ? Object.keys(values).filter(
        (k) =>
          (result.fieldConfidence[k] ?? 1) < CHECK_BELOW ||
          result.unreadableFields.includes(k) ||
          !!result.fieldWarnings?.[k]
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/*
        🔴 THE TITLE ALIGNS WITH THE CONTENT BELOW IT.

        It used to sit inline after the back button, so the back button's 44px
        hit area plus the gap pushed it ~48px further right than the cards —
        close enough to read as a mistake rather than an indent, and the first
        thing the eye catches on a wide screen.

        Fixed by giving the back link its own row. Everything in the header now
        starts on the same left edge as the cards, and the title gets room to be
        an actual page title rather than a 15px label. The step rail sits on the
        title's baseline, right-aligned, filling what was dead space.
      */}
      <header className="sticky top-0 z-20 border-b border-white/[0.1] bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 pb-3 pt-2 lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
          {/*
            `-ml-2` cancels the button's own left padding so the chevron's
            optical edge lines up with the title beneath it, not 8px inside it.
          */}
          <button
            onClick={() => (step === 'type' ? navigate(-1) : (setStep('type'), reset()))}
            className="-ml-2 flex h-9 items-center gap-1 rounded-lg px-2 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.06] touch-manipulation"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 'type' ? 'Back' : 'Start again'}
          </button>

          <div className="mt-1 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <h1 className="truncate text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[22px]">
                Import a certificate
              </h1>
              <p className="mt-0.5 truncate text-[13px] leading-tight text-white">
                {certType
                  ? `${CERT_IMPORT_OPTIONS.find((o) => o.value === certType)?.title} · ${STEPS[stepIndex].n} of ${STEPS.length} — ${STEPS[stepIndex].label}`
                  : 'Turn paper or a PDF into a draft certificate'}
              </p>
            </div>

            <nav
              aria-label="Import steps"
              className="hidden flex-shrink-0 items-center gap-1 pb-0.5 sm:flex"
            >
              {STEPS.map((st, i) => {
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={st.id} className="flex items-center gap-1">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className={cn(
                          'h-px w-4 lg:w-8',
                          done || active ? 'bg-elec-yellow/50' : 'bg-white/[0.14]'
                        )}
                      />
                    )}
                    <span
                      aria-current={active ? 'step' : undefined}
                      className={cn(
                        'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors',
                        active && 'border-elec-yellow/60 bg-elec-yellow/[0.12] text-white',
                        done && 'border-transparent text-white',
                        !active && !done && 'border-transparent text-white/70'
                      )}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5 text-elec-yellow" />
                      ) : (
                        <span
                          className={cn(
                            'flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold',
                            active ? 'bg-elec-yellow text-black' : 'bg-white/[0.14] text-white'
                          )}
                        >
                          {st.n}
                        </span>
                      )}
                      <span className="hidden lg:inline">{st.label}</span>
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/*
        Width is a middle course, and both extremes were wrong.

        At `lg:max-w-[1600px]` (copied from the certificate forms) a single
        yellow button stretched to 1400px and the type cards were seven-tenths
        empty — broken, not spacious. Pinned back to `max-w-3xl` everywhere it
        went the other way: a 768px column stranded in dead space on a 27"
        screen.

        5xl/6xl gives the cards room to sit two-up without any one element
        growing absurdly wide.
      */}
      <main className="mx-auto max-w-3xl px-4 py-4 pb-32 lg:max-w-5xl lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
        {/* ── Step 1: which certificate ──────────────────────────────── */}
        {step === 'type' && (
          /*
            🔴 TWO COLUMNS FROM xl:, not one centred column.
            A short wizard step in a single column leaves wide gutters either
            side AND a tall void underneath — the page reads as unfinished
            rather than uncluttered. Widening the column alone does not fix it:
            it just stretches the same elements. Putting the guidance beside
            the choices uses the width for something, and shortens the void.
            Below xl: it stacks, which is the right order to read it in anyway.
          */
          <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:items-start">
            <FormCard className="xl:mx-0 xl:rounded-2xl">
              <SectionHeading title="What are you importing?" />
              <p className="text-[13px] leading-snug text-white">
                Telling us up front is what makes this accurate — it lets the
                reader look for the fields that belong on that form instead of
                guessing at the page.
              </p>
              {/*
                Two-up from sm:. Stacked, each card was a full-width band with
                four words in it — a lot of scrolling for three choices, and on
                desktop it read as a list of banners rather than a choice.
                `items-stretch` keeps them equal height when one subtitle wraps
                to two lines and another does not.
              */}
              <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
                {CERT_IMPORT_OPTIONS.map((o, i) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      setCertType(o.value);
                      reset();
                      setStep('upload');
                    }}
                    className={cn(
                      'flex h-full w-full flex-col rounded-xl border border-white/[0.14] bg-white/[0.05] p-4 text-left transition-colors hover:border-white/[0.28] hover:bg-white/[0.09] touch-manipulation active:scale-[0.99]',
                      /*
                       * Three cards in a two-column grid leaves a hole in the
                       * bottom-right that reads as a missing option. The last
                       * one spans the row instead, so the block ends square.
                       * Keyed off `length - 1` rather than index 2, so adding a
                       * fourth type gives a clean 2×2 with no edit here.
                       */
                      i === CERT_IMPORT_OPTIONS.length - 1 &&
                        CERT_IMPORT_OPTIONS.length % 2 === 1 &&
                        'sm:col-span-2'
                    )}
                  >
                    <span className="block text-[15px] font-semibold text-white">{o.title}</span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white">
                      {o.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </FormCard>

            <aside className="-mx-4 space-y-3 border-y border-white/[0.12] bg-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x xl:sticky xl:top-24">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
                <p className="text-[13px] leading-snug text-white">
                  The client, installation and supply details are read from the
                  document. The circuit-by-circuit schedule of test results is
                  not — that still has to be entered, or scanned at the board.
                </p>
              </div>

              {/*
                🔴 `hidden xl:block` — this exists to give the DESKTOP column
                substance. Stacked underneath on a phone it just added scroll
                between the user and the three buttons they came to press, and
                repeated what the cards already say. The one-line note above
                stays at every width because it is the one thing they could not
                otherwise know: the test schedule is not read.
              */}
              <div className="hidden space-y-2 border-t border-white/[0.1] pt-3 xl:block">
                {[
                  ['Paper or PDF', 'Photograph every page, or upload a scan. Both are read the same way.'],
                  ['Nothing is signed', 'It lands as a draft. You check every field before it becomes a certificate.'],
                  ['Read twice', 'Each value is checked back against the document, and anything doubtful is flagged.'],
                ].map(([title, body]) => (
                  <div key={title}>
                    <p className="text-[12px] font-semibold text-white">{title}</p>
                    <p className="text-[12px] leading-snug text-white">{body}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* ── Step 2: the document ───────────────────────────────────── */}
        {step === 'upload' && (
          /* Same two-column shell as step 1 — see the note there. */
          <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:items-start">
            {/*
              No "Importing as EICR · Change" strip here any more.

              The header now carries the chosen type in its subtitle and the
              back link reads "Start again", so the strip repeated both the
              information and the action directly beneath them. Two ways to do
              the same thing, eight pixels apart, is clutter rather than
              reassurance.
            */}
            <FormCard>
              <SectionHeading title="Photograph or upload it" />
              <p className="text-[13px] leading-snug text-white">
                A PDF, a scan or straight photographs of the paper all work.
                <span className="font-semibold"> Photographing paper? Select every
                page at once</span> — they are read together as one certificate,
                and the supply details usually sit on a later sheet. Get the whole
                page in frame and as square-on as you can.
              </p>
              <button
                type="button"
                disabled={isWorking}
                onClick={() => fileRef.current?.click()}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:opacity-60"
              >
                {isWorking ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Reading {fileName || 'the document'}…
                  </>
                ) : (
                  <>
                    <FileUp className="h-5 w-5" />
                    Choose photos or a PDF
                  </>
                )}
              </button>
              {isWorking && (
                <p className="text-[12px] leading-snug text-white">
                  A multi-page scan can take up to a minute. Leave this screen open.
                </p>
              )}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                  <p className="text-[13px] leading-snug text-white">{error}</p>
                </div>
              )}
            </FormCard>
            {/*
              Desktop-only: the card's own copy already carries this advice, so
              on a phone this would be the same guidance twice, pushing the
              upload button below the fold.
            */}
            <aside className="hidden space-y-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 xl:sticky xl:top-24 xl:block">
              <p className="text-[13px] font-semibold text-white">Getting a clean read</p>
              {[
                ['Every page, together', 'Select them all at once. The supply details are usually on a later sheet, and a single page gives a third of the certificate.'],
                ['Flat and square-on', 'Corner to corner in frame. A steep angle or a shadow across the page costs you fields.'],
                ['Good light beats resolution', 'An evenly lit phone photo reads better than a dark high-resolution one.'],
              ].map(([title, body]) => (
                <div key={title}>
                  <p className="text-[12px] font-semibold text-white">{title}</p>
                  <p className="text-[12px] leading-snug text-white">{body}</p>
                </div>
              ))}
            </aside>

            {/*
              🔴 No `capture` attribute. It would force the camera and, on iOS,
              remove the option to pick an existing file — which is how most of
              these arrive. Same trap as the thermal images on ELE-1110.
            */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={onPickFile}
              className="hidden"
            />
          </div>
        )}

        {/* ── Step 3: review ─────────────────────────────────────────── */}
        {step === 'review' && result && Object.keys(values).length > 0 && (
          <div className="space-y-5">
            {/*
              🔴 The mismatch guard, surfaced. Somebody working through a box of
              old paperwork will mis-sort one, and mapping an EIC onto an EICR
              silently produces a confidently wrong certificate.
            */}
            {result.detected.mismatch && (
              <div className="-mx-4 border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-300" />
                  <div>
                    <p className="text-[14px] font-semibold text-orange-300">
                      This may not be the right form
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white">
                      {result.detected.reason} Go back and pick again, or carry
                      on if you are sure.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/*
              🔴 Nothing found is a RESULT, not a form to fill in.
              Without this the user landed on an empty review screen with a
              live "Create draft certificate" button — one tap from an entirely
              blank certificate carrying a fresh number.
            */}
            {Object.keys(values).length === 0 && (
              <div className="-mx-4 border-y border-orange-500/30 bg-orange-500/10 p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-300" />
                  <div>
                    <p className="text-[14px] font-semibold text-orange-300">
                      Nothing could be read from that
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white">
                      Try again with the whole page in frame, square-on and in
                      better light. If it is a paper certificate, select every
                      page at once.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {pageNames.length > 1 && (
              <FormCard>
                <SectionHeading title={`Read as ${pageNames.length} pages, in this order`} />
                <ol className="space-y-1">
                  {pageNames.map((n, i) => (
                    <li key={`${n}-${i}`} className="text-[12px] leading-snug text-white">
                      <span className="font-semibold">{i + 1}.</span> {n}
                    </li>
                  ))}
                </ol>
                <p className="text-[12px] leading-snug text-white">
                  Sorted by filename. If that is not the page order, go back and
                  rename them or add them one at a time.
                </p>
              </FormCard>
            )}

            {/*
              🔴 AN OVERDUE IMPORT IS A JOB, NOT A WARNING.
              Importing a back-catalogue means importing history, and most of it
              is expired — 371 EICR/EIC in live data are already past due. The
              renewal cron only looks FORWARD, so every one of those is
              invisible to it: a property that legally needs re-testing and a
              job nobody is being told about. This is the one moment the
              electrician is looking straight at the certificate, so it is said
              here, and framed as the opportunity it is.
            */}
            {result.overdue?.is && (
              <div className="-mx-4 border-y border-amber-400/35 bg-amber-400/[0.10] p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
                <div className="flex gap-3">
                  <CalendarClock className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-amber-300">
                      This one is due for re-testing
                      {result.overdue.years >= 1 && ` — ${result.overdue.years} years ago`}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white">
                      The certificate gave a next inspection date of{' '}
                      <span className="font-semibold">{result.overdue.date}</span>, which has
                      passed. Once this is saved you have the client and the address on file,
                      so it is a straightforward one to go back to.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <FormCard>
              <div className="flex items-baseline justify-between gap-3">
                <SectionHeading title="What we read" className="mb-0" />
                <span className="text-[13px] font-semibold text-white">
                  {Object.keys(values).length} fields
                </span>
              </div>
              <p className="text-[13px] leading-snug text-white">
                Check it against the original before you create the draft.
                Nothing here is signed, and nothing is saved until you press the
                button at the bottom.
                {lowConfidence.length > 0 && (
                  <>
                    {' '}
                    <span className="font-semibold text-orange-300">
                      {lowConfidence.length} field
                      {lowConfidence.length === 1 ? '' : 's'} worth checking
                    </span>{' '}
                    {lowConfidence.length === 1 ? 'is' : 'are'} marked below.
                  </>
                )}
              </p>

              {/*
                The second pass did real work — say so.
                Every value is read back off the document a second time and
                checked, which catches a confident misreading that confidence
                alone never would. Silently doing that and showing nothing
                wastes the reassurance it buys, and leaves the reviewer no way
                to tell a checked field from an unchecked one.
              */}
              {result.verified && (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                  <p className="text-[12px] leading-snug text-white">
                    <span className="font-semibold text-emerald-300">
                      {result.confirmedCount} of {Object.keys(values).length} checked
                      back against the document
                    </span>
                    {result.confirmedCount < Object.keys(values).length
                      ? ' — the rest are flagged below.'
                      : '. Still worth a glance before you issue it.'}
                  </p>
                </div>
              )}
              {result.notes && (
                <p className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 text-[12px] leading-snug text-white">
                  {result.notes}
                </p>
              )}
            </FormCard>

            {/*
              The schedule, summarised. Not editable here on purpose: it is a
              grid of 14 columns, and the place to work on it is the actual
              schedule screen with its column fill and find-replace. What the
              reviewer needs at this moment is whether it read, and whether it
              read EVERYTHING.
            */}
            {result.schedule?.found && (
              <FormCard>
                <div className="flex items-baseline justify-between gap-3">
                  <SectionHeading title="Circuits found" className="mb-0" />
                  <span className="text-[13px] font-semibold text-white">
                    {result.schedule.count} circuit{result.schedule.count === 1 ? '' : 's'}
                  </span>
                </div>

                {result.schedule.truncated && (
                  <div className="flex gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-300" />
                    <p className="text-[12px] leading-snug text-white">
                      <span className="font-semibold text-orange-300">
                        Only {result.schedule.count} of {result.schedule.rowsSeen} rows came
                        back.
                      </span>{' '}
                      A partly-read schedule looks complete, so check it against the paper —
                      the missing circuits will not be obvious later.
                    </p>
                  </div>
                )}

                <div className="-mx-1 overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-[12px]">
                    <thead>
                      <tr className="border-b border-white/[0.14]">
                        {['#', 'Circuit', 'Device', 'Live', 'cpc'].map((h) => (
                          <th key={h} className="px-2 py-1.5 text-left font-semibold text-white">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.circuits.map((c, i) => (
                        <tr key={i} className="border-b border-white/[0.07]">
                          <td className="px-2 py-1.5 font-mono text-white">{c.circuitNumber}</td>
                          <td className="px-2 py-1.5 text-white">{c.circuitDescription || '—'}</td>
                          <td className="px-2 py-1.5 text-white">
                            {[c.protectiveDeviceRating && `${c.protectiveDeviceRating}A`, c.protectiveDeviceCurve]
                              .filter(Boolean)
                              .join(' ') || '—'}
                          </td>
                          <td className="px-2 py-1.5 text-white">{c.liveSize || '—'}</td>
                          <td className="px-2 py-1.5 text-white">{c.cpcSize || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[12px] leading-snug text-white">
                  The circuit list lands on the draft's schedule so you are not retyping it.
                  <span className="font-semibold"> Test results are deliberately not
                  imported</span> — those are yours to measure, not the old certificate's to
                  hand over.
                </p>
              </FormCard>
            )}

            <FormCard>
              <div className={grid2Cn}>
                {Object.keys(values).map((key) => {
                  const warning = result.fieldWarnings?.[key];
                  const flagged =
                    (result.fieldConfidence[key] ?? 1) < CHECK_BELOW ||
                    result.unreadableFields.includes(key) ||
                    !!warning;
                  return (
                    <div key={key} className="col-span-2 sm:col-span-1">
                      <FieldLabel>
                        {IMPORT_FIELD_LABEL[key] ?? key}
                        {flagged && (
                          <span className="ml-1 font-normal text-orange-300">— check this</span>
                        )}
                      </FieldLabel>
                      {/*
                        🔴 A value you cannot see is a value you cannot check.

                        Everything was a single-line input, so an address or an
                        extent-of-installation ran off the right-hand edge and
                        was unreadable on a phone — on the one screen whose
                        entire job is comparing what we read against the paper.
                        Anything long enough to clip becomes a textarea.
                      */}
                      {values[key].length > 38 ? (
                        <Textarea
                          value={values[key]}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className={cn(
                            textareaCn,
                            /*
                             * 44px, matching an input's height, NOT the 80-100px
                             * the component defaults to. The wrap threshold is
                             * tuned for a 390px phone, so on a wide desktop a
                             * postcode-length address fits on one line and the
                             * taller box left an empty void beside the
                             * single-line field next to it.
                             *
                             * ⚠️ The `md:` variant MUST be overridden too. The
                             * Textarea component carries `min-h-[100px]
                             * md:min-h-[80px]`, and tailwind-merge treats a
                             * responsive variant as a separate property — so a
                             * bare `min-h-[44px]` is silently beaten by
                             * `md:min-h-[80px]` at exactly the widths this was
                             * meant to fix.
                             */
                            'min-h-[44px] md:min-h-[44px]',
                            flagged && 'ring-1 ring-orange-400/50'
                          )}
                        />
                      ) : (
                        <Input
                          value={values[key]}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className={cn(inputCn, flagged && 'border-b-orange-400/60')}
                        />
                      )}
                      {/*
                        A deterministic check that failed says something the
                        confidence score cannot: not "I am unsure", but "this
                        value cannot be right". Worth its own line.
                      */}
                      {warning && (
                        <p className="mt-1 text-[11px] leading-snug text-orange-300">{warning}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </FormCard>
          </div>
        )}
      </main>

      {step === 'review' && result && (
        /*
         * 🔴 `right-0` + `left: var(--sidebar-width)`, NOT `inset-x-0`.
         *
         * inset-x-0 pins the bar to the VIEWPORT, so on desktop it ran the full
         * width and straight under the navigation sidebar. The app already
         * solves this — CertShellFooter reads the same custom property — and the
         * 0px fallback keeps it full width on mobile, where there is no sidebar.
         */
        <div
          className="fixed bottom-0 right-0 z-20 border-t border-white/[0.1] bg-background/95 p-4 backdrop-blur"
          style={{ left: 'var(--sidebar-width, 0px)' }}
        >
          <div className="mx-auto max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <button
              onClick={createDraft}
              disabled={isWorking}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation active:scale-[0.98] disabled:opacity-60"
            >
              {isWorking ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              Create draft certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PenLine,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { certificateTypeLabel } from '@/utils/certificate-href';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import {
  useClientPortalPage,
  usePortalThread,
  useReviewOptOut,
  useSendPortalMessage,
  type ClientPortal,
  type JobStage,
  type PortalCertificate,
  type PortalCrew,
  type PortalError,
  type PortalInvoice,
  type PortalJob,
} from '@/hooks/usePublicPortal';

/* ==========================================================================
   /portal/:token — the customer's own page with a firm (ELE-1996, ELE-1837).

   The letting agent with 40 flats opens one link and sees, without ringing
   the office: which jobs are booked and who is coming, the certificates to
   download, quotes waiting for an answer, invoices with Pay now, and a
   message thread with the firm. Everything comes from client_portal_get,
   which returns only this customer's public fields.
   ========================================================================== */

// ── formatting ──────────────────────────────────────────────────────────────
const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

const dayDate = (d: string | null) =>
  d
    ? new Date(d.length === 10 ? `${d}T12:00:00` : d).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    : '';

const longDate = (d: string | null) =>
  d
    ? new Date(d.length === 10 ? `${d}T12:00:00` : d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const monthYear = (d: string | null) =>
  d
    ? new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      })
    : '';

const stamp = (d: string) =>
  new Date(d).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

const listNames = (names: string[]) =>
  names.length <= 1
    ? names[0] || ''
    : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;

// ── branding ────────────────────────────────────────────────────────────────
const FALLBACK_BRAND = '#FACC15';

function brandColour(hex: string | null | undefined): string {
  return hex && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex.trim()) ? hex.trim() : FALLBACK_BRAND;
}

function textOn(hex: string): string {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return lum > 0.4 ? '#000000' : '#FFFFFF';
}

// ── small parts ─────────────────────────────────────────────────────────────
const card =
  '-mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-y sm:border border-white/[0.1] bg-[hsl(0_0%_11%)]';

function SectionTitle({ id, title, meta }: { id?: string; title: string; meta?: ReactNode }) {
  return (
    <div id={id} className="flex items-baseline justify-between gap-3 mb-3 scroll-mt-20">
      <h2 className="text-[17px] font-semibold tracking-tight text-white">{title}</h2>
      {meta && <div className="text-[13px] text-white">{meta}</div>}
    </div>
  );
}

const stageMeta: Record<JobStage, { label: string; cls: string }> = {
  arranging: { label: 'Being arranged', cls: 'border-white/30 text-white' },
  booked: { label: 'Booked', cls: 'border-sky-400/60 text-sky-300' },
  in_progress: { label: 'In progress', cls: 'border-amber-400/60 text-amber-300' },
  on_hold: { label: 'On hold', cls: 'border-orange-400/60 text-orange-300' },
  complete: { label: 'Complete', cls: 'border-emerald-400/60 text-emerald-300' },
};

function StatusTag({ label, cls }: { label: string; cls: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[12px] font-medium',
        cls
      )}
    >
      {label}
    </span>
  );
}

function BrandButton({
  href,
  onClick,
  children,
  style,
  className,
  external,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  style: CSSProperties;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    'inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-transform',
    className
  );
  return href ? (
    <a
      href={href}
      className={cls}
      style={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

const ghostBtn =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] px-4 text-[14px] font-medium text-white touch-manipulation active:scale-[0.98] transition-transform';

// ── crew line ───────────────────────────────────────────────────────────────
function crewLine(job: PortalJob): string | null {
  const c: PortalCrew | null = job.crew;
  if (job.stage === 'complete') {
    return job.completed_at ? `Completed ${longDate(job.completed_at)}` : 'Completed';
  }
  if (!c || c.count === 0) return null;
  if (c.today_count > 0) {
    const named = c.today;
    const others = c.today_count - named.length;
    if (named.length === 0)
      return `On site today: ${c.today_count} ${c.today_count === 1 ? 'person' : 'people'} from the team`;
    return `On site today: ${listNames(others > 0 ? [...named, `${others} other${others === 1 ? '' : 's'}`] : named)}`;
  }
  if (c.next_date) {
    const when = `${dayDate(c.next_date)}${c.next_time ? `, from ${c.next_time.slice(0, 5)}` : ''}`;
    if (c.named.length > 0) return `Next visit ${when}: ${listNames(c.named)}`;
    return `Next visit ${when}: ${c.count} ${c.count === 1 ? 'person' : 'people'} booked`;
  }
  return null;
}

function whenLine(job: PortalJob): string {
  if (job.start_date && job.end_date && job.end_date !== job.start_date)
    return `${dayDate(job.start_date)} to ${dayDate(job.end_date)}`;
  if (job.start_date) return dayDate(job.start_date);
  return 'Date to be confirmed';
}

/** Group jobs (and certificates) by the property they are at. */
function groupByAddress<T>(items: T[], addr: (t: T) => string | null) {
  const groups = new Map<string, { label: string; items: T[] }>();
  for (const it of items) {
    const raw = (addr(it) || '').trim();
    const firstLine = raw.split(/\n|,/)[0]?.trim() || '';
    const key = firstLine.toLowerCase() || '—';
    const g = groups.get(key) ?? { label: raw.replace(/\n/g, ', ') || 'Address not given', items: [] };
    g.items.push(it);
    groups.set(key, g);
  }
  return [...groups.values()];
}

// ── page ────────────────────────────────────────────────────────────────────
export default function ClientPortalView() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading, isError, refetch } = useClientPortalPage(token);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto" />
          <p className="text-[15px] text-white">Opening your page…</p>
        </div>
      </div>
    );
  }

  if (isError || !data || 'error' in data) {
    const err: PortalError | 'network' = isError
      ? 'network'
      : data && 'error' in data
        ? data.error
        : 'not_found';
    return <PortalProblem error={err} onRetry={() => refetch()} />;
  }

  return <PortalPage token={token!} portal={data} />;
}

function PortalProblem({ error, onRetry }: { error: PortalError | 'network'; onRetry: () => void }) {
  const copy: Record<typeof error, { title: string; body: string }> = {
    not_found: {
      title: 'This link is not working',
      body: 'It may have been switched off or typed wrongly. Please ask the company that sent it for a new link.',
    },
    paused: {
      title: 'This page is paused',
      body: 'The company has paused this page for now. Please get in touch with them if you need anything.',
    },
    expired: {
      title: 'This link has expired',
      body: 'Please ask the company that sent it for a new link.',
    },
    rate_limited: {
      title: 'Please try again in a few minutes',
      body: 'This page has been opened a lot in a short time.',
    },
    network: {
      title: 'We could not load your page',
      body: 'Check your connection and try again.',
    },
  };
  const c = copy[error];
  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-6">
      <div className="max-w-sm text-center space-y-3">
        <h1 className="text-[22px] font-semibold tracking-tight text-white">{c.title}</h1>
        <p className="text-[15px] leading-relaxed text-white">{c.body}</p>
        {(error === 'network' || error === 'rate_limited') && (
          <button type="button" onClick={onRetry} className={cn(ghostBtn, 'mt-2')}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

function PortalPage({ token, portal }: { token: string; portal: ClientPortal }) {
  const brand = brandColour(portal.firm.primary_color);
  const brandStyle: CSSProperties = { backgroundColor: brand, color: textOn(brand) };
  const firm = portal.firm.name;
  const greetingName = portal.customer.company_name || portal.customer.name;
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState('');

  const unpaid = portal.invoices.filter((i) => i.state !== 'paid');
  const owed = unpaid.reduce((s, i) => s + Math.max(0, i.total - i.paid_so_far), 0);
  const upcoming = portal.jobs.filter((j) => j.stage !== 'complete');
  const done = portal.jobs.filter((j) => j.stage === 'complete');
  const readyCerts = portal.certificates.filter((c) => c.state === 'ready').length;
  const jobGroups = useMemo(() => groupByAddress(portal.jobs, (j) => j.address), [portal.jobs]);

  const askFor = (text: string) => {
    setDraft(text);
    document.getElementById('messages')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => composerRef.current?.focus(), 400);
  };

  const nav = [
    { id: 'jobs', label: 'Jobs', n: portal.jobs.length },
    { id: 'certificates', label: 'Certificates', n: portal.certificates.length },
    { id: 'invoices', label: 'Invoices', n: portal.invoices.length },
    { id: 'messages', label: 'Messages', n: null },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] text-white pb-16">
      <div className="h-1.5" style={{ backgroundColor: brand }} />

      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="flex items-center gap-3">
          {portal.firm.logo_url ? (
            <div className="h-12 w-12 shrink-0 rounded-xl bg-white p-1.5 flex items-center justify-center overflow-hidden">
              <img
                src={portal.firm.logo_url}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div
              className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-[17px] font-bold"
              style={brandStyle}
            >
              {firm.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-white truncate">{firm}</p>
            {portal.firm.registration_scheme && (
              <p className="text-[12px] text-white">
                {portal.firm.registration_scheme} registered
              </p>
            )}
          </div>
        </div>

        <h1 className="mt-6 text-[26px] sm:text-[32px] font-semibold tracking-tight leading-tight text-white">
          Hello {greetingName}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-white max-w-2xl">
          Your jobs, certificates and invoices with {firm}, all in one place.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 max-w-md">
          {portal.firm.phone ? (
            <a href={`tel:${portal.firm.phone.replace(/\s+/g, '')}`} className={ghostBtn}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          ) : (
            <span />
          )}
          {portal.firm.email ? (
            <a href={`mailto:${portal.firm.email}`} className={ghostBtn}>
              <Mail className="h-4 w-4" />
              Email
            </a>
          ) : (
            <span />
          )}
          <button type="button" className={ghostBtn} onClick={() => askFor('')}>
            <MessageCircle className="h-4 w-4" />
            Message
          </button>
        </div>
      </header>

      {/* Jump bar */}
      <nav className="sticky top-0 z-20 mt-6 border-y border-white/[0.08] bg-[hsl(0_0%_7%)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex gap-1.5 sm:gap-2 overflow-x-auto py-2 [scrollbar-width:none]">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full border border-white/[0.14] bg-white/[0.06] px-3 sm:px-4 text-[13px] sm:text-[14px] font-medium text-white touch-manipulation"
            >
              {n.label}
              {n.n ? <span className="tabular-nums">{n.n}</span> : null}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-8">
        {/* Left: what needs you, jobs, certificates */}
        <div className="space-y-8 min-w-0">
          <NeedsYou
            portal={portal}
            unpaidCount={unpaid.length}
            owed={owed}
            brandStyle={brandStyle}
          />

          {portal.review && (
            <ReviewAsk token={token} review={portal.review} firm={firm} brandStyle={brandStyle} />
          )}

          <section>
            <SectionTitle
              id="jobs"
              title="Jobs"
              meta={
                portal.jobs.length > 0
                  ? `${upcoming.length} open · ${done.length} done`
                  : undefined
              }
            />
            {portal.jobs.length === 0 ? (
              <div className={cn(card, 'p-5')}>
                <p className="text-[15px] text-white">
                  No jobs booked with {firm} at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {jobGroups.map((g) => (
                  <div key={g.label} className="space-y-2">
                    {jobGroups.length > 1 && (
                      <p className="flex items-center gap-1.5 text-[13px] font-medium text-white">
                        <MapPin className="h-3.5 w-3.5" />
                        {g.label}
                      </p>
                    )}
                    <div className={cn(card, 'divide-y divide-white/[0.08]')}>
                      {g.items.map((j) => (
                        <JobRow
                          key={j.id}
                          job={j}
                          showAddress={jobGroups.length === 1}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionTitle
              id="certificates"
              title="Certificates"
              meta={portal.certificates.length > 0 ? `${readyCerts} to download` : undefined}
            />
            {portal.certificates.length === 0 ? (
              <div className={cn(card, 'p-5')}>
                <p className="text-[15px] text-white">
                  Certificates appear here once the work is tested and the certificate is issued.
                </p>
              </div>
            ) : (
              <div className={cn(card, 'divide-y divide-white/[0.08]')}>
                {portal.certificates.map((c) => (
                  <CertRow key={c.id} cert={c} onAsk={askFor} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right: money and messages */}
        <div className="space-y-8 min-w-0 lg:sticky lg:top-20 lg:self-start">
          <section>
            <SectionTitle
              id="invoices"
              title="Invoices"
              meta={unpaid.length > 0 ? `${gbp(owed)} to pay` : undefined}
            />
            {portal.invoices.length === 0 ? (
              <div className={cn(card, 'p-5')}>
                <p className="text-[15px] text-white">No invoices yet.</p>
              </div>
            ) : (
              <div className={cn(card, 'divide-y divide-white/[0.08]')}>
                {portal.invoices.map((inv) => (
                  <InvoiceRow key={inv.id} inv={inv} brandStyle={brandStyle} />
                ))}
              </div>
            )}
            {portal.bank_details && unpaid.some((i) => !i.pay_url) && (
              <div className={cn(card, 'mt-3 p-4')}>
                <p className="text-[13px] font-semibold text-white">Pay by bank transfer</p>
                <p className="mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-white">
                  {portal.bank_details}
                </p>
                <p className="mt-2 text-[13px] text-white">
                  Use the invoice number as the reference.
                </p>
              </div>
            )}
          </section>

          <Thread
            token={token}
            portal={portal}
            draft={draft}
            setDraft={setDraft}
            composerRef={composerRef}
            brandStyle={brandStyle}
          />
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 space-y-1.5">
        <p className="text-[13px] leading-relaxed text-white">
          This page is private to you. Anyone with the link can open it, so please do not share it.
          {portal.expires_at ? ` The link works until ${longDate(portal.expires_at)}.` : ''}
        </p>
        <p className="text-[12px] text-white">Made with Elec-Mate</p>
      </footer>
    </div>
  );
}

// ── needs you ───────────────────────────────────────────────────────────────
function NeedsYou({
  portal,
  unpaidCount,
  owed,
  brandStyle,
}: {
  portal: ClientPortal;
  unpaidCount: number;
  owed: number;
  brandStyle: CSSProperties;
}) {
  const rows: ReactNode[] = [];

  portal.signatures.forEach((s) =>
    rows.push(
      <ActionRow
        key={`s-${s.id}`}
        icon={<PenLine className="h-5 w-5" />}
        title={`Sign: ${s.title}`}
        detail={s.expires_at ? `Link open until ${longDate(s.expires_at)}` : 'Waiting for your signature'}
        action={
          <BrandButton href={s.url} style={brandStyle}>
            Sign
          </BrandButton>
        }
      />
    )
  );

  portal.quotes.forEach((q) =>
    rows.push(
      <ActionRow
        key={`q-${q.id}`}
        icon={<FileText className="h-5 w-5" />}
        title={`${q.is_estimate ? 'Estimate' : 'Quote'} ${q.number ?? ''}${q.title ? ` · ${q.title}` : ''}`}
        detail={`${gbp(q.total)}${q.expires_at ? ` · valid until ${longDate(q.expires_at)}` : ''}`}
        action={
          <BrandButton href={q.url} style={brandStyle}>
            View
          </BrandButton>
        }
      />
    )
  );

  if (unpaidCount > 0)
    rows.push(
      <ActionRow
        key="pay"
        icon={<span className="text-[15px] font-bold">£</span>}
        title={`${unpaidCount} invoice${unpaidCount === 1 ? '' : 's'} to pay`}
        detail={`${gbp(owed)} in total`}
        action={
          <a href="#invoices" className={ghostBtn}>
            See invoices
          </a>
        }
      />
    );

  if (rows.length === 0) return null;
  return (
    <section>
      <SectionTitle title="Waiting for you" />
      <div className={cn(card, 'divide-y divide-white/[0.08]')}>{rows}</div>
    </section>
  );
}

function ActionRow({
  icon,
  title,
  detail,
  action,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  action: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="h-10 w-10 shrink-0 rounded-full border border-white/[0.16] flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-white leading-snug">{title}</p>
        <p className="mt-0.5 text-[13px] text-white">{detail}</p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

// ── rows ────────────────────────────────────────────────────────────────────
function JobRow({ job, showAddress }: { job: PortalJob; showAddress: boolean }) {
  const st = stageMeta[job.stage];
  const crew = crewLine(job);
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] font-semibold leading-snug text-white">{job.title}</p>
        <StatusTag label={st.label} cls={st.cls} />
      </div>
      <p className="flex items-center gap-1.5 text-[14px] text-white">
        <CalendarDays className="h-4 w-4 shrink-0" />
        {whenLine(job)}
      </p>
      {showAddress && job.address && (
        <p className="flex items-start gap-1.5 text-[14px] text-white">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="min-w-0">{job.address}</span>
        </p>
      )}
      {crew && <p className="text-[14px] font-medium text-white">{crew}</p>}
    </div>
  );
}

function CertRow({ cert, onAsk }: { cert: PortalCertificate; onAsk: (t: string) => void }) {
  const label = certificateTypeLabel(cert.report_type);
  const ref = cert.certificate_number || label;
  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-white leading-snug">{label}</p>
        <p className="mt-0.5 text-[13px] text-white">
          {[cert.certificate_number, cert.inspection_date ? `Issued ${longDate(cert.inspection_date)}` : null]
            .filter(Boolean)
            .join(' · ')}
        </p>
        {cert.address && (
          <p className="mt-0.5 text-[13px] text-white truncate">{cert.address.replace(/\n/g, ', ')}</p>
        )}
        {cert.next_inspection_due && (
          <p className="mt-0.5 text-[13px] text-white">
            Next check due {monthYear(cert.next_inspection_due)}
          </p>
        )}
      </div>
      <div className="shrink-0">
        {cert.state === 'ready' && cert.pdf_url ? (
          <a
            href={cert.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ghostBtn, 'w-full sm:w-auto')}
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        ) : cert.state === 'finalising' ? (
          <StatusTag label="Being finalised" cls="border-white/30 text-white" />
        ) : (
          <button
            type="button"
            className={cn(ghostBtn, 'w-full sm:w-auto')}
            onClick={() => onAsk(`Please could you send me a copy of certificate ${ref}?`)}
          >
            Ask for a copy
          </button>
        )}
      </div>
    </div>
  );
}

const invoiceState: Record<PortalInvoice['state'], { label: string; cls: string }> = {
  paid: { label: 'Paid', cls: 'border-emerald-400/60 text-emerald-300' },
  overdue: { label: 'Overdue', cls: 'border-red-400/60 text-red-300' },
  part_paid: { label: 'Part paid', cls: 'border-amber-400/60 text-amber-300' },
  due: { label: 'To pay', cls: 'border-white/30 text-white' },
};

function InvoiceRow({ inv, brandStyle }: { inv: PortalInvoice; brandStyle: CSSProperties }) {
  const st = invoiceState[inv.state];
  const balance = Math.max(0, inv.total - inv.paid_so_far);
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white leading-snug">
            {inv.number || 'Invoice'}
          </p>
          {inv.title && <p className="mt-0.5 text-[13px] text-white truncate">{inv.title}</p>}
          <p className="mt-0.5 text-[13px] text-white">
            {inv.state === 'paid'
              ? `Issued ${longDate(inv.issued_at)}`
              : inv.due_date
                ? `${inv.state === 'overdue' ? 'Was due' : 'Due'} ${longDate(inv.due_date)}`
                : `Issued ${longDate(inv.issued_at)}`}
          </p>
        </div>
        <div className="text-right shrink-0 space-y-1">
          <p className="text-[16px] font-semibold tabular-nums text-white">
            {gbp(inv.state === 'paid' ? inv.total : balance)}
          </p>
          <StatusTag label={st.label} cls={st.cls} />
        </div>
      </div>
      {(inv.pay_url || inv.pdf_url) && (
        <div className="grid grid-cols-2 gap-2">
          {inv.pay_url ? (
            <BrandButton href={inv.pay_url} style={brandStyle} className="w-full">
              Pay now
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
          ) : (
            <span />
          )}
          {inv.pdf_url ? (
            <a
              href={inv.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(ghostBtn, 'w-full', !inv.pay_url && 'col-span-2')}
            >
              View invoice
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ── review ──────────────────────────────────────────────────────────────────
function ReviewAsk({
  token,
  review,
  firm,
  brandStyle,
}: {
  token: string;
  review: NonNullable<ClientPortal['review']>;
  firm: string;
  brandStyle: CSSProperties;
}) {
  const key = `portal-review-hidden:${review.job_id}`;
  const [hidden, setHidden] = useState(() => {
    try {
      return storageGetSync(key) === '1';
    } catch {
      return false;
    }
  });
  const optOut = useReviewOptOut(token);
  if (hidden) return null;

  const hide = () => {
    try {
      storageSetSync(key, '1');
    } catch {
      /* private browsing */
    }
    setHidden(true);
  };

  const who = review.names.length > 0 ? listNames(review.names) : null;
  return (
    <section className={cn(card, 'p-5 space-y-4')}>
      <div className="flex items-center gap-1 text-white" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-5 w-5" />
        ))}
      </div>
      <div>
        <h2 className="text-[19px] font-semibold tracking-tight text-white">
          {who ? `How did ${who} do?` : `How did ${firm} do?`}
        </h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-white">
          {review.message ||
            `Your job "${review.job_title}" is finished. If you have a minute, a short review helps other people find a good electrician.`}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        {review.links.map((l) => (
          <BrandButton key={l.url} href={l.url} external style={brandStyle} className="w-full sm:w-auto">
            {l.label}
          </BrandButton>
        ))}
        <button type="button" className={cn(ghostBtn, 'w-full sm:w-auto')} onClick={hide}>
          Not now
        </button>
      </div>
      <button
        type="button"
        className="min-h-11 text-[13px] text-white underline underline-offset-2 touch-manipulation"
        onClick={() => {
          optOut.mutate();
          hide();
        }}
      >
        Don&apos;t ask me again
      </button>
    </section>
  );
}

// ── messages ────────────────────────────────────────────────────────────────
function Thread({
  token,
  portal,
  draft,
  setDraft,
  composerRef,
  brandStyle,
}: {
  token: string;
  portal: ClientPortal;
  draft: string;
  setDraft: (v: string) => void;
  composerRef: React.RefObject<HTMLTextAreaElement>;
  brandStyle: CSSProperties;
}) {
  const { data: messages = portal.messages } = usePortalThread(token, portal.messages);
  const send = useSendPortalMessage(token);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const submit = async () => {
    const text = draft.trim();
    if (!text) return;
    setError(null);
    try {
      await send.mutateAsync(text);
      setDraft('');
      setSent(true);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The message could not be sent. Please try again.');
    }
  };

  return (
    <section>
      <SectionTitle id="messages" title={`Messages with ${portal.firm.name}`} />
      <div className={cn(card, 'p-4 space-y-4')}>
        {messages.length === 0 ? (
          <p className="text-[15px] leading-relaxed text-white">
            Ask about a job, a date, a certificate or an invoice. Your message goes straight to the
            office at {portal.firm.name}.
          </p>
        ) : (
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto overscroll-contain pr-1">
            {messages.map((m) => {
              const mine = m.from === 'you';
              return (
                <div key={m.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[15px] text-white',
                      mine
                        ? 'bg-[hsl(0_0%_22%)] rounded-br-md'
                        : 'bg-[hsl(0_0%_15%)] border border-white/[0.1] rounded-bl-md'
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words leading-relaxed">{m.message}</p>
                    <p className="mt-1 text-[12px] text-white">
                      {mine ? 'You' : portal.firm.name} · {stamp(m.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="portal-message" className="text-[13px] font-medium text-white">
            Your message
          </label>
          <textarea
            id="portal-message"
            ref={composerRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setSent(false);
            }}
            rows={3}
            maxLength={2000}
            placeholder="Type your message"
            className="w-full rounded-xl border border-white/[0.16] bg-[hsl(0_0%_9%)] px-3.5 py-3 text-[16px] text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 touch-manipulation"
          />
          {error && <p className="text-[13px] text-red-300">{error}</p>}
          {sent && !error && (
            <p className="text-[13px] text-emerald-300">
              Sent. {portal.firm.name} will reply here.
            </p>
          )}
          <BrandButton onClick={submit} style={brandStyle} className="w-full">
            {send.isPending ? 'Sending…' : 'Send message'}
          </BrandButton>
          {portal.firm.phone && (
            <p className="text-[13px] text-white">
              For anything urgent, call {portal.firm.phone}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

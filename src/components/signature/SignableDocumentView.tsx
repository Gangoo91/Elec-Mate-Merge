import { useMemo } from 'react';
import { FileText, ExternalLink, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildTermsList } from '@/utils/quoteTerms';
import { contractHtml } from '@/lib/signatures/contractText';
import {
  gbp,
  signedGbp,
  ukDate,
  isStablePdfLink,
  type DocumentSnapshot,
  type QuoteSnapshot,
  type VariationSnapshot,
  type HandoverSnapshot,
  type CertificateSnapshot,
  type ContractSnapshot,
} from '@/lib/signatures/types';

/**
 * ELE-1993 — the document a client is asked to sign, rendered from the frozen
 * copy on the request. Used on the public /sign/:token page (tone="paper": a
 * white page the client reads like a letter) and in the office register
 * (tone="dark": hub styling, all text white).
 */

type Tone = 'paper' | 'dark';

const t = (tone: Tone) =>
  tone === 'paper'
    ? {
        shell: 'bg-white text-slate-900 rounded-2xl shadow-sm ring-1 ring-slate-200',
        muted: 'text-slate-600',
        strong: 'text-slate-900',
        rule: 'border-slate-200',
        wash: 'bg-slate-50',
        eyebrow: 'text-slate-500',
        link: 'text-blue-700 underline underline-offset-2',
        good: 'text-emerald-700',
        warn: 'text-amber-800 bg-amber-50 ring-1 ring-amber-200',
        hero: 'bg-slate-900 text-white',
      }
    : {
        shell:
          'bg-gradient-to-b from-white/[0.07] to-white/[0.03] text-white rounded-2xl border border-white/[0.1]',
        muted: 'text-white',
        strong: 'text-white',
        rule: 'border-white/[0.1]',
        wash: 'bg-white/[0.05]',
        eyebrow: 'text-white',
        link: 'text-elec-yellow underline underline-offset-2',
        good: 'text-emerald-300',
        warn: 'text-white bg-orange-500/10 border border-orange-500/30',
        hero: 'bg-white/[0.06] text-white border border-white/[0.1]',
      };

function Row({
  label,
  value,
  tone,
  strong,
}: {
  label: string;
  value: string;
  tone: Tone;
  strong?: boolean;
}) {
  const c = t(tone);
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className={cn('text-[14px]', c.muted)}>{label}</span>
      <span
        className={cn(
          'tabular-nums text-right',
          strong ? 'text-[19px] font-bold' : 'text-[15px] font-medium',
          c.strong
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Head({
  eyebrow,
  title,
  sub,
  tone,
}: {
  eyebrow: string;
  title: string;
  sub?: string | null;
  tone: Tone;
}) {
  const c = t(tone);
  return (
    <div className={cn('px-5 pt-5 pb-4 border-b', c.rule)}>
      <p className={cn('text-[11px] font-semibold uppercase tracking-[0.14em]', c.eyebrow)}>
        {eyebrow}
      </p>
      <h2 className={cn('mt-1 text-[20px] font-semibold leading-snug', c.strong)}>{title}</h2>
      {sub ? <p className={cn('mt-1 text-[14px] leading-relaxed', c.muted)}>{sub}</p> : null}
    </div>
  );
}

function PdfLink({ href, label, tone }: { href: string; label: string; tone: Tone }) {
  const c = t(tone);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-12 items-center justify-between gap-3 rounded-xl px-4 text-[15px] font-medium touch-manipulation',
        tone === 'paper'
          ? 'bg-slate-100 text-slate-900 active:bg-slate-200'
          : 'bg-white/[0.06] text-white border border-white/[0.1]'
      )}
    >
      <span className="inline-flex items-center gap-2 min-w-0">
        <FileText className="h-4 w-4 shrink-0" />
        <span className="truncate">{label}</span>
      </span>
      <ExternalLink className={cn('h-4 w-4 shrink-0', c.muted)} />
    </a>
  );
}

function QuoteDoc({ d, tone }: { d: QuoteSnapshot; tone: Tone }) {
  const c = t(tone);
  const lines = Array.isArray(d.line_items) ? d.line_items : [];
  const terms = useMemo(
    () => (d.kind === 'quote' && d.terms ? buildTermsList(d.terms) : []),
    [d.kind, d.terms]
  );
  const label = d.kind === 'invoice' ? 'Invoice' : d.is_estimate ? 'Estimate' : 'Quote';
  return (
    <>
      <Head
        tone={tone}
        eyebrow={`${label}${d.number ? ` ${d.number}` : ''}`}
        title={d.title || (d.kind === 'invoice' ? 'Invoice' : 'The work we will do')}
        sub={[d.client && `For ${d.client}`, d.address].filter(Boolean).join(' · ') || null}
      />
      <div className="px-5 py-4 space-y-4">
        {d.description ? (
          <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', c.strong)}>
            {d.description}
          </p>
        ) : null}
        {lines.length > 0 ? (
          <div>
            <p className={cn('text-[12px] font-semibold uppercase tracking-[0.12em] mb-1', c.eyebrow)}>
              What is included
            </p>
            <ul className={cn('divide-y', tone === 'paper' ? 'divide-slate-200' : 'divide-white/[0.08]')}>
              {lines.map((l, i) => (
                <li key={i} className="flex items-start justify-between gap-3 py-2.5">
                  <span className={cn('text-[15px] leading-snug', c.strong)}>{l.description}</span>
                  {l.quantity != null ? (
                    <span className={cn('shrink-0 text-[14px] tabular-nums', c.muted)}>
                      {Number(l.quantity).toLocaleString('en-GB')}
                      {l.unit ? ` ${l.unit}` : ''}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className={cn('rounded-xl px-4 py-2', c.wash)}>
          {d.subtotal != null ? <Row tone={tone} label="Subtotal" value={gbp(d.subtotal)} /> : null}
          {d.reverse_charge ? (
            <Row tone={tone} label="VAT (reverse charge)" value="Customer to account" />
          ) : d.vat_rate != null ? (
            <Row tone={tone} label={`VAT at ${Number(d.vat_rate)}%`} value={gbp(d.vat_amount)} />
          ) : null}
          <div className={cn('border-t mt-1 pt-1', c.rule)}>
            <Row tone={tone} label="Total" value={gbp(d.total)} strong />
          </div>
          {d.deposit ? <Row tone={tone} label="Deposit before work starts" value={gbp(d.deposit)} /> : null}
        </div>
        {d.valid_until || d.due_date ? (
          <p className={cn('text-[14px]', c.muted)}>
            {d.kind === 'quote' && d.valid_until
              ? `Valid until ${ukDate(d.valid_until)}`
              : d.due_date
                ? `Payment due ${ukDate(d.due_date)}`
                : ''}
          </p>
        ) : null}
        {terms.length > 0 ? (
          <div>
            <p className={cn('text-[12px] font-semibold uppercase tracking-[0.12em] mb-2', c.eyebrow)}>
              Terms
            </p>
            <ul className="space-y-1.5">
              {terms.map((term, i) => (
                <li key={i} className={cn('text-[14px] leading-relaxed pl-4 relative', c.strong)}>
                  <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {isStablePdfLink(d.pdf_url) ? (
          <PdfLink tone={tone} href={d.pdf_url} label={`Open the ${label.toLowerCase()} PDF`} />
        ) : null}
      </div>
    </>
  );
}

function VariationDoc({ d, tone }: { d: VariationSnapshot; tone: Tone }) {
  const c = t(tone);
  return (
    <>
      <Head
        tone={tone}
        eyebrow={`Variation${d.reference ? ` ${d.reference}` : ''}`}
        title={d.job_title || 'Change to the work'}
        sub={[d.client, d.address].filter(Boolean).join(' · ') || null}
      />
      <div className="px-5 py-4 space-y-4">
        <div>
          <p className={cn('text-[12px] font-semibold uppercase tracking-[0.12em] mb-1', c.eyebrow)}>
            What is changing
          </p>
          <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', c.strong)}>
            {d.description}
          </p>
          {d.notes ? <p className={cn('mt-2 text-[14px]', c.muted)}>{d.notes}</p> : null}
        </div>
        <div className={cn('rounded-xl px-4 py-2', c.wash)}>
          {d.agreed_before != null ? (
            <Row tone={tone} label="Agreed price before this change" value={gbp(d.agreed_before)} />
          ) : null}
          <Row tone={tone} label="This change" value={signedGbp(d.change)} strong={d.new_total == null} />
          {d.new_total != null ? (
            <div className={cn('border-t mt-1 pt-1', c.rule)}>
              <Row tone={tone} label="New agreed price" value={gbp(d.new_total)} strong />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function HandoverDoc({ d, tone }: { d: HandoverSnapshot; tone: Tone }) {
  const c = t(tone);
  const checklist = d.checklist ?? [];
  const outstanding = d.outstanding ?? [];
  const certs = d.certificates ?? [];
  return (
    <>
      <Head
        tone={tone}
        eyebrow="Handover"
        title={d.job_title || 'Job handover'}
        sub={[d.client, d.address].filter(Boolean).join(' · ') || null}
      />
      <div className="px-5 py-4 space-y-5">
        {d.description ? (
          <div>
            <p className={cn('text-[12px] font-semibold uppercase tracking-[0.12em] mb-1', c.eyebrow)}>
              The work
            </p>
            <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', c.strong)}>
              {d.description}
            </p>
          </div>
        ) : null}
        {d.started || d.completed ? (
          <div className={cn('rounded-xl px-4 py-2', c.wash)}>
            {d.started ? <Row tone={tone} label="Started" value={ukDate(d.started)} /> : null}
            {d.completed ? <Row tone={tone} label="Completed" value={ukDate(d.completed)} /> : null}
          </div>
        ) : null}
        {checklist.length > 0 ? (
          <div>
            <p className={cn('text-[12px] font-semibold uppercase tracking-[0.12em] mb-2', c.eyebrow)}>
              Checked before handover
            </p>
            <ul className="space-y-2">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  {item.done ? (
                    <CheckCircle2 className={cn('h-5 w-5 shrink-0', c.good)} />
                  ) : (
                    <Circle className={cn('h-5 w-5 shrink-0', c.muted)} />
                  )}
                  <span className={cn('text-[15px] leading-snug', c.strong)}>
                    {item.title}
                    {!item.done ? ' (not done)' : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          <p className={cn('text-[12px] font-semibold uppercase tracking-[0.12em] mb-2', c.eyebrow)}>
            Certificates handed over
          </p>
          {certs.length === 0 ? (
            <p className={cn('text-[14px]', c.muted)}>No certificates are attached to this handover.</p>
          ) : (
            <ul className="space-y-2">
              {certs.map((cert) => {
                const href = d.links?.[cert.id];
                return (
                  <li key={cert.id}>
                    {isStablePdfLink(href) ? (
                      <PdfLink
                        tone={tone}
                        href={href}
                        label={`${cert.type}${cert.number ? ` ${cert.number}` : ''}`}
                      />
                    ) : (
                      <p className={cn('text-[15px]', c.strong)}>
                        {cert.type}
                        {cert.number ? ` ${cert.number}` : ''}
                        {cert.date ? ` · ${ukDate(cert.date)}` : ''}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {outstanding.length > 0 ? (
          <div className={cn('rounded-xl px-4 py-3', c.warn)}>
            <p className="text-[14px] font-semibold">Still open on this job</p>
            <ul className="mt-1 space-y-1">
              {outstanding.map((o, i) => (
                <li key={i} className="text-[14px] leading-snug">
                  {o.title}
                  {o.type ? ` (${o.type.toLowerCase()})` : ''}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}

function CertificateDoc({ d, tone }: { d: CertificateSnapshot; tone: Tone }) {
  const c = t(tone);
  const href = isStablePdfLink(d.pdf_url) ? d.pdf_url : null;
  return (
    <>
      <Head
        tone={tone}
        eyebrow={`Certificate${d.number ? ` ${d.number}` : ''}`}
        title={d.type || 'Certificate'}
        sub={[d.client, d.address].filter(Boolean).join(' · ') || null}
      />
      <div className="px-5 py-4 space-y-4">
        <div className={cn('rounded-xl px-4 py-2', c.wash)}>
          {d.date ? <Row tone={tone} label="Date of work" value={ukDate(d.date)} /> : null}
          {d.inspector ? <Row tone={tone} label="Carried out by" value={d.inspector} /> : null}
          {d.outcome ? <Row tone={tone} label="Overall result" value={d.outcome} /> : null}
          {d.next_due ? <Row tone={tone} label="Next inspection" value={ukDate(d.next_due)} /> : null}
        </div>
        {href ? (
          <>
            <div
              className={cn(
                'hidden sm:block overflow-hidden rounded-xl border',
                c.rule
              )}
            >
              <iframe title="Certificate" src={`${href}#view=FitH`} className="h-[70vh] w-full" />
            </div>
            <PdfLink tone={tone} href={href} label="Open the full certificate (PDF)" />
          </>
        ) : (
          <p className={cn('text-[14px]', c.muted)}>
            The PDF of this certificate has not been produced yet.
          </p>
        )}
      </div>
    </>
  );
}

function ContractDoc({ d, tone }: { d: ContractSnapshot; tone: Tone }) {
  const c = t(tone);
  const html = useMemo(() => contractHtml(d.content), [d.content]);
  return (
    <>
      <Head
        tone={tone}
        eyebrow="Contract"
        title={d.title || 'Contract'}
        sub={d.party_name ? `Between the company and ${d.party_name}` : null}
      />
      <div className="px-5 py-4 space-y-4">
        {d.start_date || d.end_date ? (
          <div className={cn('rounded-xl px-4 py-2', c.wash)}>
            {d.start_date ? <Row tone={tone} label="Starts" value={ukDate(d.start_date)} /> : null}
            {d.end_date ? <Row tone={tone} label="Ends" value={ukDate(d.end_date)} /> : null}
          </div>
        ) : null}
        <div className={cn('max-h-[60vh] overflow-y-auto rounded-xl p-4', c.wash)}>
          {html ? (
            // Contract templates are HTML (ELE-1982) — sanitised, never raw tags
            <div
              className={cn(
                'text-[15px] leading-relaxed break-words',
                '[&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-[19px] [&_h1]:font-semibold',
                '[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-[18px] [&_h2]:font-semibold first:[&_h2]:mt-0',
                '[&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:text-[16px] [&_h3]:font-semibold',
                '[&_p]:mb-2 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1',
                '[&_table]:mb-3 [&_table]:w-full [&_td]:py-1 [&_td]:pr-3 [&_td]:align-top [&_th]:py-1 [&_th]:pr-3 [&_th]:text-left',
                c.strong
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className={cn('text-[15px] leading-relaxed whitespace-pre-wrap', c.strong)}>
              {d.content || 'No contract text.'}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function SignableDocumentView({
  document,
  tone = 'paper',
  className,
}: {
  document: DocumentSnapshot;
  tone?: Tone;
  className?: string;
}) {
  const c = t(tone);
  return (
    <article className={cn('overflow-hidden', c.shell, className)}>
      {document.kind === 'quote' || document.kind === 'invoice' ? (
        <QuoteDoc d={document} tone={tone} />
      ) : document.kind === 'variation' ? (
        <VariationDoc d={document} tone={tone} />
      ) : document.kind === 'handover' ? (
        <HandoverDoc d={document} tone={tone} />
      ) : document.kind === 'certificate' ? (
        <CertificateDoc d={document} tone={tone} />
      ) : document.kind === 'contract' ? (
        <ContractDoc d={document} tone={tone} />
      ) : null}
    </article>
  );
}

export default SignableDocumentView;

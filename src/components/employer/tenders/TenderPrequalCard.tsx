/**
 * ELE-1994: the answers a pre-qualification questionnaire asks for, filled from
 * what the firm already keeps: company profile, registration and insurance,
 * the competence matrix (ELE-1834), headcount, RIDDOR history and policies.
 * Insurance, scheme and accreditations come from the one source (Gap #10,
 * get_firm_credentials), the same record as Compliance and Send our pack.
 * Copy one answer or all of them into the buyer's portal.
 */
import { useMemo } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { panel, PanelTitle } from '@/components/employer/pageParts/PageParts';
import { useTenderMatches, useTenderPrequal } from '@/hooks/useTenderMatches';
import { useCrewCompetence } from '@/hooks/useCrewCompetence';
import { useFirmCredentials } from '@/hooks/useFirmCredentials';
import { accreditationLabel, isCps } from '@/components/employer/compliance/credentials';
import { insuranceLabel, money } from '@/components/employer/compliance/insurance';
import type { InsuranceKind } from '@/hooks/useComplianceDocuments';

const d = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

interface Answer {
  q: string;
  a: string | null;
  missing?: string;
}

async function copy(text: string, what: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${what} copied`);
  } catch {
    toast.error('Copy failed. Select the text and copy it instead.');
  }
}

export function TenderPrequalCard() {
  const { data: p, isLoading, error } = useTenderPrequal();
  const { data: matches } = useTenderMatches();
  const { matrix } = useCrewCompetence();
  const { data: creds } = useFirmCredentials();

  const competence = useMemo(() => {
    if (!matrix) return null;
    const parts = matrix.columns
      .map((c) => ({
        label: c.label,
        n: matrix.workers.filter((w) => ['valid', 'expiring'].includes(w.cells[c.key]?.status))
          .length,
      }))
      .filter((x) => x.n > 0)
      .map((x) => `${x.label}: ${x.n}`);
    return parts.length ? parts.join('; ') : null;
  }, [matrix]);

  const answers: Answer[] = useMemo(() => {
    if (!p) return [];
    const today = new Date().toISOString().slice(0, 10);
    const live = (creds ?? []).filter((c) => !c.expiry || c.expiry >= today);
    const scheme = live.find((c) => c.area === 'accreditation' && isCps(c.kind));
    const held = live
      .filter((c) => c.area === 'accreditation' && !isCps(c.kind))
      .map((c) => accreditationLabel(c.kind) + (c.reference ? ` ${c.reference}` : ''));
    const accs = held.length ? held : (matches?.criteria?.accreditations ?? []);
    const cover = live
      .filter((c) => c.area === 'insurance')
      .map((c) =>
        [
          insuranceLabel(c.kind as InsuranceKind),
          c.provider,
          c.cover_amount != null ? money(c.cover_amount) : c.cover_text,
          c.expiry ? `renews ${d(c.expiry)}` : null,
        ]
          .filter(Boolean)
          .join(', ')
      );
    return [
      { q: 'Company name', a: p.company_name, missing: 'Add it in Settings, Company' },
      { q: 'Business address', a: p.address, missing: 'Add it in Settings, Company' },
      { q: 'Company registration number', a: p.company_registration },
      { q: 'VAT number', a: p.vat_number },
      { q: 'Trading since', a: p.trading_since ? String(p.trading_since) : null },
      {
        q: 'Competent person scheme',
        a: scheme
          ? [
              scheme.provider ?? accreditationLabel(scheme.kind),
              scheme.reference,
              scheme.expiry ? `expires ${d(scheme.expiry)}` : null,
            ]
              .filter(Boolean)
              .join(', ')
          : null,
        missing: 'Add your scheme in Compliance, Scheme and accreditations',
      },
      {
        q: 'Accreditations',
        a: accs.length ? accs.join(', ') : null,
        missing: 'Add them in Compliance, Scheme and accreditations',
      },
      {
        q: 'Insurance',
        a: cover.length ? cover.join('; ') : null,
        missing: 'Add your cover in Compliance, Insurance',
      },
      {
        q: 'Number of employees',
        a: `${p.headcount}${p.apprentices ? ` (including ${p.apprentices} apprentice${p.apprentices === 1 ? '' : 's'})` : ''}`,
      },
      { q: 'Qualified operatives (current cards)', a: competence, missing: 'Add cards in Elec-ID' },
      {
        q: 'RIDDOR reportable incidents, last 3 years',
        a: `${p.riddor_3y}${p.incidents_3y ? ` (${p.incidents_3y} incident${p.incidents_3y === 1 ? '' : 's'} logged in total)` : ''}`,
      },
      {
        q: 'Policies in place',
        a: p.policies.length
          ? p.policies
              .map((x) => `${x.name}${x.review_date ? ` (review ${d(x.review_date)})` : ''}`)
              .join('; ')
          : null,
        missing: 'Adopt policies in Safety, Policies',
      },
      { q: 'Contact', a: [p.phone, p.email, p.website].filter(Boolean).join(', ') || null },
    ];
  }, [p, matches, competence, creds]);

  const filled = answers.filter((x) => x.a);
  const all = filled.map((x) => `${x.q}: ${x.a}`).join('\n');

  return (
    <section>
      <PanelTitle
        title="Pre-qualification answers"
        meta={!isLoading && !error ? `${filled.length} of ${answers.length} filled` : undefined}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {isLoading ? (
          <div className="flex items-center gap-2 px-4 py-4 text-[14px] text-white sm:px-5">
            <Loader2 className="h-4 w-4 animate-spin" /> Filling from your firm's records
          </div>
        ) : error ? (
          <p className="px-4 py-4 text-[14px] text-white sm:px-5">
            Couldn't load your firm's details. Try again shortly.
          </p>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-5">
              <p className="min-w-0 flex-1 text-[13px] leading-snug text-white">
                Filled from your records. Copy them into the buyer's questionnaire.
              </p>
              <button
                type="button"
                onClick={() => copy(all, 'All answers')}
                disabled={!filled.length}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1] disabled:opacity-50"
              >
                <Copy className="h-4 w-4" />
                Copy all
              </button>
            </div>
            <ul className="divide-y divide-white/[0.07]">
              {answers.map((x) => (
                <li key={x.q} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-white">{x.q}</p>
                    {x.a ? (
                      <p className="mt-0.5 break-words text-[15px] leading-snug text-white">
                        {x.a}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-[14px] font-medium text-elec-yellow">
                        {x.missing ?? 'Not on record'}
                      </p>
                    )}
                  </div>
                  {x.a && (
                    <button
                      type="button"
                      onClick={() => copy(x.a!, x.q)}
                      aria-label={`Copy ${x.q}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

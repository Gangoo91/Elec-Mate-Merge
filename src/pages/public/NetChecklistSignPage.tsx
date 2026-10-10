/**
 * /net-checklist-sign/:token — the employer reads the apprentice's NET AM2S v1
 * Candidate Checklist and signs NET's behaviours statement and employer
 * declaration, with no account (ELE-2050).
 *
 * The college makes the link from the checklist page. NET: "It is a breach
 * of apprenticeship funding rules for this checklist to be signed ... for any
 * third party to sign instead of the employer", so the employer signs here
 * themselves. The signature is bound to the answers shown.
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { SignatureCapture } from '@/components/ui/signature-capture';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
} from '@/components/public/PublicPageShell';
import {
  NET_AM2S_FORM,
  NET_IMPORTANT,
  NET_SIX_MONTHS,
  RATINGS,
  SECTIONS,
  type Rating,
} from '@/data/net/am2sV1Checklist';

const anon = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

interface PublicChecklist {
  learner_name: string | null;
  college_name: string | null;
  employer_name: string | null;
  registered_version: string | null;
  ratings: Record<string, { k?: Rating; e?: Rating }>;
  gaps: { unrated: string[]; below: string[] };
  statement: string;
  requested_by_name: string | null;
  signed_at: string | null;
  signer_name: string | null;
  signer_company: string | null;
  error?: string;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  'touch-manipulation';

const label = (r?: Rating) => RATINGS.find((x) => x.value === r)?.label ?? 'Not rated';

const fmtDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/London',
      })
    : '';

export default function NetChecklistSignPage() {
  const { token } = useParams<{ token: string }>();
  const [d, setD] = useState<PublicChecklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!token) return;
    anon
      .rpc('get_net_am2s_checklist_public' as never, { p_token: token } as never)
      .then(({ data, error: e }) => {
        const res = (e ? { error: 'This link is not valid.' } : data) as PublicChecklist;
        setD(res);
        if (res && !res.error && res.employer_name) setCompany((c) => c || res.employer_name || '');
        setLoading(false);
      });
  };
  useEffect(load, [token]);

  const sign = async () => {
    if (!token || saving) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await anon.rpc(
      'sign_net_am2s_checklist_employer' as never,
      { p_token: token, p_name: name, p_company: company, p_signature: signature } as never
    );
    setSaving(false);
    const res = data as unknown as { success?: boolean; error?: string } | null;
    if (e || !res?.success) {
      setError(res?.error ?? 'Could not sign. Try again.');
      return;
    }
    load();
  };

  if (loading) {
    return (
      <PublicPageShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      </PublicPageShell>
    );
  }

  if (!d || d.error) {
    return (
      <PublicPageShell>
        <PublicEyebrow>NET AM2S checklist</PublicEyebrow>
        <PublicH1>This link cannot be used</PublicH1>
        <PublicLead>{d?.error ?? 'Ask the college to send the link again.'}</PublicLead>
      </PublicPageShell>
    );
  }

  const ready = d.gaps.unrated.length === 0 && d.gaps.below.length === 0 && !!d.registered_version;
  const valid = name.trim().length >= 2 && company.trim().length >= 2 && confirm && !!signature;
  const learner = d.learner_name ?? 'your apprentice';

  return (
    <PublicPageShell>
      <PublicEyebrow>NET AM2S v1 Candidate Checklist</PublicEyebrow>
      <PublicH1>{d.learner_name ?? 'Apprentice'}: employer signature</PublicH1>
      <PublicLead>
        {d.college_name ?? 'The college'} is preparing {learner}’s AM2S booking. NET needs its
        Candidate Checklist signed by the apprentice, the employer and the training provider. Please
        read how {learner} has rated themselves, then sign the behaviours statement and the employer
        declaration. You do not need an account.
      </PublicLead>

      <PublicCard className="mt-8">
        <p className="text-[17px] font-semibold text-white">
          How {learner} rated their knowledge and experience
        </p>
        <p className="mt-1 text-[14px] text-white">
          Registered version with Apprenticeship Service: {d.registered_version ?? 'not ticked'}.
          {d.requested_by_name ? ` Sent by ${d.requested_by_name}.` : ''}
        </p>
        <div className="mt-4 space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.key}>
              <p className="text-[14px] font-semibold text-white">{s.title}</p>
              <ul className="mt-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {s.items.map((it) => {
                  const r = d.ratings[it.key] ?? {};
                  return (
                    <li
                      key={it.key}
                      className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-[1fr_auto] sm:gap-4"
                    >
                      <span className="text-[14px] leading-snug text-white">{it.text}</span>
                      <span className="text-[13px] font-semibold text-white">
                        Knowledge: {label(r.k)} · Experience: {label(r.e)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </PublicCard>

      {d.signed_at ? (
        <PublicCard className="mt-4">
          <p className="text-[17px] font-semibold text-white">Signed. Thank you.</p>
          <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-white">
            {d.statement}
          </p>
          <p className="mt-4 text-[15px] text-white">
            {d.signer_name}
            {d.signer_company ? `, ${d.signer_company}` : ''} · {fmtDate(d.signed_at)}
          </p>
          <p className="mt-3 text-[13px] text-white">
            The college has been told. You can close this page.
          </p>
        </PublicCard>
      ) : (
        <PublicCard className="mt-4">
          <p className="text-[17px] font-semibold text-white">Important</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white">{NET_IMPORTANT}</p>
          <p className="mt-5 text-[17px] font-semibold text-white">What you are signing</p>
          <p className="mt-3 whitespace-pre-line rounded-xl border border-white/[0.15] p-4 text-[15px] leading-relaxed text-white">
            {d.statement}
          </p>
          <p className="mt-2 text-[13px] text-white">
            The words are NET’s, from its{' '}
            <a
              href={NET_AM2S_FORM.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-elec-yellow underline underline-offset-2"
            >
              AM2S v1 Candidate Checklist ({NET_AM2S_FORM.published})
            </a>
            . Your signature goes onto NET’s form. {NET_SIX_MONTHS}
          </p>
          {!ready ? (
            <p className="mt-6 text-[15px] leading-relaxed text-orange-300">
              The checklist is not finished: every item has to be at least Adequate before anyone
              signs. The college will send the link again when it is ready.
            </p>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="net-company"
                    className="mb-1 block text-[13px] font-medium text-white"
                  >
                    Company Name
                  </label>
                  <input
                    id="net-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputCn}
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label
                    htmlFor="net-print"
                    className="mb-1 block text-[13px] font-medium text-white"
                  >
                    Print Name
                  </label>
                  <input
                    id="net-print"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCn}
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 text-[13px] font-medium text-white">Employer Signature</p>
                <div className="overflow-hidden rounded-xl bg-white">
                  <SignatureCapture
                    variant="light"
                    showActions={false}
                    onCapture={setSignature}
                    height={150}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConfirm((v) => !v)}
                aria-pressed={confirm}
                className={`flex min-h-11 w-full items-start gap-3 rounded-xl border p-4 text-left text-[15px] leading-snug text-white touch-manipulation ${
                  confirm ? 'border-elec-yellow' : 'border-white/[0.15]'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold ${
                    confirm ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                  }`}
                >
                  {confirm ? '✓' : ''}
                </span>
                I am the apprentice’s employer, or authorised to sign for them, and the statement
                and declaration above are true.
              </button>
              {error && <p className="text-[14px] text-orange-300">{error}</p>}
              <button
                type="button"
                onClick={sign}
                disabled={!valid || saving}
                className={PUBLIC_PRIMARY_CTA}
              >
                {saving ? 'Signing…' : 'Sign NET’s checklist'}
              </button>
            </div>
          )}
        </PublicCard>
      )}
    </PublicPageShell>
  );
}

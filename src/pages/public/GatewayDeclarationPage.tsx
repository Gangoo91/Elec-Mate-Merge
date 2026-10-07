/**
 * /gateway-declaration/:token — the employer reads and signs an apprentice's
 * gateway declaration (behaviours and readiness), with no account (ELE-1883).
 *
 * The college makes the link from Student 360 (Export pack → Gateway pack).
 * The signature is bound to a fingerprint of the statement and the readiness
 * facts shown here, and goes into the EPAO gateway pack the college sends.
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import { SignatureCapture } from '@/components/ui/signature-capture';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
} from '@/components/public/PublicPageShell';

const anon = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

interface Declaration {
  learner_name: string | null;
  college_name: string | null;
  employer_name: string | null;
  standard: { code: string | null; title: string | null; assessment: string | null } | null;
  qualification: { code: string | null; title: string | null } | null;
  criteria: { passed: number; total: number } | null;
  hours: { counted: number | null; required: number | null } | null;
  statement: string;
  /** Wording version; 2 quotes the EPA plan's gateway section for the employer. */
  statement_version?: number | null;
  wording_source?: { title: string; url: string } | null;
  requested_by_name: string | null;
  signed_at: string | null;
  signer_name: string | null;
  signer_role: string | null;
  signer_company: string | null;
  error?: string;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  'touch-manipulation';

const fmtDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' })
    : '';
const fmtH = (h: number | null | undefined) =>
  h == null ? 'not set' : `${Number(h).toLocaleString('en-GB', { maximumFractionDigits: 1 })} hours`;

export default function GatewayDeclarationPage() {
  const { token } = useParams<{ token: string }>();
  const [d, setD] = useState<Declaration | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!token) return;
    anon
      .rpc('get_gateway_declaration_public' as never, { p_token: token } as never)
      .then(({ data, error: e }) => {
        const res = (e ? { error: 'This link is not valid.' } : data) as Declaration;
        setD(res);
        if (res && !res.error && !company && res.employer_name) setCompany(res.employer_name);
        setLoading(false);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(load, [token]);

  const sign = async () => {
    if (!token || saving) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await anon.rpc(
      'sign_gateway_declaration_employer' as never,
      { p_token: token, p_name: name, p_role: role, p_company: company, p_signature: signature } as never
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
        <PublicEyebrow>Gateway declaration</PublicEyebrow>
        <PublicH1>This link cannot be used</PublicH1>
        <PublicLead>{d?.error ?? 'Ask the college to send the link again.'}</PublicLead>
      </PublicPageShell>
    );
  }

  const std = d.standard;
  const valid = name.trim().length >= 2 && role.trim().length >= 2 && company.trim().length >= 2 && confirm && !!signature;
  // The wording follows the company typed, as the signed version will.
  const statement =
    company.trim() && d.employer_name && company.trim() !== d.employer_name
      ? d.statement.replace(d.employer_name, company.trim())
      : d.statement;

  return (
    <PublicPageShell>
      <PublicEyebrow>End-point assessment gateway</PublicEyebrow>
      <PublicH1>{d.learner_name ?? 'Apprentice'}: employer declaration</PublicH1>
      <PublicLead>
        {d.college_name ?? 'The college'} is preparing {d.learner_name ?? 'your apprentice'}’s gateway pack
        {std?.code ? ` for the ${std.title} apprenticeship (${std.code}), assessed by the ${std.assessment}` : ''}. The
        assessment organisation asks the employer to confirm the apprentice shows the behaviours in the standard and is
        ready. It takes a minute and you do not need an account.
      </PublicLead>

      <PublicCard className="mt-8">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            ['Qualification', [d.qualification?.code, d.qualification?.title].filter(Boolean).join(' · ') || 'Not set'],
            ['Criteria passed', d.criteria ? `${d.criteria.passed} of ${d.criteria.total}` : 'Not recorded'],
            ['Off-the-job hours', d.hours ? `${fmtH(d.hours.counted)} of ${fmtH(d.hours.required)}` : 'Not recorded'],
          ].map(([l, v]) => (
            <div key={l}>
              <dt className="text-[13px] font-medium text-white">{l}</dt>
              <dd className="mt-1 text-[17px] font-semibold text-white">{v}</dd>
            </div>
          ))}
        </dl>
        {d.requested_by_name && (
          <p className="mt-5 text-[13px] text-white">Requested by {d.requested_by_name}.</p>
        )}
      </PublicCard>

      {d.signed_at ? (
        <PublicCard className="mt-4">
          <p className="text-[17px] font-semibold text-white">Signed. Thank you.</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white">{d.statement}</p>
          <p className="mt-4 text-[15px] text-white">
            {d.signer_name}
            {d.signer_role ? `, ${d.signer_role}` : ''}
            {d.signer_company ? `, ${d.signer_company}` : ''} · {fmtDate(d.signed_at)}
          </p>
          <p className="mt-3 text-[13px] text-white">The college has been told. You can close this page.</p>
        </PublicCard>
      ) : (
        <PublicCard className="mt-4">
          <p className="text-[17px] font-semibold text-white">The declaration</p>
          <p className="mt-3 rounded-xl border-l-4 border-elec-yellow bg-white/[0.04] p-4 text-[16px] leading-relaxed text-white">
            {statement}
          </p>
          {d.wording_source && (d.statement_version ?? 1) >= 2 && (
            <p className="mt-3 text-[13px] leading-snug text-white">
              The two confirmations use the words of the{' '}
              <a
                href={d.wording_source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-elec-yellow underline underline-offset-2"
              >
                {d.wording_source.title}
              </a>
              . This does not replace NET’s Readiness for Assessment checklist, which you also sign, on NET’s own
              form.
            </p>
          )}
          <div className="mt-6 space-y-5">
            <div>
              <Label className="mb-1 block text-[13px] font-medium text-white">Your full name</Label>
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputCn} autoComplete="name" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-[13px] font-medium text-white">Your role</Label>
                <input value={role} onChange={(e) => setRole(e.target.value)} className={inputCn} placeholder="e.g. Director or Supervisor" />
              </div>
              <div>
                <Label className="mb-1 block text-[13px] font-medium text-white">Company</Label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCn} autoComplete="organization" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-[13px] font-medium text-white">Sign here</p>
              <SignatureCapture variant="dark" showActions={false} onCapture={setSignature} height={150} />
            </div>
            <button
              type="button"
              onClick={() => setConfirm((v) => !v)}
              aria-pressed={confirm}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-[15px] leading-snug touch-manipulation ${
                confirm ? 'border-elec-yellow text-white' : 'border-white/[0.15] text-white'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold ${
                  confirm ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                }`}
              >
                {confirm ? '✓' : ''}
              </span>
              I am authorised to sign for the employer and the declaration above is true.
            </button>
            {error && <p className="text-[14px] text-orange-300">{error}</p>}
            <button type="button" onClick={sign} disabled={!valid || saving} className={PUBLIC_PRIMARY_CTA}>
              {saving ? 'Signing…' : 'Sign the declaration'}
            </button>
          </div>
        </PublicCard>
      )}
    </PublicPageShell>
  );
}

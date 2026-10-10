/**
 * /otj-statement/:token — an employer reads and signs an apprentice's
 * planned-versus-actual off-the-job hours statement, with no account.
 *
 * The funding rules (2025/26, paras 92–94) require the employer and the
 * apprentice to sign this statement when fewer hours were delivered than
 * planned. The college prepares it in Student 360; this is the employer's
 * side. Its PDF comes from PDFMonkey (learner-document-pdf, ELE-2017).
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
} from '@/components/public/PublicPageShell';

const anon = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

interface Statement {
  learner_name: string | null;
  college_name: string | null;
  planned_hours: number;
  minimum_hours: number | null;
  rpl_hours: number;
  actual_hours: number;
  verified_hours: number;
  app_learning_hours: number;
  minimum_met: boolean;
  reason: string;
  prepared_by_name: string | null;
  prepared_at: string;
  learner_signed_name: string | null;
  learner_signed_at: string | null;
  employer_signed_name: string | null;
  employer_signed_role: string | null;
  employer_company: string | null;
  employer_signed_at: string | null;
  superseded: boolean;
  error?: string;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  'touch-manipulation';

const fmtH = (h: number | null | undefined) =>
  h == null ? '—' : `${Number(h).toLocaleString('en-GB', { maximumFractionDigits: 1 })} hours`;
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export default function OtjStatementPage() {
  const { token } = useParams<{ token: string }>();
  const [st, setSt] = useState<Statement | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    if (!token) return;
    anon
      .rpc('get_otj_hours_statement_public' as never, { p_token: token } as never)
      .then(({ data, error: e }) => {
        setSt(e ? ({ error: 'This link is not valid.' } as Statement) : (data as unknown as Statement));
        setLoading(false);
      });
  };
  useEffect(load, [token]);

  const sign = async () => {
    if (!token || saving) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await anon.rpc(
      'sign_otj_hours_statement_employer' as never,
      { p_token: token, p_name: name, p_role: role, p_company: company } as never
    );
    setSaving(false);
    const res = data as unknown as { success?: boolean; error?: string } | null;
    if (e || !res?.success) {
      setError(res?.error ?? 'Could not sign. Try again.');
      return;
    }
    load();
  };

  // The signed statement as a PDFMonkey document (ELE-2017), not a browser print.
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const downloadPdf = async () => {
    if (!token || downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadLearnerDocument({ kind: 'otj_statement', token }, anon);
    } catch (e) {
      setDownloadError((e as Error).message);
    } finally {
      setDownloading(false);
    }
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

  if (!st || st.error) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Off-the-job hours</PublicEyebrow>
        <PublicH1>This link is not valid</PublicH1>
        <PublicLead>Ask the college to send the statement link again.</PublicLead>
      </PublicPageShell>
    );
  }

  const valid = name.trim().length >= 2 && company.trim().length >= 2 && confirm;

  return (
    <PublicPageShell>
      <PublicEyebrow>Off-the-job hours statement</PublicEyebrow>
      <PublicH1>{st.learner_name ?? 'Apprentice'}: planned and actual hours</PublicH1>
      <PublicLead>
        {st.college_name ?? 'The college'} has prepared this statement because fewer off-the-job training hours
        were delivered than were planned. The apprenticeship funding rules ask the employer and the apprentice to
        sign it.
      </PublicLead>

      {st.superseded && (
        <p className="mt-6 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[14px] text-orange-300">
          The college has replaced this statement with a newer one. Ask them for the new link.
        </p>
      )}

      <PublicCard className="mt-8">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[
            ['Planned hours agreed with the employer', fmtH(st.planned_hours)],
            ['Hours delivered', fmtH(st.actual_hours)],
            ['Minimum for the standard', `${fmtH(st.minimum_hours)}${st.rpl_hours > 0 ? `, after ${fmtH(st.rpl_hours)} of prior learning` : ''}`],
            ['Minimum met', st.minimum_hours == null ? 'Not set' : st.minimum_met ? 'Yes' : 'No'],
          ].map(([l, v]) => (
            <div key={l}>
              <dt className="text-[13px] font-medium text-white">{l}</dt>
              <dd className="mt-1 text-[20px] font-semibold text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 border-t border-white/[0.12] pt-5">
          <p className="text-[13px] font-medium text-white">Why fewer hours were delivered</p>
          <p className="mt-1 whitespace-pre-wrap text-[16px] leading-relaxed text-white">{st.reason}</p>
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-white">
          {st.actual_hours === st.verified_hours
            ? `Hours delivered are the ${fmtH(st.verified_hours)} verified by the college or employer. Elec-Mate also recorded ${fmtH(st.app_learning_hours)} of learning in the app; that is not counted in this statement.`
            : `Hours delivered: ${fmtH(st.verified_hours)} verified by the college or employer, and ${fmtH(st.app_learning_hours)} of learning recorded by Elec-Mate.`}{' '}
          Prepared by {st.prepared_by_name ?? 'the college'} on {fmtDate(st.prepared_at)}.
        </p>
      </PublicCard>

      <PublicCard className="mt-4">
        <p className="text-[15px] font-semibold text-white">Signatures</p>
        <p className="mt-3 text-[15px] text-white">
          Apprentice:{' '}
          {st.learner_signed_at ? `${st.learner_signed_name}, ${fmtDate(st.learner_signed_at)}` : 'not signed yet'}
        </p>
        <p className="mt-1.5 text-[15px] text-white">
          Employer:{' '}
          {st.employer_signed_at
            ? `${st.employer_signed_name}${st.employer_signed_role ? `, ${st.employer_signed_role}` : ''}, ${st.employer_company}, ${fmtDate(st.employer_signed_at)}`
            : 'not signed yet'}
        </p>
      </PublicCard>

      {!st.employer_signed_at && !st.superseded ? (
        <PublicCard className="mt-4 print:hidden">
          <p className="text-[17px] font-semibold text-white">Sign for the employer</p>
          <div className="mt-5 space-y-5">
            <div>
              <Label className="mb-1 block text-[13px] font-medium text-white">Your full name</Label>
              <input value={name} onChange={(e) => setName(e.target.value)} className={inputCn} autoComplete="name" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-[13px] font-medium text-white">Your role</Label>
                <input value={role} onChange={(e) => setRole(e.target.value)} className={inputCn} placeholder="e.g. Director" />
              </div>
              <div>
                <Label className="mb-1 block text-[13px] font-medium text-white">Company</Label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCn} autoComplete="organization" />
              </div>
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
              I confirm the employer is satisfied with the off-the-job training delivered, even though it was
              less than originally planned.
            </button>
            {error && <p className="text-[14px] text-orange-300">{error}</p>}
            <button type="button" onClick={sign} disabled={!valid || saving} className={PUBLIC_PRIMARY_CTA}>
              {saving ? 'Signing…' : 'Sign statement'}
            </button>
          </div>
        </PublicCard>
      ) : (
        <div className="mt-6">
          <button type="button" onClick={downloadPdf} disabled={downloading} className={PUBLIC_SECONDARY_CTA}>
            {downloading ? 'Making the PDF…' : 'Download as PDF'}
          </button>
          {downloadError && <p className="mt-2 text-[14px] text-orange-300">{downloadError}</p>}
        </div>
      )}
    </PublicPageShell>
  );
}

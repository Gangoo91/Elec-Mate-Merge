/**
 * WitnessStatementPage — /witness/:token
 *
 * A site supervisor opens the link an apprentice sent and signs a witness
 * statement. No account, no app. Reads get_witness_request and writes
 * sign_witness_statement (both SECURITY DEFINER, token-scoped). The statement
 * is hashed with the evidence the supervisor saw (ELE-1869).
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { Label } from '@/components/ui/label';
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

interface WitnessRequest {
  learner_name: string;
  status: 'requested' | 'signed';
  criteria: string[] | null;
  /** ELE-1869: the criteria in plain words, from the learner's qualification. */
  criteria_detail?: Array<{ code: string; unit_code: string | null; ac_code: string | null; unit_title: string | null; text: string | null }> | null;
  /** ELE-1869: photos and videos of the evidence (public storage URLs). */
  media?: Array<{ url: string; name: string; type: string }> | null;
  evidence: { title?: string; description?: string; criteria?: string[] | null } | null;
  signed_at: string | null;
  witness_name: string | null;
  error?: string;
}

const ERROR_COPY: Record<string, string> = {
  not_found: 'This link is not valid. Ask the apprentice to send it again.',
  withdrawn: 'The apprentice withdrew this request. Nothing to sign.',
  expired: 'This link has expired. Ask the apprentice to send a new one.',
};

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  'touch-manipulation';


export default function WitnessStatementPage() {
  const { token } = useParams<{ token: string }>();
  const [req, setReq] = useState<WitnessRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [statement, setStatement] = useState('');
  const [signature, setSignature] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    anon
      .rpc('get_witness_request' as never, { p_token: token } as never)
      .then(({ data, error: e }) => {
        setLoading(false);
        if (e) {
          setReq({ error: 'not_found' } as WitnessRequest);
          return;
        }
        setReq(data as unknown as WitnessRequest);
      });
  }, [token]);

  const first = req?.learner_name?.split(' ')[0] || 'the apprentice';
  // Plain words first; the unit and code only as a small second line. Falls
  // back to the stored code when the criterion is not in the catalogue.
  const criteriaList = (
    req?.criteria_detail?.length
      ? req.criteria_detail.map((c) => ({
          key: c.code,
          text: c.text ? c.text.charAt(0).toUpperCase() + c.text.slice(1) : `Criterion ${c.ac_code ?? c.code}`,
          unit: [c.unit_title, c.unit_code && c.ac_code ? `Unit ${c.unit_code}, ${c.ac_code}` : null]
            .filter(Boolean)
            .join(' · '),
        }))
      : (req?.criteria ?? []).map((c) => ({ key: c, text: c, unit: '' }))
  );
  const canSign =
    name.trim().length > 1 && statement.trim().length > 10 && signature && confirm && !saving;

  const submit = async () => {
    if (!token || !canSign) return;
    setSaving(true);
    setError(null);
    const { data, error: e } = await anon.rpc(
      'sign_witness_statement' as never,
      {
        p_token: token,
        p_name: name.trim(),
        p_role: role.trim(),
        p_company: company.trim(),
        p_statement: statement.trim(),
        p_signature: signature,
        // ELE-1869: "I confirm I observed this" is stored and hashed server-side.
        p_confirmed: confirm,
      } as never
    );
    setSaving(false);
    const res = data as unknown as { success?: boolean; error?: string; statement_hash?: string };
    if (e || !res?.success) {
      const copy: Record<string, string> = {
        already_signed: 'This statement has already been signed.',
        already_withdrawn: 'The apprentice withdrew this request, so there is nothing to sign.',
        expired: 'This link has expired. Ask the apprentice to send a new one.',
        signature_too_large: 'Your signature is too detailed to save. Clear it and sign again more simply.',
        name_statement_and_signature_required: 'Add your name, what you saw and your signature.',
        not_found: 'This link is not valid. Ask the apprentice to send it again.',
        confirmation_required: 'Tick the box to confirm you saw this work yourself.',
      };
      setError((res?.error && copy[res.error]) || 'Could not save your statement. Check your connection and try again.');
      return;
    }
    setDone(res.statement_hash ?? '');
  };

  const signed = !req?.error && (req?.status === 'signed' || done !== null);
  const missing = [
    name.trim().length > 1 ? null : 'your name',
    statement.trim().length > 10 ? null : 'what you saw',
    signature ? null : 'your signature',
    confirm ? null : 'the tick box',
  ].filter(Boolean);

  return (
    <PublicPageShell>
      <PublicEyebrow>Witness statement</PublicEyebrow>

      {loading && (
        <div className="mt-6 flex items-center gap-2 text-[15px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}

      {!loading && req?.error && (
        <>
          <PublicH1>This link can't be used</PublicH1>
          <PublicLead>{ERROR_COPY[req.error] ?? ERROR_COPY.not_found}</PublicLead>
        </>
      )}

      {!loading && signed && (
        <>
          <PublicH1>
            Signed. <span className="text-elec-yellow">Thank you.</span>
          </PublicH1>
          <PublicLead>
            {first} and their assessor can now read your statement alongside the evidence. You don't need to do
            anything else.
          </PublicLead>
          {done && <p className="mt-6 break-all font-mono text-[12px] text-white">Reference {done.slice(0, 16)}</p>}
        </>
      )}

      {!loading && !req?.error && !signed && req && (
        <>
          <PublicH1>Confirm what you saw {first} do</PublicH1>
          <PublicLead>
            {first} has asked you to back up a piece of their apprenticeship evidence. It takes two minutes and you
            don't need an account.
          </PublicLead>

          <PublicCard className="mt-8 space-y-4">
            <h2 className="text-[18px] font-bold tracking-[-0.01em] text-white">{req.evidence?.title || 'Work carried out'}</h2>
            {req.evidence?.description && (
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-white">{req.evidence.description}</p>
            )}
            {(req.media?.length ?? 0) > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {req.media!.slice(0, 9).map((m) =>
                  m.type.startsWith('video') || /\.(mp4|mov|webm)(\?|$)/i.test(m.url) ? (
                    <video
                      key={m.url}
                      src={m.url}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-square w-full rounded-xl border border-white/[0.1] bg-black object-cover"
                    />
                  ) : (
                    <a key={m.url} href={m.url} target="_blank" rel="noreferrer" className="block">
                      <img
                        src={m.url}
                        alt={m.name || 'Evidence photo'}
                        loading="lazy"
                        className="aspect-square w-full rounded-xl border border-white/[0.1] object-cover"
                      />
                    </a>
                  )
                )}
              </div>
            )}
            {(criteriaList.length ?? 0) > 0 && (
              <div className="border-t border-white/[0.1] pt-4">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">What you are confirming</h3>
                <p className="mt-1 text-[14px] text-white">{first} says you saw them:</p>
                <ul className="mt-3 space-y-3">
                  {criteriaList.map((c) => (
                    <li key={c.key} className="flex gap-3 text-[15px] leading-snug text-white">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow" aria-hidden />
                      <span>
                        {c.text}
                        {c.unit && <span className="mt-0.5 block text-[13px] text-white">{c.unit}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </PublicCard>

          <PublicCard className="mt-4 space-y-5">
            <div>
              <Label htmlFor="w-name" className="mb-1 block text-[13px] font-medium text-white">Your full name</Label>
              <input id="w-name" className={inputCn} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div>
              <Label htmlFor="w-role" className="mb-1 block text-[13px] font-medium text-white">Your role</Label>
              <input
                id="w-role"
                className={inputCn}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Site supervisor, Approved electrician"
              />
            </div>
            <div>
              <Label htmlFor="w-company" className="mb-1 block text-[13px] font-medium text-white">Company</Label>
              <input id="w-company" className={inputCn} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
            </div>
            <div>
              <Label htmlFor="w-statement" className="mb-1 block text-[13px] font-medium text-white">
                What did you see {first} do?
              </Label>
              <textarea
                id="w-statement"
                className="min-h-[120px] w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Describe the work, how it was done and whether it met the standard."
              />
            </div>
            <div>
              <Label className="mb-2 block text-[13px] font-medium text-white">Signature</Label>
              <SignatureCapture variant="dark" showActions={false} onCapture={setSignature} height={160} />
            </div>
            <label className="flex min-h-11 items-start gap-3 text-[15px] text-white touch-manipulation">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-elec-yellow"
                checked={confirm}
                onChange={(e) => setConfirm(e.target.checked)}
              />
              I saw this work myself and this statement is true.
            </label>
          </PublicCard>

          <div className="mt-6 space-y-3">
            {missing.length > 0 && !saving && (
              <p className="text-[14px] text-white">Still needed: {missing.join(', ')}.</p>
            )}
            {error && (
              <p role="alert" className="text-[14px] text-red-300">
                {error}
              </p>
            )}
            <button type="button" onClick={submit} disabled={!canSign} className={PUBLIC_PRIMARY_CTA}>
              {saving ? 'Signing…' : 'Sign statement'}
            </button>
          </div>
        </>
      )}
    </PublicPageShell>
  );
}

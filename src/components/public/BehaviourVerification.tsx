/**
 * BehaviourVerification — the employer's per-behaviour checklist for gateway,
 * in the no-login employer portal (ELE-2040).
 *
 * DfE "Apprenticeship behaviour verification guidance for employers": every
 * behaviour in the standard confirmed by someone who has worked closely with
 * the apprentice, from naturally occurring examples, on the guidance's scale
 * (not yet / developing / consistently demonstrated), as a single confirmation
 * at gateway. The behaviours and their wording come from the college's
 * catalogue for the apprentice's standard version (employer_portal_behaviours);
 * nothing is written here. When the catalogue has no behaviours for that
 * version, the card says so and offers no checklist.
 *
 * Token-checked anon RPCs only: employer_portal_behaviours and
 * employer_portal_sign_behaviours.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Check, Loader2 } from 'lucide-react';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { PUBLIC_PRIMARY_CTA, PUBLIC_SECONDARY_CTA } from '@/components/public/PublicPageShell';
import { cn } from '@/lib/utils';

const anon = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

type Rating = 'not_yet' | 'developing' | 'consistent';
interface Behaviour {
  code: string;
  title: string;
  description: string | null;
}
interface Current {
  id: string;
  standard_code: string;
  standard_version: string;
  items: Array<{ code: string; rating: Rating; evidence: string }>;
  all_consistent: boolean;
  signer_name: string;
  signer_role: string;
  signed_at: string;
  behaviours_hash: string;
}
interface Payload {
  ok?: boolean;
  error?: string;
  learner_name: string;
  company: string;
  standard: { code: string; version: string; title: string; version_match: string } | null;
  behaviours: Behaviour[] | null;
  behaviours_hash: string | null;
  gaps: string[];
  gateway_date: string | null;
  current: Current | null;
  scale: Array<{ value: Rating; label: string }>;
  guidance_url: string;
}

const RATING_LABEL: Record<Rating, string> = {
  not_yet: 'Not yet',
  developing: 'Developing',
  consistent: 'Consistently demonstrated',
};

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

/** Gateway within this many days, or already past, and nothing signed: the card asks for it. */
const PROMPT_DAYS = 120;

export function BehaviourVerification({
  token,
  studentId,
  firstName,
}: {
  token: string;
  studentId: string;
  firstName: string;
}) {
  const [data, setData] = useState<Payload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    const { data: d, error } = await anon.rpc(
      'employer_portal_behaviours' as never,
      { p_token: token, p_student: studentId } as never
    );
    const p = d as unknown as Payload | null;
    if (error || !p || p.error) setLoadError(p?.error ?? error?.message ?? 'Could not load');
    else setData(p);
  }, [token, studentId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loadError) return null;
  if (!data) return null;

  const cur = data.current;
  const stale = !!cur && cur.behaviours_hash !== data.behaviours_hash;
  const days =
    data.gateway_date != null
      ? Math.round((new Date(`${data.gateway_date}T12:00:00`).getTime() - Date.now()) / 86_400_000)
      : null;
  const due = !cur && days != null && days <= PROMPT_DAYS;
  const consistent = cur ? cur.items.filter((i) => i.rating === 'consistent').length : 0;

  return (
    <div className="mt-4 border-t border-white/[0.1] pt-4" data-testid="behaviour-verification">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-medium text-white">Behaviours for gateway</p>
        {due && (
          <span className="shrink-0 rounded-full border border-elec-yellow px-2.5 py-0.5 text-[11px] font-semibold text-white">
            Needs you
          </span>
        )}
      </div>

      {!data.behaviours ? (
        <p className="mt-1 text-[14px] text-white" data-testid="behaviours-missing">
          {data.gaps.includes('standard_version_for_date')
            ? `The behaviours for ${firstName}'s version of the ${data.standard?.title ?? 'apprenticeship'} assessment plan are not loaded yet. The college will ask you when they are.`
            : 'The behaviours for this apprenticeship are not loaded yet. The college will ask you when they are.'}
        </p>
      ) : cur ? (
        <>
          <p className="mt-1 text-[14px] text-white">
            Signed by {cur.signer_name} on {fmt(cur.signed_at)}: {consistent} of {cur.items.length}{' '}
            consistently demonstrated.
            {stale ? ' The behaviours have changed since, so please check them again.' : ''}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`${stale ? PUBLIC_PRIMARY_CTA : PUBLIC_SECONDARY_CTA} mt-3`}
            data-testid="behaviours-open"
          >
            {stale ? 'Check the behaviours again' : 'Update the behaviours'}
          </button>
        </>
      ) : (
        <>
          <p className="mt-1 text-[14px] text-white">
            Before gateway, you confirm {firstName} shows each of the {data.behaviours.length}{' '}
            behaviours in their standard, with an example you have seen at work.
            {data.gateway_date ? ` Gateway is planned for ${fmt(data.gateway_date)}.` : ''}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`${due ? PUBLIC_PRIMARY_CTA : PUBLIC_SECONDARY_CTA} mt-3`}
            data-testid="behaviours-open"
          >
            Confirm the behaviours (5 minutes)
          </button>
        </>
      )}

      {data.behaviours && (
        <ChecklistSheet
          open={open}
          onOpenChange={setOpen}
          token={token}
          studentId={studentId}
          firstName={firstName}
          data={data}
          onSigned={() => {
            setOpen(false);
            void load();
          }}
        />
      )}
    </div>
  );
}

function ChecklistSheet({
  open,
  onOpenChange,
  token,
  studentId,
  firstName,
  data,
  onSigned,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  token: string;
  studentId: string;
  firstName: string;
  data: Payload;
  onSigned: () => void;
}) {
  const behaviours = data.behaviours ?? [];
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [signature, setSignature] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start from the last signed answers when the behaviours are the same.
  useEffect(() => {
    if (!open) return;
    const cur =
      data.current && data.current.behaviours_hash === data.behaviours_hash ? data.current : null;
    setRatings(Object.fromEntries((cur?.items ?? []).map((i) => [i.code, i.rating])));
    setEvidence(Object.fromEntries((cur?.items ?? []).map((i) => [i.code, i.evidence])));
    setName('');
    setRole('');
    setSignature('');
    setError(null);
  }, [open, data]);

  const done = useMemo(
    () =>
      behaviours.filter((b) => ratings[b.code] && (evidence[b.code] ?? '').trim().length >= 15)
        .length,
    [behaviours, ratings, evidence]
  );
  const ready =
    done === behaviours.length && name.trim().length > 1 && role.trim().length > 1 && !!signature;

  const sign = async () => {
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    const { data: r, error: e } = await anon.rpc(
      'employer_portal_sign_behaviours' as never,
      {
        p_token: token,
        p_student: studentId,
        p_behaviours_hash: data.behaviours_hash,
        p_items: behaviours.map((b) => ({
          code: b.code,
          rating: ratings[b.code],
          evidence: evidence[b.code] ?? '',
        })),
        p_name: name.trim(),
        p_role: role.trim(),
        p_signature: signature,
      } as never
    );
    setBusy(false);
    const res = r as unknown as { success?: boolean; error?: string } | null;
    if (e || !res?.success) {
      setError(res?.error ?? e?.message ?? 'Not signed. Try again.');
      return;
    }
    onSigned();
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`${firstName} · behaviours for gateway`}
      title="Confirm the behaviours"
      description={`${data.standard?.title ?? 'Apprenticeship'} (${data.standard?.code ?? ''} version ${data.standard?.version ?? ''}). For each behaviour, say how consistently you have seen it and give one example from work. Short notes are fine.`}
      footer={
        <div className="space-y-2">
          {error && (
            <p className="text-[13px] font-medium text-orange-300" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={() => void sign()}
            disabled={!ready || busy}
            className={PUBLIC_PRIMARY_CTA}
            data-testid="behaviours-sign"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {busy ? 'Signing…' : `Sign (${done} of ${behaviours.length} done)`}
          </button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ol className="space-y-5" data-testid="behaviours-list">
          {behaviours.map((b) => {
            const r = ratings[b.code];
            return (
              <li
                key={b.code}
                className="space-y-3 rounded-2xl border border-white/[0.14] p-4"
                data-testid={`behaviour-${b.code}`}
              >
                <div>
                  <p className="text-[15px] font-semibold text-white">
                    <span className="font-mono">{b.code}</span> {b.title}
                  </p>
                  {b.description && (
                    <p className="mt-1 text-[13px] leading-snug text-white">{b.description}</p>
                  )}
                </div>
                <div
                  className="grid grid-cols-3 gap-2"
                  role="radiogroup"
                  aria-label={`${b.code} rating`}
                >
                  {data.scale.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      role="radio"
                      aria-checked={r === s.value}
                      onClick={() => setRatings((p) => ({ ...p, [b.code]: s.value }))}
                      className={cn(
                        'flex min-h-11 items-center justify-center gap-1 rounded-xl border px-2 py-2 text-center text-[12.5px] font-semibold leading-tight text-white touch-manipulation',
                        r === s.value ? 'border-elec-yellow' : 'border-white/[0.18]'
                      )}
                    >
                      {r === s.value && (
                        <Check className="h-3.5 w-3.5 shrink-0 text-elec-yellow" aria-hidden />
                      )}
                      {s.label}
                    </button>
                  ))}
                </div>
                <div>
                  <label
                    htmlFor={`ev-${b.code}`}
                    className="mb-1 block text-[12px] font-medium text-white"
                  >
                    An example you saw
                  </label>
                  <textarea
                    id={`ev-${b.code}`}
                    rows={2}
                    value={evidence[b.code] ?? ''}
                    onChange={(e) => setEvidence((p) => ({ ...p, [b.code]: e.target.value }))}
                    placeholder="e.g. On the school rewire in March they..."
                    className="w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                  />
                </div>
              </li>
            );
          })}
        </ol>
        <section className="space-y-5 lg:sticky lg:top-0 lg:self-start">
          <p className="text-[14px] leading-relaxed text-white">
            Sign as the person who has worked most closely with {firstName}, such as their line
            manager or supervisor. Your ratings and examples go to the college for the gateway pack.
            You can update them later; the college keeps each version.
          </p>
          <p className="text-[13px] leading-relaxed text-white">
            Ratings follow the Department for Education&apos;s{' '}
            <a
              href={data.guidance_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-elec-yellow underline"
            >
              behaviour verification guidance for employers
            </a>
            : {RATING_LABEL.not_yet}, {RATING_LABEL.developing}, {RATING_LABEL.consistent}.
          </p>
          <div>
            <label htmlFor="bv-name" className="mb-1 block text-[12px] font-medium text-white">
              Your full name
            </label>
            <input
              id="bv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
          </div>
          <div>
            <label htmlFor="bv-role" className="mb-1 block text-[12px] font-medium text-white">
              Your role
            </label>
            <input
              id="bv-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Contracts manager"
              className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
          </div>
          <div>
            <p className="mb-2 text-[12px] font-medium text-white">Sign here</p>
            {open && (
              <SignatureCapture
                variant="dark"
                showActions={false}
                onCapture={setSignature}
                height={140}
              />
            )}
          </div>
          <p className="text-[12.5px] leading-relaxed text-white">
            By signing you confirm these ratings and examples are what you have seen {firstName} do
            at work.
          </p>
        </section>
      </div>
    </FormSheet>
  );
}

export default BehaviourVerification;

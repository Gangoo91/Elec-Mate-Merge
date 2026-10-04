/**
 * Employer / college sign-up on the landing page (4 Oct 2026).
 *
 * Posts to `college-request-info`, the same pipeline the old waitlist used:
 * the lead lands on the audience's Brevo list and founder@ gets an email the
 * moment it's sent, so Andrew can set the team up by hand (employer codes,
 * tutor accounts). Team size rides in `message` — the function already
 * forwards it.
 *
 * Volt form: underline fields from the cert forms, chips for the 2–4 choice
 * questions, validate on submit, no icons.
 */
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getStoredAttribution } from '@/lib/attribution';
import { trackLead } from '@/lib/marketing-pixels';
import { cn } from '@/lib/utils';
import { inputCn, labelCn, buttonPrimaryCn } from '@/components/forms/fieldStyles';

type Audience = 'employer' | 'college';

const SIZES: Record<Audience, string[]> = {
  employer: ['1–5', '6–20', '21–50', '50+'],
  college: ['Under 50', '50–200', '200+'],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const chip = (on: boolean) =>
  cn(
    'h-11 rounded-xl border px-4 text-[14px] touch-manipulation transition-colors',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
  );

export function TeamSignupForm() {
  const [audience, setAudience] = useState<Audience>('employer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [phone, setPhone] = useState('');
  const [size, setSize] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  const orgLabel = audience === 'employer' ? 'Company' : 'College or training provider';
  const sizeLabel =
    audience === 'employer' ? 'Electricians and apprentices' : 'Electrical learners';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (name.trim().length < 2 || !EMAIL_RE.test(email.trim()) || org.trim().length < 2) {
      setError(`Add your name, work email and ${orgLabel.toLowerCase()}.`);
      return;
    }
    setError(null);
    setStatus('loading');
    trackLead({ email: email.trim(), source: `${audience}_signup` });
    const utm = getStoredAttribution();
    try {
      const { data, error: fnError } = await supabase.functions.invoke('college-request-info', {
        body: {
          audience,
          name: name.trim(),
          email: email.trim(),
          organisation: org.trim(),
          phone: phone.trim() || undefined,
          message: size ? `${sizeLabel}: ${size}` : undefined,
          signup_source: `landing_${audience}_signup`,
          utm: { source: utm.utm_source, medium: utm.utm_medium, campaign: utm.utm_campaign },
        },
      });
      if (fnError) throw new Error(fnError.message);
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'done') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-elec-yellow/50 bg-[hsl(0_0%_11%)] p-5"
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
          Got it
        </p>
        <p className="mt-1.5 text-[17px] font-semibold leading-snug text-white">
          Thanks {name.trim().split(' ')[0]} — we’ll be in touch about {org.trim()}.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-white">
          Andrew, our founder, sees every request and will email you at {email.trim()} to set your{' '}
          {audience === 'employer' ? 'team' : 'learners'} up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div role="radiogroup" aria-label="Who are you?" className="flex gap-2">
        {(['employer', 'college'] as Audience[]).map((a) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={audience === a}
            onClick={() => {
              setAudience(a);
              setSize(null);
            }}
            className={cn(chip(audience === a), 'flex-1')}
          >
            {a === 'employer' ? 'I’m an employer' : 'I’m a college'}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="team-name" className={labelCn}>
            Your name
          </label>
          <input
            id="team-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="e.g. Sam Taylor"
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor="team-email" className={labelCn}>
            Work email
          </label>
          <input
            id="team-email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoCapitalize="none"
            placeholder="you@company.co.uk"
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor="team-org" className={labelCn}>
            {orgLabel}
          </label>
          <input
            id="team-org"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            placeholder={
              audience === 'employer' ? 'e.g. Taylor Electrical Ltd' : 'e.g. Leeds College'
            }
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor="team-phone" className={labelCn}>
            Phone <span className="font-normal">(optional)</span>
          </label>
          <input
            id="team-phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="07…"
            className={inputCn}
          />
        </div>
      </div>

      <div>
        <p className={labelCn}>{sizeLabel}</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {SIZES[audience].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(size === s ? null : s)}
              className={chip(size === s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="text-[13.5px] font-medium text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          buttonPrimaryCn,
          'flex w-full items-center justify-center font-bold sm:w-auto sm:px-8'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
          </>
        ) : audience === 'employer' ? (
          'Set up my team'
        ) : (
          'Set up my learners'
        )}
      </button>
      <p className="text-[12.5px] leading-relaxed text-white">
        We use these details only to set you up and talk to you about Elec-Mate — see our{' '}
        <a href="/privacy" className="font-semibold text-elec-yellow underline underline-offset-2">
          privacy notice
        </a>
        .
      </p>
    </form>
  );
}

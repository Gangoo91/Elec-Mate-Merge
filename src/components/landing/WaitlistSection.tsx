import { useState } from 'react';
import { Building2, GraduationCap, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { trackLead } from '@/lib/marketing-pixels';
import { getStoredAttribution, fireServerCapi } from '@/lib/attribution';

type Audience = 'employer' | 'college';

interface AudienceConfig {
  audience: Audience;
  icon: typeof Building2;
  eyebrow: string;
  title: string;
  blurb: string;
  orgLabel: string;
  orgPlaceholder: string;
  buttonLabel: string;
  success: string;
}

const AUDIENCES: AudienceConfig[] = [
  {
    audience: 'employer',
    icon: Building2,
    eyebrow: 'FOR EMPLOYERS',
    title: 'Manage your team in one place.',
    blurb:
      'Track your sparks’ certs, jobs and apprentices, assign work, and keep compliance tidy. Join the early-access waitlist for the Employer hub.',
    orgLabel: 'Company',
    orgPlaceholder: 'Your company',
    buttonLabel: 'Join the employer waitlist',
    success: 'You’re on the employer early-access list — we’ll be in touch soon.',
  },
  {
    audience: 'college',
    icon: GraduationCap,
    eyebrow: 'FOR COLLEGES',
    title: 'Run your cohort’s learning & OTJ.',
    blurb:
      'Give tutors and assessors a live view of every apprentice’s progress, portfolio and off-the-job hours. Join the early-access waitlist for the College hub.',
    orgLabel: 'College',
    orgPlaceholder: 'Your college',
    buttonLabel: 'Join the college waitlist',
    success: 'You’re on the college early-access list — we’ll be in touch soon.',
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function WaitlistCard({ config }: { config: AudienceConfig }) {
  const Icon = config.icon;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isValid =
    name.trim().length >= 2 && EMAIL_RE.test(email.trim()) && organisation.trim().length >= 2;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || status === 'loading') return;
    setStatus('loading');
    setErrorMsg(null);

    const eventId = trackLead({ email: email.trim(), source: `${config.audience}_waitlist` });
    const attribution = getStoredAttribution();

    try {
      const { data, error } = await supabase.functions.invoke('college-request-info', {
        body: {
          audience: config.audience,
          name: name.trim(),
          email: email.trim(),
          organisation: organisation.trim(),
          signup_source: `landing_waitlist_${config.audience}`,
          utm: {
            source: attribution.utm_source,
            medium: attribution.utm_medium,
            campaign: attribution.utm_campaign,
          },
        },
      });

      if (error) throw new Error(error.message);
      if ((data as { error?: string })?.error) {
        throw new Error((data as { error: string }).error);
      }

      fireServerCapi({
        event_name: 'Lead',
        event_id: eventId,
        email: email.trim(),
        first_name: name.trim().split(' ')[0] || undefined,
        content_name: `${config.audience}_waitlist`,
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col rounded-[1.6rem] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-elec-yellow/10 text-elec-yellow">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.18em] text-elec-yellow">
          {config.eyebrow}
        </span>
      </div>

      <h3 className="mt-5 text-[1.4rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[1.6rem]">
        {config.title}
      </h3>
      <p className="mt-3 text-[13.5px] leading-[1.7] text-white/70 sm:text-[14px]">{config.blurb}</p>

      {status === 'success' ? (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/[0.08] p-4 text-green-300">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm sm:text-[15px]">{config.success}</p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            autoComplete="name"
            className="h-12 text-base text-white touch-manipulation border-white/30 bg-white/[0.04] placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            required
            autoComplete="email"
            inputMode="email"
            className="h-12 text-base text-white touch-manipulation border-white/30 bg-white/[0.04] placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Input
            type="text"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder={config.orgPlaceholder}
            required
            autoComplete="organization"
            aria-label={config.orgLabel}
            className="h-12 text-base text-white touch-manipulation border-white/30 bg-white/[0.04] placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <Button
            type="submit"
            disabled={!isValid || status === 'loading'}
            className="h-12 w-full touch-manipulation rounded-xl bg-yellow-400 px-6 text-base font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {config.buttonLabel}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>
          {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          <p className="text-[12px] leading-[1.6] text-white/50">
            No spam — we’ll only email you about early access. Unsubscribe any time.
          </p>
        </form>
      )}
    </div>
  );
}

export function WaitlistSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        '[content-visibility:auto] [contain-intrinsic-size:auto_700px] px-5 py-14 sm:py-20 lg:px-8 lg:py-24',
        className
      )}
    >
      <div className="mx-auto max-w-[80rem]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-elec-yellow">
            EMPLOYERS &amp; COLLEGES
          </span>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3rem]">
            Bringing a <span className="text-elec-yellow">team or cohort?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[42rem] text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
            The Employer and College hubs are coming. Join the early-access waitlist and we’ll get
            you in first.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:gap-6">
          {AUDIENCES.map((config) => (
            <WaitlistCard key={config.audience} config={config} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import { ListRow } from '@/components/college/primitives';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { ElecIdProfile } from '@/hooks/useElecIdProfile';
import { getEcsCardLabel, jobTitleText } from '@/data/uk-electrician-constants';

/* ==========================================================================
   TalentPoolOptIn — ELE-1958. "Let firms find me".

   The talent pool is OFF until the electrician switches it on here, after
   seeing exactly what a firm will see. Switching on stamps
   available_for_hire_opted_in_at (DB trigger) — that stamp is the proof of
   consent get_talent_pool() requires. Switching off is instant and also
   removes them from every firm's shortlist (DB trigger).

   What a firm sees mirrors get_talent_pool() field for field. If that RPC
   changes, change WHAT_FIRMS_SEE here too.

   ELE-1957: "Where you're based" (postcode district or town) and how far they
   travel. set_my_talent_location() resolves it to a district centre on the
   server, so firms can match "within 20 miles" without ever seeing a street.
   A postcode on their business profile is offered as a one-tap fill. The
   bell prompt deep-links here with ?talent=location.
   ========================================================================== */

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message?: string } | null }>;

interface TalentLocation {
  error?: string;
  has_location: boolean;
  base_outcode: string | null;
  base_label: string | null;
  travel_radius_miles: number | null;
  suggestion: { place: string; label: string } | null;
}

const RADIUS_OPTIONS = [10, 20, 30, 50, 100];

/** What goes back in the box: the town they typed, or the district ("S10"). */
const initialBase = (l?: TalentLocation | null) =>
  !l?.has_location
    ? ''
    : l.base_label && !l.base_label.includes('·')
      ? l.base_label
      : (l.base_outcode ?? '');

const LOCATION_ERRORS: Record<string, string> = {
  place_not_found:
    "We couldn't find that place. Try the first half of your postcode, like S10 or LS6.",
  bad_radius: 'Pick how far you travel.',
  not_found: 'Your Elec-ID could not be found. Refresh and try again.',
};

/** Same rule as public.talent_pool_display_name(): "Jane Smith" → "Jane S.",
 *  bracketed notes and symbols dropped first ("Demo Worker (test)" → "Demo W."). */
function talentPoolDisplayName(name: string | null | undefined): string | null {
  const cleaned = (name ?? '')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^\p{L}\s'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return null;
  const parts = cleaned.split(' ');
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
}

const RATE_SUFFIX: Record<string, string> = {
  hourly: '/hour',
  daily: '/day',
  weekly: '/week',
  yearly: '/year',
};

const TIER_LABEL: Record<string, string> = {
  basic: 'Basic',
  verified: 'Verified',
  premium: 'Premium',
};

const NEVER_SHARED = [
  'Your phone number',
  'Your email address',
  'Your home address',
  'Your ECS card number',
  'Your uploaded documents (firms only see that a document type was verified)',
];

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const formatDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

interface TalentPoolOptInProps {
  profile: ElecIdProfile | null;
  /** Elec-ID switched off entirely (opt_out). Opting in re-enables it. */
  isOptedOut: boolean;
  updateProfile: (data: Partial<ElecIdProfile>) => Promise<boolean>;
  setOptOut: (optOut: boolean) => Promise<boolean>;
}

export function TalentPoolOptIn({
  profile,
  isOptedOut,
  updateProfile,
  setOptOut,
}: TalentPoolOptInProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [area, setArea] = useState('');
  const [base, setBase] = useState('');
  const [radius, setRadius] = useState<number>(20);
  const baseInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const listed = Boolean(profile?.available_for_hire) && !isOptedOut;
  const optedInAt = profile?.available_for_hire_opted_in_at ?? null;

  const locationKey = ['talent-location', profile?.id];
  const { data: location } = useQuery({
    queryKey: locationKey,
    enabled: !!profile?.id,
    queryFn: async (): Promise<TalentLocation> => {
      const { data, error } = await rpc('my_talent_location', { p_profile_id: profile!.id });
      if (error) throw new Error(error.message || 'Could not load your location');
      return data as TalentLocation;
    },
  });
  const hasLocation = !!location?.has_location;

  useEffect(() => {
    if (!sheetOpen) return;
    setArea(profile?.work_area ?? '');
    setBase(initialBase(location));
    setRadius(location?.travel_radius_miles ?? 20);
    // Only when the sheet opens; later refetches must not wipe what they typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetOpen]);

  // The sheet can open (deep link) before the location has loaded.
  useEffect(() => {
    if (!sheetOpen || !location) return;
    setBase((b) => b || initialBase(location));
    if (location.travel_radius_miles) setRadius(location.travel_radius_miles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.base_outcode, location?.travel_radius_miles]);

  // Deep link from the bell: /settings?tab=elec-id&talent=location
  useEffect(() => {
    if (searchParams.get('talent') !== 'location' || !profile) return;
    searchParams.delete('talent');
    setSearchParams(searchParams, { replace: true });
    setSheetOpen(true);
    window.setTimeout(() => baseInputRef.current?.focus(), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  // Exactly what get_talent_pool() would return for this person.
  const { data: preview } = useQuery({
    queryKey: ['talent-pool-self-preview', profile?.id, profile?.employee_id],
    enabled: sheetOpen && !!profile?.id,
    queryFn: async () => {
      const [employee, skills, quals, docs, history] = await Promise.all([
        supabase
          .from('employer_employees')
          .select('name')
          .eq('id', profile!.employee_id)
          .maybeSingle(),
        supabase.from('employer_elec_id_skills').select('skill_name').eq('profile_id', profile!.id),
        supabase
          .from('employer_elec_id_qualifications')
          .select('qualification_name')
          .eq('profile_id', profile!.id),
        supabase
          .from('elec_id_documents')
          .select('document_type')
          .eq('profile_id', profile!.id)
          .eq('verification_status', 'verified'),
        supabase
          .from('employer_elec_id_work_history')
          .select('id', { count: 'exact', head: true })
          .eq('profile_id', profile!.id),
      ]);
      const { data: auth } = await supabase.auth.getUser();
      let fallbackName: string | null = null;
      if (!employee.data?.name && auth.user) {
        const { data: p } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', auth.user.id)
          .maybeSingle();
        fallbackName = p?.full_name ?? null;
      }
      return {
        name: talentPoolDisplayName(employee.data?.name || fallbackName),
        skills: (skills.data ?? []).map((s) => s.skill_name).filter(Boolean) as string[],
        quals: (quals.data ?? []).map((q) => q.qualification_name).filter(Boolean) as string[],
        verifiedDocTypes: Array.from(
          new Set((docs.data ?? []).map((d) => String(d.document_type).replace(/_/g, ' ')))
        ),
        workHistoryCount: history.count ?? 0,
      };
    },
  });

  const handleSwitch = async (checked: boolean) => {
    if (checked) {
      // Never switch on blind — show what is shared first.
      setSheetOpen(true);
      return;
    }
    setSaving(true);
    const ok = await updateProfile({ available_for_hire: false });
    setSaving(false);
    toast(
      ok
        ? {
            title: "You're out of the talent pool",
            description:
              'Firms can no longer find you, and you have been taken off their shortlists.',
          }
        : {
            title: 'Not saved',
            description: 'Could not switch the talent pool off. Try again.',
            variant: 'destructive',
          }
    );
  };

  const saveLocation = async (): Promise<boolean> => {
    if (!profile) return false;
    const typed = base.trim();
    const same =
      typed.toUpperCase() === initialBase(location).toUpperCase() &&
      radius === (location?.travel_radius_miles ?? 20);
    if (same || (!typed && !hasLocation)) return true;
    const { data, error } = await rpc('set_my_talent_location', {
      p_profile_id: profile.id,
      p_place: typed || null,
      p_radius_miles: radius,
    });
    const err = error ? 'save' : (data as { error?: string } | null)?.error;
    if (err) {
      toast({
        title: 'Location not saved',
        description: LOCATION_ERRORS[err] ?? 'Try again.',
        variant: 'destructive',
      });
      baseInputRef.current?.focus();
      return false;
    }
    queryClient.invalidateQueries({ queryKey: locationKey });
    return true;
  };

  const handleConfirm = async () => {
    if (!profile) return;
    setSaving(true);
    if (!(await saveLocation())) {
      setSaving(false);
      return;
    }
    if (isOptedOut) {
      const reEnabled = await setOptOut(false);
      if (!reEnabled) {
        setSaving(false);
        toast({ title: 'Not saved', description: 'Try again.', variant: 'destructive' });
        return;
      }
    }
    const patch: Partial<ElecIdProfile> = {
      work_area: area.trim() || null,
    };
    if (!listed) patch.available_for_hire = true;
    // 'Private' hides the profile from firms entirely, which would make the
    // opt-in a no-op. Opting in moves it to the default 'Employers only'.
    if (!listed && profile.profile_visibility === 'private') {
      patch.profile_visibility = 'employers_only';
    }
    const ok = await updateProfile(patch);
    setSaving(false);
    if (!ok) {
      toast({ title: 'Not saved', description: 'Try again.', variant: 'destructive' });
      return;
    }
    setSheetOpen(false);
    toast(
      listed
        ? { title: 'Saved', description: 'Your talent pool details are updated.' }
        : {
            title: 'Firms can now find you',
            description: 'Switch it off here at any time.',
          }
    );
  };

  const handleTurnOff = async () => {
    setSheetOpen(false);
    await handleSwitch(false);
  };

  const rate =
    profile?.rate_amount != null && Number(profile.rate_amount) > 0
      ? `£${Number(profile.rate_amount).toLocaleString('en-GB')}${RATE_SUFFIX[profile.rate_type ?? 'daily'] ?? ''}`
      : null;

  const whatFirmsSee: { label: string; value: string | null }[] = [
    { label: 'Name', value: preview?.name ?? null },
    { label: 'Area', value: area.trim() || location?.base_label || null },
    {
      label: 'Distance',
      value: hasLocation
        ? `How far you are from their job, e.g. "6 miles away", worked out from ${location?.base_outcode}`
        : null,
    },
    { label: 'Job title', value: jobTitleText(profile?.job_title) || null },
    {
      label: 'ECS card',
      value: profile?.ecs_card_type
        ? `${getEcsCardLabel(profile.ecs_card_type)}${profile.ecs_expiry_date ? ` · expires ${formatDate(profile.ecs_expiry_date)}` : ''}`
        : null,
    },
    {
      label: 'Qualifications',
      value: preview ? (preview.quals.length ? preview.quals.join(', ') : null) : null,
    },
    {
      label: 'Skills and specialisms',
      value:
        [...(preview?.skills ?? []), ...(profile?.specialisations ?? [])]
          .filter((v, i, a) => a.indexOf(v) === i)
          .join(', ') || null,
    },
    { label: 'Rate', value: rate },
    { label: 'About you', value: profile?.bio?.trim() || null },
    {
      label: 'Verification',
      value: [
        TIER_LABEL[profile?.verification_tier ?? 'basic'],
        preview?.verifiedDocTypes.length
          ? `verified: ${preview.verifiedDocTypes.join(', ')}`
          : null,
      ]
        .filter(Boolean)
        .join(' · '),
    },
    {
      label: 'Work history',
      value: preview
        ? preview.workHistoryCount > 0
          ? `${preview.workHistoryCount} role${preview.workHistoryCount === 1 ? '' : 's'} (count only)`
          : null
        : null,
    },
    { label: 'Profile photo', value: 'If you have added one' },
    { label: 'Availability', value: 'Open to work while this is on' },
  ];

  const subtitle = isOptedOut
    ? 'Off · your Elec-ID is disabled'
    : listed
      ? `On${optedInAt ? ` since ${formatDate(optedInAt)}` : ''}${
          hasLocation
            ? ` · ${location?.base_label}, travels ${location?.travel_radius_miles ?? 20} miles`
            : profile?.work_area
              ? ` · ${profile.work_area}`
              : ''
        }`
      : "Off · firms can't see you in the talent pool";

  return (
    <>
      <ListRow
        accent={listed ? 'emerald' : 'cyan'}
        title="Let firms find me"
        subtitle={subtitle}
        trailing={
          <Switch
            checked={listed}
            onCheckedChange={handleSwitch}
            disabled={saving || !profile}
            aria-label="Let firms find me"
            className="data-[state=checked]:bg-emerald-500 shrink-0"
          />
        }
      />
      <div className="px-5 sm:px-6 pb-4 -mt-1">
        {listed && location && !hasLocation ? (
          <div className="space-y-2.5">
            <p className="text-[13px] leading-snug text-white">
              <span className="font-semibold text-elec-yellow">Add where you&apos;re based.</span>{' '}
              Firms look for people within a few miles of the job. Without a location you only show
              up when your area name matches theirs.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSheetOpen(true);
                  window.setTimeout(() => baseInputRef.current?.focus(), 350);
                }}
                className="h-11 px-4 rounded-xl bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation"
              >
                Add where you&apos;re based
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            disabled={!profile}
            className="h-11 px-4 rounded-xl border border-white/[0.14] bg-white/[0.04] text-[13px] font-medium text-white touch-manipulation disabled:opacity-60"
          >
            {listed ? 'What firms see · edit area' : 'See what firms would see'}
          </button>
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SettingsSheetContent
          className="bg-elec-dark flex flex-col"
          title="Let firms find me"
          description="What firms see in the talent pool, and what they never see."
        >
          <div className="lg:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
          </div>
          <div className="px-5 pb-3">
            <h3 className="text-lg font-semibold text-white">Let firms find me</h3>
            <p className="mt-1 text-sm text-white">
              Firms on Elec-Mate that are hiring can find you in their talent pool. It stays off
              until you switch it on, and you can switch it off at any time.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6">
            <div>
              <label
                htmlFor="talent-base"
                className="text-[12px] font-medium text-white mb-1 block"
              >
                Where you&apos;re based
              </label>
              <input
                id="talent-base"
                ref={baseInputRef}
                value={base}
                onChange={(e) => setBase(e.target.value.slice(0, 60))}
                placeholder="e.g. S10 or Keighley"
                className={inputCn}
                autoComplete="off"
                autoCapitalize="characters"
              />
              {location?.suggestion &&
                base.trim().toUpperCase() !== location.suggestion.place.toUpperCase() && (
                  <button
                    type="button"
                    onClick={() => setBase(location.suggestion!.place)}
                    className="mt-2 h-11 px-4 rounded-xl border border-white/[0.14] bg-white/[0.04] text-[13px] font-medium text-white touch-manipulation"
                  >
                    Use {location.suggestion.label} from your business address
                  </button>
                )}
              <p className="mt-1.5 text-[12px] text-white">
                Only the district is used, never your street. Firms see roughly how far you are from
                their job, like &quot;6 miles away&quot;.
              </p>

              <p className="mt-4 text-[12px] font-medium text-white mb-2">
                How far you&apos;ll travel
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="radiogroup"
                aria-label="How far you'll travel"
              >
                {RADIUS_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={radius === r}
                    onClick={() => setRadius(r)}
                    className={cn(
                      'h-11 min-w-[64px] px-3 rounded-xl border text-[13px] font-semibold touch-manipulation',
                      radius === r
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.14] bg-white/[0.04] text-white'
                    )}
                  >
                    {r} mi
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="talent-area"
                className="text-[12px] font-medium text-white mb-1 block"
              >
                Area you work in (optional)
              </label>
              <input
                id="talent-area"
                value={area}
                onChange={(e) => setArea(e.target.value.slice(0, 80))}
                placeholder="e.g. Leeds and Bradford"
                className={inputCn}
                autoComplete="off"
              />
              <p className="mt-1.5 text-[12px] text-white">
                A town or region, not your address. Firms use it to find people nearby.
              </p>
            </div>

            <section>
              <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                What firms see
              </h4>
              <div className="-mx-5 border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] divide-y divide-white/[0.08]">
                {whatFirmsSee.map((row) => (
                  <div key={row.label} className="flex gap-3 px-5 py-3">
                    <span className="w-28 shrink-0 text-[12px] font-medium text-white">
                      {row.label}
                    </span>
                    <span
                      className={cn(
                        'flex-1 min-w-0 text-[13px] text-white break-words',
                        !row.value && 'italic'
                      )}
                    >
                      {row.value ?? 'Not set, so not shown'}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                Never shared
              </h4>
              <ul className="space-y-1.5">
                {NEVER_SHARED.map((item) => (
                  <li key={item} className="text-[13px] text-white">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-white">
                Firms contact you through Elec-Mate messages. Your phone number and email stay
                private unless you choose to give them out when you reply.
              </p>
            </section>

            <section>
              <h4 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                What happens next
              </h4>
              <p className="text-[13px] text-white">
                A firm can shortlist you, invite you to apply for a job, or send you a message. You
                get a notification and can reply in Messages, or ignore it. Switch this off and you
                disappear from the talent pool and from every firm&apos;s shortlist straight away.
              </p>
              {!listed && profile?.profile_visibility === 'private' && (
                <p className="mt-3 text-[13px] text-white">
                  Your profile is set to Private. Switching this on changes it to Employers only so
                  firms can see the details above.
                </p>
              )}
              {!listed && isOptedOut && (
                <p className="mt-3 text-[13px] text-white">
                  Your Elec-ID is disabled. Switching this on re-enables it.
                </p>
              )}
            </section>
          </div>

          <div className="p-5 border-t border-white/[0.06] space-y-3">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 h-11 rounded-xl border border-white/[0.14] text-white touch-manipulation"
                onClick={listed ? handleTurnOff : () => setSheetOpen(false)}
                disabled={saving}
              >
                {listed ? 'Switch off' : 'Not now'}
              </button>
              <button
                type="button"
                className="flex-1 h-11 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
                onClick={handleConfirm}
                disabled={saving || !profile}
              >
                {saving ? 'Saving…' : listed ? 'Save' : 'Let firms find me'}
              </button>
            </div>
          </div>
        </SettingsSheetContent>
      </Sheet>
    </>
  );
}

export default TalentPoolOptIn;

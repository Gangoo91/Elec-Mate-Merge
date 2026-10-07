/* ==========================================================================
   CollegeSetupPage — /college/setup and /college/setup/:code (ELE-1855).

   A new college from nothing to a learner on the roll, by the college's own
   lead, with no SQL and nobody from Elec-Mate at the keyboard:

     1. Account. Signed out: make a staff account (or sign in) right here, so
        a college lead never goes through the paid sign-up. Creating the
        college makes them staff, and staff have the whole app free.
     2. Create the college. Needs the one-time set-up code Elec-Mate issues
        with a signed order (Admin → Colleges → Hub colleges), so nobody can
        make a college to get free access. A platform admin needs no code.
     3. The checklist: details, courses from the catalogue, a cohort, staff,
        the cohort's join code, the learner roll (logins + join links by
        email), first learner linked, first register. It tracks itself from
        the data (get_college_setup_status) and the College Hub home shows the
        same checklist until it is done or dismissed.

   PUBLIC route (outside the app's paid-access gate), like /college/join.
   ========================================================================== */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Copy, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { storageGetSync, storageRemoveSync, storageSetSync } from '@/utils/storage';
import { CollegeSupabaseProvider, useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LINK,
  COLLEGE_LIST,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  AWARDING_BODIES,
  SETUP_CODE_KEY,
  SETUP_STATUS_KEY,
  checkSetupCode,
  createCollege,
  dismissSetup,
  setupSteps,
  suggestCollegeCode,
  useCollegeSetupStatus,
  type CollegeSetupStatus,
  type SetupCodeCheck,
  type SetupStep,
} from '@/lib/collegeSetup';
import { NewCohortDialog } from '@/components/college/dialogs/NewCohortDialog';
import { BulkAddStudentsSheet } from '@/components/college/dialogs/BulkAddStudentsSheet';
import { StaffRosterSheet } from '@/components/college/setup/StaffRosterSheet';
import { CourseCatalogueSheet } from '@/components/college/setup/CourseCatalogueSheet';
import { CollegeAccessFrame } from '@/components/college/access/CollegeAccessFrame';

const HELP: PageHelpContent = {
  id: 'college-setup',
  title: 'Setting up your college',
  what: 'Everything a new college needs before its first learner signs in, in order. Each step ticks itself off when it is done; you can come back to this page at any time.',
  steps: [
    { title: 'Courses, then cohorts', body: 'Pick the qualifications you deliver from the catalogue, then make a cohort on one of them with its dates and lead tutor.' },
    { title: 'Your staff', body: 'Paste name, email and role for each person. New people get a login by email; anyone who already uses Elec-Mate gets a link to join.' },
    { title: 'Your safeguarding lead', body: 'Open the person in Staff and mark them designated safeguarding lead, with a deputy if you have one. They need a login: concerns raised in the app go straight to them, and until one is named they go to admins and heads of department.' },
    { title: 'Your learners', body: 'Paste your MIS list. Each learner gets a login and their cohort join link by email. Running the same list twice is safe.' },
    { title: 'The join code', body: 'Each cohort has one. Learners can also type it on the sign-up page: it links them to the cohort and applies your college discount.' },
  ],
  notes: [
    { title: 'Who can create a college', body: 'Elec-Mate issues a set-up code with a signed order. One account belongs to one college.' },
  ],
};

/** Wrapped so a platform admin acting for a college (white-glove) sets up THAT college. */
export default function CollegeSetupPage() {
  return (
    <CollegeAccessFrame>
      <CollegeSetupPageInner />
    </CollegeAccessFrame>
  );
}

function CollegeSetupPageInner() {
  const { code: codeParam } = useParams<{ code?: string }>();
  const { user, profile, isLoading } = useAuth();

  // The set-up code survives a sign-in or account creation.
  const [setupCode, setSetupCode] = useState<string>(() => (codeParam ?? storageGetSync(SETUP_CODE_KEY) ?? '').toUpperCase());
  useEffect(() => {
    if (codeParam) storageSetSync(SETUP_CODE_KEY, codeParam.toUpperCase());
  }, [codeParam]);

  // ?new=1 from Admin → Colleges: a platform admin who is also staff
  // somewhere (Andrew is) still gets the create form, not their own checklist.
  const [params] = useSearchParams();
  const isPlatformAdmin = !!(profile as { admin_role?: string | null } | null)?.admin_role;
  const isStaff = !!profile?.college_id && !(isPlatformAdmin && params.get('new') === '1');

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Set up your college" backTo={isStaff ? '/college' : '/'} />
      <HubBody pushContext="Get notified when your learners join" hidePushPrompt={!user}>
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" aria-hidden />
          </div>
        ) : !user ? (
          <AccountStep setupCode={setupCode} />
        ) : isStaff ? (
          <CollegeSupabaseProvider collegeId={profile?.college_id ?? undefined}>
            <Checklist />
          </CollegeSupabaseProvider>
        ) : (
          <CreateStep setupCode={setupCode} onCode={setSetupCode} />
        )}
      </HubBody>
    </HubPage>
  );
}

/* ── 1. Account ─────────────────────────────────────────────────────── */

function AccountStep({ setupCode }: { setupCode: string }) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<'new' | 'existing'>('new');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strong = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Enter your work email.');
    if (mode === 'new' && !name.trim()) return setError('Enter your name.');
    if (mode === 'new' && !strong) return setError('Password needs 8+ characters, upper and lower case, and a number.');
    setBusy(true);
    try {
      const res =
        mode === 'new' ? await signUp(email.trim(), password, name.trim()) : await signIn(email.trim(), password);
      if (res?.error) setError(res.error.message ?? 'That did not work. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
      <div>
        <CollegePageHeader
          eyebrow="College Hub"
          title="Set up your college"
          description="About 20 minutes from here to your first learner on the roll: your courses, a cohort, your staff and your learners. Start with your own staff account."
          help={HELP}
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ['Staff use it free', 'Your account, and every staff account you add, has the whole app at no cost.'],
            ['Your set-up code', setupCode ? `We check code ${setupCode} as soon as you are signed in. Nothing to type again.` : 'Elec-Mate gives you a set-up code with your order. You will need it on the next step.'],
            ['Nothing to install', 'Works in the browser on a laptop, and in the Elec-Mate app on a phone.'],
          ].map(([t, b]) => (
            <li key={t} className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3.5">
              <p className="text-[14px] font-semibold text-white">{t}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">{b}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={submit} className={cn(COLLEGE_CARD, 'space-y-5 self-start')}>
        <div className="flex gap-2">
          <button type="button" onClick={() => setMode('new')} className={chipCn(mode === 'new')}>
            New to Elec-Mate
          </button>
          <button type="button" onClick={() => setMode('existing')} className={chipCn(mode === 'existing')}>
            I have an account
          </button>
        </div>
        {mode === 'new' && (
          <div>
            <label htmlFor="su-name" className={labelCn}>
              Your name
            </label>
            <input id="su-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputCn} />
          </div>
        )}
        <div>
          <label htmlFor="su-email" className={labelCn}>
            Work email
          </label>
          <input id="su-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={inputCn} />
        </div>
        <div>
          <label htmlFor="su-pw" className={labelCn}>
            Password
          </label>
          <input
            id="su-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'new' ? 'new-password' : 'current-password'}
            className={inputCn}
          />
          {mode === 'new' && <p className="mt-1.5 text-[12px] text-white">8+ characters, upper and lower case, and a number.</p>}
        </div>
        {error && <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">{error}</p>}
        <button type="submit" disabled={busy} className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}>
          {busy ? 'One moment…' : mode === 'new' ? 'Create my staff account' : 'Sign in'}
        </button>
        <p className="text-[12px] leading-relaxed text-white">
          By creating an account you agree to the Elec-Mate terms and privacy notice.
        </p>
      </form>
    </div>
  );
}

/* ── 2. Create the college ──────────────────────────────────────────── */

function CreateStep({ setupCode, onCode }: { setupCode: string; onCode: (c: string) => void }) {
  const { user, profile, fetchProfile } = useAuth();
  const { toast } = useToast();
  const isPlatformAdmin = !!(profile as { admin_role?: string | null } | null)?.admin_role;
  const [code, setCode] = useState(setupCode);
  const [check, setCheck] = useState<SetupCodeCheck | null>(null);
  const [checking, setChecking] = useState(false);
  const [name, setName] = useState('');
  const [short, setShort] = useState('');
  const [shortTouched, setShortTouched] = useState(false);
  const [bodies, setBodies] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstAdminFor, setFirstAdminFor] = useState<string | null>(null);
  const navigate = useNavigate();

  const runCheck = async (c: string) => {
    if (!c.trim()) return;
    setChecking(true);
    const res = await checkSetupCode(c);
    setCheck(res);
    setChecking(false);
    if (res.valid) {
      onCode(c.trim().toUpperCase());
      storageSetSync(SETUP_CODE_KEY, c.trim().toUpperCase());
      if (!name && res.org_name) {
        setName(res.org_name);
        if (!shortTouched) setShort(suggestCollegeCode(res.org_name));
      }
    }
  };

  useEffect(() => {
    if (setupCode && !isPlatformAdmin) void runCheck(setupCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canCreate = (isPlatformAdmin || check?.valid) && name.trim().length >= 3 && /^[A-Z0-9]{2,12}$/.test(short);

  const create = async () => {
    if (!canCreate || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await createCollege({
        name: name.trim(),
        code: short,
        awardingBodies: bodies,
        city,
        setupCode: isPlatformAdmin ? null : code,
      });
      storageRemoveSync(SETUP_CODE_KEY);
      if (isPlatformAdmin) {
        toast({ title: `${res.name} created`, description: 'Now add its first admin.' });
        setFirstAdminFor(res.college_id);
        return;
      }
      // Skip the role picker: college staff land in the hub.
      if (user) {
        await supabase
          .from('profiles')
          .update({ onboarding_completed: true, role: profile?.role ?? 'electrician' })
          .eq('id', user.id);
        await fetchProfile?.(user.id);
      }
      toast({ title: `${res.name} is set up`, description: 'Next: your courses.' });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <CollegePageHeader
        eyebrow="College Hub"
        title="Create your college"
        description={
          isPlatformAdmin
            ? 'You are signed in as Elec-Mate. Create the college, then add its first admin: they get a login by email and finish the set-up.'
            : 'Enter the set-up code from Elec-Mate, check your college name, and you are in. You become its first admin.'
        }
        help={HELP}
      />
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {!isPlatformAdmin && (
          <section className={cn(COLLEGE_CARD, 'space-y-4')}>
            <CollegeSectionTitle title="Your set-up code" sub="It came with your order, for example SETUP-AB12CD34." />
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label htmlFor="setup-code" className={labelCn}>
                  Set-up code
                </label>
                <input
                  id="setup-code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase().replace(/\s/g, ''));
                    setCheck(null);
                  }}
                  onBlur={() => void runCheck(code)}
                  autoCapitalize="characters"
                  className={cn(inputCn, 'font-mono tracking-wider')}
                />
              </div>
              <button type="button" onClick={() => void runCheck(code)} disabled={checking || !code.trim()} className={COLLEGE_BTN}>
                {checking ? 'Checking…' : 'Check'}
              </button>
            </div>
            {check && !check.valid && (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">{check.reason}</p>
            )}
            {check?.valid && <p className="text-[13px] font-semibold text-emerald-300">Code accepted for {check.org_name}.</p>}
          </section>
        )}

        <section className={cn(COLLEGE_CARD, 'space-y-5', !isPlatformAdmin && !check?.valid && 'opacity-60')}>
          <CollegeSectionTitle title="Your college" sub="You can change any of this later in Settings." />
          <div>
            <label htmlFor="col-name" className={labelCn}>
              College name
            </label>
            <input
              id="col-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!shortTouched) setShort(suggestCollegeCode(e.target.value));
              }}
              className={inputCn}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="col-code" className={labelCn}>
                Short code
              </label>
              <input
                id="col-code"
                value={short}
                onChange={(e) => {
                  setShortTouched(true);
                  setShort(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12));
                }}
                className={cn(inputCn, 'font-mono tracking-wider')}
              />
              <p className="mt-1.5 text-[12px] text-white">2 to 12 letters or numbers.</p>
            </div>
            <div>
              <label htmlFor="col-city" className={labelCn}>
                Town or city
              </label>
              <input id="col-city" value={city} onChange={(e) => setCity(e.target.value)} className={inputCn} />
            </div>
          </div>
          <div>
            <span className={labelCn}>Awarding bodies</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {AWARDING_BODIES.map((b) => {
                const on = bodies.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBodies((x) => (on ? x.filter((y) => y !== b) : [...x, b]))}
                    className={cn(chipCn(on), 'h-11')}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
          {error && <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">{error}</p>}
          <button type="button" onClick={() => void create()} disabled={!canCreate || busy} className={cn(COLLEGE_BTN_PRIMARY, 'w-full sm:w-auto')}>
            {busy ? 'Creating…' : 'Create my college'}
          </button>
        </section>
      </div>
      {firstAdminFor && (
        <StaffRosterSheet
          open={!!firstAdminFor}
          onOpenChange={(o) => {
            if (!o) {
              setFirstAdminFor(null);
              navigate('/admin/colleges');
            }
          }}
          collegeId={firstAdminFor}
        />
      )}
    </div>
  );
}

/* ── 3. The checklist ───────────────────────────────────────────────── */

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function newJoinCode(): string {
  const bytes = new Uint32Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
}

interface InviteRow {
  id: string;
  invite_code: string;
  cohort_id: string | null;
}

function Checklist() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const qc = useQueryClient();
  const { cohorts, courses } = useCollegeSupabase();
  const { data: status, isLoading } = useCollegeSetupStatus(true);
  const [sheet, setSheet] = useState<null | 'courses' | 'cohort' | 'staff' | 'learners'>(null);
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [college, setCollege] = useState<{ awarding_bodies: string[] | null } | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: SETUP_STATUS_KEY });

  const loadInvites = async (collegeId: string) => {
    const { data } = await supabase
      .from('college_invites')
      .select('id, invite_code, cohort_id, expires_at, max_uses, use_count')
      .eq('college_id', collegeId)
      .eq('invite_type', 'student')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    const now = Date.now();
    setInvites(
      ((data ?? []) as Array<InviteRow & { expires_at: string | null; max_uses: number | null; use_count: number }>).filter(
        (r) => (!r.expires_at || new Date(r.expires_at).getTime() > now) && (r.max_uses == null || r.use_count < r.max_uses)
      )
    );
  };

  useEffect(() => {
    if (!status?.college_id) return;
    void loadInvites(status.college_id);
    void supabase
      .from('colleges')
      .select('awarding_bodies')
      .eq('id', status.college_id)
      .maybeSingle()
      .then(({ data }) => setCollege((data as { awarding_bodies: string[] | null } | null) ?? null));
  }, [status?.college_id, status?.cohorts, status?.join_codes]);

  const activeCohorts = cohorts.filter((c) => (c.status ?? '').toLowerCase() !== 'archived');
  const codeFor = (cohortId: string) => invites.find((i) => i.cohort_id === cohortId)?.invite_code ?? null;

  const makeCode = async (cohortId: string) => {
    if (!status) return;
    const cohort = cohorts.find((c) => c.id === cohortId);
    const course = courses.find((c) => c.id === cohort?.course_id);
    for (let i = 0; i < 4; i++) {
      const { error } = await supabase.from('college_invites').insert({
        college_id: status.college_id,
        invite_code: newJoinCode(),
        invite_type: 'student',
        cohort_id: cohortId,
        course_id: course?.id ?? null,
        qualification_id: course?.qualification_id ?? null,
        is_active: true,
      });
      if (!error) break;
      if (!/duplicate|unique/i.test(error.message)) {
        toast({ title: 'Join code not made', description: error.message, variant: 'destructive' });
        return;
      }
    }
    await loadInvites(status.college_id);
    void refresh();
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      toast({ title: 'Copy failed', description: text });
    }
  };

  const steps = useMemo(() => (status ? setupSteps(status) : []), [status]);
  const done = steps.filter((s) => s.done).length;

  if (isLoading || !status) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" aria-hidden />
      </div>
    );
  }

  const act = (s: SetupStep) => {
    switch (s.key) {
      case 'courses':
        return setSheet('courses');
      case 'cohorts':
        return setSheet('cohort');
      case 'staff':
        return status.can_manage ? setSheet('staff') : undefined;
      case 'safeguarding':
        // The lead is a duty flag on a staff member: Edit staff → Safeguarding lead.
        return status.can_manage ? navigate('/college?section=tutors') : undefined;
      case 'learners':
        return setSheet('learners');
      case 'join':
        if (activeCohorts[0] && !codeFor(activeCohorts[0].id)) return void makeCode(activeCohorts[0].id);
        return document.getElementById('join-codes')?.scrollIntoView({ behavior: 'smooth' });
      case 'register':
        return navigate('/college?section=attendance');
      case 'details':
        return navigate('/college?section=collegesettings');
      default:
        return undefined;
    }
  };

  const actionLabel = (s: SetupStep): string | null => {
    if (s.key === 'joined') return null;
    if ((s.key === 'staff' || s.key === 'safeguarding') && !status.can_manage) return null;
    if (s.done) return s.key === 'details' ? 'Edit' : s.key === 'register' ? null : s.key === 'safeguarding' ? 'Change' : 'Add more';
    return {
      details: 'Add details',
      courses: 'Pick courses',
      cohorts: 'Create cohort',
      staff: 'Add staff',
      safeguarding: status.dsl_named ? 'Link their account' : 'Name a lead',
      join: activeCohorts.length ? 'Make join code' : null,
      learners: 'Add learners',
      joined: null,
      register: 'Take a register',
    }[s.key];
  };

  const next = steps.find((s) => !s.done);

  return (
    <div className="space-y-8">
      <CollegePageHeader
        eyebrow={status.college_name}
        title={done === steps.length ? 'Your college is set up' : 'Set up your college'}
        description={
          done === steps.length
            ? 'Every step is done. This list stays here if you need it.'
            : `About 20 minutes end to end. ${next ? `Next: ${next.title.toLowerCase()}.` : ''}`
        }
        help={HELP}
        actions={
          <button type="button" onClick={() => navigate('/college')} className={COLLEGE_BTN}>
            Go to College Hub
          </button>
        }
      />

      <CollegeStats
        items={[
          { label: 'Steps done', value: `${done} of ${steps.length}`, good: done === steps.length },
          { label: 'Courses', value: String(status.courses) },
          { label: 'Staff', value: String(status.staff), sub: `${status.staff_linked} with a login` },
          { label: 'Learners', value: String(status.learners), sub: `${status.learners_linked} linked`, good: status.learners_linked > 0 },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <section className="space-y-3">
          <CollegeSectionTitle title="The steps" sub="Each ticks itself off when it is done." />
          <motion.ol initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={COLLEGE_LIST}>
            {steps.map((s, i) => {
              const label = actionLabel(s);
              return (
                <li key={s.key} className="flex items-start gap-4 px-5 py-4 sm:px-6">
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12.5px] font-bold tabular-nums',
                      s.done ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-white/[0.3] text-white'
                    )}
                  >
                    {s.done ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-[15px] font-semibold leading-snug text-white', s.done && 'line-through decoration-white/40')}>
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-white">
                      {s.key === 'staff' && !status.can_manage
                        ? 'Your college admin or head of department adds staff.'
                        : s.key === 'safeguarding' && !status.can_manage
                          ? 'Your college admin or head of department names the safeguarding lead.'
                          : s.body}
                    </p>
                  </div>
                  {label && (
                    <button
                      type="button"
                      onClick={() => act(s)}
                      className={cn(s.done || s.key !== next?.key ? COLLEGE_BTN : COLLEGE_BTN_PRIMARY, 'shrink-0')}
                    >
                      {label}
                    </button>
                  )}
                </li>
              );
            })}
          </motion.ol>
          {!status.dismissed && (
            <button
              type="button"
              onClick={() => void dismissSetup(status.college_id).then(() => refresh())}
              className={COLLEGE_LINK}
            >
              Hide the checklist on the College Hub home
            </button>
          )}
        </section>

        <section id="join-codes" className="scroll-mt-20 space-y-3">
          <CollegeSectionTitle title="Join codes" sub="One per cohort. Learners type it at sign-up or open the link." />
          {activeCohorts.length === 0 ? (
            <div className={cn(COLLEGE_CARD, 'space-y-3')}>
              <p className="text-[14px] font-semibold text-white">No cohort yet</p>
              <p className="text-[13px] leading-relaxed text-white">A join code belongs to a cohort. Create one first.</p>
              <button type="button" onClick={() => setSheet('cohort')} className={COLLEGE_BTN}>
                Create cohort
              </button>
            </div>
          ) : (
            <ul className={COLLEGE_LIST}>
              {activeCohorts.map((c) => {
                const code = codeFor(c.id);
                const link = code ? `${window.location.origin}/college/join/${code}` : '';
                return (
                  <li key={c.id} className="space-y-2 px-5 py-4 sm:px-6">
                    <p className="text-[14px] font-semibold text-white">{c.name}</p>
                    {code ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[18px] font-bold tracking-[0.15em] text-elec-yellow">{code}</span>
                        <button type="button" onClick={() => void copy(code, `c-${c.id}`)} className={COLLEGE_BTN}>
                          {copied === `c-${c.id}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Code
                        </button>
                        <button type="button" onClick={() => void copy(link, `l-${c.id}`)} className={COLLEGE_BTN}>
                          {copied === `l-${c.id}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Link
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => void makeCode(c.id)} className={COLLEGE_BTN}>
                        Make join code
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <p className="text-[12.5px] leading-relaxed text-white">
            A join code is not a discount code. If your college has a discount, Elec-Mate links it to your join codes,
            so learners only ever need the one code.
          </p>
        </section>
      </div>

      <CourseCatalogueSheet
        open={sheet === 'courses'}
        onOpenChange={(o) => {
          if (!o) setSheet(null);
          void refresh();
        }}
        collegeId={status.college_id}
        awardingBodies={college?.awarding_bodies ?? null}
        existingQualIds={courses.map((c) => c.qualification_id).filter((x): x is string => !!x)}
        onAdded={() => void refresh()}
      />
      <NewCohortDialog
        open={sheet === 'cohort'}
        collegeId={status.college_id}
        onOpenChange={(o) => {
          if (!o) {
            setSheet(null);
            void refresh();
          }
        }}
      />
      <StaffRosterSheet
        open={sheet === 'staff'}
        onOpenChange={(o) => {
          if (!o) {
            setSheet(null);
            void refresh();
          }
        }}
      />
      <BulkAddStudentsSheet
        open={sheet === 'learners'}
        onOpenChange={(o) => {
          if (!o) {
            setSheet(null);
            void refresh();
            if (status.college_id) void loadInvites(status.college_id);
          }
        }}
        defaultCohortId={activeCohorts[0]?.id}
      />
    </div>
  );
}

export type { CollegeSetupStatus };

import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthOverrideProvider } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  accessDate,
  useActingCollege,
  useActingControls,
  useMyCollegeAccess,
} from '@/hooks/college/useCollegeAccess';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CollegeAccessFrame — wraps every College Hub page (CollegeGuard).

   1. White-glove: a platform admin acting for a college sees the hub as that
      college (profile.college_id swapped for the hub subtree only) under a
      bar that names the college and stops the session.
   2. Pilot banner: the college lead or admin sees a quiet line in the last
      14 days of the pilot or contract and during the 14-day grace.
   3. Ended: after grace, staff see a calm page. Nothing is deleted.
   Colleges whose access Elec-Mate has not set ('none') see nothing new.
   ========================================================================== */

const ENDED_HELP: PageHelpContent = {
  id: 'college-access-ended',
  title: 'College access',
  what: 'Your college uses the College Hub through an agreement with Elec-Mate. When that agreement ends, the hub pauses until it is renewed.',
  steps: [
    {
      title: 'Nothing is deleted',
      body: 'Learners, cohorts, evidence, hours and records all stay exactly as they are.',
    },
    {
      title: 'Talk to Elec-Mate',
      body: 'Your college lead can email founder@elec-mate.com to carry on.',
    },
    {
      title: 'Back where you left off',
      body: 'As soon as access is renewed, the hub opens again with everything in place.',
    },
  ],
};

const MAIL = 'founder@elec-mate.com';

export function CollegeAccessFrame({ children }: { children: ReactNode }) {
  const { profile, user } = useAuth();
  const isPlatformAdmin = !!(profile as { admin_role?: string | null } | null)?.admin_role;
  const { data: acting } = useActingCollege();
  const { data: access } = useMyCollegeAccess();

  const viewingAs = acting?.mode === 'view_as' && !!acting.as_user_id;
  const actingProfile = useMemo(
    () =>
      acting && profile
        ? viewingAs
          ? // ELE-1966: the hub as this named staff member (read-only on the server).
            ({
              ...profile,
              id: acting.as_user_id,
              full_name: acting.as_name ?? profile.full_name,
              college_id: acting.college_id,
              college_role: acting.as_role ?? 'tutor',
            } as typeof profile)
          : ({ ...profile, college_id: acting.college_id, college_role: 'admin' } as typeof profile)
        : null,
    [acting, profile, viewingAs]
  );
  const viewAsUser = useMemo(
    () =>
      viewingAs && user
        ? ({ ...user, id: acting!.as_user_id as string } as typeof user)
        : undefined,
    [viewingAs, user, acting]
  );

  if (acting && actingProfile && viewingAs) {
    return (
      <AuthOverrideProvider profile={actingProfile} user={viewAsUser}>
        <ViewAsBar
          name={acting.as_name ?? 'this staff member'}
          role={acting.as_role ?? null}
          college={acting.college_name}
          until={acting.expires_at}
        />
        {children}
      </AuthOverrideProvider>
    );
  }

  if (acting && actingProfile) {
    return (
      <AuthOverrideProvider profile={actingProfile}>
        <ActingBar name={acting.college_name} until={acting.expires_at} />
        {children}
      </AuthOverrideProvider>
    );
  }

  if (access && access.role === 'staff' && access.access_status !== 'none') {
    if (access.phase === 'ended' && !isPlatformAdmin) {
      return <AccessEndedPage collegeName={access.college_name} />;
    }
    if (access.is_lead && (access.phase === 'ending_soon' || access.phase === 'grace')) {
      return (
        <>
          <PilotBanner
            isPilot={access.access_status === 'pilot'}
            endsOn={access.ends_on}
            graceUntil={access.grace_until}
            inGrace={access.phase === 'grace'}
          />
          {children}
        </>
      );
    }
  }

  return <>{children}</>;
}

function ActingBar({ name, until }: { name: string; until: string }) {
  const { stopActing } = useActingControls();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const stop = async () => {
    setBusy(true);
    try {
      await stopActing();
      navigate('/admin/colleges');
    } catch (e) {
      toast({
        title: 'Could not stop',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };
  const time = new Date(until).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="mb-3 border-b border-elec-yellow/40 bg-elec-yellow/[0.08]">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-8">
        <p className="text-[13px] leading-snug text-white">
          <span className="font-semibold">Elec-Mate is setting up {name}.</span> Everything you
          change here is logged in the college's activity. Ends at {time}.
        </p>
        <button
          type="button"
          onClick={() => void stop()}
          disabled={busy}
          className={cn(COLLEGE_BTN, 'h-11')}
        >
          {busy ? 'Stopping…' : 'Stop acting'}
        </button>
      </div>
    </div>
  );
}

/** ELE-1966: support is viewing as a named staff member. Read-only, logged. */
function ViewAsBar({
  name,
  role,
  college,
  until,
}: {
  name: string;
  role: string | null;
  college: string;
  until: string;
}) {
  const { stopActing } = useActingControls();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const stop = async () => {
    setBusy(true);
    try {
      await stopActing();
      navigate('/admin/colleges');
    } catch (e) {
      toast({
        title: 'Could not stop',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };
  const time = new Date(until).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return (
    <div
      role="status"
      data-testid="view-as-bar"
      className="sticky top-0 z-40 mb-3 border-b border-white/[0.14] bg-elec-dark"
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-8">
        <p className="text-[13px] leading-snug text-white">
          <span className="mr-2 inline-flex items-center rounded-full border border-elec-yellow px-2 py-0.5 text-[12px] font-semibold text-elec-yellow">
            Read only
          </span>
          <span className="font-semibold">
            Viewing {college} as {name}
            {role ? ` (${role.replace(/_/g, ' ')})` : ''}.
          </span>{' '}
          Nothing can be changed. {college} allowed this, and it is in their activity log. Ends at{' '}
          {time}.
        </p>
        <button
          type="button"
          onClick={() => void stop()}
          disabled={busy}
          className={cn(COLLEGE_BTN, 'h-11')}
        >
          {busy ? 'Stopping…' : 'Stop viewing'}
        </button>
      </div>
    </div>
  );
}

function PilotBanner({
  isPilot,
  endsOn,
  graceUntil,
  inGrace,
}: {
  isPilot: boolean;
  endsOn: string | null;
  graceUntil: string | null;
  inGrace: boolean;
}) {
  const key = `college-pilot-banner:${endsOn}:${inGrace ? 'g' : 'e'}`;
  const [hidden, setHidden] = useState(() => {
    try {
      return window.sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  });
  if (hidden) return null;
  const what = isPilot ? 'Your pilot' : "Your college's Elec-Mate agreement";
  const line = inGrace
    ? `${what} ended on ${accessDate(endsOn)}. The hub stays open until ${accessDate(graceUntil)}. Talk to Elec-Mate to keep going.`
    : `${what} ends on ${accessDate(endsOn)}. Talk to Elec-Mate to keep going.`;
  return (
    <div className="mb-3 border-b border-white/[0.08] bg-white/[0.03]">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 sm:px-8">
        <p className="text-[13px] leading-snug text-white">{line}</p>
        <div className="flex items-center gap-1">
          <a
            href={`mailto:${MAIL}?subject=${encodeURIComponent('Keeping the College Hub')}`}
            className="inline-flex h-11 items-center px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Email Elec-Mate
          </a>
          <button
            type="button"
            onClick={() => {
              try {
                window.sessionStorage.setItem(key, '1');
              } catch {
                /* private mode: hide for this view only */
              }
              setHidden(true);
            }}
            className="inline-flex h-11 items-center px-2 text-[13px] font-medium text-white touch-manipulation"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
}

function AccessEndedPage({ collegeName }: { collegeName: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-background px-4 py-10">
      <div className={cn(COLLEGE_CARD, 'w-full max-w-2xl space-y-4')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12.5px] font-medium text-white">College Hub</p>
            <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-white">
              {collegeName}'s access has ended
            </h1>
          </div>
          <PageHelpButton help={ENDED_HELP} />
        </div>
        <p className="text-[14px] leading-relaxed text-white">
          The College Hub is paused for {collegeName}. Nothing has been deleted: your learners,
          cohorts, evidence, hours and records are all kept, and everything opens again as soon as
          access is renewed.
        </p>
        <p className="text-[14px] leading-relaxed text-white">
          To carry on, your college lead can contact Elec-Mate at{' '}
          <span className="select-all font-semibold text-elec-yellow">{MAIL}</span>.
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href={`mailto:${MAIL}?subject=${encodeURIComponent(`${collegeName}: renewing the College Hub`)}`}
            className={COLLEGE_BTN_PRIMARY}
          >
            Contact Elec-Mate
          </a>
          <button type="button" onClick={() => navigate('/dashboard')} className={COLLEGE_BTN}>
            Back to the app
          </button>
        </div>
      </div>
    </div>
  );
}

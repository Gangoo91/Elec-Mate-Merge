/**
 * EditorialHubGrid — monochrome hub launcher.
 *
 * Custom card layout (not the college HubCard primitive) so we can drop the
 * per-card tone gradients. Every visible card MUST have a live signal — this
 * is the rule that separates a dashboard from a launcher. If a hub has no
 * data yet, the meta line surfaces a CTA ("Send your first quote", "Start
 * your streak") so it never feels inert.
 *
 * Single accent: elec-yellow on the right-arrow. That's it.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import { useSharedDashboardData, type DashboardData } from '@/hooks/useDashboardData';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { HubToolGrid, type HubTool } from '@/components/hub/HubPrimitives';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';

interface HubDef {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Route to navigate to. Ignored if `action` is set. */
  path?: string;
  /** Custom action instead of navigation (e.g. open the referral share sheet). */
  action?: 'refer';
  roles: string[];
  meta: (data: DashboardData) => string;
  /** Pre-launch teaser styling — adds "Coming soon" pill, slightly muted */
  comingSoon?: boolean;
  /** CTA label override — defaults to "Open" / "Notify me". */
  ctaLabel?: string;
}

const HUBS: HubDef[] = [
  {
    id: 'electrical',
    eyebrow: 'TOOLS',
    title: 'Electrical Hub',
    description: 'Inspection tools, certificates, pricing, AI assistants.',
    path: '/electrician',
    roles: ['electrician', 'apprentice', 'employer', 'admin'],
    meta: (d) =>
      d.business.activeQuotes > 0
        ? `${d.business.activeQuotes} active quote${d.business.activeQuotes === 1 ? '' : 's'} · ${d.business.formattedQuoteValue}`
        : d.certificates.total > 0
          ? `${d.certificates.total} certificates · ${d.certificates.expiringSoon} in progress`
          : 'Send your first quote',
  },
  {
    id: 'apprentice',
    eyebrow: 'TRAINING',
    title: 'Apprentice Hub',
    description: 'Track your journey, log training hours, build your portfolio.',
    path: '/apprentice',
    roles: ['apprentice', 'electrician', 'employer', 'college', 'admin'],
    meta: (d) =>
      d.learning.currentStreak > 0
        ? `Day ${d.learning.currentStreak} · ${d.learning.studiedToday ? 'studied today' : 'open today'}`
        : 'Start your streak',
  },
  {
    id: 'study-centre',
    eyebrow: 'LEARN',
    title: 'Study Centre',
    description: 'Courses, revision and CPD for every stage of your career.',
    path: '/study-centre',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    meta: (d) =>
      d.learning.totalSessions > 0
        ? `${d.learning.totalSessions} sessions · ${d.learning.totalCardsReviewed} cards`
        : 'Open your first lesson',
  },
  {
    id: 'college',
    eyebrow: 'TUTOR',
    title: 'College Hub',
    description: 'Your learners, cohorts, marking and today\'s teaching.',
    path: '/college',
    // Role alone is not enough: an invited tutor keeps role 'electrician'
    // (the invite sets college_id/college_role, not role). The grid below
    // also shows this card to anyone with an active college_staff row.
    roles: ['admin', 'college'],
    meta: () => 'Open dashboard',
  },
  {
    id: 'my-college',
    eyebrow: 'COLLEGE',
    title: 'My college',
    description: 'Your plan, quizzes, hours sign-off, timetable and tutor messages.',
    path: '/apprentice/college-plan',
    // Never by role — only shown to a learner with a college_students row.
    roles: [],
    meta: () => 'Open',
  },
  {
    id: 'wellbeing',
    eyebrow: 'WELLBEING',
    title: 'Wellbeing Hub',
    description: 'Mental health support, stress tools and wellbeing resources.',
    path: '/mental-health',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    meta: () => 'Mood check available',
  },
  {
    id: 'refer-a-mate',
    eyebrow: 'REFER',
    title: 'Bring a Mate',
    description: 'Free month for them. Free month for you. Most users come from a recommendation.',
    action: 'refer',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    meta: () => 'Share your link',
    ctaLabel: 'Get link',
  },
];

/** The hub cards this role can see — the home-screen customise sheet lists the same ones. */
export function hubsForRole(role: string | null | undefined) {
  const r = role || 'electrician';
  return HUBS.filter((h) => h.roles.includes(r)).map((h) => ({ id: h.id, title: h.title }));
}

interface EditorialHubGridProps {
  label?: string;
  /** Opens the in-place customise sheet. Without it, falls back to Settings. */
  onCustomise?: () => void;
}

/**
 * The hub grid, on the shared hub card language.
 *
 * It drew its own hairline grid of 168–260px cells, each stamped `01 · TOOLS`,
 * `02 · REFER` — inside a section that was itself numbered `03 · YOUR HUBS`.
 * Two numbering systems on one block, neither meaning anything, and a 30px
 * headline per card so two hubs filled a screen.
 *
 * The role filtering, the Settings → Preferences visibility toggles and the
 * referral sheet all stay exactly as they were; only the presentation moved to
 * HubToolGrid, so a hub card here is the same object as a tool card anywhere
 * else in the app.
 */
export function EditorialHubGrid({ label = 'Your hubs', onCustomise }: EditorialHubGridProps) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const { isHubVisible } = useDashboardPreferences();

  const role = profile?.role || 'electrician';
  // Who this person is to a college, if anyone. An invited tutor's role stays
  // 'electrician', so the College Hub card never appeared for them and the
  // sidebar was their only way in; a linked learner had no card at all.
  const college = useMyCollegeContext();
  // Respect the user's Settings → Preferences hub toggles. These were saved to
  // `dashboard_preferences` but never read here, so customising did nothing.
  // isHubVisible() defaults to true (no row = visible).
  const visible = HUBS.filter((h) => {
    if (!isHubVisible(h.id)) return false;
    if (h.id === 'college') return h.roles.includes(role) || college.isStaff;
    if (h.id === 'my-college') return college.isLearner && !college.isStaff;
    return h.roles.includes(role);
  });

  const handleHubClick = (hub: HubDef) => {
    if (hub.action === 'refer') {
      setShareSheetOpen(true);
      return;
    }
    if (hub.path) navigate(hub.path);
  };

  const cards: HubTool[] = visible.map((hub) => ({
    id: hub.id,
    title:
      hub.id === 'my-college' && college.learner?.college_name
        ? college.learner.college_name
        : hub.id === 'college' && college.staff?.college_name
          ? college.staff.college_name
          : hub.title,
    description:
      hub.id === 'my-college' && college.learner
        ? [college.learner.cohort_name, college.learner.qualification_title]
            .filter(Boolean)
            .join(' · ') || hub.description
        : hub.description,
    onClick: () => handleHubClick(hub),
  }));

  return (
    <>
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        headline="Bring a Mate"
        subline="Free month for them. Free month for you."
        context="dashboard_hub_card"
      />

      <div className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">{label}</h2>
          {/* h-11 + negative margin — this was an 11px bare text link, which is
              a 13px tap target on a phone. */}
          <button
            type="button"
            onClick={() => (onCustomise ? onCustomise() : navigate('/settings?tab=preferences'))}
            className="-my-2 -mr-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold text-elec-yellow touch-manipulation"
          >
            Customise →
          </button>
        </div>
        <HubToolGrid label="" cards={cards} columns="four" />
      </div>
    </>
  );
}

export default EditorialHubGrid;

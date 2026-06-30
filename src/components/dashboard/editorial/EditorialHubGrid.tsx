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
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import { useSharedDashboardData, type DashboardData } from '@/hooks/useDashboardData';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';
import { cn } from '@/lib/utils';
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
    description: 'Manage students, cohorts, assessments and curriculum.',
    path: '/college',
    roles: ['admin', 'college'],
    meta: () => 'Open dashboard',
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

interface EditorialHubGridProps {
  number?: string;
  label?: string;
}

export function EditorialHubGrid({ number = '03', label = 'YOUR HUBS' }: EditorialHubGridProps) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  const { isHubVisible } = useDashboardPreferences();

  const role = profile?.role || 'electrician';
  // Respect the user's Settings → Preferences hub toggles. These were saved to
  // `dashboard_preferences` but never read here, so customising did nothing.
  // isHubVisible() defaults to true (no row = visible).
  const visible = HUBS.filter((h) => h.roles.includes(role) && isHubVisible(h.id));

  const handleHubClick = (hub: HubDef) => {
    if (hub.action === 'refer') {
      setShareSheetOpen(true);
      return;
    }
    if (hub.path) navigate(hub.path);
  };

  return (
    <>
      <ReferralShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        headline="Bring a Mate"
        subline="Free month for them. Free month for you."
        context="dashboard_hub_card"
      />
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <Eyebrow>
            {number} · {label}
          </Eyebrow>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50 tabular-nums">
              {visible.length} {visible.length === 1 ? 'hub' : 'hubs'}
            </span>
            <button
              type="button"
              onClick={() => navigate('/settings?tab=preferences')}
              className="text-[11px] font-medium text-elec-yellow/80 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Customise →
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            'relative grid gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
            visible.length >= 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : visible.length === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
          )}
        >
          {/* Single yellow hairline along the top of the whole grid */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

          {visible.map((hub, i) => (
            <button
              key={hub.id}
              onClick={() => handleHubClick(hub)}
              className="group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 sm:p-7 lg:p-8 text-left touch-manipulation flex flex-col min-h-[220px] sm:min-h-[260px]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    · {hub.eyebrow}
                  </span>
                </div>
                {hub.comingSoon && (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/10 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </div>
              <h3 className="mt-4 sm:mt-5 text-2xl sm:text-[26px] lg:text-[30px] font-semibold tracking-tight leading-[1.1] text-white group-hover:text-elec-yellow transition-colors">
                {hub.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-white/60 max-w-[34ch]">
                {hub.description}
              </p>
              <div className="flex-grow" />
              <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/[0.05]">
                <span className="text-[11.5px] text-white/65 truncate tabular-nums">
                  {hub.meta(data)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-elec-yellow shrink-0">
                  {hub.ctaLabel ?? (hub.comingSoon ? 'Notify me' : 'Open')}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
}

export default EditorialHubGrid;

/**
 * EditorialHubGrid — editorial replacement for PremiumHubGrid.
 *
 * Composes from the college editorial primitives (`HubGrid`, `HubCard`).
 * Every visible card MUST have a live signal — this is the rule that
 * separates a dashboard from a launcher. If a hub has no data yet, the meta
 * line surfaces a CTA ("Add your first…") so it never feels inert.
 *
 * Role-aware: hubs are filtered by `profile.role`, and the live-signal text
 * is computed from the shared dashboard data.
 */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  Eyebrow,
  HubGrid,
  HubCard,
  containerVariants,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { useAuth } from '@/contexts/AuthContext';
import { useSharedDashboardData, type DashboardData } from '@/hooks/useDashboardData';

interface HubDef {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  tone: Tone;
  roles: string[];
  meta: (data: DashboardData) => string;
}

const HUBS: HubDef[] = [
  {
    id: 'electrical',
    number: '01',
    eyebrow: 'TOOLS',
    title: 'Electrical Hub',
    description: 'Inspection tools, certificates, pricing, AI assistants.',
    path: '/electrician',
    tone: 'yellow',
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
    number: '02',
    eyebrow: 'TRAINING',
    title: 'Apprentice Hub',
    description: 'Track your journey, log training hours, build your portfolio.',
    path: '/apprentice',
    tone: 'blue',
    roles: ['apprentice', 'electrician', 'employer', 'college', 'admin'],
    meta: (d) =>
      d.learning.currentStreak > 0
        ? `Day ${d.learning.currentStreak} · ${d.learning.studiedToday ? 'studied today' : 'open today'}`
        : 'Start your streak',
  },
  {
    id: 'study-centre',
    number: '03',
    eyebrow: 'LEARN',
    title: 'Study Centre',
    description: 'Courses, revision and CPD for every stage of your career.',
    path: '/study-centre',
    tone: 'purple',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    meta: (d) =>
      d.learning.totalSessions > 0
        ? `${d.learning.totalSessions} sessions · ${d.learning.totalCardsReviewed} cards`
        : 'Open your first lesson',
  },
  {
    id: 'college',
    number: '04',
    eyebrow: 'TUTOR',
    title: 'College Hub',
    description: 'Manage students, cohorts, assessments and curriculum.',
    path: '/college',
    tone: 'emerald',
    roles: ['admin', 'college'],
    meta: () => 'Open dashboard',
  },
  {
    id: 'wellbeing',
    number: '05',
    eyebrow: 'WELLBEING',
    title: 'Wellbeing Hub',
    description: 'Mental health support, stress tools, and wellbeing resources.',
    path: '/mental-health',
    tone: 'red',
    roles: ['apprentice', 'electrician', 'employer', 'admin', 'college'],
    meta: () => 'Mood check available',
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

  const role = profile?.role || 'electrician';
  const visible = HUBS.filter((h) => h.roles.includes(role));

  // Re-number visible hubs so the label sequence (01, 02, 03 …) is contiguous
  // for the role rather than referring to the master list.
  const numbered = visible.map((hub, i) => ({
    ...hub,
    number: String(i + 1).padStart(2, '0'),
  }));

  return (
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
        <span className="text-[11px] text-white/50 tabular-nums">
          {numbered.length} {numbered.length === 1 ? 'hub' : 'hubs'}
        </span>
      </motion.div>
      <motion.div variants={itemVariants}>
        <HubGrid columns={numbered.length >= 4 ? 4 : numbered.length === 3 ? 3 : 2}>
          {numbered.map((hub) => (
            <HubCard
              key={hub.id}
              number={hub.number}
              eyebrow={hub.eyebrow}
              title={hub.title}
              description={hub.description}
              meta={hub.meta(data)}
              tone={hub.tone}
              onClick={() => navigate(hub.path)}
              cta="Open"
            />
          ))}
        </HubGrid>
      </motion.div>
    </motion.section>
  );
}

export default EditorialHubGrid;

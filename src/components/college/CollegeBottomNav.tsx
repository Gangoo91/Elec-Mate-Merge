import { Home, Users, BookOpen, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

/* ==========================================================================
   CollegeBottomNav — persistent native-style bottom tab bar (mobile only).

   Before this, switching between the 6 hub areas meant ← Back to Overview and
   tapping in again — every area-switch round-tripped through home via a tiny
   text-only Back button. This gives one-tap movement between the main areas,
   the way a native app does. Desktop keeps the top editorial nav (lg:hidden).
   ========================================================================== */

/** Canonical hub for every section — also the single source of truth for
 *  "which area does this belong to" (drives the active tab + Phase-1.4 dedup). */
export const SECTION_HUB: Record<CollegeSection, CollegeSection> = {
  overview: 'overview',
  // People
  peoplehub: 'peoplehub',
  students: 'peoplehub',
  student360: 'peoplehub',
  tutors: 'peoplehub',
  supportstaff: 'peoplehub',
  cohorts: 'peoplehub',
  progresstracking: 'peoplehub',
  tutorworkload: 'peoplehub',
  safeguardingqueue: 'peoplehub',
  // Teaching / Curriculum
  curriculumhub: 'curriculumhub',
  courses: 'curriculumhub',
  coursesetup: 'curriculumhub',
  lessonplans: 'curriculumhub',
  schemesofwork: 'curriculumhub',
  teachingresources: 'curriculumhub',
  tutornotebook: 'curriculumhub',
  documentlibrary: 'curriculumhub',
  timetable: 'curriculumhub',
  livelesson: 'curriculumhub',
  resourceanalytics: 'curriculumhub',
  // Assessment
  assessmenthub: 'assessmenthub',
  grading: 'assessmenthub',
  attendance: 'assessmenthub',
  ilpmanagement: 'assessmenthub',
  epatracking: 'assessmenthub',
  portfolio: 'assessmenthub',
  workqueue: 'assessmenthub',
  otjtraining: 'assessmenthub',
  aiilpgenerator: 'assessmenthub',
  masteryqueue: 'assessmenthub',
  batchoperations: 'assessmenthub',
  assessmentcalendar: 'assessmenthub',
  // Quality
  qualityhub: 'qualityhub',
  qualitydashboard: 'qualityhub',
  iqaworkflow: 'qualityhub',
  iqaotjaudit: 'qualityhub',
  tutorobs: 'qualityhub',
  auditlog: 'qualityhub',
  compliancedocs: 'qualityhub',
  // Resources / settings (reachable from Overview + header)
  resourceshub: 'overview',
  ltisettings: 'qualityhub',
  collegesettings: 'overview',
  employerportal: 'peoplehub',
};

const TABS: { hub: CollegeSection; label: string; Icon: typeof Home }[] = [
  { hub: 'overview', label: 'Home', Icon: Home },
  { hub: 'peoplehub', label: 'People', Icon: Users },
  { hub: 'curriculumhub', label: 'Teaching', Icon: BookOpen },
  { hub: 'assessmenthub', label: 'Assess', Icon: ClipboardCheck },
  { hub: 'qualityhub', label: 'Quality', Icon: ShieldCheck },
];

interface CollegeBottomNavProps {
  activeSection: CollegeSection;
  onSelect: (section: CollegeSection) => void;
}

export function CollegeBottomNav({ activeSection, onSelect }: CollegeBottomNavProps) {
  const activeHub = SECTION_HUB[activeSection] ?? 'overview';
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-elec-dark/95 backdrop-blur-md border-t border-white/[0.07]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="College sections"
    >
      <div className="mx-auto flex max-w-md">
        {TABS.map(({ hub, label, Icon }) => {
          const active = activeHub === hub;
          return (
            <button
              key={hub}
              type="button"
              onClick={() => onSelect(hub)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex-1 h-14 flex flex-col items-center justify-center gap-0.5 touch-manipulation transition-colors',
                active ? 'text-elec-yellow' : 'text-white/50 active:text-white'
              )}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-elec-yellow" aria-hidden />
              )}
              <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 1.9} />
              <span className="text-[10px] font-medium tracking-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

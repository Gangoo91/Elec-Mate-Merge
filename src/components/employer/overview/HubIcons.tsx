/**
 * Elec-Mate's own icons for the six areas of the Employer Hub (10 Oct 2026).
 * Andrew: "they need to be icons but not these generic AI icons".
 *
 * Drawn for the trade on a 24px grid: 1.6 stroke, round joins, white
 * line-work with one yellow detail each (the hat's ridge, the bolt on the van,
 * the £, the hazard bolt, the front door, the seal, the breaker toggles).
 * They sit on the card as they are: no tile or box behind them.
 */
import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/lib/utils';

type IconProps = { className?: string };

function Frame({ className, children, ...rest }: IconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn('h-6 w-6 shrink-0 text-white', className)}
      {...rest}
    >
      {children}
    </svg>
  );
}

const accent = 'stroke-elec-yellow';

/** People: a safety helmet, centre ridge in yellow. */
export function PeopleIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M4.25 14.75a7.75 7.75 0 0 1 15.5 0" />
      <path d="M2.5 14.75h19v1.1a1.65 1.65 0 0 1-1.65 1.65H4.15A1.65 1.65 0 0 1 2.5 15.85z" />
      <path className={accent} d="M10.25 14.75V8.9a1.75 1.75 0 0 1 3.5 0v5.85" />
    </Frame>
  );
}

/** Jobs: the van, with a bolt on the side. */
export function JobsIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M5.2 16.5H2.75V7.75a1.25 1.25 0 0 1 1.25-1.25h9.25a1.25 1.25 0 0 1 1.25 1.25v8.75" />
      <path d="M14.5 9.5h3.6l2.9 3.4v3.6h-1.7" />
      <path d="M8.8 16.5h6.9" />
      <circle cx="7" cy="16.75" r="1.8" />
      <circle cx="17.5" cy="16.75" r="1.8" />
      <path className={accent} d="M9.4 8.6 7.6 11.6h2.6l-1.5 2.6" />
    </Frame>
  );
}

/** Finance: a receipt with a pound sign. */
export function FinanceIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M6 3.5h12v17l-2-1.25-2 1.25-2-1.25-2 1.25-2-1.25-2 1.25z" />
      <path className={accent} d="M14 8.6a2 2 0 0 0-3.25 1.6v4.8M9.4 12.3h3.4M9.4 15h4.85" />
    </Frame>
  );
}

/** Safety: the electrical hazard triangle. */
export function SafetyIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M10.27 4.3a2 2 0 0 1 3.46 0l7.36 12.7a2 2 0 0 1-1.73 3H4.64a2 2 0 0 1-1.73-3z" />
      <path className={accent} d="M12.75 8.75 10.5 12.6h3l-2 3.4" />
    </Frame>
  );
}

/** Clients: a house, front door in yellow. */
export function ClientsIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M3.25 11 12 4l8.75 7" />
      <path d="M5.5 9.4V20h13V9.4" />
      <path className={accent} d="M10 20v-4.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75V20" />
    </Frame>
  );
}

/** Smart Docs: a certificate with its seal. */
export function DocsIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M13 20.5H6.25A1.25 1.25 0 0 1 5 19.25V4.75A1.25 1.25 0 0 1 6.25 3.5H14.5l4.5 4.5v4.5" />
      <path d="M14.5 3.5V8H19" />
      <path d="M8 11h7M8 14h4" />
      <circle className={accent} cx="16.5" cy="16.5" r="2.25" />
      <path className={accent} d="m15.5 18.6-.5 2.4 1.5-.9 1.5.9-.5-2.4" />
    </Frame>
  );
}

/** Settings: a consumer unit's row of breakers, toggles in yellow. */
export function SettingsIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
      <path d="M5.75 8.25h2.5v7.5h-2.5zM9.25 8.25h2.5v7.5h-2.5zM12.75 8.25h2.5v7.5h-2.5zM16.25 8.25h2.5v7.5h-2.5z" />
      <path
        className="fill-elec-yellow stroke-none"
        d="M6.4 9.4h1.2v2.4H6.4zM9.9 9.4h1.2v2.4H9.9zM13.4 12.2h1.2v2.4h-1.2zM16.9 9.4h1.2v2.4h-1.2z"
      />
    </Frame>
  );
}

/** Plan and book: a diary page, today's slot in yellow. */
export function CalendarIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <rect x="3.25" y="5" width="17.5" height="15.5" rx="2" />
      <path d="M3.25 9.75h17.5M8 3v4M16 3v4" />
      <path className="fill-elec-yellow stroke-none" d="M13.25 13h3.5v3.5h-3.5z" />
    </Frame>
  );
}

const AREA_SECTIONS: [ComponentType<IconProps>, string[]][] = [
  [
    PeopleIcon,
    [
      'peoplehub',
      'team',
      'elecid',
      'timesheets',
      'leave',
      'comms',
      'talentpool',
      'apprentices',
      'subcontractors',
      'vacancies',
      'hrrecords',
      'contracts',
      '__assign_course',
    ],
  ],
  [
    JobsIcon,
    [
      'jobshub',
      'jobpacks',
      'jobs',
      'jobboard',
      'diary',
      'timeline',
      'tracking',
      'progresslogs',
      'issues',
      'testing',
      'quality',
      'qsreviews',
      'fleet',
      'kit',
      'photogallery',
      'recurring',
      'automations',
    ],
  ],
  [
    FinanceIcon,
    [
      'financehub',
      'quotes',
      'accounts',
      'tenders',
      'expenses',
      'procurement',
      'financials',
      'reports',
      'signatures',
      'pricebook',
      'accounting',
    ],
  ],
  [
    SafetyIcon,
    [
      'safetyhub',
      'safety',
      'rams',
      'incidents',
      'policies',
      'training',
      'briefings',
      'compliance',
      'checklists',
      'sitesafety',
    ],
  ],
  [ClientsIcon, ['clientshub', 'clientportal', 'clients', 'inbox', 'leads', 'quotepage']],
  [
    DocsIcon,
    ['smartdocs', 'aidesignspec', 'airams', 'aimethodstatement', 'aibriefingpack', 'aiquote'],
  ],
  [SettingsIcon, ['settings']],
];

/** The area icon for any Employer Hub section (a to-do row, a search hit). */
export function areaIconFor(section: string): ComponentType<IconProps> {
  return AREA_SECTIONS.find(([, s]) => s.includes(section))?.[0] ?? DocsIcon;
}

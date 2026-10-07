/**
 * The six areas on the Overview's "Your hub" grid, built from the one
 * get_employer_home call (see HubAreas.tsx).
 */
import type { ComponentType } from 'react';
import { Briefcase, FileText, Handshake, PoundSterling, ShieldCheck, Users } from 'lucide-react';
import type { EmployerHome } from '@/hooks/useEmployerHome';
import type { Params } from '@/components/employer/overview/HomeSections';

export type Tone = 'urgent' | 'action' | 'info';

export interface HubShortcut {
  key: string;
  label: string;
  section: string;
  params?: Params;
  count?: number;
  tone?: Tone;
}

export interface HubArea {
  key: string;
  name: string;
  section: string;
  icon: ComponentType<{ className?: string }>;
  line: string;
  warn?: boolean;
  shortcuts: HubShortcut[];
}

const gbp = (n: number) => `£${Math.round(Math.abs(n)).toLocaleString('en-GB')}`;
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** Builds the six areas from the Overview's one call. */
export function buildHubAreas(h: EmployerHome, clientUnread = 0): HubArea[] {
  const { team, jobs: j, approvals: a, safety: s, expiring: x, money: m, grow: g } = h;
  const hub = h.hub;

  /* People */
  const toApprove = a.timesheets + a.leave + a.expenses;
  const peopleLine =
    team.active === 0
      ? 'Add your team to get started'
      : [
          `${team.active} on the team`,
          toApprove > 0 ? `${toApprove} to approve` : team.not_joined > 0 ? `${team.not_joined} not joined` : null,
        ]
          .filter(Boolean)
          .join(' · ');

  /* Jobs */
  const jobsLine =
    j.live === 0 ? 'No live jobs yet' : `${j.today} today · ${j.week} this week`;

  /* Finance: money only for the owner and admins. */
  const financeLine = m
    ? m.outstanding_count > 0
      ? `${gbp(m.outstanding)} owed${m.overdue_count > 0 ? ` · ${gbp(m.overdue)} late` : ''}`
      : 'Nothing owed to you'
    : a.expenses > 0
      ? plural(a.expenses, 'expense claim') + ' to review'
      : 'Quotes, invoices and job costs';

  /* Safety */
  const safetyLine =
    s.riddor_due > 0
      ? `${plural(s.riddor_due, 'RIDDOR report')} due`
      : s.incidents_open > 0
        ? `${plural(s.incidents_open, 'open incident')}${s.incidents_unseen > 0 ? ` · ${s.incidents_unseen} new` : ''}`
        : s.rams_pending > 0
          ? `${s.rams_pending} RAMS to sign off`
          : 'Nothing open';

  /* Clients */
  const clientsLine = [
    hub ? plural(hub.clients, 'client') : 'Customers and leads',
    g.new_leads > 0 ? plural(g.new_leads, 'new lead') : null,
  ]
    .filter(Boolean)
    .join(' · ');

  /* Smart Docs */
  const docsLine =
    hub && hub.docs > 0 ? `${plural(hub.docs, 'document')} made` : 'RAMS and designs in minutes';

  return [
    {
      key: 'people',
      name: 'People',
      section: 'peoplehub',
      icon: Users,
      line: peopleLine,
      shortcuts: [
        {
          key: 'team',
          label: 'Team',
          section: 'team',
          params: team.not_joined > 0 ? { tab: 'invited' } : undefined,
          count: team.not_joined,
          tone: 'info',
        },
        {
          key: 'timesheets',
          label: 'Timesheets',
          section: 'timesheets',
          params: a.timesheets > 0 ? { tab: 'pending' } : undefined,
          count: a.timesheets + a.timesheets_open_old,
          tone: a.timesheets_open_old > 0 ? 'urgent' : 'action',
        },
        { key: 'leave', label: 'Leave', section: 'leave', count: a.leave, tone: 'action' },
        {
          key: 'credentials',
          label: 'Credentials',
          section: 'elecid',
          count: x.credentials,
          tone: x.credentials_expired > 0 ? 'urgent' : 'action',
        },
      ],
    },
    {
      key: 'jobs',
      name: 'Jobs',
      section: 'jobshub',
      icon: Briefcase,
      line: jobsLine,
      shortcuts: [
        { key: 'jobs', label: 'All jobs', section: 'jobs', count: j.unstaffed_today, tone: 'urgent' },
        {
          key: 'diary',
          label: 'Diary',
          section: 'diary',
          count: Math.max(0, j.unstaffed_week - j.unstaffed_today) + j.diary_unsent,
          tone: 'action',
        },
        { key: 'jobpacks', label: 'Job packs', section: 'jobpacks', count: s.signatures_waiting, tone: 'action' },
        { key: 'qsreviews', label: 'QS sign-off', section: 'qsreviews', count: a.qs, tone: 'action' },
      ],
    },
    {
      key: 'finance',
      name: 'Finance',
      section: 'financehub',
      icon: PoundSterling,
      line: financeLine,
      warn: !!m && m.overdue_count > 0,
      shortcuts: [
        {
          key: 'invoices',
          label: 'Invoices',
          section: 'quotes',
          params: { tab: m && m.overdue_count > 0 ? 'overdue' : 'invoices' },
          count: m?.overdue_count,
          tone: 'urgent',
        },
        {
          key: 'quotes',
          label: 'Quotes',
          section: 'quotes',
          params: { tab: 'quotes' },
          count: m?.quotes_waiting,
          tone: 'info',
        },
        { key: 'expenses', label: 'Expenses', section: 'expenses', count: a.expenses, tone: 'action' },
        { key: 'financials', label: 'Job financials', section: 'financials' },
      ],
    },
    {
      key: 'safety',
      name: 'Safety',
      section: 'safetyhub',
      icon: ShieldCheck,
      line: safetyLine,
      warn: s.riddor_due > 0 || s.incidents_unseen > 0,
      shortcuts: [
        {
          key: 'incidents',
          label: 'Incidents',
          section: 'incidents',
          count: s.incidents_unseen + s.riddor_due,
          tone: 'urgent',
        },
        { key: 'rams', label: 'RAMS', section: 'rams', count: s.rams_pending, tone: 'action' },
        { key: 'briefings', label: 'Briefings', section: 'briefings' },
        { key: 'training', label: 'Training', section: 'training' },
      ],
    },
    {
      key: 'clients',
      name: 'Clients',
      section: 'clientshub',
      icon: Handshake,
      line: clientsLine,
      shortcuts: [
        { key: 'clients', label: 'Clients', section: 'clients' },
        { key: 'leads', label: 'Leads', section: 'leads', count: g.new_leads, tone: 'action' },
        { key: 'quotepage', label: 'Quote page', section: 'quotepage' },
        {
          key: 'clientportal',
          label: 'Client portal',
          section: 'clientportal',
          count: clientUnread,
          tone: 'action',
        },
      ],
    },
    {
      key: 'smartdocs',
      name: 'Smart Docs',
      section: 'smartdocs',
      icon: FileText,
      line: docsLine,
      shortcuts: [
        { key: 'airams', label: 'RAMS', section: 'airams' },
        { key: 'aimethodstatement', label: 'Method statement', section: 'aimethodstatement' },
        { key: 'aidesignspec', label: 'Design spec', section: 'aidesignspec' },
        { key: 'aiquote', label: 'AI quote', section: 'aiquote' },
      ],
    },
  ];
}

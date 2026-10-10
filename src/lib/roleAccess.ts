/**
 * Who can see what in a firm (ELE-1831): the plain-English answer to "Why
 * can't I see this?", one entry per role.
 *
 * Every line mirrors a rule the database enforces. The rule is named in
 * `rule` so the copy and the enforcement can be checked side by side:
 *   - managers: employer_admins.access_role ('admin' | 'office'), the owner
 *     is the firm account itself (my_employer_role)
 *   - money: can_see_firm_money() = my_employer_admin_scope() (owner + admin),
 *     require_finance_money() on the P&L and ledger, owner/admin-only RLS on
 *     job_financials and job_cost_entries, trg_guard_roster_pay_rates
 *   - roster roles: employer_access_role(team_role), mirrored by accessRoleOf()
 *   - crew approvals: get_crew_approvals / decide_crew_request (my_crew_employee_ids)
 *   - apprentice hours: can_confirm_otj_for
 *   - certificate sign-off: is_qs_signer_for / is_team_qs_signer_of
 *
 * `held: true` marks a line whose database half ships with the release-held
 * migration 20261007169000_role_column_privacy. Until then the screens hide it
 * and the database does not yet, so the copy never claims more than that.
 */
import type { EmployerRole } from '@/hooks/useEmployerRole';

export interface AccessLine {
  text: string;
  /** The database rule behind the line (for maintainers, not shown). */
  rule: string;
  /** Database enforcement waits on the release-held column privacy migration. */
  held?: boolean;
  /** Shorter wording for the one-sentence summary. */
  short?: string;
  /** The line after "You can" / "You can't", for the one-sentence summary. */
  you?: string;
}

export interface RoleAccess {
  role: EmployerRole;
  label: string;
  /** Who this is, in a few words. */
  who: string;
  can: AccessLine[];
  cannot: AccessLine[];
  /** Why the "cannot" list exists, in one sentence. */
  because: string;
  /** How the role is given. */
  howToGet: string;
}

const own: AccessLine = {
  text: 'Their own jobs, timesheets, expenses and leave', you: 'see your own timesheets, expenses and leave',
  rule: 'RLS on employer_timesheets / expense_claims / leave_requests by my_employee_ids()',
};

export const ROLE_ACCESS: Record<EmployerRole, RoleAccess> = {
  owner: {
    role: 'owner',
    label: 'Owner',
    who: 'The account the firm runs on',
    can: [
      {
        text: 'Money: job profit, costs, pay rates and the P&L', you: "see the firm's money",
        short: "the firm's money",
        rule: 'can_see_firm_money(), require_finance_money()',
      },
      { text: 'Quotes, invoices and clients', you: 'work on quotes, invoices and clients', rule: 'quotes / customers owner policies' },
      {
        text: 'Approving timesheets, expenses and leave for everyone',
        rule: 'my_employer_admin_scope()',
      },
      { text: 'Jobs and the diary', you: 'run the jobs and the diary', rule: 'employer_jobs owner policies' },
      {
        text: 'Signing off certificates and attesting apprentice hours',
        rule: 'is_qs_signer_for, can_confirm_otj_for',
      },
      {
        text: 'Company details, branding, payments and managers',
        rule: 'company_profiles owner-only update',
      },
    ],
    cannot: [],
    because: 'The owner sees and changes everything in the firm.',
    howToGet: 'The account that set up the Employer Hub.',
  },
  admin: {
    role: 'admin',
    label: 'Admin',
    who: 'A manager with the same access as the owner',
    can: [
      {
        text: 'Money: job profit, costs, pay rates and the P&L', you: "see the firm's money",
        short: "the firm's money",
        rule: 'my_employer_admin_scope() includes access_role admin',
      },
      {
        text: 'Quotes, invoices and clients', you: 'work on quotes, invoices and clients',
        rule: 'quotes co-admin policies (my_employer_scope)',
      },
      { text: 'Approving timesheets, expenses and leave', you: 'approve timesheets, expenses and leave', rule: 'my_employer_scope()' },
      { text: 'Jobs and the diary', you: 'run the jobs and the diary', rule: 'my_employer_scope()' },
      {
        text: 'Signing off certificates and attesting apprentice hours',
        rule: 'is_qs_signer_for, can_confirm_otj_for (admin scope)',
      },
    ],
    cannot: [
      {
        text: 'Changing company details, payments or deleting quotes', you: 'change company details or payments, or delete quotes',
        rule: 'company_profiles update and quotes delete stay owner-only',
      },
    ],
    because: 'Company details and deletions stay with the owner, whose name is on the firm.',
    howToGet: 'The owner adds a manager in Settings and picks Admin.',
  },
  office: {
    role: 'office',
    label: 'Office',
    who: 'A manager who runs the office',
    can: [
      { text: 'Quotes, invoices and clients', you: 'work on quotes, invoices and clients', rule: 'my_employer_scope() includes office' },
      { text: 'Jobs and the diary', you: 'run the jobs and the diary', rule: 'my_employer_scope()' },
      {
        text: 'Timesheets, expenses and leave, including approving them', you: 'approve timesheets, expenses and leave',
        rule: 'my_employer_scope()',
      },
      { text: 'Reading certificates and QS reviews', rule: 'reports read unchanged for managers' },
    ],
    cannot: [
      {
        text: 'Job profit, cost lines, labour cost or the P&L', you: 'see job profit, costs and the P&L',
        rule: 'job_financials / job_cost_entries owner+admin RLS, require_finance_money()',
      },
      {
        text: 'Pay rates and buy prices', you: 'pay rates and buy prices',
        rule: 'trg_guard_roster_pay_rates blocks changes; column-level read in 20261007169000',
        held: true,
      },
      { text: 'Signing off certificates as QS', rule: 'is_qs_signer_for excludes office' },
      { text: 'Attesting apprentice hours', rule: 'can_confirm_otj_for uses admin scope' },
    ],
    because:
      "The firm's margins and people's pay stay with the owner and admins, so an office manager can run the jobs and the paperwork without seeing them.",
    howToGet: 'The owner adds a manager in Settings and picks Office.',
  },
  supervisor: {
    role: 'supervisor',
    label: 'Supervisor / QS',
    who: 'Supervisors, project managers, apprentice co-ordinators and the QS',
    can: [
      own,
      {
        text: "Approving their own crew's timesheets, expenses and leave", you: "approve your crew's timesheets, expenses and leave",
        rule: 'get_crew_approvals / decide_crew_request (my_crew_employee_ids)',
      },
      {
        text: 'Attesting the training hours of apprentices they supervise', you: 'attest the hours of apprentices you supervise',
        rule: 'can_confirm_otj_for (named supervisor or supervising role)',
      },
      {
        text: 'Signing off certificates, if their team role is QS',
        rule: "is_qs_signer_for (team_role 'QS')",
      },
    ],
    cannot: [
      {
        text: 'Money: profit, costs, pay rates or the P&L', you: "see the firm's money",
        short: "the firm's money",
        rule: 'can_see_firm_money() false',
      },
      { text: 'Quotes, invoices and the client list', you: 'its quotes, invoices and client list', rule: 'not in my_employer_scope()' },
      {
        text: "Anyone else's approvals outside their crew",
        rule: 'my_crew_employee_ids() only',
      },
    ],
    because:
      'A supervisor looks after the people who name them as supervisor, not the whole firm or its money.',
    howToGet: 'The office sets their team role to Supervisor, Project Manager, Co-ordinator or QS.',
  },
  engineer: {
    role: 'engineer',
    label: 'Engineer',
    who: 'Electricians and operatives on the team',
    can: [
      own,
      { text: 'The jobs they are booked on', you: "see the jobs you're booked on", rule: 'get_my_jobs (assignments)' },
      { text: 'Client contact details on their jobs', you: 'see client contact details on those jobs', rule: 'get_my_job_detail' },
    ],
    cannot: [
      { text: "Other people's timesheets, expenses or leave", you: "see other people's timesheets, expenses or leave", rule: 'my_employee_ids() only' },
      { text: 'Money, quotes, invoices or the client list', you: 'see money, quotes, invoices or the client list', rule: 'not in my_employer_scope()' },
      { text: 'Approving anything', rule: 'no crew, not a manager' },
    ],
    because: 'An engineer sees their own work. Running the firm sits with the managers.',
    howToGet: 'Anyone on the team whose team role is Operative.',
  },
  apprentice: {
    role: 'apprentice',
    label: 'Apprentice',
    who: 'Apprentices on the team',
    can: [
      own,
      { text: 'The jobs they are booked on', you: "see the jobs you're booked on", rule: 'get_my_jobs (assignments)' },
      {
        text: 'Their own training log, and who confirms it', you: 'keep your training log and see who confirms it',
        rule: 'college_otj_entries own rows, get_my_employer_link',
      },
    ],
    cannot: [
      {
        text: 'Client phone numbers and emails', you: 'see client phone numbers and emails',
        rule: 'hidden on screen; column-level read in 20261007169000',
        held: true,
      },
      { text: 'Attesting their own hours', you: 'attest your own hours', rule: 'can_confirm_otj_for refuses the apprentice' },
      { text: 'Money, quotes, invoices or the client list', you: 'see money, quotes, invoices or the client list', rule: 'not in my_employer_scope()' },
    ],
    because:
      "Apprentices learn on the firm's jobs without holding its clients' personal details, and their hours are confirmed by someone else.",
    howToGet: 'Anyone on the team whose team role is Apprentice.',
  },
  subcontractor: {
    role: 'subcontractor',
    label: 'Subcontractor',
    who: 'Subbies working the firm’s jobs on their own account',
    can: [
      own,
      { text: 'The jobs they are booked on', you: "see the jobs you're booked on", rule: 'get_my_jobs (assignments)' },
      { text: 'Client contact details on their jobs', you: 'see client contact details on those jobs', rule: 'get_my_job_detail' },
    ],
    cannot: [
      {
        text: "The firm's money, quotes, invoices or client list", you: "see the firm's money, quotes, invoices or client list",
        rule: 'not in my_employer_scope()',
      },
      { text: "Other people's records", you: "see other people's records", rule: 'my_employee_ids() only' },
    ],
    because: 'A subcontractor works the jobs they are booked on and nothing else in the firm.',
    howToGet: 'Anyone on the team whose team role is Subcontractor.',
  },
};

export const ROLE_ORDER: EmployerRole[] = [
  'owner',
  'admin',
  'office',
  'supervisor',
  'engineer',
  'apprentice',
  'subcontractor',
];

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const youOf = (l: AccessLine) => l.you ?? `see ${lower(l.short ?? l.text)}`;
/** Join phrases; a phrase with its own commas gets a comma before the last joiner. */
const joinOf = (parts: string[], word: 'and' | 'or') => {
  if (parts.length <= 1) return parts[0] ?? '';
  const sep = parts.some((t) => t.includes(',')) ? `, ${word} ` : ` ${word} `;
  return `${parts.slice(0, -1).join(', ')}${sep}${parts[parts.length - 1]}`;
};

/** "Your role is Office. You can …. You can't …. Because …" */
export function youSentence(role: EmployerRole): string {
  const r = ROLE_ACCESS[role];
  const head = `Your role is ${r.label}.`;
  if (r.cannot.length === 0) return `${head} You can see and change everything in the firm.`;
  return `${head} You can ${joinOf(r.can.slice(0, 3).map(youOf), 'and')}. You can't ${joinOf(
    r.cannot.slice(0, 2).map(youOf),
    'or'
  )}. ${r.because}`;
}

/** Deep link to the guide in the Employer Hub settings. */
export const ACCESS_GUIDE_ROUTE = '/employer?section=settings&open=access';

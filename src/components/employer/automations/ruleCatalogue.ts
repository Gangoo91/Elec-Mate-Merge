import type { AutomationRuleKey } from '@/hooks/useEmployerAutomations';

/* ELE-1987 — the ready-made rules, in plain English. The server holds the
   behaviour (supabase/migrations/20261008160000_employer_automations_ele1987.sql);
   this file is only the words on screen, so keep the two in step. */

/** Who a rule reaches. Customer and money rules need the owner or an admin to switch on. */
export type RuleReach = 'customer' | 'money' | 'team' | 'office';

export interface RuleCopy {
  key: AutomationRuleKey;
  /** Short name for headings and the run log. */
  name: string;
  /** "When …" half of the sentence, without the word When. */
  when: string;
  /** "… do that" half, starting lower case. */
  then: string;
  reach: RuleReach[];
  /** What happens, step by step, as the firm will see it. */
  steps: string[];
  /** The guard rails, said plainly. */
  safety: string[];
  /** The job is now done somewhere else. The rule can no longer be turned on
   *  here, but a firm that already has it on keeps it working (and is shown
   *  where it moved) until they turn it off. */
  movedTo?: 'review_requests';
}

/** Where a moved rule now lives, said on the rule row and in its sheet. */
export const MOVED_LABEL: Record<NonNullable<RuleCopy['movedTo']>, string> = {
  review_requests: 'Review requests',
};

export const RULES: RuleCopy[] = [
  {
    key: 'job_complete_draft_invoice',
    name: 'Draft the invoice',
    when: 'a job is marked Complete',
    then: 'draft the invoice',
    reach: ['money'],
    steps: [
      'The moment a job moves to Complete, a draft invoice is made for it.',
      'It copies the accepted quote. With no quote, it uses the job value as one line.',
      'You get a bell. Check it in Quotes & invoices and send it when you are happy.',
    ],
    safety: [
      'Never sent: it is only ever a draft.',
      'One draft per job. A job that already has an invoice is skipped.',
      'Only the owner or an admin can turn this on.',
    ],
  },
  {
    key: 'job_complete_review_request',
    name: 'Ask for a review',
    when: 'a job is marked Complete',
    then: 'ask the customer for a review',
    reach: ['customer'],
    movedTo: 'review_requests',
    steps: [
      'When a job moves to Complete, one short, branded email goes to the customer on the job.',
      'It thanks them and links to your review page (Google, Checkatrade or similar).',
      'It is logged on the job, so the office can see it went.',
    ],
    safety: [
      'Emails your customer, so only the owner or an admin can turn it on.',
      'Needs your review link in Settings, and an email on the job. Otherwise it is skipped and says why.',
      'Waits two minutes and checks the rule is still on before sending. Once per job.',
      'With Review requests after payment on (Clients), this rule stands aside so nobody is asked twice.',
    ],
  },
  {
    key: 'job_assigned_tell_customer',
    name: 'Tell the customer who is coming',
    when: 'someone is put on a booked job',
    then: 'email the customer who is coming',
    reach: ['customer'],
    steps: [
      'When people are put on a job that is in the diary, the customer gets the booking email with a calendar file.',
      'It names who is coming by first name, so they know who to expect at the door.',
      'It waits two minutes so a whole crew booked together goes in one email.',
    ],
    safety: [
      'Emails your customer, so only the owner or an admin can turn it on.',
      'Once per job and date. Skipped if the customer was already told, or the job has no email.',
      'Addresses on the do-not-send list are never emailed.',
    ],
  },
  {
    key: 'invoice_unpaid_reminder',
    name: 'Chase unpaid invoices',
    when: 'an invoice is still unpaid 14 days after it was sent',
    then: 'send the customer a polite reminder',
    reach: ['customer', 'money'],
    steps: [
      'Each weekday between 9am and 5pm, invoices 14 days past sending and past their due date are picked up.',
      'The customer gets your polite reminder for the balance still owed, not the full total.',
      'The reminder is recorded on the invoice and in the run log.',
    ],
    safety: [
      'Off unless you turn it on: sole traders chose not to chase automatically.',
      'Only invoices that reach 14 days after you turn this on. Old ones are never chased in a batch.',
      'Once per invoice, and skipped if anyone chased it in the last 7 days. Owner or admin only.',
      'Your chasing schedule in Get paid replaces this rule. While the schedule is on, this rule sends nothing.',
    ],
  },
  {
    key: 'eicr_job_pack',
    name: 'Draft the EICR job pack',
    when: 'someone is put on an EICR job',
    then: 'draft the job pack for the crew',
    reach: ['office'],
    steps: [
      'Spots EICR, periodic inspection or condition report in the job title or description.',
      'Makes a draft job pack with the site, the crew, the usual EICR hazards and a safe isolation briefing.',
      'You get a bell. Check it, add the RAMS and send it to the crew.',
    ],
    safety: [
      'Never sent to site on its own: a competent person checks the RAMS first.',
      'One pack per job. People added later are put on the draft until it is sent.',
    ],
  },
  {
    key: 'timesheet_friday_reminder',
    name: 'Friday timesheet reminder',
    when: 'it is Friday at 4pm',
    then: 'remind anyone on a job this week who has not logged hours',
    reach: ['team'],
    steps: [
      'At 4pm on Friday, anyone booked on a job this week with no hours logged gets a push.',
      'It opens their timesheet in Worker Tools.',
    ],
    safety: ['Once a week per person. Only people with the app linked.'],
  },
  {
    key: 'timesheet_waiting_reminder',
    name: 'Timesheets waiting',
    when: 'a timesheet has waited 2 days for approval',
    then: 'remind the office',
    reach: ['office'],
    steps: [
      'Each weekday morning, if any submitted timesheet has waited over 2 days, the office gets one bell.',
      'It opens the timesheets waiting for approval.',
    ],
    safety: ['At most one reminder a day, in office hours.'],
  },
  {
    key: 'cert_signed_next_inspection',
    name: 'Book the next inspection',
    when: 'a certificate is signed off in QS review',
    then: 'offer to book the next inspection',
    reach: ['office'],
    steps: [
      'When the QS signs off a certificate with a re-test date, the office gets a bell with the date.',
      'It opens Recurring work, Renewals, where you book it as a job or make it repeat.',
    ],
    safety: ['Once per certificate. Skipped when the job already repeats.'],
  },
];

export const RULE_BY_KEY = Object.fromEntries(RULES.map((r) => [r.key, r])) as Record<
  AutomationRuleKey,
  RuleCopy
>;

export const isSensitive = (r: RuleCopy) =>
  r.reach.includes('customer') || r.reach.includes('money');

export const REACH_LABEL: Record<RuleReach, string> = {
  customer: 'Emails the customer',
  money: 'Money',
  team: 'Team',
  office: 'Office',
};

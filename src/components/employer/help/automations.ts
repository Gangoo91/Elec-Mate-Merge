import type { PageHelpContent } from '@/components/hub/PageHelp';

/* In-app help for Jobs › Automations (ELE-1987). Button names match the screen. */

export const AUTOMATIONS_HELP: PageHelpContent = {
  id: 'employer-automations',
  title: 'Automations',
  what: 'Ready-made rules for the jobs you repeat every week: draft the invoice when a job is done, chase an unpaid invoice, remind people about timesheets. Every rule is off until you turn it on, and everything a rule does is logged.',
  steps: [
    {
      title: 'Pick a rule',
      body: 'Each rule reads as a sentence. Tap it to see exactly what it does and what it would act on right now.',
    },
    {
      title: 'Turn it on',
      body: 'Tap the switch. Rules that email your customers or touch money ask you to confirm, and only the owner or an admin can turn those on.',
    },
    {
      title: 'Check the run log',
      body: 'Every run, skip and failure is listed with the reason, and also shows on the job and in the audit log.',
    },
  ],
  tasks: [
    {
      title: 'Turn a rule on',
      steps: [
        'Find the rule. Tap it to read what it will do.',
        'Tap Turn on. For rules that email customers, read the safety notes and tap Turn on again to confirm.',
      ],
      who: 'Anyone in the office can turn on team and office rules. Rules that email customers or touch money: owner and admins only.',
      after: 'The card shows who turned it on and when.',
    },
    {
      title: 'Stop everything for a while',
      steps: ['Tap Pause all at the top.', 'Tap Resume all when you are ready.'],
      after:
        'While paused nothing runs, and anything waiting to send is cancelled, not sent later. Your rules stay as they were.',
    },
    {
      title: 'See what a rule did',
      steps: [
        'Open Run log.',
        'Each line says what happened, or why it was skipped. Tap Open job to go to the job.',
      ],
    },
  ],
  notes: [
    {
      title: 'Nothing happens twice',
      body: 'Each rule acts once per job, invoice, certificate or week. Moving a job back and forward again does not draft a second invoice.',
    },
    {
      title: 'Customer emails wait two minutes',
      body: 'So a crew booked together is one email, and so you can switch a rule off if you change your mind. The rule is checked again just before sending.',
    },
    {
      title: 'What the crew sees',
      body: 'Nothing to set up. They just get the results: a job pack to sign, or a reminder to log their hours.',
    },
  ],
};
